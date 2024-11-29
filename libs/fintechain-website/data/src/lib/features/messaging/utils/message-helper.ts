import { ethers } from "ethers";

export const ERC20_CONTRACT_ADDR = "0x0a663f9b6d38E4D6B838446a7704db9e8b1E7a14";
export const MESSAGING_CONTRACT_ADDR = "0x740c563188017d90BD1315FB3b7F022D78A9aAD8";
export const BLOCKCHAIN_NETWORK = {
    chainId: '0x539',
    chainName: 'Ethereum Live',
    rpcUrls: ['http://127.0.0.1:7545'],
};


export function CreatePACS008Payload(
    debtorAgent: string,
    creditorAgent: string,
    token: string,
    amount: bigint,
    instructionId: string
) {
    // Create field selectors (4 bytes each)
    const debtorAgentSelector = ethers.id("debtorAgent").slice(0, 10);  // First 4 bytes
    const creditorAgentSelector = ethers.id("creditorAgent").slice(0, 10);
    const tokenSelector = ethers.id("token").slice(0, 10);
    const amountSelector = ethers.id("amount").slice(0, 10);
    const instructionIdSelector = ethers.id("instructionId").slice(0, 10);

    // Encode each field with its selector
    const encodedFields = [
        // debtorAgent field
        {
            selector: debtorAgentSelector,
            value: ethers.zeroPadValue(ethers.getAddress(debtorAgent), 32)
        },
        // creditorAgent field
        {
            selector: creditorAgentSelector,
            value: ethers.zeroPadValue(ethers.getAddress(creditorAgent), 32)
        },
        // token field
        {
            selector: tokenSelector,
            value: ethers.zeroPadValue(ethers.getAddress(token), 32)
        },
        // amount field
        {
            selector: amountSelector,
            value: ethers.zeroPadValue(ethers.toBeHex(amount), 32)
        },
        // instructionId field
        {
            selector: instructionIdSelector,
            value: ethers.zeroPadValue(instructionId, 32)
        }
    ];

    // Concatenate all fields
    return ethers.concat(
        encodedFields.map(field => ethers.concat([field.selector, field.value]))
    );
}