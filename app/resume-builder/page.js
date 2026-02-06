'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { AiFillSave } from "react-icons/ai";
import { FaUser } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import resume_sections_view from "../assets/imagesource/resume_sections_view.png";
import resume_score2 from "../assets/imagesource/resume_score2.png";
import resume_score from "../assets/imagesource/resume_score.png";

import { Tab, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select, Toast, Progress, Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import PersonalInfo from './PersonalSummary';
import Education from './EducationNew';
import WorkExp from './WorkExp';
import Language from './Language';
import Skills from './SkillsNew';
import PersonalProject from './PersonalProject';
import Certificates from './Certificates';
import Achivments from './Achivments';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCountResume, addCountResumeOrg, saveAchivmentInfo, saveCertificatesInfo, saveEducationInfo, saveForDraft, saveLanguageInfo, savePersonalInfo, saveProjectInfo, saveSkillInfo, saveTemplate, saveWorkExp, saveResumeNew } from '../reducers/ResumeSlice';
import Template1 from '../temp/Template1';
import { useReactToPrint } from 'react-to-print';
import { useSearchParams, useRouter } from 'next/navigation';
import Template2 from '../temp/Template2';
import { convertToSubmitFormat } from '../utils/DateSubmitFormatter';
import { saveAs } from "file-saver";
import { toast, ToastContainer } from 'react-toastify';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import isEqual from 'lodash.isequal';

import { RiDraggable } from "react-icons/ri";
import Professional from '../TemplateNew/Professional';
import PrimeATS from '../TemplateNew/PrimeATS';
import CorporateTemplate from '../TemplateNew/CorporateTemplate';
import EmpHistory from './EmpHistory';
import EducationNew from './EducationNew';
import SkillsNew from './SkillsNew';
import PersonalSummary from './PersonalSummary';
import AddSection from './AddSection';
import Courses from './Courses';
import Hobbies from './Hobbies';
import Activities from './Activities';
import Languages from './newLanguage';
import Internships from './Internships';
import CustomSection from './CustomSection';
import CleanTemplate from '../TemplateNew/CleanTemplate';
import ClearTemplate from '../TemplateNew/ClearTemplate';
import VividTemplate from '../TemplateNew/VividTemplate';
import CustomizeSection from '../ui/CustomizeSection';
import { useTabs } from '../context/TabsContext';
import { defaultResumeSettings } from '../config/defaultResumeSettings';
import { FaLock } from 'react-icons/fa';


