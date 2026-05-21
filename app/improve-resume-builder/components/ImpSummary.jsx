// ImpSummary.jsx

import React, { useState } from 'react';
import { HiSparkles } from "react-icons/hi2";
import TipTapEditor from '../../editor/TipTapEditor';
import GenerateWithAiModal from '../../modal/GenerateWithAiModal';
import { useSelector } from 'react-redux';

const ImpSummary = ({ watch, setValue, sections, setSections, sectionIndex, onAtsRefresh, aiSummaryCount, onUseAiCount }) => {
  const [open, setOpen] = useState(false);

  const summaryValue = watch("summary");

  const { extracteResumeData } = useSelector((state) => state?.dash);
  const { singleResumeInfo } = useSelector((state) => state?.resume);

  const resumeSource =
    singleResumeInfo?.data?.data ||
    extracteResumeData?.resume_data ||
    null;

  const handleSummaryChange = (html) => {
    setValue("summary", html);
    if (setSections && typeof sectionIndex === 'number') {
      setSections(prev =>
        prev.map((section, i) =>
          i === sectionIndex && section.type === "summary"
            ? { ...section, summary: html }
            : section
        )
      );
    }
  };

  const isExhausted = aiSummaryCount === 0;
  const totalCount = 5;

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Add impact-focused details such as metrics, problems solved, features worked on, and key products or capabilities built and scaled.
      </p>

      <TipTapEditor
        value={summaryValue}
        onChange={handleSummaryChange}
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="flex items-center gap-1 text-[10px] font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full cursor-pointer hover:bg-blue-100 transition-colors">
              Add metrics and impact for a better ATS score
            </span>
            <div className="flex items-center gap-3">
              {/* Count Badge — left of button */}
              {typeof aiSummaryCount === 'number' && (
                <div className="relative group flex items-center gap-1.5">
                  {isExhausted ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                      AI limit reached
                    </span>
                  ) : (
                    <span className={`flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full border
                      ${aiSummaryCount <= 2
                        ? 'text-orange-600 bg-orange-50 border-orange-200'
                        : 'text-purple-600 bg-[#f6efff] border-purple-200'
                      }`}>
                      <HiSparkles className="text-[10px]" />
                      {aiSummaryCount}/{totalCount} left
                    </span>
                  )}
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-gray-800 text-white text-[10px] rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 text-center shadow-lg">
                    You can use this feature up to 5 times to improve your resume with AI.
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
                  </div>
                </div>
              )}

              {/* Button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isExhausted) setOpen(true);
                  }}
                  disabled={isExhausted}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all duration-200 font-semibold
                    ${isExhausted
                      ? '!bg-gray-100 !text-gray-400 cursor-not-allowed opacity-70'
                      : '!bg-[#800080] !text-white hover:!bg-black shadow-sm hover:shadow-md'
                    }`}
                >
                  <HiSparkles className="text-[14px]" />
                  Improve with AI
                </button>

                {/* Tooltip on exhausted */}
                {isExhausted && (
                  <div className="absolute bottom-full right-0 mb-2 w-52 bg-gray-800 text-white text-[10px] rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 text-center shadow-lg">
                    You've used all 5 AI generations for this resume.{" "}
                    <span className="text-purple-300 font-semibold">Buy a new plan</span>{" "}
                    to use it again.
                    <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
                  </div>
                )}
              </div>
            </div>
          </div>
        }
      />

      {open && !isExhausted && (
        <GenerateWithAiModal
          open={open}
          onClose={() => setOpen(false)}
          aiType="imp_summary"
          initialText={summaryValue || ""}
          fullResumeData={resumeSource}
          onUseAiCount={onUseAiCount}
          onApply={(text) => {
            handleSummaryChange(text);
            onAtsRefresh && onAtsRefresh();
          }}
        />
      )}
    </>
  );
};

export default ImpSummary;


// // ImpSummary.jsx

// import React, { useState } from 'react';
// import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
// import { HiSparkles } from "react-icons/hi2";
// import TipTapEditor from '../../editor/TipTapEditor';
// import GenerateWithAiModal from '../../modal/GenerateWithAiModal';
// import { useSelector } from 'react-redux';

// const ImpSummary = ({ watch, setValue, sections, setSections, sectionIndex, onAtsRefresh }) => {
//   const [open, setOpen] = useState(false);

//   const summaryValue = watch("summary");

//   const { extracteResumeData } = useSelector((state) => state?.dash);
//   const { singleResumeInfo } = useSelector((state) => state?.resume);

//   const resumeSource =
//     singleResumeInfo?.data?.data ||
//     extracteResumeData?.resume_data ||
//     null;

//   const handleSummaryChange = (html) => {

//     setValue("summary", html);


//     if (setSections && typeof sectionIndex === 'number') {
//       setSections(prev =>
//         prev.map((section, i) =>
//           i === sectionIndex && section.type === "summary"
//             ? { ...section, summary: html }
//             : section
//         )
//       );
//     }
//   };

//   return (
//     <>
//       <p className="!text-sm !font-medium !text-gray-500 mb-4">
//         Write 2-4 short, energetic sentences about how great you are. Mention your
//         achievements and skills.
//       </p>

//       <TipTapEditor value={summaryValue} onChange={handleSummaryChange} />

//       <div className="relative flex justify-end mt-1">
//         <button
//           type="button"
//           onClick={() => setOpen(true)}
//           className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080]"
//         >
//           <HiSparkles className="text-md" />
//           Get help with writing
//         </button>

//         {open && (
//           <GenerateWithAiModal
//             open={open}
//             onClose={() => setOpen(false)}
//             aiType="imp_summary"
//             initialText={summaryValue || ""}
//             fullResumeData={resumeSource}
//             onApply={(text) => {
//               handleSummaryChange(text);
//               onAtsRefresh && onAtsRefresh();
//             }}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// export default ImpSummary;
