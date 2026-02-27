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
    </>
  );
};

export default PersonalSummaryEdit;
