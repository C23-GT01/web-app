import CardProcess from "../Elements/CardProcess";
import Section from "./Index";
import AddBox from "../Elements/AddBox";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import AddProcess from "./AddProcess";
import Button from "../Elements/Button";
import ManageProcess from "./Product/ManageProcess";

const Process = ({ product, edited = false, refreshProduct }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);

  const handleOpenModal = (val = "Tambah Proses") => {
    setContentModal(val);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Tambah Proses") {
    modalContent = (
      <AddProcess
        product={product}
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } else if (contentModal === "Kelola Proses") {
    modalContent = (
      <ManageProcess
        product={product}
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <Section title="Proses Produksi">
      {edited && product.production.length > 0 && (
        <div className="flex gap-3 my-10">
          <Button onClick={() => handleOpenModal("Tambah Proses")}>
            Tambah Proses
          </Button>
          <Button onClick={() => handleOpenModal("Kelola Proses")}>
            Kelola Proses Produksi
          </Button>
        </div>
      )}
      <div className="flex mt-4">
        <div className="w-2 h-[1] box-border translate-x-4 pt-32 md:pb-40">
          <div className="w-full h-full bg-[#dc0000]"></div>
        </div>
        <div className="flex-1">
          {product.production.map((process, index) => (
            <CardProcess
              key={index}
              name={process.name}
              description={process.description}
              src={process.image}
            />
          ))}
          {edited && (
            <>
              <div className="flex gap-5 mb-10">
                <div className="flex items-center w-6 justify-center mr-6">
                  <div className="w-5 h-5 bg-[#dc0000] rounded-full"></div>
                </div>
                <div className="flex flex-col sm:flex-row min-w-[100px] gap-4">
                  <AddBox openModal={() => handleOpenModal()} />
                  <div className=""></div>
                </div>
              </div>
            </>
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
        </div>
      </div>
    </Section>
  );
};

export default Process;
