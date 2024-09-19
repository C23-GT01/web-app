import React, { useState, useEffect } from "react";
import Loading from "../Elements/Loading";
import { useParams } from "react-router-dom";
import { editProduct } from "../../services/product.service";
import Button from "../Elements/Button";
// 146
const SelectSummary = ({ product, refreshProduct, closeModal, noClose }) => {
  const { id } = useParams();
  const [selectedSummary, setSelectedSummary] = useState(product.contribution);
  const [summary] = useState([
    {
      id: 1,
      name: "Minimalisasi Carboon Footprints",
    },
    {
      id: 2,
      name: "Efisiensi Energi",
    },
    {
      id: 3,
      name: "Pengelolaan Limbah",
    },
    {
      id: 4,
      name: "Penggunaan bahan baku lokal",
    },
    {
      id: 5,
      name: "Efisiensi Air",
    },
    {
      id: 6,
      name: "Daur Ulang Produk",
    },
    {
      id: 7,
      name: "Kesejahteraan Pekerja",
    },
    {
      id: 8,
      name: "Kesehatan dan Keamanan Lingkungan",
    },
  ]);
  const [oldSummary, setOldSummary] = useState(product.contribution);

  const handleCheckboxChange = (summaryId) => {
    if (selectedSummary.includes(summaryId)) {
      setSelectedSummary(selectedSummary.filter((id) => id !== summaryId));
    } else {
      setSelectedSummary([...selectedSummary, summaryId]);
    }
  };

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (JSON.stringify(selectedSummary) !== JSON.stringify(oldSummary)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [oldSummary, selectedSummary]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      contribution: selectedSummary.sort((a, b) => a - b),
    };

    setStatusPost("Memperbarui Kontribusi");
    setLoading(true);
    noClose(true);

    const res = await editProduct(id, data);
    if (res) {
      setStatusPost("Data Diperbarui");
      refreshProduct();
    } else {
      setStatusPost("Data Gagal Diperbarui");
    }
    setTimeout(() => {
      setLoading(false);
      closeModal();
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
          {summary.map((smr) => {
            const isChecked = selectedSummary.includes(smr.id);
            return (
              <div key={smr.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={smr.id}
                  value={smr.id}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(smr.id)}
                />
                <label htmlFor={smr.id} className="ml-2">
                  {smr.name}
                </label>
              </div>
            );
          })}
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

export default SelectSummary;
