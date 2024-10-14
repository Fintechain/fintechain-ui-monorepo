import { HorizontalPostList, UiSection, VerticalPostList } from "@fintechain-monorepo/shared-ui";
const posts = [
    {
        id: 1,
        img: "https://www.material-tailwind.com/image/blog-9.png",
        tag: "Enterprise",
        title: "Autodesk looks to future of 3D printing with Project Escher",
        desc: "Finding temporary housing for your dog should be as easy as renting an Airbnb. That's the idea behind Rover",
    },
    {
        id: 2,
        img: "https://www.material-tailwind.com/image/blog-10.jpeg",
        tag: "Startups",
        title: "Lyft launching cross-platform service this week",
        desc: "If you've ever wanted to train a machine learning model and integrate it with IFTTT, you now can ",
    },
    {
        id: 3,
        img: "https://www.material-tailwind.com/image/blog-11.jpeg",
        tag: "Business",
        title: "6 insights into the French Fashion landscape",
        desc: "Insticator is announcing that it has raised $5.2 million in Series A funding. The startup allows online ",
    },
    {
        id: 4,
        img: "https://www.material-tailwind.com/image/blog-12.jpeg",
        tag: "Enterprise",
        title: "6 insights into the French Fashion landscape",
        desc: "Venture investment in U.S. startups rose sequentially in the second quarter of 2017, boosted by large,",
    },
];
export function Needs() {
    return (


        <UiSection
            backgroundType="color"
            backgroundValue="bg-primary-light"
            className="lg:py-10 py-10 px-8 text-neutral-dark"
            contentClassName=""
        >
            <HorizontalPostList posts={posts} />
            <VerticalPostList />
        </UiSection>
    );
}

export default Needs;
