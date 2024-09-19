import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { search } from "../services/search.service";
import HomeLayout from "../components/Layouts/HomeLayouts";
import Products from "../components/Section/Products";
import Loading from "../components/Elements/Loading";

const Search = () => {
  const { keyword } = useParams();
  const [result, setResult] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      search(keyword, (data) => {
        if (data) {
          setResult(data);
        }
      });
    }, 50);
  }, [keyword]);

  return (
    <>
      {result ? (
        <HomeLayout title="Products">
          <div className="h-[180px] bg-slate-500 overflow-hidden relative"></div>
          <Products data={result} name={`Hasil Pencarian "${keyword}"`} />
        </HomeLayout>
      ) : (
        <div className="h-screen w-screen flex justify-center items-center">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Search;
