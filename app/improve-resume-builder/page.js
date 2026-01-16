'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import TipTapEditor from "../editor/TipTapEditor.jsx"
import { HiClipboardList } from "react-icons/hi";
import { MdOutlinePublishedWithChanges, MdPreview } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

import { RiDraggable } from "react-icons/ri";
import { HiSparkles } from "react-icons/hi2";
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

import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select, Progress, Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { jdBasedResumeAchivmentInfo, jdBasedResumeCertificateInfo, jdBasedResumeEducationInfo, jdBasedResumeLanguageInfo, jdBasedResumeBasicInfo, jdBasedResumeProjectsInfo, jdBasedResumeSkillsInfo, jdBasedResumeExpInfo, updateBasicInfo, updateExperience, updateEducation, updateSkills, updateLanguage, updateExtraProject, updateCertification, updateAchievements, getUpdateResumeInfo, atsScoreAnalyze, impBasedAtsScoreAnalyze, getImpEnhance, impEnhanceUsageInfo } from '../reducers/DashboardSlice';
import Template1 from '../temp/Template1';
import { useReactToPrint } from 'react-to-print';
import { useSearchParams } from 'next/navigation';
import Template2 from '../temp/Template2';
import { convertToSubmitFormat } from '../utils/DateSubmitFormatter';
import { saveAs } from "file-saver";
import PersonalInfoJd from './PersonalInfoJd';
import EducationJd from './EducationJd';
import WorkExpJd from './WorkExpJd';
import LanguageJd from './LanguageJd';
import SkillsJd from './SkillsJd';
import PersonalProjectJd from './PersonalProjectJd';
import CertificatesJd from './CertificatesJd';
import AchivmentsJd from './AchivmentsJd';
import { jdBasedResumeDetails } from '../reducers/DashboardSlice';
import ImpAtsScoreAnalyzeModal from '../modal/ImpAtsScoreAnalyzeModal';
import { addCountResume, addCountResumeOrg } from '../reducers/ResumeSlice';
import { toast, ToastContainer } from 'react-toastify';
import { ChevronDown, ChevronUp } from 'lucide-react';
// import htmlDocx from "html-docx-js/dist/html-docx";
// import juice from 'juice';
// import html2docx from "html2docx";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import DraggableWrapper from "./DraggableWrapper";
import DragIcon from './DragIcon';
import DynamicTemplate from '../temp/DynamicTemplate';
import GenerateWithAiModal from '../modal/GenerateWithAiModal';
import { HiDocumentText, HiArrowPath } from "react-icons/hi2";
import CorporateTemplate from '../TemplateNew/CorporateTemplate';
import { PiReadCvLogoDuotone } from 'react-icons/pi';
import { useTabs } from '../context/TabsContext.js';
import CustomizeResume from '../ui/CustomizeResume.jsx';


