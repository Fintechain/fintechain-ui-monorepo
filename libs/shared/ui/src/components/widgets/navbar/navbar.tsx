import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface NavItemPropsType {
    label: string;
    href: string
}

function NavItem({ label, href }: NavItemPropsType) {
    return (
        <a href={href}>
            <Typography as="li" className="p-1 font-medium">
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);

    return (
        <Navbar className="" color="transparent" fullWidth>
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 cursor-pointer text-lg font-bold"
                >
                    {title}
                </Typography>
                <div className="hidden lg:block">
                    <NavList navItems={navItems} />
                </div>
                <Button className="rounded-full flex items-center gap-2  bg-primary-dark hover:from-blue-700 hover:to-indigo-700">
                    <Bars3Icon className="h-5 w-5" /> Sign In
                </Button>

                <IconButton
                    size="sm"
                    variant="text"
                    onClick={handleOpen}
                    className="ml-auto inline-block text-neutral-light lg:hidden"
                >
                    {open ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={open}>
                <div className="mt-2 rounded-xl bg-white py-2">
                    <NavList navItems={navItems} />
                    <Button className="mb-2" fullWidth>
                        Sign in
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}

export default NavbarWithSimpleLinks;
