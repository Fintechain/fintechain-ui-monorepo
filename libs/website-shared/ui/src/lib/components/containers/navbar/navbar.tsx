import React, { useState } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Web3Dialog } from "@fintechain-monorepo/ethereum-ui";
import { WalletData } from "@fintechain-monorepo/ethereum-data";
interface NavItemPropsType {
    label: string;
    href: string
}

function NavItem({ label, href }: NavItemPropsType) {
    return (
        <a href={href}>
            <Typography as="li" className="p-1 font-bold">
                {label}
            </Typography>
        </a>
    );
}
export interface NavListProps {
    navItems: Array<{ label: string; href: string }>;
}

export const NavList: React.FC<NavListProps> = ({ navItems }) => {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
            {navItems.map((item, index) => (
                <NavItem key={index} label={item.label} href={item.href} />
            ))}
        </ul>
    );
}

export interface NavbarProps {
    title: string;
    navItems: Array<{ label: string; href: string }>;
}
export const NavbarWithSimpleLinks: React.FC<NavbarProps> = ({ title, navItems }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogToggle = () => setIsDialogOpen(!isDialogOpen);


    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState("");

    // Display a readable user address.
    const formatAddress = (addr: string) => {
        const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
        return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
    }


    const handleOnConnected = (data: WalletData) => {
        setIsConnected(true);
        setAccount(data.accounts?.[0])
        console.log("Connected #########", data)
    };

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);

    return (
        <Navbar className="bg-blue-gray-50" fullWidth>
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 cursor-pointer text-2xl font-extrabold"
                >
                    {title}
                </Typography>
                <div className="hidden lg:block">
                    <NavList navItems={navItems} />
                </div>
                {/* <Button className="rounded-full flex items-center gap-2  bg-primary-dark hover:from-blue-700 hover:to-indigo-700">
                    <Bars3Icon className="h-5 w-5" /> Sign In
                </Button> */}



                {isConnected ? (
                    <><Button
                        onClick={handleDialogToggle}
                        className="mb-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 ">{formatAddress(account)}</Button></>
                ) : (
                    <>
                        <Button
                            onClick={handleDialogToggle}
                            className="hidden text-neutral-light lg:inline-block mb-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 ">
                            Connect Wallet
                        </Button>
                    </>
                )}
                <Web3Dialog
                    open={isDialogOpen}
                    handleOpen={handleDialogToggle}
                    onConnected={handleOnConnected} />

                <IconButton
                    size="sm"
                    variant="text"
                    onClick={handleOpen}
                    className="ml-auto inline-block text-neutral-dark lg:hidden"
                >
                    {open ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={open}>
                <div className="mt-2 rounded-xl bg-neutral-light -50 text-neutral-dark py-2 lg:hidden ">
                    <NavList navItems={navItems} />
                    {isConnected ? (
                        <>
                            <Button
                                onClick={handleDialogToggle}
                                className="mb-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 " fullWidth>
                                {formatAddress(account)}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={handleDialogToggle}
                                className="mb-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 " fullWidth>
                                Connect Wallet
                            </Button>
                        </>
                    )}
                </div>
            </Collapse>
        </Navbar>
    );
}

export default NavbarWithSimpleLinks;
