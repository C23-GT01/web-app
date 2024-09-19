import HomeLayout from "../components/Layouts/HomeLayouts";
import React, { useState, useEffect } from "react";
import Loading from "../components/Elements/Loading";
import { useParams } from "react-router-dom";
import ErrorPage from "./404";
import { getAllUmkmByPage } from "../services/umkm.service";
import Umkm from "../components/Section/Container/Umkm";

const UmkmsPage = () => {
  const { page } = useParams();
  const [umkm, setUmkm] = useState(null);
  const [isNotFound, setNotFound] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      getAllUmkmByPage(page, (data) => {
        if (data) {
          console.log(data);
          setUmkm(data);
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
      {umkm ? (
        <HomeLayout title="Umkm">
          <div className="h-[180px] bg-slate-500 overflow-hidden relative"></div>
          <Umkm
            data={umkm.umkm}
            pagination
            lastPage={umkm.lastPage}
            page={umkm.page}
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

export default UmkmsPage;
