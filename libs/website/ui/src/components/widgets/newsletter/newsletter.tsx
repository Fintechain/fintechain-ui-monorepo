import { Button, Input, Typography } from "@material-tailwind/react";

export function NewsLetter() {
    return (
        <>
            <div className="w-full grid justify-items-center">
                <Typography
                    variant="h1"
                    className="mb-4 text-3xl !leading-tight lg:text-5xl text-gray-100" 
                >
                    Be the first who see the news
                </Typography>
                <Typography
                    variant="lead"
                    className="mx-auto max-w-5xl text-center !text-neutral-light"
                >
                    Your company may not be in the software business, but eventually, a
                    software company will be
                </Typography>
                <div className="mt-2 lg:mt-8 px-12 flex w-full flex-col gap-3 md:w-fit md:flex-row">
                    <Input label="Email" color="white" />
                    <Button color="white" size="md" className="flex-shrink-0">
                        button
                    </Button>
                </div>
            </div>
        </>
    );
}
export default NewsLetter;
