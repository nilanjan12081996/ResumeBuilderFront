// "use client";

// import { useEffect, useRef, useState } from "react";
// import { IoClose, IoSend } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// import { improveExperience } from "../reducers/DashboardSlice";
// import hiring_icon from "../assets/imagesource/hiring_icon.png";
// import Image from "next/image";

// const ResuMateQuestionModal = ({
//   showResuMate,
//   setShowResuMate,
//   buttonRef,
//   jd_based_resume_id,
//   jd_questions = [],
//   experiences,
//   user_id
// }) => {
//   const dispatch = useDispatch();
//   const modalRef = useRef(null);
//   const [inputValue, setInputValue] = useState("");
//   const [chat, setChat] = useState([]);
//   const [answers, setAnswers] = useState({});

//   // Initialize chat with questions
//   useEffect(() => {
//     if (jd_questions.length > 0) {
//       const initialChat = jd_questions.map((q) => ({
//         type: "question",
//         message: q.question,
//       }));
//       setChat(initialChat);
//     }
//   }, [jd_questions]);

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


//   const savedExperience = JSON.parse(localStorage.getItem('jd_resume_raw_experience'));
//   console.log(savedExperience);

//   const handleSubmit = async () => {
//     if (!inputValue.trim() || !jd_based_resume_id) return;

//     // Find last asked question
//     const lastQuestion = chat.slice().reverse().find(msg => msg.type === "question");
//     if (!lastQuestion) return;

//     // Find which company that question belongs to
//     const questionData = jd_questions.find(q => q.question === lastQuestion.message);

//     // Default to "general" if no company
//     const companyName = questionData?.company_name || "general";
//     const questionText = lastQuestion.message;
//     const answerText = inputValue.trim();

//     // Update chat UI
//     setChat([...chat, { type: "answer", message: answerText }]);

//     // Correctly update answers object
//     const updatedAnswers = {
//       ...answers,
//       [companyName]: {
//         ...(answers[companyName] || {}),
//         [questionText]: answerText
//       }
//     };
//     setAnswers(updatedAnswers);

//     // Build payload
//     const payload = {
//       user_id: `${user_id}`,
//       jd_based_resume_id,
//       experience_data: savedExperience,
//       question_answers: updatedAnswers
//     };

//     try {
//       await dispatch(improveExperience(payload)).unwrap();
//       setInputValue("");
//     } catch (err) {
//       console.error("Error submitting answer:", err);
//     }
//   };

//   if (!showResuMate) return null;

//   return (
//     <div
//       ref={modalRef}
//       className="absolute bottom-[60px] left-0 w-[380px] bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col animate-slide-up"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3">
//         <h3 className="text-base font-semibold text-gray-800">ResuMate 🤖</h3>
//         <button
//           onClick={() => setShowResuMate(false)}
//           className="hover:bg-gray-100 p-1 rounded"
//         >
//           <IoClose size={18} />
//         </button>
//       </div>

//       {/* Intro */}
//       <div className="px-4 py-3 text-sm text-gray-700">
//         <div className="flex gap-2">
//           <div>
//             <Image src={hiring_icon} alt="hiring_icon" width={60} className="bg-[#800080] rounded-sm" />
//           </div>
//           <p>
//             Hi! I’m ResuMate 🤖. Please answer a few questions to help me create a more impactful resume for you.
//           </p>
//         </div>
//       </div>

//       {/* Chat messages */}
//       <div className="px-4 py-3 flex-1 overflow-y-auto space-y-2 max-h-[250px]">
//         {chat.map((item, idx) => (
//           <div
//             key={idx}
//             className={`flex ${item.type === "question" ? "justify-start" : "justify-end"
//               }`}
//           >
//             {item.type === "question" && (
//               <div>
//                 <Image
//                   src={hiring_icon}
//                   alt="hiring_icon"
//                   width={28}
//                   className="mr-2 bg-[#92278F] rounded-sm"
//                 />
//               </div>
//             )}
//             <p
//               className={`p-2 rounded-xl max-w-[80%] text-sm break-words ${item.type === "question"
//                 ? "bg-purple-50 border border-purple-100 text-gray-800"
//                 : "bg-purple-600 text-white"
//                 }`}
//             >
//               {item.message}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Footer input with icon inside */}
//       <div className="px-4 py-3 relative">
//         <input
//           type="text"
//           placeholder="Please answer the questions..."
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleSubmit();
//           }}
//           className="w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//         <button
//           onClick={handleSubmit}
//           className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
//         >
//           <IoSend size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ResuMateQuestionModal;

