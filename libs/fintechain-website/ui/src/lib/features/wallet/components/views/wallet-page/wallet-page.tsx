
import { useImages } from "@fintechain-monorepo/fintechain-website-ui";
import ContractInteraction from "../../containers/token-interaction/token-interaction";


export function WalletPage() {

    const images = useImages();

    return (
        <div className="flex flex-col min-h-full">
            {/* Hero Section with Gradient */}
            <section className="relative py-24 bg-dark">
                {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" /> */}
                <div className="absolute inset-0">
                    {/* Background image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${images.banners.needsBanner})`  // Replace with your image path
                        }}
                    />
                    {/* Gradient overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/50" />
                </div>
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-dark/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
                </div>
                <div className="container mx-auto px-4 relative">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            Token Balance
                        </h1>
                    </div>
                </div>
            </section>
            <section className="relative py-5 bg-gradient-to-b from-dark-300 to-dark-400">
                <ContractInteraction />
            </section>
        </div>
    );
}

export default WalletPage;
