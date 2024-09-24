import CardResource from "../Elements/CardResource";
import Section from "./Index";
import AddBox from "../Elements/AddBox";
import ModalLayout from "../Layouts/ModalLayouts";
import AddResource from "./AddResource";
import { useState } from "react";
import SelectResource from "./SelectResources";
import Button from "../Elements/Button";

const Resources = ({
  product,
  title = "Bahan Baku",
  edited = false,
  select = false,
  style = "flex gap-6 w-full overflow-auto scrollbar-none py-8",
  refreshProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);

  const handleOpenModal = (val = "Tambah Bahan Baku") => {
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

  if (contentModal === "Tambah Bahan Baku") {
    modalContent = (
      <AddResource
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
        move={() => handleContentModal("Kelola Bahan Baku")}
      />
    );
  } else if (contentModal === "Kelola Bahan Baku") {
    modalContent = (
      <SelectResource
        product={product}
        move={handleOpenModal}
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <Section title={title}>
      {select && (
        <div className="flex gap-3 mt-10">
          <Button onClick={() => handleOpenModal("Tambah Bahan Baku")}>
            Tambah Bahan Baku
          </Button>
          <Button onClick={() => handleOpenModal("Kelola Bahan Baku")}>
            Kelola Bahan Baku
          </Button>
        </div>
      )}
      <div className={style}>
        {edited && (
          <AddBox openModal={() => handleOpenModal("Tambah Bahan Baku")} />
        )}
        {product.resource.map((resource, index) => (
          <CardResource
            key={index}
            name={resource.name}
            description={resource.description}
            src={resource.image}
            umkm={resource.umkm || null}
            location={resource.location.name || null}
            lat={resource.location.lat || null}
            lng={resource.location.lng || null}
            edited={edited}
            id={resource.id}
            refresh={refreshProduct}
          />
        ))}
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
    </Section>
  );
};

export default Resources;
