import ContactBox from "../Elements/ContactBox";
import Section from "./Index";

const ContactUs = () => {
    return (
        <Section title="Contact UMKM" className="">
            <h1 className="w-[400px] text-xl font-inter mx-auto mt-8 text-center border-b-2 border-black">Contact Us</h1>
            <ContactBox />
        </Section>
    )
}

export default ContactUs;