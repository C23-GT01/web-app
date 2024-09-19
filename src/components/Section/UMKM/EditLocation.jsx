import { useEffect, useState } from "react";
import { editProduct } from "../../../services/product.service";
import Loading from "../../Elements/Loading";
import Button from "../../Elements/Button";
import Alert from "../../Elements/Alert";
import Map from "../../Elements/MapPicker";
import { editUmkm } from "../../../services/umkm.service";

const EditLocation = ({ refresh, data, closeModal, noClose }) => {
  const [map, setMap] = useState({
    lat: data.location.lat,
    lng: data.location.lng,
    address: data.location.name,
  });
  const [oldMap] = useState({
    lat: data.location.lat,
    lng: data.location.lng,
    address: data.location.name,
  });

  // Input
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setMap((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLatChange = (event) => {
    const lat = parseFloat(event.target.value);
    setMap((prevMap) => ({
      ...prevMap,
      lat: isNaN(lat) ? 0 : lat,
    }));
  };

  const handleLngChange = (event) => {
    const lng = parseFloat(event.target.value);
    setMap((prevMap) => ({
      ...prevMap,
      lng: isNaN(lng) ? 0 : lng,
    }));
  };

  const handleMapClick = (event) => {
    setMap((prevMap) => ({
      ...prevMap,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    }));
  };

  const handlePositionChange = (newPosition, newAddress) => {
    setMap((prevUmkm) => ({
      ...prevUmkm,
      lat: newPosition.lat,
      lng: newPosition.lng,
      address: newAddress,
    }));
  };

  // Validasi

  const [mapError, setMapError] = useState({
    lat: "",
    lng: "",
    address: "",
  });

  const validateField = (name, value) => {
    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    switch (name) {
      case "name":
        return value.length >= 3 ? "" : "Nama minimal 3 karakter";
      case "image":
        return isEditing ? "Selesaikan Cropping" : "";
      case "description":
        return value.length >= 10 ? "" : "Deskripsi minimal 10 karakter";
      case "price":
        return value > 0 ? "" : "Harga harus lebih dari 0";
      case "categoryId":
        return value !== "" ? "" : "Kategori harus dipilih";
      default:
        return "";
    }
  };

  useEffect(() => {
    const errors = {};
    Object.keys(map).forEach((key) => {
      errors[key] = validateField(key, map[key], map);
    });
    setMapError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isEditing]);

  // Sumbmit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (JSON.stringify(map) !== JSON.stringify(oldMap)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [map, oldMap]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // trimming
    const location = map.address.trim();
    const position = {
      lat: parseFloat(map.lat),
      lng: parseFloat(map.lng),
    };

    // upload image
    setLoading(true);
    noClose(true);
    setStatusPost("Sedang Memperbarui Lokasi");

    // save product
    const umkmData = {
      location: {
        lat: position.lat,
        lng: position.lng,
        name: location,
      },
    };

    const res = await editUmkm(umkmData);
    if (res) {
      setStatusPost("Lokasi Berhasil Diperbarui");
      refresh();
    } else {
      setStatusPost("Gagal Memperbarui Lokasi");
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
            <Map
              position={{ lat: map.lat, lng: map.lng }}
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
              value={map.lat}
              onChange={handleLatChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={mapError.lat} />
          </div>
          <div className="mb-4">
            <label htmlFor="lng" className="block font-semibold mb-1">
              Longitude
            </label>
            <input
              type="text"
              id="lng"
              value={map.lng}
              onChange={handleLngChange}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={mapError.lng} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="location" className="block font-semibold mb-1">
              Alamat
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={map.address}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={mapError.address} />
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

export default EditLocation;
