import placeholder from "../../assets/img/placeholder.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdDelete, MdEdit, MdLocationOn } from "react-icons/md";
import Icon from "./Icon";
import { useState } from "react";
import EditImpact from "../Section/EditImpact";
import ModalLayout from "../Layouts/ModalLayouts";
import DeleteImpact from "../Section/DeleteImpact";

const CardImpact = ({
  src,
  description = "...",
  name = "...",
  edited = false,
  id,
  removeImpact,
}) => {
  const [isNoClose, setIsNoClose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");

  const handleOpenModal = (val = "Edit Impact") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Edit Impact") {
    modalContent = <EditImpact id={id} />;
  } else if (contentModal === "Hapus Impact") {
    modalContent = (
      <DeleteImpact
        slug={id}
        closeModal={handleCloseModal}
        removeImpact={removeImpact}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col w-full sm:w-48 md:w-64 drop-shadow-xl bg-white rounded-2xl">
        <LazyLoadImage
          src={src}
          placeholderSrc={placeholder}
          className="w-full min-h-64  sm:min-h-48  md:min-h-64 object-cover block rounded-t-2xl  mb-1"
          alt="img"
        />
        {edited && (
          <div className="w-full justify-end flex gap-2 py-2 px-2">
            <Icon size="w-6 h-6">
              <MdEdit onClick={() => handleOpenModal()} />
            </Icon>
            <Icon size="w-6 h-6">
              <MdDelete onClick={() => handleOpenModal("Hapus Impact")} />
            </Icon>
          </div>
        )}
        <div className="pt-4 p-4">
          <h1 className="font-inter text-xl font-bold mb-2">{name}</h1>
          <p className="mb-2">{description}</p>
        </div>
      </div>
      {isModalOpen && (
        <ModalLayout
          title={contentModal}
          noClose={isNoClose}
          onClose={handleCloseModal}
        >
          {modalContent}
        </ModalLayout>
      )}
    </>
  );
};

export default CardImpact;
