'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Inter } from 'next/font/google';

import resume01 from "../assets/imagesource/resume01.png";

const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})

const page = () => {
  return (
    <div className={`${inter.className} antialiased`}>
      <div className='mb-10'>
        <h2 className='text-[30px] leading-[30px] text-[#151515] font-semibold mb-4'>Resume Templates</h2>
        <p className='text-[16px] leading-[23px] text-[#575757] font-normal mb-0'>Select a professionally designed template to showcase your career</p>
      </div>
      <div className='grid grid-cols-3 gap-8'>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Modern Template</p>
        </div>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Professional Template</p>
        </div>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Technical Template</p>
        </div>
                <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Modern Template</p>
        </div>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Professional Template</p>
        </div>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Technical Template</p>
        </div>
      </div>
    </div>
  )
}

export default page