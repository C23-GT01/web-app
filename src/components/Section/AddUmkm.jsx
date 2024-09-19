/* eslint-disable no-case-declarations */
import React, { useEffect, useState } from "react";
import Loading from "../Elements/Loading";
import CropImage from "./CropImage";
import Map from "../Elements/MapPicker";
import { upload } from "../../services/upload.service";
import base64ToBlob from "../../utils/toBlob";
import { addUmkm } from "../../services/umkm.service";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";

const AddUmkm = ({ move }) => {
  const [umkm, setUmkm] = useState({
    name: "",
    logo: "",
    description: "",
    lat: -6.2088,
    lng: 106.8456,
    address: "",
    employe: 0,
    email: "",
    noHP: "",
    isWA: false,
    noWA: "",
  });
  
  //Input
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setUmkm((prevUmkm) => ({
      ...prevUmkm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  const handleFileChange = (file) => {
    setUmkm((prevUmkm) => ({
      ...prevUmkm,
      logo: file,
    }));
  };

  const handleLatChange = (event) => {
    const lat = parseFloat(event.target.value);
    setUmkm((prevUmkm) => ({
      ...prevUmkm,
      lat: isNaN(lat) ? 0 : lat,
    }));
  };

  const handleLngChange = (event) => {
    const lng = parseFloat(event.target.value);
    setUmkm((prevUmkm) => ({
      ...prevUmkm,
      lng: isNaN(lng) ? 0 : lng,
    }));
  };

  const handleMapClick = (event) => {
    setUmkm((prevUmkm) => ({
      ...prevUmkm,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }));
  };

  const handlePositionChange = (newPosition, newAddress) => {
    setUmkm((prevUmkm) => ({
      ...prevUmkm,
      lat: newPosition.lat,
      lng: newPosition.lng,
      address: newAddress,
    }));
  };

  // Validasi
  const [umkmError, setUmkmError] = useState({
    name: "",
    logo: "",
    description: "",
    lat: "",
    lng: "",
    address: "",
    employe: "",
    email: "",
    noHP: "",
    noWA: "",
  });


  const validateField = (name, value) => {
    if (name === "noWA" && umkm.isWA) {
      return "";
    }

    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "name":
        return value.length >= 3 ? "" : "Nama minimal 3 karakter";
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value) ? "" : "Email tidak valid";
      case "noHP":
        const phonePattern = /^[0-9]{10,13}$/;
        return phonePattern.test(value) ? "" : "Nomor telepon tidak valid";
      case "noWA":
        const waPattern = /^[0-9]{10,13}$/;
        return umkm.isWA || (value && waPattern.test(value))
          ? ""
          : "Nomor Whatsapp tidak valid";
      case "employe":
        return value >= 0 ? "" : "Jumlah karyawan tidak valid";
      case "description":
        return value.length >= 10 ? "" : "Deskripsi minimal 10 karakter";
      case "lat":
        const latPattern = /^-?\d+(\.\d+)?$/;
        return latPattern.test(value) ? "" : "Latitude tidak valid";
      case "lng":
        const lngPattern = /^-?\d+(\.\d+)?$/;
        return lngPattern.test(value) ? "" : "Longitude tidak valid";
      case "address":
        return value.length >= 5 ? "" : "Alamat minimal 5 karakter";
      case "logo":
        return isEditing ? "Selesaikan Cropping" : "";
      default:
        return "";
    }
  };

  useEffect(() => {
    const errors = {};
    Object.keys(umkm).forEach((key) => {
      errors[key] = validateField(key, umkm[key], umkm);
    });
    setUmkmError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [umkm, isEditing]);


  //Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Triming
    const name = umkm.name.trim();
    const location = umkm.address.trim();
    const employe = parseInt(umkm.employe, 10);
    const description = umkm.description.trim();
    const position = {
      lat: parseFloat(umkm.lat),
      lng: parseFloat(umkm.lng),
    };
    const contact = {
      email: umkm.email.trim(),
      phone: {
        phoneNumber: umkm.noHP.trim(),
        isWhatsApp: umkm.isWA,
        waNumber: umkm.isWA ? "" : umkm.noWA.trim(),
      },
    };

    // upload image
    setLoading(true);
    setStatusPost("Sedang Melakukan Registrasi UMKM");
    const blob = await base64ToBlob(umkm.logo);
    const publicUrl = await upload(blob);
    
    const umkmData = {
      name,
      logo: publicUrl,
      location: {
        lat: position.lat,
        lng: position.lng,
        name: location,
      },
      employe,
      description,
      contact,
    };
    const res = await addUmkm(umkmData);
    if (res) {
      setStatusPost("Registrasi UMKM berhasil");
    } else {
      setStatusPost("Registrasi UMKM gagal");
    }
    setTimeout(() => {
      setLoading(false);
      move("Account");
    }, 1500);
  };

  return (
    <div className="w-full p-4">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className="text-sm font-inter mt-1 text-center">{statusPost}</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="mb-4 md:col-span-2">
            <label htmlFor="name" className="block font-semibold mb-1">
              Nama UMKM
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={umkm.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={umkmError.name} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="fileInput" className="block font-semibold mb-1">
              Logo
            </label>
            <CropImage
              handleSetImage={handleFileChange}
              error={umkmError.logo}
              handleCrop={handleCrop}
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
            <label htmlFor="description" className="block font-semibold mb-1">
              Deskripsi
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={umkm.description}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-36"
              autoComplete="off"
              required
            />
            <Alert message={umkmError.description} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="map" className="block font-semibold mb-1">
              Lokasi
            </label>
            <Map
              position={{ lat: umkm.lat, lng: umkm.lng }}
              onPositionChange={handlePositionChange}
              handleGet={handleMapClick}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lat" className="block font-semibold mb-1">
              Latitude
            </label>
            <input
              type="text"
              id="lat"
              value={umkm.lat}
              onChange={handleLatChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={umkmError.lat} />
          </div>
          <div className="mb-4">
            <label htmlFor="lng" className="block font-semibold mb-1">
              Longitude
            </label>
            <input
              type="text"
              id="lng"
              value={umkm.lng}
              onChange={handleLngChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={umkmError.lng} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="location" className="block font-semibold mb-1">
              Alamat
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={umkm.address}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={umkmError.address} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="employe" className="block font-semibold mb-1">
              Jumlah karyawan
            </label>
            <input
              type="number"
              min="0"
              id="employe"
              name="employe"
              value={umkm.employe}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={umkmError.employe} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label
              htmlFor="email"
              className="block font-semibold mb-1 text-left "
            >
              Email UMKM
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={umkm.email}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={umkmError.email} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label
              htmlFor="noHP"
              className="block font-semibold mb-1 text-left  "
            >
              Nomor Telepon
            </label>

            <input
              type="text"
              id="noHP"
              name="noHP"
              value={umkm.noHP}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <div className="flex justify-between items-start">
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  id="isWA"
                  name="isWA"
                  value={umkm.isWA}
                  checked={umkm.isWA}
                  onChange={handleInput}
                />
                <label htmlFor="isWA" className="ml-2 w-full">
                  Ini nomor Whatsapp
                </label>
              </div>
              <Alert message={umkmError.noHP} />
            </div>
          </div>
          {!umkm.isWA && (
            <div className="mb-4 md:col-span-2">
              <label
                htmlFor="noWA"
                className="block font-semibold mb-1 text-left  "
              >
                Whatsapp
              </label>
              <input
                type="text"
                id="noWA"
                name="noWA"
                value={umkm.noWA}
                onChange={handleInput}
                className="w-full border rounded-md py-2 px-3"
                autoComplete="off"
                required
              />
              <Alert message={umkmError.noWA} />
            </div>
          )}
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

export default AddUmkm;
