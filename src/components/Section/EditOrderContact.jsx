/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useEffect } from "react";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
import { editUmkm } from "../../services/umkm.service";
import { useParams } from "react-router-dom";
import { editProduct } from "../../services/product.service";

const EditOrderContact = ({ data, refresh, closeModal, noClose }) => {
  const { id } = useParams();
  const [contact, setContact] = useState({
    wa: data.order ? data.order.wa : "",
    shopee: data.order ? data.order.shopee : "",
    tokped: data.order ? data.order.tokped : "",
  });
  const [oldContact] = useState({
    wa: data.order ? data.order.shopee.wa : "",
    shopee: data.order ? data.order.shopee : "",
    tokped: data.order ? data.order.tokped : "",
  });

  // Input
  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validasi
  const [contactError, setContactError] = useState({
    wa: "",
    shopee: "",
    tokped: "",
  });

  const validateField = (name, value) => {
    const basicUrlPattern = /^(https?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})/;
    if (typeof value === "string" && value.trim() === "") {
      return "";
    }

    // Validasi individual
    switch (name) {
      case "wa":
        const waPattern = /^[0-9]{10,13}$/;
        if (waPattern.test(value)) {
          return "";
        } else {
          return "Nomor Whatsapp tidak valid";
        }
      case "shopee":
        if (!basicUrlPattern.test(value)) {
          return "URL tidak valid";
        }
        if (!value.startsWith("https://")) {
          return "URL harus dimulai dengan https://";
        }
        return "";

      case "tokped":
        if (!basicUrlPattern.test(value)) {
          return "URL tidak valid";
        }
        if (!value.startsWith("https://")) {
          return "URL harus dimulai dengan https://";
        }
        return "";
      default:
        return "";
    }
  };

  useEffect(() => {
    const errors = {};
    Object.keys(contact).forEach((key) => {
      errors[key] = validateField(key, contact[key], contact);
    });
    setContactError(errors);

    const hasErrors = Object.values(errors).some((error) => error !== "");
    setIsSubmitDisabled(hasErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact]);

  //Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  useEffect(() => {
    if (JSON.stringify(contact) === JSON.stringify(oldContact)) {
      setIsSubmitDisabled(true);
    }
  }, [contact, oldContact]);

  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Triming
    const data = {
      order: {
        wa: contact.wa.trim(),
        shopee: contact.shopee.trim(),
        tokped: contact.tokped.trim(),
      },
    };

    setStatusPost("Memperbarui Pemesanan");
    setLoading(true);
    noClose(true);

    const res = await editProduct(id, data);
    if (res) {
      setStatusPost("Pemesanan Diperbarui");
    } else {
      setStatusPost("Pemesanan Gagal Diperbarui");
    }
    setTimeout(() => {
      closeModal();
      refresh();
      setLoading(false);
      noClose(false);
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
            <label
              htmlFor="name"
              className="block font-semibold mb-1 text-left "
            >
              Nomor WhatsApp
            </label>
            <input
              type="text"
              id="wa"
              name="wa"
              placeholder="08123456789"
              value={contact.wa}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
            />
            <Alert message={contactError.wa} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label
              htmlFor="url"
              className="block font-semibold mb-1 text-left  "
            >
              Link Shopee
            </label>

            <input
              type="text"
              id="shopee"
              name="shopee"
              value={contact.shopee}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              placeholder="https://shopee.co.id/example"
            />

            <Alert message={contactError.shopee} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label
              htmlFor="url"
              className="block font-semibold mb-1 text-left  "
            >
              Link Tokopedia
            </label>

            <input
              type="text"
              id="tokped"
              name="tokped"
              value={contact.tokped}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              placeholder="https://tokopedia.co.id/example"
            />

            <Alert message={contactError.tokped} />
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

export default EditOrderContact;
