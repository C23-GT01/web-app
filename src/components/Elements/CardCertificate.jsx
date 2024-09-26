import placeholder from "../../assets/img/placeholder.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdDelete, MdEdit, MdLocationOn } from "react-icons/md";
import Icon from "./Icon";
import { useState } from "react";
// import EditCertificate from "../Section/EditCertificate";
import ModalLayout from "../Layouts/ModalLayouts";
import DeleteCertificateProduct from "../Section/DeleteCertificateProduct";

const Card = ({
  data,
  src,
  description = "...",
  name = "...",
  edited = false,
  id,
  refresh,
  certificate
}) => {
  const [isNoClose, setIsNoClose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");

  const handleOpenModal = (val = "Edit Certificate") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Edit Certificate") {
    modalContent = ""
    // (
    //   <EditCertificate
    //     data={data}
    //     closeModal={handleCloseModal}
    //     noClose={setIsNoClose}
    //     refresh={refresh}
    //   />
    // );
  } else if (contentModal === "Hapus Sertifikat") {
    modalContent = (
      <DeleteCertificateProduct
        closeModal={handleCloseModal}
        refresh={refresh}
        noClose={setIsNoClose}
        product={data}
        certificate={certificate}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col drop-shadow-xl bg-white rounded-2xl overflow-hidden">
        {src !== "" ? (
          <LazyLoadImage
            src={src}
            placeholderSrc={placeholder}
            className="w-full h-64 object-cover block rounded-t-2xl  mb-1"
            alt="img"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex justify-center items-center text-gray-700 text-2xl font-semibold rounded-t-2xl mb-1 p-4">
            {name}
          </div>
        )}
        {edited && (
          <div className="w-full justify-end flex gap-2 py-2 px-2">
            <Icon size="w-6 h-6">
              <MdEdit onClick={() => handleOpenModal()} />
            </Icon>
            <Icon size="w-6 h-6">
              <MdDelete onClick={() => handleOpenModal("Hapus Sertifikat")} />
            </Icon>
          </div>
        )}
        <div className="pt-4 p-4">
          <h1 className="font-inter text-xl font-bold mb-2">{name}</h1>
          <p className="mb-2 whitespace-pre-line">{description}</p>
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

export default Card;
