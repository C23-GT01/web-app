import { useState } from "react";
import Loading from "../../Elements/Loading";
import Button from "../../Elements/Button";
import { deleteProduct } from "../../../services/product.service";

const DeleteProduct = ({
  message = "Apakah Anda yakin ingin menghapus?",
  slug,
  closeModal,
  removeProduct,
  noClose
}) => {
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("");

  const handleDelete = async (slug) => {
    setLoading(true);
    noClose(true);
    setStatusPost("Sedang Menghapus");
    const res = await deleteProduct(slug);
    if (res) {
      setStatusPost("Berhasil Menghapus Produk");
    } else {
      setStatusPost("Gagal Menghapus Produk");
    }
    setTimeout(() => {
      setLoading(false);
      noClose(false);
      if (res) {
        removeProduct(slug);
      }
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
        <>
          <div>{message}</div>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => closeModal()}
              type="submit"
              className={`py-2 px-4 mt-2  sm:col-span-2 w-20 `}
            >
              Tidak
            </Button>
            <Button
              onClick={() => handleDelete(slug)}
              type="submit"
              className={`py-2 px-4 w-20 mt-2  sm:col-span-2  bg-red-400 hover:bg-red-500`}
            >
              Ya
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteProduct;
