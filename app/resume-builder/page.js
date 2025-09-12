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

import resume_sections_view from "../assets/imagesource/resume_sections_view.png";
import resume_score2 from "../assets/imagesource/resume_score2.png";
import resume_score from "../assets/imagesource/resume_score.png";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select } from "flowbite-react";
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import WorkExp from './WorkExp';
import Language from './Language';
import Skills from './Skills';
import PersonalProject from './PersonalProject';
import Certificates from './Certificates';
import Achivments from './Achivments';
import { useForm } from 'react-hook-form';

const page = () => {
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);

   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className='lg:flex gap-5 pb-5'>
      <form>
        <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] mb-4 lg:mb-0'>
           <div className='border-b border-[#E5E5E5] p-5 flex items-center justify-between'>
              <div className='flex items-center gap-1 lg:mb-4 lg:mb-0'>
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
                        <Tab><span><BiSolidBriefcase /></span> Work Experience</Tab>
                        <Tab><span><FaLanguage /></span> Languages</Tab>
                        <Tab><span><MdSettingsSuggest /></span> Skills</Tab>
                        <Tab><span><FaDiagramProject /></span> Personal Projects</Tab>
                        <Tab><span><FaCertificate /></span> Certifications</Tab>
                        <Tab><span><FaTrophy /></span> Achievements</Tab>
                      </TabList>
                    </div>
                </div>
                <div className='p-5 pr-0'>
                  <div className='mb-4'>
                      <div>
                        <TabPanel>
                        <PersonalInfo register={register}/>
                        </TabPanel>
                        
                      <TabPanel>
                      <Education register={register}/>
                      </TabPanel>
                        

                        <TabPanel>
                          <WorkExp register={register}/>
                        </TabPanel>

                        <TabPanel>
                         <Language register={register}/>
                        </TabPanel>

                        <TabPanel>
                          <Skills register={register}/>
                        </TabPanel>

                        <TabPanel>
                          <PersonalProject register={register}/>
                        </TabPanel>

                        <TabPanel>
                         <Certificates register={register}/>
                        </TabPanel>

                        <TabPanel>  
                         <Achivments register={register}/>
                        </TabPanel>

                      </div>
                  </div>
                </div>
              </Tabs>
           </div>
        </div>
        </form>




        <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] p-5'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-1 mb-2 lg:mb-0'>
              <MdPreview className='text-[#800080] text-2xl' />
              <h3 className='text-[16px] text-[#151515] font-medium'>Preview</h3>
            </div>
            <div className='lg:flex items-center gap-3'>
              <button onClick={() => setOpenModalAnalyzeResume(true)} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoStatsChart className='text-base' /> Analyze Resume</button>
              <button onClick={() => setOpenModalAnalyzeResumeBig(true)} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoMdDownload className='text-[18px]' /> Download DOCX</button>
              <button className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download PDF</button>
            </div>
          </div>
          <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
             <Image src={resume_sections_view} alt="resume_sections_view" className='' />
          </div>
          <div className='flex items-center justify-between mb-0'>
            <div className='flex items-center gap-1'>
              <h3 className='text-[12px] text-[#060606] font-medium'>Template: <span className='text-[#6D6D6D]'>Modern</span></h3>
            </div>
            <div className='flex items-center gap-3'>
              <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5'> Change Template <AiOutlineArrowRight className='text-base' /></button>
            </div>
          </div>
        </div>

        {/* add modal for apply job start here */}
        <Modal size="3xl" className="apply_modal_area" show={openModalAnalyzeResume} onClose={() => setOpenModalAnalyzeResume(false)}>
              <ModalHeader className='bg-white text-black border-0 pt-2 pr-2'>&nbsp;</ModalHeader>
              <ModalBody className='bg-white p-5 rounded-b-[4px] relative'>
                  <div className='border border-[#E5E5E5] rounded-[8px] p-5 mb-3'>
                    <h3 className='text-base font-medium mb-4 text-[#151515]'>After</h3>
                    <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
                      <Image src={resume_sections_view} alt="resume_sections_view" className='' />
                    </div>
                    <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute left-[30px] lg:bottom-[-130px] bottom-[130px] p-5'>
                      <Image src={resume_score} alt="resume_score" className='mb-0' />
                    </div>
                  </div>
                  <div>
                      <p className='text-[14px] text-[#DF1B35] font-semibold pb-0'>Important Note: </p>
                      <p className='text-[14px] text-[#626262]'>Unlock enhanced features and maximize your potential by upgrading to our Premium packages.</p>
                    </div>
              </ModalBody>
          </Modal>
        {/* add modal for apply job ends here */}

        {/* add modal for apply job start here */}
        <Modal size="6xl" className="apply_modal_area" show={openModalAnalyzeResumeBig} onClose={() => setOpenModalAnalyzeResumeBig(false)}>
              <ModalHeader className='bg-white text-black border-0 pt-2 pr-2'>&nbsp;</ModalHeader>
              <ModalBody className='bg-white p-5 rounded-b-[4px] relative'>
                  <div className='flex gap-4'>
                    <div className='border border-[#E5E5E5] rounded-[8px] p-5 mb-3 w-6/12 relative'>
                      <h3 className='text-base font-medium mb-4 text-[#151515]'>Before</h3>
                      <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
                        <Image src={resume_sections_view} alt="resume_sections_view" className='' />
                      </div>
                      <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute left-[10px] bottom-[20px] p-5'>
                        <Image src={resume_score} alt="resume_score" className='mb-0' />
                      </div>
                    </div>
                    <div className='border border-[#E5E5E5] rounded-[8px] p-5 mb-3 w-6/12 relative'>
                      <h3 className='text-base font-medium mb-4 text-[#151515]'>After</h3>
                      <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
                        <Image src={resume_sections_view} alt="resume_sections_view" className='' />
                      </div>
                      <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute right-[10px] bottom-[20px] p-5'>
                        <Image src={resume_score2} alt="resume_score2" className='mb-0' />
                      </div>
                    </div>
                  </div>
              </ModalBody>
          </Modal>
        {/* add modal for apply job ends here */}
    </div>
  )
}

export default page