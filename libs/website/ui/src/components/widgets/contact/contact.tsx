import React from "react";
import {
  Button,
  Card,
  CardBody,
  IconButton,
  Input,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";

export function ContactSection() {
  return (
    <section className="px-8 py-10 lg:py-16">
      <div className="container mx-auto mb-10 text-center lg:mb-20">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mb-4 !text-3xl lg:!text-4xl"
        >
          Contact Us
        </Typography>
        <Typography variant="lead" className="mx-auto !text-gray-500">
          Any questions or remarks? Just write us a messaage!
        </Typography>
      </div>
      <Card
        shadow={true}
        className="max-w-[85rem] mx-auto rounded-2xl"
      >
        <CardBody className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="rounded-2xl bg-gray-900 lg:p-20 p-10 lg:max-w-xl">
            <Typography
              variant="h4"
              color="white"
              className="mb-4 text-xl lg:text-3xl"
            >
              Contact Information
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="lg:mb-12 mb-8 text-base opacity-50 max-w-sm"
            >
              Fill up the form and our Team will get back to you within 24
              hours.
            </Typography>
            <div className="flex items-center gap-5">
              <PhoneIcon className="h-5 w-5 text-white" />
              <Typography variant="h6" color="white">
                +1(424) 535 3523
              </Typography>
            </div>
            <div className="my-4 flex items-center gap-5">
              <EnvelopeIcon className="h-5 w-5 text-white" />
              <Typography variant="h6" color="white">
                hello@mail.com
              </Typography>
            </div>
            <div className="mb-12 flex items-center gap-5">
              <TicketIcon className="h-5 w-5 text-white" />
              <Typography variant="h6" color="white">
                Open Support Ticket
              </Typography>
            </div>
            <div className="flex items-center gap-1.5">
              <a href="#buttons-with-link">
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-twitter text-xl" />
                </IconButton>
              </a>
              <a href="#buttons-with-link">
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-linkedin text-xl" />
                </IconButton>
              </a>
              <a href="#buttons-with-link">
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-dribbble text-xl" />
                </IconButton>
              </a>
              <a href="#buttons-with-link">
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-facebook text-xl" />
                </IconButton>
              </a>
            </div>
          </div>
          <form
            action="#"
            className="flex flex-col gap-12 p-2 lg:max-w-xl"
          >
            <div className="grid grid-cols-2 gap-6">
              <Input
                color="gray"
                size="lg"
                variant="static"
                label="First Name"
                name="first-name"
                placeholder="eg. Lucas"
                containerProps={{
                  className: "!min-w-full md:mb-0",
                }}
              />
              <Input
                color="gray"
                size="lg"
                variant="static"
                label="Last Name"
                name="last-name"
                placeholder="eg. Jones"
                containerProps={{
                  className: "!min-w-full",
                }}
              />
            </div>
            <Input
              color="gray"
              size="lg"
              variant="static"
              label="Email"
              name="first-name"
              placeholder="eg. lucas@mail.com"
              containerProps={{
                className: "!min-w-full",
              }}
            />
            <Typography
              variant="small"
              className="!text-gray-500 !font-normal"
            >
              What are you interested on?
            </Typography>
            <div className="-m-10 -ml-3 mb-2 flex flex-wrap gap-x-6">
              <Radio color="gray" name="type" label="Design" checked />
              <Radio color="gray" name="type" label="Development" />
              <Radio color="gray" name="type" label="Support" />
              <Radio color="gray" name="type" label="Other" />
            </div>
            <Input
              color="gray"
              size="lg"
              variant="static"
              label="Your Message"
              name="first-name"
              containerProps={{
                className: "!min-w-full",
              }}
            />
            <div className="flex w-full !justify-end">
              <Button className="w-full md:w-fit" color="gray">
                Send message
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}

export default ContactSection;
