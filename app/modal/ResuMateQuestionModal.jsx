// 'use client';
// import { Modal, Textarea, Button, Spinner } from 'flowbite-react';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getGeneratedQuestions } from '../reducers/DashboardSlice';

// const ResuMateQuestionModal = ({ showResuMate,setShowResuMate,selectedExpId, }) => {
//   const dispatch = useDispatch();
//   const { improveExperienceData, loading } = useSelector((state) => state.dash);
  

//   const [answers, setAnswers] = useState({});

//   const handleChange = (company, question, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [company]: { ...prev[company], [question]: value },
//     }));
//   };

// //   const handleSubmit = () => {
// //     dispatch(getGeneratedQuestions({ jd_based_resume_id, generated_questions: answers }));
   
// //   };

// //   if (!improveExperienceData?.question_answers) return null;

//   return (
//     <Modal show={showResuMate} size="5xl" popup onClose={() => setShowResuMate(false)}>
//       <Modal.Header />
//       <Modal.Body>
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold">ResuMate Questions</h3>
//           {loading && <Spinner />}
//           {!loading &&
//             Object.keys(improveExperienceData.question_answers).map((company) => (
//               <div key={company} className="border p-4 rounded-lg bg-gray-50">
//                 <h4 className="text-lg font-semibold">{company}</h4>
//                 {Object.entries(improveExperienceData.question_answers[company]).map(
//                   ([question, answer], idx) => (
//                     <div key={idx} className="mb-3">
//                       <p className="font-medium">{question}</p>
//                       <Textarea
//                         rows={3}
//                         value={answers[company]?.[question] || ""}
//                         onChange={(e) => handleChange(company, question, e.target.value)}
//                         placeholder="Type your answer..."
//                       />
//                     </div>
//                   )
//                 )}
//               </div>
//             ))}
//           <div className="flex justify-end mt-4">
//             <Button color="purple" onClick={handleSubmit}>
//               Submit Answers
//             </Button>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ResuMateQuestionModal;


"use client";

import { Modal, Textarea, Button } from "flowbite-react";
import { useState } from "react";

const ResuMateQuestionModal = ({ showResuMate, setShowResuMate }) => {
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setShowResuMate(false);
    setMessage("");
  };

  return (
    <Modal show={showResuMate} onClose={handleClose} size="lg" popup>
      <Modal.Header>
        <h3 className="text-lg font-semibold text-gray-900">
          💬 ResuMate Chat Box
        </h3>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 h-64 overflow-y-auto bg-gray-50">
            <p className="text-gray-600 text-sm">
              Chat will appear here...
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Textarea
              placeholder="Type your message..."
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button color="blue" onClick={() => alert("Static mode only!")}>
              Send
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResuMateQuestionModal;
