import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSignupType } from "../reducers/AuthSlice";
import InstittuionImg from '../assets/imagesource/Instittuion.png'
import JobseekerImg from '../assets/imagesource/Jobseeker.png'
import Image from "next/image";

const ChoiceModal = ({
  openChoiceModal,
  setOpenChoiceModal,
  setChooseResumeType,
  setOpenRegisterModal,
}) => {
  const { signUpTypes } = useSelector((state) => state?.auth)
  const [selectedType, setSelectedType] = useState(null);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSignupType())
  }, [])
  console.log("signUpTypes", signUpTypes);

  const handleIndiVidual = (id) => {
    setSelectedType(id);
    setChooseResumeType(id);
    setOpenChoiceModal(false);
    setOpenRegisterModal(true);
  };
  const handleOrganization = (id) => {
    setSelectedType(id);
    setChooseResumeType(id);
    setOpenChoiceModal(false);
    setOpenRegisterModal(true);
  };
  return (
    <>
      <Modal
        size="3xl"
        show={openChoiceModal}
        onClose={() => setOpenChoiceModal(false)}
      >
        <ModalHeader className="border-none pb-0 absolute right-3 top-0 bg-transparent">
          &nbsp;
        </ModalHeader>
        <ModalBody className="bg-white rounded-2xl p-0 pt-8">
          <div className=" flex items-center justify-center p-4">
            <div className=" rounded-xl max-w-2xl w-full relative">
              {/* Close button */}

              {/* Header */}
              <div className="text-center mt-0 pb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Signup Type
                </h2>
              </div>

              {/* Content */}
              <div className="px-8 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Individual Resume Card */}
                  <div
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${selectedType == signUpTypes?.data?.[0]?.id
                      ? "border-purple-500"
                      : "border-gray-200 hover:border-purple-500"
                      }`}
                    onClick={() => handleIndiVidual(signUpTypes?.data?.[0]?.id)}
                  >
                    {/* Image */}
                    <div className=" bg-gray-100 rounded-t-lg overflow-hidden">
                      <Image
                        src={JobseekerImg}
                        alt="Organization Resume"
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {signUpTypes?.data?.[0]?.name}
                      </h3>
                    </div>
                  </div>

                  {/* Organization Resume Card */}
                  <div
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${selectedType == signUpTypes?.data?.[1]?.id
                      ? "border-purple-500"
                      : "border-gray-200 hover:border-purple-500"
                      }`}
                    onClick={() => handleOrganization(signUpTypes?.data?.[1]?.id)}
                  >
                    {/* Image */}
                    <div className="bg-gray-100 rounded-t-lg overflow-hidden">
                      <Image
                        src={InstittuionImg}
                        alt="Organization Resume"
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {signUpTypes?.data?.[1]?.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default ChoiceModal;
