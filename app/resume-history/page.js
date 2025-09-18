'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Inter } from 'next/font/google';

import resume01 from "../assets/imagesource/resume01.png";

import { FaArrowUpWideShort } from "react-icons/fa6";
import { RiSearchLine } from "react-icons/ri";
import { Select, TextInput } from 'flowbite-react';
import { CgFileDocument } from 'react-icons/cg';
import { BiDownload } from "react-icons/bi";
import { RiDraftLine } from "react-icons/ri";
import { BsSave } from "react-icons/bs";

import { BiEdit } from "react-icons/bi";
import { MdOutlinePreview } from "react-icons/md";
import { MdDataUsage } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getResumeHistory } from '../reducers/ResumeHistorySlice';
import { convertToSubmitFormat } from '../utils/DateSubmitFormatter';


const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})

const page = () => {
  const{rHistory}=useSelector((state)=>state?.resHist)
  const dispatch=useDispatch()
  useEffect(()=>{
dispatch(getResumeHistory({page:1,limit:10}))
  },[])

  console.log("rHistory",rHistory);
  
  return (
    <div className={`${inter.className} antialiased pb-8`}>
      <div className='mb-5 lg:mb-10 pt-6'>
        <h2 className='text-xl lg:text-[30px] leading-[30px] text-[#151515] font-semibold mb-1s lg:mb-4'>Resume History</h2>
        <p className='text-sm leading-[18px] lg:text-[16px] lg:leading-[23px] text-[#575757] font-normal mb-0'>Manage and organize all your resumes in one place</p>
      </div>
      <div className='search_section mb-6'>
        <div className='lg:flex items-center gap-4 border border-[#d5d5d5] bg-white p-4 rounded-[10px]'>
            <div className='lg:w-10/12 mb-2 lg:mb-0'>
              <div className='bg-[#F3F4F6] rounded-[8px] flex gap-4 items-center'>
                 <button className='w-[42px] h-[42px] flex justify-center items-center cursor-pointer'><RiSearchLine className='text-xl text-[#999999]' /></button>
                 <TextInput id="base" type="text" sizing="md" placeholder='Search resume...' className='w-full' />
              </div>
            </div>
            <div className='lg:w-3/12'>
              <div className='flex justify-center items-center gap-4'>
                <Select id="countries" className='w-[80%]' required>
                    <option>All Status</option>
                    <option>Status</option>
                    <option>Status</option>
                    <option>Status</option>
                </Select>
                <button className='bg-white hover:bg-[#a635a2] text-black hover:text-white border border-[#D5D5D5] rounded-[8px] w-[42px] h-[42px] flex justify-center items-center cursor-pointer'><FaArrowUpWideShort className='text-2xl' /></button>
              </div>
            </div>
        </div>
      </div>
      <div className='mb-6'>
        <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4'>
            <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
                <div className='flex gap-3 items-center'>
                    <div className='bg-[#D5F1FF] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
                        <CgFileDocument className='text-[#0993D0] text-3xl' />
                    </div>
                    <div>
                        <p className='text-[#7D7D7D] text-[15px]'>Total resumes</p>
                        <h3 className='text-[#151515] text-[22px] font-medium mb-1'>{rHistory?.statistics?.total_resume}</h3>
                    </div>
                </div>
            </div>
            {/* <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
                <div className='flex gap-3 items-center'>
                    <div className='bg-[#FFE0D9] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
                        <MdDataUsage className='text-[#F24822] text-3xl' />
                    </div>
                    <div>
                        <p className='text-[#7D7D7D] text-[15px]'>Total Resume Usage</p>
                        <h3 className='text-[#151515] text-[22px] font-medium mb-1'>200/500</h3>
                    </div>
                </div>
            </div> */}
            <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
                <div className='flex gap-3 items-center'>
                    <div className='bg-[#DEFFD5] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
                        <BiDownload className='text-[#186603] text-2xl' />
                    </div>
                    <div>
                        <p className='text-[#7D7D7D] text-[15px]'>Total Downloads</p>
                        <h3 className='text-[#151515] text-[22px] font-medium mb-1'>{rHistory?.statistics?.total_downloaded_resume}</h3>
                    </div>
                </div>
            </div>
            <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
                <div className='flex gap-3 items-center'>
                    <div className='bg-[#F7FFD5] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
                        <RiDraftLine className='text-[#AE7100] text-2xl' />
                    </div>
                    <div>
                        <p className='text-[#7D7D7D] text-[15px]'>Drafts</p>
                        <h3 className='text-[#151515] text-[22px] font-medium mb-1'>{rHistory?.statistics?.total_draft_resume}</h3>
                    </div>
                </div>
            </div>
            <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
                <div className='flex gap-3 items-center'>
                    <div className='bg-[#EFE3FF] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
                        <BsSave className='text-[#92278F] text-2xl' />
                    </div>
                    <div>
                        <p className='text-[#7D7D7D] text-[15px]'>Saved</p>
                        <h3 className='text-[#151515] text-[22px] font-medium mb-1'>{rHistory?.statistics?.total_saved_resume}</h3>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div className='border bg-white border-[#D5D5D5] rounded-[10px]'>
        <div className='lg:px-8 px-4 py-8'>
           <p className='text-[#151515] text-[20px] leading-[20px] lg:mb-4'>Your Resumes ({rHistory?.statistics?.total_resume})</p>
        </div>
        <div className='lg:px-8 px-4 py-0'>
          {
            rHistory?.data?.map((hist)=>(
              <div className='lg:flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] mb-12'>
              <div className='lg:flex gap-3 items-center'>
                <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center mb-2 lg:mb-0'>
                  <CgFileDocument className='text-[#ffffff] text-2xl' />
                </div>
                <div className='mb-2 lg:mb-0'>
                  <h3 className='text-[#151515] text-base font-medium mb-1'>{hist?.resume_name}</h3>
                  <div className='lg:flex items-center'>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Template: Modern</p>
                    {/* <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>{Math.floor(
    (new Date() - new Date(convertToSubmitFormat(hist?.created_at))) / (1000 * 60 * 60 * 24)
  )}{" "} Days ago</p> */}

                      <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>
                      {(() => {
                        const days = Math.floor(
                          (new Date() - new Date(convertToSubmitFormat(hist?.created_at))) /
                          (1000 * 60 * 60 * 24)
                        );
                        return days === 0 ? "Today" : `${days} Days ago`;
                      })()}
                    </p>

                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>257 KB</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8'>After analysis ATS Score: 80/100</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 lg:gap-8'>
                <button className={`text-[15px] ${hist?.process_status===0?"text-[#ae2991]":hist?.process_status===1?"text-[#AE7100]":"text-[#42AE29]"}  hover:text-[#ffffff] ${hist?.process_status===0?"bg-[#d8bed2]":hist?.process_status===1?"bg-[#F7FFD5]":"bg-[#a1bd9b]"}  ${hist?.process_status===0?"hover:bg-[#ae2991]":hist?.process_status===1?"hover:bg-[#AE7100]":"hover:bg-[#42AE29]"} rounded-3xl px-5 py-2 cursor-pointer`}>{hist?.process_status===0?"Saved":hist?.process_status===1?"Draft":"Downloaded"}</button>
                <button className='text-[15px] text-[#2781E5] hover:text-[#0993D0] cursor-pointer flex items-center'><MdOutlinePreview className='text-xl mr-1' /> Preview</button>
                <button className='text-[15px] text-[#42AE29] hover:text-[#186603] cursor-pointer flex items-center'><BiEdit className='text-xl mr-1' /> Edit</button>
              </div>
          </div>

            ))
          }
          

           {/* <div className='lg:flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] mb-12'>
              <div className='lg:flex gap-3 items-center'>
                <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center mb-2 lg:mb-0'>
                  <CgFileDocument className='text-[#ffffff] text-2xl' />
                </div>
                <div className='mb-2 lg:mb-0'>
                  <h3 className='text-[#151515] text-base font-medium mb-1'>Software Developer Resume</h3>
                  <div className='lg:flex items-center'>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Template: Modern</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>4 Days ago</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>257 KB</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Before analysis ATS Score: 80/100</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-0'>After analysis ATS Score: 80/100</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 lg:gap-8'>
                <button className='text-[15px] text-[#186603] hover:text-[#ffffff] bg-[#DEFFD5] hover:bg-[#186603] rounded-3xl px-5 py-2 cursor-pointer'>Downloaded</button>
                <button className='text-[15px] text-[#2781E5] hover:text-[#0993D0] cursor-pointer flex items-center'><MdOutlinePreview className='text-xl mr-1' /> Preview</button>
                <button className='text-[15px] text-[#42AE29] hover:text-[#186603] cursor-pointer flex items-center'><BiEdit className='text-xl mr-1' /> Edit</button>
              </div>
          </div>

           <div className='lg:flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] mb-12'>
              <div className='lg:flex gap-3 items-center'>
                <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center mb-2 lg:mb-0'>
                  <CgFileDocument className='text-[#ffffff] text-2xl' />
                </div>
                <div className='mb-2 lg:mb-0'>
                  <h3 className='text-[#151515] text-base font-medium mb-1'>Software Developer Resume</h3>
                  <div className='lg:flex items-center'>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Template: Modern</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>4 Days ago</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>257 KB</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Before analysis ATS Score: 80/100</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-0'>After analysis ATS Score: 80/100</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 lg:gap-8'>
                <button className='text-[15px] text-[#92278F] hover:text-[#ffffff] bg-[#EFE3FF] hover:bg-[#92278F] rounded-3xl px-5 py-2 cursor-pointer'>Saved</button>
                <button className='text-[15px] text-[#2781E5] hover:text-[#0993D0] cursor-pointer flex items-center'><MdOutlinePreview className='text-xl mr-1' /> Preview</button>
                <button className='text-[15px] text-[#42AE29] hover:text-[#186603] cursor-pointer flex items-center'><BiEdit className='text-xl mr-1' /> Edit</button>
              </div>
          </div>

           <div className='lg:flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] mb-12'>
              <div className='lg:flex gap-3 items-center'>
                <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center mb-2 lg:mb-0'>
                  <CgFileDocument className='text-[#ffffff] text-2xl' />
                </div>
                <div className='mb-2 lg:mb-0'>
                  <h3 className='text-[#151515] text-base font-medium mb-1'>Software Developer Resume</h3>
                  <div className='lg:flex items-center'>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Template: Modern</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>4 Days ago</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>257 KB</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Before analysis ATS Score: 80/100</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-0'>After analysis ATS Score: 80/100</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 lg:gap-8'>
                <button className='text-[15px] text-[#186603] hover:text-[#ffffff] bg-[#DEFFD5] hover:bg-[#186603] rounded-3xl px-5 py-2 cursor-pointer'>Downloaded</button>
                <button className='text-[15px] text-[#2781E5] hover:text-[#0993D0] cursor-pointer flex items-center'><MdOutlinePreview className='text-xl mr-1' /> Preview</button>
                <button className='text-[15px] text-[#42AE29] hover:text-[#186603] cursor-pointer flex items-center'><BiEdit className='text-xl mr-1' /> Edit</button>
              </div>
          </div>

           <div className='lg:flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] mb-12'>
              <div className='lg:flex gap-3 items-center'>
                <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center mb-2 lg:mb-0'>
                  <CgFileDocument className='text-[#ffffff] text-2xl' />
                </div>
                <div className='mb-2 lg:mb-0'>
                  <h3 className='text-[#151515] text-base font-medium mb-1'>Software Developer Resume</h3>
                  <div className='lg:flex items-center'>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Template: Modern</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>4 Days ago</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>257 KB</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Before analysis ATS Score: 80/100</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-0'>After analysis ATS Score: 80/100</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 lg:gap-8'>
                <button className='text-[15px] text-[#186603] hover:text-[#ffffff] bg-[#DEFFD5] hover:bg-[#186603] rounded-3xl px-5 py-2 cursor-pointer'>Downloaded</button>
                <button className='text-[15px] text-[#2781E5] hover:text-[#0993D0] cursor-pointer flex items-center'><MdOutlinePreview className='text-xl mr-1' /> Preview</button>
                <button className='text-[15px] text-[#42AE29] hover:text-[#186603] cursor-pointer flex items-center'><BiEdit className='text-xl mr-1' /> Edit</button>
              </div>
          </div>

           <div className='lg:flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] mb-12'>
              <div className='lg:flex gap-3 items-center'>
                <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center mb-2 lg:mb-0'>
                  <CgFileDocument className='text-[#ffffff] text-2xl' />
                </div>
                <div className='mb-2 lg:mb-0'>
                  <h3 className='text-[#151515] text-base font-medium mb-1'>Software Developer Resume</h3>
                  <div className='lg:flex items-center'>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Template: Modern</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>4 Days ago</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>257 KB</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Before analysis ATS Score: 80/100</p>
                    <p className='text-[#7D7D7D] text-[13px] pr-0'>After analysis ATS Score: 80/100</p>
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-4 lg:gap-8'>
                <button className='text-[15px] text-[#92278F] hover:text-[#ffffff] bg-[#EFE3FF] hover:bg-[#92278F] rounded-3xl px-5 py-2 cursor-pointer'>Saved</button>
                <button className='text-[15px] text-[#2781E5] hover:text-[#0993D0] cursor-pointer flex items-center'><MdOutlinePreview className='text-xl mr-1' /> Preview</button>
                <button className='text-[15px] text-[#42AE29] hover:text-[#186603] cursor-pointer flex items-center'><BiEdit className='text-xl mr-1' /> Edit</button>
              </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default page