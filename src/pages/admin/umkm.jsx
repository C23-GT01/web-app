import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayouts";
import { getAllUmkm } from "../../services/umkm.service";
import Button from "../../components/Elements/Button";
import { MdPrint } from "react-icons/md";
import Brand from "../../components/Elements/Brand";

const AdminUmkmPage = () => {
  const [umkm, setUmkm] = useState(null);
  useEffect(() => {
    getAllUmkm((data) => {
      setUmkm(data);
      console.log(data);
    });
  }, []);

  return (
    <AdminLayout title="UMKM">
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
              <th className="border border-slate-300 w-16">Logo</th>
              <th className="border border-slate-300">Nama Umkm</th>
              <th className="border border-slate-300">Deskripsi</th>
              <th className="border border-slate-300">Jumlah Produk</th>
            </tr>
          </thead>
          <tbody>
            {umkm &&
              umkm.map((umkm, index) => (
                <tr key={umkm.id}>
                  <td className="border border-slate-300 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-300 p-2">
                    <img
                      className="w-16 h-16"
                      src={umkm.logo}
                      alt={umkm.name}
                    />
                  </td>
                  <td className="border border-slate-300 px-2">{umkm.name}</td>
                  <td className="border border-slate-300 px-2">
                    {umkm.description}
                  </td>
                  <td className="border border-slate-300 text-center">
                    {umkm.products.length}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUmkmPage;