// "use client";
// import { useEffect, useRef, useState } from "react";
// import { IoClose, IoSend } from "react-icons/io5";
// import { useDispatch } from "react-redux";
// import { improveExperience } from "../reducers/DashboardSlice";
// import hiring_icon from "../assets/imagesource/hiring_icon.png";
// import Image from "next/image";

// const ResuMateQuestionModal = ({
//   showResuMate,
//   setShowResuMate,
//   buttonRef,
//   jd_based_resume_id,
//   jd_questions = [],
//   user_id
// }) => {
//   const dispatch = useDispatch();
//   const modalRef = useRef(null);

//   const [inputValue, setInputValue] = useState("");
//   const [chat, setChat] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [completed, setCompleted] = useState(false);

//   const savedExperience = JSON.parse(localStorage.getItem("jd_resume_raw_experience"));

//   // Initialize first question
//   useEffect(() => {
//     if (jd_questions.length > 0) {
//       setChat([{ type: "question", message: jd_questions[0].question }]);
//       setCurrentQuestionIndex(0);
//     }
//   }, [jd_questions]);

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

//   const handleSubmit = async () => {
//     if (!inputValue.trim()) return;

//     const currentQuestion = jd_questions[currentQuestionIndex];
//     const questionText = currentQuestion.question;
//     const companyName = currentQuestion.company_name || "general";
//     const answerText = inputValue.trim();

//     // Update chat UI with user answer
//     setChat((prev) => [
//       ...prev,
//       { type: "answer", message: answerText },
//     ]);

//     // Store the answer
//     const updatedAnswers = {
//       ...answers,
//       [companyName]: {
//         ...(answers[companyName] || {}),
//         [questionText]: answerText,
//       },
//     };
//     setAnswers(updatedAnswers);
//     setInputValue("");

//     // Move to next question or finish
//     const nextIndex = currentQuestionIndex + 1;
//     if (nextIndex < jd_questions.length) {
//       // Show next question after small delay
//       setTimeout(() => {
//         setChat((prev) => [
//           ...prev,
//           { type: "question", message: jd_questions[nextIndex].question },
//         ]);
//         setCurrentQuestionIndex(nextIndex);
//       }, 500);
//     } else {
//       // ✅ All questions answered → call API
//       setCompleted(true);
//       const payload = {
//         user_id: `${user_id}`,
//         jd_based_resume_id,
//         experience_data: savedExperience,
//         question_answers: updatedAnswers,
//       };
//       try {
//         await dispatch(improveExperience(payload)).unwrap();
//         console.log("All answers submitted successfully!");
//       } catch (err) {
//         console.error("Error submitting answers:", err);
//       }
//     }
//   };

//   if (!showResuMate) return null;

//   return (
//     <div
//       ref={modalRef}
//       className="absolute bottom-[60px] left-0 w-[380px] bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden z-50 flex flex-col animate-slide-up"
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-3">
//         <h3 className="text-base font-semibold text-gray-800">ResuMate 🤖</h3>
//         <button
//           onClick={() => setShowResuMate(false)}
//           className="hover:bg-gray-100 p-1 rounded"
//         >
//           <IoClose size={18} />
//         </button>
//       </div>

