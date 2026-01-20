'use client';

import React, { useEffect, useRef, useState } from 'react';

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

import { FaLanguage, FaPen, FaUser } from "react-icons/fa6";
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
import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select, Toast, Progress, Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Template1 from '../temp/Template1';
import { useSearchParams } from 'next/navigation';
import Template2 from '../temp/Template2';
import { toast, ToastContainer } from 'react-toastify';
import { ChevronDown, ChevronUp } from 'lucide-react';
import EmpHistoryEdit from './EmpHistoryEdit';
import EducationNewEdit from './EducationNewEdit';
import SkillsNewEdit from './SkillsNewEdit';
import PersonalSummaryEdit from './PersonalSummaryEdit';
import AddSectionEdit from './AddSectionEdit';
import CoursesEdit from './CoursesEdit';
import HobbiesEdit from './HobbiesEdit';
import ActivitiesEdit from './ActivitiesEdit';
import LanguagesEdit from './newLanguageEdit';
import InternshipsEdit from './InternshipsEdit';
import CustomSectionEdit from './CustomSectionEdit';
import CustomizeSection from '../ui/CustomizeSection';
import { useTabs } from '../context/TabsContext';
import CleanTemplate from '../TemplateNew/CleanTemplate';
import ClearTemplate from '../TemplateNew/ClearTemplate';
import VividTemplate from '../TemplateNew/VividTemplate';
import Professional from '../TemplateNew/Professional';
import PrimeATS from '../TemplateNew/PrimeATS';
import CorporateTemplate from '../TemplateNew/CorporateTemplate';
import { getSingleResume } from '../reducers/ResumeSlice';


