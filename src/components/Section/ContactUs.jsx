import ContactBox from "../Elements/ContactBox";
import Section from "./Index";
import { useState } from "react";
import EditContact from "./EditContact";
import ModalLayout from "../Layouts/ModalLayouts";
import Button from "../Elements/Button";
import EditShopee from "./EditShopee";
import EditTokped from "./EditTokped";
import EditFacebook from "./EditFacebook";
import EditInstagram from "./EditInstagram";

const ContactUs = ({ data, edited = false, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);

  const handleOpenModal = (val = "Edit Kontak") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleContentModal = (val) => {
    setContentModal(val);
  };

  let modalContent = null;

  if (contentModal === "Edit Kontak") {
    modalContent = (
      <EditContact
        data={data}
        refresh={refresh}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } else if (contentModal === "Edit Shopee") {
    modalContent = (
      <EditShopee
        data={data}
        refresh={refresh}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } else if (contentModal === "Edit Tokopedia") {
    modalContent = (
      <EditTokped
        data={data}
        refresh={refresh}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } else if (contentModal === "Edit Facebook") {
    modalContent = (
      <EditFacebook
        data={data}
        refresh={refresh}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } else if (contentModal === "Edit Instagram") {
    modalContent = (
      <EditInstagram
        data={data}
        refresh={refresh}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <Section title="Kontak UMKM" titlecenter>
      {edited && (
        <div className="flex gap-2 mt-6 justify-center flex-wrap">
          <Button onClick={() => handleOpenModal("Edit Kontak")}>
            Edit Kontak
          </Button>
          <Button onClick={() => handleOpenModal("Edit Shopee")}>
            Edit Shopee
          </Button>
          <Button onClick={() => handleOpenModal("Edit Tokopedia")}>
            Edit Tokopedia
          </Button>
          <Button onClick={() => handleOpenModal("Edit Facebook")}>
            Edit Facebook
          </Button>
          <Button onClick={() => handleOpenModal("Edit Instagram")}>
            Edit Instagram
          </Button>
        </div>
      )}
      {data.contact && (
        <ContactBox
          wa={
            data.contact.phone.isWhatsApp
              ? data.contact.phone.phoneNumber
              : data.contact.phone.waNumber
          }
          shopee={data.contact.shopee && data.contact.shopee}
          tokped={data.contact.tokped && data.contact.tokped}
          fb={data.contact.faceBook && data.contact.faceBook}
          ig={data.contact.instagram && data.contact.instagram}
          email={data.contact.email}
          phone={
            data.contact.phone.isWhatsApp
              ? null
              : data.contact.phone.phoneNumber
          }
        />
      )}

      {isModalOpen && (
        <ModalLayout
          title={contentModal}
          onClose={handleCloseModal}
          noClose={isNoClose}
        >
          {modalContent}
        </ModalLayout>
      )}
    </Section>
  );
};

export default ContactUs;
