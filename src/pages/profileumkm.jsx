import HomeLayout from "../components/Layouts/HomeLayouts";
import UmkmImage from "../components/Elements/UmkmImage";
import UmkmSummary from "../components/Elements/UmkmSummary";
import Products from "../components/Section/Products";
import Location from "../components/Section/Location";
import History from "../components/Section/History";
import Impact from "../components/Section/Impact";
import ContactUs from "../components/Section/ContactUs";
import ErrorPage from "./404";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";
import { getUmkmByOwner } from "../services/umkm.service";
import { getImpactBySlugUmkm } from "../services/impact.service";

const ProfileUmkmPage = () => {
  const [umkm, setUmkm] = useState(null);
  const [impacts, setImpacts] = useState(null);
  const [isNotFound, setNotFound] = useState(false);

  const updateProducts = (newProducts) => {
    setUmkm((prevUmkm) => ({
      ...prevUmkm,
      products: [newProducts, ...prevUmkm.products],
    }));
  };

  const removeProduct = (slug) => {
    setUmkm((prevUmkm) => ({
      ...prevUmkm,
      products: prevUmkm.products.filter((product) => product.slug !== slug),
    }));
  };

  useEffect(() => {
    getUmkmByOwner((data) => {
      if (data) {
        setUmkm(data);
        getImpactBySlugUmkm(data.slug, (data) => {
          if (data) {
            setImpacts({ impact: data });
          }
        });
      } else {
        setNotFound(true);
      }
    });
  }, []);

  const refreshImpact = () => {
    getImpactBySlugUmkm(umkm.slug, (data) => {
      if (data) {
        setImpacts({ impact: data });
      }
    });
  };

  const refresh = () => {
    getUmkmByOwner((data) => {
      if (data) {
        setUmkm(data);
      } else {
        setNotFound(true);
      }
    });
  };

  if (isNotFound) {
    return <ErrorPage />;
  }

  return (
    <>
      {umkm ? (
        <HomeLayout title={umkm.name}>
          <UmkmImage src={umkm.images} />
          <UmkmSummary data={umkm} edited refresh={refresh} />
          <Products
            name="Produk"
            data={umkm.products}
            updateProducts={updateProducts}
            removeProduct={removeProduct}
            edited
          />
          <Location data={umkm} refresh={refresh} edited />
          <History data={umkm} refresh={refresh} edited />
          <Impact
            name="UMKM Impact"
            product={impacts}
            edited
            refreshProduct={refreshImpact}
          />
          <ContactUs data={umkm} refresh={refresh} edited />
        </HomeLayout>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default ProfileUmkmPage;
