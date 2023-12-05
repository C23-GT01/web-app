import HomeLayout from "../components/Layouts/HomeLayouts"
import FIlter from "../components/Section/Filter";
import Products from "../components/Section/Products";
import Umkm from "../components/Section/Umkm";
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';


import { getAllUmkm } from "../utils/data";

const umkm = getAllUmkm()[0].data.umkm;



const HomePage = () => {
  // const [umkm, setUmkm] = useState(null);

  // useEffect(() => {
  //   axios.get(`https://c23-gt01-01.et.r.appspot.com/umkm`)
  //     .then(function (response) {
  //       setUmkm(response.data.data.umkm);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, []); 

  // console.log(umkm);

  // if (!umkm) {
  //   return null;
  // }
  return (
    <HomeLayout jumbotron={true} nodiv title='Home' home>
      <FIlter />
      <Products />
      <Umkm umkm={umkm} />
    </HomeLayout>
  )

}

export default HomePage;