import { createModel } from '@rematch/core';
import { BrowserProvider, Contract, ethers, isAddress, ZeroAddress } from 'ethers';
import { MESSAGE_TYPE_PACS008 } from '../types';
import { BLOCKCHAIN_NETWORK, CreatePACS008Payload, MESSAGING_CONTRACT_ADDR } from '../utils/message-helper';
import { ProtocolCoordinator, ProtocolCoordinator__factory } from "@fintechain/typechain";


const CONTRACT_ABI = [
    "function submitMessage((bytes32,address,uint16,bytes)) external payable returns (bytes32)",
    "function quoteMessageFee((bytes32,address,uint16,bytes)) external view returns (uint256,uint256)",
    "function getMessageResult(bytes32) external view returns (bool,bytes)",
    "function retryMessage(bytes32) external payable returns (bool)",
    "function cancelMessage(bytes32) external returns (bool)"
];

interface PACS008Params {
    debtorAgent: string;
    creditorAgent: string;
    token: string;
    amount: string;
    handler: string;
}
interface MessageState {
    provider: BrowserProvider | null;
    contract: Contract | null;
    account: string;
    error: string;
    isProcessing: boolean;
    lastMessageId: string;
    networkName: string;
}

const initialState: MessageState = {
    provider: null,
    contract: null,
    account: '',
    error: '',
    isProcessing: false,
    lastMessageId: '',
    networkName: ''
};

const BASE_LOCAL_FEE = ethers.parseEther("0.001"); // 0.001 ether
const PAYLOAD_FEE_MULTIPLIER = BigInt(100); // 100 wei

