import contactPageBannerImg from './images/banners/contact-page.jpg';
import aboutPageBannerImg from './images/banners/about-page.jpg';
import needsPageBannerImg from './images/banners/needs-page.jpg';
import solutionsPageBannerImg from './images/banners/solutions-page.jpg';
import homeHeroImg from './images/backgrounds/home-hero.jpg';
import aboutMissionImg from './images/backgrounds/about-mission.jpg';

export const assets = {
    images: {
        banners: {
            contactBanner: contactPageBannerImg,
            aboutBanner: aboutPageBannerImg,
            needsBanner: needsPageBannerImg,
            solutionsBanner: solutionsPageBannerImg,
        },
        backgrounds: {
            home: {
                hero: homeHeroImg
            },
            about: {
                aboutMission: aboutMissionImg
            }
        }
    },
    icons: {
        // SVG imports
    },
    // You can add other asset categories
    backgrounds: {
    },
} as const;


// Type definitions for our assets
export type AssetsType = typeof assets;
export type ImageAssets = typeof assets.images;