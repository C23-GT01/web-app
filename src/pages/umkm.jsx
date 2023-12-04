import HomeLayout from "../components/Layouts/HomeLayouts"
import { useParams } from "react-router-dom";
import UmkmImage from "../components/Elements/UmkmImage"
import UmkmSummary from "../components/Elements/UmkmSummary";
import Products from "../components/Section/Products";
import Location from "../components/Section/Location";
import History from "../components/Section/History";
import Impact from "../components/Section/Impact";
import ContactUs from "../components/Section/ContactUs";

const UmkmPage = () => {
  const { id } = useParams();
  return (
    <HomeLayout>
        <UmkmImage src="https://i.ibb.co/0fr1VCg/image.jpg"/>
        <UmkmSummary />
        <Products name="Produk" />
        <Location />
        <History />
        <Impact name="UMKM Impact"/>
        <ContactUs/>
    </HomeLayout>
  )
}

export default UmkmPage;