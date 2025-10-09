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
import { linkedgetDetails, linkedInBasicInfo, linkedInEduInfo, linkedInExpInfo, linkedInLangInfo, linkedInSkillInfo } from '../reducers/LinkedinSlice';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { convertToSubmitFormat } from '../utils/DateSubmitFormatter';

const page = () => {
  const { lkdDetails } = useSelector((state) => state?.linkedIn)
  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const id = atob(searchParams.get("id"))
  console.log("id", id);

  useEffect(() => {
    dispatch(linkedgetDetails({ lkdin_resume_id: id }))
  }, [id])
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const formValues = watch();

  const [educationEntries, setEducationEntries] = useState([
    { id: Date.now(), institution: "", location: "", field_study: "", degree: "", start_time: null, end_time: null, cgpa: "" }
  ])

  const [experiences, setExperiences] = useState([
    {
      id: Date.now(),
      company_name: "",
      position: "",
      location: "",
      skill: "",
      job_type: "",
      start_date: null,
      end_date: null,
      current_work: false,
      job_description: "",
    },
  ]);

  const [languages, setLanguages] = useState([
    { id: Date.now(), language_name: "" },
  ]);
  const [skills, setSkills] = useState([
    { id: Date.now(), skill_category: "", skill: "" }
  ])

  const onSubmit = (data) => {
    console.log("LinkedIn Submit Data:", data);

    const lkdin_resume_id = lkdDetails?.data?.[0]?.basic_info?.[0]?.lkdin_resume_id;
    console.log("lkdin_resume_id:", lkdin_resume_id);


    const basicInfoPayload = {
      ...data.basicInfo,
      lkdin_resume_id,
      basicinfo_id: lkdDetails?.data?.[0]?.basic_info?.[0]?.id || null
    };

    console.log("Basic Info Payload:", basicInfoPayload);

    dispatch(linkedInBasicInfo(basicInfoPayload)).then((res) => {
      console.log("Basic Info Response:", res);

      if (res?.payload?.status_code === 201) {

        // Education Info
        const eduPayload = {
          lkdin_resume_id,
          education_info: educationEntries.map((edu) => ({
            id: edu?.id || null,
            institution: edu.institution,
            location: edu.location,
            field_study: edu.field_study,
            degree: edu.degree,
            start_time: convertToSubmitFormat(edu.start_time),
            end_time: convertToSubmitFormat(edu.end_time),
            cgpa: edu.gpa,
            information: edu.additionalInfo,
          }))
        };

        console.log("Education Payload:", eduPayload);
        dispatch(linkedInEduInfo(eduPayload));

        // Experience Info
        const expPayload = {
          lkdin_resume_id,
          experience_info: experiences.map((exp) => ({
            id: exp?.id || null,
            company_name: exp.company_name,
            position: exp.position,
            location: exp.location,
            skill: exp.skill.split(",").map((s) => s.trim()),
            start_date: convertToSubmitFormat(exp.start_date),
            end_date: convertToSubmitFormat(exp.end_date),
            current_work: exp.current_work ? 1 : 0,
            projects:
              exp.projects?.map((proj) => ({
                title: proj.title,
                role: proj.role,
                technology: proj.technology?.split(",").map((t) => t.trim()),
                description: proj.description,
              })) || [],
          })),
        };

        console.log("✅ Final Experience Payload:", expPayload);
        dispatch(linkedInExpInfo(expPayload));



        // Skills Info
        const skillPayload = {
          lkdin_resume_id,

          skill_info: skills.map(sk => ({
            skill_category: sk.skill_category,
            position: "test",
            skill: sk.skill.split(',').map(t => t.trim())
          }))
        };
        console.log("Skills Payload:", skillPayload);
        dispatch(linkedInSkillInfo(skillPayload));

        // Language Info
        const langPayload = {
          lkdin_resume_id,
          language_info: languages.map((lang) => ({
            language_name: lang.language_name,
            proficiency_level: lang.proficiency_level,
          })),
        };
        console.log("Language Payload:", langPayload);
        dispatch(linkedInLangInfo(langPayload));
      }
    });
  };



  return (
    <div className='lg:flex gap-5 pb-5'>

      <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] mb-4 lg:mb-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='border-b border-[#E5E5E5] p-5 flex items-center justify-between'>
            <div className='flex items-center gap-1'>
              <HiClipboardList className='text-[#800080] text-2xl' />
              <h3 className='text-[16px] text-[#151515] font-medium'>Resume Sections</h3>
            </div>
            <button type="submit" className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-2 lg:px-4 flex items-center gap-1.5'><AiFillSave className='text-[18px]' /> Save Resume</button>
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
                    {/* <Tab><span><FaCertificate /></span> Courses</Tab>
                    <Tab><span><FaTrophy /></span> Honors & Awards</Tab> */}
                  </TabList>
                </div>
              </div>
              <div className='p-5 pr-0'>
                <div className='mb-4'>
                  <div>
                    <TabPanel>
                      <BasicInfoLkdin lkdDetails={lkdDetails} setValue={setValue} register={register} />
                    </TabPanel>

                    <TabPanel>
                      <EducationLkdin lkdDetails={lkdDetails} setValue={setValue} register={register} educationEntries={educationEntries} setEducationEntries={setEducationEntries} />
                    </TabPanel>

                    <TabPanel>
                      <ExpLkdin lkdDetails={lkdDetails} experiences={experiences} setExperiences={setExperiences} />
                    </TabPanel>

                    <TabPanel>
                      <LanguageLkdin lkdDetails={lkdDetails} languages={languages} setLanguages={setLanguages} />
                    </TabPanel>

                    <TabPanel>
                      <SkillsLkdin lkdDetails={lkdDetails} skills={skills} setSkills={setSkills} />
                    </TabPanel>

                    {/* <TabPanel>
                      <CoursesLkdin />
                    </TabPanel>

                    <TabPanel>
                      <AwardLkdin />
                    </TabPanel> */}

                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </form>
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
          <LinkedInTemplate data={formValues} educationEntries={educationEntries} experiences={experiences} />
        </div>
      </div>

    </div>


  )
}

export default page