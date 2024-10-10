import React from "react";
import {
	IconButton,
	Typography,
} from "@material-tailwind/react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from "react-router-dom";
import { SiteLayout, FooterProps, HeaderProps, } from "@fintechain-monorepo/shared-ui";
import { Home, About, Contact, Join, Needs, Philosophy, Solutions } from "@fintechain-monorepo/website-ui";
import backgroundImage from '../assets/home-splash.jpg';
import backgroundPatternImage from '../assets/home-pattern.jpg';
// Example usage:
const App: React.FC = () => {
	
	const headerProps: HeaderProps = {
		title: "FinTechain Solutions",
		navItems: [
			{ label: "About Us", href: "/about" },
			{ label: "Your needs", href: "/needs" },
			{ label: "Our solutions", href: "/solutions" },
			{ label: "Docs", href: "/docs" },
			{ label: "Philosophy", href: "/philosophy" },
			{ label: "Join", href: "/join" },
			{ label: "Contact", href: "/contact" },
		],
	};

	const footerProps: FooterProps = {
		navItems: [
			{
				title: "Company",
				items: [
					{ label: "About Us", href: "#about" },
					{ label: "Careers", href: "#careers" },
					{ label: "Premium Tools", href: "#premium" },
					{ label: "Blog", href: "#blog" },
				],
			},
			{
				title: "Pages",
				items: [
					{ label: "Login", href: "#login" },
					{ label: "Register", href: "#register" },
					{ label: "Add List", href: "#add-list" },
					{ label: "Contact", href: "#contact" },
				],
			},
			{
				title: "Legal",
				items: [
					{ label: "Terms", href: "#terms" },
					{ label: "Privacy", href: "#privacy" },
					{ label: "Team", href: "#team" },
					{ label: "About Us", href: "#about" },
				],
			},
			{
				title: "Resources",
				items: [
					{ label: "Blog", href: "#blog" },
					{ label: "Services", href: "#services" },
					{ label: "Product", href: "#product" },
					{ label: "Pricing", href: "#pricing" },
				],
			},
		],
	};

	return (
		<Router>
			<SiteLayout headerProps={headerProps} footerProps={footerProps}>
				{/* 
			 
			
			
			*/}
				<Routes>
					<Route path="/" element={<Home backgroundImage={backgroundImage} backgroundPatternImage={backgroundPatternImage}/>} />
					<Route path="/about" element={<About />} />
					<Route path="/needs" element={<Needs />} />
					<Route path="/solutions" element={<Solutions />} />
					<Route path="/docs" element={<Home backgroundImage={backgroundImage} backgroundPatternImage={backgroundImage} />} />
					<Route path="/philosophy" element={<Philosophy />} />
					<Route path="/join" element={<Join />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</SiteLayout>
		</Router>
	);
};

export default App;
