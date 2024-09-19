//252
import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useEffect } from "react";
import Button from "../Elements/Button";
import CropImage from "./CropImage";
import Alert from "../Elements/Alert";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";
import { editUmkm } from "../../services/umkm.service";

const EditUmkmSummary = ({ data, refresh, closeModal, noClose }) => {
  const [umkmDetail, setUmkmDetail] = useState({
    name: data.name,
    description: data.description,
    logo: data.logo,
    employe: data.employe,
  });
  const [oldUmkmDetail] = useState({
    name: data.name,
    description: data.description,
    logo: data.logo,
    employe: data.employe,
  });

  // Input
  const [isEditing, setIsEditing] = useState(false);
  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setUmkmDetail((prevUmkmDetail) => ({
      ...prevUmkmDetail,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Input Image
  const handleCrop = (value) => {
    setIsEditing(value);
  };

  const handleFileChange = (file) => {
    setUmkmDetail((prevUmkmsetUmkmDetail) => ({
      ...prevUmkmsetUmkmDetail,
      logo: file,
    }));
  };

  // Validasi
  const [umkmDetailError, setUmkmDetailError] = useState({
    logo: "",
    name: "",
    description: "",
    employe: "",
  });

  const validateField = (name, value) => {
    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "name":
        return value.length >= 3 ? "" : "Minimal 3 karakter";
      case "logo":
        return isEditing ? "Selesaikan Cropping" : "";
      case "employe":
        return value >= 0 ? "" : "Jumlah karyawan tidak valid";
      case "description":
        return value.length >= 10 ? "" : "Minimal 10 karakter";
      default:
        return "";
    }
  };

  useEffect(() => {
    const errors = {};
    Object.keys(umkmDetail).forEach((key) => {
      errors[key] = validateField(key, umkmDetail[key], umkmDetail);
    });
    setUmkmDetailError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [umkmDetail, isEditing]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (JSON.stringify(umkmDetail) === JSON.stringify(oldUmkmDetail)) {
      setIsSubmitDisabled(true);
    }
  }, [umkmDetail, oldUmkmDetail]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");
  const handleSubmit = async (event) => {
    event.preventDefault();

    //Trimming
    const name = umkmDetail.name.trim();
    const description = umkmDetail.description.trim();
    const employe = parseInt(umkmDetail.employe, 10);

    //Upload Image
    setLoading(true);
    setStatusPost("Memperbarui Sejarah UMKM");

    let publicUrl;
    if (umkmDetail.logo !== oldUmkmDetail.logo) {
      setStatusPost("Memproses Gambar...");
      const blob = await base64ToBlob(umkmDetail.logo);
      setStatusPost("Mengunggah Gambar...");
      publicUrl = await upload(blob);
    } else {
      publicUrl = oldUmkmDetail.logo;
    }

    // Save Data
    const umkmData = {
      name,
      description,
      logo: publicUrl,
      employe,
    };
    setStatusPost("Menyimpan Perubahan");
    const res = await editUmkm(umkmData);
    if (res) {
      setStatusPost("Detail Umkm Berhasil Diperbarui");
      refresh();
    } else {
      setStatusPost("Detail Umkm Gagal Diperbarui");
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
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="mb-4 md:col-span-2">
            <label htmlFor="fileInput" className="block font-semibold mb-1">
              Gambar
            </label>
            <CropImage
              handleSetImage={handleFileChange}
              error={umkmDetailError.logo}
              handleCrop={handleCrop}
              prevImage={oldUmkmDetail.logo}
            />
            <input
              type="file"
              id="fileInput"
              name="logo"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className="mb-4 md:col-span-2">
            <label
              htmlFor="nameUmkm"
              className="block font-semibold mb-1 text-left "
            >
              Nama UMKM
            </label>
            <input
              type="text"
              id="nameUmkm"
              name="name"
              value={umkmDetail.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={umkmDetailError.name} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1">
              Deskripsi
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={umkmDetail.description}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-48"
              autoComplete="off"
              required
            />
            <Alert message={umkmDetailError.description} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="employe" className="block font-semibold mb-1">
              Jumlah Karyawan (Opsional)
            </label>
            <input
              type="number"
              id="employe"
              name="employe"
              value={umkmDetail.employe}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              min={0}
            />
            <Alert message={umkmDetailError.employe} />
          </div>
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

export default EditUmkmSummary;
