import Pencil from "./Pencil";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import EditBanner from "../Section/EditBanner";
import EditUmkmSummary from "../Section/EditUmkmSummary";
import Button from "./Button";

const UmkmSummary = ({
  data,
  logo,
  name = "...",
  description = "...",
  edited = false,
  refresh,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);

  const handleOpenModal = (val = "Edit Banner") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Edit Banner") {
    modalContent = (
      <EditBanner
        refresh={refresh}
        data={data}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } else if (contentModal === "Edit Detail UMKM") {
    modalContent = (
      <EditUmkmSummary
        refresh={refresh}
        data={data}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <div className="bg-white py-4 xl:px-0 p-4">
      <div className="max-w-[1240px] mx-auto flex gap-4 flex-wrap sm:flex-nowrap ">
        <img src={data.logo} alt="" className="w-[130px] h-[130px] rounded-full" />
        <div className="w-full">
          <h1 className="font-h1 text-2xl font-inter flex gap-2 w-full items-center justify-between mb-2">
            {data.name}
          </h1>
          {edited && (
            <div className="flex gap-3 my-6">
              <Button onClick={() => handleOpenModal("Edit Detail UMKM")}>
                Edit Detail UMKM
              </Button>
              <Button onClick={() => handleOpenModal("Edit Banner")}>
                Edit Banner
              </Button>
            </div>
          )}
          <p className="font-inter text-justify whitespace-pre-line">
            {data.description}
          </p>
        </div>
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
    </div>
  );
};

export default UmkmSummary;
