// header.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch } from 'react-redux';
import { formatAddress, useAccountBalance, useWalletProvider, Web3WalletsDialog } from '@fintechain-monorepo/ethereum-ui';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';

export interface HeaderProps {
    brandName?: string;
    logoUrl?: string;
    menuItems?: any[];
    className?: string;
    showAuth?: boolean;
    isTransparent?: boolean;
}

export function Header({
    brandName = 'Fintechain',
    logoUrl,
    menuItems = [
        { id: '1', label: 'Home', href: '/' },
        { id: '2', label: 'About', href: '/about' },
        { id: '3', label: 'Your Needs', href: '/needs' },
        { id: '4', label: 'Solutions', href: '/solutions' },
        { id: '5', label: 'Docs', href: '/' },
        { id: '6', label: 'Blog', href: '/' },
        { id: '7', label: 'Contact', href: '/contact' }
    ],
    className = '',
    showAuth = true,
    isTransparent = false
}: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);



    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    const {
        selectedWallet,
        selectedAccount,
        disconnectWallet,
        errorMessage,
        clearError,
    } = useWalletProvider();

    const { balance } = useAccountBalance();


    const isError = !!errorMessage;

    useEffect(() => {
        if (isError) {
            handleOpen();
            dispatch.errorModel.handleError(new Error(errorMessage));
            clearError(); // Optionally clear the error after dispatching
        }
        if (selectedAccount && open) {
            handleOpen();
        }
    }, [errorMessage, selectedAccount, isError, clearError, dispatch]);








    const headerClasses = `
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-dark
        ${isScrolled
            ? 'bg-dark/80 backdrop-blur-sm border-b border-primary/10'
            : isTransparent ? 'bg-transparent' : 'bg-dark/80 backdrop-blur-sm'}
        ${className}
    `;

    const linkClasses = (isActive: boolean) => `
        transition-colors duration-200
        ${isActive
            ? 'bg-primary/20 text-accent'
            : 'text-gray-300 hover:text-accent hover:bg-primary/10'}
        px-3 py-2 rounded-md text-sm font-medium
    `;

    const brandClasses = `
        text-xl font-bold text-white hover:text-accent transition-colors duration-200
    `;

    const mobileMenuClasses = `
        md:hidden bg-dark/95 backdrop-blur-sm border-t border-primary/10 shadow-lg
    `;

    const mobileLinkClasses = (isActive: boolean) => `
        block px-3 py-2 rounded-md text-base font-medium
        ${isActive
            ? 'bg-primary/20 text-accent'
            : 'text-gray-300 hover:text-accent hover:bg-primary/10'}
    `;

    const isActive = (href: string) => location.pathname === href;

    return (

        <header className={headerClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Brand/Logo */}
                    <div className="flex items-center">
                        <Link to="/" className={brandClasses}>
                            {logoUrl ? (
                                <img
                                    src={logoUrl}
                                    alt={brandName}
                                    className="h-8 w-auto"
                                />
                            ) : (
                                <span>
                                    {brandName}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center space-x-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                to={item.href}
                                className={linkClasses(isActive(item.href))}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {!selectedAccount && (
                            <>
                                <Button
                                    onClick={handleOpen}
                                    className="px-6 py-2 bg-accent text-white rounded-full hover:bg-accent/90 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Connect
                                </Button>
                                {/* <Button
                                    variant="outlined"
                                    className="px-6 py-2 rounded-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Request Demo
                                </Button> */}
                            </>
                        )}

                        {selectedAccount && (
                            <>
                                <Menu dismiss={{ itemPress: false }}>
                                    <MenuHandler>
                                        <Button
                                            className="px-6 py-2 bg-primary/20 text-white rounded-full hover:bg-primary/30 transition-all duration-200 flex items-center gap-2"
                                        >
                                            <UserCircleIcon className="w-5 h-5" />
                                            {formatAddress(selectedAccount)}
                                        </Button>
                                    </MenuHandler>
                                    <MenuList className="bg-dark/95 backdrop-blur-sm border border-primary/20 p-2">
                                        <MenuItem className="text-gray-200 hover:bg-primary/20 rounded-lg transition-all duration-200">
                                            {selectedAccount}
                                        </MenuItem>
                                        <hr className="border-primary/20 my-2" />
                                        <MenuItem className="text-gray-200 hover:bg-primary/20 rounded-lg transition-all duration-200">
                                            Balance: {balance} ETH
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                                <Button
                                    onClick={disconnectWallet}
                                    className="px-6 py-2 rounded-full bg-transparent border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                                >
                                    Disconnect
                                </Button>
                            </>
                        )}


                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-300 hover:text-accent hover:bg-primary/10"
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className={mobileMenuClasses}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={mobileLinkClasses(isActive(item.href))}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <Web3WalletsDialog open={open} handleOpen={handleOpen} />
        </header>

    );
}