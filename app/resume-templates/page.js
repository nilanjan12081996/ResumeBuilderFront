'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Inter } from 'next/font/google';

import resume01 from "../assets/imagesource/resume01.png";
import resume1 from "../assets/imagesource/resume1.png";
import resume2 from "../assets/imagesource/resume2.png";
import Link from 'next/link';
const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})

const page = () => {
  return (
    <div className={`${inter.className} antialiased`}>
      <div className='mb-5 lg:mb-10 pt-6'>
        <h2 className='text-xl lg:text-[30px] leading-[30px] text-[#151515] font-semibold mb-1s lg:mb-4'>Resume Templates</h2>
        <p className='text-sm leading-[18px] lg:text-[16px] lg:leading-[23px] text-[#575757] font-normal mb-0'>Select a professionally designed template to showcase your career</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8'>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-3 lg:mb-6'>
           {/* <Image src={resume01} alt="resume01" className='' /> */}
           <Image src={resume1} alt="resume01" className="h-[400px]" />
          </div>
          <div className='flex justify-center mb-2'>
            <Link href="/resume-builder?template=1" className='bg-[#800080] rounded-[7px] px-4 py-2 text-white'> Use Template</Link>
            </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Modern Template</p>
        </div>
              <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-3 lg:mb-6'>
           {/* <Image src={resume01} alt="resume01" className='' /> */}
          <Image src={resume2} alt="resume01" className="h-[400px]" />
          </div>
          <div className='flex justify-center mb-2'>
            <Link href="/resume-builder?template=2" className='bg-[#800080] rounded-[7px] px-4 py-2 text-white'> Use Template</Link>
          </div>
          
          <p className='text-[#000000] text-xl font-semibold text-center'> Professional Template</p>
        </div>
        {/* <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-3 lg:mb-6mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Professional Template</p>
        </div>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-3 lg:mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Technical Template</p>
        </div>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-3 lg:mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Modern Template</p>
        </div>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-3 lg:mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Professional Template</p>
        </div>
        <div>
          <div className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-3 lg:mb-6'>
           <Image src={resume01} alt="resume01" className='' />
          </div>
          <p className='text-[#000000] text-xl font-semibold text-center'>Technical Template</p>
        </div> */}
      </div>
    </div>
  )
}

export default page