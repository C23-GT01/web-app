/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useEffect } from "react";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";
import { addImpact } from "../../services/impact.service";
import CropImage from "./CropImage";
import Alert from "../Elements/Alert";
import Button from "../Elements/Button";
import { useParams } from "react-router-dom";

const AddImpact = ({
  refreshProduct = () => {},
  closeModal = () => {},
  noClose = () => {},
  move = false,
}) => {
  const { id } = useParams();
  const [impact, setImpact] = useState({
    name: "",
    image: "",
    description: "",
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

  // Input Image
  const handleFileChange = (file) => {
    setImpact((prevImpact) => ({
      ...prevImpact,
      image: file,
    }));
  };

  const handleCrop = (value) => {
    setIsEditing(value);
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
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Triming
    const name = impact.name.trim();
    const description = impact.description.trim();

    // upload image
    noClose(true);
    setLoading(true);
    setStatusPost("Menambahkan Impact");

    const blob = await base64ToBlob(impact.image);
    const publicUrl = await upload(blob);

    // save impact
    const impactData = {
      name,
      description,
      image: publicUrl,
    };

    const res = await addImpact(impactData);

    if (res) {
      setStatusPost("Impact Berhasil Ditambahkan");
    } else {
      setStatusPost("Impact Gagal Ditambahkan");
    }

    setTimeout(() => {
      noClose(false);
      setLoading(false);
      refreshProduct();

      if (id) {
        move();
      } else {
        closeModal();
      }
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
          <div className="mb-4 md:col-span-2">
            <label htmlFor="fileInput" className="block font-semibold mb-1">
              Foto Impact
            </label>
            <CropImage
              handleSetImage={handleFileChange}
              error={impactError.image}
              handleCrop={handleCrop}
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
            <label htmlFor="name" className="block font-semibold mb-1 ">
              Nama Impact
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
              className="w-full border rounded-md py-2 px-3 h-72"
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

export default AddImpact;
