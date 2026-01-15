'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { HiClipboardList } from "react-icons/hi";
import { MdPreview } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

import { RiDraggable } from "react-icons/ri";

import { BiSolidUser } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhone } from "react-icons/bi";

import { HiAcademicCap, HiSparkles } from "react-icons/hi2";

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

  const [experiences, setExperiences] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [personalPro, setPersonalPro] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [achivments, setAchivments] = useState([]);
  const [educationEntries, setEducationEntries] = useState([]);
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

  useEffect(() => {
    dispatch(getUpdateResumeInfo({ id: id }))
    dispatch(impEnhanceUsageInfo(id))
      .then((res) => {

        // console.log("resumeid", res.payload?.data?.id);
      })
  }, [])


  useEffect(() => {
    if (getUpdateResumeInfoData?.data?.imp_basic_info) {
      const basicInfo = getUpdateResumeInfoData.data.imp_basic_info;
      setValue("full_name", basicInfo.candidate_name)
      setValue("email", basicInfo.email)
      setValue("phone", basicInfo.phone)
      setValue("location", basicInfo.location) // Location not available in new data structure
      setValue("title", basicInfo.professional_title)
      setValue("personal_web", getUpdateResumeInfoData.data?.other_url_link)
      setValue("github_profile", getUpdateResumeInfoData.data?.github_url_link)
      setValue("linkdin_profile", getUpdateResumeInfoData.data?.linkedin_url_link)
      setValue("goal", basicInfo.summery)
    }
  }, [getUpdateResumeInfoData, setValue])

  // Populate education entries from getUpdateResumeInfoData
  useEffect(() => {
    if (getUpdateResumeInfoData?.data?.imp_education_info) {
      const mappedEducation = getUpdateResumeInfoData?.data?.imp_education_info.map((edu) => ({
        id: edu.id,
        institution: edu.college || "",
        location: edu.location || "",
        degree: edu.course || "",
        field_study: edu.course || "",
        start_time: null,   // Not available in the new structure
        end_time: edu.course_completed ? (() => {
          try {
            const date = new Date(edu.course_completed);
            return isNaN(date.getTime()) ? null : date;
          } catch (e) {
            console.error('Error parsing course completion date:', edu.course_completed, e);
            return null;
          }
        })() : null,
        cgpa: edu.cgpa || "",
        additionalInfo: edu.aditional_info || "",
        currentlyStudying: false,
      }));

      setEducationEntries(mappedEducation);
    }
  }, [getUpdateResumeInfoData]);


  useEffect(() => {
    const experiencesData = getUpdateResumeInfoData?.data?.imp_experience_info;
    const projectsData = getUpdateResumeInfoData?.data?.imp_project_info;

    console.log(
      "getUpdateResumeInfoDataExp",
      experiencesData
    );

    if (Array.isArray(experiencesData) && experiencesData.length > 0) {
      const formattedExperiences = experiencesData.map((exp) => {
        const isCurrent = exp.end_date === "Present" || !exp.end_date;

        // 🔥 Filter projects that belong to this experience
        const relatedProjects = Array.isArray(projectsData)
          ? projectsData
            .filter((proj) => proj.exp_id === exp.id)
            .map((proj) => ({
              id: proj.id,
              title: proj.Project_title || "",
              role: proj.Role || "",
              technology: Array.isArray(proj.skill_set_use)
                ? proj.skill_set_use.join(", ")
                : "",
              description: proj.description || "",
            }))
          : [];

        return {
          id: exp.id,
          company_name: exp.company_name || "",
          position: exp.Position || "",
          location: exp.location || "",
          skill: Array.isArray(exp.skill_set) ? exp.skill_set.join(",") : "",
          start_date: exp.start_date
            ? (() => {
              try {
                const date = new Date(exp.start_date);
                return isNaN(date.getTime()) ? null : date;
              } catch {
                return null;
              }
            })()
            : null,
          end_date: exp.end_date
            ? (() => {
              try {
                const date = new Date(exp.end_date);
                return isNaN(date.getTime()) ? null : date;
              } catch {
                return null;
              }
            })()
            : null,
          current_work: isCurrent,

          // 🔥 Inject related projects here
          projects:
            relatedProjects.length > 0
              ? relatedProjects
              : [
                {
                  id: `proj-default-${Date.now()}-${Math.random()
                    .toString(36)
                    .substr(2, 9)}`,
                  title: "",
                  role: "",
                  technology: "",
                  description: "",
                },
              ],
        };
      });

      setExperiences(formattedExperiences);
    }
  }, [getUpdateResumeInfoData]);


  // Populate skills from getUpdateResumeInfoData
  useEffect(() => {
    if (getUpdateResumeInfoData?.data?.imp_skill_info && getUpdateResumeInfoData.data.imp_skill_info.length > 0) {
      const skillsData = getUpdateResumeInfoData.data.imp_skill_info.map(skill => ({
        id: skill.id,
        skill_category: skill.categoty,
        skill: skill.skill_set ? skill.skill_set.join(", ") : ""
      }));
      setSkills(skillsData);
    } else if (getUpdateResumeInfoData && skills.length === 0) {
      // Add empty entry if no data and no existing entries
      setSkills([{ id: `skill-init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, skill_category: "", skill: "" }]);
    }
  }, [getUpdateResumeInfoData]);

  // Populate languages from getUpdateResumeInfoData
  useEffect(() => {
    if (getUpdateResumeInfoData?.data?.imp_language_info && getUpdateResumeInfoData.data.imp_language_info.length > 0) {
      const languageData = getUpdateResumeInfoData.data.imp_language_info.map(lang => ({
        id: lang.id,
        language_name: lang.language,
        proficiency: "" // Not available in new data structure
      }));
      setLanguages(languageData);
    } else if (getUpdateResumeInfoData && languages.length === 0) {
      // Add empty entry if no data and no existing entries
      setLanguages([{ id: `lang-init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, language_name: "", proficiency: "" }]);
    }
  }, [getUpdateResumeInfoData]);

  // Populate personal projects from getUpdateResumeInfoData
  useEffect(() => {
    if (getUpdateResumeInfoData?.data?.imp_extra_project_info && getUpdateResumeInfoData.data.imp_extra_project_info.length > 0) {
      const projectData = getUpdateResumeInfoData.data.imp_extra_project_info.map(proj => ({
        id: proj.id,
        project_title: proj.project_name,
        role: proj.role,
        start_time: proj.start_date ? new Date(proj.start_date) : null,
        end_time: proj.end_date ? new Date(proj.end_date) : null,
        project_url: "",
        skill: proj.technology ? proj.technology.join(", ") : "",
        description: proj.description
      }));
      setPersonalPro(projectData);
    } else if (getUpdateResumeInfoData && personalPro.length === 0) {
      // Add empty entry if no data and no existing entries
      setPersonalPro([{ id: `proj-init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, project_title: "", role: "", start_time: null, end_time: null, project_url: "", skill: "", description: "" }]);
    }
  }, [getUpdateResumeInfoData]);

  // Populate certificates from getUpdateResumeInfoData
  useEffect(() => {
    if (getUpdateResumeInfoData?.data?.imp_certification_info && getUpdateResumeInfoData.data.imp_certification_info.length > 0) {
      const certificateData = getUpdateResumeInfoData.data.imp_certification_info.map(cert => ({
        id: cert.id,
        certification_name: cert.certification_name,
        issuing_organization: cert.issuing_organization,
        obtained_date: cert.date_obtained ? new Date(cert.date_obtained) : null,
        certification_id: cert.certification_id
      }));
      setCertificates(certificateData);
    } else if (getUpdateResumeInfoData && certificates.length === 0) {
      // Add empty entry if no data and no existing entries
      setCertificates([{ id: `cert-init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, certification_name: "", issuing_organization: "", obtained_date: null, certification_id: "" }]);
    }
  }, [getUpdateResumeInfoData]);



  useEffect(() => {
    if (
      getUpdateResumeInfoData?.data?.imp_achievement_info?.length > 0
    ) {
      console.log(
        "AchivmentsJd",
        getUpdateResumeInfoData.data.imp_achievement_info
      );

      const achievements = getUpdateResumeInfoData.data.imp_achievement_info.map(
        (ach, index) => ({
          id: ach.id,
          achievement_title: ach.achivement_name || "",
          organization: ach.achivement_organization_name || "",
          receive_date: ach.achivement_date ? (() => {
            try {
              const date = new Date(ach.achivement_date);
              return isNaN(date.getTime()) ? null : date;
            } catch (e) {
              console.error('Error parsing achievement date:', ach.achivement_date, e);
              return null;
            }
          })() : null,
          description: ach.description || "",
        })
      );

      setAchivments(achievements);
    } else {
      setAchivments([
        {
          id: `ach-default-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          achievement_title: "",
          organization: "",
          receive_date: null,
          description: "",
        },
      ]);
    }
  }, [getUpdateResumeInfoData, setAchivments]);

  const formValues = watch();
  console.log("formValues", formValues);
  console.log("template", template);
  console.log("educationEntries", educationEntries);
  console.log("experiences", experiences);
  console.log("skills", skills);
  console.log("languages", languages);
  console.log("personalPro", personalPro);
  console.log("certificates", certificates);
  console.log("achivments", achivments);
  console.log("atsScoreAnalyzeData", atsScoreAnalyzeData);



  const handleAnalyzeResume = async () => {
    try {
      const res = await dispatch(impBasedAtsScoreAnalyze({ id })).unwrap();
      if (res?.data) {
        setAtsData(res.data);
        setOpenJdAtsModal(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch ATS Score");
    }
  };

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

    try {
      // Get basic info ID from improveResumeData
      const basicInfoId = getUpdateResumeInfoData?.data?.imp_basic_info?.id;
      const resumeid = getUpdateResumeInfoData?.data?.id;
      console.log("resumeidonsubmit", resumeid);
      console.log("getUpdateResumeInfoData", getUpdateResumeInfoData);
      console.log("getUpdateResumeInfoData?.data", getUpdateResumeInfoData?.data);

      if (!basicInfoId) {
        console.error("Basic info ID not found");
        return;
      }

      if (!resumeid) {
        console.error("Resume ID not found");
        return;
      }

      // 1. Update Basic Info
      const basicInfoPayload = {
        basic_info_id: basicInfoId,
        SuggestedRole: data.title || "",
        CandidateFullName: data.full_name || "",
        EmailAddress: data.email || "",
        PhoneNumber: data.phone || "",
        ProfessionalTitle: data.title || "",
        Summary: data.goal || "",
        location: data.location || ""
      };


      // 1. Update Basic Info (NO COUNT)
      await dispatch(updateBasicInfo({
        resumeid: resumeid,
        data: basicInfoPayload
      }));


      const experiencePayload = experiences.map(exp => ({
        id: exp.id && exp.id.toString().includes("exp-") ? null : exp.id,
        CompanyName: exp.company_name || null,
        Position: exp.position || null,
        Duration: {
          StartDate: exp.start_date ? convertToSubmitFormat(exp.start_date) : null,
          EndDate: exp.current_work
            ? "Present"
            : (exp.end_date ? convertToSubmitFormat(exp.end_date) : null)
        },
        Location: exp.location || null,
        SkillSet: exp.skill
          ? exp.skill.split(",").map(s => s.trim()).filter(Boolean)
          : [],
        Projects: Array.isArray(exp.projects)
          ? exp.projects.map(proj => ({
            id: proj.id && proj.id.toString().includes("proj-") ? null : proj.id,
            Project_title: proj.title || null,
            Role: proj.role || null,
            // technologies_used: proj.technology
            //   ? proj.technology.split(",").map(t => t.trim()).filter(Boolean)
            //   : [],
            Description: proj.description || null
          }))
          : []
      }));


      console.log("Dispatching updateExperience with resumeid:", resumeid);
      await dispatch(updateExperience({ resumeid, data: experiencePayload }));

      // 3. Update Education
      const educationPayload = educationEntries.map(edu => ({
        id: edu.id && edu.id.toString().includes('edu-') ? null : edu.id,
        CollegeUniversity: edu.institution || "",
        Location: edu.location || "",
        CourseDegree: edu.degree || "",
        GraduationYear: edu.end_time ? new Date(edu.end_time).getFullYear().toString() : "",
        // GPAorGrade:
        //   edu.cgpa !== null && edu.cgpa !== undefined
        //     ? String(edu.cgpa)
        //     : "",
        GPAorGrade:
          edu.cgpa !== null && edu.cgpa !== undefined && edu.cgpa !== ""
            ? `${edu.cgpa}`
            : "",
        AdditionalInformation: edu.additionalInfo || ""
      }));

      await dispatch(updateEducation({ resumeid, data: educationPayload }));

      // 4. Update Skills
      const skillsPayload = skills.map(sk => ({
        id: sk.id && sk.id.toString().includes('skill-') ? null : sk.id,
        Skill_Category: sk.skill_category || "",
        Skills: sk.skill ? sk.skill.split(',').map(s => s.trim()).filter(s => s) : []
      }));

      await dispatch(updateSkills({ resumeid, data: skillsPayload }));

      // 5. Update Languages
      const languagePayload = languages.map(lang => ({
        id: lang.id && lang.id.toString().includes('lang-') ? null : lang.id,
        Language: lang.language_name || "",
        proficiency: lang.proficiency || "",
      }));

      await dispatch(updateLanguage({ resumeid, data: languagePayload }));

      // 6. Update Extra Projects
      const extraProjectPayload = personalPro.map(pPro => ({
        id: pPro.id && pPro.id.toString().includes('proj-') ? null : pPro.id,
        ProjectName: pPro.project_title || "",
        Description: pPro.description || "",
        Technologies: pPro.skill ? pPro.skill.split(',').map(t => t.trim()).filter(t => t) : [],
        YourRole: pPro.role || "",
        Duration: {
          StartDate: pPro.start_time ? convertToSubmitFormat(pPro.start_time) : "",
          EndDate: pPro.end_time ? convertToSubmitFormat(pPro.end_time) : ""
        }
      }));

      await dispatch(updateExtraProject({ resumeid, data: extraProjectPayload }));

      // 7. Update Certifications
      const certificationPayload = certificates.map(cer => ({
        id: cer.id && cer.id.toString().includes('cert-') ? null : cer.id,
        CertificationName: cer.certification_name || "",
        Issuing_Organization: cer.issuing_organization || "",
        DateObtained: cer.obtained_date ? convertToSubmitFormat(cer.obtained_date) : "",
        Certification_ID: cer.certification_id || "",
        Description: "" // Add description field if needed
      }));

      await dispatch(updateCertification({ resumeid, data: certificationPayload }));

      // 8. Update Achievements
      const achievementsPayload = achivments.map(achiv => ({
        id: achiv.id && achiv.id.toString().includes('ach-') ? null : achiv.id,
        Achievement_Titlee: achiv.achievement_title || "",
        Issuing_Organization: achiv.organization || "",
        Date_Received: achiv.receive_date ? convertToSubmitFormat(achiv.receive_date) : "",
        Description: achiv.description || ""
      }));

      await dispatch(updateAchievements({ resumeid, data: achievementsPayload }));

      console.log("All updates completed successfully!");
      await dispatch(getUpdateResumeInfo({ id }));

    } catch (error) {
      console.error("Error updating resume data:", error);
    }
  }


  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Updated for newer versions of react-to-print
    documentTitle: `${formValues?.full_name || 'Resume'}_Resume`, // Dynamic file name
    pageStyle: `
    @page {
      size: A4;
      margin: 0.5in 0;
    }

    html, body {
      font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
      margin: 0 !important;
      padding: 0 !important;
    }
@page :header {
  display: none !important;
}
@page :footer {
  display: none !important;
}

  `,
    onBeforeGetContent: () => {
      // Optional: You can do something before printing starts
      console.log('Starting PDF generation...');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 100);
      });
    },
    onAfterPrint: () => {
      // Optional: You can do something after printing
      console.log('PDF generated successfully!');
    },
  });


  const handleEnhancePDF = async () => {
    try {
      setEnhancing(true);

      const resumeData = getUpdateResumeInfoData?.data;
      const imp_resume_id = resumeData?.imp_basic_info?.imp_resume_id;

      console.log("imp_resume_id", imp_resume_id);

      if (!imp_resume_id) {
        setEnhancing(false);
        return;
      }

      const payload = {
        imp_resume_id,
        imp_resume_text: resumeData,
      };

      const resultAction = await dispatch(getImpEnhance(payload));

      if (!getImpEnhance.fulfilled.match(resultAction)) {
        console.error("IMP Enhance Error:", resultAction.payload);
        return;
      }

      // usage count
      dispatch(impEnhanceUsageInfo(id));

      const rewriteData = resultAction?.payload?.data;
      console.log("rewriteData", rewriteData);

      /* --------------------------------
         BASIC INFO (already correct)
      -------------------------------- */
      const basicPayload = {
        basic_info_id: resumeData?.imp_basic_info?.id,
        ...rewriteData?.basic_information,
      };

      /* --------------------------------
         HELPERS
      -------------------------------- */
      const mapWithId = (rewriteArr = [], existingArr = []) =>
        rewriteArr.map((item, index) => ({
          ...item,
          id: existingArr[index]?.id, // ✅ existing unique id
          imp_resume_id,
        }));

      /* --------------------------------
         MAP EXPERIENCE WITH NESTED PROJECTS
      -------------------------------- */
      const experienceData = (rewriteData?.experience?.Experience || []).map((exp, expIndex) => {
        const existingExp = resumeData?.imp_experience_info?.[expIndex];

        // Map projects for this experience
        const mappedProjects = (exp.Projects || []).map((proj, projIndex) => {
          // Find existing project by matching exp_id or by index
          const existingProjects = resumeData?.imp_project_info?.filter(
            p => p.exp_id === existingExp?.id
          ) || [];
          const existingProj = existingProjects[projIndex];

          return {
            ...proj,
            id: existingProj?.id, // ✅ Preserve existing project ID
            exp_id: existingExp?.id, // ✅ Link to parent experience
          };
        });

        return {
          ...exp,
          id: existingExp?.id, // ✅ Preserve experience ID
          imp_resume_id,
          Projects: mappedProjects,
        };
      });

      /* --------------------------------
         MAP OTHER SECTIONS WITH IDS
      -------------------------------- */
      const educationData = mapWithId(
        rewriteData?.education?.Education,
        resumeData?.imp_education_info
      );

      const skillsData = mapWithId(
        rewriteData?.skills?.Skills,
        resumeData?.imp_skill_info
      );

      const languageData = mapWithId(
        rewriteData?.languages?.Languages,
        resumeData?.imp_language_info
      );

      const certificationData = mapWithId(
        rewriteData?.certifications?.Certifications,
        resumeData?.imp_certification_info
      );

      const achievementData = mapWithId(
        rewriteData?.achievements?.Achievements,
        resumeData?.imp_achievement_info
      );

      const projectData = mapWithId(
        rewriteData?.projects?.Projects,
        resumeData?.imp_extra_project_info
      );

      /* --------------------------------
         DISPATCH UPDATES
      -------------------------------- */
      await dispatch(updateBasicInfo({ resumeid: imp_resume_id, data: basicPayload }));
      await dispatch(updateExperience({ resumeid: imp_resume_id, data: experienceData }));
      await dispatch(updateEducation({ resumeid: imp_resume_id, data: educationData }));
      await dispatch(updateSkills({ resumeid: imp_resume_id, data: skillsData }));
      await dispatch(updateLanguage({ resumeid: imp_resume_id, data: languageData }));
      await dispatch(updateCertification({ resumeid: imp_resume_id, data: certificationData }));
      await dispatch(updateAchievements({ resumeid: imp_resume_id, data: achievementData }));
      await dispatch(updateExtraProject({ resumeid: imp_resume_id, data: projectData }));

      await dispatch(getUpdateResumeInfo({ id }));

    } catch (error) {
      console.error("Enhance PDF Error:", error);
    } finally {
      setEnhancing(false);
    }
  };



  const maxLimit = impEnUsageInfo?.data?.enhance_limit?.max_limit;
  const used = impEnUsageInfo?.data?.usage_limit;

  const remaining =
    typeof maxLimit === "number" && typeof used === "number"
      ? maxLimit - used
      : 5;

  const handleDownloadWithCount = () => {
    const isIndividual =
      profileData?.data?.signUpType?.[0]?.UserSignUpTypeMap?.sign_up_type_id === 1;


    const countAction = isIndividual ? addCountResume : addCountResumeOrg;

    dispatch(countAction({ ref_type: "improve_resume" }))
      .then((res) => {
        if (res?.payload?.status_code === 200) {
          handlePrint();
        } else if (res?.payload?.response?.data?.status_code === 400) {
          toast.error(res?.payload?.response?.data?.message, {
            autoClose: false,
          });
        }
      })
      .catch((err) => {
        console.error("Download count error:", err);
        toast.error("Something went wrong while downloading");
      });
  };

  // const [sections, setSections] = useState([

  //   { id: 1, title: 'Skills', type: 'skills' },
  //   { id: 3, title: 'Professional Summary', type: 'summary' }
  // ]);

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





  return (
    <div className='lg:flex gap-1 pb-0'>
      <ToastContainer />

      <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] mb-4 lg:mb-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
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


                <div className="flex items-center gap-3">
                  {/* Existing Resume */}
                  <button
                    className="
                      w-6/12 flex items-center justify-center gap-2
                      text-sm font-medium
                      text-[#800080] hover:text-[#e799e7]
                      transition-all duration-200
                      cursor-pointer"
                  >
                    <HiDocumentText className="text-lg" />
                    Existing Resume
                  </button>

                  {/* Changed Resume */}
                  <button
                    className="
                    w-6/12 flex items-center justify-center gap-2
                    text-sm font-medium
                    text-[#800080] hover:text-[#e799e7]
                    transition-all duration-200 cursor-pointer"
                  >
                    <HiArrowPath className="text-lg" />
                    Changed Resume
                  </button>
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
                          }
                            cursor-grab active:cursor-grabbing
                          `}
                      >
                        <Accordion flush={true}>

                          <AccordionPanel>
                            <AccordionTitle className='font-bold text-xl'>
                              <span
                                className="drag-wrapper"
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
                                              className="drag-wrapper mt-5"
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
                              {
                                section.type === 'summary' && (
                                  <div className="space-y-2">
                                    <div className='flex justify-between items-center'>
                                      <p className="!text-sm !font-medium !text-gray-500 mb-4">
                                        Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.
                                      </p>
                                    </div>
                                    <textarea
                                      placeholder="Write a brief professional summary..."
                                      className="mt-1 w-ful text-sm h-32 resize-none"
                                      /* Use the watched value from useForm to make it a controlled input */
                                      value={watch("goal") || ""}
                                      onChange={(e) => {
                                        // Manually update the react-hook-form state
                                        setValue("goal", e.target.value);
                                      }}
                                    />
                                    <div className="relative flex justify-end">
                                      <button
                                        type="button"
                                        onClick={() => setAiModalOpen(true)}
                                        className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080] font-medium !transition-all !duration-200 hover:!bg-[#800080] hover:!text-white"
                                      >
                                        <HiSparkles className="text-md" />
                                        Get help with writing
                                      </button>
                                      <GenerateWithAiModal
                                        open={aiModalOpen}
                                        onClose={() => setAiModalOpen(false)}
                                        aiType="imp_summary"
                                        initialText={watch("goal") || ""}
                                        onApply={(text) => {
                                          setValue("goal", text);
                                        }}
                                      />
                                    </div>
                                  </div>
                                )
                              }

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
                                            className="drag-wrapper mt-5"
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
                                                  <textarea
                                                    placeholder="e.g. Graduated with High Honors."
                                                    value={edu.description}
                                                    onChange={(e) =>
                                                      handleEducationUpdate(index, edu.id, "description", e.target.value)
                                                    }
                                                    className="w-full h-28 rounded-md border border-gray-300 p-2 text-sm resize-none"
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
                                          className="drag-wrapper mt-5"
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
                                                <textarea
                                                  value={cert.description}
                                                  onChange={(e) =>
                                                    handleCertUpdate(index, cert.id, "description", e.target.value)
                                                  }
                                                  className="w-full h-28 rounded-md border border-gray-300 p-2 text-sm resize-none"
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
                                          className="drag-wrapper mt-5"
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
                                                <textarea
                                                  value={exp.description}
                                                  onChange={(e) =>
                                                    handleExpUpdate(index, exp.id, "description", e.target.value)
                                                  }
                                                  className="w-full h-28 rounded-md border border-gray-300 p-2 text-sm resize-none"
                                                />
                                                <div className="relative flex justify-end">
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


                {/* <AccordionPanel>
                      <AccordionTitle className='font-bold text-xl'>{sections.title}</AccordionTitle>
                      <AccordionContent>
                        {
                          sections.type==='personal'&&(
                              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
                     
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Job Target
                            </label>
                            <input
                              type="text"
                              placeholder="SENIOR SOFTWARE ENGINEER"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-cyan-500"
                            />
                          </div>

                        
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              First Name
                            </label>
                            <input
                              type="text"
                              placeholder="SRAVYA"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            />
                          </div>

                      
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Last Name
                            </label>
                            <input
                              type="text"
                              placeholder="BOBBALI"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            />
                          </div>

                        
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Email
                            </label>
                            <input
                              type="email"
                              placeholder="test2333@yopmail.com"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            />
                          </div>

                    
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Phone
                            </label>
                            <input
                              type="tel"
                              placeholder="9502829805"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            />
                          </div>

                     
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              LinkedIn URL
                            </label>
                            <input
                              type="url"
                              placeholder="linkedin.com/in/yourprofile"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            />
                          </div>

                       
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              City, State
                            </label>
                            <input
                              type="text"
                              placeholder="Hyderabad, Telangana"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                            />
                          </div>

                         
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Country
                            </label>
                            <input
                              type="text"
                              placeholder="India"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
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

              {showAdditionalDetails && (
                <>
                  
                 

               
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                    />
                  </div>

                 
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nationality
                    </label>
                    <input
                      type="text"
                      placeholder="Indian"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                    />
                  </div>

                 
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Place of Birth
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                    />
                  </div>

                
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                    />
                  </div>

                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Driving License
                    </label>
                    <input
                      type="text"
                      placeholder="License Number"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                    />
                  </div>
                </>
              )}

                              </form>
                          )
                        }
                        {
                          sections.type==='skills'&&(
                            <>
                             <p className="text-gray-500 dark:text-gray-400 mb-4">
                         Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing
                          (especially when applying via an online system).
                        </p>
                         <Accordion collapseAll>
                          <AccordionPanel>
                            <AccordionTitle className='font-bold text-xl'> <RiDraggable className='text-xl' />Java</AccordionTitle>
                            <AccordionContent>
                                 
                            <div className='flex gap-10'>
                               <div className='w-6/12'>
                                <Label className="!text-gray-400">Skill</Label>
                                <input
                                  type="text"
                                  placeholder="Your Skill"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                />
                              </div>
                              <div className='w-6/12 '
                               
                              >
                                <Label className="!text-gray-400 text-sm">Level - <span className="font-semibold"
                                style={{ color: textColor[selectedIndex] }}
                                >{levels[selectedIndex]}</span></Label>
                                <div className='label_tab_area transition-all duration-300 rounded-[5px] p-0' style={{ backgroundColor: tabColors[selectedIndex] }}>
                                  <Tabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
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
                          <Accordion collapseAll>
                          <AccordionPanel>
                            <AccordionTitle className='font-bold text-xl'><RiDraggable className='text-xl' />Python</AccordionTitle>
                            <AccordionContent>
                             <div className='flex gap-10'>
                               <div className='w-6/12'>
                                <Label className="!text-gray-400">Skill</Label>
                                <input
                                  type="text"
                                  placeholder="Your Skill"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                />
                              </div>
                              <div className='w-6/12 '
                               
                              >
                                <Label className="!text-gray-400 text-sm">Level - <span className="font-semibold"
                                style={{ color: tabColors[selectedIndex] }}
                                >{levels[selectedIndex]}</span></Label>
                                <div className='label_tab_area transition-all duration-300 rounded-[5px] p-0' style={{ backgroundColor: tabColors[selectedIndex] }}>
                                  <Tabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
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
                            </>
                          )
                        }
                        {
                          sections.type==='summary'&&(
                           <p>Hello</p>  
                          )
                        }
                       

                  
                        
                      </AccordionContent>
                    </AccordionPanel> */}



                {/* <AccordionPanel>
                      <AccordionTitle className='font-bold text-xl flex items-center gap-5'><DragIcon /> Skills</AccordionTitle>
                      <AccordionContent>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                         Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing
                          (especially when applying via an online system).
                        </p>
                         <Accordion collapseAll>
                          <AccordionPanel>
                            <AccordionTitle className='font-bold text-xl'> <RiDraggable className='text-xl' />Java</AccordionTitle>
                            <AccordionContent>
                                 
                            <div className='flex gap-10'>
                               <div className='w-6/12'>
                                <Label className="!text-gray-400">Skill</Label>
                                <input
                                  type="text"
                                  placeholder="Your Skill"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                />
                              </div>
                              <div className='w-6/12 '
                               
                              >
                                <Label className="!text-gray-400 text-sm">Level - <span className="font-semibold"
                                style={{ color: textColor[selectedIndex] }}
                                >{levels[selectedIndex]}</span></Label>
                                <div className='label_tab_area transition-all duration-300 rounded-[5px] p-0' style={{ backgroundColor: tabColors[selectedIndex] }}>
                                  <Tabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
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
                          <Accordion collapseAll>
                          <AccordionPanel>
                            <AccordionTitle className='font-bold text-xl'><RiDraggable className='text-xl' />Python</AccordionTitle>
                            <AccordionContent>
                             <div className='flex gap-10'>
                               <div className='w-6/12'>
                                <Label className="!text-gray-400">Skill</Label>
                                <input
                                  type="text"
                                  placeholder="Your Skill"
                                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                />
                              </div>
                              <div className='w-6/12 '
                               
                              >
                                <Label className="!text-gray-400 text-sm">Level - <span className="font-semibold"
                                style={{ color: tabColors[selectedIndex] }}
                                >{levels[selectedIndex]}</span></Label>
                                <div className='label_tab_area transition-all duration-300 rounded-[5px] p-0' style={{ backgroundColor: tabColors[selectedIndex] }}>
                                  <Tabs selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
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
                      </AccordionContent>
                    </AccordionPanel> */}


                {/* <AccordionPanel>
                      <AccordionTitle className='font-bold text-xl'> <DragIcon />Professional Summary</AccordionTitle>
                      <AccordionContent>
                        Hello

                       
                        
                      </AccordionContent>
                    </AccordionPanel> */}






              </div>



            </div>



            <div className='hidden'>


              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1 lg:mb-4 lg:mb-0'>
                  <HiClipboardList className='text-[#800080] text-2xl' />
                  <h3 className='text-[16px] text-[#151515] font-medium'>Resume Sections</h3>
                </div>
                <div className='flex items-center gap-1'>
                  <button
                    onClick={handleEnhancePDF}
                    disabled={enhancing}
                    className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-white font-medium cursor-pointer px-2 gap-1 flex items-center disabled:bg-[#b57bb5] disabled:cursor-not-allowed'
                  >
                    {enhancing ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Enhancing...
                      </>
                    ) : (
                      <>
                        Enhance
                        <span className='bg-white text-[#800080] rounded-full w-[20px] h-[20px] text-[10px] font-bold border border-[#800080] flex items-center justify-center'>
                          {remaining}
                        </span>
                      </>
                    )}
                  </button>
                </div>
                <button type="submit" className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-2 lg:px-4 flex items-center gap-1.5'><AiFillSave className='text-[18px]' /> Save Resume</button>
              </div>
              <p className="text-[11px] text-gray-600 mt-1 text-center">
                Enhancing attempts remaining: <span className="font-semibold text-[#800080]">{remaining}</span>
              </p>

              <div className='resume_tab_section'>
                <Tabs selectedIndex={activeTabIndex} onSelect={(index) => setActiveTabIndex(index)}>
                  <div className='border-b border-[#E5E5E5] p-5'>
                    <div className='tab_point relative'>
                      <span
                        className="absolute -top-3 right-2 text-xs font-semibold bg-purple-600 text-white px-2 py-1 rounded-full animate-pulse cursor-pointer z-10"
                        onClick={() => {
                          setActiveTabIndex(2);
                          setTimeout(() => {
                            const section = document.getElementById("resumate-section2");
                            if (section) {
                              section.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                            }
                          }, 150);
                        }}
                      >
                        ResuMate
                      </span>

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
                        <TabPanel key="personal-info">
                          <PersonalInfoJd register={register} errors={errors} getUpdateResumeInfoData={getUpdateResumeInfoData} setValue={setValue} />
                        </TabPanel>

                        <TabPanel key="education">
                          <EducationJd register={register} errors={errors} educationEntries={educationEntries} setEducationEntries={setEducationEntries} getUpdateResumeInfoData={getUpdateResumeInfoData} setValue={setValue} />
                        </TabPanel>


                        <TabPanel key="work-experience">
                          <WorkExpJd experiences={experiences} setExperiences={setExperiences} register={register} getUpdateResumeInfoData={getUpdateResumeInfoData} errors={errors} />
                        </TabPanel>

                        <TabPanel key="languages">
                          <LanguageJd
                            languages={languages}
                            setLanguages={setLanguages}
                            getUpdateResumeInfoData={getUpdateResumeInfoData}
                          />
                        </TabPanel>

                        <TabPanel key="skills">
                          <SkillsJd register={register} errors={errors} skills={skills} setSkills={setSkills} getUpdateResumeInfoData={getUpdateResumeInfoData} />
                        </TabPanel>

                        <TabPanel key="personal-projects">
                          <PersonalProjectJd register={register} errors={errors} personalPro={personalPro} setPersonalPro={setPersonalPro} getUpdateResumeInfoData={getUpdateResumeInfoData} />
                        </TabPanel>

                        <TabPanel key="certificates">
                          <CertificatesJd register={register} errors={errors} certificates={certificates} setCertificates={setCertificates} getUpdateResumeInfoData={getUpdateResumeInfoData} />
                        </TabPanel>

                        <TabPanel key="achievements">
                          <AchivmentsJd register={register} errors={errors} achivments={achivments} setAchivments={setAchivments} getUpdateResumeInfoData={getUpdateResumeInfoData} />
                        </TabPanel>

                      </div>
                    </div>
                  </div>
                </Tabs>
              </div>

            </div>
          </div>
        </form>
      </div>


      <div className='lg:w-6/12 bg-[#ffffff] rounded-[8px] py-5 px-0'>
        
        <div className='h-screen overflow-y-scroll rounded-[8px]'>
          <div ref={componentRef} className=''>
            {/* <Image src={resume_sections_view} alt="resume_sections_view" className='' /> */}
            {/* {
              template == 1 && (
                <Template1 ref={componentRef} data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
              )
            } */}


            {/* <Template2 ref={componentRef} data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} /> */}
            <DynamicTemplate
              levels={levels}
              sections={sections}
              data={formValues}
            />
            {/* <CorporateTemplate/> */}



          </div>
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




      <ImpAtsScoreAnalyzeModal
        show={openJdAtsModal}
        setShow={setOpenJdAtsModal}
        atsData={atsData}
      />

      {/* add modal for apply job start here */}
      <Modal size="3xl" className="apply_modal_area" show={openModalAnalyzeResume} onClose={() => setOpenModalAnalyzeResume(false)}>
        <ModalHeader className='bg-white text-black border-0 pt-2 pr-2'>&nbsp;</ModalHeader>
        <ModalBody className='bg-white p-5 rounded-b-[4px] relative'>
          <div className='border border-[#E5E5E5] rounded-[8px] p-5 mb-3'>
            <h3 className='text-base font-medium mb-4 text-[#151515]'>Current Resume Preview</h3>
            <div className='border border-[#E5E5E5] rounded-[8px] mb-4 max-h-[600px] overflow-y-auto'>
              {template == 1 && (
                <Template1 data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
              )}
              {template == 2 && (
                <Template2 data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
              )}
            </div>
            <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute left-[30px] lg:bottom-[-130px] bottom-[130px] p-5'>
              <ATSScoreComponent
                score={atsScoreAnalyzeData?.data?.new_ats || 0}
                label="Resume Score"
              />
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
              <div className='border border-[#E5E5E5] rounded-[8px] mb-4 max-h-[600px] overflow-y-auto'>
                <Image src={resume_sections_view} alt="resume_sections_view" className='' />
              </div>
              <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute left-[10px] bottom-[20px] p-5'>
                <ATSScoreComponent
                  score={atsScoreAnalyzeData?.data?.old_ats || 0}
                  label="Before Score"
                />
              </div>
            </div>
            <div className='border border-[#E5E5E5] rounded-[8px] p-5 mb-3 w-6/12 relative'>
              <h3 className='text-base font-medium mb-4 text-[#151515]'>After</h3>
              <div className='border border-[#E5E5E5] rounded-[8px] mb-4 max-h-[600px] overflow-y-auto'>
                {template == 1 && (
                  <Template1 data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
                )}
                {template == 2 && (
                  <Template2 data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
                )}
              </div>
              <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute right-[10px] bottom-[20px] p-5'>
                <ATSScoreComponent
                  score={atsScoreAnalyzeData?.data?.new_ats || 0}
                  label="After Score"
                />
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* add modal for apply job ends here */}
      <Modal
        show={openPreviewModal}
        size="6xl"
        onClose={() => setOpenPreviewModal(false)}
      >
        <ModalHeader className='text-black border-0 pt-2 pr-2'>
          Resume Preview
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
      </Modal>

    </div>
  )
}

export default page