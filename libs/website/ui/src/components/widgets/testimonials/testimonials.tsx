import React from "react";
import { Typography, Card, CardBody, Avatar } from "@material-tailwind/react";

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <Typography variant="h2" color="blue-gray" className="mb-12 text-center text-3xl font-bold">
          What Our Clients Say
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardBody className="p-6">
                <Typography variant="paragraph" color="gray" className="mb-4 font-normal italic">
                  "{testimonial.content}"
                </Typography>
                <div className="flex items-center gap-4">
                  <Avatar src={testimonial.avatar} alt={testimonial.author} size="lg" />
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {testimonial.author}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                      {testimonial.position}, {testimonial.company}
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

// Example usage:
// const testimonials = [
//   {
//     content: "This technology has transformed our business processes, increasing efficiency by 50%.",
//     author: "Jane Doe",
//     position: "CTO",
//     company: "Tech Innovators Inc.",
//     avatar: "/path/to/jane-avatar.jpg"
//   },
//   {
//     content: "The support team is incredible. They're always there when we need them, ensuring smooth operations.",
//     author: "John Smith",
//     position: "Operations Manager",
//     company: "Global Solutions Ltd.",
//     avatar: "/path/to/john-avatar.jpg"
//   },
//   {
//     content: "Implementing this solution was a game-changer for our startup. It's intuitive, powerful, and scalable.",
//     author: "Emily Chen",
//     position: "Founder",
//     company: "NextGen Startup",
//     avatar: "/path/to/emily-avatar.jpg"
//   },
// ];
// 
// function App() {
//   return (
//     <div>
//       <Hero ... />
//       <SolutionsSection ... />
//       <TestimonialsSection testimonials={testimonials} />
//     </div>
//   );
// }