export const messageModel = createModel()({
    state: initialState,
    reducers: {
        setProvider: (state, provider: BrowserProvider | null) => ({
            ...state,
            provider
        }),
        setContract: (state, contract: Contract | null) => ({
            ...state,
            contract
        }),
        setAccount: (state, account: string) => ({
            ...state,
            account
        }),
        setError: (state, error: string) => ({
            ...state,
            error
        }),
        setIsProcessing: (state, isProcessing: boolean) => ({
            ...state,
            isProcessing
        }),
        setLastMessageId: (state, messageId: string) => ({
            ...state,
            lastMessageId: messageId
        }),
        setNetworkName: (state, networkName: string) => ({
            ...state,
            networkName
        }),
        resetState: () => initialState
    },
    effects: (dispatch) => ({
        async switchNetwork() {
            if (!window.ethereum) return;

            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: BLOCKCHAIN_NETWORK.chainId }],
                });
            } catch (switchError: any) {
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [BLOCKCHAIN_NETWORK],
                        });
                    } catch (addError) {
                        dispatch.message.setError('Failed to add Hardhat network');
                    }
                } else {
                    dispatch.message.setError('Failed to switch network');
                }
            }
        },


        async initializeContract(): Promise<void> {
            try {
                if (typeof window === 'undefined' || !window.ethereum) {
                    throw new Error("Please install MetaMask!");
                }

                // Check and switch network if needed
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                if (chainId !== BLOCKCHAIN_NETWORK.chainId) {
                    await this.switchNetwork();
                }

                // Initialize provider
                const provider = new BrowserProvider(window.ethereum);
                dispatch.message.setProvider(provider);

                // Get and set network information
                const network = await provider.getNetwork();
                dispatch.message.setNetworkName(network.name);

                // Request account access
                const accounts = await provider.send("eth_requestAccounts", []);
                dispatch.message.setAccount(accounts[0]);

                // Initialize contract using TypeChain factory
                const signer = await provider.getSigner();
                const contract = ProtocolCoordinator__factory.connect(
                    MESSAGING_CONTRACT_ADDR,
                    signer
                );

                dispatch.message.setContract(contract);
                this.setupEventListeners();
            } catch (err: unknown) {
                const error = err as Error;
                dispatch.message.setError(error.message || 'Failed to initialize contract');
                console.error("Initialization error:", error);
            }
        },


        setupEventListeners() {
            if (!window.ethereum) return;

            const handleAccountsChanged = async (accounts: string[]) => {
                if (accounts.length > 0) {
                    dispatch.message.setAccount(accounts[0]);
                } else {
                    dispatch.message.resetState();
                }
            };

            const handleChainChanged = async () => {
                await this.initializeContract();
            };

            const handleDisconnect = () => {
                dispatch.message.resetState();
            };

            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
            window.ethereum.removeListener('disconnect', handleDisconnect);

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
            window.ethereum.on('disconnect', handleDisconnect);
        },

        async submitPACS008Message(message: PACS008Params, rootState: any) {
            const state = rootState.message;
            if (!state.contract || !state.provider) {
                dispatch.message.setError('Contract not initialized');
                throw new Error('Contract not initialized');
            }

            const { debtorAgent, creditorAgent, token, amount, handler } = message;

            try {
                dispatch.message.setError('');
                dispatch.message.setIsProcessing(true);

                // Validate addresses
                if (!isAddress(debtorAgent) || !isAddress(creditorAgent) ||
                    !isAddress(token) || !isAddress(handler) ||
                    debtorAgent === ZeroAddress || creditorAgent === ZeroAddress ||
                    token === ZeroAddress || handler === ZeroAddress) {
                    throw new Error('Invalid address provided');
                }

                const messageId = ethers.hexlify(ethers.randomBytes(32));

                console.log('Creating PACS008 payload with:', {
                    debtorAgent,
                    creditorAgent,
                    token,
                    amount: BigInt(amount).toString(),
                    messageId
                });

                const payload = CreatePACS008Payload(
                    debtorAgent,
                    creditorAgent,
                    token,
                    BigInt(amount),
                    messageId
                );

                try {
                    const messageType = ethers.zeroPadValue(
                        MESSAGE_TYPE_PACS008,
                        32
                    );

                    console.log('Payload details:', {
                        rawPayload: payload,
                        payloadLength: ethers.dataLength(payload),
                        isHexString: ethers.isHexString(payload)
                    });

                    // Use TypeChain's expected submission type
                    const submission = {
                        messageType,              // bytes32
                        target: handler,          // address (renamed from handler for TypeChain consistency)
                        targetChain: BigInt(0),   // uint16
                        payload: ethers.hexlify(payload)  // bytes
                    } as const;

                    console.log('Submission tuple details:', {
                        messageType: {
                            value: submission.messageType,
                            length: ethers.dataLength(submission.messageType)
                        },
                        target: {
                            value: submission.target,
                            isAddress: isAddress(submission.target)
                        },
                        targetChain: {
                            value: submission.targetChain,
                            type: typeof submission.targetChain
                        },
                        payload: {
                            value: submission.payload,
                            length: ethers.dataLength(submission.payload)
                        }
                    });

                    const signer = await state.provider.getSigner();
                    const contract = state.contract as ProtocolCoordinator;
                    const contractWithSigner = contract.connect(signer);

                    const payloadFee = PAYLOAD_FEE_MULTIPLIER * BigInt(ethers.dataLength(submission.payload)); // Payload fee = payloadSize * multiplier
                    const totalFeez = BASE_LOCAL_FEE + (payloadFee); // Total fee = BASE_LOCAL_FEE + payloadFee

                    const data = "0xfd503de00000000000000000000000000000000000000000000000000000000000000020a88ff376a050326d40dbb83ca331587aff536b134a70b5e30450339b62db77530000000000000000000000003949405ac9ff14bffb3d17c601e810b0ca75dee30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000b4282a325c000000000000000000000000955c88f9c4783fa7b71fc2a92f165f57274f230a236b8c270000000000000000000000009abd1c4028b414d07bf3d110a53ee8e34e4817d79b9b04540000000000000000000000005bbc1dc92447e69e63e5afee7e45ae7ac0a0dcfc89c4783c00000000000000000000000000000000000000000000000000000000000000169d81f31f8090e19bd84777c76240a8529ae3af041091f17182308adabaa60fa169892cd5000000000000000000000000"; // Replace with full calldata
                    const iface = new ethers.Interface(CONTRACT_ABI);

                    const decoded = iface.parseTransaction({ data });
                    console.log("**************************", decoded);






                    // Use TypeChain's typed contract methods
                    const gasEstimate = await contractWithSigner.submitMessage.estimateGas(
                        submission, {
                        value: totalFeez
                    }
                    );
                    console.log('Gas estimate:', gasEstimate.toString());

                    const [baseFee, deliveryFee] = await contractWithSigner.quoteMessageFee(submission);
                    console.log('Fees:', {
                        baseFee: baseFee.toString(),
                        deliveryFee: deliveryFee.toString()
                    });

                    const totalFee = baseFee + deliveryFee;

                    console.log('Submitting with params:', {
                        submission,
                        value: totalFee.toString()
                    });

                    const tx = await contractWithSigner.submitMessage(
                        submission,
                        {
                            value: totalFee,
                            gasLimit: (gasEstimate * BigInt(120)) / BigInt(100) // Add 20% buffer
                        }
                    );

                    console.log('Transaction sent:', tx.hash);
                    const receipt = await tx.wait();
                    console.log('Transaction mined:', receipt);

                    if (receipt) {
                        const messageSubmittedEvent = receipt.logs.find(
                            log => log.topics[0] === ethers.id("MessageSubmissionInitiated(bytes32,address,bytes32,address,uint16)")
                        );

                        if (messageSubmittedEvent?.topics[1]) {
                            dispatch.message.setLastMessageId(messageSubmittedEvent.topics[1]);
                        }
                    }

                } catch (err: unknown) {
                    console.error('Detailed error:', {
                        error: err,
                        code: (err as any).code,
                        message: (err as Error).message,
                        data: (err as any).data,
                        stack: (err as Error).stack
                    });
                    throw err;
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Message submission failed';
                dispatch.message.setError(errorMessage);
                throw err;
            } finally {
                dispatch.message.setIsProcessing(false);
            }
        }
        ,

        async getMessageStatus(
            messageId: string,
            rootState
        ) {
            const state = rootState.message;
            if (!state.contract) {
                dispatch.message.setError('Contract not initialized');
                return;
            }

            try {
                return await state.contract.getMessageResult(messageId);
            } catch (err: any) {
                dispatch.message.setError(err.message || 'Failed to get message status');
                throw err;
            }
        }
    })
});


// Helper function to verify payload structure
function verifyPayloadStructure(payload: any) {
    console.log('Payload structure:', {
        type: typeof payload,
        isHex: ethers.isHexString(payload),
        length: payload.length,
        value: payload
    });
}