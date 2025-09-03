'use client';

import React from 'react'

import { HiClipboardList } from "react-icons/hi";

const page = () => {
  return (
    <div className='flex gap-5'>
        <div className='w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px]'>
           <div className='border-b border-[#E5E5E5] p-5'>
              <div className='flex items-center gap-1'>
                <HiClipboardList className='text-[#800080] text-2xl' />
                <h3 className='text-[16px] text-[#151515] font-medium'>Resume Sections</h3>
              </div>
           </div>
           <div className='border-b border-[#E5E5E5] p-5'>Tab Area</div>
           <div className='p-5'>
             <div className='mb-4'>
                <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Basic Info</h4>
                <p className='text-[14px] text-[#939393] font-normal'>Add your personal details that will appear at the top of your resume. * Required fields</p>
             </div>
           </div>
        </div>
        <div className='w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] p-5'>sdsdsds</div>
    </div>
  )
}

export default page