import HomeLayout from "../components/Layouts/HomeLayouts"
import TopDetail from "../components/Section/TopDetail";
import Resources from "../components/Section/Resources";
import { useParams } from "react-router-dom";
import { getDetail } from "../utils/data";
import Process from "../components/Section/Process"
import Impact from "../components/Section/Impact";
import Summary from "../components/Section/Summary";
import Produsen from "../components/Section/Produsen";

const product = getDetail()[0].data.product;


const ProductPage = () => {
  const { id } = useParams();
  return (
    <HomeLayout>

      <TopDetail
        src={product.image}
        name={product.name}
        price={product.price}
        description={product.description}
      />
      <Resources src={product.image} />
      <Process src={product.image} />
      <Impact src={product.image} />
      <Summary />
      <Produsen src={product.image} />
    </HomeLayout>
  )

}

export default ProductPage;