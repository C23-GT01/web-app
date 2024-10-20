import { useState } from "react";
import Loading from "../Elements/Loading";
import Button from "../Elements/Button";
import { editProduct } from "../../services/product.service";
import { deleteFile } from "../../services/upload.service";

const DeleteCertificateProduct = ({
  message = "Apakah Anda yakin ingin menghapus?",
  closeModal,
  refresh,
  noClose,
  product,
  certificate,
}) => {
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    noClose(true);
    setStatusPost("Sedang Menghapus");

    const updatedCertificates = product.certificate.filter(
      (cert) => cert !== certificate
    );

    const certificateData = {
      certificate: updatedCertificates,
    };

    if (certificate.image) {
      deleteFile(certificate.image);
    }

    const res = await editProduct(product.slug, certificateData);

    if (res) {
      setStatusPost("Berhasil Menghapus Sertifikat");
    } else {
      setStatusPost("Gagal Menghapus Sertifikat");
    }
    setTimeout(() => {
      setLoading(false);
      noClose(false);
      if (res) {
        refresh();
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
              onClick={() => handleDelete()}
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

export default DeleteCertificateProduct;
