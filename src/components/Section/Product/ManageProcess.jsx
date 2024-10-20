import { IoMdArrowRoundDown } from "react-icons/io";
import { IoMdArrowRoundUp } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Elements/Loading";
import Button from "../../Elements/Button";
import { editProduct } from "../../../services/product.service";

const ManageProcess = ({ product, refreshProduct, closeModal, noClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [process, setProduction] = useState(product.production);
  const [deletedProduction, setDeletedProduction] = useState([]);
  const [originalProduction] = useState(product.production);

  // Input
  const deleteProcess = (index) => {
    const newProduction = [...process];
    setDeletedProduction([...deletedProduction, process[index]]);
    newProduction.splice(index, 1);
    setProduction(newProduction);
  };

  const undoDeleteProcess = (index) => {
    const newProduction = [...deletedProduction];
    setProduction([...process, deletedProduction[index]]);
    newProduction.splice(index, 1);
    setDeletedProduction(newProduction);
  };

  const upHandle = (index) => {
    const newProduction = [...process];
    const temp = newProduction[index - 1];
    newProduction[index - 1] = newProduction[index];
    newProduction[index] = temp;
    setProduction(newProduction);
  };

  const downHandle = (index) => {
    const newProduction = [...process];
    const temp = newProduction[index + 1];
    newProduction[index + 1] = newProduction[index];
    newProduction[index] = temp;
    setProduction(newProduction);
  };

  useEffect(() => {
    if (JSON.stringify(process) !== JSON.stringify(originalProduction)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [process, originalProduction]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // save product
    const productData = {
      production: process,
    };

    setLoading(true);
    noClose(true);
    setStatusPost("Memberbarui Proses");

    const res = await editProduct(id, productData);
    if (res) {
      setStatusPost("Proses Diperbarui");
      if (res.data.slug === id) {
        refreshProduct();
      } else {
        navigate(`/product/edit/${res.data.slug}`);
      }
    } else {
      setStatusPost("Gagal Membperbarui Proses");
    }
    setTimeout(() => {
      setLoading(false);
      noClose(false);
      closeModal();
    }, 1500);
  };

  return (
    <div className="w-full p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className="text-sm font-inter mt-1 text-center">{statusPost}</h1>
        </div>
      ) : (
        <div className="">
          <div className="flex flex-col mb-2">
            <div className=" flex-col flex gap-4 mb-6">
              {process.map((src, index) => (
                <div key={index} className="flex gap-4 justify-between">
                  <div className="w-64">
                    <div className="font-inter mt-2">
                      {index + 1}. {process[index].name}
                    </div>
                  </div>

                  <div className="flex gap-3 h-12">
                    {index > 0 && (
                      <Button onClick={() => upHandle(index)}>
                        <IoMdArrowRoundUp />
                      </Button>
                    )}
                    {index < process.length - 1 && (
                      <Button onClick={() => downHandle(index)}>
                        <IoMdArrowRoundDown />
                      </Button>
                    )}
                    <Button onClick={() => deleteProcess(index)}>Hapus</Button>
                  </div>
                </div>
              ))}
              {deletedProduction.length > 0 && (
                <div className="font-inter font-bold mt-2 text-sm text-[#dc0000]">
                Akan Dihapus
              </div>
              )}
              {deletedProduction.map((process, index) => (
                <div key={index} className="flex gap-4 justify-between">
                  <div className="w-64">
                    <div className="font-inter mt-2">
                      {index + 1}. {process.name}
                    </div>
                  </div>
                  <div className="flex gap-3 h-12 flex-wrap">
                    <Button onClick={() => undoDeleteProcess(index)}>
                      Batal Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <Button
              disabled={isSubmitDisabled}
              type="submit"
              className={`py-2 px-4 w-full mt-2  sm:col-span-2`}
            >
              Konfirmasi
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageProcess;
