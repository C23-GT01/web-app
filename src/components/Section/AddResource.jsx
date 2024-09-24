/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from "react";
import Loading from "../Elements/Loading";
import CropImage from "./CropImage";
import Map from "../Elements/MapPicker";
import Alert from "../Elements/Alert";
import Button from "../Elements/Button";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";
import { addResource } from "../../services/resource.service";
import { useParams } from "react-router-dom";

const AddResource = ({
  refreshProduct = () => {},
  closeModal = () => {},
  noClose = () => {},
  move = false,
}) => {
  const { id } = useParams();
  const [resource, setResource] = useState({
    name: "",
    image: "",
    description: "",
    umkm: "",
    lat: -6.2088,
    lng: 106.8456,
    address: "",
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

  // Input Image
  const handleFileChange = (file) => {
    setResource((prevResource) => ({
      ...prevResource,
      image: file,
    }));
  };

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  //Input Map
  const handleLatChange = (event) => {
    const lat = parseFloat(event.target.value);
    setResource((prevUmkm) => ({
      ...prevUmkm,
      lat: isNaN(lat) ? 0 : lat,
    }));
  };

  const handleLngChange = (event) => {
    const lng = parseFloat(event.target.value);
    setResource((prevResource) => ({
      ...prevResource,
      lng: isNaN(lng) ? 0 : lng,
    }));
  };

  const handleMapClick = (event) => {
    setResource((prevResource) => ({
      ...prevResource,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }));
  };

  const handlePositionChange = (newPosition, newAddress) => {
    setResource((prevResource) => ({
      ...prevResource,
      lat: newPosition.lat,
      lng: newPosition.lng,
      address: newAddress,
    }));
  };

  // Validasi
  const [resourceError, setResourceError] = useState({
    name: "",
    image: "",
    description: "",
    umkm: "",
    lat: "",
    lng: "",
    address: "",
  });

  const validateField = (name, value) => {
    if (name === "umkm") {
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
      case "lat":
        const latPattern = /^-?\d+(\.\d+)?$/;
        return latPattern.test(value) ? "" : "Latitude tidak valid";
      case "lng":
        const lngPattern = /^-?\d+(\.\d+)?$/;
        return lngPattern.test(value) ? "" : "Longitude tidak valid";
      case "address":
        return value.length >= 5 ? "" : "Alamat minimal 5 karakter";
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
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Triming
    const name = resource.name.trim();
    const location = resource.address.trim();
    const description = resource.description.trim();
    const position = {
      lat: parseFloat(resource.lat),
      lng: parseFloat(resource.lng),
    };
    const umkm = resource.umkm.trim() || "";

    // upload image
    noClose(true);
    setLoading(true);
    setStatusPost("Menambahkan Bahan Baku");

    const blob = await base64ToBlob(resource.image);
    const publicUrl = await upload(blob);

    // save resource
    const resourceData = {
      name,
      description,
      image: publicUrl,
      location: {
        lat: position.lat,
        lng: position.lng,
        name: location,
      },
      umkm,
    };

    const res = await addResource(resourceData);

    if (res) {
      setStatusPost("Bahan Baku Ditambahkan");
    } else {
      setStatusPost("Bahan Baku Gagal Ditambahkan");
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
              Foto Bahan Baku
            </label>
            <CropImage
              handleSetImage={handleFileChange}
              error={resourceError.image}
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
              Nama Bahan Baku
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
            <label htmlFor="map" className="block font-semibold mb-1">
              Asal Bahan Baku
            </label>
            <Map
              position={{ lat: resource.lat, lng: resource.lng }}
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
              value={resource.lat}
              onChange={handleLatChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={resourceError.lat} />
          </div>
          <div className="mb-4">
            <label htmlFor="lng" className="block font-semibold mb-1">
              Longitude
            </label>
            <input
              type="text"
              id="lng"
              value={resource.lng}
              onChange={handleLngChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={resourceError.lng} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="location" className="block font-semibold mb-1">
              Alamat
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={resource.address}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={resourceError.address} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label htmlFor="umkm" className="block font-semibold mb-1">
              UMKM Penghasil Bahan Baku (Optional)
            </label>
            <input
              type="text"
              id="umkm"
              name="umkm"
              value={resource.umkm}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
            />
            <Alert message={resourceError.umkm} />
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
              className="w-full border rounded-md py-2 px-3 h-72"
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

export default AddResource;
