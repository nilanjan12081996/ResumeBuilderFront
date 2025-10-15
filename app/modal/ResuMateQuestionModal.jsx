"use client";

import { useEffect, useRef, useState } from "react";
import { IoClose, IoSend } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { improveExperience } from "../reducers/DashboardSlice";
import hiring_icon from "../assets/imagesource/hiring_icon.png";
import Image from "next/image";

const ResuMateQuestionModal = ({
  showResuMate,
  setShowResuMate,
  buttonRef,
  jd_based_resume_id,
  jd_questions = [],
  experiences,
  user_id
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState([]);
  const [answers, setAnswers] = useState({});

  // Initialize chat with questions
  useEffect(() => {
    if (jd_questions.length > 0) {
      const initialChat = jd_questions.map((q) => ({
        type: "question",
        message: q.question,
      }));
      setChat(initialChat);
    }
  }, [jd_questions]);

  // Close modal on outside click
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

  // Handle submit answer
  // const handleSubmit = async () => {
  //   if (!inputValue.trim() || !jd_based_resume_id) return;

  //   // Add answer to chat
  //   const updatedChat = [
  //     ...chat,
  //     { type: "answer", message: inputValue.trim() },
  //   ];
  //   setChat(updatedChat);

  //   // Prepare payload for API
  //   const payload = {
  //     user_id: "1",
  //     jd_based_resume_id,
  //     experience_data: [],
  //     question_answers: {
  //       general: { "Chatbox Input": inputValue.trim() },
  //     },
  //   };

  //   try {
  //     await dispatch(improveExperience(payload)).unwrap();
  //     setInputValue("");
  //   } catch (err) {
  //     console.error("Error submitting answer:", err);
  //   }
  // };

  const savedExperience = JSON.parse(localStorage.getItem('jd_resume_raw_experience'));
  console.log(savedExperience);

  const handleSubmit = async () => {
    if (!inputValue.trim() || !jd_based_resume_id) return;

    // Find last asked question
    const lastQuestion = chat.slice().reverse().find(msg => msg.type === "question");
    if (!lastQuestion) return;

    // Find which company that question belongs to
    const questionData = jd_questions.find(q => q.question === lastQuestion.message);

    // Default to "general" if no company
    const companyName = questionData?.company_name || "general";
    const questionText = lastQuestion.message;
    const answerText = inputValue.trim();

    // Update chat UI
    setChat([...chat, { type: "answer", message: answerText }]);

    // Correctly update answers object
    const updatedAnswers = {
      ...answers,
      [companyName]: {
        ...(answers[companyName] || {}),
        [questionText]: answerText
      }
    };
    setAnswers(updatedAnswers);

    // Build payload
    const payload = {
      user_id: `${user_id}`,
      jd_based_resume_id,
      experience_data: savedExperience,
      question_answers: updatedAnswers
    };

    try {
      await dispatch(improveExperience(payload)).unwrap();
      setInputValue("");
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  if (!showResuMate) return null;

  return (
    <div
      ref={modalRef}
      className="absolute bottom-[60px] left-0 w-[380px] bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col animate-slide-up"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-base font-semibold text-gray-800">ResuMate 🤖</h3>
        <button
          onClick={() => setShowResuMate(false)}
          className="hover:bg-gray-100 p-1 rounded"
        >
          <IoClose size={18} />
        </button>
      </div>

      {/* Intro */}
      <div className="px-4 py-3 text-sm text-gray-700">
        <div className="flex gap-2">
          <div>
            <Image src={hiring_icon} alt="hiring_icon" width={60} className="bg-[#800080] rounded-sm" />
          </div>
          <p>
            Hi! I’m ResuMate 🤖. Please answer a few questions to help me create a more impactful resume for you.
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="px-4 py-3 flex-1 overflow-y-auto space-y-2 max-h-[250px]">
        {chat.map((item, idx) => (
          <div
            key={idx}
            className={`flex ${item.type === "question" ? "justify-start" : "justify-end"
              }`}
          >
            {item.type === "question" && (
              <div>
                <Image
                  src={hiring_icon}
                  alt="hiring_icon"
                  width={28}
                  className="mr-2 bg-[#92278F] rounded-sm"
                />
              </div>
            )}
            <p
              className={`p-2 rounded-xl max-w-[80%] text-sm break-words ${item.type === "question"
                ? "bg-purple-50 border border-purple-100 text-gray-800"
                : "bg-purple-600 text-white"
                }`}
            >
              {item.message}
            </p>
          </div>
        ))}
      </div>

      {/* Footer input with icon inside */}
      <div className="px-4 py-3 relative">
        <input
          type="text"
          placeholder="Please answer the questions..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          className="w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
        >
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ResuMateQuestionModal;
