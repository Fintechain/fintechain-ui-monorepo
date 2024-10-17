import React from "react";
import {
    Button,
    Card,
    CardBody,
    Input,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";

export function ContactForm() {
    return (
        <>
            
            <div>
                <Card
                    shadow={true}
                    className="max-w-[85rem] mx-auto rounded-2xl"
                >
                    <CardBody className="grid grid-cols-1 gap-x-20 gap-y-8 lg:grid-cols-2 items-center">
                        <form
                            action="#"
                            className="flex flex-col gap-12 lg:max-w-lg mx-auto w-full"
                        >
                            <div className="grid grid-cols-2 gap-6">
                                <Input
                                    color="gray"
                                    size="lg"
                                    label="First Name"
                                    name="first-name"
                                    placeholder="eg. Lucas"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                />
                                <Input
                                    color="gray"
                                    size="lg"
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
                                label="Email"
                                name="email"
                                placeholder="eg. lucas@mail.com"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                            />
                            <Input
                                color="gray"
                                size="lg"
                                label="Your Message"
                                name="message"
                            />
                            <div className="flex !justify-end lg:mt-24">
                                <Button
                                    className="w-full md:w-fit bg-primary-dark"
                                    size="md"
                                >
                                    Send message
                                </Button>
                            </div>
                        </form>
                        <div className="rounded-2xl bg-secondary-dark lg:p-20 p-10 w-full">
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
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default ContactForm;
