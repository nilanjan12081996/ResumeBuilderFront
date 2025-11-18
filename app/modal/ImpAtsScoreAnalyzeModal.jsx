'use client';
import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import { IoClose } from "react-icons/io5";

const ImpAtsScoreAnalyzeModal = ({ show, setShow, atsData }) => {
  const oldScore = atsData?.old_ats ?? 0;
  const newScore = atsData?.new_ats ?? 0;

  const [animatedOld, setAnimatedOld] = useState(0);
  const [animatedNew, setAnimatedNew] = useState(0);

  useEffect(() => {
    if (show && atsData) {
      const animate = (end, setter) => {
        let start = 0;
        const duration = 1000;
        const stepTime = 10;
        const increment = end / (duration / stepTime);

        const interval = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(interval);
          }
          setter(Math.floor(start));
        }, stepTime);

        return interval;
      };

      const interval1 = animate(oldScore, setAnimatedOld);
      const interval2 = animate(newScore, setAnimatedNew);

      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    } else {
      setAnimatedOld(0);
      setAnimatedNew(0);
    }
  }, [show, atsData]); 
  const circleRadius = 60;
  const circumference = 2 * Math.PI * circleRadius;
  const offset = (score) => circumference * (1 - score / 100);

  return (
    <Modal size="lg" show={show} onClose={() => setShow(false)}>
      <ModalHeader className="flex justify-between items-center bg-white border-b border-gray-200 px-5 py-3">
        <span className="text-[18px] font-semibold text-[#800080]">Improve ATS Score Analyze</span>
      </ModalHeader>

      <ModalBody className="bg-white flex flex-col items-center justify-center py-8 rounded-b-[6px]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          {/* Old ATS */}
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center mb-3">
              <svg className="w-36 h-36 -rotate-90">
                <circle cx="72" cy="72" r={circleRadius} stroke="#E5E7EB" strokeWidth="10" fill="none" />
                <circle
                  cx="72"
                  cy="72"
                  r={circleRadius}
                  stroke="#ff5252"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset(animatedOld)}
                  strokeLinecap="round"
                  className="transition-all duration-100 ease-linear"
                />
              </svg>
              <span className="absolute text-2xl font-bold text-gray-800">
                {animatedOld}/100
              </span>
            </div>
            <p className="text-[#ff5252] font-semibold text-lg">Old ATS</p>
          </div>

          {/* New ATS */}
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36 flex items-center justify-center mb-3">
              <svg className="w-36 h-36 -rotate-90">
                <circle cx="72" cy="72" r={circleRadius} stroke="#E5E7EB" strokeWidth="10" fill="none" />
                <circle
                  cx="72"
                  cy="72"
                  r={circleRadius}
                  stroke="#800080"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset(animatedNew)}
                  strokeLinecap="round"
                  className="transition-all duration-100 ease-linear"
                />
              </svg>
              <span className="absolute text-2xl font-bold text-gray-800">
                {animatedNew}/100
              </span>
            </div>
            <p className="text-[#800080] font-semibold text-lg">New ATS</p>
          </div>
        </div>

        {/* Improvement Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium">
            Improvement:{" "}
            <span className="text-[#800080] font-semibold">
              {Math.max(newScore - oldScore, 0)}%
            </span>
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ImpAtsScoreAnalyzeModal;
