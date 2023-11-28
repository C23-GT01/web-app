import HomeLayout from "../components/Layouts/HomeLayouts"
import TopDetail from "../components/Section/TopDetail";
import bg1 from '../assets/img/bg/bg-1.jpg'
import Resources from "../components/Section/Resources";
import { useParams } from "react-router-dom";

import { getDetail } from "../utils/data";

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
      <Resources src={bg1} />
      {id}
    </HomeLayout>
  )

}

export default ProductPage;