//       {/* Intro */}
//       <div className="px-4 py-3 text-sm text-gray-700">
//         <div className="flex gap-2">
//           <Image
//             src={hiring_icon}
//             alt="hiring_icon"
//             width={50}
//             className="bg-[#800080] rounded-sm"
//           />
//           <p>
//             Hi! I’m ResuMate 🤖. Please answer a few questions to help me
//             create a more impactful resume for you.
//           </p>
//         </div>
//       </div>

//       {/* Chat */}
//       <div className="px-4 py-3 flex-1 overflow-y-auto space-y-2 max-h-[250px]">
//         {chat.map((item, idx) => (
//           <div
//             key={idx}
//             className={`flex ${item.type === "question" ? "justify-start" : "justify-end"
//               }`}
//           >
//             {item.type === "question" && (
//               <div>
//                 <Image
//                   src={hiring_icon}
//                   alt="hiring_icon"
//                   width={28}
//                   className="mr-2 bg-[#92278F] rounded-sm"
//                 />
//               </div>
//             )}
//             <p
//               className={`p-2 rounded-xl max-w-[80%] text-sm break-words ${item.type === "question"
//                   ? "bg-purple-50 border border-purple-100 text-gray-800"
//                   : "bg-purple-600 text-white"
//                 }`}
//             >
//               {item.message}
//             </p>
//           </div>
//         ))}

//         {completed && (
//           <p className="text-center text-green-600 text-sm mt-3">
//             ✅ Thank you for submitting your answers!
//           </p>
//         )}
//       </div>

//       {/* Input always visible */}
//       <div className="px-4 py-3 relative border-t border-gray-100">
//         <input
//           type="text"
//           placeholder={
//             completed
//               ? "All questions answered Done"
//               : "Please answer the question..."
//           }
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//           disabled={completed && true}
//           className={`w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 ${completed
//               ? "bg-gray-100 cursor-not-allowed"
//               : "focus:ring-purple-500"
//             }`}
//         />
//         <button
//           onClick={handleSubmit}
//           disabled={completed}
//           className={`absolute right-6 top-1/2 -translate-y-1/2 ${completed
//               ? "text-gray-400 cursor-not-allowed"
//               : "text-purple-600 hover:text-purple-700"
//             }`}
//         >
//           <IoSend size={20} />
//         </button>
//       </div>
//     </div>
//   );

// };

// export default ResuMateQuestionModal;


