import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayouts";
import { getAllProducts } from "../../services/product.service";
import { getAllUmkm } from "../../services/umkm.service";
import Map from "../../components/Elements/Map";
import UmkmDistribution from "../../components/Elements/UmkmDistribution";

const DashboardPage = () => {
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalUmkm, setTotalUmkm] = useState(0);
  const [umkm, setUmkm] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    getAllUmkm((data) => {
      setTotalUmkm(data.length);
      console.log(data);
      setUmkm(data);
      const newLocations = data.map((umkm) => ({
        lat: umkm.location.lat,
        lng: umkm.location.lng,
        name: umkm.name,
      }));

      // Set locations sekaligus
      setLocations(newLocations);
    });
    getAllProducts((data) => {
      setTotalProduct(data.length);
    });
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="flex gap-6 justify-center my-6">
        <div className="flex flex-col justify-center items-center bg-blue-500 px-6 py-2 text-white shadow rounded-lg">
          <h2>Total UMKM</h2>
          <span>{totalUmkm}</span>
        </div>
        <div className="flex flex-col justify-center items-center bg-blue-500 px-6 py-2 text-white shadow rounded-lg">
          <h2>Total Produk</h2>
          <span>{totalProduct}</span>
        </div>
      </div>
      <div className="my-6">
        <h2 className="text-xl font-bold font-inter mb-4">Persebaran UMKM</h2>
        <UmkmDistribution
          locations={
            locations
          }
        />
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
