/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useEffect } from "react";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
import { editUmkm } from "../../services/umkm.service";

const EditShopee = ({ data, refresh, closeModal, noClose }) => {
  const [contact, setContact] = useState({
    name: data.contact.shopee ? data.contact.shopee.name : "",
    url: data.contact.shopee ? data.contact.shopee.url : "",
  });
  const [oldContact] = useState({
    name: data.contact.shopee ? data.contact.shopee.name : "",
    url: data.contact.shopee ? data.contact.shopee.url : "",
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
    name: "",
    url: "",
  });

  const validateField = (name, value, contact) => {
    // Cek jika kedua field kosong, maka tidak ada error sama sekali
    if (contact.name.trim() === "" && contact.url.trim() === "") {
      return "";
    }

    // Jika field kosong, tampilkan error
    if (typeof value === "string" && value.trim() === "") {
      return " ";
    }

    // Validasi individual
    switch (name) {
      case "name":
        return value.length >= 3 ? "" : "Nama minimal 3 karakter";

      case "url":
        const basicUrlPattern = /^(https?:\/\/)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})/;
        if (!basicUrlPattern.test(value)) {
          return "URL tidak valid";
        }
        if (!value.startsWith("https://")) {
          return "URL harus dimulai dengan https://";
        }
        return ""; // Tidak ada error jika valid
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
    let contactData;
    if (contact.name === "" && contact.url === "") {
      const { shopee, ...restContact } = data.contact;
      contactData = {
        ...restContact,
      };
    } else {
      contactData = {
        ...data.contact,
        shopee: {
          name: contact.name.trim(),
          url: contact.url.trim(),
        },
      };
    }

    const umkmData = {
      contact: contactData,
    };

    setLoading(true);
    setStatusPost("Memperbarui Kontak");
    noClose(true);
    const res = await editUmkm(umkmData);
    if (res) {
      setStatusPost("Kontak berhasil diperbarui");
      refresh();
    } else {
      setStatusPost("Kontak gagal diperbarui");
    }
    setTimeout(() => {
      closeModal();
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
              Nama Akun
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contact.name}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
            />
            <Alert message={contactError.name} />
          </div>
          <div className="mb-4 md:col-span-2">
            <label
              htmlFor="url"
              className="block font-semibold mb-1 text-left  "
            >
              Url Akun
            </label>

            <input
              type="text"
              id="url"
              name="url"
              value={contact.url}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              placeholder="https://shopee.co.id/example"
            />

            <Alert message={contactError.url} />
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

export default EditShopee;
