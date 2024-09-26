/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useEffect } from "react";
import { upload } from "../../services/upload.service";
import Alert from "../Elements/Alert";
import Button from "../Elements/Button";
import { useParams } from "react-router-dom";
import { MdDelete, MdEdit, MdPhotoCamera } from "react-icons/md";
import Icon from "../Elements/Icon";
import { useRef } from "react";
import { editProduct } from "../../services/product.service";

const AddProductCertificate = ({
  refreshProduct = () => {},
  closeModal = () => {},
  noClose = () => {},
  data = {},
}) => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState({
    name: "",
    image: "",
    description: "",
  });

  // Input
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setCertificate((prevCertificate) => ({
      ...prevCertificate,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Input Image
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Ambil file dari input
    if (file) {
      setCertificate((prevCertificate) => ({
        ...prevCertificate,
        image: file,
      }));
    }
  };

  const handleEditClick = () => {
    // Memicu input file
    fileInputRef.current.click();
  };

  const handleDeleteClick = () => {
    setCertificate((prevCertificate) => ({ ...prevCertificate, image: "" }));
  };

  // Validasi
  const [certificateError, setCertificateError] = useState({
    name: "",
    image: "",
    description: "",
  });

  const validateField = (name, value) => {
    // Validasi untuk string yang kosong
    if (name === "image" && value === "") {
      return "";
    }

    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "name":
        return value.length >= 3 ? "" : "Nama minimal 3 karakter";
      case "description":
        return value.length >= 10 ? "" : "Deskripsi minimal 10 karakter";
      case "image":
        // if (!value) return "Gambar harus diunggah";

        // Validasi ukuran gambar maksimal 900 KB (900 * 1024 = 921600 bytes)
        const maxSize = 900 * 1024;
        return value.size > maxSize
          ? "Ukuran gambar tidak boleh lebih dari 1 MB"
          : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    const errors = {};
    Object.keys(certificate).forEach((key) => {
      errors[key] = validateField(key, certificate[key], certificate);
    });
    setCertificateError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificate, isEditing]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Triming
    const name = certificate.name.trim();
    const description = certificate.description.trim();

    //Upload Image
    noClose(true);
    setLoading(true);
    setStatusPost("Memperbarui Certificate");

    let publicUrl;
    if (certificate.image !== "") {
      setStatusPost("Mengunggah Gambar...");
      publicUrl = await upload(certificate.image);
    } else {
      publicUrl = "";
    }

    // save certificate
    const newCertificate = {
      name,
      description,
      image: publicUrl,
    };

    const certificateData = {
      certificate: [newCertificate, ...data.certificate],
    };

    const res = await editProduct(id, certificateData);

    if (res) {
      setStatusPost("Sertifikat Berhasil Ditambahkan");
    } else {
      setStatusPost("Sertifikat Gagal Ditambahkan");
    }

    setTimeout(() => {
      noClose(false);
      setLoading(false);
      refreshProduct();
      closeModal();
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
              Gambar Sertifikat (Opsional)
            </label>
            <div className="w-full h-72 border rounded-md  relative flex justify-center">
              {certificate.image && (
                <img
                  src={URL.createObjectURL(certificate.image)}
                  alt="Preview"
                  className="w-fuli-full object-contain rounded-md"
                />
              )}

              <label
                htmlFor="fileInput"
                className="w-full border flex justify-center items-center h-full absolute rounded-md cursor-pointer top-0 "
              >
                {!certificate.image && (
                  <Icon active>
                    <MdPhotoCamera />
                  </Icon>
                )}
              </label>
            </div>
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
            />
            <div className="mt-2 flex justify-between items-start">
              <div className="flex gap-2">
                {certificate.image !== "" && (
                  <>
                    <Button>
                      <MdEdit onClick={handleEditClick} />
                    </Button>
                    <Button>
                      <MdDelete onClick={handleDeleteClick} />
                    </Button>
                  </>
                )}
              </div>
              <Alert message={certificateError.image} />
            </div>
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="name" className="block font-semibold mb-1 ">
              Nama Setifikat
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={certificate.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />

            <Alert message={certificateError.name} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1">
              Keterangan Serifikat
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={certificate.description}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-72"
              autoComplete="off"
              required
            />
            <Alert message={certificateError.description} />
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

export default AddProductCertificate;
