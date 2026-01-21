import React, { useState } from 'react';
import { HiSparkles } from "react-icons/hi2";
import TipTapEditor from '../../editor/TipTapEditor';
import GenerateWithAiModal from '../../modal/GenerateWithAiModal';

const ImpSummary = ({ watch, setValue }) => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="!text-sm !font-medium !text-gray-500 mb-4">
          Write 2-4 short, energetic sentences about how great you are...
        </p>
      </div>

      <TipTapEditor
        value={watch("summary") || ""}
        onChange={(text) => setValue("summary", text)}
      />

      <div className="relative flex justify-end mt-1">
        <button
          type="button"
          onClick={() => setAiModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080] font-medium hover:!bg-[#800080] hover:!text-white"
        >
          <HiSparkles />
          Get help with writing
        </button>

        <GenerateWithAiModal
          open={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          aiType="imp_summary"
          initialText={watch("summary") || ""}
          onApply={(text) => setValue("summary", text)}
        />
      </div>
    </div>
  );
};

export default ImpSummary;