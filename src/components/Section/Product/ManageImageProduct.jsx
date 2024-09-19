import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Elements/Loading";
import Button from "../../Elements/Button";
import { editProduct } from "../../../services/product.service";
import ImageBox from "../../Elements/Image-box";

const ManageImageProduct = ({
  product,
  refreshProduct,
  closeModal,
  noClose,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState(product.images);
  const [deletedImages, setDeletedImages] = useState([]);
  const [originalImages] = useState(product.images);

  // Input
  const deleteImage = (index) => {
    const newImages = [...images];
    setDeletedImages([...deletedImages, images[index]]);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const undoDeleteImage = (index) => {
    const newImages = [...deletedImages];
    setImages([...images, deletedImages[index]]);
    newImages.splice(index, 1);
    setDeletedImages(newImages);
  };

  const makeMainImages = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    newImages.unshift(images[index]);
    setImages(newImages);
  };

  useEffect(() => {
    if (JSON.stringify(images) !== JSON.stringify(originalImages)) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [images, originalImages]);

  // Submit
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("Mulai Mengupload");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // save product
    const productData = {
      images,
    };

    setLoading(true);
    noClose(true);
    setStatusPost("Memberbarui Gambar Produk");

    const res = await editProduct(id, productData);
    if (res) {
      setStatusPost("Gambar Produk Diperbarui");
      if (res.data.slug === id) {
        refreshProduct();
      } else {
        navigate(`/product/edit/${res.data.slug}`);
      }
    } else {
      setStatusPost("Gagal Membperbarui");
    }
    setTimeout(() => {
      setLoading(false);
      noClose(false);
      closeModal();
    }, 1500);
  };

  return (
    <div className="w-full p-4 ">
      {loading ? (
        <div className="loading-indicator">
          <Loading />
          <h1 className="text-sm font-inter mt-1 text-center">{statusPost}</h1>
        </div>
      ) : (
        <div className="">
          <div className="h-[400px] flex flex-col mb-2">
            <div className="overflow-auto flex-col flex gap-2 items-center">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 flex-wrap mb-10"
                >
                  <ImageBox src={src} />
                  {index == 0 && (
                    <div className="h-fit text-center bg-[#BBB] rounded-xl p-5">
                      Gambar Utama
                    </div>
                  )}
                  {index !== 0 && (
                    <div className="flex gap-3 h-12">
                      <Button onClick={() => makeMainImages(index)}>
                        Jadikan Gambar Utama
                      </Button>
                      <Button onClick={() => deleteImage(index)}>Hapus</Button>
                    </div>
                  )}
                </div>
              ))}
              {deletedImages.map((src, index) => (
                <div key={index} className="flex gap-4 flex-wrap">
                  <ImageBox src={src} />
                  <div className="flex gap-3 h-12 flex-wrap">
                    <Button onClick={() => undoDeleteImage(index)}>
                      Batal Hapus
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
          <Button
            disabled={isSubmitDisabled}
            type="submit"
            className={`py-2 px-4 w-full mt-2  sm:col-span-2`}
          >
            Konfirmasi
          </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageImageProduct;
