import { Typography, Card, Button } from "@material-tailwind/react";
import {
  CursorArrowRaysIcon,
  FingerPrintIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

interface StatsCardPropsType {
  icon: React.ReactNode;
  percentage: string;
  percentage2: string;
  percentageDetail: string;
  percentageDesc: string;
}

function StatsCard({
  icon,
  percentage,
  percentage2,
  percentageDesc,
  percentageDetail,
}: StatsCardPropsType) {
  return (
    <Card
      color="transparent"
      shadow={false}
      className="border border-gray-300 p-6"
    >
      {icon}
      <Typography variant="h3" color="blue-gray" className="mt-6">
        {percentage}
      </Typography>
      <Typography className="!text-gray-500 font-normal">
        {percentageDetail}
      </Typography>
      <Typography variant="h3" color="blue-gray" className="mt-4">
        {percentage2}
      </Typography>
      <Typography className="font-normal text-gray-500">
        {percentageDesc}
      </Typography>
    </Card>
  );
}

const stats = [
  {
    icon: <CursorArrowRaysIcon className="h-12 w-12 text-gray-900" />,
    percentage: "35%",
    percentageDetail: "YoY growth in active users",
    percentage2: "45%",
    percentageDesc: "Increase in project completion rate",
  },
  {
    icon: <FingerPrintIcon className="h-12 w-12 text-gray-900" />,
    percentage: "85%",
    percentageDetail: "Decrease in churn rate",
    percentage2: "150%",
    percentageDesc: "Growth in user engagement",
  },
  {
    icon: <FireIcon className="h-12 w-12 text-gray-900" />,
    percentage: "70%",
    percentageDetail: "Reduction in development time",
    percentage2: "$12M",
    percentageDesc: "Raised in latest funding round",
  },
];

export function StatsSection() {
  return (
    <section className="px-8 py-10 lg:py-28">
      <div className="container mx-auto">
        <Typography variant="lead" className="!text-gray-500">
          Impacts
        </Typography>
        <Typography
          variant="h2"
          color="blue-gray"
          className="my-2 lg:!text-4xl !text-2xl !leading-relaxed md:max-w-3xl"
        >
          Trusted by over 5,000 businesses to improve their digital growth with
          us.
        </Typography>
        <div className="lg:mb-24 mb-10 flex flex-col md:flex-row gap-4 md:items-end justify-between">
          <Typography
            variant="lead"
            className="w-full !text-gray-500 md:max-w-3xl"
          >
            Your commitment to health is inspiring and your stats show it. Your
            contributions have made a significant impact in your community.
          </Typography>
          <Button variant="outlined">Explore more success stories</Button>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((props, key) => (
            <StatsCard key={key} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
