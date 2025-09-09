import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";

const ChoiceModal = ({
  openChoiceModal,
  setOpenChoiceModal,
  setChooseResumeType,
  setOpenRegisterModal,
}) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleIndiVidual = () => {
    setSelectedType("individual");
    setChooseResumeType("individual");
    setOpenChoiceModal(false);
    setOpenRegisterModal(true);
  };
  const handleOrganization = () => {
    setSelectedType("organization");
    setChooseResumeType("organization");
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
                  Resume Type
                </h2>
              </div>

              {/* Content */}
              <div className="px-8 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Individual Resume Card */}
                  <div
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      selectedType === "individual"
                        ? "border-purple-500"
                        : "border-gray-200 hover:border-purple-500"
                    }`}
                    onClick={() => handleIndiVidual()}
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyNSIgZmlsbD0iI2Y5ZmFmYiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjczODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkluZGl2aWR1YWwgUmVzdW1lPC90ZXh0PgogIDxyZWN0IHg9IjUwIiB5PSI4MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI4MCIgZmlsbD0id2hpdGUiIHJ4PSI4Ii8+CiAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTA1IiByPSIxNSIgZmlsbD0iI2U1ZTdlYiIvPgogIDxyZWN0IHg9IjkwIiB5PSIxMzAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNCIgZmlsbD0iI2U1ZTdlYiIgcng9IjIiLz4KICA8cmVjdCB4PSIxMDAiIHk9IjE0MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIzIiBmaWxsPSIjZTVlN2ViIiByeD0iMiIvPgo8L3N2Zz4="
                        alt="Individual Resume"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        Individual Resume
                      </h3>
                    </div>
                  </div>

                  {/* Organization Resume Card */}
                  <div
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      selectedType === "organization"
                        ? "border-purple-500"
                        : "border-gray-200 hover:border-purple-500"
                    }`}
                    onClick={() => handleOrganization()}
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden">
                      <img
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyNSIgZmlsbD0iI2Y5ZmFmYiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNDAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjczODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk9yZ2FuaXphdGlvbiBSZXN1bWU8L3RleHQ+CiAgPHJlY3QgeD0iNTAiIHk9IjgwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiBmaWxsPSJ3aGl0ZSIgcng9IjgiLz4KICA8cmVjdCB4PSI3MCIgeT0iOTUiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2U1ZTdlYiIgcng9IjQiLz4KICA8cmVjdCB4PSIxMjAiIHk9Ijk1IiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiNlNWU3ZWIiIHJ4PSI0Ii8+CiAgPHJlY3QgeD0iMTcwIiB5PSI5NSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZTVlN2ViIiByeD0iNCIvPgo8L3N2Zz4="
                        alt="Organization Resume"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        Organization Resume
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
