"use client";

import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

const ResuMateQuestionModal = ({ showResuMate, setShowResuMate, buttonRef }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setShowResuMate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowResuMate, buttonRef]);

  if (!showResuMate) return null;

  return (
    <div
      ref={modalRef}
      className="absolute bottom-[60px] left-0 w-80 bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden animate-slide-up z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h3 className="text-base font-semibold text-gray-800">ResuMate 🤖</h3>
        <button
          onClick={() => setShowResuMate(false)}
          className="hover:bg-gray-100 p-1 rounded"
        >
          <IoClose size={18} />
        </button>
      </div>

      {/* Chat Section */}
      <div className="px-4 py-3 space-y-3 text-sm text-gray-700">
        <p>
          Hi! I’m ResuMate 🤖. Please answer a few questions to help me create a
          more impactful resume for you.
        </p>

        <div className="space-y-2">
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-2">
            What was hardest for others to match in your role?
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-2">
            What improvement did you bring to your team’s work?
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-2">
            Which project taught you the most, and how?
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t px-3 py-2 flex items-center gap-2">
        <input
          type="text"
          placeholder="Please answer the questions..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700">
          ➤
        </button>
      </div>
    </div>
  );
};

export default ResuMateQuestionModal;
