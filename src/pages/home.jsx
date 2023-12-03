import HomeLayout from "../components/Layouts/HomeLayouts"
import FIlter from "../components/Section/Filter";
import Products from "../components/Section/Products";
import Umkm from "../components/Section/Umkm";




const HomePage = () => {
  return (
    <HomeLayout jumbotron={true}>
      <FIlter />
      <Products />
      <Umkm />
    </HomeLayout>
  )

}

export default HomePage;