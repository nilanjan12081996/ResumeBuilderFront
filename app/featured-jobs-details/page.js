import { Button } from 'flowbite-react';
import Link from 'next/link'
import React from 'react'

import { CgArrowLeft } from "react-icons/cg";

import small_inner_logo from "../assets/imagesource/small_inner_logo.png";
import Image from 'next/image';

const page = () => {
  return (
    <div className='bg-[#ffffff] rounded-[10px] p-10'>
        <div className='flex gap-2 items-center mb-8'>
            <Link className='bg-[#92278F] hover:bg-[#151515] rounded-[7px] w-[32px] h-[32px] flex justify-center items-center' href="/featured-jobs" passHref>
               <CgArrowLeft className='text-white text-[18px]' />
            </Link>
            <p className='text-[16px] text-[#151515] font-medium'>Go Back</p>
        </div>
        <div className='flex gap-6'>
            <div className='w-8/12 border border-[#C8C8C8] rounded-[10px] px-8 py-10'>
                <div className='mb-16 flex items-center'>
                    <div className='w-6/12 flex gap-4 items-center'>
                      <div className='border border-[#C2C2C2] rounded-[6px] w-[135px] h-[135px] flex justify-center items-center'>
                        <Image src={small_inner_logo} alt="small_inner_logo" className='mb-0' />
                      </div>
                      <div>
                        <h3 className='text-black text-[22px] leading-[24px] font-semibold pb-2'>Hiring Eye</h3>
                        <p className='text-[#6C6C6C] font-medium text-[15px] leading-[24px] pb-3'>Downtown District, USA</p>
                        <div className='flex gap-2'>
                            <div className='text-[#92278F] text-[14px] leading-[35px] rounded-[3px] px-5 bg-[#FFE8FE]'>Logistics</div>
                            <div className='text-[#92278F] text-[14px] leading-[35px] rounded-[3px] px-5 bg-[#FFE8FE]'>Hospitality</div>
                        </div>
                      </div>
                    </div>
                    <div className='w-6/12 flex gap-6 justify-end'>
                       <div>
                          <p className='text-[16px] leading-[24px] font-semibold text-[#6C6C6C] pb-1'>Type</p>
                          <p className='text-[15px] leading-[24px] font-normal text-[#6C6C6C]'>Full time</p>
                       </div>
                       <div>
                          <p className='text-[16px] leading-[24px] font-semibold text-[#6C6C6C] pb-1'>Company Size</p>
                          <p className='text-[15px] leading-[24px] font-normal text-[#6C6C6C]'>200-500 employee(S)</p>
                       </div>
                    </div>
                </div>
               <div className='mb-8 flex items-center'>
                  <div className='w-6/12'>
                    <h3 className='text-black text-[22px] leading-[24px] font-semibold pb-4'>Sales Manager</h3>
                    <p className='text-[17px] leading-[20px] font-semibold text-black pb-1'>Hiring Eye: <span className='text-[#6C6C6C] font-medium text-[15px] leading-[24px]'>Downtown District, USA</span></p>
                    <p className='text-[17px] leading-[20px] font-semibold text-black pb-1'>Job Type: <span className='text-[#6C6C6C] font-medium text-[15px] leading-[24px]'>Full Time</span></p>
                  </div>
                  <div className='w-6/12 flex justify-end'>
                     <div>
                        <p className='text-[#626262] text-[14px] leading-[20px] pb-3 text-right'>Posted 3 days ago</p>
                        <button className='bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold block text-center rounded-[7px]'>Apply Job</button>
                     </div>
                  </div>
               </div>
               <div className='mb-2'>
                    <h3 className='text-black text-[22px] leading-[24px] font-semibold pb-2'>Minimum Qualification</h3>
                    <p className='text-[#6C6C6C] font-medium text-[15px] leading-[24px] pb-4'>Candidates must have a Bachelor’s degree in Business/Marketing, at least 3 years of 
                        proven sales experience, strong leadership skills, and proficiency in CRM tools. Prior team management experience is an added advantage.</p>
               </div>
                <div className='mb-2'>
                    <h3 className='text-black text-[22px] leading-[24px] font-semibold pb-2'>Preferred Qualification</h3>
                    <p className='text-[#6C6C6C] font-medium text-[15px] leading-[24px] pb-4'>MBA preferred, with 5+ years of sales experience (2+ in a managerial role). 
                        Prior success in driving revenue growth, industry-specific exposure, and strong leadership/CRM skills are a plus.</p>
               </div>
                <div className='mb-2'>
                    <h3 className='text-black text-[22px] leading-[24px] font-semibold pb-2'>About this Job</h3>
                    <p className='text-[#6C6C6C] font-medium text-[15px] leading-[24px] pb-4'>We are looking for a dynamic Sales Manager to lead our sales team and drive revenue 
                        growth. The role involves developing sales strategies, managing client relationships, and ensuring targets are met. The ideal candidate has strong leadership 
                        skills, proven sales success, and a passion for building high-performing teams. This is a great opportunity to make a direct impact on company growth in a 
                        fast-paced environment.</p>
               </div>
            </div>
            <div className='w-4/12 border border-[#C8C8C8] rounded-[10px] px-6 py-10'>
               <h3 className='text-black text-[22px] leading-[24px] font-semibold pb-4'>Responsibilities</h3>
               <p className='text-[#6C6C6C] font-medium text-[15px] leading-[24px] pb-4'>As a Sales Manager, you will oversee the sales team, develop strategies to achieve revenue goals, and build strong client relationships. 
                You will be responsible for driving business growth while ensuring customer satisfaction and team performance.</p>
               <h4 className='text-[#151515] font-medium text-[15px] leading-[24px] pb-4'>Key Responsibilities:</h4>
               <ul className='pl-4'>
                  <li className='text-[#6C6C6C] font-medium text-[15px] leading-[20px] mb-1 list-disc'>Develop and implement effective sales strategies to meet company targets.</li>
                  <li className='text-[#6C6C6C] font-medium text-[15px] leading-[20px] mb-1 list-disc'>Lead, mentor, and motivate the sales team to achieve individual and team goals.</li>
                  <li className='text-[#6C6C6C] font-medium text-[15px] leading-[20px] mb-1 list-disc'>Build and maintain strong, long-term customer relationships.</li>
                  <li className='text-[#6C6C6C] font-medium text-[15px] leading-[20px] mb-1 list-disc'>Identify new business opportunities and expand market reach.</li>
                  <li className='text-[#6C6C6C] font-medium text-[15px] leading-[20px] mb-1 list-disc'>Track sales performance, prepare reports, and present insights to management.</li>
                  <li className='text-[#6C6C6C] font-medium text-[15px] leading-[20px] mb-1 list-disc'>Collaborate with marketing and product teams to align sales strategies.</li>
                  <li className='text-[#6C6C6C] font-medium text-[15px] leading-[20px] mb-1 list-disc'>Ensure customer satisfaction by addressing concerns and providing solutions.</li>
               </ul>
            </div>
        </div>
    </div>
  )
}

export default page