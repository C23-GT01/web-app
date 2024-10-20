import Section from "../Index";
import AddBox from "../../Elements/AddBox";
import ModalLayout from "../../Layouts/ModalLayouts";
import { useState } from "react";
import AddProductCertificate from "../AddProductCertificate";
import CardCertificate from "../../Elements/CardCertificate";

const ProductCertificate = ({
  name = "Sertifikat Produk",
  product,
  edited = false,
  select = false,
  refreshProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);

  const handleOpenModal = (val = "Tambah Sertifikat") => {
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

  if (contentModal === "Tambah Sertifikat") {
    modalContent = (
      <AddProductCertificate
        data={product}
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
        move={select ? () => handleContentModal("Kelola Impact") : false}
      />
    );
  }
  return (
    <Section
      title={
        product != null && product.impact.length === 0 && !select && !edited
          ? ""
          : name
      }
    >
      {/* {select && (
        <div className="flex gap-3 mt-10 mb-6">
          <Button onClick={() => handleOpenModal("Tambah Sertifikat")}>
            Tambah Sertifikat
          </Button>
        </div>
      )} */}
      <div className="flex gap-6 gap-y-8 mt-4 flex-wrap">
        {edited && <AddBox openModal={() => handleOpenModal()} />}
        {product != null &&
          product.certificate != null &&
          product.certificate.length > 0 &&
          product.certificate.map(
            (certificate, index) =>
              certificate !== null && (
                <CardCertificate
                  key={index}
                  name={certificate.name}
                  description={certificate.description}
                  src={certificate.image}
                  certificate={certificate}
                  edited={edited}
                  id={certificate.id}
                  data={product}
                  refresh={refreshProduct}
                />
              )
          )}
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

export default ProductCertificate;
