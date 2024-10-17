import {
    Card,
    CardBody,
    Avatar,
    IconButton,
    Typography,
} from "@material-tailwind/react";

interface TeamCardPropsType {
    img: string;
    name: string;
    title: string;
}

function TeamCard({ img, name, title }: TeamCardPropsType) {
    return (
        <Card color="transparent" shadow={false}>
            <CardBody className="text-center">
                <Avatar
                    src={img}
                    alt={name}
                    variant="circular"
                    size="xxl"
                    className="mx-auto mb-6 object-top"
                />
                <Typography variant="h5" color="blue-gray" className="!font-medium text-gray-900">
                    {name}
                </Typography>
                <Typography
                    color="gray"
                    variant="small"
                    className="mb-2 text-lg !font-semibold !text-gray-900"
                >
                    {title}
                </Typography>
                <div className="flex items-center justify-center gap-1.5">
                    <IconButton variant="text" color="gray">
                        <i className="fa-brands fa-twitter text-lg" />
                    </IconButton>
                    <IconButton variant="text" color="gray">
                        <i className="fa-brands fa-linkedin text-lg" />
                    </IconButton>
                    <IconButton variant="text" color="gray">
                        <i className="fa-brands fa-github text-lg" />
                    </IconButton>
                </div>
            </CardBody>
        </Card>
    );
}

const teamContent = {
    title: "Leadership Team",
    description: "Meet the visionaries behind Fintechain's revolutionary financial technology. Our leadership team brings together expertise in blockchain, finance, and technology to drive the future of decentralized finance.",
};

const members = [
    {
        img: `https://www.material-tailwind.com/img/avatar1.jpg`,
        name: "Alex Cheng",
        title: "CEO & Co-Founder",
    },
    {
        img: `https://www.material-tailwind.com/img/avatar2.jpg`,
        name: "Sarah Nakamoto",
        title: "CTO & Co-Founder",
    },
    {
        img: `https://www.material-tailwind.com/img/avatar5.jpg`,
        name: "Elena Rodriguez",
        title: "Chief Financial Officer",
    },
    {
        img: `https://www.material-tailwind.com/img/avatar4.jpg`,
        name: "Michael O'Brien",
        title: "Chief Compliance Officer",
    },
];

export function TeamSection() {
    return (
        <>
            <div className="mb-10 text-center lg:mb-20">
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-4 text-3xl lg:text-5xl"
                >
                    {teamContent.title}
                </Typography>
                <Typography
                    variant="lead"
                    className="mx-auto !text-gray-900 max-w-4xl"
                >
                    {teamContent.description}
                </Typography>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((props, key) => (
                    <TeamCard key={key} {...props} />
                ))}
            </div>
        </>
    );
}

export default TeamSection;