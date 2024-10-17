import HomeLayout from "../components/Layouts/HomeLayouts";
import Resources from "../components/Section/Resources";
import { useParams } from "react-router-dom";
import Process from "../components/Section/Process";
import Impact from "../components/Section/Impact";
import Produsen from "../components/Section/Produsen";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";
import { getProduct } from "../services/product.service";
import ErrorPage from "./404";
import TopDetail from "../components/Section/Product/TopDetail";
import ProductCertificate from "../components/Section/Product/ProductCertificate";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isNotFound, setNotFound] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getProduct(id, (data) => {
        if (data) {
          setProduct(data);
        } else {
          setNotFound(true);
        }
      });
    }, 700);
  }, [id]);

  const [scrollPosition, setScrollPosition] = useState(0);
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

  const fbBg = scrollPosition > 100 ? "transparent" : "transparent";

  if (isNotFound) {
    return <ErrorPage />;
  }

  return (
    <>
      {product ? (
        <HomeLayout fbBg={fbBg} title={product.name}>
          <TopDetail data={product} description={product.description} />
          {product.resource.length > 0 && <Resources product={product} />}
          {product.production.length > 0 && <Process product={product} />}
          {product.certificate !== null  && <ProductCertificate product={product} /> }
          <Impact useSummary product={product} />
          <Produsen data={product.umkm} />
        </HomeLayout>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ProductPage;
