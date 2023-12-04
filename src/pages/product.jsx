import React, { useState, useEffect } from "react";
import HomeLayout from "../components/Layouts/HomeLayouts";
import TopDetail from "../components/Section/TopDetail";
import Resources from "../components/Section/Resources";
import { useParams } from "react-router-dom";
import { getDetail } from "../utils/data";
import Process from "../components/Section/Process";
import Impact from "../components/Section/Impact";
import Produsen from "../components/Section/Produsen";

const ProductPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { id } = useParams();
  const product = getDetail()[0].data.product;

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const fbBg = scrollPosition > 100 ? 'transparent' : 'transparent';

  return (
    <HomeLayout fbBg={fbBg}>

      <TopDetail
        src={product.image}
        name={product.name}
        price={product.price}
        description={product.description}
      />
      <Resources />
      <Process />
      <Impact useSummary />
      <Produsen />
    </HomeLayout>
  )
}

export default ProductPage;
