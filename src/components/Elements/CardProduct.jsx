import { MdQrCode } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import placeholder from "../../assets/img/placeholder.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import { useState } from "react";
import ModalLayout from "../Layouts/ModalLayouts";
import QRCodeGenerator from "../Elements/qr";
import DeleteProduct from "../Section/Product/DeleteProduct";

const CardProduct = ({
  slug,
  images,
  name,
  price,
  edited = false,
  removeProduct,
}) => {
  const [isNoClose, setIsNoClose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");

  const handleOpenModal = (val = "QR Code") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "QR Code") {
    modalContent = <QRCodeGenerator slug={slug} />;
  } else if (contentModal === "Hapus Produk") {
    modalContent = (
      <DeleteProduct
        slug={slug}
        closeModal={handleCloseModal}
        removeProduct={removeProduct}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <div
      className={`w-full h-full relative rounded-xl overflow-hidden flex flex-col ${
        !edited && "hover:scale-105"
      } bg-white rounded-2xl shadow-lg`}
    >
      <>
        <Link
          to={`/product/${slug}`}
          className="absolute bg-transparant w-full h-56 top-0"
        ></Link>
        <LazyLoadImage
          src={images[0]}
          placeholderSrc={placeholder}
          className="w-full h-56 object-cover"
          alt="img"
        />
        {edited && (
          <div className="w-full justify-between flex gap-2 py-2 px-2 -mb-4">
            <Icon size="w-6 h-6">
              <MdQrCode onClick={() => handleOpenModal()} />
            </Icon>
            <Link to={`/product/edit/${slug}`}>
              <Icon size="w-6 h-6">
                <MdEdit />
              </Icon>
            </Link>
            <div className="flex">
              <Icon size="w-6 h-6">
                <MdDelete onClick={() => handleOpenModal("Hapus Produk")} />
              </Icon>
            </div>
          </div>
        )}
        {/* <Link to={`/product/${id}`} className="text-black"> */}
        <div className="flex py-4 justify-between items-start p-2">
          {/* kepanjangan buat bergerak */}
          <div className="relative overflow-hidden w-full">
            <h1
              className={`font-h1 text-sm font-inter whitespace-nowrap ${
                name.length > 10 ? "animate-marquee-2" : ""
              }  `}
            >
              {name}
            </h1>
          </div>
          {price > 0 && (
            <h1 className="font-h1 text-sm font-inter text-[#886345]">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(price)}
            </h1>
          )}
        </div>
        {/* </Link> */}
      </>
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

export default CardProduct;
