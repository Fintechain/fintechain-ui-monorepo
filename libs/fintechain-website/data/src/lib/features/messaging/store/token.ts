// models/token.ts
import { createModel } from '@rematch/core';
import { BrowserProvider, Contract, formatEther, isAddress, parseEther, ZeroAddress } from 'ethers';
import { TokenState } from '../types/token';
import { BLOCKCHAIN_NETWORK, ERC20_CONTRACT_ADDR } from '../utils/message-helper';



const CONTRACT_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)"
];


const initialState: TokenState = {
    provider: null,
    contract: null,
    account: '',
    balance: '',
    tokenName: '',
    error: '',
    networkName: '',
    isTransferring: false
};

export const tokenModel = createModel()({
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
        setBalance: (state, balance: string) => ({
            ...state,
            balance
        }),
        setTokenName: (state, tokenName: string) => ({
            ...state,
            tokenName
        }),
        setError: (state, error: string) => ({
            ...state,
            error
        }),
        setNetworkName: (state, networkName: string) => ({
            ...state,
            networkName
        }),
        setIsTransferring: (state, isTransferring: boolean) => ({
            ...state,
            isTransferring
        }),
        resetState: () => initialState
    },
    effects: (dispatch) => ({
        async initializeContract() {
            try {
                if (typeof window === 'undefined' || !window.ethereum) {
                    throw new Error("Please install MetaMask!");
                }

                const chainId = await window.ethereum.request({
                    method: 'eth_chainId'
                });

                if (chainId !== BLOCKCHAIN_NETWORK.chainId) {
                    await this.switchNetwork();
                }
                const provider = new BrowserProvider(window.ethereum);
                dispatch.token.setProvider(provider);

                const network = await provider.getNetwork();
                dispatch.token.setNetworkName(network.name);

                const accounts = await provider.send("eth_requestAccounts", []);
                dispatch.token.setAccount(accounts[0]);
                
                const contract = new Contract(ERC20_CONTRACT_ADDR, CONTRACT_ABI, provider);
                dispatch.token.setContract(contract);
                console.log("Initializing>>>>>>>>>>>>>>>>>>>>>>>>>>>", contract);


                const name = await contract.name();
                console.log("Name>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                dispatch.token.setTokenName(name);

                await this.updateBalance();

                // Set up MetaMask event listeners
                this.setupEventListeners();
            } catch (err: any) {
                dispatch.token.setError(err.message || 'Failed to initialize contract');
                console.error("Initialization error:", err);
            }
        },

        setupEventListeners() {
            if (!window.ethereum) return;

            // Handle account changes
            const handleAccountsChanged = async (accounts: string[]) => {
                if (accounts.length > 0) {
                    dispatch.token.setAccount(accounts[0]);
                    await this.updateBalance();
                } else {
                    dispatch.token.resetState();
                }
            };

            // Handle network changes
            const handleChainChanged = async () => {
                await this.initializeContract();
            };

            // Handle disconnect
            const handleDisconnect = () => {
                dispatch.token.resetState();
            };

            // Remove any existing listeners to prevent duplicates
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
            window.ethereum.removeListener('disconnect', handleDisconnect);

            // Add listeners
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);
            window.ethereum.on('disconnect', handleDisconnect);
        },

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
                        dispatch.token.setError('Failed to add Hardhat network');
                    }
                } else {
                    dispatch.token.setError('Failed to switch network');
                }
            }
        },

        async updateBalance(_, rootState) {
            const state = rootState.token;
            if (!state.contract || !state.account) return;

            try {
                const balance = await state.contract.balanceOf(state.account);
                dispatch.token.setBalance(formatEther(balance));
            } catch (err) {
                dispatch.token.setError('Error fetching balance');
            }
        },

        async transfer(
            { to, amount }: { to: string; amount: string },
            rootState
        ) {
            const state = rootState.token;
            if (!state.contract || !state.provider) {
                dispatch.token.setError('Contract not initialized');
                return;
            }

            try {
                dispatch.token.setError('');
                dispatch.token.setIsTransferring(true);

                if (!isAddress(to) || to === ZeroAddress) {
                    throw new Error('Invalid recipient address');
                }

                if (isNaN(Number(amount)) || Number(amount) <= 0) {
                    throw new Error('Invalid amount');
                }

                const signer = await state.provider.getSigner();
                const contractWithSigner = state.contract.connect(signer);
                const transferAmount = parseEther(amount);

                const tx = await contractWithSigner.transfer(to, transferAmount, {
                    gasLimit: 100000
                });

                await tx.wait();
                await this.updateBalance();

                return tx;
            } catch (err: any) {
                dispatch.token.setError(err.message || 'Transfer failed');
                throw err;
            } finally {
                dispatch.token.setIsTransferring(false);
            }
        }
    })
});