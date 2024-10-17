import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";

import backgroundImage from '../assets/home-splash.jpg';
import backgroundPatternImage from '../assets/home-pattern.jpg';
import servicesBackgroundImage from '../assets/services-splash.jpg';
import about1BackgroundImage from '../assets/storage-splash.jpg';
import about2BackgroundImage from '../assets/chip-splash.jpg';
import aboutBackgroundImage from '../assets/about-splash.jpg';

import { PageView, PostListView, PostView } from "@fintechain-monorepo/wordpress-ui";
import { Home, Contact, HomeProps, About, NeedsView, SolutionsView, PhilosophyView } from "@fintechain-monorepo/website-ui";
import { SiteLayout, FooterProps, HeaderProps, } from "@fintechain-monorepo/shared-ui";

const App: React.FC = () => {

	const homeProps: HomeProps = {
		backgroundImages: {
			backgroundImage,
			backgroundPatternImage,
			servicesBackgroundImage,
			about1BackgroundImage,
			about2BackgroundImage,
			aboutBackgroundImage
		}
	}

	const headerProps: HeaderProps = {
		title: "Fintechain",
		navItems: [
			{ label: "About Us", href: "/about" },
			{ label: "Your needs", href: "/needs" },
			{ label: "Our solutions", href: "/solutions" },
			{ label: "Docs", href: "/page/privacy-policy" },
			{ label: "Philosophy", href: "/philosophy" },
			{ label: "Blog", href: "/blog" },
			{ label: "Contact", href: "/contact" },
		],
	};

	const footerProps: FooterProps = {
		navItems: [
			{
				title: "Company",
				items: [
					{ label: "About Us", href: "/page/about" },
					{ label: "Careers", href: "/page/careers" },
					{ label: "Blog", href: "/blog" },
				],
			},
			{
				title: "Pages",
				items: [
					{ label: "Connect", href: "/page/docs" },
					{ label: "Philosophy", href: "/page/docs" },
					{ label: "Contact", href: "/page/docs" },
				],
			},
			{
				title: "Legal",
				items: [
					{ label: "Terms", href: "/page/docs" },
					{ label: "Privacy", href: "/page/docs" },
					{ label: "Team", href: "/page/docs" },
				],
			},
			{
				title: "Resources",
				items: [
					{ label: "Docs", href: "/page/docs" },
					{ label: "Services", href: "/page/solutions" },
					{ label: "Pricing", href: "/page/pricing" },
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
					<Route path="/" element={<Home backgroundImages={homeProps.backgroundImages} />} />
					<Route path="/post/:id" element={<PostView />} />
					<Route path="/page/:slug" element={<PageView />} />
					<Route path="/blog" element={<PostListView />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/about" element={<About />} />
					<Route path="/needs" element={<NeedsView />} />
					<Route path="/solutions" element={<SolutionsView />} />
					<Route path="/philosophy" element={<PhilosophyView />} />
				</Routes>
			</SiteLayout>
		</Router>
	);
};

export default App;
