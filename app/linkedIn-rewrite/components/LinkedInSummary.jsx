import React, { useState } from 'react';
import { HiSparkles } from "react-icons/hi2";
import TipTapEditor from '../../editor/TipTapEditor';
import GenerateWithAiModal from '../../modal/GenerateWithAiModal';
import { useSelector } from 'react-redux';

const LinkedInSummary = ({ watch, setValue, sections, setSections, sectionIndex }) => {
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
        Write a compelling summary that highlights your professional experience, key achievements, and career goals.
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
            aiType="linkedin_summary"
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

export default LinkedInSummary;