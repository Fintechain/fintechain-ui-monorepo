import React from "react";
import { Typography } from "@material-tailwind/react";
import { FingerPrintIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";

interface IconPropsType {
  children: React.ReactNode;
}

function Icon({ children }: IconPropsType) {
  return (
    <div className="mb-6 grid h-12 w-12 place-items-center rounded-full bg-gray-900 p-2.5 text-white">
      {children}
    </div>
  );
}

export function AboutSection() {
  return (
    <>
      <div className="container mx-auto mb-20 grid items-start gap-y-8 lg:grid-cols-2">
        <img
          src={`https://www.material-tailwind.com/img/features1.jpg`}
          alt="delive instant answers"
          className="h-full max-h-[450px] w-full object-cover"
        />
        <div className="grid w-full items-center lg:px-8">
          <Icon>
            <RectangleGroupIcon className="h-6 w-6" />
          </Icon>
          <Typography
            variant="h3"
            color="blue-gray"
            className="mb-4 !text-2xl font-bold lg:!text-3xl"
          >
            Awesome Features
          </Typography>
          <Typography
            variant="lead"
            className="mb-10 font-normal"
          >
            The kit comes with three pre-built pages to help you get started
            faster. You can change the text and images and you&apos;re good to
            go.
          </Typography>
          <ul className="flex list-disc flex-col gap-6 pl-4 font-normal">
            <li>Carefully crafted components</li>
            <li>Amazing page examples</li>
            <li>Super friendly support team</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto grid items-start gap-y-8 lg:grid-cols-2">
        <div className="row-start-2 grid w-full items-center lg:row-auto lg:pr-10">
          <Icon>
            <FingerPrintIcon className="h-6 w-6" />
          </Icon>
          <Typography
            variant="h3"
            className="mb-4 !text-2xl font-bold lg:!text-3xl"
          >
            Improved Platform
          </Typography>
          <Typography
            variant="lead"
            className="mb-10 font-norma"
          >
            If you have the opportunity to play this game of life you need to
            appreciate every moment. A lot of people don&apos;t appreciate the
            moment until it&apos;s passed.
          </Typography>
          <ul className="flex list-disc flex-col gap-6 pl-4 !font-normal0">
            <li>Showcase and embed your work with</li>
            <li>Publish across social channels in a click</li>
            <li>Sell your videos worldwide</li>
          </ul>
        </div>
        <img
          src={`https://www.material-tailwind.com/img/features2.jpg`}
          alt="manage your team with reports"
          className="h-full w-full lg:min-h-[450px] object-cover"
        />
      </div>
    </>
  );
}

export default AboutSection;
