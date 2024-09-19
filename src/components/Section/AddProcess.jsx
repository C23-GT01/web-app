import React, { useEffect, useState } from "react";
import Loading from "../Elements/Loading";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";
import { editProduct } from "../../services/product.service";
import { useParams } from "react-router-dom";
import CropImage from "./CropImage";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
// 218

const AddProcess = ({ product, move, refreshProduct, closeModal, noClose }) => {
  const { id } = useParams();
  const [process, setProcess] = useState({
    name: "",
    image: "",
    description: "",
  });

  // Input
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setProcess((prevProcess) => ({
      ...prevProcess,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Input Image
  const handleFileChange = (file) => {
    setProcess((prevProcess) => ({
      ...prevProcess,
      image: file,
    }));
  };

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  // Validasi
  const [processError, setProcessError] = useState({
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
    Object.keys(process).forEach((key) => {
      errors[key] = validateField(key, process[key], process);
    });
    setProcessError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [process, isEditing]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Triming
    const name = process.name.trim();
    const description = process.description.trim();

    // upload image
    noClose(true);
    setLoading(true);
    setStatusPost("Menambahkan Proses");

    const blob = await base64ToBlob(process.image);
    const publicUrl = await upload(blob);

    // save process
    const newProcess = {
      name,
      description,
      image: publicUrl,
    };

    console.log(product);

    const processData = {
      production: [...product.production, newProcess],
    };

    console.log(processData);

    const res = await editProduct(id, processData);

    if (res) {
      setStatusPost("Proses Berhasil Ditambahkan");
    } else {
      setStatusPost("Proses Gagal Ditambahkan");
    }

    setTimeout(() => {
      noClose(false);
      setLoading(false);
      refreshProduct();

      if (move) {
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
              Foto Proses
            </label>
            <CropImage
              handleSetImage={handleFileChange}
              error={processError.image}
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
              Nama Process
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={process.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={processError.name} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1">
              Deskripsi
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={process.description}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-72"
              autoComplete="off"
              required
            />
            <Alert message={processError.description} />
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

export default AddProcess;
