/* eslint-disable no-undef */
import { MdPrint } from "react-icons/md";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayouts";
import { getAllProducts } from "../../services/product.service";
import Button from "../../components/Elements/Button";
import Brand from "../../components/Elements/Brand";

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts((data) => {
      console.log(data);
      setProducts(data);
    });
  });

  return (
    <AdminLayout title="Product">
      <div className="hidden print:flex justify-between items-center mb-4">
        <Brand></Brand>
        <h2 className="text-2xl font-inter font-bold">Rekap Produk UMKM</h2>
      </div>
      <div className="h-screen overflow-y-auto print:h-full">
        <Button
          onClick={window.print}
          className="print:opacity-0 flex items-center my-3 gap-2 font-inter"
        >
          <MdPrint /> Print
        </Button>
        <table className="w-full table-auto border-collapse border border-slate-400">
          <thead className="sticky top-0 bg-white shadow border-b border-slate-400">
            <tr>
              <th className="border border-slate-300 w-10">No</th>
              <th className="border border-slate-300 w-20">Gambar</th>
              <th className="border border-slate-300">Nama Produk</th>
              <th className="border border-slate-300">Deskripsi</th>
              <th className="border border-slate-300">Harga</th>
              <th className="border border-slate-300">Umkm</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={product.id}>
                  <td className="border border-slate-300 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-300 p-2">
                    <img
                      className="w-16 h-16"
                      src={product.images[0]}
                      alt={product.name}
                    />
                  </td>
                  <td className="border border-slate-300 px-2">
                    <a href={`${process.env.APP_URL}/product/${product.slug}`}>
                      {product.name}
                    </a>
                  </td>
                  <td className="border border-slate-300 px-2">
                    {product.description}
                  </td>
                  <td className="border border-slate-300 px-2 text-right">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </td>

                  <td className="border border-slate-300 px-2">
                    {product.umkm.name}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminProductPage;
