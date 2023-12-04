import HomeLayout from "../components/Layouts/HomeLayouts"
import { useParams } from "react-router-dom";
import UmkmImage from "../components/Elements/UmkmImage"
import UmkmSummary from "../components/Elements/UmkmSummary";
import Products from "../components/Section/Products";
import Location from "../components/Section/Location";
import History from "../components/Section/History";
import Impact from "../components/Section/Impact";
import ContactUs from "../components/Section/ContactUs";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
//const axios = require('axios'); // legacy way

// Make a request for a user with a given ID
const UmkmPage = () => {
  const { id } = useParams();
  const [umkm, setUmkm] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get(`https://c23-gt01-01.et.r.appspot.com/umkm`)
      .then(function (response) {
        // handle success
        setUmkm(response.data.data.umkm);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [id]); // Include 'id' as a dependency to refetch data when the 'id' changes

  console.log(umkm);

  if (!umkm) {
    // If data is still being fetched, you can return a loading indicator or null
    return null;
  }

  return (
    <HomeLayout>
      <UmkmImage src="https://i.ibb.co/0fr1VCg/image.jpg"/>
      <UmkmSummary umkm={umkm} />
      <Products name="Produk" />
      <Location />
      <History />
      <Impact name="UMKM Impact"/>
      <ContactUs/>
    </HomeLayout>
  );
}

export default UmkmPage;