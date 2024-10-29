import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
} from "@material-tailwind/react";
import { useWalletProvider } from "../../../hooks/useWalletProvider";

export interface Web3WalletsDialogProps {
    open: boolean;
    handleOpen: any;
}

export function Web3WalletsDialog({ open, handleOpen }: Web3WalletsDialogProps) {
    const { wallets, connectWallet } = useWalletProvider()
    
    return (
        <Dialog 
            size="xs" 
            open={open} 
            handler={handleOpen}
            className="bg-dark border border-primary/20 shadow-xl backdrop-blur-sm"
        >
            <DialogHeader className="justify-between border-b border-primary/20">
                <div>
                    <Typography variant="h5" className="text-white">
                        Detected Wallets
                    </Typography>
                    <Typography className="text-gray-400 font-normal">
                        Choose a wallet to connect
                    </Typography>
                </div>
                <IconButton
                    className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-primary/20 transition-colors duration-200"
                    onClick={handleOpen}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="h-5 w-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </IconButton>
            </DialogHeader>

            <DialogBody className="overflow-y-scroll !px-5">
                <div className="mb-6">
                    <ul className="mt-3 -ml-2 flex flex-col gap-1">
                        {Object.keys(wallets).length > 0 ? (
                            Object.values(wallets).map((provider: EIP6963ProviderDetail) => (
                                <MenuItem 
                                    key={provider.info.uuid}
                                    onClick={() => connectWallet(provider.info.rdns)}
                                    className="mb-4 flex items-center gap-3 p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-200 border border-primary/20"
                                >
                                    <img
                                        src={provider.info.icon}
                                        alt={provider.info.name}
                                        className="h-8 w-8"
                                    />
                                    <Typography
                                        className="text-white font-semibold"
                                    >
                                        {provider.info.name}
                                    </Typography>
                                </MenuItem>
                            ))
                        ) : (
                            <div className="text-gray-400 text-center py-4">
                                No Web3 Wallets Detected
                            </div>
                        )}
                    </ul>
                </div>
            </DialogBody>

            <DialogFooter className="justify-between gap-2 border-t border-primary/20 px-6 py-4">
                <Typography className="text-accent font-semibold">
                    FinteChain
                </Typography>
            </DialogFooter>
        </Dialog>
    );
}