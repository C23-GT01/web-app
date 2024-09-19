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
import { getUmkmByOwner } from "../services/umkm.service";
import TopDetail from "../components/Section/Product/TopDetail";

const EditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isNotFound, setNotFound] = useState(false);

  const refreshProduct = () => {
    getProduct(id, (data) => {
      setProduct(data);
    });
  };

  useEffect(() => {
    getUmkmByOwner((data) => {
      if (data) {
        const products = data.products;
        if (products.some((product) => product.slug === id)) {
          getProduct(id, (data) => {
            setProduct(data);
          });
        } else {
          setNotFound(true);
        }
      } else {
        setNotFound(true);
      }
    });
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
          <TopDetail data={product} refreshProduct={refreshProduct} edited />
          <Resources product={product} refreshProduct={refreshProduct} select />
          <Process product={product} refreshProduct={refreshProduct} edited />
          <Impact
            refreshProduct={refreshProduct}
            useSummary
            product={product}
            select
          />
          <Impact refreshProduct={refreshProduct} product={product} select />
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

export default EditProductPage;
