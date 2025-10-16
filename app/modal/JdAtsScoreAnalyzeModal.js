'use client';
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import { IoClose } from "react-icons/io5";

const JdAtsScoreAnalyzeModal = ({ show, setShow, atsData }) => {
  return (
    <Modal size="md" show={show} onClose={() => setShow(false)}>
      <ModalHeader className="flex justify-between items-center bg-white border-b border-gray-200 px-5 py-3">
        <span className="text-[18px] font-semibold text-[#800080]">JD ATS Score</span>
      </ModalHeader>

      <ModalBody className="bg-white flex flex-col items-center justify-center py-8 rounded-b-[6px]">
        <div className="relative w-40 h-40 flex items-center justify-center mb-4">
          <svg className="w-40 h-40 -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="#E5E7EB" strokeWidth="12" fill="none" />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#800080"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - atsData?.ats_score / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <span className="absolute text-2xl font-bold text-gray-800">
            {atsData?.ats_score ?? 0}/100
          </span>
        </div>
        <p className="text-[#800080] font-medium text-lg">ATS Score</p>
      </ModalBody>
    </Modal>
  );
};

export default JdAtsScoreAnalyzeModal;