"use client";
import { useEffect, useRef, useState } from "react";
import { IoCheckmark, IoClose, IoSend } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { improveExperience, jdBasedResumeDetails } from "../reducers/DashboardSlice";
import hiring_icon from "../assets/imagesource/hiring_icon.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ResuMateQuestionModal = ({
  showResuMate,
  setShowResuMate,
  buttonRef,
  jd_based_resume_id,
  jd_questions = [],
  user_id,
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const chatContainerRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const savedExperience = JSON.parse(localStorage.getItem("jd_resume_raw_experience"));
  const submittedKey = `resumate_submitted_${user_id}_${jd_based_resume_id}`;

  // Prevent background scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showResuMate ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showResuMate]);

  // Load previous answers & submission status
  useEffect(() => {
    const submitted = localStorage.getItem(submittedKey);
    if (submitted) {
      setAlreadySubmitted(true);
      setChat([{ type: "thankyou", message: "Your answers were already submitted!" }]);
    } else if (jd_questions.length > 0) {
      // Initialize first question if not already submitted
      setChat([{ type: "question", message: jd_questions[0].question, company: jd_questions[0].company_name }]);
      setCurrentQuestionIndex(0);
    }
  }, [jd_questions, submittedKey]);

  // Auto-scroll chat container
  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
        setShowResuMate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowResuMate, buttonRef]);

  const handleSubmit = async () => {
    if (!inputValue.trim() || completed) return;

    const currentQuestion = jd_questions[currentQuestionIndex];
    const questionText = currentQuestion.question;
    const companyName = currentQuestion.company_name || "general";
    const answerText = inputValue.trim();

    // Add user answer to chat
    setChat((prev) => [...prev, { type: "answer", message: answerText }]);

    const updatedAnswers = {
      ...answers,
      [companyName]: {
        ...(answers[companyName] || {}),
        [questionText]: answerText,
      },
    };
    setAnswers(updatedAnswers);
    setInputValue("");

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < jd_questions.length) {
      // Show next question
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          { type: "question", message: jd_questions[nextIndex].question, company: jd_questions[nextIndex].company_name },
        ]);
        setCurrentQuestionIndex(nextIndex);
      }, 500);
    } else {
      // All questions answered
      setCompleted(true);

      // Show first-time thank you inside chat
      setChat((prev) => [
        ...prev,
        { type: "thankyou", message: "Thank you for submitting your answers!" },
      ]);

      const payload = {
        user_id: `${user_id}`,
        jd_based_resume_id,
        experience_data: savedExperience,
        question_answers: updatedAnswers,
      };

      dispatch(improveExperience(payload))
        .unwrap()
        .then((res) => {
          localStorage.setItem(submittedKey, "true");
          jdBasedResumeDetails(jd_based_resume_id);
        })
        .catch((err) => {
          console.error("Error submitting answers:", err);
        });


      // Auto-close modal after showing thank you
      setTimeout(() => {
        setShowResuMate(false);
        setAlreadySubmitted(true);
        // Replace "Thank you" message with "already submitted" for next time
        setChat([{ type: "thankyou", message: "Your answers were already submitted!" }]);
      }, 3000);
    }
  };

  if (!showResuMate) return null;

  return (
    <div
      ref={modalRef}
      className="absolute bottom-[60px] left-0 z-50 w-[380px] bg-white border border-gray-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-800">ResuMate 🤖</h3>
        <button
          onClick={() => setShowResuMate(false)}
          className="hover:bg-gray-100 p-1 rounded cursor-pointer"
        >
          <IoClose size={18} />
        </button>
      </div>

      {/* Intro message */}
      {!alreadySubmitted && (
        <div className="px-4 pt-3 border-b border-gray-100 flex gap-2 items-center">
          <Image
            src={hiring_icon}
            alt="hiring_icon"
            width={30}
            className="bg-[#800080] rounded-sm"
          />
          <p className="text-sm text-gray-700 text-left">
            Hi! I’m ResuMate 🤖. Please answer a few questions to help me create a more impactful resume for you.
          </p>
        </div>
      )}

      {/* Chat */}
      <div
        ref={chatContainerRef}
        className="px-4 py-3 flex-1 overflow-y-auto space-y-2 max-h-[250px] scrollbar-thin scrollbar-thumb-gray-300"
      >
        {chat.map((item, idx) => (
          <AnimatePresence key={idx}>
            {item.type === "question" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="flex-shrink-0">
                  <Image src={hiring_icon} alt="bot" width={28} className="mr-2 bg-[#92278F] rounded-sm" />
                </div>
                <div>
                  {item.company && (
                    <p className="text-[11px] text-gray-500 mb-1 font-medium">{item.company}</p>
                  )}
                  <p className="p-2 rounded-xl max-w-[80%] text-sm break-words bg-purple-50 border border-purple-100 text-gray-800">
                    {item.message}
                  </p>
                </div>
              </motion.div>
            )}

            {item.type === "answer" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-end"
              >
                <p className="p-2 rounded-xl max-w-[80%] text-sm break-words bg-purple-600 text-white">
                  {item.message}
                </p>
              </motion.div>
            )}

            {item.type === "thankyou" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <IoCheckmark className="text-white text-3xl font-bold" />
                </div>
                <p className="text-green-600 font-semibold text-center">
                  {item.message.split("\n").map((line, i) => (
                    <span key={i}>{line}<br /></span>
                  ))}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Input */}
      {!alreadySubmitted && !completed && (
        <div className="px-4 py-3 relative border-t border-gray-100">
          <input
            type="text"
            placeholder="Please answer the question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSubmit}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-purple-600 hover:text-purple-700"
          >
            <IoSend size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResuMateQuestionModal;

