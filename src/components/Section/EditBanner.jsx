import React, { useEffect, useState } from "react";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";
import { editUmkm } from "../../services/umkm.service";
import Button from "../Elements/Button";
import CropBanner from "./CropBanner";
import Loading from "../Elements/Loading";

const EditBanner = ({ data, refresh, closeModal, noClose }) => {
  const [banner, setBanner] = useState(data.images[0]);
  const [oldBanner] = useState(data.images[0]);

  // Input Image
  const [isEditing, setIsEditing] = useState(false);

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  const handleFileChange = (file) => {
    setBanner(file);
  };

  // Validasi
  const [bannerError, setBannerError] = useState("");

  const validateField = (name, value) => {
    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "banner":
        return isEditing ? "Selesaikan Cropping" : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    const imageError = validateField("banner", banner);
    setBannerError(imageError);
    const hasErrors = imageError !== "";
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banner, isEditing]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (banner === oldBanner) {
      setIsSubmitDisabled(true);
    }
  }, [banner, oldBanner]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Upload Image
    setLoading(true);
    setStatusPost("Memproses Gambar...");
    const blob = await base64ToBlob(banner);
    setStatusPost("Mengunggah Gambar...");
    const publicUrl = await upload(blob);

    // Save Data
    const umkmData = {
      images: [publicUrl],
    };
    setStatusPost("Menyimpan Perubahan");
    const res = await editUmkm(umkmData);
    if (res) {
      setStatusPost("Banner Berhasil Diperbarui");
      refresh();
    } else {
      setStatusPost("Banner Gagal Diperbarui");
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
            <CropBanner
              handleSetImage={handleFileChange}
              error={bannerError}
              handleCrop={handleCrop}
              prevImage={oldBanner}
            />
            <input
              type="file"
              id="fileInput"
              name="banner"
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

export default EditBanner;
