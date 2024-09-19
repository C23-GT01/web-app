import React, { useState, useEffect } from "react";
import Loading from "../Elements/Loading";
import { useParams } from "react-router-dom";
import { getImpactBySlugUmkm } from "../../services/impact.service";
import { editProduct } from "../../services/product.service";
import Button from "../Elements/Button";

const SelectImpacts = ({
  product,
  move,
  refreshProduct,
  closeModal,
  noClose,
}) => {
  const { id } = useParams();
  const [impacts, setImpacts] = useState([]);
  const [selectedImpacts, setSelectedImpacts] = useState(
    product.impact.map((impact) => impact.id)
  );
  const [oldImpacts, setOldImpacts] = useState(
    product.impact.map((impact) => impact.id)
  );

  useEffect(() => {
    setLoading(true);
    setStatusPost("Memuat Impact");
    getImpactBySlugUmkm(product.umkm.slug, (data) => {
      if (data) {
        setImpacts(data);
        setLoading(false);
      }
    });
  }, [product]);

  const handleCheckboxChange = (impactId) => {
    if (selectedImpacts.includes(impactId)) {
      setSelectedImpacts(selectedImpacts.filter((id) => id !== impactId));
    } else {
      setSelectedImpacts([...selectedImpacts, impactId]);
    }
  };

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (JSON.stringify(selectedImpacts) !== JSON.stringify(oldImpacts)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [oldImpacts, selectedImpacts]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      impact: {
        deleteMany: {},
        create: selectedImpacts.map((impactId) => ({ impactId })),
      },
    };

    console.log(data);

    setStatusPost("Memperbarui Impact");
    setLoading(true);
    noClose(true);

    const res = await editProduct(id, data);
    if (res) {
      setStatusPost("Impact Diperbarui");
    } else {
      setStatusPost("Impact Gagal Diperbarui");
    }
    setTimeout(() => {
      closeModal();
      refreshProduct();
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
          {impacts.map((imp) => {
            const isChecked = selectedImpacts.includes(imp.id);
            return (
              <div key={imp.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={imp.id}
                  value={imp.id}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(imp.id)}
                />
                <label htmlFor={imp.id} className="ml-2">
                  {imp.name}
                </label>
              </div>
            );
          })}
          {/* <div onClick={() => move("Tambah Impact")}> + Tambah Impacts</div> */}
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

export default SelectImpacts;
