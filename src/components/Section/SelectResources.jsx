import React, { useState, useEffect } from "react";
import Loading from "../Elements/Loading";
import { useParams } from "react-router-dom";
import { getResourceBySlugUmkm } from "../../services/resource.service";
import { editProduct } from "../../services/product.service";
import Button from "../Elements/Button";

const SelectResource = ({
  product,
  move,
  refreshProduct,
  closeModal,
  noClose,
}) => {
  const { id } = useParams();
  const [resources, setResources] = useState([]);
  const [selectedResources, setSelectedResources] = useState(
    product.resource.map((resource) => resource.id)
  );
  const [oldResources, setOldResources] = useState(
    product.resource.map((resource) => resource.id)
  );

  useEffect(() => {
    setLoading(true);
    setStatusPost("Memuat Bahan Baku");
    getResourceBySlugUmkm(product.umkm.slug, (data) => {
      if (data) {
        setResources(data);
        setLoading(false);
      }
    });
  }, [product]);

  const handleCheckboxChange = (resourceId) => {
    if (selectedResources.includes(resourceId)) {
      setSelectedResources(selectedResources.filter((id) => id !== resourceId));
    } else {
      setSelectedResources([...selectedResources, resourceId]);
    }
  };

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (JSON.stringify(selectedResources) !== JSON.stringify(oldResources)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [oldResources, selectedResources]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      resource: {
        deleteMany: {},
        create: selectedResources.map((resourceId) => ({ resourceId })),
      },
    };

    setStatusPost("Memperbarui Bahan Baku");
    setLoading(true);
    noClose(true);

    const res = await editProduct(id, data);
    if (res) {
      setStatusPost("Bahan Baku Diperbarui");
    } else {
      setStatusPost("Bahan Baku Gagal Diperbarui");
    }
    setTimeout(() => {
      refreshProduct();
      closeModal();
      setLoading(false);
      noClose(false);
    }, 1000);
  };

  return (
    <div className="w-full p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className="text-sm font-inter mt-1 text-center">{statusPost}</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          {resources.map((reso) => {
            const isChecked = selectedResources.includes(reso.id);
            return (
              <div key={reso.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={reso.id}
                  value={reso.id}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(reso.id)}
                />
                <label htmlFor={reso.id} className="ml-2">
                  {reso.name}
                </label>
              </div>
            );
          })}
          {/* <div onClick={() => move("Tambah Bahan Baku")}>
            {" "}
            + Tambah Resources
          </div> */}
          <Button
            disabled={isSubmitDisabled}
            type="submit"
            className={`py-2 px-4 w-full mt-2  sm:col-span-2`}
          >
            Konfirmasi
          </Button>
        </form>
      )}
    </div>
  );
};

export default SelectResource;
