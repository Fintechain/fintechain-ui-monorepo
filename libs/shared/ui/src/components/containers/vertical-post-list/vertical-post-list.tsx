import React from "react";
import { Typography, Button } from "@material-tailwind/react";

export function VerticalPostList() {
  return (
    <>
      <div className="container mx-auto grid h-full min-h-[85vh] w-full grid-cols-1 items-center gap-x-16 gap-y-6 p-8 lg:grid-cols-2">
        <div className="col-span-1">
          <Typography
            color="blue-gray"
            className="mb-4 font-bold uppercase"
          >
            house
          </Typography>
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-3 !text-2xl !leading-snug lg:!text-3xl"
          >
            Warner Music Group buys concert discovery service Songkick
          </Typography>
          <Typography
            variant="lead"
            className="mb-4 w-full !text-gray-500"
          >
            Warner Music Group announced today it&apos;s acquiring the selected
            assets of the music platform Songkick, including its app for finding
            concerts and the company&apos;s trademark. Songkick has been
            involved in a lawsuit against the major…{" "}
            <Button variant="text" size="lg" className="!py-2 !px-4">
              Read More
            </Button>
          </Typography>
          <div className="flex flex-col gap-2 md:flex-row">
            <Typography
              variant="paragraph"
              className="font-bold !text-gray-600"
            >
              by Millie Borough,
            </Typography>
            <Typography
              variant="paragraph"
              className="font-normal !text-gray-500"
            >
              10 days ago
            </Typography>
          </div>
        </div>
        <img
          src="https://www.material-tailwind.com/image/blog-2.png"
          alt="blog"
          className="col-span-1 w-full rounded-lg object-cover shadow-md"
        />
      </div>
    </>
  );
}

export default VerticalPostList;
