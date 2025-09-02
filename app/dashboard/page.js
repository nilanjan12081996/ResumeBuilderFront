'use client';

import React, { useEffect, useState } from 'react';

import { Poppins } from 'next/font/google';
import { League_Spartan } from 'next/font/google';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { IoSearchOutline } from 'react-icons/io5';
import { Select, Table, TextInput, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Pagination } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkAvilableSearch, getCoins, setIsClick } from '../reducers/CoinSlice';
import { FaArrowRightLong } from 'react-icons/fa6';
import { getSearchHistory } from '../reducers/SearchHistroySlice';
import { toast, ToastContainer } from 'react-toastify';

import Create_Resume_plus from "../assets/imagesource/Create_Resume_plus.png";
import Improve_existing_resume_icon from "../assets/imagesource/Improve_existing_resume_icon.png";
import jd_based_resume from "../assets/imagesource/jd_based_resume.png";

import { BiEdit } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";

// import ActivateNewSubscriber from "../assets/imagesource/Activate_New_Subscriber.png";
// import BalanceInfo from "../assets/imagesource/Balance_Info.png";
// import QuerySim from "../assets/imagesource/Query Sim.png";
// import DeactivateSim from "../assets/imagesource/Deactivate_Sim.png";
// import ReactivateSim from "../assets/imagesource/Reactivate_Sim.png";
// import AddWFC from "../assets/imagesource/Add_WFC.png";
// import E911Address from "../assets/imagesource/E911_Address.png";
// import GetCoverageInfo from "../assets/imagesource/Get_Coverage-Info.png";
// import purchasePlan from "../assets/imagesource/purchase_plan.png";
// import changePlan from "../assets/imagesource/change_plan.png";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // specify desired weights
  display: 'swap',
});

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // specify desired weights
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})

const Page = () => {

  return (
    <div className={`${inter.className} antialiased`}>
      <ToastContainer />
      <div className='mb-0'>
        <div className='welcome_area py-8 px-9 rounded-[10px] mb-10'>
          <h3 className='text-[22px] leading-[22px] text-white font-semibold mb-4'>Welcome to Resume Builder, Soumyajit Chandra!</h3>
          <p className='text-[18px] leading-[25px] text-white font-normal mb-0 pr-20'>Create a professional resume in minutes with our easy-to-use builder. Choose from our collection of templates and get hired faster.</p>
        </div>
        <div className='mb-10'>
          <h3 className='text-[20px] leading-[20px] text-[#151515] font-medium mb-6'>Quick Actions</h3>
          <div className='flex gap-4'>
            <div className='w-full grid grid-cols-4 gap-4'>
              <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-5 py-7'>
                <Image src={Create_Resume_plus} alt="Create_Resume_plus" className='mb-5' />
                <h3 className='text-[#151515] text-[18px] leading-[22px] font-medium pb-3'>Create Resume From Scratch</h3>
                <p className='text-[#575757] text-[15px] leading-[23px] pb-0'>Start fresh with a new resume using our professional templates</p>
              </div>
              <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-6 py-7'>
                <Image src={Improve_existing_resume_icon} alt="Improve_existing_resume_icon" className='mb-5' />
                <h3 className='text-[#151515] text-[18px] leading-[22px] font-medium pb-3'>Improve existing resume</h3>
                <p className='text-[#575757] text-[15px] leading-[23px] pb-0'>Upload and enhance your current resume with AI-powered suggestions</p>
              </div>
              <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-6 py-7'>
                <Image src={jd_based_resume} alt="jd_based_resume" className='mb-5' />
                <h3 className='text-[#151515] text-[18px] leading-[22px] font-medium pb-3'>JD based resume</h3>
                <p className='text-[#575757] text-[15px] leading-[23px] pb-0'>Upload and enhance your current resume with AI-powered suggestions</p>
              </div>
              <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-6 py-7'>
                <Image src={jd_based_resume} alt="jd_based_resume" className='mb-5' />
                <h3 className='text-[#151515] text-[18px] leading-[22px] font-medium pb-3'>Create Resume From Scratch</h3>
                <p className='text-[#575757] text-[15px] leading-[23px] pb-0'>Start fresh with a new resume using our professional templates</p>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-14'>
          <h3 className='text-[20px] leading-[20px] text-[#151515] font-medium mb-6'>Recent Resumes</h3>
          <div className='flex gap-4'>
            <div className='w-8/12'>
              <div className='flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] px-5 py-4 mb-4'>
                  <div className='flex gap-3 items-center'>
                    <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
                      <CgFileDocument className='text-[#ffffff] text-2xl' />
                    </div>
                    <div>
                      <h3 className='text-[#151515] text-base font-medium mb-1'>Software Developer Resume</h3>
                      <p className='text-[#7D7D7D] text-sm'>Created on 7 July, 2025</p>
                    </div>
                  </div>
                  <div>
                    <button className='text-xl text-[#797979] hover:text-[#A635A2] cursor-pointer'><BiEdit /></button>
                  </div>
              </div>
              <div className='flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] px-5 py-4 mb-4'>
                  <div className='flex gap-3 items-center'>
                    <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
                      <CgFileDocument className='text-[#ffffff] text-2xl' />
                    </div>
                    <div>
                      <h3 className='text-[#151515] text-base font-medium mb-1'>Software Developer Resume</h3>
                      <p className='text-[#7D7D7D] text-sm'>Created on 7 July, 2025</p>
                    </div>
                  </div>
                  <div>
                    <button className='text-xl text-[#797979] hover:text-[#A635A2] cursor-pointer'><BiEdit /></button>
                  </div>
              </div>
            </div>
            <div className='w-4/12 border bg-white border-[#D5D5D5] rounded-[10px] px-6 py-7'>
              <h3 className='text-[#151515] text-[18px] leading-[22px] font-medium pb-3'>Resume Writing Tips</h3>
              <ul className='pl-4.5'>
                  <li className='text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc'>Keep your resume to 1-2 pages maximum</li>
                  <li className='text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc'>Use action verbs to describe your achievements</li>
                  <li className='text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc'>Tailor your resume for each job application</li>
                  <li className='text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc'>Include relevant keywords from the job posting</li>
                  <li className='text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc'>Preview carefully before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;