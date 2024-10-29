import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWalletProvider } from './useWalletProvider'; // Adjust the import path
import { formatBalance } from '../utils';

declare global {
    interface Window {
        ethereum: any;
    }
}

export const useAccountBalance = () => {
    const [balance, setBalance] = useState<string | null>(null);
    const { selectedAccount, selectedWallet } = useWalletProvider();

    useEffect(() => {
        const getAccountBalance = async (account: string) => {
            try {
                if (selectedWallet) {
                    const provider = new ethers.BrowserProvider(selectedWallet.provider)
                    const balance = await provider.getBalance(account);
                    const balanceInEther = formatBalance(balance.toLocaleString());
                    setBalance(balanceInEther);
                } else {
                    console.error('No wallet provider found');
                }
            } catch (error) {
                console.error('Error fetching account balance:', error);
            }
        };

        if (selectedAccount) {
            getAccountBalance(selectedAccount);
        }
    }, [selectedAccount]);

    return { account: selectedAccount, balance };
};

export default useAccountBalance;
