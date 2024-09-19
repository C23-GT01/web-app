import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Elements/Loading";
import Button from "../../Elements/Button";
import { useEffect } from "react";
import { editProduct } from "../../../services/product.service";
import CropImage from "../CropImage";
import base64ToBlob from "../../../utils/toBlob";
import { upload } from "../../../services/upload.service";

const AddImage = ({ product, refreshProduct, closeModal, noClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  // Input
  const [isEditing, setIsEditing] = useState(false);
  const handleFileChange = (file) => {
    setImage(file);
  };

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  // Validasi

  const [imageError, setImageError] = useState("");

  const validateField = (name, value) => {
    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "image":
        return isEditing ? "Selesaikan Cropping" : "";
      default:
        return "";
    }
  };

  // benarkan bagian useEffect dibawah ini
  useEffect(() => {
    const imageError = validateField("image", image);
    setImageError(imageError);
    const hasErrors = imageError !== "";
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, isEditing]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // upload image
    setLoading(true);
    noClose(true);
    setStatusPost("Sedang Memproses Gambar");
    const blob = await base64ToBlob(image);
    setStatusPost("Sedang Mengunggah Gambar");
    const publicUrl = await upload(blob);

    console.log(product.images);

    // save product
    const productData = {
      images: [...product.images, publicUrl],
    };

    console.log(productData);

    const res = await editProduct(id, productData);
    if (res) {
      setStatusPost("Gambar Produk Ditambahkan");
      if (res.data.slug === id) {
        refreshProduct();
      } else {
        navigate(`/product/edit/${res.data.slug}`);
      }
    } else {
      setStatusPost("Gagal Mengunggah Gambar");
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
              Foto Produk
            </label>
            <CropImage
              handleSetImage={handleFileChange}
              error={imageError}
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

export default AddImage;
