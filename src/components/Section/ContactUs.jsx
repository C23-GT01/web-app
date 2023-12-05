import ContactBox from "../Elements/ContactBox";
import Section from "./Index";

const ContactUs = ({ data }) => {
    console.log(data);
    let wa = false;
    let phone = false;
    if (data.phone.isWhatsApp) {
        wa = data.phone.phoneNumber;
    } else {
        wa = data.phone.waNumber;
        phone = data.phone.phoneNumber
    }

    return (
        <Section title="Contact UMKM" className="">
            <h1 className="w-[400px] text-xl font-inter mx-auto mt-8 text-center border-b-2 border-black">Contact Us</h1>
            <ContactBox email={data.email} phone={phone} wa={wa} />
        </Section>
    )
}

export default ContactUs;