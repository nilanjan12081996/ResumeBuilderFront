// ImpSummary.jsx

import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import { HiSparkles } from "react-icons/hi2";
import TipTapEditor from '../../editor/TipTapEditor';
import GenerateWithAiModal from '../../modal/GenerateWithAiModal';
import { useSelector } from 'react-redux';

const ImpSummary = ({ watch, setValue, sections, setSections, sectionIndex }) => {
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

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Write 2-4 short, energetic sentences about how great you are. Mention your
        achievements and skills.
      </p>

      <TipTapEditor value={summaryValue} onChange={handleSummaryChange} />

      <div className="relative flex justify-end mt-1">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080]"
        >
          <HiSparkles className="text-md" />
          Get help with writing
        </button>

        {open && (
          <GenerateWithAiModal
            open={open}
            onClose={() => setOpen(false)}
            aiType="jd_summary"
            initialText={summaryValue || ""}
            fullResumeData={resumeSource}
            onApply={(text) => {
              handleSummaryChange(text);
            }}
          />
        )}
      </div>
    </>
  );
};

export default ImpSummary;

// import React, { useState } from 'react';
// import { HiSparkles } from "react-icons/hi2";
// import TipTapEditor from '../../editor/TipTapEditor';
// import GenerateWithAiModal from '../../modal/GenerateWithAiModal';

// const ImpSummary = ({ watch, setValue }) => {
//   const [aiModalOpen, setAiModalOpen] = useState(false);
//   return (
//     <div className="space-y-2">
//       <div className="flex justify-between items-center">
//         <p className="!text-sm !font-medium !text-gray-500 mb-4">
//           Write 2-4 short, energetic sentences about how great you are...
//         </p>
//       </div>

//       <TipTapEditor
//         value={watch("summary") || ""}
//         onChange={(text) => setValue("summary", text)}
//       />

//       <div className="relative flex justify-end mt-1">
//         <button
//           type="button"
//           onClick={() => setAiModalOpen(true)}
//           className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080] font-medium hover:!bg-[#800080] hover:!text-white"
//         >
//           <HiSparkles />
//           Get help with writing
//         </button>

//         <GenerateWithAiModal
//           open={aiModalOpen}
//           onClose={() => setAiModalOpen(false)}
//           aiType="imp_summary"
//           initialText={watch("summary") || ""}
//           onApply={(text) => setValue("summary", text)}
//         />
//       </div>
//     </div>
//   );
// };

// export default ImpSummary;
