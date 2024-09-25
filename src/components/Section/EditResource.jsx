import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useEffect } from "react";
import Button from "../Elements/Button";
import CropImage from "./CropImage";
import Alert from "../Elements/Alert";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";
import { editResource } from "../../services/resource.service";

const EditResource = ({ data, refresh, closeModal, noClose }) => {
  console.log(data);
  const [resource, setResource] = useState({
    image: data.image,
    name: data.name,
    description: data.description,
  });

  const [oldResource] = useState({
    image: data.image,
    name: data.name,
    description: data.description,
  });

  // Input
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setResource((prevResource) => ({
      ...prevResource,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  const handleFileChange = (file) => {
    setResource((prevResource) => ({
      ...prevResource,
      image: file,
    }));
  };

  // Validasi
  const [resourceError, setResourceError] = useState({
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
    Object.keys(resource).forEach((key) => {
      errors[key] = validateField(key, resource[key], resource);
    });
    setResourceError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, isEditing]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (JSON.stringify(resource) === JSON.stringify(oldResource)) {
      setIsSubmitDisabled(true);
    }
  }, [resource, oldResource]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Triming
    const name = resource.name.trim();
    const description = resource.description.trim();

    //Upload Image
    noClose(true);
    setLoading(true);
    setStatusPost("Memperbarui Resource");

    let publicUrl;
    if (resource.image !== oldResource.image) {
      setStatusPost("Memproses Gambar...");
      const blob = await base64ToBlob(resource.image);
      setStatusPost("Mengunggah Gambar...");
      publicUrl = await upload(blob);
    } else {
      publicUrl = oldResource.image;
    }

    // Save Data
    const resourceData = {
      name,
      description,
      image: publicUrl,
    };

    setStatusPost("Menyimpan Perubahan");
    const res = await editResource(data.id, resourceData);
    if (res) {
      setStatusPost("Resource Berhasil Diperbarui");
      refresh();
    } else {
      setStatusPost("Gagal Memperbarui Resource");
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
              Foto Resource
            </label>
            <CropImage
              handleSetImage={handleFileChange}
              error={resourceError.image}
              handleCrop={handleCrop}
              prevImage={oldResource.image}
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
              htmlFor="name"
              className="block font-semibold mb-1 text-left "
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={resource.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={resourceError.name} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1">
              Deskripsi
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={resource.description}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-48"
              autoComplete="off"
              required
            />
            <Alert message={resourceError.description} />
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

export default EditResource;
