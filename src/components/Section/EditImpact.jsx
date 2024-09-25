import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "../Elements/Button";
import CropImage from "./CropImage";
import Alert from "../Elements/Alert";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";
import { editImpact } from "../../services/impact.service";

const EditImpact = ({ data, refresh, closeModal, noClose }) => {
  const [impact, setImpact] = useState({
    image: data.image,
    name: data.name,
    description: data.description,
  });

  const [oldImpact] = useState({
    image: data.image,
    name: data.name,
    description: data.description,
  });

  // Input
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setImpact((prevImpact) => ({
      ...prevImpact,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  const handleFileChange = (file) => {
    setImpact((prevImpact) => ({
      ...prevImpact,
      image: file,
    }));
  };

  // Validasi
  const [impactError, setImpactError] = useState({
    name: "",
    image: "",
    description: "",
  });

  const validateField = (name, value) => {
    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "name":
        return value.length >= 3 ? "" : "Nama minimal 3 karakter";
      case "description":
        return value.length >= 10 ? "" : "Deskripsi minimal 10 karakter";
      case "image":
        return isEditing ? "Selesaikan Cropping" : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    const errors = {};
    Object.keys(impact).forEach((key) => {
      errors[key] = validateField(key, impact[key], impact);
    });
    setImpactError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [impact, isEditing]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (JSON.stringify(impact) === JSON.stringify(oldImpact)) {
      setIsSubmitDisabled(true);
    }
  }, [impact, oldImpact]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Triming
    const name = impact.name.trim();
    const description = impact.description.trim();

    //Upload Image
    setLoading(true);
    setStatusPost("Memperbarui Impact");

    let publicUrl;
    if (impact.image !== oldImpact.image) {
      setStatusPost("Memproses Gambar...");
      const blob = await base64ToBlob(impact.image);
      setStatusPost("Mengunggah Gambar...");
      publicUrl = await upload(blob);
    } else {
      publicUrl = oldImpact.image;
    }

    // Save Data
    const impactData = {
      name,
      description,
      image: publicUrl,
    };

    setStatusPost("Menyimpan Perubahan");
    const res = await editImpact(data.id, impactData);
    if (res) {
      setStatusPost("Impact Berhasil Diperbarui");
      refresh();
    } else {
      setStatusPost("Gagal Memperbarui Impact");
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
              Foto Impact
            </label>
            <CropImage
              handleSetImage={handleFileChange}
              error={impactError.image}
              handleCrop={handleCrop}
              prevImage={oldImpact.image}
            />
            <input
              type="file"
              id="fileInput"
              name="image"
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
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={impact.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={impactError.name} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1">
              Deskripsi
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={impact.description}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-48"
              autoComplete="off"
              required
            />
            <Alert message={impactError.description} />
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

export default EditImpact;
