import React from 'react';
import { Progress } from "flowbite-react";
import { PiReadCvLogoDuotone } from 'react-icons/pi';
import { MdOutlinePublishedWithChanges } from "react-icons/md";

const ImpResumeScore = ({ score = 45 }) => {
  return (
    <div className='bg-white rounded-sm p-5 mb-[4px]'>
      <div className='mb-4'>
        <div className='flex items-center gap-2 mb-2'>
          <span className='bg-[#f6efff] rounded-[5px] px-2 py-1 text-[14px] text-[#800080] font-bold'>
            {score}%
          </span>
          <span className='text-[#828ba2] text-[14px] leading-[20px] font-normal'>
            Resume ATS Score
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Progress 
            progress={score} 
            size="sm" 
            className="[&>div]:bg-[#800080]" 
          />
        </div>
      </div>

      <div className="flex items-center">
        <button
          className="
            flex items-center gap-1
            text-sm font-thin
            text-[#800080] hover:text-[#e799e7]
            transition-all duration-200
            cursor-pointer
          "
        >
          <PiReadCvLogoDuotone className='text-lg' />
          Existing Resume
        </button>

        <div className="flex-1 flex justify-center">
          <button
            className="
              flex items-center gap-1
              text-sm font-thin
              text-[#800080] hover:text-[#e799e7]
              transition-all duration-200 cursor-pointer
            "
          >
            <MdOutlinePublishedWithChanges className="text-lg" />
            Changed Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImpResumeScore;