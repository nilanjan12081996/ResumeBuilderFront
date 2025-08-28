"use client";
import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { cancelSubscription, getProfile } from "../reducers/ProfileSlice";

const SubsCancelModal = ({
  openCancelModal,
  setOpenCandelModal,
  subsId,
  profileData,
}) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(cancelSubscription({ subscription_id: subsId })).then((res) => {
      console.log("res", res);
      if (res?.payload?.status_code === 200) {
        dispatch(getProfile());
        setOpenCandelModal(false);
      }
    });
  };

  const handelCancel = () => {
    setOpenCandelModal(false);
  };
  return (
    <>
      <Modal
        size="xl"
        show={openCancelModal}
        onClose={() => setOpenCandelModal(false)}
      >
        <ModalHeader className="border-none pb-0 bg-white">&nbsp;</ModalHeader>
        <ModalBody className="bg-white p-5 text-center">
          <p className="text-xl text-black mb-3">Are You Sure?</p>
          <div className="flex gap-2 justify-center">
            <div>
              <Button
                className="!bg-green-400 cursor-pointer"
                onClick={() => handleDelete()}
              >
                Yes
              </Button>
            </div>
            <div>
              <Button
                className="!bg-red-500 cursor-pointer"
                onClick={handelCancel}
              >
                No
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default SubsCancelModal;
