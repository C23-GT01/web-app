// 230
import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useEffect } from "react";
import CropImage from "./CropImage";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";
import { editUmkm } from "../../services/umkm.service";

const EditHistory = ({ data, refresh, closeModal, noClose }) => {
  const [history, setHistory] = useState({
    text: data.history.text,
    image: data.history.image,
  });

  const [oldHistory] = useState({
    text: data.history.text,
    image: data.history.image,
  });

  // Input
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setHistory((prevHistory) => ({
      ...prevHistory,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  const handleFileChange = (file) => {
    setHistory((prevHistory) => ({
      ...prevHistory,
      image: file,
    }));
  };

  // Validasi
  const [historyError, setHistoryError] = useState({
    image: "",
    text: "",
  });

  const validateField = (name, value) => {
    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "text":
        return value.length >= 10 ? "" : "Minimal 10 karakter";
      case "image":
        return isEditing ? "Selesaikan Cropping" : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    const errors = {};
    Object.keys(history).forEach((key) => {
      errors[key] = validateField(key, history[key], history);
    });
    setHistoryError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, isEditing]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (JSON.stringify(history) === JSON.stringify(oldHistory)) {
      setIsSubmitDisabled(true);
    }
  }, [history, oldHistory]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Trimming
    const text = history.text.trim();

    //Upload Image
    setLoading(true);
    setStatusPost("Memperbarui Sejarah UMKM");

    let publicUrl
    if (history.image !== oldHistory.image) {
      setStatusPost("Memproses Gambar...");
      const blob = await base64ToBlob(history.image);
      setStatusPost("Mengunggah Gambar...");
      publicUrl = await upload(blob);
    } else {
      publicUrl = oldHistory.image;
    }

    // Save Data
    const umkmData = {
      history: {
        text,
        image: publicUrl,
      }
    };
    setStatusPost("Menyimpan Perubahan");
    const res = await editUmkm(umkmData);
    if (res) {
      setStatusPost("Sejarah Berhasil Diperbarui");
      refresh();
    } else {
      setStatusPost("Gagal Memperbarui Sejarah");
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
              error={historyError.image}
              handleCrop={handleCrop}
              prevImage={oldHistory.image}
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
            <label htmlFor="description" className="block font-semibold mb-1">
              Text
            </label>
            <textarea
              type="text"
              id="description"
              name="text"
              value={history.text}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-72"
              autoComplete="off"
              required
            />
            <Alert message={historyError.text} />
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

export default EditHistory;
