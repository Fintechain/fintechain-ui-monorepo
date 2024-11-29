import { BrowserProvider, Contract } from 'ethers';

export interface TokenState {
    provider: BrowserProvider | null;
    contract: Contract | null;
    account: string;
    balance: string;
    tokenName: string;
    error: string;
    networkName: string;
    isTransferring: boolean;
}