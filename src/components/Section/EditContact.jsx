/* eslint-disable no-case-declarations */
import React, { useState } from "react";
import Loading from "../Elements/Loading";
import { useEffect } from "react";
import Button from "../Elements/Button";
import Alert from "../Elements/Alert";
import { editUmkm } from "../../services/umkm.service";

const EditContact = ({ data, refresh, closeModal, noClose }) => {
  const [contact, setContact] = useState({
    email: data.contact.email,
    isWA: data.contact.phone.isWhatsApp,
    noHP: data.contact.phone.phoneNumber,
    noWA: data.contact.phone.waNumber,
  });
  const [oldContact] = useState({
    email: data.contact.email,
    isWA: data.contact.phone.isWhatsApp,
    noHP: data.contact.phone.phoneNumber,
    noWA: data.contact.phone.waNumber,
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
    email: "",
    noHP: "",
    noWA: "",
  });

  const validateField = (name, value) => {
    if (name === "noWA" && contact.isWA) {
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
        return contact.isWA || (value && waPattern.test(value))
          ? ""
          : "Nomor Whatsapp tidak valid";
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
    const contactData = {
      email: contact.email.trim(),
      phone: {
        phoneNumber: contact.noHP.trim(),
        isWhatsApp: contact.isWA,
        waNumber: contact.isWA ? "" : contact.noWA.trim(),
      },
    };

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
              htmlFor="email"
              className="block font-semibold mb-1 text-left "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contact.email}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />
            <Alert message={contactError.email} />
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
              value={contact.noHP}
              onChange={handleInput}
              className="w-full border rounded-md py-2 px-3"
              autoComplete="off"
              required
            />

            <Alert message={contactError.noHP} />

            <div className="flex items-center pt-2">
              <input
                type="checkbox"
                id="isWA"
                name="isWA"
                value={contact.isWA}
                checked={contact.isWA}
                onChange={handleInput}
              />
              <label htmlFor="isWA" className="ml-2">
                Ini nomor Whatsapp
              </label>
            </div>
          </div>
          {!contact.isWA && (
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
                value={contact.noWA}
                onChange={handleInput}
                className="w-full border rounded-md py-2 px-3"
                autoComplete="off"
                required
              />
              <Alert message={contactError.noWA} />
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

export default EditContact;