const page = () => {
  // const { improveResumeData } = useSelector((state) => state?.dash)
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const id = atob(searchParams.get("id"))
  // const user_id = sessionStorage.getItem('user_id');c
  const user_id = localStorage.getItem('user_id')
  const parseUserId = JSON.parse(user_id)
  const componentRef = useRef();
  const dispatch = useDispatch()
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [activeExp, setActiveExp] = useState(null);
  const [activeExpId, setActiveExpId] = useState(null);


  // useEffect(() => {
  //   dispatch(jdBasedResumeDetails({ jd_resume_id: id }))
  // }, [id])

  const { error, improveResumeData, loading, getUpdateResumeInfoData, atsScoreAnalyzeData, impEnUsageInfo } = useSelector((state) => state?.dash)


  // console.log("improveResumeData", improveResumeData);
  console.log("getUpdateResumeInfoData", getUpdateResumeInfoData);

 
  const [openJdAtsModal, setOpenJdAtsModal] = useState(false);
  const [atsData, setAtsData] = useState(null)
  const [enhancing, setEnhancing] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // const [resumeid, setResumeid] = useState();
  const { profileData } = useSelector((state) => state?.profile)

  const tabColors = [
    "#ffeaec", // 1st tab
    "#feebe3", // 2nd tab
    "#fff2cc", // 3rd tab
    "#e7f4ed", // 4th tab
    "#f1f2ff", // 5th tab
  ];
  const textColor = [
    "#fe7d8b", // 1st tab
    "#f68559", // 2nd tab
    "#ec930c", // 3rd tab
    "#48ba75", // 4th tab
    "#9ba1fb", // 5th tab
  ]

  const levels = [
    "Novice",
    "Beginner",
    "Skillful",
    "Experienced",
    "Expert",
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();








  // Dynamic ATS Score Component
  const ATSScoreComponent = ({ score, label = "Resume Score" }) => {
    const clamped = Math.min(Math.max(score || 0, 0), 100);
    const max = 100;
    const circumference = 2 * Math.PI * 60; // radius = 60
    const progress = (clamped / max) * circumference;

    // Color based on score
    let ringColor = "#ef4444"; // red
    let badgeBg = "bg-red-100 text-red-800";

    if (clamped >= 80) {
      ringColor = "#22c55e"; // green
      badgeBg = "bg-green-100 text-green-800";
    } else if (clamped >= 60) {
      ringColor = "#f59e0b"; // yellow
      badgeBg = "bg-yellow-100 text-yellow-800";
    }

    return (
      <div className="flex justify-center">
        <div
          className="flex flex-col items-center rounded-2xl bg-white p-4 shadow-lg"
          aria-label={`${label}: ${clamped} out of ${max}`}
          role="img"
        >
          <div style={{ width: 140, height: 140 }} className="relative">
            <svg
              width={140}
              height={140}
              viewBox="0 0 140 140"
              className="block"
            >
              {/* Track */}
              <circle
                cx={70}
                cy={70}
                r={60}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={12}
              />
              {/* Progress */}
              <circle
                cx={70}
                cy={70}
                r={60}
                fill="none"
                stroke={ringColor}
                strokeWidth={12}
                strokeLinecap="round"
                strokeDasharray={`${progress} ${circumference - progress
                  }`}
                transform="rotate(-90 70 70)"
              />
            </svg>

            {/* Center value */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-700">
                {clamped}/{max}
              </span>
            </div>
          </div>

          {/* Label badge */}
          <div
            className={`mt-3 rounded-lg px-3 py-1 text-sm font-semibold ${badgeBg}`}
          >
            {label}
          </div>
        </div>
      </div>
    );
  };

  const onSubmit = async (data) => {
    console.log("data", data);


  }

  const [sections, setSections] = useState([

    {
      id: 0,
      title: 'Skills',
      type: 'skills',
      skills: [
        { id: 's1', name: 'Java', level: 3 },
        { id: 's2', name: 'Python', level: 4 }
      ]
    },
    { id: 1, title: 'Professional Summary', type: 'summary' },
    {
      id: 2,
      title: 'Education',
      type: 'education',
      educations: [
        {
          id: 'e1',
          institute: 'Webskitters Academy',
          degree: 'Frontend Developer Training',
          startDate: '',
          endDate: '',
          city: 'Kolkata',
          description: ''
        },
        {
          id: 'e2',
          institute: 'Netaji Subhas Open University',
          degree: 'Bachelor of Arts',
          startDate: '',
          endDate: '',
          city: 'Bagnan, Howrah',
          description: ''
        }
      ]
    },
    {
      id: 3,
      title: "Certifications",
      type: "certifications",
      certifications: [
        {
          id: "c1",
          name: "Frontend Developer (React JS)",
          organization: "Webskitters Academy",
          city: "",
          startYear: "2024",
          endYear: "2025",
          description: ""
        },
        {
          id: "c2",
          name: "Code With Puja Contest Award",
          organization: "Webskitters Academy",
          city: "",
          startYear: "2024",
          endYear: "2025",
          description: ""
        }
      ]
    },
    {
      id: 4,
      title: "Experience",
      type: "experience",
      experiences: [
        {
          id: "x1",
          jobTitle: "Freelance HTML Developer",
          company: "Self-employed",
          city: "",
          startDate: "Sept, 2023",
          endDate: "May, 2024",
          description: "Developed responsive and user-friendly websites using HTML, CSS, JavaScript, and modern frontend best practices while converting Figma and PSD designs into pixel-perfect web pages with full cross-browser compatibility. Improved website performance and accessibility by optimizing layouts, images, and reusable components and worked directly with clients to understand requirements, implement revisions, and deliver high-quality projects within deadlines."
        },
        {
          id: "x2",
          jobTitle: "Frontend Developer (Trainee)",
          company: "Webskitters Technology Solutions",
          city: "",
          startDate: "Jun, 2024",
          endDate: "Apr, 2025",
          description: "Worked on real-world frontend applications using React.js, JavaScript, HTML, CSS, and Bootstrap by building reusable UI components and implementing dynamic features based on project requirements. Integrated REST APIs using Axios and React hooks, collaborated with designers and backend developers, fixed UI bugs, improved performance, and followed clean coding and best development practices."
        }
      ]
    }
  ]);
  const [draggedIndex, setDraggedIndex] = useState(null);




  // const handleDragStart = (e, index) => {
  //   setDraggedIndex(index);


  //   const dragTarget = e.currentTarget;
  //   e.dataTransfer.setDragImage(dragTarget, 20, 20);
  //   e.dataTransfer.effectAllowed = "move";
  // };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);

    const sectionEl = e.currentTarget.closest(".section-item");

    if (sectionEl) {
      e.dataTransfer.setDragImage(sectionEl, 20, 20);
    }
  };



  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow drop
    e.dataTransfer.dropEffect = "move"
  };


  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    if (draggedIndex === targetIndex) return;

    const updatedSections = [...sections];
    // 1. Remove the dragged item
    const [draggedItem] = updatedSections.splice(draggedIndex, 1);
    // 2. Insert it at the new target position
    updatedSections.splice(targetIndex, 0, draggedItem);

    setSections(updatedSections);
    setDraggedIndex(null);
  };


  // Add state to track which sub-skill is being dragged
  const [draggedSkillIndex, setDraggedSkillIndex] = useState(null);

  // --- Skill Drag Handlers ---
  const handleSkillDragStart = (e, index) => {
    e.stopPropagation(); // Stops the parent section from dragging
    setDraggedSkillIndex(index);
  };

  const handleSkillDrop = (e, sectionIndex, targetSkillIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedSkillIndex === null || draggedSkillIndex === targetSkillIndex) return;

    const updatedSections = [...sections];
    const skillsList = [...updatedSections[sectionIndex].skills];

    // Reorder the skills array
    const [movedSkill] = skillsList.splice(draggedSkillIndex, 1);
    skillsList.splice(targetSkillIndex, 0, movedSkill);

    updatedSections[sectionIndex].skills = skillsList;
    setSections(updatedSections);
    setDraggedSkillIndex(null);
  };


  const handleSkillUpdate = (sectionIndex, skillId, field, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].skills = updatedSections[sectionIndex].skills.map(sk =>
      sk.id === skillId ? { ...sk, [field]: value } : sk
    );
    setSections(updatedSections);
  };


  // for Education 
  const [draggedEducationIndex, setDraggedEducationIndex] = useState(null);
  const handleEducationDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedEducationIndex(index);
  };
  const handleEducationDrop = (e, sectionIndex, targetEduIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      draggedEducationIndex === null ||
      draggedEducationIndex === targetEduIndex
    ) return;

    const updatedSections = [...sections];
    const educationList = [...updatedSections[sectionIndex].educations];

    const [movedEdu] = educationList.splice(draggedEducationIndex, 1);
    educationList.splice(targetEduIndex, 0, movedEdu);

    updatedSections[sectionIndex].educations = educationList;
    setSections(updatedSections);
    setDraggedEducationIndex(null);
  };
  const handleEducationUpdate = (sectionIndex, eduId, field, value) => {
    const updatedSections = [...sections];

    updatedSections[sectionIndex].educations =
      updatedSections[sectionIndex].educations.map(edu =>
        edu.id === eduId ? { ...edu, [field]: value } : edu
      );

    setSections(updatedSections);
  };

  const handleAddEducation = (sectionIndex) => {
    const updatedSections = [...sections];

    const newEducation = {
      id: `e${Date.now()}`, // temporary unique id
      institute: "",
      degree: "",
      startDate: "",
      endDate: "",
      city: "",
      description: ""
    };

    updatedSections[sectionIndex].educations = [
      ...updatedSections[sectionIndex].educations,
      newEducation
    ];

    setSections(updatedSections);
  };

  // for certificates
  const [draggedCertIndex, setDraggedCertIndex] = useState(null);

  const handleCertDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedCertIndex(index);
  };

  const handleCertDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedCertIndex === null || draggedCertIndex === targetIndex) return;

    const updatedSections = [...sections];
    const certList = [...updatedSections[sectionIndex].certifications];

    const [movedCert] = certList.splice(draggedCertIndex, 1);
    certList.splice(targetIndex, 0, movedCert);

    updatedSections[sectionIndex].certifications = certList;
    setSections(updatedSections);
    setDraggedCertIndex(null);
  };

  const handleCertUpdate = (sectionIndex, certId, field, value) => {
    const updatedSections = [...sections];

    updatedSections[sectionIndex].certifications =
      updatedSections[sectionIndex].certifications.map(cert =>
        cert.id === certId ? { ...cert, [field]: value } : cert
      );

    setSections(updatedSections);
  };


  const handleAddCertification = (sectionIndex) => {
    const updatedSections = [...sections];

    const newCert = {
      id: `c${Date.now()}`,
      name: "",
      organization: "",
      city: "",
      startYear: "",
      endYear: "",
      description: ""
    };

    updatedSections[sectionIndex].certifications = [
      ...updatedSections[sectionIndex].certifications,
      newCert
    ];

    setSections(updatedSections);
  };

  // for experince 
  const [draggedExpIndex, setDraggedExpIndex] = useState(null);

  const handleExpDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedExpIndex(index);
  };

  const handleExpDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedExpIndex === null || draggedExpIndex === targetIndex) return;

    const updatedSections = [...sections];
    const list = [...updatedSections[sectionIndex].experiences];

    const [moved] = list.splice(draggedExpIndex, 1);
    list.splice(targetIndex, 0, moved);

    updatedSections[sectionIndex].experiences = list;
    setSections(updatedSections);
    setDraggedExpIndex(null);
  };

  const handleExpUpdate = (sectionIndex, expId, field, value) => {
    const updatedSections = [...sections];

    updatedSections[sectionIndex].experiences =
      updatedSections[sectionIndex].experiences.map(exp =>
        exp.id === expId ? { ...exp, [field]: value } : exp
      );

    setSections(updatedSections);
  };

  const handleAddExperience = (sectionIndex) => {
    const updatedSections = [...sections];

    updatedSections[sectionIndex].experiences.push({
      id: `x${Date.now()}`,
      jobTitle: "",
      company: "",
      city: "",
      startDate: "",
      endDate: "",
      description: ""
    });

    setSections(updatedSections);
  };



  const { activeTab } = useTabs();

  return (
    <div className='lg:flex gap-1 pb-0'>
      <ToastContainer />

      <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] mb-4 lg:mb-0'>
        {activeTab === 'edit' ? <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className='mb-10'>
              <div className='bg-white rounded-sm p-5 mb-[4px]'>
                <div className='mb-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <span className='bg-[#f6efff] rounded-[5px] px-2 py-1 text-[14px] text-[#800080] font-bold'>100%</span>
                    <span className='text-[#828ba2] text-[14px] leading-[20px] font-normal'>Resume ATS Score</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Progress progress={45} size="sm" className="[&>div]:bg-[#800080]" />
                  </div>
                </div>


                <div className="flex items-center">
                  <button
                    className="
                    flex items-center gap-1
                    text-sm font-thin
                    text-[#800080] hover:text-[#e799e7]
                    transition-all duration-200
                    cursor-pointer
                  "
                  >
                    <PiReadCvLogoDuotone className='text-lg' />
                    Existing Resume
                  </button>

                  <div className="flex-1 flex justify-center">
                    <button
                      className="
                        flex items-center gap-1
                        text-sm font-thin
                        text-[#800080] hover:text-[#e799e7]
                        transition-all duration-200 cursor-pointer
                      "
                    >
                      <MdOutlinePublishedWithChanges className="text-lg" />
                      Changed Resume
                    </button>
                  </div>
                </div>


              </div>

              <div className='acco_section'>
                <Accordion className='mb-[4px]'>
                  <AccordionPanel>
                    <AccordionTitle className='font-bold text-xl'>Personal Details</AccordionTitle>
                    <AccordionContent className='pt-0'>
                      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">


                        <div className="md:col-span-2">
                          <label className="block !text-sm !font-medium !text-gray-500">
                            Job Title
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Your Job Title"
                            className="mt-1 w-full rounded-lg"
                            {...register("job_title")}
                          />
                        </div>


                        <div>
                          <label className="block !text-sm !font-medium !text-gray-500">
                            First Name
                          </label>
                          <input
                            type="text"
                            placeholder="First Name"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            {...register("first_name")}
                          />
                        </div>


                        <div>
                          <label className="block !text-sm !font-medium !text-gray-500">
                            Last Name
                          </label>
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            {...register("last_name")}
                          />
                        </div>


                        <div>
                          <label className="block !text-sm !font-medium !text-gray-500">
                            Email
                          </label>
                          <input
                            type="text"
                            placeholder="Email"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            {...register("email_add")}
                          />
                        </div>


                        <div>
                          <label className="block !text-sm !font-medium !text-gray-500">
                            Phone
                          </label>
                          <input
                            type="text"
                            placeholder="Phone No."
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            {...register("phone_no")}
                          />
                        </div>


                        <div className="md:col-span-2">
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


                        <div>
                          <label className="block !text-sm !font-medium !text-gray-500">
                            City, State
                          </label>
                          <input
                            type="text"
                            placeholder="City, State"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            {...register("city_state")}
                          />
                        </div>


                        <div>
                          <label className="block !text-sm !font-medium !text-gray-500">
                            Country
                          </label>
                          <input
                            type="text"
                            placeholder="Country"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            {...register("country")}
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

                        {showAdditionalDetails && (
                          <>
                            <div className="md:col-span-2">
                              <label className="block !text-sm !font-medium !text-gray-500">
                                Address
                              </label>
                              <input
                                type="text"
                                placeholder="Enter your address"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                {...register("address")}
                              />
                            </div>


                            <div>
                              <label className="block !text-sm !font-medium !text-gray-500">
                                Nationality
                              </label>
                              <input
                                type="text"
                                placeholder="Nationality"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                {...register("nationality")}
                              />
                            </div>


                            <div>
                              <label className="block !text-sm !font-medium !text-gray-500">
                                Place of Birth
                              </label>
                              <input
                                type="text"
                                placeholder="City, Country"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                {...register("birth_place")}
                              />
                            </div>


                            <div>
                              <label className="block !text-sm !font-medium !text-gray-500">
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                {...register("dob")}
                              />
                            </div>


                            <div>
                              <label className="block !text-sm !font-medium !text-gray-500">
                                Driving License
                              </label>
                              <input
                                type="text"
                                placeholder="License Number"
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                {...register("driving_licence")}
                              />
                            </div>
                          </>
                        )}

                      </form>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>


                <div className="space-y-2">
                  {
                    sections.map((section, index) => (
                      <div
                        key={section.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`
                            mb-[4px] transition-all duration-200 bg-white rounded-xl border
                            ${draggedIndex === index
                            ? "opacity-20 border-cyan-500 scale-95" // The "hole" left behind
                            : "opacity-100 border-gray-200 shadow-sm hover:shadow-md hover:border-cyan-300"
                          }`}
                      >
                        <Accordion flush={true}>

                          <AccordionPanel>
                            <AccordionTitle className='font-bold text-xl'>
                              <span
                                className="drag-wrapper cursor-grab active:cursor-grabbing"
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnd={handleDragEnd}
                              >
                                <RiDraggable className="text-xl text-[#656e83] hover:text-[#800080]" />
                                <span className="tooltip">Click and drag to move</span>
                              </span>
                              {section.title}
                            </AccordionTitle>
                            <AccordionContent className='pt-0'>
                              {
                                section.type === 'skills' && (
                                  <>
                                    <p className="!text-sm !font-medium !text-gray-500 mb-4">
                                      Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing
                                      (especially when applying via an online system).
                                    </p>
                                    {

                                      section.skills.map((skill, sIndex) => (
                                        <div
                                          key={skill.id}
                                          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                          onDrop={(e) => handleSkillDrop(e, index, sIndex)}
                                          className={`transition-all duration-200 rounded-lg border 
                              ${draggedSkillIndex === sIndex
                                              ? "opacity-20 border-cyan-500 scale-95"
                                              : "bg-white border-gray-200 shadow-sm"
                                            }`}>
                                          <div className="flex items-start gap-2">
                                            <span
                                              className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
                                              draggable
                                              onDragStart={(e) => handleSkillDragStart(e, sIndex)}
                                              onDragEnd={() => setDraggedSkillIndex(null)}
                                            >
                                              <RiDraggable className="text-xl text-[#656e83] hover:text-[#800080]" />
                                              <span className="tooltip">Click and drag to move</span>
                                            </span>
                                            <Accordion collapseAll className='overflow-hidden !border !border-gray-300 mb-2 w-full'>
                                              <AccordionPanel className=''>
                                                <AccordionTitle className='font-bold text-sm'>

                                                  {skill.name}
                                                </AccordionTitle>
                                                <AccordionContent className='pt-0'>

                                                  <div className='flex gap-10'>
                                                    <div className='w-6/12'>
                                                      <Label className="!text-sm !font-medium !text-gray-500">Skill</Label>
                                                      <input
                                                        type="text"
                                                        value={skill.name}
                                                        placeholder="Your Skill"
                                                        onChange={(e) => handleSkillUpdate(index, skill.id, 'name', e.target.value)}
                                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                                      />
                                                    </div>
                                                    <div className='w-6/12 '

                                                    >
                                                      <Label className="!text-sm !font-medium !text-gray-500">Level - <span className="font-semibold"
                                                        style={{ color: textColor[skill.level] }}
                                                      >
                                                        {/* {levels[selectedIndex]} */}
                                                        {levels[skill.level]}
                                                      </span></Label>
                                                      <div className='label_tab_area transition-all duration-300 rounded-[5px] p-0'
                                                        style={{ backgroundColor: tabColors[skill.level] }}
                                                      >
                                                        <Tabs
                                                          // selectedIndex={selectedIndex} onSelect={setSelectedIndex}
                                                          selectedIndex={skill.level} // Use level from the skill object
                                                          onSelect={(tabIndex) => handleSkillUpdate(index, skill.id, 'level', tabIndex)}
                                                        >
                                                          <TabList>
                                                            <Tab>&nbsp;</Tab>
                                                            <Tab>&nbsp;</Tab>
                                                            <Tab>&nbsp;</Tab>
                                                            <Tab>&nbsp;</Tab>
                                                            <Tab>&nbsp;</Tab>
                                                          </TabList>
                                                        </Tabs>
                                                      </div>
                                                    </div>
                                                  </div>

                                                </AccordionContent>
                                              </AccordionPanel>
                                            </Accordion>
                                          </div>
                                        </div>

                                      ))

                                    }


                                  </>
                                )
                              }

                              {section.type === "summary" && (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <p className="!text-sm !font-medium !text-gray-500 mb-4">
                                      Write 2-4 short, energetic sentences about how great you are...
                                    </p>
                                  </div>

                                  <TipTapEditor
                                    value={watch("goal") || ""}
                                    onChange={(text) => setValue("goal", text)}
                                  />

                                  <div className="relative flex justify-end mt-1">
                                    <button
                                      type="button"
                                      onClick={() => setAiModalOpen(true)}
                                      className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080] font-medium hover:!bg-[#800080] hover:!text-white"
                                    >
                                      <HiSparkles />
                                      Get help with writing
                                    </button>

                                    <GenerateWithAiModal
                                      open={aiModalOpen}
                                      onClose={() => setAiModalOpen(false)}
                                      aiType="imp_summary"
                                      initialText={watch("goal") || ""}
                                      onApply={(text) => setValue("goal", text)}
                                    />
                                  </div>
                                </div>
                              )}


                              {
                                section.type === "education" && (
                                  <>
                                    {/* Section intro text */}
                                    <p className="!text-sm !font-medium !text-gray-500 pb-2">
                                      A varied education on your resume sums up the value that your learnings
                                      and background will bring to job.
                                    </p>

                                    {section.educations.map((edu, eIndex) => (
                                      <div
                                        key={edu.id}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => handleEducationDrop(e, index, eIndex)}
                                        className="transition-all duration-200 rounded-sm mb-3"
                                      >
                                        <div className="flex items-start gap-2">
                                          <span
                                            className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
                                            draggable
                                            onDragStart={(e) => handleEducationDragStart(e, eIndex)}
                                            onDragEnd={handleDragEnd}
                                          >
                                            <RiDraggable className="text-xl text-[#656e83] hover:text-[#800080]" />
                                            <span className="tooltip">Click and drag to move</span>
                                          </span>
                                          <Accordion
                                            collapseAll
                                            className="w-full overflow-hidden !border !border-gray-300 rounded-lg"
                                          >
                                            <AccordionPanel>
                                              <AccordionTitle className="font-semibold text-sm">
                                                {edu.institute?.trim()
                                                  ? edu.institute
                                                  : "(Not specified)"}
                                              </AccordionTitle>
                                              <AccordionContent className="pt-0">
                                                <div className="grid grid-cols-2 gap-4 mb-4">

                                                  <div>
                                                    <Label className="!text-sm !font-medium !text-gray-500">School</Label>
                                                    <input
                                                      value={edu.institute}
                                                      onChange={(e) =>
                                                        handleEducationUpdate(index, edu.id, "institute", e.target.value)
                                                      }
                                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                    />
                                                  </div>

                                                  <div>
                                                    <Label className="!text-sm !font-medium !text-gray-500">Degree</Label>
                                                    <input
                                                      value={edu.degree}
                                                      onChange={(e) =>
                                                        handleEducationUpdate(index, edu.id, "degree", e.target.value)
                                                      }
                                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                    />
                                                  </div>

                                                  <div>
                                                    <Label className="!text-sm !font-medium !text-gray-500">Start Date</Label>
                                                    <input
                                                      placeholder="MM / YYYY"
                                                      value={edu.startDate}
                                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                    />
                                                  </div>

                                                  <div>
                                                    <Label className="!text-sm !font-medium !text-gray-500">End Date</Label>
                                                    <input
                                                      placeholder="MM / YYYY"
                                                      value={edu.endDate}
                                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                    />
                                                  </div>

                                                  <div className="col-span-2">
                                                    <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                                                    <input
                                                      value={edu.city}
                                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                    />
                                                  </div>

                                                </div>
                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                                  <TipTapEditor
                                                    placeholder="e.g. Graduated with High Honors."
                                                    value={edu.description}
                                                    onChange={(e) =>
                                                      handleEducationUpdate(index, edu.id, "description", e.target.value)
                                                    }
                                                  />
                                                </div>

                                              </AccordionContent>
                                            </AccordionPanel>
                                          </Accordion>
                                        </div>
                                      </div>
                                    ))}

                                    {/* Add more */}
                                    <button
                                      type="button"
                                      onClick={() => handleAddEducation(index)}
                                      className="!text-sm !text-[#800080] font-medium mt-2"
                                    >
                                      + Add one more education
                                    </button>
                                  </>
                                )
                              }
                              {section.type === "certifications" && (
                                <>
                                  <p className="!text-sm !font-medium !text-gray-500 mb-4">
                                    Certifications can strengthen your profile by highlighting verified skills.
                                  </p>

                                  {section.certifications.map((cert, cIndex) => (
                                    <div
                                      key={cert.id}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => handleCertDrop(e, index, cIndex)}
                                      className="transition-all duration-200 mb-3"
                                    >
                                      <div className="flex items-start gap-2">

                                        {/* Drag icon */}
                                        <span
                                          className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
                                          draggable
                                          onDragStart={(e) => handleCertDragStart(e, cIndex)}
                                          onDragEnd={handleDragEnd}
                                        >
                                          <RiDraggable className="text-xl text-[#656e83] hover:text-[#800080]" />
                                          <span className="tooltip">Click and drag to move</span>
                                        </span>

                                        <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                                          <AccordionPanel>

                                            {/* TITLE */}
                                            <AccordionTitle className="font-semibold text-sm">
                                              {cert.name?.trim() ? cert.name : "(Not specified)"}
                                            </AccordionTitle>

                                            {/* CONTENT */}
                                            <AccordionContent className="pt-0">

                                              <div className="grid grid-cols-2 gap-4 mb-4">

                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">
                                                    Activity name, job title, book title etc.
                                                  </Label>
                                                  <input type='text'
                                                    value={cert.name}
                                                    onChange={(e) =>
                                                      handleCertUpdate(index, cert.id, "name", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>

                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                                                  <input
                                                    value={cert.city}
                                                    onChange={(e) =>
                                                      handleCertUpdate(index, cert.id, "city", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>

                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">Start Year</Label>
                                                  <input
                                                    value={cert.startYear}
                                                    onChange={(e) =>
                                                      handleCertUpdate(index, cert.id, "startYear", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>

                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">End Year</Label>
                                                  <input
                                                    value={cert.endYear}
                                                    onChange={(e) =>
                                                      handleCertUpdate(index, cert.id, "endYear", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>
                                              </div>

                                              <div>
                                                <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                                <TipTapEditor
                                                  value={cert.description}
                                                  onChange={(e) =>
                                                    handleCertUpdate(index, cert.id, "description", e.target.value)
                                                  }
                                                />
                                              </div>

                                            </AccordionContent>
                                          </AccordionPanel>
                                        </Accordion>
                                      </div>
                                    </div>
                                  ))}

                                  <button
                                    onClick={() => handleAddCertification(index)}
                                    className="text-sm !text-[#800080] font-medium mt-2"
                                  >
                                    + Add one more item
                                  </button>
                                </>
                              )}
                              {section.type === "experience" && (
                                <>
                                  <p className="!text-sm !font-medium !text-gray-500 mb-4">
                                    Show your relevant experience (last 10 years). Use bullet points to highlight achievements.
                                  </p>

                                  {section.experiences.map((exp, eIndex) => (
                                    <div
                                      key={exp.id}
                                      onDragOver={(e) => e.preventDefault()}
                                      onDrop={(e) => handleExpDrop(e, index, eIndex)}
                                      className="transition-all duration-20 mb-3"
                                    >
                                      <div className="flex items-start gap-2">

                                        {/* Drag icon ONLY */}
                                        <span
                                          className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
                                          draggable
                                          onDragStart={(e) => handleExpDragStart(e, eIndex)}
                                          onDragEnd={handleDragEnd}
                                        >
                                          <RiDraggable className="text-xl text-[#656e83] hover:text-[#800080]" />
                                          <span className="tooltip">Click and drag to move</span>
                                        </span>

                                        <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                                          <AccordionPanel>

                                            {/* TITLE */}
                                            <AccordionTitle className="font-semibold text-sm">
                                              {exp.jobTitle?.trim()
                                                ? `${exp.jobTitle} at ${exp.company || "(Not specified)"}`
                                                : "(Not specified)"}
                                            </AccordionTitle>

                                            {/* CONTENT */}
                                            <AccordionContent className="pt-0">

                                              <div className="grid grid-cols-2 gap-4 mb-4">

                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">Job title</Label>
                                                  <input
                                                    value={exp.jobTitle}
                                                    onChange={(e) =>
                                                      handleExpUpdate(index, exp.id, "jobTitle", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>

                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">Employer</Label>
                                                  <input
                                                    value={exp.company}
                                                    onChange={(e) =>
                                                      handleExpUpdate(index, exp.id, "company", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>

                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">Start Date</Label>
                                                  <input
                                                    value={exp.startDate}
                                                    onChange={(e) =>
                                                      handleExpUpdate(index, exp.id, "startDate", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>

                                                <div>
                                                  <Label className="!text-sm !font-medium !text-gray-500">End Date</Label>
                                                  <input
                                                    value={exp.endDate}
                                                    onChange={(e) =>
                                                      handleExpUpdate(index, exp.id, "endDate", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>

                                                <div className="col-span-2">
                                                  <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                                                  <input
                                                    value={exp.city}
                                                    onChange={(e) =>
                                                      handleExpUpdate(index, exp.id, "city", e.target.value)
                                                    }
                                                    className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                                  />
                                                </div>
                                              </div>

                                              <div>
                                                <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                                <TipTapEditor
                                                  value={exp.description}
                                                  onChange={(html) =>
                                                    handleExpUpdate(index, exp.id, "description", html)
                                                  }
                                                />

                                                {/* <textarea
                                                  value={exp.description}
                                                  onChange={(e) =>
                                                    handleExpUpdate(index, exp.id, "description", e.target.value)
                                                  }
                                                  className="w-full h-28 rounded-md border border-gray-300 p-2 text-sm resize-none"
                                                /> */}
                                                <div className="relative flex justify-end mt-1">
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      setActiveExpId(exp.id);
                                                      console.log("hello")
                                                    }}
                                                    className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080]"
                                                  >
                                                    <HiSparkles className="text-md" />
                                                    Get help with writing
                                                  </button>
                                                  {activeExpId === exp.id && (
                                                    <GenerateWithAiModal
                                                      open={true}
                                                      onClose={() => setActiveExpId(null)}
                                                      aiType="imp_experience"
                                                      initialText={exp.description || ""}
                                                      onApply={(text) => {
                                                        handleExpUpdate(index, exp.id, "description", text);
                                                      }}
                                                    />
                                                  )}
                                                </div>
                                              </div>

                                            </AccordionContent>
                                          </AccordionPanel>
                                        </Accordion>
                                      </div>
                                    </div>
                                  ))}

                                  <button
                                    type="button"
                                    onClick={() => handleAddExperience(index)}
                                    className="!text-sm !text-[#800080] font-medium mt-2"
                                  >
                                    + Add one more employment
                                  </button>
                                </>
                              )}
                            </AccordionContent>
                          </AccordionPanel>
                        </Accordion>
                      </div>

                    ))
                  }
                </div>

              </div>
            </div>
          </div>
        </form>
          :
          <div>
            <CustomizeResume />
          </div>
        }

      </div>
      <div className='lg:w-6/12 bg-[#ffffff] rounded-[8px] py-5 px-0'>
        <div className='h-screen overflow-y-scroll rounded-[8px]'>
          <div ref={componentRef} className=''>
            <DynamicTemplate
              levels={levels}
              sections={sections}
            // data={formValues}
            />
            {/* <CorporateTemplate/> */}
          </div>
        </div>
      </div>

      <ImpAtsScoreAnalyzeModal
        show={openJdAtsModal}
        setShow={setOpenJdAtsModal}
        atsData={atsData}
      />     
    </div>
  )
}

export default page