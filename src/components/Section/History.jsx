import { useEffect, useState } from "react";
import HistoryBox from "../Elements/HistoryBox";
import EditHistory from "./EditHistory";
import Section from "./Index";
import Button from "../Elements/Button";
import ModalLayout from "../Layouts/ModalLayouts";

const History = ({ data, edited = false, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);
  const [history, setHistory] = useState({
    history: {
      text: "",
      image: "",
    },
  });
  useEffect(() => {
    if (data.history !== null) {
      setHistory(data);
    }
  }, [data]);

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

  if (contentModal === "Edit Sejarah") {
    modalContent = (
      <EditHistory
        refresh={refresh}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
        data={history}
      />
    );
  }

  return (
    <Section title="Sejarah UMKM">
      {edited && (
        <div className="flex gap-3 my-6">
          <Button onClick={() => handleOpenModal("Edit Sejarah")}>
            Edit Sejarah
          </Button>
        </div>
      )}
      {data.history !== null && (
        <div className="mt-5 min-h-60">
          <HistoryBox data={data} edited={edited} refresh={refresh} />
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

export default History;
