import HomeLayout from "../components/Layouts/HomeLayouts";
import Products from "../components/Section/Products";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";
import { getAllProductsByPage } from "../services/product.service";
import { useParams } from "react-router-dom";
import ErrorPage from "./404";

const ProductsPage = () => {
  const { page } = useParams();
  const [products, setProducts] = useState(null);
  const [isNotFound, setNotFound] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getAllProductsByPage(page, (data) => {
        if (data) {
          setProducts(data);
        } else {
          setNotFound(true);
        }
      });
    }, 50);
  }, [page]);

  if (isNotFound) {
    return <ErrorPage />;
  }

  return (
    <>
      {products ? (
        <HomeLayout title="Products">
          <div className="h-[180px] bg-slate-500 overflow-hidden relative"></div>
          <Products
            data={products.products}
            pagination
            lastPage={products.lastPage}
            page={products.page}
          />
        </HomeLayout>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
