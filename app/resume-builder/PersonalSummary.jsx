import React, { useState } from "react";
import { HiSparkles } from "react-icons/hi2";
import TipTapEditor from "../editor/TipTapEditor";
import { Controller } from "react-hook-form";

const PersonalSummaryEdit = ({ watch, control, noHeader }) => {
  

  return (
    <>
      {!noHeader && (
        <div className="mb-2">
          <h2 className="text-xl font-bold text-black pb-1">
            Professional Summary
          </h2>
        </div>
      )}

      
      <p className="text-sm text-[#808897] font-medium mb-3">
        Add impact-focused details such as metrics, problems solved, features worked on, and key products or capabilities built and scaled.
      </p>

      <Controller
        name="summary"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TipTapEditor
            value={field.value || ""}
            onChange={field.onChange}
          />
        )}
      />
      {/* Improve with AI — disabled with tooltip */}
<div className="flex justify-end mt-2">
  <div className="relative group">
    <button
      type="button"
      disabled
      className="flex items-center gap-2 px-4 py-1.5 rounded-[25px] text-sm !bg-gray-100 !text-gray-400 cursor-not-allowed opacity-70"
    >
      <HiSparkles className="text-md" />
      Improve with AI
    </button>

    {/* Tooltip */}
    <div className="absolute bottom-full right-0 mb-2 w-56 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 text-center shadow-lg">
      Improve with AI is not available on the free plan.{" "}
      <span className="text-purple-300 font-semibold">Upgrade your plan</span>{" "}
      to use this feature.
      <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
    </div>
  </div>
</div>
    </>
  );
};

export default PersonalSummaryEdit;
