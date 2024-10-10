import React from 'react';
import { NavbarWithSimpleLinks } from '../../widgets/navbar/navbar';

// Define types for props
export interface HeaderProps {
    title: string;
    navItems: Array<{ label: string; href: string }>;
}


// Header Component
export const Header: React.FC<HeaderProps> = ({ title, navItems }) => (
    <NavbarWithSimpleLinks navItems={navItems} title={title}/>
);

