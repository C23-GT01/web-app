import HomeLayout from "../components/Layouts/HomeLayouts";
import FIlter from "../components/Section/Filter";
import Products from "../components/Section/Products";
import Umkm from "../components/Section/Umkm";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";
import { getAllProductsByPage } from "../services/product.service";
import { getAllUmkm } from "../services/umkm.service";

const HomePage = () => {
  const [products, setProducts] = useState(null);
  const [umkm, setUmkm] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      getAllProductsByPage("0", (data) => {
        setProducts(data.products);
      });
      getAllUmkm((data) => {
        setUmkm(data);
      });
    }, 10);
  }, []);

  return (
    <>
      {products && umkm ? (
        <HomeLayout jumbotron={true} nodiv title="Home" home>
          {/* <FIlter /> */}
          <Products data={products} name="Produk" preview />
          <Umkm umkm={umkm} />
        </HomeLayout>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default HomePage;
