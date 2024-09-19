import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import ImageBox from "../../Elements/Image-box";
import NamePrice from "../../Elements/NamePrice";
import DescriptionProduct from "../../Elements/DesriptionProduct";
import Button from "../../Elements/Button";
import { useEffect, useState } from "react";
// import EditDetailProduct from "./EditDetailProduct";
import ModalLayout from "../../Layouts/ModalLayouts";
import EditDetailProduct from "./EditDetailProduct";
import ManageImageProduct from "./ManageImageProduct";
import AddImage from "./AddImage";
import { useRef } from "react";

const TopDetail = ({ refreshProduct, data, edited = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const checkScrollable = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth } = containerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, [data.images]);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleOpenModal = (val = "Edit Detail Product") => {
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

  if (contentModal === "Edit Detail Product") {
    modalContent = (
      <EditDetailProduct
        refreshProduct={refreshProduct}
        product={data}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } else if (contentModal === "Kelola Gambar") {
    modalContent = (
      <ManageImageProduct
        product={data}
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } else if (contentModal === "Tambah Gambar") {
    modalContent = (
      <AddImage
        product={data}
        refreshProduct={refreshProduct}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  }

  return (
    <div className="py-4 xl:px-0 p-4 mt-28 bg-white">
      <div className="max-w-[1240px] mx-auto">
        <div className="relative">
          <div
            className="flex gap-4 overflow-auto scrollbar-none py-8 w-full"
            ref={containerRef}
          >
            {data.images.map((src, index) => (
              <ImageBox key={index} src={src} />
            ))}
          </div>
          {isScrollable && (
            <>
              <Button
                className="absolute -left-5 top-1/2 transform -translate-y-1/2 drop-shadow-xl opacity-70 py-5 "
                onClick={scrollLeft}
              >
                <MdArrowBackIosNew />
              </Button>
              <Button
                className="absolute -right-5 top-1/2 transform -translate-y-1/2 drop-shadow-xl opacity-70 py-5"
                onClick={scrollRight}
              >
                <MdArrowForwardIos />
              </Button>
            </>
          )}
        </div>

        <NamePrice name={data.name} price={data.price} edited={edited} />
        {edited && (
          <div className="flex gap-3 mb-5">
            <Button onClick={() => handleOpenModal()}>
              Edit Detail Product
            </Button>
            <Button onClick={() => handleOpenModal("Tambah Gambar")}>
              Tambah Gambar
            </Button>
            {data.images.length > 1 && (
              <Button onClick={() => handleOpenModal("Kelola Gambar")}>
                Kelola Gambar
              </Button>
            )}
          </div>
        )}
        <DescriptionProduct>{data.description}</DescriptionProduct>
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

export default TopDetail;
