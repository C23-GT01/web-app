import HomeLayout from "../components/Layouts/HomeLayouts"
import { useParams } from "react-router-dom";
import UmkmImage from "../components/Elements/UmkmImage"
import UmkmSummary from "../components/Elements/UmkmSummary";
import Products from "../components/Section/Products";
import Location from "../components/Section/Location";
import History from "../components/Section/History";
import Impact from "../components/Section/Impact";
import ContactUs from "../components/Section/ContactUs";
import { getDetailUmkm } from "../utils/data";
import ErrorPage from "./404";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UmkmPage = () => {
  const { id } = useParams();
  // let umkm
  // const response = getDetailUmkm(id);
  // if (!response[0].error) {
  //   umkm = response[0].data.umkm;
  // } else {
  //   return (
  //     <ErrorPage />
  //   )
  // }


  const [umkm, setUmkm] = useState(null);

  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/umkm/${id}`)
      .then(function (response) {

        setUmkm(response.data.data.umkm);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://c23-gt01-01.et.r.appspot.com/products/umkm/${id}`)
      .then(function (response) {

        setProduct(response.data.data.products);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);


  if (!umkm) {
    return null;
  }

  return (
    <HomeLayout title={umkm.name}>
      <UmkmImage src={umkm.image} />
      <UmkmSummary logo={umkm.logo} name={umkm.name} description={umkm.description} />
      <Products name="Produk" data={product} />
      <Location data={umkm.location} />
      <History data={umkm.history} />
      <Impact name="UMKM Impact" data={umkm.impact} />
      <ContactUs data={umkm.contact[0]} />
    </HomeLayout>
  );
}

export default UmkmPage;