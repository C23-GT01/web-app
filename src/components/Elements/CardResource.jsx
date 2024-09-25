import { MdDelete, MdEdit, MdLocationOn } from "react-icons/md";
import { MdShoppingBag } from "react-icons/md";
import Icon from "./Icon";
import placeholder from "../../assets/img/placeholder.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import accessToken from "../../utils/accesToken";
import { useState } from "react";
import axios from "axios";
import DeleteResource from "../Section/Product/DeleteResource";
import ModalLayout from "../Layouts/ModalLayouts";
import EditResource from "../Section/EditResource";

const CardResource = ({
  src,
  name = "...",
  description = "...",
  umkm = null,
  location = null,
  lat,
  lng,
  edited = false,
  id,
  refresh,
  data,
}) => {
  const [isNoClose, setIsNoClose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");

  const handleOpenModal = (val = "Edit Bahan Baku") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Edit Bahan Baku") {
    modalContent = (
      <EditResource
        data={data}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
        refresh={refresh}
      />
    );
  } else if (contentModal === "Hapus Bahan Baku") {
    modalContent = (
      <DeleteResource
        id={id}
        closeModal={handleCloseModal}
        refresh={refresh}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <>
      <div className="flex flex-col drop-shadow-xl bg-white rounded-2xl w-64">
        <LazyLoadImage
          src={src}
          placeholderSrc={placeholder}
          className="w-full h-64 object-cover block mb-1 rounded-t-2xl"
          alt="img"
        />
        <div className="w-64 p-4">
          {edited && (
            <div className="w-full justify-end flex gap-2 py-2">
              <Icon size="w-6 h-6">
                <MdEdit onClick={() => handleOpenModal("Edit Bahan Baku")} />
              </Icon>

              <Icon size="w-6 h-6">
                <MdDelete onClick={() => handleOpenModal("Hapus Bahan Baku")} />
              </Icon>
            </div>
          )}

          <h1 className="font-inter font-bold text-xl mb-2">{name}</h1>
          <p className="mb-2 pr-1  font-inter">{description}</p>
          <div>
            <div>
              {umkm !== null && (
                <div className="flex gap-2 items-center font-bold mb-2 mt-4">
                  <Icon size="h-[37px] w-[37px]" active={true}>
                    <MdShoppingBag />
                  </Icon>
                  <div className="flex-1 font-inter">{umkm}</div>
                </div>
              )}
              {location !== null && (
                <a
                  href={`https://maps.google.com/?q=${lat},${lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex gap-2 items-center font-bold">
                    <Icon size="h-[37px] w-[37px]" active={true}>
                      <MdLocationOn />
                    </Icon>
                    <div className="flex-1  font-inter">{location}</div>
                  </div>
                </a>
              )}
            </div>
          </div>
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
    </>
  );
};

export default CardResource;