const page = () => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const { loading,singleResumeInfo } = useSelector((state) => state?.resume)
  const { profileData } = useSelector((state) => state?.profile)
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);
  const searchParams = useSearchParams();
  // const template = searchParams.get("template");
  console.log("searchParams",searchParams);
  const resume_id=searchParams.get('id')
  const resume_type=searchParams.get('fetch')
  console.log("resume_id",resume_id);
  console.log("resume_type",resume_type);


  
  
  const user_id = localStorage.getItem('user_id')
  const parseUserId = JSON.parse(user_id)
  const [type, setType] = useState()
  const [isCreated, setIsCreated] = useState(false)
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('clear');
  const [themeColor, setThemeColor] = useState('#000000');
  const templateMap = {
    professional: Professional,
    ats: PrimeATS,
    clean: CleanTemplate,
    clear: ClearTemplate,
    vivid: VividTemplate,
    corporate: CorporateTemplate,
  };
  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
  };

  const ActiveResume = templateMap[selectedTemplate] || Professional;
  const componentRef = useRef();
  const dispatch = useDispatch()
  console.log("profileData", profileData);
  const [empHistory, setEmpHistory] = useState([{ id: 1 }])
  const [education, setEducation] = useState([{ id: 1 }])
  const [newskill, setNewSkill] = useState([{ id: 1 }])
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      employmentHistory: [{}],
      educationHistory: [{}],
      newSkillHistory: [{}],
      coursesHistory: [{}],
      activityHistory: [{}],
      languageHistory: [{}],
      internshipHistory: [{}],
      internshipHistory: [{}],
      customSectionHistory: [{}],
      customSectionTitle: "Custom Section",
      profileImage: "",
      hobbies: ""
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = methods;

  // Track which optional sections are active
  const [activeSections, setActiveSections] = useState([]);



  // Employment History Field Array
  const { fields: empFields, append: empAppend, remove: empRemove, move: empMove } = useFieldArray({
    control,
    name: "employmentHistory",
  });

  // Education History Field Array
  const { fields: eduFields, append: eduAppend, remove: eduRemove, move: eduMove } = useFieldArray({
    control,
    name: "educationHistory",
  });

  // Skills Field Array
  const { fields: skillFields, append: skillAppend, remove: skillRemove, move: skillMove } = useFieldArray({
    control,
    name: "newSkillHistory",
  });

  // Courses Field Array
  const { fields: coursesFields, append: coursesAppend, remove: coursesRemove, move: coursesMove } = useFieldArray({
    control,
    name: "coursesHistory",
  });

  // Activities Field Array
  const { fields: activitiesFields, append: activitiesAppend, remove: activitiesRemove, move: activitiesMove } = useFieldArray({
    control,
    name: "activityHistory",
  });

  // Languages Field Array
  const { fields: languageFields, append: languageAppend, remove: languageRemove, move: languageMove } = useFieldArray({
    control,
    name: "languageHistory",
  });

  // Internships Field Array
  const { fields: internshipFields, append: internshipAppend, remove: internshipRemove, move: internshipMove } = useFieldArray({
    control,
    name: "internshipHistory",
  });

  // Custom Section Field Array
  const { fields: customFields, append: customAppend, remove: customRemove, move: customMove } = useFieldArray({
    control,
    name: "customSectionHistory",
  });


  const onSubmit = (data) => {
    console.log("Auto save / Final data:", data);
  };

  const formValues = watch();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setValue("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setValue("profileImage", "");
  };

  const { activeTab } = useTabs();

    useEffect(()=>{
      dispatch(getSingleResume({
        id:resume_id,
        fetch:resume_type
      }))
  },[resume_id,resume_type])
  console.log("singleResumeInfo",singleResumeInfo);
  
  useEffect(()=>{
    setValue("job_target",singleResumeInfo?.data?.data?.job_target)
  },[resume_id,resume_type,setValue])
  return (
    <div>
      <div className='resume_tab_scrach'>
      </div>
      <div className='lg:flex gap-1'>

        <ToastContainer />
        <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] mb-4 lg:mb-0'>
          {activeTab === 'edit' ?
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div>
                  <div className='bg-white rounded-sm p-5 mb-[4px]'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='bg-[#f6efff] rounded-[5px] px-2 py-1 text-[14px] text-[#800080] font-bold'>10%</span>
                        <span className='text-[#828ba2] text-[14px] leading-[20px] font-normal'>Resume completeness</span>
                      </div>
                      <div className='flex items-center gap-2 mb-2'>
                        <span className='bg-[#e7f4ed] rounded-[5px] px-2 py-1 text-[14px] text-[#477d62] font-bold'>+10%</span>
                        <span className='text-[#828ba2] text-[14px] leading-[20px] font-normal'>Add job title</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Progress progress={10} size="sm" />
                    </div>
                  </div>

                  <div className='h-[430px] overflow-y-scroll bg-white p-5 rounded-lg'>

                    <div className=''>
                      <div className='mb-4'>
                        <h2 className='text-xl font-bold text-black pb-1'>Personal details</h2>
                        <p className='text-sm text-[#808897] font-medium'>Users who added phone number and email received 64% more positive feedback from recruiters.</p>
                      </div>

                      <div className='acco_section'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex flex-col items-center justify-center w-full md:w-48 border border-gray-200 rounded-lg bg-gray-50">
                              <label
                                htmlFor="profile-upload"
                                className="cursor-pointer flex flex-col items-center gap-2"
                              >
                                <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden">
                                  {selectedImage ? (
                                    <img
                                      src={selectedImage}
                                      alt="Profile"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <FaUser className="text-[30px] text-[#800080]" />
                                  )}
                                </div>
                                <span className="text-sm font-medium text-[#800080] hover:underline">
                                  Upload photo
                                </span>
                              </label>
                              {selectedImage && (
                                <button
                                  type="button"
                                  onClick={handleDeleteImage}
                                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500"
                                >
                                  <MdDelete size={12} /> Remove
                                </button>
                              )}

                              <span className="text-[10px] text-gray-400">
                                JPG / PNG • Max 2MB
                              </span>

                              <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700">
                                Job Target
                              </label>
                              <input
                                type="text"
                                placeholder="SENIOR SOFTWARE ENGINEER"
                                className="mt-1 w-full rounded-lg"
                                {...register("job_target")}
                              />
                            </div>
                          </div>

                          {/* First Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              First Name
                            </label>
                            <input
                              type="text"
                              placeholder="First Name"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("first_name")}
                            />
                          </div>

                          {/* Last Name */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Last Name
                            </label>
                            <input
                              type="text"
                              placeholder="Last Name"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("last_name")}
                            />
                          </div>

                          {/* Email */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <input
                              type="email"
                              placeholder="Email"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("email")}
                            />
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Phone
                            </label>
                            <input
                              type="text"
                              placeholder="Phone"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("phone")}
                            />
                          </div>

                          {/* Address */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Address
                            </label>
                            <input
                              type="text"
                              placeholder="Enter your address"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                              {...register("address")}
                            />
                          </div>

                          {/* City */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              City, State
                            </label>
                            <input
                              type="text"
                              placeholder="City,State"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("city_state")}
                            />
                          </div>

                          {/* Country */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Country
                            </label>
                            <input
                              type="text"
                              placeholder="India"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("country")}
                            />
                          </div>



                          <div className="md:col-span-2">
                            <button
                              type="button"
                              onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
                              className="flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
                            >
                              {showAdditionalDetails ? (
                                <>
                                  Hide additional details
                                  <ChevronUp size={20} />

                                </>
                              ) : (
                                <>
                                  Add more details
                                  <ChevronDown size={20} />

                                </>
                              )}
                            </button>
                          </div>

                          {/* Additional Details - Conditionally Rendered */}
                          {showAdditionalDetails && (
                            <>
                              {/* Postal Code */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Postal Code
                                </label>
                                <input
                                  type="text"
                                  placeholder="Postal Code"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                  {...register("postal_code")}
                                />
                              </div>

                              {/* Driving License */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Driving License
                                </label>
                                <input
                                  type="text"
                                  placeholder="License Number"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                  {...register("driving_licence")}
                                />
                              </div>

                              {/* Date of Birth */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Date of Birth
                                </label>
                                <input
                                  type="text"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                  {...register("dob")}
                                />
                              </div>

                              {/* Place of Birth */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Place of Birth
                                </label>
                                <input
                                  type="text"
                                  placeholder="City, Country"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                  {...register("birth_place")}
                                />
                              </div>

                              {/* Nationality */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Nationality
                                </label>
                                <input
                                  type="text"
                                  placeholder="Nationality"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                  {...register("nationality")}

                                />
                              </div>


                            </>
                          )}

                        </div>
                      </div>
                    </div>

                    <div>
                      <EmpHistoryEdit
                        register={register}
                        empHistory={empHistory}
                        setEmpHistory={setEmpHistory}
                        watch={watch}
                        control={control}
                        fields={empFields}
                        append={empAppend}
                        remove={empRemove}
                        move={empMove}
                      />
                    </div>
                    <div>
                      <EducationNewEdit
                        register={register}
                        education={education}
                        setEducation={setEducation}
                        watch={watch}
                        control={control}
                        fields={eduFields}
                        append={eduAppend}
                        remove={eduRemove}
                        move={eduMove}
                      />
                    </div>
                    <div>
                      <SkillsNewEdit
                        register={register}
                        newskill={newskill}
                        setNewSkill={setNewSkill}
                        watch={watch}
                        setValue={setValue}
                        control={control}
                        fields={skillFields}
                        append={skillAppend}
                        remove={skillRemove}
                        move={skillMove}
                      />
                    </div>
                    <div>
                      <PersonalSummaryEdit
                        register={register}
                        watch={watch}
                      />
                    </div>
                    {/* COURSES */}
                    <div id="courses">
                      <CoursesEdit
                        register={register}
                        watch={watch}
                        control={control}
                        fields={coursesFields}
                        append={coursesAppend}
                        remove={coursesRemove}
                        move={coursesMove}
                      />
                    </div>

                    {/* HOBBIES */}
                    <div id="hobbies">
                      <HobbiesEdit register={register} />
                    </div>

                    {/* EXTRA CURRICULAR / ACTIVITIES */}
                    <div id="extra_curricular">
                      <ActivitiesEdit
                        register={register}
                        watch={watch}
                        control={control}
                        fields={activitiesFields}
                        append={activitiesAppend}
                        remove={activitiesRemove}
                        move={activitiesMove}
                      />
                    </div>

                    {/* LANGUAGES */}
                    <div id="languages">
                      <newLanguageEdit
                        register={register}
                        watch={watch}
                        control={control}
                        fields={languageFields}
                        append={languageAppend}
                        remove={languageRemove}
                        move={languageMove}
                      />
                    </div>

                    {/* INTERNSHIPS */}
                    <div id="internships">
                      <InternshipsEdit
                        register={register}
                        watch={watch}
                        control={control}
                        fields={internshipFields}
                        append={internshipAppend}
                        remove={internshipRemove}
                        move={internshipMove}
                      />
                    </div>

                    {/* CUSTOM SECTION */}
                    {activeSections.includes('custom') && (
                      <div id="custom">
                        <CustomSectionEdit
                          register={register}
                          watch={watch}
                          control={control}
                          fields={customFields}
                          append={customAppend}
                          remove={customRemove}
                          move={customMove}
                          removeSection={() =>
                            setActiveSections(prev => prev.filter(s => s !== 'custom'))
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </FormProvider>
            :
            <CustomizeSection
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
            />
          }
        </div>

        <div className='lg:w-6/12 bg-[#ffffff] rounded-[8px]'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1 mb-2 lg:mb-0'>
              {/* <button
                onClick={() => setOpenPreviewModal(true)}
                className='flex items-center gap-1 text-[16px] text-[#151515] font-medium cursor-pointer hover:text-[#800080]'
              >
                <MdPreview className='text-[#800080] text-2xl' />
                Preview
              </button> */}

            </div>
            <div className='lg:flex items-center gap-3'>
              {/* <button onClick={() => setOpenModalAnalyzeResume(true)} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoStatsChart className='text-base' /> Analyze Resume</button> */}
              {/* <button onClick={() => downloadDocx()} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoMdDownload className='text-[18px]' /> Download DOCX</button> */}
              {/* <button
                //  onClick={handleDownloadClick}
                className='rounded-[7px] text-[12px] leading-[36px] font-medium px-4 flex items-center gap-1.5
        bg-[#800080] hover:bg-[#F6EFFF] text-[#ffffff] hover:text-[#92278F]'
              >
                <IoMdDownload className='text-[18px]' />
                Download PDF
              </button> */}

            </div>
          </div>
          <div ref={componentRef} className='border border-[#E5E5E5] rounded-[8px] mb-4'>
            <ActiveResume formData={formValues} empHistory={empHistory} themeColor={themeColor} />
            {/* <Image src={resume_sections_view} alt="resume_sections_view" className='' /> */}
            {/* {
                  template == 1 && (
                    <Template1 ref={componentRef} data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
                  )
                }
                {
                  template == 2 && (
                    <Template2 ref={componentRef} data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
                  )
                } */}
            {/* <Professional formData={formValues} empHistory={empHistory} /> */}

          </div>
          {/* <div className='flex items-center justify-between mb-0'>
                  <div className='flex items-center gap-1'>
                    <h3 className='text-[12px] text-[#060606] font-medium'>Template: <span className='text-[#6D6D6D]'>Modern</span></h3>
                  </div>
                  <div className='flex items-center gap-3'>
                    <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5'> Change Template <AiOutlineArrowRight className='text-base' /></button>
                  </div>
                </div> */}
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
        {/* <Modal size="6xl" className="apply_modal_area" show={openModalAnalyzeResumeBig} onClose={() => setOpenModalAnalyzeResumeBig(false)}>
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
          </Modal> */}
        {/* add modal for apply job ends here */}
        {/* <Modal
          show={openPreviewModal}
          size="6xl"
          onClose={() => setOpenPreviewModal(false)}
        >
          <ModalHeader className='text-black border-0 pt-2 pr-2'>
            Preview
          </ModalHeader>
          <ModalBody className='bg-white p-5 rounded-b-[4px]'>
            <div className='border border-[#E5E5E5] rounded-[8px] p-5'>
              {template == 1 && (
                <Template1
                  data={formValues}
                  education={educationEntries}
                  experiences={experiences}
                  skills={skills}
                  languages={languages}
                  personalPro={personalPro}
                  achivments={achivments}
                  certificates={certificates}
                />
              )}
              {template == 2 && (
                <Template2
                  data={formValues}
                  education={educationEntries}
                  experiences={experiences}
                  skills={skills}
                  languages={languages}
                  personalPro={personalPro}
                  achivments={achivments}
                  certificates={certificates}
                />
              )}
            </div>
          </ModalBody>
        </Modal> */}

      </div>
    </div >
  )
}

export default page