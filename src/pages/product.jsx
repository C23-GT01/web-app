import HomeLayout from "../components/Layouts/HomeLayouts"
import TopDetail from "../components/Section/TopDetail";
import Resources from "../components/Section/Resources";
import { useParams } from "react-router-dom";
import { getDetail } from "../utils/data";
import Process from "../components/Section/Process"

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
      <Process src={product.image}/>
      {id}
    </HomeLayout>
  )

}

export default ProductPage;