const page = () => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const { loading } = useSelector((state) => state?.resume)
  const { profileData } = useSelector((state) => state?.profile)
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const user_id = localStorage.getItem('user_id')
  const parseUserId = JSON.parse(user_id)
  const [type, setType] = useState()
  const [isCreated, setIsCreated] = useState(false)
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const lastSavedData = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState('ats');
  const [resumeSettings, setResumeSettings] = useState(defaultResumeSettings);

  const templateMap = {
    professional: Professional,
    ats: PrimeATS,
    clean: CleanTemplate,
    clear: ClearTemplate,
    vivid: VividTemplate,
    corporate: CorporateTemplate,
  };

  const [themeColor, setThemeColor] = useState(
    defaultResumeSettings.theme.defaultColor
  );

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    const color =
      defaultResumeSettings.theme.templateColors[id.toLowerCase()] ||
      defaultResumeSettings.theme.defaultColor;

    setThemeColor(color);
  };
  const ActiveResume = templateMap[selectedTemplate] || Professional;
  const componentRef = useRef();

  const dispatch = useDispatch()
  const router = useRouter();
  const [resumeIds, setResumeIds] = useState({ mongo_id: null, mysql_id: null });
  const [savingStatus, setSavingStatus] = useState('unsaved'); // 'saved', 'saving', 'error', 'unsaved'
  console.log("profileData", profileData);
  const [empHistory, setEmpHistory] = useState([{ id: 1 }])
  const [education, setEducation] = useState([{ id: 1 }])
  const [newskill, setNewSkill] = useState([{ id: 1 }])

  const [empSectionTitle, setEmpSectionTitle] = useState("Professional Experience");
  const [isEditingEmpTitle, setIsEditingEmpTitle] = useState(false);
  const [eduSectionTitle, setEduSectionTitle] = useState("Education");
  const [isEditingEduTitle, setIsEditingEduTitle] = useState(false);
  const [skillSectionTitle, setSkillSectionTitle] = useState("Skills");
  const [isEditingSkillTitle, setIsEditingSkillTitle] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      employmentSectionTitle: "Professional Experience",
      educationSectionTitle: "Education",
      skillSectionTitle: "Skills",
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

  // Base Steps
  const BASE_STEPS = [
    { id: 1, title: "Personal Details" },
    { id: 2, title: "Employment History" },
    { id: 3, title: "Education" },
    { id: 4, title: "Skills" },
    { id: 5, title: "Professional Summary" }
  ];

  // SECTION CONFIG
  const OPTIONAL_SECTIONS_CONFIG = [
    { id: 'courses', title: 'Courses', component: Courses },
    { id: 'hobbies', title: 'Hobbies', component: Hobbies },
    { id: 'extra_curricular', title: 'Extra-curricular Activities', component: Activities },
    // { id: 'languages', title: 'Languages', component: Languages },
    { id: 'languages', title: 'Languages', component: Languages },
    { id: 'internships', title: 'Internships', component: Internships },
    { id: 'custom', title: watch('customSectionTitle') || 'Custom Section', component: CustomSection }
  ];

  // Dynamic Steps generation
  const getSteps = () => {
    let steps = [...BASE_STEPS];

    // Add active optional sections
    activeSections.forEach((sectionId) => {
      const config = OPTIONAL_SECTIONS_CONFIG.find(c => c.id === sectionId);
      if (config) {
        steps.push({ id: steps.length + 1, title: config.title, sectionId: sectionId });
      } else if (typeof sectionId === 'string' && sectionId.startsWith('custom_')) {
        steps.push({ id: steps.length + 1, title: watch(`customSectionTitle_${sectionId}`) || 'Custom Section', sectionId: sectionId });
      }
    });

    // Always add "Add Section" at the end
    steps.push({ id: steps.length + 1, title: "Add Section", isAddSectionStep: true });

    return steps;
  };

  const STEPS = getSteps();

  const [step, setStep] = useState(1);

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
  const formValues = watch();
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    // Determine if we are on the last step
    const isLastStep = step === STEPS.length;

    // 1. Initial Save (If we don't have IDs yet)
    if (!resumeIds.mongo_id) {
      setSavingStatus('saving');
      const dataToSave = { ...data, resume_type: "scratch" };

      dispatch(saveResumeNew(dataToSave)).then((res) => {
        if (res.payload && res.payload.status_code === 200) {
          const newMongoId = res.payload.sectionsdata?.mongo_id;
          const newMysqlId = res.payload.sectionsdata?.mysql_id;

          if (newMongoId && newMysqlId) {
            setResumeIds({
              mongo_id: newMongoId,
              mysql_id: newMysqlId
            });

            lastSavedData.current = JSON.parse(JSON.stringify(data));
            setSavingStatus('saved');

            if (isLastStep) {
              // Jodi prothom save-ei user finish click kore thake
              router.push(`/resume-builder-edit?id=${newMysqlId}&fetch=scratch_resume`);
            } else {
              nextStep();
            }
          } else {
            setSavingStatus('error');
            toast.error("Error saving resume: Missing IDs");
          }
        } else {
          setSavingStatus('error');
          toast.error("Error saving resume");
        }
      });
    }
    // 2. Update Mode (Already have IDs)
    else {
      if (isLastStep) {
        // Jodi itomoddhei auto-save hoye thake, tahole direct redirect
        if (resumeIds.mysql_id) {
          router.push(`/resume-builder-edit?id=${resumeIds.mysql_id}&fetch=scratch_resume`);
        } else {
          toast.error("Resume ID not found. Please wait...");
        }
      } else {
        nextStep();
      }
    }
  };

  // Auto-Save Effect
  useEffect(() => {
    if (resumeIds.mongo_id && resumeIds.mysql_id) {
      // Normalize formValues to ensure fair comparison
      // JSON stringify removes undefined values, matching our lastSavedData structure
      const currentDataNormalized = JSON.parse(JSON.stringify(formValues));

      // Check if data is actually different from last saved
      if (lastSavedData.current && isEqual(currentDataNormalized, lastSavedData.current)) {
        return; // Data hasn't changed, don't save.
      }

      setSavingStatus('saving');
      const timeoutId = setTimeout(() => {
        // Capture current values for the API call and for updating the ref on success
        // Use deep copy to ensure we have a snapshot that won't mutate
        const currentData = JSON.parse(JSON.stringify(formValues));

        const dataToSave = {
          ...currentData,
          resume_type: "scratch",
          ...resumeIds // Include IDs for update
        };

        dispatch(saveResumeNew(dataToSave)).then((res) => {
          if (res.payload && res.payload.status_code === 200) {
            setSavingStatus('saved');
            lastSavedData.current = currentData; // Update the ref to the data we just successfully saved
          } else {
            setSavingStatus('error');
          }
        });
      }, 2000); // 2 second debounce

      return () => clearTimeout(timeoutId);
    }
  }, [formValues, resumeIds]);



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

  // -------------------- AUTO HIDE STATUS --------------------
  useEffect(() => {
    if (savingStatus === "saved") {
      const timer = setTimeout(() => {
        setSavingStatus("unsaved");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [savingStatus]);

  const { activeTab } = useTabs();

  return (
    <div>
      <Tabs>
        <div className='lg:flex gap-1 pb-0'>

          <ToastContainer />
          <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] mb-4 lg:mb-0 '>

            {activeTab === 'edit' ?
              <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                  <div className=''>
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

                    <div className='h-full overflow-y-scroll bg-white p-5 rounded-lg'>
                      {
                        step === 1 && (
                          <div className=''>
                            <div className='mb-4'>
                              <h2 className='text-xl font-bold text-black pb-1'>Personal details</h2>
                              <p className='text-sm text-[#808897] font-medium'>Users who added phone number and email received 64% more positive feedback from recruiters.</p>
                            </div>

                            <div className='acco_section'>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
                                  <div
                                    className={`p-2 flex flex-col items-center justify-center w-full md:w-48 border border-gray-200 rounded-lg 
                                      ${selectedTemplate === "clean"
                                        ? "bg-gray-100 opacity-60 cursor-not-allowed"
                                        : "bg-gray-50"
                                      }`}
                                  >
                                    {selectedTemplate === "clean" ? (
                                      <>
                                        <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden">
                                          <FaLock className="text-[28px] text-gray-500" />
                                        </div>

                                        <span className="text-[12px] text-gray-400 text-center mt-2">
                                          This template doesn’t support photo upload
                                        </span>
                                      </>
                                    ) : (
                                      <>
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
                                      </>
                                    )}
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

                                {/* LinkedIn */}
                                <div>
                                  <label className="block !text-sm !font-medium !text-gray-500">
                                    LinkedIn URL
                                  </label>
                                  <input
                                    type="url"
                                    placeholder="linkedin.com/in/yourprofile"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                                    {...register("linkedin")}
                                  />
                                </div>
                                {/* GitHub */}
                                <div>
                                  <label className="block !text-sm !font-medium !text-gray-500">
                                    GitHub
                                  </label>
                                  <input
                                    type="url"
                                    placeholder="github.com/username"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                                    {...register("github")}
                                  />
                                </div>

                                {/* Stack Overflow */}
                                <div>
                                  <label className="block !text-sm !font-medium !text-gray-500">
                                    Stack Overflow
                                  </label>
                                  <input
                                    type="url"
                                    placeholder="stackoverflow.com/users/your-id"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                                    {...register("stackoverflow")}
                                  />
                                </div>

                                {/* LeetCode */}
                                <div>
                                  <label className="block !text-sm !font-medium !text-gray-500">
                                    LeetCode
                                  </label>
                                  <input
                                    type="url"
                                    placeholder="leetcode.com/username"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                                    {...register("leetcode")}
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

                                <div className="md:col-span-2">
                                  <button
                                    type="button"
                                    onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
                                    className="flex items-center gap-2 !text-[#800080] hover:!text-[#b98ab9] font-medium transition-colors"
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
                        )
                      }
                      {
                        step === 2 && (
                          <div>
                            <EmpHistory
                              register={register}
                              empHistory={empHistory}
                              setEmpHistory={setEmpHistory}
                              watch={watch}
                              control={control}
                              fields={empFields}
                              append={empAppend}
                              remove={empRemove}
                              move={empMove}
                              sectionTitle={empSectionTitle}
                              setSectionTitle={setEmpSectionTitle}
                              isEditingTitle={isEditingEmpTitle}
                              setIsEditingTitle={setIsEditingEmpTitle}
                            />
                          </div>
                        )
                      }
                      {
                        step === 3 && (
                          <div>
                            <EducationNew
                              register={register}
                              education={education}
                              setEducation={setEducation}
                              watch={watch}
                              control={control}
                              fields={eduFields}
                              append={eduAppend}
                              remove={eduRemove}
                              move={eduMove}
                              sectionTitle={eduSectionTitle}
                              setSectionTitle={setEduSectionTitle}
                              isEditingTitle={isEditingEduTitle}
                              setIsEditingTitle={setIsEditingEduTitle}
                            />
                          </div>
                        )
                      }
                      {
                        step === 4 && (
                          <div>
                            <SkillsNew
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
                              sectionTitle={skillSectionTitle}
                              setSectionTitle={setSkillSectionTitle}
                              isEditingTitle={isEditingSkillTitle}
                              setIsEditingTitle={setIsEditingSkillTitle}
                            />
                          </div>
                        )
                      }
                      {
                        step === 5 && (
                          <div>
                            <PersonalSummary
                              register={register}
                              watch={watch}
                            />
                          </div>
                        )
                      }

                      {/* Dynamic Sections Rendering */}
                      {(() => {
                        const currentStepObj = STEPS.find(s => s.id === step);
                        if (currentStepObj && currentStepObj.sectionId === 'courses') {
                          return (
                            <div>
                              <Courses
                                register={register}
                                watch={watch}
                                control={control}
                                fields={coursesFields}
                                append={coursesAppend}
                                remove={coursesRemove}
                                move={coursesMove}
                              />
                            </div>
                          );
                        }
                        if (currentStepObj && currentStepObj.sectionId === 'hobbies') {
                          return (
                            <div>
                              <Hobbies register={register} />
                            </div>
                          );
                        }
                        if (currentStepObj && currentStepObj.sectionId === 'extra_curricular') {
                          return (
                            <div>
                              <Activities
                                register={register}
                                watch={watch}
                                control={control}
                                fields={activitiesFields}
                                append={activitiesAppend}
                                remove={activitiesRemove}
                                move={activitiesMove}
                              />
                            </div>
                          );
                        }

                        if (currentStepObj && currentStepObj.sectionId === 'languages') {
                          return (
                            <div>
                              <Languages
                                register={register}
                                watch={watch}
                                control={control}
                                fields={languageFields}
                                append={languageAppend}
                                remove={languageRemove}
                                move={languageMove}
                              />
                            </div>
                          );
                        }

                        if (currentStepObj && currentStepObj.sectionId === 'internships') {
                          return (
                            <div>
                              <Internships
                                register={register}
                                watch={watch}
                                control={control}
                                fields={internshipFields}
                                append={internshipAppend}
                                remove={internshipRemove}
                                move={internshipMove}
                              />
                            </div>
                          );
                        }
                        if (currentStepObj && currentStepObj.sectionId === 'internships') {
                          return (
                            <div>
                              <Internships
                                register={register}
                                watch={watch}
                                control={control}
                                fields={internshipFields}
                                append={internshipAppend}
                                remove={internshipRemove}
                                move={internshipMove}
                              />
                            </div>
                          );
                        }

                        if (currentStepObj && (currentStepObj.sectionId === 'custom' || (typeof currentStepObj.sectionId === 'string' && currentStepObj.sectionId.startsWith('custom_')))) {
                          return (
                            <div>
                              <CustomSection
                                key={currentStepObj.sectionId}
                                sectionId={currentStepObj.sectionId}
                                register={register}
                                watch={watch}
                                control={control}
                                setValue={setValue}
                                fields={customFields}
                                append={customAppend}
                                remove={customRemove}
                                move={customMove}
                                removeSection={() => setActiveSections(prev => prev.filter(s => s !== currentStepObj.sectionId))}
                              />
                            </div>
                          );
                        }
                        return null;
                      })()}

                      {
                        // Check if current step is the "Add Section" step
                        STEPS.find(s => s.id === step)?.isAddSectionStep && (
                          <div>
                            <AddSection
                              onSelectSection={(sectionId) => {
                                if (sectionId === 'courses') {
                                  if (!activeSections.includes('courses')) {
                                    setActiveSections([...activeSections, 'courses']);
                                  } else {
                                    toast.info("Section already added!");
                                  }
                                } else if (sectionId === 'hobbies') {
                                  if (!activeSections.includes('hobbies')) {
                                    setActiveSections([...activeSections, 'hobbies']);
                                  } else {
                                    toast.info("Section already added!");
                                  }
                                } else if (sectionId === 'extra_curricular') {
                                  if (!activeSections.includes('extra_curricular')) {
                                    setActiveSections([...activeSections, 'extra_curricular']);
                                  } else {
                                    toast.info("Section already added!");
                                  }
                                } else if (sectionId === 'languages') {
                                  if (!activeSections.includes('languages')) {
                                    setActiveSections([...activeSections, 'languages']);
                                  } else {
                                    toast.info("Section already added!");
                                  }
                                } else if (sectionId === 'internships') {
                                  if (!activeSections.includes('internships')) {
                                    setActiveSections([...activeSections, 'internships']);
                                  } else {
                                    toast.info("Section already added!");
                                  }
                                } else if (sectionId === 'custom') {
                                  const newId = `custom_${Date.now()}`;
                                  setActiveSections([...activeSections, newId]);
                                  toast.success("Custom Section Added!");
                                } else {
                                  console.log("Selected section:", sectionId);
                                  toast.info(`Clicked ${sectionId} - Feature coming soon!`);
                                }
                              }}
                            />
                          </div>
                        )
                      }



                    </div>

                    <div className='flex justify-between items-center px-8 py-3 border-t border-[#e7e8ec]'>

                      <div className='w-3/12'>
                        <button
                          type="button"
                          onClick={prevStep}
                          disabled={step === 1}
                          className={`text-sm font-medium ${step === 1 ? 'invisible' : 'text-gray-500'} rounded-4xl bg-[#800080] px-4 py-2 text-white font-sm text-sm hover:bg-[#df8cdf]`}
                        >
                          Back
                        </button>
                      </div>

                      <div className=''>
                        <button
                          type="submit"
                          className='rounded-4xl cursor-pointer bg-[#800080] px-4 py-2 text-white font-sm text-sm hover:bg-[#df8cdf]'
                        >
                          {step === STEPS.length ? (
                            "Finish"
                          ) : (
                            `Next: ${STEPS.find(s => s.id === step + 1)?.title}`
                          )}
                        </button>
                      </div>
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
                resumeSettings={resumeSettings}
                setResumeSettings={setResumeSettings}
              />
            }
            <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50">
              {savingStatus === 'saving' && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/80 backdrop-blur text-white text-xs font-medium shadow-lg animate-pulse">
                  <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Saving changes...
                </div>
              )}

              {savingStatus === 'saved' && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-xs font-medium shadow-lg animate-fade-in">
                  <AiFillSave className="text-sm" />
                  Saved successfully
                </div>
              )}

              {savingStatus === 'error' && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-xs font-medium shadow-lg animate-shake">
                  ❌ Save failed
                </div>
              )}
            </div>
          </div>

          <div className='lg:w-6/12 bg-[#ffffff] rounded-[8px]'>
            <div className='flex items-center justify-between'>
              <div className='lg:flex items-center gap-3'>
              </div>
            </div>
            <div ref={componentRef} className=''>
              <ActiveResume formData={formValues} empHistory={empHistory} themeColor={themeColor} resumeSettings={resumeSettings} />
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}

export default page