import HomeLayout from "../components/Layouts/HomeLayouts"
import FIlter from "../components/Section/Filter";
import Products from "../components/Section/Products";
import Umkm from "../components/Section/Umkm";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Loading from "../components/Elements/Loading";


// import { getAllUmkm } from "../utils/data";

// const umkm = getAllUmkm()[0].data.umkm;



const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/products`)
      .then(function (response) {
        setProducts(response.data.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const [umkm, setUmkm] = useState(null);
  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/umkm`)
      .then(function (response) {
        setUmkm(response.data.data.umkm);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (products && umkm) {
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [products, umkm]);


  // Tampilkan loading jika data belum diambil
  if (loading) {
    return (
      <div className=" h-screen w-screen flex justify-center items-center">
        <Loading />
      </div>
    )
  }


  if (!umkm) {
    return null;
  }

  if (!products) {
    return null;
  }

  return (
    <HomeLayout jumbotron={true} nodiv title='Home' home>
      <FIlter />
      <Products data={products} />
      <Umkm umkm={umkm} />
    </HomeLayout >
  )

}

export default HomePage;