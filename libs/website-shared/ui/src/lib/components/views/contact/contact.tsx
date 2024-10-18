import { PageHeaderSection, UiSection } from "@fintechain-monorepo/shared-ui";
import ContactForm from "../../widgets/home/contact/contact";

export function Contact() {
    return (
        <>

            <PageHeaderSection
                title="Beyond the Ledger"
                subtitle="Exploring the convergence of finance, technology, and human values in the age of blockchain"
            />
            <UiSection
                backgroundType="color"
                backgroundValue="bg-white"
                className="lg:py-20 py-10 px-8 text-neutral-dark"
                contentClassName=""
            >
                <ContactForm />
            </UiSection>
        </>
    );
}

export default Contact;
