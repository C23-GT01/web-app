import Section from "../Index";
import { useState } from "react";
import ModalLayout from "../../Layouts/ModalLayouts";
import Button from "../../Elements/Button";
import OrderContactBox from "../../Elements/OrderContactBox";
import EditOrderContact from "../EditOrderContact";

const OrderContact = ({ data, edited = false, refresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentModal, setContentModal] = useState("Account");
  const [isNoClose, setIsNoClose] = useState(false);

  const handleOpenModal = (val = "Edit Kontak") => {
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

  if (contentModal === "Edit Pemesanan") {
    modalContent = (
      <EditOrderContact
        data={data}
        refresh={refresh}
        closeModal={handleCloseModal}
        noClose={setIsNoClose}
      />
    );
  } 

  return (
    <Section title="Order Now">
      {edited && (
        <div className="flex gap-2 mt-6 flex-wrap">
          <Button onClick={() => handleOpenModal("Edit Pemesanan")}>
            Edit Pemesanan
          </Button>
        </div>
      )}
      {data.order && (
        <OrderContactBox
          wa={data.order.wa && data.order.wa}
          shopee={data.order.shopee && data.order.shopee}
          tokped={data.order.tokped && data.order.tokped}
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

export default OrderContact;
