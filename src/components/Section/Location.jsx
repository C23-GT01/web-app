import Section from "./Index";
import Map from "../Elements/Map";
import MapDetail from "../Elements/MapDetail";
import Button from "../Elements/Button";
import { useState } from "react";
import EditLocation from "./UMKM/EditLocation";
import ModalLayout from "../Layouts/ModalLayouts";

const Location = ({ data, edited = false, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);
  const handleOpenModal = (val = "Edit Alamat") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Edit Alamat") {
    modalContent = (
      <EditLocation
        data={data}
        refresh={refresh}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <Section title="Alamat">
      {edited && (
        <div className="flex gap-3 my-6">
          <Button onClick={() => handleOpenModal("Edit Alamat")}>
            Edit Alamat
          </Button>
        </div>
      )}
      <div className="flex gap-3 mt-4 flex-col">
        <Map lat={data.location.lat} lng={data.location.lng} />
        <MapDetail name={data.location.name} />
      </div>
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

export default Location;
