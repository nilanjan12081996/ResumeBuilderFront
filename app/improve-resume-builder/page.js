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
// import htmlDocx from "html-docx-js/dist/html-docx";
// import juice from 'juice';
// import html2docx from "html2docx";

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
  // const [resumeid, setResumeid] = useState();
  const { profileData } = useSelector((state) => state?.profile)

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

  // Populate experience entries from getUpdateResumeInfoData
  // useEffect(() => {
  //   if (getUpdateResumeInfoData?.data?.imp_experience_info && getUpdateResumeInfoData.data.imp_experience_info.length > 0) {
  //     const experienceData = getUpdateResumeInfoData.data.imp_experience_info.map(exp => ({
  //       id: exp.id,
  //       company_name: exp.company_name,
  //       position: exp.Position,
  //       location: exp.location,
  //       skill: exp.skill_set ? exp.skill_set.join(", ") : "",
  //       start_date: exp.start_date ? new Date(exp.start_date) : null,
  //       end_date: exp.end_date ? new Date(exp.end_date) : null,
  //       current_work: !exp.end_date,
  //       projects: [{ id: `proj-init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, title: "", role: "", technology: "", description: "" }]
  //     }));
  //     setExperiences(experienceData);
  //   } else if (getUpdateResumeInfoData && experiences.length === 0) {
  //     // Add empty entry if no data and no existing entries
  //     setExperiences([{
  //       id: `exp-init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  //       company_name: "",
  //       position: "",
  //       location: "",
  //       skill: "",
  //       start_date: null,
  //       end_date: null,
  //       current_work: false,
  //       projects: [{ id: `proj-init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, title: "", role: "", technology: "", description: "" }]
  //     }]);
  //   }
  // }, [getUpdateResumeInfoData]);

  // useEffect(() => {
  //   console.log('getUpdateResumeInfoDataExp', getUpdateResumeInfoData?.data?.imp_experience_info);
  //   if (getUpdateResumeInfoData?.data?.imp_experience_info?.length > 0) {
  //     const formattedExperiences = getUpdateResumeInfoData.data.imp_experience_info.map(exp => {
  //       const isCurrent = exp.end_date === "Present" || !exp.end_date;
  //       return {
  //         id: exp.id,
  //         company_name: exp.company_name || "",
  //         position: exp.Position || "",
  //         location: exp.location || "",
  //         skill: Array.isArray(exp.skill_set) ? exp.skill_set.join(",") : "",
  //         start_date: exp.start_date ? (() => {
  //           try {
  //             const date = new Date(exp.start_date);
  //             return isNaN(date.getTime()) ? null : date;
  //           } catch (e) {
  //             console.error('Error parsing start date:', exp.start_date, e);
  //             return null;
  //           }
  //         })() : null,
  //         end_date: exp.end_date ? (() => {
  //           try {
  //             const date = new Date(exp.end_date);
  //             return isNaN(date.getTime()) ? null : date;
  //           } catch (e) {
  //             console.error('Error parsing end date:', exp.end_date, e);
  //             return null;
  //           }
  //         })() : null,
  //         current_work: isCurrent,
  //         projects: [
  //           { id: `proj-default-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, title: "", role: "", technology: "", description: "" }
  //         ]
  //       };
  //     });
  //     setExperiences(formattedExperiences);
  //   }
  // }, [getUpdateResumeInfoData]);

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

  // Populate achievements from getUpdateResumeInfoData
  // useEffect(() => {
  //   if (getUpdateResumeInfoData?.data?.imp_achievement_info && getUpdateResumeInfoData.data.imp_achievement_info.length > 0) {
  //     const achievementData = getUpdateResumeInfoData.data.imp_achievement_info.map(ach => ({
  //       id: ach.id,
  //       achievement_title: ach.achivement_name,
  //       organization: ach.achivement_organization_name,
  //       receive_date: ach.achivement_date ? new Date(ach.achivement_date) : null,
  //       description: ach.description
  //     }));
  //     setAchivments(achievementData);
  //   } else if (getUpdateResumeInfoData && achivments.length === 0) {
  //     // Add empty entry if no data and no existing entries
  //     setAchivments([{ id: `ach-init-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, achievement_title: "", organization: "", receive_date: null, description: "" }]);
  //   }
  // }, [getUpdateResumeInfoData]);

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

  // Function to handle ATS score analysis
  // const handleAnalyzeResume = async () => {
  //   const resumeid = getUpdateResumeInfoData?.data?.id;
  //   if (resumeid) {
  //     await dispatch(atsScoreAnalyze({ id: resumeid }));
  //     setOpenModalAnalyzeResume(true);
  //   }
  // };

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

      // dispatch(addCountResume({ ref_type: "improve_resume" })).then(res => {
      //   if (res?.payload?.status_code === 200) {

      //     dispatch(updateBasicInfo(basicInfoPayload));
      //   } else {
      //     console.log("hiii")
      //     toast.error("Your Plan Limit is Expired,Please Upgrade Your Plan!", { autoClose: false })
      //   }
      // })

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

  // const downloadDocx = async () => {
  //   if (!componentRef.current) return;

  //   const content = componentRef.current.innerHTML;

  //   const html = `
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <meta charset="utf-8" />
  //         <style>
  //           ${document.querySelector("style")?.innerHTML || ""}
  //         </style>
  //       </head>
  //       <body>
  //         ${content}
  //       </body>
  //     </html>
  //   `;

  //   const blob = await html2docx(html, null, {
  //     margins: { top: 720, right: 720, bottom: 720, left: 720 }, // Word margins
  //   });

  //   saveAs(blob, `${formValues?.full_name || "Resume"}_Resume.docx`);
  // };

  // const handleEnhancePDF = async () => {
  //   try {
  //     setEnhancing(true);

  //     const imp_resume_id = getUpdateResumeInfoData?.data?.imp_basic_info?.imp_resume_id;
  //     console.log('sss',getUpdateResumeInfoData)

  //     console.log("imp_resume_id", imp_resume_id);

  //     if (!imp_resume_id) {
  //       setEnhancing(false);
  //       return;
  //     }

  //     const payload = {
  //       imp_resume_id: imp_resume_id,
  //       imp_resume_text: getUpdateResumeInfoData?.data,
  //     };

  //     const resultAction = await dispatch(getImpEnhance(payload));

  //     if (getImpEnhance.fulfilled.match(resultAction)) {
  //       dispatch(impEnhanceUsageInfo(id))

  //       const rewriteData = resultAction?.payload?.data;
  //       console.log("rewriteData", rewriteData);

  //       // -------------------------
  //       // FIXED PAYLOAD MAPPING
  //       // -------------------------

  //       const basicPayload = {
  //         basic_info_id: getUpdateResumeInfoData?.data?.imp_basic_info?.id,
  //         ...rewriteData?.basic_information,
  //       };


  //       const expPayload = {
  //         imp_resume_id,
  //         data: rewriteData?.experience?.Experience || [],
  //       };

  //       const eduPayload = {
  //         imp_resume_id,
  //         data: rewriteData?.education?.Education || [],
  //       };

  //       const skillPayload = {
  //         imp_resume_id,
  //         data: rewriteData?.skills?.Skills || [],
  //       };

  //       const langPayload = {
  //         imp_resume_id,
  //         data: rewriteData?.languages?.Languages || [],
  //       };

  //       const certPayload = {
  //         imp_resume_id,
  //         data: rewriteData?.certifications?.Certifications || [],
  //       };

  //       const achPayload = {
  //         imp_resume_id,
  //         data: rewriteData?.achievements?.Achievements || [],
  //       };

  //       const projectPayload = {
  //         imp_resume_id,
  //         data: rewriteData?.projects?.Projects || [],
  //       };

  //       // -------------------------
  //       // DISPATCH ALL
  //       // -------------------------

  //       await dispatch(updateBasicInfo({ resumeid: imp_resume_id, data: basicPayload }));
  //       await dispatch(updateExperience({ resumeid: imp_resume_id, data: expPayload.data }));
  //       await dispatch(updateEducation({ resumeid: imp_resume_id, data: eduPayload.data }));
  //       await dispatch(updateSkills({ resumeid: imp_resume_id, data: skillPayload.data }));
  //       await dispatch(updateLanguage({ resumeid: imp_resume_id, data: langPayload.data }));
  //       await dispatch(updateCertification({ resumeid: imp_resume_id, data: certPayload.data }));
  //       await dispatch(updateAchievements({ resumeid: imp_resume_id, data: achPayload.data }));
  //       await dispatch(updateExtraProject({ resumeid: imp_resume_id, data: projectPayload.data }));


  //       await dispatch(getUpdateResumeInfo({ id }));
  //     }
  //     else {
  //       console.error("IMP Enhance Error:", resultAction.payload);
  //     }
  //   } catch (error) {
  //     console.error("Enhance PDF Error:", error);
  //   } finally {
  //     setEnhancing(false);
  //   }
  // };

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
         MAP ALL SECTIONS WITH IDS
      -------------------------------- */
      const experienceData = mapWithId(
        rewriteData?.experience?.Experience,
        resumeData?.imp_experience_info
      );

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
        resumeData?.imp_project_info
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

  return (
    <div className='lg:flex gap-5 pb-5'>
      <ToastContainer />

      <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] mb-4 lg:mb-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='border-b border-[#E5E5E5] p-5'>
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
          </div>
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
        </form>
      </div>





      <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] p-5'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-1 mb-2 lg:mb-0'>
            <button
              onClick={() => setOpenPreviewModal(true)}
              className='flex items-center gap-1 text-[16px] text-[#151515] font-medium cursor-pointer hover:text-[#800080]'
            >
              <MdPreview className='text-[#800080] text-2xl' />
              Preview
            </button>
          </div>
          <div className='lg:flex items-center gap-3'>
            <button
              onClick={handleAnalyzeResume}
              className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'
            >
              <IoStatsChart className='text-base' />Check Resume Score
            </button>
            {/* <button onClick={handleAnalyzeResume} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoStatsChart className='text-base' /> Analyze Resume</button> */}
            {/* <button onClick={() => console.log('Download DOCX clicked')} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoMdDownload className='text-[18px]' /> Download DOCX</button> */}
            {/* <button onClick={handlePrint} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download PDF</button> */}
            <div className="relative group inline-block">
              {/* <button
                onClick={remaining === 5 ? null : handlePrint}
                className={`
                              rounded-[7px] text-[12px] leading-[36px] px-4 flex items-center gap-1.5 
                              ${remaining === 5
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#800080] hover:bg-[#F6EFFF] text-white hover:text-[#92278F] cursor-pointer"
                  }
                            `}
              >
                <IoMdDownload className="text-[18px]" /> Download PDF
              </button> */}
              <button
                onClick={remaining === 5 ? null : handleDownloadWithCount}
                className={`
    rounded-[7px] text-[12px] leading-[36px] px-4 flex items-center gap-1.5 
    ${remaining === 5
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#800080] hover:bg-[#F6EFFF] text-white hover:text-[#92278F] cursor-pointer"
                  }
  `}
              >
                <IoMdDownload className="text-[18px]" /> Download PDF
              </button>


              {/* Tooltip */}
              {remaining === 5 && (
                <div className="
                              absolute left-1/2 -translate-x-1/2 top-[110%]
                              bg-black text-white text-[11px] px-2 py-1 rounded opacity-0 
                              group-hover:opacity-100 transition-all whitespace-nowrap
                            ">
                  Enhance your resume first
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='h-screen overflow-y-scroll border border-[#E5E5E5] rounded-[8px]'>
          <div ref={componentRef} className=''>
            {/* <Image src={resume_sections_view} alt="resume_sections_view" className='' /> */}
            {
              template == 1 && (
                <Template1 ref={componentRef} data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
              )
            }
            {
              template == 2 && (
                <Template2 ref={componentRef} data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates} />
              )
            }

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