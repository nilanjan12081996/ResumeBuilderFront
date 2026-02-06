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
        Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.
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
