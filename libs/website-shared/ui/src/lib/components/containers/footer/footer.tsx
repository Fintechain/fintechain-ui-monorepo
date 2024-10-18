import {
    Button,
    Input,
    Typography,
    Select,
    Option,
} from "@material-tailwind/react";

const currentYear = new Date().getFullYear();

export interface FooterProps {
    navItems: Array<{
      title: string;
      items: Array<{ label: string; href: string }>;
    }>;
  }
  
  export const Footer5: React.FC<FooterProps> = ({ navItems }) => {
    return (
        <footer className="bg-primary-dark py-10 px-8">
            <div className="container mx-auto">
                <div className="border-b border-white/50 pb-8 grid grid-cols-1 lg:grid-cols-3 gap-y-10">
                    <div className="lg:row-auto row-start-2 col-span-2 grid grid-cols-2 gap-6 md:grid-cols-4">
                        {navItems.map(({ title, items }) => (
                            <ul key={title}>
                                <Typography variant="h6" color="white" className="mb-2">
                                    {title}
                                </Typography>
                                {items.map((item, index) => (
                                    <li key={index}>
                                        <Typography
                                            as="a"
                                            href={item.href}
                                            color="white"
                                            className="py-1 font-normal opacity-80 transition-colors hover:opacity-100"
                                        >
                                            {item.label}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                    <div className="lg:w-80 lg:ml-auto">
                        <Typography
                            variant="h6"
                            color="white"
                            className="mb-6 text-left md:text-right"
                        >
                            Language & Currency
                        </Typography>
                        <div className="grid gap-4">
                            <Select
                                variant="standard"
                                label="Select Language"
                                className="!text-white !border-white"
                                labelProps={{
                                    className: "!text-white after:!border-white",
                                }}
                                containerProps={{
                                    className: "[&_svg]:!text-white",
                                }}
                            >
                                <Option>Enlish</Option>
                                <Option>French</Option>
                                <Option>Spanish</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                
                <Typography
                    color="white"
                    className="mt-8 text-left !text-sm font-normal"
                >
                    All rights reserved. Copyright &copy; {currentYear} Fintechain
                </Typography>
            </div>
        </footer>
    );
}

export default Footer5;
