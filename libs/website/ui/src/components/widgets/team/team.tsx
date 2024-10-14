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
            <i className="fa-brands fa-dribbble text-lg" />
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
}

const members = [
  {
    img: `https://www.material-tailwind.com/img/avatar1.jpg`,
    name: "Ryan Samuel",
    title: "Co-Founder",
  },
  {
    img: `https://www.material-tailwind.com/img/avatar2.jpg`,
    name: "Jordan Michael",
    title: "Front-End Developer",
  },
  {
    img: `https://www.material-tailwind.com/img/avatar5.jpg`,
    name: "Nora Hazel",
    title: "UI/UX Designer",
  },
  {
    img: `https://www.material-tailwind.com/img/avatar4.jpg`,
    name: "Otto Gonzalez",
    title: "Marketing Specialist",
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
          The Executive Team
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto !text-gray-900 max-w-4xl"
        >
          This is the paragraph where you can write more details about your
          team. Keep you user engaged by providing meaningful information.
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
