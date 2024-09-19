import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Elements/Loading";
import Button from "../../Elements/Button";
import { useEffect } from "react";
import {
  editProduct,
  getAllCategories,
} from "../../../services/product.service";
import Alert from "../../Elements/Alert";

const EditDetailProduct = ({
  product,
  refreshProduct,
  closeModal,
  noClose,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
  });
  const[oldProductDetail, setOldProductDetail] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
  })
  const [categories, setCategories] = useState();
  useEffect(() => {
    getAllCategories((data) => {
      if (data) setCategories(data);
    });
  }, []);

  // Input
  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setProductDetail((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validasi

  const [productError, setProductError] = useState({
    name: "",
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
    Object.keys(productDetail).forEach((key) => {
      errors[key] = validateField(key, productDetail[key], productDetail);
    });
    setProductError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (JSON.stringify(productDetail) === JSON.stringify(oldProductDetail)) {
      setIsSubmitDisabled(true);
    } 
  }, [productDetail, oldProductDetail]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // trimming
    const name = productDetail.name.trim();
    const description = productDetail.description.trim();
    const price = parseInt(productDetail.price, 10);
    const categoryId = parseInt(productDetail.categoryId, 10);

    // save product
    const productData = {
      name,
      description,
      price,
      categoryId,
    };

    setLoading(true);
    noClose(true);
    setStatusPost("Memberbarui Produk");

    const res = await editProduct(id, productData);
    if (res) {
      setStatusPost("Produk Diperbarui");
      if (res.data.slug === id) {
        refreshProduct();
      } else {
        navigate(`/product/edit/${res.data.slug}`);
      }
    } else {
      setStatusPost("Produk Gagal Diperbarui");
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
            <label
              htmlFor="name"
              className="block font-semibold mb-1 text-left "
            >
              Nama Product
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productDetail.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={productError.name} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label
              htmlFor="name"
              className="block font-semibold mb-1 text-left "
            >
              Harga
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={productDetail.price}
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
              value={productDetail.categoryId}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            >
              <>
                <option value="">Pilih Kategori</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </>
            </select>
            <Alert message={productError.categoryId} />
          </div>

          <div className="mb-4 md:col-span-2">
            <label htmlFor="description" className="block font-semibold mb-1">
              Deskripsi
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              value={productDetail.description}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3 h-48"
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

export default EditDetailProduct;
