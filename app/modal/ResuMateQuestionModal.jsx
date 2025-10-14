"use client";

import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { improveExperience } from "../reducers/DashboardSlice";

const ResuMateQuestionModal = ({
  showResuMate,
  setShowResuMate,
  buttonRef,
  jd_based_resume_id,
  jd_questions = [],
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState([]);

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
  const handleSubmit = async () => {
    if (!inputValue.trim() || !jd_based_resume_id) return;

    // Add answer to chat
    const updatedChat = [
      ...chat,
      { type: "answer", message: inputValue.trim() },
    ];
    setChat(updatedChat);

    // Prepare payload for API
    const payload = {
      user_id: "1",
      jd_based_resume_id,
      experience_data: [], // Optional, can fill if needed
      question_answers: {
        general: { "Chatbox Input": inputValue.trim() },
      },
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

      {/* Chat messages */}
      <div className="px-4 py-3 flex-1 overflow-y-auto space-y-2 max-h-[250px]">
        {chat.map((item, idx) => (
          <div
            key={idx}
            className={`flex ${
              item.type === "question" ? "justify-start" : "justify-end"
            }`}
          >
            <p
              className={`p-2 rounded-xl max-w-[80%] text-sm break-words ${
                item.type === "question"
                  ? "bg-purple-50 border border-purple-100"
                  : "bg-purple-600 text-white"
              }`}
            >
              {item.message}
            </p>
          </div>
        ))}
      </div>

      {/* Footer input */}
      <div className="px-4 py-3 flex items-center gap-2 -t">
        <input
          type="text"
          placeholder="Write your answer here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ResuMateQuestionModal;



// "use client";

// import { useEffect, useRef, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// import { getGeneratedQuestions } from "../reducers/DashboardSlice";

// const ResuMateQuestionModal = ({
//   showResuMate,
//   setShowResuMate,
//   buttonRef,
//   jd_based_resume_id,
//   experiences = [],
// }) => {
//   const dispatch = useDispatch();
//   const modalRef = useRef(null);
//   const [inputValue, setInputValue] = useState("");

//   // Close modal on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(e.target) &&
//         !buttonRef.current.contains(e.target)
//       ) {
//         setShowResuMate(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [setShowResuMate, buttonRef]);

//   // ✅ Submit question -> API call
//   const handleSubmit = async () => {
//     if (!inputValue.trim() || !jd_based_resume_id) return;

//     // 🔹 Extract all company names from experiences array
//     const companyNames = experiences.map((exp) => exp.company_name).filter(Boolean);

//     // 🔹 If no company found, fallback to "General"
//     const generated_questions = {};

//     if (companyNames.length > 0) {
//       companyNames.forEach((company) => {
//         generated_questions[company] = [inputValue.trim()];
//       });
//     } else {
//       generated_questions["General"] = [inputValue.trim()];
//     }

//     const payload = {
//       jd_based_resume_id,
//       generated_questions,
//     };

//     console.log("📤 Submitting payload:", payload);

//     try {
//       await dispatch(getGeneratedQuestions(payload)).unwrap();
//       setInputValue("");
//     } catch (err) {
//       console.error("❌ Error submitting question:", err);
//       alert("Failed to submit question. Check console.");
//     }
//   };

//   if (!showResuMate) return null;

//   return (
//     <div
//       ref={modalRef}
//       className="absolute bottom-[60px] left-0 w-[380px] bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col animate-slide-up"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3 border-b">
//         <h3 className="text-base font-semibold text-gray-800">ResuMate 🤖</h3>
//         <button
//           onClick={() => setShowResuMate(false)}
//           className="hover:bg-gray-100 p-1 rounded"
//         >
//           <IoClose size={18} />
//         </button>
//       </div>

//       {/* Intro */}
//       <div className="px-4 py-3 border-b text-sm text-gray-700">
//         <p>
//           Hi! I’m ResuMate 🤖. Please answer a few questions to help me create a more impactful resume for you.
//         </p>
//       </div>

//       {/* Input + Submit */}
//       <div className="p-4 flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Type your question..."
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//         <button
//           onClick={handleSubmit}
//           className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResuMateQuestionModal;
