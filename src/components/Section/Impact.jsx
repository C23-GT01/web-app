import CardImpact from "../Elements/CardImpact";
import Section from "./Index";
import Summary from "./Summary";
import AddBox from "../Elements/AddBox";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import AddImpact from "./AddImpact";
import SelectImpacts from "./SelectImpacts";
import Button from "../Elements/Button";

const Impact = ({
  name = "Produk Impact",
  useSummary = false,
  product,
  edited = false,
  select = false,
  refreshProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);

  const handleOpenModal = (val = "Tambah Impact") => {
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

  if (contentModal === "Tambah Impact") {
    modalContent = (
      <AddImpact
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
        move={select ? () => handleContentModal("Kelola Impact") : false}
      />
    );
  } else if (contentModal === "Kelola Impact") {
    modalContent = (
      <SelectImpacts
        move={handleOpenModal}
        product={product}
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  }
  return (
    <Section
      title={
        product != null && product.impact.length === 0 && !select && !edited ? "" : name
      }
    >
      {select && (
        <div className="flex gap-3 mt-10 mb-6">
          <Button onClick={() => handleOpenModal("Tambah Impact")}>
            Tambah Impact
          </Button>
          <Button onClick={() => handleOpenModal("Kelola Impact")}>
            Kelola Impact
          </Button>
        </div>
      )}
      <div className="flex gap-6 gap-y-8 mt-4 flex-wrap">
        {edited && <AddBox openModal={() => handleOpenModal()} />}
        {/* {select && <AddBox openModal={() => handleOpenModal("Pilih Impact")} />} */}
        {product != null &&
          product.impact != null &&
          product.impact.length > 0 &&
          product.impact.map(
            (impact, index) =>
              impact !== null && (
                <CardImpact
                  key={index}
                  name={impact.name}
                  description={impact.description}
                  src={impact.image}
                  edited={edited}
                  id={impact.id}
                  removeImpact={refreshProduct}
                />
              )
          )}
      </div>
      {useSummary && (
        <Summary
          data={product.contribution}
          edited={select}
          product={product}
          refreshProduct={refreshProduct}
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

export default Impact;
