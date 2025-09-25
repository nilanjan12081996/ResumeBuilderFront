'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { HiClipboardList } from "react-icons/hi";
import { MdPreview } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

import { BiSolidUser } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhone } from "react-icons/bi";

import { HiAcademicCap } from "react-icons/hi2";

import { FaLanguage } from "react-icons/fa6";
import { MdSettingsSuggest } from "react-icons/md";
import { FaDiagramProject } from "react-icons/fa6";
import { FaCertificate } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";

import { BiSolidBank } from "react-icons/bi";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";  

import { FaTags } from "react-icons/fa";
import { BiSolidBuilding } from "react-icons/bi";

import { BiWorld } from "react-icons/bi";

import { BsFillPersonVcardFill } from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";

import { BiLink } from "react-icons/bi";

import { MdOutlineWorkOutline } from "react-icons/md";


import resume4 from "../assets/imagesource/resume4.png";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select } from "flowbite-react";
import LinkedInTemplate from './LinkedInTemplate';
import BasicInfoLkdin from './BasicInfoLkdin';
import EducationLkdin from './EducationLkdin';
import ExpLkdin from './ExpLkdin';
import LanguageLkdin from './LanguageLkdin';
import SkillsLkdin from './SkillsLkdin';
import CoursesLkdin from './CoursesLkdin';
import AwardLkdin from './AwardLkdin';
import { useDispatch, useSelector } from 'react-redux';
import { linkedgetDetails } from '../reducers/LinkedinSlice';
import { useSearchParams } from 'next/navigation';

const page = () => {
  const{lkdDetails}=useSelector((state)=>state?.linkedIn)
  const dispatch=useDispatch()
  const searchParams = useSearchParams();
  const id=atob(searchParams.get("id"))
  useEffect(()=>{
    dispatch(linkedgetDetails({lkdin_resume_id:id}))
  },[id])
  return (
    <div className='lg:flex gap-5 pb-5'>
            <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] mb-4 lg:mb-0'>
               <div className='border-b border-[#E5E5E5] p-5 flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <HiClipboardList className='text-[#800080] text-2xl' />
                    <h3 className='text-[16px] text-[#151515] font-medium'>Resume Sections</h3>
                  </div>
                  <button className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-2 lg:px-4 flex items-center gap-1.5'><AiFillSave className='text-[18px]' /> Save Resume</button>
               </div>
               <div className='resume_tab_section'>
                  <Tabs>
                    <div className='border-b border-[#E5E5E5] p-5'>
                        <div className='tab_point'>
                          <TabList>
                            <Tab><span><BiSolidUser /></span> Personal Info</Tab>
                            <Tab><span><HiAcademicCap /></span> Education</Tab>
                            <Tab><span><BiSolidBriefcase /></span> Experience</Tab>
                            <Tab><span><FaLanguage /></span> Languages</Tab>
                            <Tab><span><MdSettingsSuggest /></span> Skills</Tab>
                            <Tab><span><FaCertificate /></span> Courses</Tab>
                            <Tab><span><FaTrophy /></span> Honors & Awards</Tab>
                          </TabList>
                        </div>
                    </div>
                    <div className='p-5 pr-0'>
                      <div className='mb-4'>
                          <div>
                            <TabPanel>
                              <BasicInfoLkdin/>
                            </TabPanel>
    
                            <TabPanel>
                             <EducationLkdin/>
                            </TabPanel>
    
                            <TabPanel>
                               <ExpLkdin/>
                            </TabPanel>
    
                            <TabPanel>
                              <LanguageLkdin/>
                            </TabPanel>
    
                            <TabPanel>
                             <SkillsLkdin/>
                            </TabPanel>
    
                            <TabPanel>
                             <CoursesLkdin/>
                            </TabPanel>    
    
                            <TabPanel>  
                             <AwardLkdin/>
                            </TabPanel>
    
                          </div>
                      </div>
                    </div>
                  </Tabs>
               </div>
            </div>
            <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] p-5'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-1'>
                  <MdPreview className='text-[#800080] text-2xl' />
                  <h3 className='text-[16px] text-[#151515] font-medium'>Preview</h3>
                </div>
                <div className='flex items-center gap-3'>
                  <button className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download PDF</button>
                </div>
              </div>
              <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
                 {/* <Image src={resume4} alt="resume4" className='' /> */}
                 <LinkedInTemplate/>
              </div>
            </div>

        </div>
  )
}

export default page