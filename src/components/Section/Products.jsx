import AddBox from "../Elements/AddBox";
import CardProduct from "../Elements/CardProduct";
import Section from "./Index";
import ModalLayout from "../Layouts/ModalLayouts";
import { useState } from "react";
import AddProduct from "./AddProduct";
import Pagination from "../Elements/Pagination";
import { ButtonLink } from "../Elements/Button";
import Category from "./Container/Category";

const Products = ({
  name = "Daftar Produk",
  data,
  edited = false,
  preview = false,
  pagination = false,
  page = 0,
  lastPage = 1,
  updateProducts,
  removeProduct,
}) => {
  const [isNoClose, setIsNoClose] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");

  const handleOpenModal = () => {
    setContentModal("Tambah Produk");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let modalContent = null;

  if (contentModal === "Tambah Produk") {
    modalContent = (
      <AddProduct
        updateProducts={updateProducts}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <Section title={name} nomb>
      {/* {!edited && <Category />} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mt-4">
        {edited && <AddBox openModal={handleOpenModal} className="w-full min-h-60" />}
        {data && data.length > 0 ? (
          <>
            {data.map((product) => (
              <CardProduct
                key={product.id}
                {...product}
                edited={edited}
                removeProduct={removeProduct}
              />
            ))}
          </>
        ) : (
          !edited && <p className="menu-list__empty">Belum Ada</p>
        )}
      </div>
      {pagination && <Pagination currentPage={page} lastPage={lastPage} />}
      {preview && (
        <div className="w-full mt-12 flex justify-center">
          <ButtonLink
            href="/product/page/1"
            className=" mx-auto text-center font-inter text-xl mt-8 font-semibold w-fit"
          >
            Tampilkan Semua Produk
          </ButtonLink>
        </div>
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

export default Products;
