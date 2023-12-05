import React, { useState, useEffect } from "react";
import HomeLayout from "../components/Layouts/HomeLayouts";
import TopDetail from "../components/Section/TopDetail";
import Resources from "../components/Section/Resources";
import { useParams } from "react-router-dom";
import { getDetail } from "../utils/data";
import Process from "../components/Section/Process";
import Impact from "../components/Section/Impact";
import Produsen from "../components/Section/Produsen";
import ErrorPage from "./404";

const ProductPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { id } = useParams();

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

  let product
  const response = getDetail(id);
  if (!response[0].error) {
    product = response[0].data.product;
  } else {
    return (
      <ErrorPage />
    )
  }

  return (
    <HomeLayout fbBg={fbBg} title={product.name} >


      <TopDetail
        src={product.image}
        name={product.name}
        price={product.price}
        description={product.description}
      />
      <Resources data={product.resources} />
      <Process data={product.production} />
      <Impact useSummary data={product.impact} summary={product.contribution} />
      <Produsen data={product.umkm} />
    </HomeLayout>
  )
}

export default ProductPage;
