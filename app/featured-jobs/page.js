'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Inter } from 'next/font/google';

import resume01 from "../assets/imagesource/resume01.png";
import hiring_icon from "../assets/imagesource/hiring_icon.png";
import Link from 'next/link';

const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})

const page = () => {
  return (
     <div className={`${inter.className} antialiased`}>
      <div className='mb-10'>
        <h2 className='text-[30px] leading-[30px] text-[#151515] font-semibold mb-4'>Featured Jobs</h2>
        <p className='text-[16px] leading-[23px] text-[#575757] font-normal mb-0'>Discover roles that match your skills and goals.</p>
      </div>
      <div className='grid grid-cols-3 gap-6'>
        <div className='bg-[#FFFFFF] rounded-[10px] px-8 py-8 shadow-lg'>
          <Image src={hiring_icon} alt="hiring_icon" className='mb-4' />
          <h3 className='text-[#560654] text-[20px] font-semibold pb-2'>Sales Manager</h3>
          <p className='text-[#6C6C6C] text-[15px] leading-[22px] pb-4'>We are looking for a dynamic Sales Manager to lead our sales team and drive revenue growth. The role involves developing sales strategies..</p>
          <Link className='bg-[#800080] hover:bg-[#151515] text-[15px] leading-[45px] text-[#ffffff] font-semibold block text-center rounded-[7px]' href="/featured-jobs-details" passHref>Read More</Link>
        </div>
        <div className='bg-[#FFFFFF] rounded-[10px] px-8 py-8 shadow-lg'>
          <Image src={hiring_icon} alt="hiring_icon" className='mb-4' />
          <h3 className='text-[#560654] text-[20px] font-semibold pb-2'>Sales Manager</h3>
          <p className='text-[#6C6C6C] text-[15px] leading-[22px] pb-4'>We are looking for a dynamic Sales Manager to lead our sales team and drive revenue growth. The role involves developing sales strategies..</p>
          <Link className='bg-[#800080] hover:bg-[#151515] text-[15px] leading-[45px] text-[#ffffff] font-semibold block text-center rounded-[7px]' href="/" passHref>Read More</Link>
        </div>
        <div className='bg-[#FFFFFF] rounded-[10px] px-8 py-8 shadow-lg'>
          <Image src={hiring_icon} alt="hiring_icon" className='mb-4' />
          <h3 className='text-[#560654] text-[20px] font-semibold pb-2'>Sales Manager</h3>
          <p className='text-[#6C6C6C] text-[15px] leading-[22px] pb-4'>We are looking for a dynamic Sales Manager to lead our sales team and drive revenue growth. The role involves developing sales strategies..</p>
          <Link className='bg-[#800080] hover:bg-[#151515] text-[15px] leading-[45px] text-[#ffffff] font-semibold block text-center rounded-[7px]' href="/" passHref>Read More</Link>
        </div>
      </div>
    </div>
  )
}

export default page