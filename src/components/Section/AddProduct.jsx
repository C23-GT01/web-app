import React, { useEffect, useState } from "react";
import Loading from "../Elements/Loading";
import CropImage from "./CropImage";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
import { addProduct, getAllCategories } from "../../services/product.service";
import base64ToBlob from "../../utils/toBlob";
import { upload } from "../../services/upload.service";

const AddProduct = ({updateProducts, closeModal, noClose}) => {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: 0,
    contribution: [9],
    categoryId: "",
  });

  const [categories, setCategories] = useState();
  useEffect(() => {
    getAllCategories((data) => {
      if (data) setCategories(data);
    });
  }, []);

  // Input
  const [isEditing, setIsEditing] = useState(false);

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (file) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      image: file,
    }));
  };

  const handleCrop = (value) => {
    setIsEditing(value);
  };

  // Validasi

  const [productError, setProductError] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    categoryId: "",
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
    Object.keys(product).forEach((key) => {
      errors[key] = validateField(key, product[key], product);
    });
    setProductError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isEditing]);

  // Sumbmit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // trimming
    const name = product.name.trim();
    const description = product.description.trim();
    const price = parseInt(product.price, 10);
    const categoryId = parseInt(product.categoryId, 10);


    // upload image
    setLoading(true);
    noClose(true);
    setStatusPost("Sedang Menyimpan Produk");
    const blob = await base64ToBlob(product.image);
    const publicUrl = await upload(blob);

    // save product
    const productData = {
      name,
      description,
      price,
      images: [publicUrl],
      categoryId,
      contribution: product.contribution,
    };

    const res = await addProduct(productData);
    console.log(res);
    if (res) {
      setStatusPost("Produk Ditambahkan");
      updateProducts({
        id: res.data.id,
        name: res.data.name,
        description: res.data.description,
        slug: res.data.slug,
        price: res.data.price,
        images: res.data.images,
      });
    } else {
      setStatusPost("Produk Gagal Ditambahkan");
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
              error={productError.image}
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
          <div className="mb-4 ">
            <label htmlFor="name" className="block font-semibold mb-1 ">
              Nama Produk
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={productError.name} />
          </div>
          <div className="mb-4 ">
            <label htmlFor="price" className="block font-semibold mb-1 ">
              Harga(Rp)
            </label>
            <input
              type="number"
              min="0"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={productError.price} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label htmlFor="category" className="block font-semibold mb-1">
              Kategori
            </label>
            <select
              id="category"
              name="categoryId"
              value={product.categoryId}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            >
              <>
                <option value="">Pilih Kategori</option>
                {categories && categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </>
            </select>
            <Alert message={productError.categoryId} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1 ">
              Deskripsi
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={product.description}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-32"
              autoComplete="off"
              required
            />
            <Alert message={productError.description} />
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

export default AddProduct;
