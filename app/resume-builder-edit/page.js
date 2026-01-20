'use client';
import { DndContext, closestCenter, TouchSensor, MouseSensor, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';

// Fixing import if needed, assuming file is newLanguageEdit.js but export default is named or standard.

// ... existing imports ...

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
import { getSingleResume, saveResumeNew } from '../reducers/ResumeSlice';
import isEqual from 'lodash.isequal';


const page = () => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const { loading, singleResumeInfo } = useSelector((state) => state?.resume)
  const { profileData } = useSelector((state) => state?.profile)
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);
  const searchParams = useSearchParams();
  // const template = searchParams.get("template");
  console.log("searchParams", searchParams);
  const resume_id = searchParams.get('id')
  const resume_type = searchParams.get('fetch')
  console.log("resume_id", resume_id);
  console.log("resume_type", resume_type);




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
  const [sectionOrder, setSectionOrder] = useState([
    'summary', 'employment', 'education', 'skills', 'courses', 'hobbies', 'activities', 'languages', 'internships', 'custom'
  ]);

  // Auto-Save State
  const [resumeIds, setResumeIds] = useState({ mongo_id: null, mysql_id: null });
  const [savingStatus, setSavingStatus] = useState('unsaved'); // 'saved', 'saving', 'error', 'unsaved'
  const lastSavedData = useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSectionOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

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
    reset,
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
    console.log("Manual Save / Final data:", data);
    // Optional: Trigger immediate save on submit if needed, 
    // but auto-save handles it. We can force a save here too.
    setSavingStatus('saving');
    const dataToSave = {
      ...data,
      resume_type: resume_type || "scratch",
      mongo_id: resumeIds.mongo_id,
      mysql_id: resumeIds.mysql_id
    };

    dispatch(saveResumeNew(dataToSave)).then((res) => {
      if (res.payload && res.payload.status_code === 200) {
        setSavingStatus('saved');
        lastSavedData.current = JSON.parse(JSON.stringify(data));
        toast.success("Resume saved successfully!");
      } else {
        setSavingStatus('error');
        toast.error("Failed to save resume.");
      }
    });
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

  useEffect(() => {
    dispatch(getSingleResume({
      id: resume_id,
      fetch: resume_type
    }))
  }, [resume_id, resume_type])
  console.log("singleResumeInfo", singleResumeInfo);

  useEffect(() => {
    if (singleResumeInfo?.data?.data) {
      const resumeData = singleResumeInfo.data.data;
      reset(resumeData);

      // Update local states for accordion lists
      if (resumeData.employmentHistory?.length > 0) {
        setEmpHistory(resumeData.employmentHistory.map((_, i) => ({ id: i + 1 })));
      }
      if (resumeData.educationHistory?.length > 0) {
        setEducation(resumeData.educationHistory.map((_, i) => ({ id: i + 1 })));
      }
      if (resumeData.newSkillHistory?.length > 0) {
        setNewSkill(resumeData.newSkillHistory.map((_, i) => ({ id: i + 1 })));
      }

      // Update profile image preview
      if (resumeData.profileImage) {
        setSelectedImage(resumeData.profileImage);
      }

      // Show additional details section if relevant fields strictly exist
      if (resumeData.postal_code || resumeData.driving_licence || resumeData.dob || resumeData.birth_place || resumeData.nationality) {
        setShowAdditionalDetails(true);
      }

      // Determine active sections based on data
      const newActiveSections = [];
      if (resumeData.employmentHistory?.length > 0) newActiveSections.push('employment');
      if (resumeData.educationHistory?.length > 0) newActiveSections.push('education');
      if (resumeData.newSkillHistory?.length > 0) newActiveSections.push('skills');
      if (resumeData.coursesHistory?.length > 0) newActiveSections.push('courses');
      if (resumeData.activityHistory?.length > 0) newActiveSections.push('activities');
      if (resumeData.languageHistory?.length > 0) newActiveSections.push('languages');
      if (resumeData.internshipHistory?.length > 0) newActiveSections.push('internships');
      if (resumeData.hobbies && resumeData.hobbies.trim() !== "") newActiveSections.push('hobbies');
      if (resumeData.summary && resumeData.summary.trim() !== "") newActiveSections.push('summary'); // Assuming 'summary' field exists

      // Set IDs for Auto-Save
      if (resumeData._id || resumeData.mongo_id || resumeData.id || resumeData.mysql_id) {
        setResumeIds({
          mongo_id: resumeData.mongo_id || resumeData._id,
          mysql_id: resumeData.mysql_id || resumeData.id
        });
        // Set initial status to 'saved' since we just loaded from server
        setSavingStatus('saved');
      }

      // Initialize lastSavedData to match the loaded data
      lastSavedData.current = resumeData;

      // Check for dynamic custom section keys (e.g., customSectionHistory_custom_...)
      const customKeys = Object.keys(resumeData).filter(key => key.startsWith('customSectionHistory_custom_'));
      if (resumeData.customSectionHistory?.length > 0) {
        newActiveSections.push('custom');
      } else if (customKeys.length > 0) {
        const dynamicKey = customKeys[0];
        const timestamp = dynamicKey.split('customSectionHistory_custom_')[1];
        const dynamicTitleKey = `customSectionTitle_custom_${timestamp}`;

        const sectionData = resumeData[dynamicKey];
        const sectionTitle = resumeData[dynamicTitleKey];

        if (sectionData && sectionData.length > 0) {
          setValue('customSectionHistory', sectionData);
          if (sectionTitle) {
            setValue('customSectionTitle', sectionTitle);
          }
          newActiveSections.push('custom');
        }
      }

      setActiveSections(prev => {
        // Merge with existing active sections to avoid removing ones user explicitly added in this session if any (though usually we reset on load)
        // Actually, if we are loading data, we should probably set the base state.
        const unique = new Set([...prev, ...newActiveSections]);
        return Array.from(unique);
      });
    }
  }, [singleResumeInfo, reset, setValue]);

  // --- Auto-Save Effect ---
  useEffect(() => {
    // We want to auto-save even if we don't have IDs yet (initial creation), 
    // BUT we must avoid saving empty/default forms immediately on load unless user has typed something (dirty).
    // Ideally, we check formstate.isDirty, but we are using `watch` values.

    // Normalization
    const currentDataNormalized = JSON.parse(JSON.stringify(formValues));

    // Check if data is essentially empty (default state) to prevent empty creation?
    // Or just rely on equality check against lastSavedData.

    // Logic:
    // 1. If we have IDs: Check if data changed. If yes, UPDATE.
    // 2. If we DON'T have IDs: Check if data changed from "initial default". If yes, CREATE.

    // Since lastSavedData.current might be null initially (if new resume).
    // If lastSavedData is null, and currentData is just default form values, we might skip?
    // But how do we know default?

    // Improved Logic:
    // If lastSavedData is set, compare.
    // If lastSavedData is NOT set (first run or new resume):
    //    If we have IDs (loaded resume), we set lastSavedData in previous effect, so this shouldn't be null unless race condition.
    //    If we Don't have IDs (new resume), lastSavedData is null. We should probably set it to currentData on mount to establish baseline?
    //    OR we just let the first save happen after 2s if user typed?

    if (lastSavedData.current && isEqual(currentDataNormalized, lastSavedData.current)) {
      return; // Data hasn't changed
    }

    // If it's a new resume (no IDs) and lastSavedData is null (never saved), 
    // we might want to ensure user actually entered something.
    // But `formValues` will differ from `null`.

    // Let's use a flag or simple check:
    // If no IDs and form is default checks? 
    // Simply: Proceed to save. The debounce handles rapid typing. 
    // If it's strictly empty, backend might handle it or we create empty resume. 
    // Most users start typing immediately.

    setSavingStatus('saving');
    const timeoutId = setTimeout(() => {
      const currentData = JSON.parse(JSON.stringify(formValues));

      const dataToSave = {
        ...currentData,
        resume_type: resume_type || "scratch",
        mongo_id: resumeIds.mongo_id,
        mysql_id: resumeIds.mysql_id
      };

      dispatch(saveResumeNew(dataToSave)).then((res) => {
        if (res.payload && res.payload.status_code === 200) {
          setSavingStatus('saved');
          lastSavedData.current = currentData;

          // If we just created it (didn't have IDs), update IDs now
          if (!resumeIds.mongo_id) {
            const newMongoId = res.payload.sectionsdata?.mongo_id;
            const newMysqlId = res.payload.sectionsdata?.mysql_id;
            if (newMongoId && newMysqlId) {
              setResumeIds({
                mongo_id: newMongoId,
                mysql_id: newMysqlId
              });
            }
          }
        } else {
          console.error("Auto-save failed:", res);
          setSavingStatus('error');
        }
      });
    }, 2000); // 2 second debounce

    return () => clearTimeout(timeoutId);
  }, [formValues, resumeIds, resume_type, dispatch]);
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
                    <div className='flex items-center gap-2 mt-2'>
                      {savingStatus === 'saving' && <span className="text-gray-500 text-xs font-medium italic flex items-center gap-1">💾 Saving...</span>}
                      {savingStatus === 'saved' && <span className="text-green-600 text-xs font-medium flex items-center gap-1"><AiFillSave /> Saved</span>}
                      {savingStatus === 'error' && <span className="text-red-500 text-xs font-medium">❌ Save Error</span>}
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
                                <label className="block text-sm font-medium text-gray-700 mb-5">
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

                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={sectionOrder}
                        strategy={verticalListSortingStrategy}
                      >
                        {sectionOrder.map((sectionId) => {
                          if (!activeSections.includes(sectionId)) return null;

                          return (
                            <SortableSection
                              key={sectionId}
                              id={sectionId}
                              title={
                                sectionId === 'employment' ? "Employment History" :
                                  sectionId === 'education' ? "Education" :
                                    sectionId === 'skills' ? "Skills" :
                                      sectionId === 'summary' ? "Personal Summary" :
                                        sectionId === 'courses' ? "Courses" :
                                          sectionId === 'hobbies' ? "Hobbies" :
                                            sectionId === 'activities' ? "Activities" :
                                              sectionId === 'languages' ? "Languages" :
                                                sectionId === 'internships' ? "Internships" :
                                                  sectionId === 'custom' ? (watch('customSectionTitle') || "Custom Section") :
                                                    "Section"
                              }
                            >
                              {sectionId === 'employment' && (
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
                                  noHeader={true}
                                />
                              )}
                              {sectionId === 'education' && (
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
                                  noHeader={true}
                                />
                              )}
                              {sectionId === 'skills' && (
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
                                  noHeader={true}
                                />
                              )}
                              {sectionId === 'summary' && (
                                <PersonalSummaryEdit
                                  register={register}
                                  watch={watch}
                                  noHeader={true}
                                />
                              )}
                              {sectionId === 'courses' && (
                                <CoursesEdit
                                  register={register}
                                  watch={watch}
                                  control={control}
                                  fields={coursesFields}
                                  append={coursesAppend}
                                  remove={coursesRemove}
                                  move={coursesMove}
                                  noHeader={true}
                                />
                              )}
                              {sectionId === 'hobbies' && (
                                <HobbiesEdit register={register} noHeader={true} />
                              )}
                              {sectionId === 'activities' && (
                                <ActivitiesEdit
                                  register={register}
                                  watch={watch}
                                  control={control}
                                  fields={activitiesFields}
                                  append={activitiesAppend}
                                  remove={activitiesRemove}
                                  move={activitiesMove}
                                  noHeader={true}
                                />
                              )}
                              {sectionId === 'languages' && (
                                <LanguagesEdit
                                  register={register}
                                  watch={watch}
                                  control={control}
                                  fields={languageFields}
                                  append={languageAppend}
                                  remove={languageRemove}
                                  move={languageMove}
                                  noHeader={true}
                                />
                              )}
                              {sectionId === 'internships' && (
                                <InternshipsEdit
                                  register={register}
                                  watch={watch}
                                  control={control}
                                  fields={internshipFields}
                                  append={internshipAppend}
                                  remove={internshipRemove}
                                  move={internshipMove}
                                  noHeader={true}
                                />
                              )}
                              {sectionId === 'custom' && (
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
                                  noHeader={true}
                                />
                              )}
                            </SortableSection>
                          );
                        })}
                      </SortableContext>
                    </DndContext>
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


            </div>
            <div className='lg:flex items-center gap-3'>
              <div className='flex items-center gap-2 mr-4'>
                {console.log(savingStatus, "savingStatus")}
                {savingStatus === 'saving' && <span className="text-gray-500 text-sm font-medium italic">Saving...</span>}
                {savingStatus === 'saved' && <span className="text-green-600 text-sm font-medium flex items-center gap-1"><AiFillSave /> Saved</span>}
                {savingStatus === 'error' && <span className="text-red-500 text-sm font-medium">Save Error</span>}
              </div>


            </div>
          </div>
          <div ref={componentRef} className='border border-[#E5E5E5] rounded-[8px] mb-4'>
            <ActiveResume formData={formValues} empHistory={empHistory} themeColor={themeColor} sectionOrder={sectionOrder} />



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