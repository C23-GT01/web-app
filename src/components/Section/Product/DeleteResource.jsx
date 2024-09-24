import { useState } from "react";
import Loading from "../../Elements/Loading";
import Button from "../../Elements/Button";
import { deleteResource } from "../../../services/resource.service";

const DeleteResource = ({
  message = "Apakah Anda yakin ingin menghapus?",
  id,
  closeModal,
  refresh,
  noClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [statusPost, setStatusPost] = useState("");

  const handleDelete = async (id) => {
    setLoading(true);
    noClose(true);
    setStatusPost("Sedang Menghapus");
    const res = await deleteResource(id);
    if (res) {
      setStatusPost("Berhasil Menghapus Bahan Baku");
    } else {
      setStatusPost("Gagal Menghapus Bahan Baku");
    }
    setTimeout(() => {
      setLoading(false);
      noClose(false);
      if (res) {
        refresh();
      }
      closeModal();
    }, 750);
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
              onClick={() => handleDelete(id)}
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

export default DeleteResource;
