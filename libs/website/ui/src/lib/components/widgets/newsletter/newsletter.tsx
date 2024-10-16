import { Button, Input, Typography } from "@material-tailwind/react";

const newsletterContent = {
    title: "Stay Informed on Financial Innovation",
    description: "The future of finance is decentralized. Subscribe to our newsletter and be at the forefront of the blockchain-powered financial revolution.",
    inputLabel: "Enter your email",
    buttonText: "Subscribe"
};

export function NewsLetter() {
    return (
        <>
            <div className="w-full flex flex-col items-center">
                <Typography
                    variant="h1"
                    className="mb-4 text-3xl !leading-tight lg:text-5xl text-gray-100 text-center"
                >
                    {newsletterContent.title}
                </Typography>
                <Typography
                    variant="lead"
                    className="mx-auto max-w-5xl text-center !text-neutral-light"
                >
                    {newsletterContent.description}
                </Typography>
                <div className="mt-2 lg:mt-8 px-4 w-full max-w-md flex flex-col md:flex-row gap-3">
                    <Input
                        label={newsletterContent.inputLabel}
                        color="white"
                        className="flex-grow"
                    />
                    <Button
                        color="white"
                        size="md"
                        className="flex-shrink-0 md:self-end"
                    >
                        {newsletterContent.buttonText}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default NewsLetter;