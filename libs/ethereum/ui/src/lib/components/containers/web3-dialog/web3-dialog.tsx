import React, { useState } from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Typography,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { EIP6963ProviderDetail, useSyncProviders, WalletData } from "@fintechain-monorepo/ethereum-data";
interface Web3DialogProps {
    open: boolean;
    handleOpen: () => void;
    onConnected: (data: WalletData) => void
}

export const Web3Dialog: React.FC<Web3DialogProps> = ({ open, handleOpen, onConnected }) => {
    const providers = useSyncProviders();
    const [userAccount, setUserAccount] = useState<string>("")
    const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()

    const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
        try {
            const accounts = (await providerWithInfo.provider.request({
                method: "eth_requestAccounts",
            })) as string[]


            setSelectedWallet(providerWithInfo);
            setUserAccount(accounts?.[0]);
            onConnected({ accounts });

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog size="xs" open={open} handler={handleOpen}>
            <DialogHeader className="justify-between">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Connect a Wallet
                    </Typography>
                    <Typography color="gray" variant="paragraph">
                        Choose which card you want to connect
                    </Typography>
                </div>
                <IconButton
                    color="blue-gray"
                    size="sm"
                    variant="text"
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
                    <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="py-3 font-semibold uppercase opacity-70"
                    >
                        Popular
                    </Typography>
                    <ul className="mt-3 -ml-2 flex flex-col gap-1">
                        {providers.length > 0 ? (
                            providers?.map((provider: EIP6963ProviderDetail) => (
                                <>
                                    {/* <button
                                        key={provider.info.uuid}
                                        onClick={() => handleConnect(provider)}
                                    >
                                        <img src={provider.info.icon} alt={provider.info.name} />
                                        <div>{provider.info.name}</div>
                                    </button> */}

                                    <MenuItem
                                        key={provider.info.uuid}
                                        onClick={() => handleConnect(provider)}
                                        className="mb-4 flex items-center justify-center gap-3 !py-4 shadow-md">
                                        <img
                                            src={provider.info.icon}
                                            alt={provider.info.name}
                                            className="h-6 w-6"
                                        />
                                        <Typography
                                            className="uppercase"
                                            color="blue-gray"
                                            variant="h6"
                                        >
                                            Connect with {provider.info.name}
                                        </Typography>
                                    </MenuItem>
                                </>

                            ))
                        ) : (
                            <div>No Announced Wallet Providers</div>
                        )}
                    </ul>
                </div>
            </DialogBody>
            <DialogFooter className="justify-between gap-2">
                <Typography variant="small" color="gray" className="font-normal">
                    New to Ethereum wallets?
                </Typography>
                <Button variant="outlined" size="sm">
                    Learn More
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default Web3Dialog;