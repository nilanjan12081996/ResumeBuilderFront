'use client';
import { HiCheck } from "react-icons/hi";

const PresentToggle = ({ value, onToggle }) => {
  const isPresent = value === "Present";

  return (
    <button
      type="button"
      onClick={() => onToggle(isPresent ? null : "Present")}
      className={`mt-2 flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium transition
        ${
          isPresent
            ? "bg-[#800080] text-white"
            : "border border-[#800080] text-[#800080]"
        }`}
    >
      {isPresent && <HiCheck />}
      {isPresent ? "Present" : "Currently working here"}
    </button>
  );
};

export default PresentToggle;
