'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import isEqual from 'lodash.isequal';
import { AiFillSave } from "react-icons/ai";
import { FaPen, FaTrash } from 'react-icons/fa';

//  Import @dnd-kit
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

// Import components
import ImpResumeScore from './components/ImpResumeScore';
import ImpPersonalDetails from './components/ImpPersonalDetails';
import ImpSkills from './components/ImpSkills';
import ImpSummary from './components/ImpSummary';
import ImpEducation from './components/ImpEducation';
import ImpCertifications from './components/ImpCertifications';
import ImpExperience from './components/ImpExperience';
import ImpHobbies from './components/ImpHobbies';
import ImpCourses from './components/ImpCourses';
import ImpLanguages from './components/ImpLanguages';
import ImpInternships from './components/ImpInternships';
import ImpActivities from './components/ImpActivities';
import CustomizeSection from '../ui/CustomizeSection.jsx';
import ImpCustomSection from './components/ImpCustomSection';
import AddSectionButton from './components/AddSectionButton';

//  Import Draggable Components
import DraggableWrapper from './DraggableWrapper';
import DragIcon from './DragIcon';

// Import templates
import Professional from "../TemplateNew/Professional";
import PrimeATS from "../TemplateNew/PrimeATS";
import CleanTemplate from "../TemplateNew/CleanTemplate";
import ClearTemplate from "../TemplateNew/ClearTemplate";
import VividTemplate from "../TemplateNew/VividTemplate";
import CorporateTemplate from '../TemplateNew/CorporateTemplate';

import { useTabs } from '../context/TabsContext.js';
import { checkATS, resetDashboard } from '../reducers/DashboardSlice';
import { generatePDF, getSingleResume, resetSingleResume, saveResumeImprove } from '../reducers/ResumeSlice';
import { defaultResumeSettings } from "../config/defaultResumeSettings";
import ImpSimpleCustomSection from './components/Impsimplecustomsection';
import { useDownload } from '../hooks/useDownload';
import ResumeCompareModal from '../modal/ResumeCompareModal';
import { resetAiCount } from '../reducers/PlanSlice';
import CVSkeletonLoader from '../ui/CVSkeletonLoader';
import LinkedInPrime from '../TemplateNew/LinkedInPrime';
import ResumePageViewer from '../ui/ResumePageViewer';
import ResumePreviewModal from '../modal/ResumePreviewModal';

const Page = () => {
  const componentRef = useRef();
  const templateTextSettings = useRef({});
  const hasInitialAtsCalled = useRef(false);
  const originalFormValuesRef = useRef(null);
  const dispatch = useDispatch();
  const { extracteResumeData } = useSelector((state) => state?.dash);
  const { loading, singleResumeInfo } = useSelector((state) => state?.resume);
  const { checkATSData, atsLoading } = useSelector((state) => state.dash);
  const { aiCountReset } = useSelector((state) => state.planst);

  // AI Count
  const [aiCounts, setAiCounts] = useState({
    summary_count: defaultResumeSettings.ai.summary_count,
    experience_count: defaultResumeSettings.ai.experience_count,
  });
  const aiCountsInitialized = useRef(false);

  const resumeSource =
    singleResumeInfo?.data?.data ||
    extracteResumeData?.resume_data ||
    null;

  // Resume ID tracking
  const [resumeIds, setResumeIds] = useState({ mongo_id: null, mysql_id: null });

  // Auto-Save State
  const lastSavedData = useRef(null);
  const isInitialLoad = useRef(true);
  const [savingStatus, setSavingStatus] = useState('unsaved');
  const [showCompare, setShowCompare] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [originalResumeData, setOriginalResumeData] = useState(null);
  const [originalAtsScore, setOriginalAtsScore] = useState(null);

  useEffect(() => {
    if (resumeSource && !hasInitialAtsCalled.current) {
      const atsPayload = {
        security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
        resume_data: JSON.stringify(resumeSource),
        Ats_score: 0
      };

      dispatch(checkATS(atsPayload));

      hasInitialAtsCalled.current = true;
    }
  }, [resumeSource, dispatch]);



  useEffect(() => {
    if (!atsLoading && checkATSData?.ATS_Score > 0 && originalAtsScore === null) {
      setOriginalAtsScore(checkATSData.ATS_Score);
    }
  }, [checkATSData, atsLoading, originalAtsScore]);



  // ── ATS REFRESH ──
  const handleAtsRefresh = () => {
    const payload = {
      ...formValues,
      sections,
      resume_type: "improve",
    };
    dispatch(checkATS({
      security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
      resume_data: JSON.stringify(payload),
      Ats_score: 0,
    }));
  };

  // States
  const [selectedTemplate, setSelectedTemplate] = useState('ats');
  const [sections, setSections] = useState([]);
  const [draggedSkillIndex, setDraggedSkillIndex] = useState(null);
  const [draggedEducationIndex, setDraggedEducationIndex] = useState(null);
  const [draggedCertIndex, setDraggedCertIndex] = useState(null);
  const [draggedExpIndex, setDraggedExpIndex] = useState(null);
  const [draggedCustomIndex, setDraggedCustomIndex] = useState(null);
  const [draggedCourseIndex, setDraggedCourseIndex] = useState(null);
  const [draggedLanguageIndex, setDraggedLanguageIndex] = useState(null);
  const [draggedInternshipIndex, setDraggedInternshipIndex] = useState(null);
  const [draggedActivityIndex, setDraggedActivityIndex] = useState(null);
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [resumeSettings, setResumeSettings] = useState(defaultResumeSettings);
  const [deletingSectionIndex, setDeletingSectionIndex] = useState(null);
  const { activeTab } = useTabs();

  //  Setup sensors for @dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Template mapping
  const templateMap = {
    professional: Professional,
    ats: PrimeATS,
    clean: CleanTemplate,
    clear: ClearTemplate,
    vivid: VividTemplate,
    corporate: CorporateTemplate,
    linkedin: LinkedInPrime,
  };

  const [themeColor, setThemeColor] = useState(defaultResumeSettings.theme.defaultColor);

  const handleThemeColorChange = (color) => {
    setThemeColor(color);

    setResumeSettings(prev => {
      const template = prev.theme.template;

      return {
        ...prev,
        theme: {
          ...prev.theme,
          defaultColor: color,
          templateColors: {
            ...prev.theme.templateColors,
            [template]: color,
          },
        },
      };
    });
  };

  const ActiveResume = templateMap[selectedTemplate?.toLowerCase()] || PrimeATS;

  // Form handling
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const formValues = watch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const resume_id = searchParams.get("id");
  const resume_type = searchParams.get("fetch");

  //  Handle section drag end
  const handleSectionDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSections((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // -------------------- INITIAL DATA LOAD --------------------
  useEffect(() => {
    if (!resumeSource) return;

    if (resumeSource.mongo_id || resumeSource._id) {
      setResumeIds({
        mongo_id: resumeSource.mongo_id || resumeSource._id,
        mysql_id: resumeSource.mysql_id || resumeSource.id,
      });
    }

    lastSavedData.current = JSON.parse(
      JSON.stringify({
        ...resumeSource,
        sections,
        resumeSettings: resumeSource.resumeSettings || defaultResumeSettings,
      })
    );

    setSavingStatus("saved");
    isInitialLoad.current = false;
  }, [resumeSource]);

  // -------------------- AUTO SAVE --------------------
  useEffect(() => {
    if (isInitialLoad.current) return;

    const currentData = {
      ...formValues,
      sections,
      resumeSettings,
    };

    const normalized = JSON.parse(JSON.stringify(currentData));

    if (lastSavedData.current && isEqual(normalized, lastSavedData.current)) {
      return;
    }

    setSavingStatus("saving");

    const timeoutId = setTimeout(() => {
      const payload = {
        ...currentData,
        sections,
        resumeSettings,
        resume_type: "improve",
      };

      if (resumeIds.mongo_id && resumeIds.mysql_id) {
        payload.mongo_id = resumeIds.mongo_id;
        payload.mysql_id = resumeIds.mysql_id;
      }

      dispatch(saveResumeImprove(payload)).then((res) => {
        if (res.payload?.status_code === 200) {
          setSavingStatus("saved");
          lastSavedData.current = normalized;

          if (!resumeIds.mongo_id) {
            const mongo_id = res.payload.sectionsdata?.mongo_id;
            const mysql_id = res.payload.sectionsdata?.mysql_id;

            setResumeIds({ mongo_id, mysql_id });
            router.replace(
              `/improve-resume-builder?id=${mysql_id}&fetch=improve_resume`,
              { scroll: false }
            );
          }
        } else {
          setSavingStatus("error");
        }
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formValues, sections, resumeSettings]);

  // -------------------- MANUAL SAVE --------------------
  const onSubmit = (data) => {
    setSavingStatus("saving");

    const payload = {
      ...data,
      sections,
      resumeSettings,
      resume_type: "improve",
    };

    if (resumeIds.mongo_id && resumeIds.mysql_id) {
      payload.mongo_id = resumeIds.mongo_id;
      payload.mysql_id = resumeIds.mysql_id;
    }

    dispatch(saveResumeImprove(payload)).then((res) => {
      if (res.payload?.status_code === 200) {
        setSavingStatus("saved");

        lastSavedData.current = JSON.parse(
          JSON.stringify({ ...data, sections, resumeSettings })
        );

        if (!resumeIds.mongo_id) {
          const mongo_id = res.payload.sectionsdata?.mongo_id;
          const mysql_id = res.payload.sectionsdata?.mysql_id;

          setResumeIds({ mongo_id, mysql_id });

          router.replace(
            `/improve-resume-builder?id=${mysql_id}&fetch=improve_resume`,
            { scroll: false }
          );
        }
      } else {
        setSavingStatus("error");
      }
    });
  };

  useEffect(() => {
    if (!resume_id || !resume_type) return;

    dispatch(
      getSingleResume({
        id: resume_id,
        fetch: resume_type,
      })
    );
  }, [resume_id, resume_type, dispatch]);

  // -------------------- AUTO HIDE STATUS --------------------
  useEffect(() => {
    if (savingStatus === "saved") {
      const timer = setTimeout(() => {
        setSavingStatus("unsaved");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [savingStatus]);

  // -------------------- PREVIEW EVENT LISTENER --------------------
  useEffect(() => {
    const handleOpenPreview = () => setShowPreview(true);
    window.addEventListener("open-preview", handleOpenPreview);
    return () => window.removeEventListener("open-preview", handleOpenPreview);
  }, []);

  // Helper function to map resume data to sections
  // const mapextracteResumeDataToSections = (resumeData) => {
  //   if (!resumeData) return [];

  //   let id = 0;

  //   // ----------------- SUMMARY (প্রথমে) -----------------
  //   const profileSummaryKey = Object.keys(resumeData?.additional_sections || {}).find(
  //     k => k.trim().toUpperCase() === "PROFILE SUMMARY"
  //   );
  //   const profileSummaryContent = profileSummaryKey
  //     ? resumeData.additional_sections[profileSummaryKey]?.content
  //     : null;
  //   const hasProfileSummary =
  //     Array.isArray(profileSummaryContent) &&
  //     profileSummaryContent.length > 0 &&
  //     profileSummaryContent.some(p => p?.trim());

  //   const summaryText = hasProfileSummary
  //     ? (profileSummaryContent.length > 1
  //       ? `<ul>${profileSummaryContent.map(p => `<li>${p}</li>`).join("")}</ul>`
  //       : profileSummaryContent[0])
  //     : (resumeData?.professional_summary?.summary_text || "");

  //   const summaryTitle = profileSummaryKey || "Professional Summary";

  //   const summarySection = summaryText
  //     ? { id: id++, title: summaryTitle, type: "summary", summary: summaryText }
  //     : null;

  //   // ----------------- TECHNICAL SKILLS -----------------
  //   const techCategories = resumeData?.technical_skills?.categories || {};
  //   const techSkills = Object.values(techCategories).flat();
  //   const skillsSections = [];

  //   if (techSkills.length > 0) {
  //     skillsSections.push({
  //       id: id++,
  //       title: (resumeData?.soft_skills || []).length > 0 ? "Technical Skills" : "Skills",
  //       type: "skills",
  //       skills: techSkills.map((skill, i) => ({
  //         id: `ts_${i}_${Date.now()}`,
  //         name: skill,
  //         level: 3,
  //       })),
  //     });
  //   }

  //   if ((resumeData?.soft_skills || []).length > 0) {
  //     skillsSections.push({
  //       id: id++,
  //       title: "Soft Skills",
  //       type: "skills",
  //       skills: resumeData.soft_skills.map((skill, i) => ({
  //         id: `ss_${i}_${Date.now()}`,
  //         name: skill,
  //         level: 3,
  //       })),
  //     });
  //   }

  //   // ----------------- EDUCATION -----------------
  //   const educationKey = Object.keys(resumeData?.additional_sections || {}).find(
  //     k => k.trim().toUpperCase() === "EDUCATION"
  //   );
  //   const educationTitle = educationKey || "Education";

  //   const educationSection = (resumeData?.education || []).length > 0
  //     ? {
  //       id: id++,
  //       title: educationTitle,
  //       type: "education",
  //       educations: resumeData.education.map((edu, i) => ({
  //         id: `e_${i}_${Date.now()}`,
  //         institute: edu.institution || "",
  //         degree: `${edu.degree || ""} ${edu.field_of_study || ""}`.trim(),
  //         startDate: edu.start_date || "",
  //         endDate: edu.graduation_date || "",
  //         city: edu.location || "",
  //         description: edu.description || "",
  //       })),
  //     }
  //     : null;

  //   // ----------------- CERTIFICATIONS -----------------
  //   const certKey = Object.keys(resumeData?.additional_sections || {}).find(
  //     k => k.trim().toUpperCase() === "CERTIFICATIONS"
  //   );
  //   const certTitle = certKey || "Certifications";

  //   const certSection = (resumeData?.certifications || []).length > 0
  //     ? {
  //       id: id++,
  //       title: certTitle,
  //       type: "certifications",
  //       certifications: resumeData.certifications.map((c, i) => ({
  //         id: `c_${i}_${Date.now()}`,
  //         name: c.name || "",
  //         organization: c.organization || "",
  //         city: "",
  //         startYear: "",
  //         endYear: "",
  //         description: "",
  //       })),
  //     }
  //     : null;

  //   // ----------------- EXPERIENCE -----------------
  //   const experienceKey = Object.keys(resumeData?.additional_sections || {}).find(
  //     k => ["WORK EXPERIENCE", "EXPERIENCE"].includes(k.trim().toUpperCase())
  //   );
  //   const experienceTitle = experienceKey || "Experience";

  //   const experienceSection = (resumeData?.work_experience || []).length > 0
  //     ? {
  //       id: id++,
  //       title: experienceTitle,
  //       type: "experience",
  //       experiences: resumeData.work_experience.map((exp, i) => ({
  //         id: `x_${i}_${Date.now()}`,
  //         jobTitle: exp.job_title || "",
  //         company: exp.company_name || "",
  //         city: exp.location || "",
  //         startDate: exp.start_date || "",
  //         endDate: exp.end_date || "",
  //         description: (exp.responsibilities || []).join("<br/>"),
  //       })),
  //     }
  //     : null;

  //   // ----------------- DYNAMIC ADDITIONAL SECTIONS -----------------
  //   const SKIP_KEYS = new Set([
  //     "PROFILE SUMMARY",
  //     "EDUCATION",
  //     "CERTIFICATIONS",
  //     "WORK EXPERIENCE",
  //     "EXPERIENCE",
  //     "IT SKILLS",
  //     "CONTACT DETAILS",
  //   ]);

  //   const additionalSectionsList = [];
  //   const additionalSections = resumeData?.additional_sections || {};

  //   Object.entries(additionalSections).forEach(([key, value]) => {
  //     if (SKIP_KEYS.has(key.trim().toUpperCase())) return;
  //     if (!value?.content) return;
  //     if (Array.isArray(value.content) && value.content.length === 0) return;
  //     if (typeof value.content === "string" && !value.content.trim()) return;

  //     // Detect simple list
  //     const isSimpleList = Array.isArray(value.content) && value.content.every(item => {
  //       if (typeof item === 'string') return true;
  //       if (typeof item === 'object') {
  //         const keys = Object.keys(item);
  //         return keys.length <= 2 && (
  //           (keys.includes('name') || keys.includes('title')) &&
  //           (!keys.includes('description') && !keys.includes('city') && !keys.includes('start_date'))
  //         );
  //       }
  //       return false;
  //     });

  //     if (isSimpleList) {
  //       additionalSectionsList.push({
  //         id: id++,
  //         title: key,
  //         type: "custom_simple",
  //         items: value.content.map((item, i) => ({
  //           id: `simple_${i}_${Date.now()}`,
  //           name: typeof item === "string" ? item : item.name || item.title || "",
  //           level: typeof item === "object" && item.level ? item.level : 2
  //         })),
  //         hideExperienceLevel: true
  //       });
  //     } else {
  //       additionalSectionsList.push({
  //         id: id++,
  //         title: key,
  //         type: "custom",
  //         items: Array.isArray(value.content)
  //           ? value.content.map((item, i) => ({
  //             id: `custom_${i}_${Date.now()}`,
  //             title: typeof item === "string" ? item : item.title || item.name || "",
  //             city: item.city || "",
  //             startDate: item.start_date || "",
  //             endDate: item.end_date || "",
  //             description: item.description || "",
  //           }))
  //           : [
  //             {
  //               id: `custom_0_${Date.now()}`,
  //               title: typeof value.content === "string" ? value.content : "",
  //               city: "",
  //               startDate: "",
  //               endDate: "",
  //               description: "",
  //             },
  //           ],
  //       });
  //     }
  //   });


  //   const sections = [
  //     ...(summarySection ? [summarySection] : []),
  //     ...skillsSections,
  //     ...(educationSection ? [educationSection] : []),
  //     ...(certSection ? [certSection] : []),
  //     ...(experienceSection ? [experienceSection] : []),
  //     ...additionalSectionsList,
  //   ];

  //   return sections;
  // };

  // Helper function to map resume data to sections
  const mapextracteResumeDataToSections = (resumeData) => {
    if (!resumeData) return [];

    let id = 0;
    const SKIP_KEYS = new Set();
    const normalizeStr = (str) => (str || "").trim().replace(/\s+/g, ' ').toUpperCase();

    const normalizeDateStr = (dateStr) => {
      if (!dateStr) return "";
      dateStr = dateStr.trim();
      if (/^\d{4}-\d{2}$/.test(dateStr)) return dateStr;
      const mmYyyyMatch = dateStr.match(/^(\d{2})\/(\d{4})$/);
      if (mmYyyyMatch) return `${mmYyyyMatch[2]}-${mmYyyyMatch[1]}`;
      const mmYyMatch = dateStr.match(/^(\d{2})\/(\d{2})$/);
      if (mmYyMatch) return `20${mmYyMatch[2]}-${mmYyMatch[1]}`;
      const mmYyyyMatchDash = dateStr.match(/^(\d{2})-(\d{4})$/);
      if (mmYyyyMatchDash) return `${mmYyyyMatchDash[2]}-${mmYyyyMatchDash[1]}`;
      
      const monthMap = {
        jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
        jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12'
      };
      const strLower = dateStr.toLowerCase();
      for (const [mName, mNum] of Object.entries(monthMap)) {
        if (strLower.startsWith(mName)) {
           const yearMatch = dateStr.match(/\d{2,4}$/);
           if (yearMatch) {
             let year = yearMatch[0];
             if (year.length === 2) year = '20' + year;
             return `${year}-${mNum}`;
           }
        }
      }
      if (/^\d{4}$/.test(dateStr)) return `${dateStr}-01`;
      return dateStr;
    };

    const cleanBullet = (str) => {
      if (typeof str !== 'string') return str;
      return str.replace(/^[\u2022\-\*\u25E6\u2023\u25BA]\s*/, '');
    };

    // --- Auto custom-field helpers ---
    /** Replace _ with space and title-case */
    const keyToLabel = (key) =>
      key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    /** Detect field type: 'link' | 'long_text' | 'text' */
    const detectFieldType = (value) => {
      if (!value) return 'text';
      const str = typeof value === 'string' ? value
        : Array.isArray(value) ? value.join(' ') : String(value);
      if (/^https?:\/\//i.test(str.trim())) return 'link';
      if (str.length > 120 || Array.isArray(value)) return 'long_text';
      return 'text';
    };

    /** Stringify a value for a custom field */
    const valueToCustomStr = (value, type) => {
      if (!value) return '';
      if (Array.isArray(value)) {
        if (value.length === 0) return '';
        if (type === 'long_text')
          return `<ul>${value.map(v => `<li>${cleanBullet(String(v))}</li>`).join('')}</ul>`;
        return value.filter(Boolean).join(', ');
      }
      return String(value).trim();
    };

    const extractCustomFields = (obj, handledKeys, prefix = 'cf') => {
      const result = [];
      let idx = 0;
      
      const processObj = (sourceObj) => {
        Object.entries(sourceObj || {}).forEach(([key, value]) => {
          if (handledKeys.has(key)) return;
          if (key === 'custom_fields') return; // Handled below
          if (value === null || value === undefined || value === '') return;
          if (Array.isArray(value) && value.length === 0) return;
          if (typeof value === 'object' && !Array.isArray(value)) return; // skip nested objects
          const type = detectFieldType(value);
          const str = valueToCustomStr(value, type);
          if (!str) return;
          result.push({
            id: `${prefix}_${idx++}_${Date.now()}`,
            name: keyToLabel(key),
            value: str,
            type,
          });
        });
      };

      processObj(obj);
      if (obj && obj.custom_fields && typeof obj.custom_fields === 'object') {
        processObj(obj.custom_fields);
      }

      return result;
    };

    // ----------------- SUMMARY -----------------
    let summaryText = "";
    if (resumeData?.professional_summary?.summary_text?.trim()) {
      summaryText = resumeData.professional_summary.summary_text;
    } else if (Array.isArray(resumeData?.professional_summary?.key_highlights) && resumeData.professional_summary.key_highlights.length > 0) {
      // ✅ NEW FIX: Fetching from key_highlights if summary_text is empty
      summaryText = resumeData.professional_summary.key_highlights.length > 1
        ? `<ul>${resumeData.professional_summary.key_highlights.map(p => `<li>${p}</li>`).join("")}</ul>`
        : resumeData.professional_summary.key_highlights[0];
    }

    const summarySection = summaryText
      ? { id: id++, title: "Professional Summary", type: "summary", summary: summaryText }
      : null;

    // ----------------- TECHNICAL SKILLS -----------------
    const techData = resumeData?.technical_skills || {};
    const techSkillsSet = new Set();
    Object.entries(techData).forEach(([key, value]) => {
      if (key !== 'categories' && Array.isArray(value)) {
        value.forEach(skill => {
          if (typeof skill === 'string' && skill.trim()) techSkillsSet.add(skill.trim());
        });
      }
    });
    const techSkills = Array.from(techSkillsSet);
    const skillsSections = [];

    if (techSkills.length > 0) {
      skillsSections.push({
        id: id++,
        title: (resumeData?.soft_skills || []).length > 0 ? "Technical Skills" : "Skills",
        type: "skills",
        skills: techSkills.map((skill, i) => ({
          id: `ts_${i}_${Date.now()}`,
          name: skill,
          level: 3,
        })),
      });
    }

    if ((resumeData?.soft_skills || []).length > 0) {
      skillsSections.push({
        id: id++,
        title: "Soft Skills",
        type: "skills",
        skills: resumeData.soft_skills.map((skill, i) => ({
          id: `ss_${i}_${Date.now()}`,
          name: skill,
          level: 3,
        })),
      });
    }

    // Known keys already mapped as built-in edu fields
    const EDU_HANDLED = new Set(['degree', 'field_of_study', 'institution', 'location',
      'graduation_date', 'start_date', 'end_date', 'gpa', 'percentage',
      'achievements', 'relevant_coursework', 'description']);

    const educationSection = (resumeData?.education || []).length > 0
      ? {
        id: id++,
        title: "Education",
        type: "education",
        educations: resumeData.education.map((edu, i) => {
          const customFields = [];
          let cfIdx = 0;
          // GPA / CGPA
          if (edu.gpa && String(edu.gpa).trim()) {
            customFields.push({ id: `cf_gpa_${i}_${Date.now()}`, name: 'CGPA', value: String(edu.gpa).trim(), type: 'text' });
          }
          // Percentage
          if (edu.percentage && String(edu.percentage).trim()) {
            customFields.push({ id: `cf_pct_${i}_${Date.now()}`, name: 'Percentage', value: String(edu.percentage).trim(), type: 'text' });
          }
          // Achievements array
          if (Array.isArray(edu.achievements) && edu.achievements.length > 0) {
            customFields.push({
              id: `cf_ach_${i}_${Date.now()}`,
              name: 'Achievements',
              value: `<ul>${edu.achievements.map(a => `<li>${cleanBullet(String(a))}</li>`).join('')}</ul>`,
              type: 'long_text',
            });
          }
          // Relevant Coursework
          if (Array.isArray(edu.relevant_coursework) && edu.relevant_coursework.length > 0) {
            customFields.push({
              id: `cf_rc_${i}_${Date.now()}`,
              name: 'Relevant Coursework',
              value: edu.relevant_coursework.join(', '),
              type: 'text',
            });
          }
          // Any other uncommon keys
          customFields.push(...extractCustomFields(edu, EDU_HANDLED, `edu_${i}`));

          return {
            id: `e_${i}_${Date.now()}`,
            institute: edu.institution || "",
            degree: `${edu.degree || ""} ${edu.field_of_study || ""}`.trim(),
            startDate: normalizeDateStr(edu.start_date),
            endDate: normalizeDateStr(edu.end_date || edu.graduation_date),
            city: edu.location || "",
            description: cleanBullet(edu.description),
            customFields,
          };
        }),
      }
      : null;

    // ----------------- CERTIFICATIONS -----------------
    const CERT_HANDLED = new Set(['name', 'organization', 'issuing_organization',
      'issue_date', 'expiry_date', 'description', 'location',
      'credential_id', 'credential_url', 'certificate_url']);

    const certSection = (resumeData?.certifications || []).length > 0
      ? {
        id: id++,
        title: "Certifications",
        type: "certifications",
        certifications: resumeData.certifications.map((c, i) => {
          const rawIssue = c.issue_date || "";
          const issueParts = rawIssue.split(/\s*[-\u2013]\s*/);
          const certStartYear = issueParts[0]?.trim() || "";
          const certEndYear = issueParts.length > 1 ? issueParts[1]?.trim() : (c.expiry_date || "");

          const customFields = [];
          if (c.issuing_organization || c.organization) {
            customFields.push({ id: `cf_issuer_${i}_${Date.now()}`, name: 'Issuer', value: c.issuing_organization || c.organization, type: 'text' });
          }
          if (c.credential_id) {
            customFields.push({ id: `cf_cid_${i}_${Date.now()}`, name: 'Credential ID', value: c.credential_id, type: 'text' });
          }
          if (c.credential_url || c.certificate_url) {
            customFields.push({ id: `cf_curl_${i}_${Date.now()}`, name: 'Certificate URL', value: c.credential_url || c.certificate_url, type: 'link' });
          }
          customFields.push(...extractCustomFields(c, CERT_HANDLED, `cert_${i}`));

          return {
            id: `c_${i}_${Date.now()}`,
            name: c.name || "",
            organization: c.organization || c.issuing_organization || "",
            city: "",
            startYear: certStartYear,
            endYear: certEndYear,
            description: cleanBullet(c.description) || "",
            customFields,
          };
        }),
      }
      : null;

    // ----------------- EXPERIENCE -----------------
    const EXP_HANDLED = new Set(['job_title', 'company_name', 'location', 'employment_type',
      'start_date', 'end_date', 'duration', 'responsibilities', 'achievements',
      'technologies', 'key_metrics', 'description']);

    const experienceSection = (resumeData?.work_experience || []).length > 0
      ? {
        id: id++,
        title: "Experience",
        type: "experience",
        experiences: resumeData.work_experience.map((exp, i) => {
          let rawSDate = exp.start_date || "";
          let rawEDate = exp.end_date || "";
          if (rawSDate && !rawEDate && rawSDate.includes('-') && !/^\d{4}-\d{2}$/.test(rawSDate)) {
            const parts = rawSDate.split('-');
            rawSDate = parts[0].trim();
            rawEDate = parts.slice(1).join('-').trim();
          }
          const sDate = normalizeDateStr(rawSDate);
          const eDate = normalizeDateStr(rawEDate);

          const description = Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0
            ? `<ul>${exp.responsibilities.map(r => `<li>${cleanBullet(r)}</li>`).join('')}</ul>`
            : cleanBullet(exp.description);

          // Build customFields from extra keys
          const customFields = [];
          if (Array.isArray(exp.technologies) && exp.technologies.length > 0) {
            customFields.push({
              id: `cf_tech_${i}_${Date.now()}`,
              name: 'Technologies',
              value: exp.technologies.join(', '),
              type: 'text',
            });
          }
          if (Array.isArray(exp.achievements) && exp.achievements.length > 0) {
            customFields.push({
              id: `cf_ach_${i}_${Date.now()}`,
              name: 'Key Achievements',
              value: `<ul>${exp.achievements.map(a => `<li>${cleanBullet(String(a))}</li>`).join('')}</ul>`,
              type: 'long_text',
            });
          }
          customFields.push(...extractCustomFields(exp, EXP_HANDLED, `exp_${i}`));

          return {
            id: `x_${i}_${Date.now()}`,
            jobTitle: exp.job_title || "",
            company: exp.company_name || "",
            city: exp.location || "",
            startDate: sDate,
            endDate: eDate,
            description,
            customFields,
            fieldOrder: [...customFields.map(f => f.id), 'description'],
          };
        }),
      }
      : null;

    // ----------------- PROJECTS -----------------
    const PROJ_HANDLED = new Set(['project_name', 'description', 'technologies', 'role',
      'duration', 'key_features', 'achievements', 'links', 'location',
      'start_date', 'end_date', 'key_metrics']);

    const projectSection = (resumeData?.projects || []).length > 0
      ? {
        id: id++,
        title: "Projects",
        type: "custom",
        items: resumeData.projects.map((proj, i) => {
          const description = Array.isArray(proj.key_features) && proj.key_features.length > 0
            ? `<ul>${proj.key_features.map(r => `<li>${cleanBullet(r)}</li>`).join('')}</ul>`
            : Array.isArray(proj.description) && proj.description.length > 0
            ? `<ul>${proj.description.map(r => `<li>${cleanBullet(r)}</li>`).join('')}</ul>`
            : cleanBullet(typeof proj.description === 'string' && proj.description.trim()
                ? proj.description
                : ((proj.responsibilities || []).join('<br/>') || ""));

          // Technologies → built-in field
          const technologies = Array.isArray(proj.technologies)
            ? proj.technologies.join(', ')
            : (proj.technologies || '');

          const customFields = [];
          // Role
          if (proj.role) {
            customFields.push({ id: `cf_role_${i}_${Date.now()}`, name: 'Role', value: proj.role, type: 'text' });
          }
          // Links → link type
          if (Array.isArray(proj.links)) {
            proj.links.forEach((link, li) => {
              if (link && typeof link === 'string' && link.trim()) {
                customFields.push({ id: `cf_link_${i}_${li}_${Date.now()}`, name: li === 0 ? 'Live URL' : 'Repository', value: link.trim(), type: 'link' });
              }
            });
          }
          // Achievements
          if (Array.isArray(proj.achievements) && proj.achievements.length > 0) {
            customFields.push({
              id: `cf_ach_${i}_${Date.now()}`,
              name: 'Achievements',
              value: `<ul>${proj.achievements.map(a => `<li>${cleanBullet(String(a))}</li>`).join('')}</ul>`,
              type: 'long_text',
            });
          }
          // Any other uncommon keys
          customFields.push(...extractCustomFields(proj, PROJ_HANDLED, `proj_${i}`));

          return {
            id: `proj_${i}_${Date.now()}`,
            title: proj.project_name || "",
            technologies,
            startDate: "",
            endDate: normalizeDateStr(proj.duration),
            description,
            customFields,
            fieldOrder: [...customFields.map(f => f.id), 'technologies', 'description'],
          };
        })
      }
      : null;

    // ----------------- ACHIEVEMENTS & AWARDS -----------------
    const achievementsSection = (resumeData?.achievements_awards || []).length > 0
      ? {
        id: id++,
        title: "Achievements & Awards",
        type: "custom",
        items: resumeData.achievements_awards.map((ach, i) => ({
          id: `ach_${i}_${Date.now()}`,
          title: ach.title || "",
          city: ach.issuer || "",
          startDate: normalizeDateStr(ach.date),
          endDate: "",
          description: cleanBullet(ach.description),
        }))
      } : null;

    // ----------------- PUBLICATIONS -----------------
    const publicationsSection = (resumeData?.publications || []).length > 0
      ? {
        id: id++,
        title: "Publications",
        type: "custom",
        items: resumeData.publications.map((pub, i) => ({
          id: `pub_${i}_${Date.now()}`,
          title: pub.title || "",
          city: pub.publisher || "",
          startDate: normalizeDateStr(pub.date || pub.published_date),
          endDate: "",
          description: cleanBullet(pub.description),
        }))
      } : null;

    // ----------------- LANGUAGES -----------------
    const languagesArray = resumeData?.personal_information?.languages || [];
    const languageSection = languagesArray.length > 0
      ? {
        id: id++,
        title: "Languages",
        type: "languages",
        hideProficiency: false,
        languages: languagesArray.map((lang, i) => ({
          id: `lang_${i}_${Date.now()}`,
          language: typeof lang === "string" ? lang : (lang.name || lang.language || ""),
          level: typeof lang === "object" && lang.level ? lang.level : "Intermediate"
        }))
      } : null;

    // ----------------- DYNAMIC ADDITIONAL SECTIONS -----------------
    // Skip redundant headers/contact details extracted by AI
    ["CONTACT DETAILS", "CONTACT INFORMATION", "HEADER", "IT SKILLS", "TECHNICAL SKILLS"].forEach(k => SKIP_KEYS.add(k));
    
    let addSectionsArray = [];
    if (Array.isArray(resumeData?.additional_sections)) {
      addSectionsArray = resumeData.additional_sections.map(sec => ({
         key: sec.section_title || "",
         value: sec
      }));
    } else if (resumeData?.additional_sections && typeof resumeData.additional_sections === 'object') {
      addSectionsArray = Object.entries(resumeData.additional_sections).map(([k, v]) => ({
         key: k,
         value: v
      }));
    }

    addSectionsArray.forEach(({key}) => {
      if (normalizeStr(key).includes("HEADER") || normalizeStr(key).includes("CONTACT")) {
        SKIP_KEYS.add(normalizeStr(key));
      }
    });

    const additionalSectionsList = [];

    addSectionsArray.forEach(({key, value}) => {
      if (!key || SKIP_KEYS.has(normalizeStr(key))) return;
      if (!value?.content && !value?.details) return;
      if (Array.isArray(value.content) && value.content.length === 0 && !value.details) return;
      if (typeof value.content === "string" && !value.content.trim() && !value.details) return;

      const isSimpleList = Array.isArray(value.content) && value.content.every(item => {
        if (typeof item === 'string') return true;
        if (typeof item === 'object') {
          const keys = Object.keys(item);
          return keys.length <= 2 && (
            (keys.includes('name') || keys.includes('title')) &&
            (!keys.includes('description') && !keys.includes('city') && !keys.includes('start_date'))
          );
        }
        return false;
      });

      if (isSimpleList) {
        additionalSectionsList.push({
          id: id++,
          title: key,
          type: "custom_simple",
          items: value.content.map((item, i) => ({
            id: `simple_${i}_${Date.now()}`,
            name: typeof item === "string" ? item : item.name || item.title || "",
            level: typeof item === "object" && item.level ? item.level : 2
          })),
          hideExperienceLevel: true
        });
      } else {
        const contentArray = Array.isArray(value.content) ? value.content : [value.content];
        additionalSectionsList.push({
          id: id++,
          title: key,
          type: "custom",
          items: contentArray.filter(item => typeof item === "string" ? item.trim() : item).map((item, i) => ({
            id: `custom_${i}_${Date.now()}`,
            title: typeof item === "string" ? item : item.title || item.name || "",
            city: item.city || "",
            startDate: item.start_date || "",
            endDate: item.end_date || "",
            description: item.description || "",
          }))
        });
      }
    });

    return [
      ...(summarySection ? [summarySection] : []),
      ...skillsSections,
      ...(languageSection ? [languageSection] : []),
      ...(educationSection ? [educationSection] : []),
      ...(certSection ? [certSection] : []),
      ...(experienceSection ? [experienceSection] : []),
      ...(projectSection ? [projectSection] : []),
      ...(achievementsSection ? [achievementsSection] : []),
      ...(publicationsSection ? [publicationsSection] : []),
      ...additionalSectionsList,
    ];
  };

  // ----------------- SETTING FORM VALUES -----------------
  // useEffect(() => {
  //   if (!resumeSource) return;

  //   const resumeData = extracteResumeData?.resume_data || resumeSource;
  //   const personal = resumeData?.personal_information || {};
  //   const meta = resumeData?.metadata || {};

  //   const profileSummaryKey = Object.keys(resumeData?.additional_sections || {}).find(
  //     k => k.trim().toUpperCase() === "PROFILE SUMMARY"
  //   );
  //   const profileSummaryContent = profileSummaryKey
  //     ? resumeData.additional_sections[profileSummaryKey]?.content
  //     : null;
  //   const hasProfileSummary =
  //     Array.isArray(profileSummaryContent) &&
  //     profileSummaryContent.length > 0 &&
  //     profileSummaryContent.some(p => p?.trim());

  //   const summaryPoints = hasProfileSummary
  //     ? profileSummaryContent
  //     : (resumeData?.professional_summary?.summary_text
  //       ? [resumeData.professional_summary.summary_text]
  //       : []);

  //   const formattedSummary =
  //     summaryPoints.length > 1
  //       ? `<ul>${summaryPoints.map(p => `<li>${p}</li>`).join("")}</ul>`
  //       : summaryPoints[0] || "";

  //   const fullName = personal.full_name || "";
  //   const nameParts = fullName.split(" ");

  //   setValue("job_target", meta.current_role || resumeSource.job_target || "");
  //   setValue("first_name", nameParts[0] || resumeSource.first_name || "");
  //   setValue("last_name", nameParts.slice(1).join(" ") || resumeSource.last_name || "");
  //   setValue("email", personal.email || resumeSource.email || "");
  //   setValue("phone", personal.phone || resumeSource.phone || "");
  //   setValue(
  //     "city_state",
  //     [personal.location?.city, personal.location?.state].filter(Boolean).join(", ") || resumeSource.city_state || ""
  //   );
  //   setValue("country", personal.location?.country || resumeSource.country || "");
  //   setValue("address", personal.location?.full_address || resumeSource.address || "");
  //   setValue("summary", formattedSummary || resumeSource.summary || "");
  //   setValue("profileImage", resumeSource.profileImage || "");

  //   setValue("linkedin", resumeSource.linkedin || "");
  //   setValue("github", resumeSource.github || "");
  //   setValue("stackoverflow", resumeSource.stackoverflow || "");
  //   setValue("leetcode", resumeSource.leetcode || "");
  //   setValue("postal_code", resumeSource.postal_code || "");
  //   setValue("nationality", resumeSource.nationality || "");
  //   setValue("birth_place", resumeSource.birth_place || "");
  //   setValue("dob", resumeSource.dob || "");
  //   setValue("driving_licence", resumeSource.driving_licence || "");


  //   if (!originalFormValuesRef.current) {
  //     const clonedSource = JSON.parse(JSON.stringify(resumeSource));
  //     const initialSettings = clonedSource.resumeSettings || defaultResumeSettings;
  //     const initialSections = clonedSource.sections?.length
  //       ? clonedSource.sections
  //       : mapextracteResumeDataToSections(clonedSource);

  //     const personal = (extracteResumeData?.resume_data || resumeSource)?.personal_information || {};
  //     const meta = (extracteResumeData?.resume_data || resumeSource)?.metadata || {};
  //     const fullName = personal.full_name || "";
  //     const nameParts = fullName.split(" ");

  //     const originalFormData = {
  //       job_target: meta.current_role || clonedSource.job_target || "",
  //       first_name: nameParts[0] || clonedSource.first_name || "",
  //       last_name: nameParts.slice(1).join(" ") || clonedSource.last_name || "",
  //       email: personal.email || clonedSource.email || "",
  //       phone: personal.phone || clonedSource.phone || "",
  //       city_state: [personal.location?.city, personal.location?.state].filter(Boolean).join(", ") || clonedSource.city_state || "",
  //       country: personal.location?.country || clonedSource.country || "",
  //       address: personal.location?.full_address || clonedSource.address || "",
  //       profileImage: clonedSource.profileImage || "",
  //       linkedin: clonedSource.linkedin || "",
  //       github: clonedSource.github || "",
  //       stackoverflow: clonedSource.stackoverflow || "",
  //       leetcode: clonedSource.leetcode || "",
  //       postal_code: clonedSource.postal_code || "",
  //     };

  //     originalFormValuesRef.current = originalFormData;

  //     setOriginalResumeData({
  //       ...originalFormData,
  //       sections: initialSections,
  //       oldResumeSettings: {
  //         ...initialSettings,
  //         theme: { ...initialSettings.theme, template: "ats" } // ✅ সবসময় ats
  //       }
  //     });
  //   }

  // }, [extracteResumeData, resumeSource, setValue]);

// ----------------- SETTING FORM VALUES -----------------
  useEffect(() => {
    if (!resumeSource) return;

    const resumeData = extracteResumeData?.resume_data || resumeSource;
    const personal = resumeData?.personal_information || {};
    const meta = resumeData?.metadata || {};
    const normalizeStr = (str) => (str || "").trim().replace(/\s+/g, ' ').toUpperCase();

    let formattedSummary = "";
    if (resumeData?.professional_summary?.summary_text?.trim()) {
      formattedSummary = resumeData.professional_summary.summary_text;
    } else if (Array.isArray(resumeData?.professional_summary?.key_highlights) && resumeData.professional_summary.key_highlights.length > 0) {
      formattedSummary = resumeData.professional_summary.key_highlights.length > 1
        ? `<ul>${resumeData.professional_summary.key_highlights.map(p => `<li>${p}</li>`).join("")}</ul>`
        : resumeData.professional_summary.key_highlights[0];
    }

    const fullName = personal.full_name || "";
    const nameParts = fullName.split(" ");
    
    const emailStr = Array.isArray(personal.email) ? personal.email.join(" / ") : personal.email;
    const phoneStr = Array.isArray(personal.phone) ? personal.phone.join(" / ") : personal.phone;

    setValue("job_target", personal.job_title || meta.current_role || resumeSource.job_target || "");
    setValue("first_name", nameParts[0] || resumeSource.first_name || "");
    setValue("last_name", nameParts.slice(1).join(" ") || resumeSource.last_name || "");
    setValue("email", emailStr || resumeSource.email || "");
    setValue("phone", phoneStr || resumeSource.phone || "");
    setValue(
      "city_state",
      [personal.location?.city, personal.location?.state].filter(Boolean).join(", ") || resumeSource.city_state || ""
    );
    setValue("country", personal.location?.country || resumeSource.country || "");
    setValue("address", personal.location?.full_address || resumeSource.address || "");
    setValue("summary", formattedSummary || resumeSource.summary || "");
    setValue("profileImage", resumeSource.profileImage || "");

    setValue("linkedin", personal.linkedin || resumeSource.linkedin || "");
    setValue("github", personal.github || resumeSource.github || "");
    setValue("stackoverflow", resumeSource.stackoverflow || "");
    setValue("leetcode", resumeSource.leetcode || "");
    setValue("postal_code", resumeSource.postal_code || "");
    setValue("nationality", resumeSource.nationality || "");
    setValue("birth_place", resumeSource.birth_place || "");
    setValue("dob", resumeSource.dob || "");
    setValue("driving_licence", resumeSource.driving_licence || "");

    if (!originalFormValuesRef.current) {
      const clonedSource = JSON.parse(JSON.stringify(resumeSource));
      const initialSettings = clonedSource.resumeSettings || defaultResumeSettings;
      const initialSections = clonedSource.sections?.length
        ? clonedSource.sections
        : mapextracteResumeDataToSections(clonedSource);

      const originalFormData = {
        job_target: meta.current_role || clonedSource.job_target || "",
        first_name: nameParts[0] || clonedSource.first_name || "",
        last_name: nameParts.slice(1).join(" ") || clonedSource.last_name || "",
        email: emailStr || clonedSource.email || "",
        phone: phoneStr || clonedSource.phone || "",
        city_state: [personal.location?.city, personal.location?.state].filter(Boolean).join(", ") || clonedSource.city_state || "",
        country: personal.location?.country || clonedSource.country || "",
        address: personal.location?.full_address || clonedSource.address || "",
        profileImage: clonedSource.profileImage || "",
        linkedin: personal.linkedin || clonedSource.linkedin || "",
        github: personal.github || clonedSource.github || "",
        stackoverflow: clonedSource.stackoverflow || "",
        leetcode: clonedSource.leetcode || "",
        postal_code: clonedSource.postal_code || "",
      };

      originalFormValuesRef.current = originalFormData;

      setOriginalResumeData({
        ...originalFormData,
        sections: initialSections,
        oldResumeSettings: {
          ...initialSettings,
          theme: { ...initialSettings.theme, template: "ats" }
        }
      });
    }

  }, [extracteResumeData, resumeSource, setValue]);

  // ----------------- SYNC SUMMARY -----------------
  useEffect(() => {
    const summarySections = sections.filter(sec => sec.type === "summary");
    if (summarySections.length > 0) {
      const summaryText = summarySections[0].summary || "";
      setValue("summary", summaryText);
    }
  }, [sections, setValue]);

  // ----------------- MAP SECTIONS + RESTORE SETTINGS -----------------
  useEffect(() => {
    if (!resumeSource) return;

    if (resumeSource.resumeSettings) {
      const settings = resumeSource.resumeSettings;
      setResumeSettings(settings);

      const template = settings.theme?.template || "professional";
      setSelectedTemplate(template);

      const color =
        settings.theme?.templateColors?.[template] ||
        settings.theme?.defaultColor ||
        defaultResumeSettings.theme.defaultColor;

      setThemeColor(color);

      // Ai Count 
      if (!aiCountsInitialized.current && settings.ai) {
        setAiCounts({
          summary_count: settings.ai.summary_count ?? defaultResumeSettings.ai.summary_count,
          experience_count: settings.ai.experience_count ?? defaultResumeSettings.ai.experience_count,
        });
        aiCountsInitialized.current = true;
      }
    }



    if (resumeSource.sections?.length) {
      setSections(resumeSource.sections);
      return;
    }

    const mappedSections = mapextracteResumeDataToSections(resumeSource);
    setSections(mappedSections);

  }, [resumeSource]);

  // AI Count
  const handleUseAiCount = (type) => {
    if (type === "summary") {
      setAiCounts(prev => ({
        ...prev,
        summary_count: Math.max(0, prev.summary_count - 1),
      }));
    } else if (type === "experience") {
      setAiCounts(prev => ({
        ...prev,
        experience_count: Math.max(0, prev.experience_count - 1),
      }));
    }
  };

  // AI Count
  useEffect(() => {
    setResumeSettings(prev => ({
      ...prev,
      ai: {
        summary_count: aiCounts.summary_count,
        experience_count: aiCounts.experience_count,
      },
    }));
  }, [aiCounts]);

  // AI Count
  useEffect(() => {
    if (!aiCountReset) return;

    setAiCounts({
      summary_count: defaultResumeSettings.ai.summary_count,
      experience_count: defaultResumeSettings.ai.experience_count,
    });

    dispatch(resetAiCount());
  }, [aiCountReset]);

  // ----------------- SYNC SKILLS -----------------
  useEffect(() => {
    const skillSections = sections.filter(sec => sec.type === "skills");
    const mergedSkills = skillSections.flatMap(sec =>
      (sec.skills || []).map(skill => ({ skill: skill.name, level: skill.level ?? 3 }))
    );
    setValue("newSkillHistory", mergedSkills);
  }, [sections, setValue]);

  // ----------------- SYNC EDUCATION -----------------
  useEffect(() => {
    const educationSections = sections.filter(sec => sec.type === "education");
    const educationHistory = educationSections.flatMap(sec =>
      (sec.educations || []).map(edu => ({
        school: edu.institute || "",
        degree: edu.degree || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
        city_state: edu.city || "",
        description: edu.description || "",
      }))
    );
    setValue("educationHistory", educationHistory);
  }, [sections, setValue]);

  // ----------------- SYNC EXPERIENCE -----------------
  useEffect(() => {
    const expSections = sections.filter(sec => sec.type === "experience");
    const employmentHistory = expSections.flatMap(sec =>
      (sec.experiences || []).map(exp => ({
        job_title: exp.jobTitle || "",
        employer: exp.company || "",
        city_state: exp.city || "",
        startDate: exp.startDate || "",
        endDate: exp.endDate || "",
        description: exp.description || "",
      }))
    );
    setValue("employmentHistory", employmentHistory);
  }, [sections, setValue]);

  // Skill handlers
  const handleSkillDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedSkillIndex(index);
  };

  const handleSkillDrop = (e, sectionIndex, targetSkillIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedSkillIndex === null || draggedSkillIndex === targetSkillIndex) return;

    const updatedSections = [...sections];
    const skillsList = [...updatedSections[sectionIndex].skills];

    const [movedSkill] = skillsList.splice(draggedSkillIndex, 1);
    skillsList.splice(targetSkillIndex, 0, movedSkill);

    updatedSections[sectionIndex].skills = skillsList;
    setSections(updatedSections);
    setDraggedSkillIndex(null);
  };

  const handleSkillUpdate = (sectionIndex, skillId, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, skills: value };
        }
        if (field === "add") {
          return {
            ...section,
            skills: [...section.skills, value],
          };
        }

        if (skillId === null) {
          return {
            ...section,
            [field]: value,
          };
        }

        if (field === "delete") {
          return {
            ...section,
            skills: section.skills.filter(
              skill => skill.id !== skillId
            ),
          };
        }

        return {
          ...section,
          skills: section.skills.map(skill =>
            skill.id === skillId
              ? { ...skill, [field]: value }
              : skill
          ),
        };
      })
    );
  };

  // Education handlers
  const handleEducationDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedEducationIndex(index);
  };

  const handleEducationDrop = (e, sectionIndex, targetEduIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedEducationIndex === null || draggedEducationIndex === targetEduIndex) return;

    const updatedSections = [...sections];
    const educationList = [...updatedSections[sectionIndex].educations];

    const [movedEdu] = educationList.splice(draggedEducationIndex, 1);
    educationList.splice(targetEduIndex, 0, movedEdu);

    updatedSections[sectionIndex].educations = educationList;
    setSections(updatedSections);
    setDraggedEducationIndex(null);
  };

  const handleEducationUpdate = (sectionIndex, eduId, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, educations: value };
        }
        if (field === "delete") {
          return {
            ...section,
            educations: section.educations.filter(
              edu => edu.id !== eduId
            ),
          };
        }
        return {
          ...section,
          educations: section.educations.map(edu =>
            edu.id === eduId
              ? { ...edu, [field]: value }
              : edu
          ),
        };
      })
    );
  };

  const handleAddEducation = (sectionIndex) => {
    const newEducation = {
      id: `e${Date.now()}`,
      institute: "",
      degree: "",
      startDate: "",
      endDate: "",
      city: "",
      description: ""
    };

    setSections(prev =>
      prev.map((section, i) =>
        i === sectionIndex
          ? { ...section, educations: [...section.educations, newEducation] }
          : section
      )
    );
  };

  // Certification handlers
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
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, certifications: value };
        }
        if (field === "delete") {
          return {
            ...section,
            certifications: section.certifications.filter(
              cert => cert.id !== certId
            ),
          };
        }

        return {
          ...section,
          certifications: section.certifications.map(cert =>
            cert.id === certId
              ? { ...cert, [field]: value }
              : cert
          ),
        };
      })
    );
  };

  const handleAddCertification = (sectionIndex) => {
    const newCert = {
      id: `c${Date.now()}`,
      name: "",
      organization: "",
      city: "",
      startYear: "",
      endYear: "",
      description: ""
    };

    setSections(prev =>
      prev.map((section, i) =>
        i === sectionIndex
          ? { ...section, certifications: [...section.certifications, newCert] }
          : section
      )
    );
  };

  // Experience handlers
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
    setSections(prevSections =>
      prevSections.map((section, sIndex) => {
        if (sIndex !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, experiences: value };
        }
        if (field === "delete") {
          return {
            ...section,
            experiences: section.experiences.filter(
              exp => exp.id !== expId
            ),
          };
        }

        return {
          ...section,
          experiences: section.experiences.map(exp =>
            exp.id === expId ? { ...exp, [field]: value } : exp
          ),
        };
      })
    );
  };

  const handleAddExperience = (sectionIndex) => {
    setSections(prevSections =>
      prevSections.map((section, sIndex) => {
        if (sIndex !== sectionIndex) return section;

        return {
          ...section,
          experiences: [
            ...section.experiences,
            {
              id: `x${Date.now()}`,
              jobTitle: "",
              company: "",
              city: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
        };
      })
    );
  };

  const handleCustomDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedCustomIndex(index);
  };

  const handleCustomDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (draggedCustomIndex === null || draggedCustomIndex === targetIndex) return;

    const updatedSections = [...sections];
    const itemsList = [...updatedSections[sectionIndex].items];

    const [movedItem] = itemsList.splice(draggedCustomIndex, 1);
    itemsList.splice(targetIndex, 0, movedItem);

    updatedSections[sectionIndex].items = itemsList;
    setSections(updatedSections);
    setDraggedCustomIndex(null);
  };

  const handleCustomUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, items: value };
        }
        if (field === "delete") {
          return {
            ...section,
            items: section.items.filter(item => item.id !== itemId),
          };
        }
        return {
          ...section,
          items: section.items.map(item =>
            item.id === itemId
              ? { ...item, [field]: value }
              : item
          ),
        };
      })
    );
  };

  const handleAddCustomItem = (sectionIndex) => {
    const newItem = {
      id: `custom_${Date.now()}`,
      title: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setSections(prev =>
      prev.map((section, i) =>
        i === sectionIndex
          ? { ...section, items: [...section.items, newItem] }
          : section
      )
    );
  };

  const handleSimpleCustomUpdate = (sectionIndex, itemIndex, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, items: value };
        }

        if (itemIndex === null && field !== "add") {
          return { ...section, [field]: value };
        }
        if (field === "add") {
          return {
            ...section,
            items: [...(section.items || []), value]
          };
        }

        if (field === "delete") {
          return {
            ...section,
            items: section.items.filter((_, idx) => idx !== itemIndex),
          };
        }

        return {
          ...section,
          items: section.items.map((item, idx) => {
            if (idx !== itemIndex) return item;
            const itemObj = typeof item === 'object' ? item : { name: item, level: 2 };
            return { ...itemObj, [field]: value };
          }),
        };
      })
    );
  };


  // --- Hobbies Handler ---
  const handleHobbiesUpdate = (sectionIndex, field, value) => {
    setSections(prev =>
      prev.map((section, i) =>
        i !== sectionIndex ? section : { ...section, [field]: value }
      )
    );
  };

  // --- Courses Handlers ---
  const handleCourseDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedCourseIndex(index);
  };

  const handleCourseDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedCourseIndex === null || draggedCourseIndex === targetIndex) return;
    const updatedSections = [...sections];
    const list = [...updatedSections[sectionIndex].courses];
    const [moved] = list.splice(draggedCourseIndex, 1);
    list.splice(targetIndex, 0, moved);
    updatedSections[sectionIndex].courses = list;
    setSections(updatedSections);
    setDraggedCourseIndex(null);
  };

  const handleCourseUpdate = (sectionIndex, courseId, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, courses: value };
        }
        if (field === 'delete') {
          return { ...section, courses: section.courses.filter(c => c.id !== courseId) };
        }
        return {
          ...section,
          courses: section.courses.map(c =>
            c.id === courseId ? { ...c, [field]: value } : c
          ),
        };
      })
    );
  };

  const handleAddCourse = (sectionIndex) => {
    setSections(prev =>
      prev.map((section, i) =>
        i !== sectionIndex ? section : {
          ...section,
          courses: [...(section.courses || []), {
            id: `course_${Date.now()}`,
            course: '',
            institution: '',
            startDate: '',
            endDate: '',
          }]
        }
      )
    );
  };

  // --- Languages Handlers ---
  const handleLanguageDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedLanguageIndex(index);
  };

  const handleLanguageDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedLanguageIndex === null || draggedLanguageIndex === targetIndex) return;
    const updatedSections = [...sections];
    const list = [...updatedSections[sectionIndex].languages];
    const [moved] = list.splice(draggedLanguageIndex, 1);
    list.splice(targetIndex, 0, moved);
    updatedSections[sectionIndex].languages = list;
    setSections(updatedSections);
    setDraggedLanguageIndex(null);
  };

  const handleLanguageUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, languages: value };
        }
        if (itemId === null && field !== 'add') {
          return { ...section, [field]: value };
        }
        if (field === 'add') {
          return { ...section, languages: [...(section.languages || []), value] };
        }
        if (field === 'delete') {
          return { ...section, languages: section.languages.filter(l => l.id !== itemId) };
        }
        return {
          ...section,
          languages: section.languages.map(l =>
            l.id === itemId ? { ...l, [field]: value } : l
          ),
        };
      })
    );
  };

  // --- Internships Handlers ---
  const handleInternshipDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedInternshipIndex(index);
  };

  const handleInternshipDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedInternshipIndex === null || draggedInternshipIndex === targetIndex) return;
    const updatedSections = [...sections];
    const list = [...updatedSections[sectionIndex].internships];
    const [moved] = list.splice(draggedInternshipIndex, 1);
    list.splice(targetIndex, 0, moved);
    updatedSections[sectionIndex].internships = list;
    setSections(updatedSections);
    setDraggedInternshipIndex(null);
  };

  const handleInternshipUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === "reorder") {
          return { ...section, internships: value };
        }
        if (field === 'delete') {
          return { ...section, internships: section.internships.filter(item => item.id !== itemId) };
        }
        return {
          ...section,
          internships: section.internships.map(item =>
            item.id === itemId ? { ...item, [field]: value } : item
          ),
        };
      })
    );
  };

  const handleAddInternship = (sectionIndex) => {
    setSections(prev =>
      prev.map((section, i) =>
        i !== sectionIndex ? section : {
          ...section,
          internships: [...(section.internships || []), {
            id: `intern_${Date.now()}`,
            jobTitle: '',
            employer: '',
            city: '',
            startDate: '',
            endDate: '',
            description: '',
            isCurrentlyInterning: false,
          }]
        }
      )
    );
  };

  // --- Activities Handlers ---
  const handleActivityDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedActivityIndex(index);
  };

  const handleActivityDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedActivityIndex === null || draggedActivityIndex === targetIndex) return;
    const updatedSections = [...sections];
    const list = [...updatedSections[sectionIndex].activities];
    const [moved] = list.splice(draggedActivityIndex, 1);
    list.splice(targetIndex, 0, moved);
    updatedSections[sectionIndex].activities = list;
    setSections(updatedSections);
    setDraggedActivityIndex(null);
  };

  const handleActivityUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;
        if (field === 'delete') {
          return { ...section, activities: section.activities.filter(a => a.id !== itemId) };
        }
        if (field === "reorder") {
          return { ...section, activities: value };
        }
        return {
          ...section,
          activities: section.activities.map(a =>
            a.id === itemId ? { ...a, [field]: value } : a
          ),
        };
      })
    );
  };

  const handleAddActivity = (sectionIndex) => {
    setSections(prev =>
      prev.map((section, i) =>
        i !== sectionIndex ? section : {
          ...section,
          activities: [...(section.activities || []), {
            id: `activity_${Date.now()}`,
            functionTitle: '',
            employer: '',
            city: '',
            startDate: '',
            endDate: '',
            description: '',
            isCurrentlyActive: false,
          }]
        }
      )
    );
  };

  const handleSelectTemplate = (id) => {
    const templateKey = id.toLowerCase();

    const currentTemplate = resumeSettings.theme?.template;
    if (currentTemplate) {
      templateTextSettings.current[currentTemplate] = { ...resumeSettings.text };
    }

    setSelectedTemplate(id);

    const color =
      defaultResumeSettings.theme.templateColors[templateKey] ||
      defaultResumeSettings.theme.defaultColor;
    setThemeColor(color);

    const savedTextForTemplate = templateTextSettings.current[templateKey];
    const textOverrides = defaultResumeSettings.templateTextOverrides?.[templateKey] || {};

    const newText = savedTextForTemplate
      ? savedTextForTemplate
      : { ...defaultResumeSettings.text, ...textOverrides };

    setResumeSettings(prev => ({
      ...prev,
      theme: { ...prev.theme, template: id },
      text: newText,
    }));
  };

  const handleAddNewSection = (newSection) => {
    const newId = Math.max(...sections.map(s => s.id), -1) + 1;
    const sectionToAdd = { id: newId, ...newSection };
    setSections([...sections, sectionToAdd]);
  };

  const handleSectionTitleUpdate = (sectionIndex, newTitle) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      title: newTitle
    };
    setSections(updatedSections);
  };

  const handleDeleteSection = (sectionIndex) => {
    const updatedSections = sections.filter((_, i) => i !== sectionIndex);
    setSections(updatedSections);
  };

  const handleAnimatedDeleteSection = (index) => {
    setDeletingSectionIndex(index);

    setTimeout(() => {
      handleDeleteSection(index);
      setDeletingSectionIndex(null);
    }, 500);
  };

  // Dummy handler for child components
  const handleDragEnd = () => { };

  useDownload({ componentRef, formValues, resumeSettings, sections, themeColor, resumeType: "i" });


  useEffect(() => {
    return () => {
      dispatch(resetDashboard());
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetDashboard());
      dispatch(resetSingleResume());
    };
  }, []);

  if (!resumeSource) {
    return <CVSkeletonLoader />;
  }
  return (
    <div className='lg:flex gap-1 pb-0'>
      <ToastContainer />

      <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] h-screen overflow-auto hide-scrollbar'>
        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <ImpResumeScore
                score={checkATSData?.ATS_Score}
                loading={atsLoading}
                guide={checkATSData?.Improvment_Guide}
                isComparingLoading={originalAtsScore === null}
                onCompareClick={() => originalAtsScore !== null && setShowCompare(true)}
                onPreviewClick={() => setShowPreview(true)}
              />

              <ImpPersonalDetails register={register} watch={watch} selectedTemplate={selectedTemplate} setValue={setValue} />

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleSectionDragEnd}
              >
                <SortableContext
                  items={sections.map(s => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {sections.map((section, index) => (
                      <DraggableWrapper key={section.id} id={section.id}>
                        <div
                          className={`
                            mb-[4px] transition-all duration-200 bg-white rounded-xl section-item
                            ${deletingSectionIndex === index
                              ? "!bg-red-400 !-translate-x-6 !opacity-0"
                              : "!bg-white !opacity-100 !translate-x-0"}
                          `}
                        >
                          <div className="acco_section">
                            <Accordion flush={true}>
                              <AccordionPanel>
                                <AccordionTitle className="group font-bold text-xl flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1">
                                    <DragIcon />

                                    {editingSectionIndex === index ? (
                                      <input
                                        autoFocus
                                        defaultValue={section.title}
                                        onBlur={(e) => {
                                          setEditingSectionIndex(null);
                                          if (e.target.value.trim()) {
                                            handleSectionTitleUpdate(index, e.target.value.trim());
                                          }
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") e.target.blur();
                                        }}
                                        className="bg-transparent border-b border-gray-300 outline-none text-xl font-bold w-full"
                                      />
                                    ) : (
                                      <span
                                        className="cursor-pointer"
                                        onClick={() => setEditingSectionIndex(index)}
                                      >
                                        {section.title}
                                      </span>
                                    )}
                                  </div>
                                  <div
                                    className="
                                      flex items-center gap-3
                                      opacity-0 translate-x-2
                                      group-hover:opacity-100 group-hover:translate-x-0
                                      transition-all duration-200
                                    "
                                  >
                                    <FaPen
                                      className="text-sm text-gray-400 hover:text-purple-600 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingSectionIndex(index);
                                      }}
                                    />
                                    <FaTrash
                                      className="text-sm text-gray-400 hover:text-red-500 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAnimatedDeleteSection(index);
                                      }}
                                    />
                                  </div>
                                </AccordionTitle>

                                <AccordionContent className='pt-0'>
                                  {section.type === 'skills' && (
                                    <ImpSkills
                                      section={section}
                                      sectionIndex={index}
                                      handleSkillUpdate={handleSkillUpdate}
                                      handleSkillDragStart={handleSkillDragStart}
                                      handleSkillDrop={handleSkillDrop}
                                      draggedSkillIndex={draggedSkillIndex}
                                      setDraggedSkillIndex={setDraggedSkillIndex}
                                    />
                                  )}

                                  {section.type === "summary" && (
                                    <ImpSummary
                                      watch={watch}
                                      setValue={setValue}
                                      sections={sections}
                                      setSections={setSections}
                                      sectionIndex={index}
                                      onAtsRefresh={handleAtsRefresh}
                                      // Ai Count 
                                      aiSummaryCount={aiCounts.summary_count}
                                      onUseAiCount={() => handleUseAiCount("summary")}
                                    />
                                  )}

                                  {section.type === "education" && (
                                    <ImpEducation
                                      section={section}
                                      sectionIndex={index}
                                      handleEducationUpdate={handleEducationUpdate}
                                      handleEducationDragStart={handleEducationDragStart}
                                      handleEducationDrop={handleEducationDrop}
                                      handleAddEducation={handleAddEducation}
                                      draggedEducationIndex={draggedEducationIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}

                                  {section.type === "certifications" && (
                                    <ImpCertifications
                                      section={section}
                                      sectionIndex={index}
                                      handleCertUpdate={handleCertUpdate}
                                      handleCertDragStart={handleCertDragStart}
                                      handleCertDrop={handleCertDrop}
                                      handleAddCertification={handleAddCertification}
                                      draggedCertIndex={draggedCertIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}

                                  {section.type === "experience" && (
                                    <ImpExperience
                                      section={section}
                                      sectionIndex={index}
                                      handleExpUpdate={handleExpUpdate}
                                      handleExpDragStart={handleExpDragStart}
                                      handleExpDrop={handleExpDrop}
                                      handleAddExperience={handleAddExperience}
                                      draggedExpIndex={draggedExpIndex}
                                      handleDragEnd={handleDragEnd}
                                      onAtsRefresh={handleAtsRefresh}
                                      // Ai Count 
                                      aiExpCount={aiCounts.experience_count}
                                      onUseAiCount={() => handleUseAiCount("experience")}
                                    />
                                  )}

                                  {section.type === "hobbies" && (
                                    <ImpHobbies
                                      section={section}
                                      sectionIndex={index}
                                      handleUpdate={handleHobbiesUpdate}
                                    />
                                  )}

                                  {section.type === "courses" && (
                                    <ImpCourses
                                      section={section}
                                      sectionIndex={index}
                                      handleUpdate={handleCourseUpdate}
                                      handleDragStart={handleCourseDragStart}
                                      handleDrop={handleCourseDrop}
                                      handleAddCourse={handleAddCourse}
                                      draggedIndex={draggedCourseIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}

                                  {section.type === "languages" && (
                                    <ImpLanguages
                                      section={section}
                                      sectionIndex={index}
                                      handleUpdate={handleLanguageUpdate}
                                      handleDragStart={handleLanguageDragStart}
                                      handleDrop={handleLanguageDrop}
                                      draggedIndex={draggedLanguageIndex}
                                      setDraggedIndex={setDraggedLanguageIndex}
                                    />
                                  )}

                                  {section.type === "internships" && (
                                    <ImpInternships
                                      section={section}
                                      sectionIndex={index}
                                      handleUpdate={handleInternshipUpdate}
                                      handleDragStart={handleInternshipDragStart}
                                      handleDrop={handleInternshipDrop}
                                      handleAddInternship={handleAddInternship}
                                      draggedIndex={draggedInternshipIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}

                                  {section.type === "activities" && (
                                    <ImpActivities
                                      section={section}
                                      sectionIndex={index}
                                      handleUpdate={handleActivityUpdate}
                                      handleDragStart={handleActivityDragStart}
                                      handleDrop={handleActivityDrop}
                                      handleAddActivity={handleAddActivity}
                                      draggedIndex={draggedActivityIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}

                                  {section.type === "custom_simple" && (
                                    <ImpSimpleCustomSection
                                      section={section}
                                      sectionIndex={index}
                                      handleUpdate={handleSimpleCustomUpdate}
                                      handleDragStart={handleCustomDragStart}
                                      handleDrop={handleCustomDrop}
                                      draggedIndex={draggedCustomIndex}
                                      setDraggedIndex={setDraggedCustomIndex}
                                    />
                                  )}

                                  {section.type === "custom" && (
                                    <ImpCustomSection
                                      section={section}
                                      sectionIndex={index}
                                      handleCustomUpdate={handleCustomUpdate}
                                      handleCustomDragStart={handleCustomDragStart}
                                      handleCustomDrop={handleCustomDrop}
                                      handleAddCustomItem={handleAddCustomItem}
                                      draggedIndex={draggedCustomIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}
                                </AccordionContent>
                              </AccordionPanel>
                            </Accordion>
                          </div>
                        </div>
                      </DraggableWrapper>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <AddSectionButton onAddNewSection={handleAddNewSection} sections={sections} />
            </div>
          </form>
        ) : (
          <div>
            <CustomizeSection
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              themeColor={themeColor}
              setThemeColor={handleThemeColorChange}
              resumeSettings={resumeSettings}
              setResumeSettings={setResumeSettings}
            />
          </div>
        )}

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

      <div className='lg:w-6/12 bg-white h-[calc(100vh-64px)] overflow-hidden px-0'>
        <ResumePageViewer
          contentRef={componentRef}
          sections={sections}
          formValues={formValues}
          resumeSettings={resumeSettings}
        >
          <div ref={componentRef}>
            <ActiveResume
              formData={formValues}
              sections={sections}
              themeColor={themeColor}
              setValue={setValue}
              resumeSettings={resumeSettings}
            />
          </div>
        </ResumePageViewer>

      </div>
      <ResumeCompareModal
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
        oldData={originalResumeData}
        newData={formValues}
        oldScore={originalAtsScore}
        newScore={checkATSData?.ATS_Score}
        currentTemplate={selectedTemplate}
        sections={sections}
        themeColor={themeColor}
        oldResumeSettings={originalResumeData?.oldResumeSettings}
        resumeSettings={resumeSettings}
        defaultOldTemplate="ats"
      />
      <ResumePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        formData={formValues}
        sections={sections}
        themeColor={themeColor}
        resumeSettings={resumeSettings}
        selectedTemplate={selectedTemplate}
      />
    </div>
  );
};

export default Page;




// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { toast, ToastContainer } from 'react-toastify';
// import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
// import isEqual from 'lodash.isequal';
// import { AiFillSave } from "react-icons/ai";
// import { FaPen, FaTrash } from 'react-icons/fa';

// //  Import @dnd-kit
// import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

// // Import components
// import ImpResumeScore from './components/ImpResumeScore';
// import ImpPersonalDetails from './components/ImpPersonalDetails';
// import ImpSkills from './components/ImpSkills';
// import ImpSummary from './components/ImpSummary';
// import ImpEducation from './components/ImpEducation';
// import ImpCertifications from './components/ImpCertifications';
// import ImpExperience from './components/ImpExperience';
// import ImpHobbies from './components/ImpHobbies';
// import ImpCourses from './components/ImpCourses';
// import ImpLanguages from './components/ImpLanguages';
// import ImpInternships from './components/ImpInternships';
// import ImpActivities from './components/ImpActivities';
// import CustomizeSection from '../ui/CustomizeSection.jsx';
// import ImpCustomSection from './components/ImpCustomSection';
// import AddSectionButton from './components/AddSectionButton';

// //  Import Draggable Components
// import DraggableWrapper from './DraggableWrapper';
// import DragIcon from './DragIcon';

// // Import templates
// import Professional from "../TemplateNew/Professional";
// import PrimeATS from "../TemplateNew/PrimeATS";
// import CleanTemplate from "../TemplateNew/CleanTemplate";
// import ClearTemplate from "../TemplateNew/ClearTemplate";
// import VividTemplate from "../TemplateNew/VividTemplate";
// import CorporateTemplate from '../TemplateNew/CorporateTemplate';

// import { useTabs } from '../context/TabsContext.js';
// import { checkATS } from '../reducers/DashboardSlice';
// import { getSingleResume, saveResumeImprove } from '../reducers/ResumeSlice';
// import { defaultResumeSettings } from "../config/defaultResumeSettings";
// import ImpSimpleCustomSection from './components/Impsimplecustomsection';

// const Page = () => {
//   const componentRef = useRef();
//   const dispatch = useDispatch();
//   const { extracteResumeData } = useSelector((state) => state?.dash);
//   const { loading, singleResumeInfo } = useSelector((state) => state?.resume);

//   const resumeSource =
//     singleResumeInfo?.data?.data ||
//     extracteResumeData?.resume_data ||
//     null;

//   // Resume ID tracking
//   const [resumeIds, setResumeIds] = useState({ mongo_id: null, mysql_id: null });

//   // Auto-Save State
//   const lastSavedData = useRef(null);
//   const isInitialLoad = useRef(true);
//   const [savingStatus, setSavingStatus] = useState('unsaved');

//   useEffect(() => {
//     if (!resumeSource) return;

//     const atsPayload = {
//       security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
//       resume_data: JSON.stringify(resumeSource),
//       Ats_score: 0
//     };

//     dispatch(checkATS(atsPayload));
//   }, [resumeSource, dispatch]);

//   const { checkATSData, atsLoading } = useSelector((state) => state.dash);

//   // ── ATS REFRESH ──
//   const handleAtsRefresh = () => {
//     const payload = {
//       ...formValues,
//       sections,
//       resume_type: "improve",
//     };
//     dispatch(checkATS({
//       security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
//       resume_data: JSON.stringify(payload),
//       Ats_score: 0,
//     }));
//   };

//   // States
//   const [selectedTemplate, setSelectedTemplate] = useState('ats');
//   const [sections, setSections] = useState([]);
//   const [draggedSkillIndex, setDraggedSkillIndex] = useState(null);
//   const [draggedEducationIndex, setDraggedEducationIndex] = useState(null);
//   const [draggedCertIndex, setDraggedCertIndex] = useState(null);
//   const [draggedExpIndex, setDraggedExpIndex] = useState(null);
//   const [draggedCustomIndex, setDraggedCustomIndex] = useState(null);
//   const [draggedCourseIndex, setDraggedCourseIndex] = useState(null);
//   const [draggedLanguageIndex, setDraggedLanguageIndex] = useState(null);
//   const [draggedInternshipIndex, setDraggedInternshipIndex] = useState(null);
//   const [draggedActivityIndex, setDraggedActivityIndex] = useState(null);
//   const [editingSectionIndex, setEditingSectionIndex] = useState(null);
//   const [resumeSettings, setResumeSettings] = useState(defaultResumeSettings);
//   const [deletingSectionIndex, setDeletingSectionIndex] = useState(null);
//   const { activeTab } = useTabs();

//   //  Setup sensors for @dnd-kit
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   // Template mapping
//   const templateMap = {
//     professional: Professional,
//     ats: PrimeATS,
//     clean: CleanTemplate,
//     clear: ClearTemplate,
//     vivid: VividTemplate,
//     corporate: CorporateTemplate,
//   };

//   const [themeColor, setThemeColor] = useState(defaultResumeSettings.theme.defaultColor);

//   const handleThemeColorChange = (color) => {
//     setThemeColor(color);

//     setResumeSettings(prev => {
//       const template = prev.theme.template;

//       return {
//         ...prev,
//         theme: {
//           ...prev.theme,
//           defaultColor: color,
//           templateColors: {
//             ...prev.theme.templateColors,
//             [template]: color,
//           },
//         },
//       };
//     });
//   };

//   const ActiveResume = templateMap[selectedTemplate] || ats;

//   // Form handling
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const formValues = watch();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const resume_id = searchParams.get("id");
//   const resume_type = searchParams.get("fetch");

//   //  Handle section drag end
//   const handleSectionDragEnd = (event) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setSections((items) => {
//         const oldIndex = items.findIndex(item => item.id === active.id);
//         const newIndex = items.findIndex(item => item.id === over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   // -------------------- INITIAL DATA LOAD --------------------
//   useEffect(() => {
//     if (!resumeSource) return;

//     if (resumeSource.mongo_id || resumeSource._id) {
//       setResumeIds({
//         mongo_id: resumeSource.mongo_id || resumeSource._id,
//         mysql_id: resumeSource.mysql_id || resumeSource.id,
//       });
//     }

//     lastSavedData.current = JSON.parse(
//       JSON.stringify({
//         ...resumeSource,
//         sections,
//         resumeSettings: resumeSource.resumeSettings || defaultResumeSettings,
//       })
//     );

//     setSavingStatus("saved");
//     isInitialLoad.current = false;
//   }, [resumeSource]);

//   // -------------------- AUTO SAVE --------------------
//   useEffect(() => {
//     if (isInitialLoad.current) return;

//     const currentData = {
//       ...formValues,
//       sections,
//       resumeSettings,
//     };

//     const normalized = JSON.parse(JSON.stringify(currentData));

//     if (lastSavedData.current && isEqual(normalized, lastSavedData.current)) {
//       return;
//     }

//     setSavingStatus("saving");

//     const timeoutId = setTimeout(() => {
//       const payload = {
//         ...currentData,
//         sections,
//         resumeSettings,
//         resume_type: "improve",
//       };

//       if (resumeIds.mongo_id && resumeIds.mysql_id) {
//         payload.mongo_id = resumeIds.mongo_id;
//         payload.mysql_id = resumeIds.mysql_id;
//       }

//       dispatch(saveResumeImprove(payload)).then((res) => {
//         if (res.payload?.status_code === 200) {
//           setSavingStatus("saved");
//           lastSavedData.current = normalized;

//           if (!resumeIds.mongo_id) {
//             const mongo_id = res.payload.sectionsdata?.mongo_id;
//             const mysql_id = res.payload.sectionsdata?.mysql_id;

//             setResumeIds({ mongo_id, mysql_id });
//             router.replace(
//               `/improve-resume-builder?id=${mysql_id}&fetch=improve_resume`,
//               { scroll: false }
//             );
//           }
//         } else {
//           setSavingStatus("error");
//         }
//       });
//     }, 2000);

//     return () => clearTimeout(timeoutId);
//   }, [formValues, sections, resumeSettings]);

//   // -------------------- MANUAL SAVE --------------------
//   const onSubmit = (data) => {
//     setSavingStatus("saving");

//     const payload = {
//       ...data,
//       sections,
//       resumeSettings,
//       resume_type: "improve",
//     };

//     if (resumeIds.mongo_id && resumeIds.mysql_id) {
//       payload.mongo_id = resumeIds.mongo_id;
//       payload.mysql_id = resumeIds.mysql_id;
//     }

//     dispatch(saveResumeImprove(payload)).then((res) => {
//       if (res.payload?.status_code === 200) {
//         setSavingStatus("saved");

//         lastSavedData.current = JSON.parse(
//           JSON.stringify({ ...data, sections, resumeSettings })
//         );

//         if (!resumeIds.mongo_id) {
//           const mongo_id = res.payload.sectionsdata?.mongo_id;
//           const mysql_id = res.payload.sectionsdata?.mysql_id;

//           setResumeIds({ mongo_id, mysql_id });

//           router.replace(
//             `/improve-resume-builder?id=${mysql_id}&fetch=improve_resume`,
//             { scroll: false }
//           );
//         }
//       } else {
//         setSavingStatus("error");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!resume_id || !resume_type) return;

//     dispatch(
//       getSingleResume({
//         id: resume_id,
//         fetch: resume_type,
//       })
//     );
//   }, [resume_id, resume_type, dispatch]);

//   // -------------------- AUTO HIDE STATUS --------------------
//   useEffect(() => {
//     if (savingStatus === "saved") {
//       const timer = setTimeout(() => {
//         setSavingStatus("unsaved");
//       }, 2000);
//       return () => clearTimeout(timer);
//     }
//   }, [savingStatus]);


//   const mapextracteResumeDataToSections = (resumeData) => {
//     if (!resumeData) return [];

//     const sections = [];
//     let id = 0;

//     const techCategories = resumeData?.technical_skills?.categories || {};
//     const techSkills = Object.values(techCategories).flat();

//     if (techSkills.length > 0) {
//       sections.push({
//         id: id++,
//         title: (resumeData?.soft_skills || []).length > 0 ? "Technical Skills" : "Skills",
//         type: "skills",
//         skills: techSkills.map((skill, i) => ({
//           id: `ts_${i}_${Date.now()}`,
//           name: skill,
//           level: 3,
//         })),
//       });
//     }

//     if ((resumeData?.soft_skills || []).length > 0) {
//       sections.push({
//         id: id++,
//         title: "Soft Skills",
//         type: "skills",
//         skills: resumeData.soft_skills.map((skill, i) => ({
//           id: `ss_${i}_${Date.now()}`,
//           name: skill,
//           level: 3,
//         })),
//       });
//     }

//     if (resumeData?.professional_summary?.summary_text) {
//       sections.push({
//         id: id++,
//         title: "Professional Summary",
//         type: "summary",
//         summary: resumeData.professional_summary.summary_text,
//       });
//     }

//     if ((resumeData?.education || []).length > 0) {
//       sections.push({
//         id: id++,
//         title: "Education",
//         type: "education",
//         educations: resumeData.education.map((edu, i) => ({
//           id: `e_${i}_${Date.now()}`,
//           institute: edu.institution || "",
//           degree: `${edu.degree || ""} ${edu.field_of_study || ""}`.trim(),
//           startDate: edu.start_date || "",
//           endDate: edu.graduation_date || "",
//           city: edu.location || "",
//           description: edu.description || "",
//         })),
//       });
//     }

//     if ((resumeData?.certifications || []).length > 0) {
//       sections.push({
//         id: id++,
//         title: "Certifications",
//         type: "certifications",
//         certifications: resumeData.certifications.map((c, i) => ({
//           id: `c_${i}_${Date.now()}`,
//           name: c.name || "",
//           organization: c.organization || "",
//           city: "",
//           startYear: "",
//           endYear: "",
//           description: "",
//         })),
//       });
//     }

//     if ((resumeData?.work_experience || []).length > 0) {
//       sections.push({
//         id: id++,
//         title: "Experience",
//         type: "experience",
//         experiences: resumeData.work_experience.map((exp, i) => ({
//           id: `x_${i}_${Date.now()}`,
//           jobTitle: exp.job_title || "",
//           company: exp.company_name || "",
//           city: exp.location || "",
//           startDate: exp.start_date || "",
//           endDate: exp.end_date || "",
//           description: (exp.responsibilities || []).join("<br/>"),
//         })),
//       });
//     }

//     const additionalSections = resumeData?.additional_sections || {};

//     Object.entries(additionalSections).forEach(([key, value]) => {
//       if (!value?.content || value.content.length === 0) return;

//       // Detect if it's a simple list (technologies, tools, etc.)
//       const isSimpleList = Array.isArray(value.content) && value.content.every(item => {
//         if (typeof item === 'string') return true;
//         if (typeof item === 'object') {
//           // Simple if it only has name/title and optionally level
//           const keys = Object.keys(item);
//           return keys.length <= 2 && (
//             (keys.includes('name') || keys.includes('title')) &&
//             (!keys.includes('description') && !keys.includes('city') && !keys.includes('start_date'))
//           );
//         }
//         return false;
//       });

//       if (isSimpleList) {
//         // Use custom_simple type for simple lists
//         sections.push({
//           id: id++,
//           title: key,
//           type: "custom_simple",
//           items: value.content.map((item, i) => ({
//             id: `simple_${i}_${Date.now()}`,
//             name: typeof item === "string" ? item : item.name || item.title || "",
//             level: typeof item === "object" && item.level ? item.level : 2
//           })),
//           hideExperienceLevel: true
//         });
//       } else {
//         // Use custom (advanced) type for complex sections
//         sections.push({
//           id: id++,
//           title: key,
//           type: "custom",
//           items: Array.isArray(value.content)
//             ? value.content.map((item, i) => ({
//               id: `custom_${i}_${Date.now()}`,
//               title: typeof item === "string" ? item : item.title || item.name || "",
//               city: item.city || "",
//               startDate: item.start_date || "",
//               endDate: item.end_date || "",
//               description: item.description || "",
//             }))
//             : [
//               {
//                 id: `custom_0_${Date.now()}`,
//                 title: typeof value.content === "string" ? value.content : "",
//                 city: "",
//                 startDate: "",
//                 endDate: "",
//                 description: "",
//               },
//             ],
//         });
//       }
//     });

//     return sections;
//   };

//   // ----------------- SETTING FORM VALUES -----------------
//   useEffect(() => {
//     if (!resumeSource) return;

//     const resumeData = extracteResumeData?.resume_data || resumeSource;
//     const personal = resumeData?.personal_information || {};
//     const meta = resumeData?.metadata || {};

//     const profileSummaryFromAdditional =
//       resumeData?.additional_sections?.["PROFILE SUMMARY"]?.content;

//     const summaryPoints =
//       Array.isArray(profileSummaryFromAdditional) && profileSummaryFromAdditional.length > 0
//         ? profileSummaryFromAdditional
//         : resumeData?.professional_summary?.summary_text
//           ? [resumeData.professional_summary.summary_text]
//           : [];

//     const formattedSummary =
//       summaryPoints.length > 1
//         ? `<ul>${summaryPoints.map(p => `<li>${p}</li>`).join("")}</ul>`
//         : summaryPoints[0] || "";

//     const fullName = personal.full_name || "";
//     const nameParts = fullName.split(" ");

//     setValue("job_target", meta.current_role || resumeSource.job_target || "");
//     setValue("first_name", nameParts[0] || resumeSource.first_name || "");
//     setValue("last_name", nameParts.slice(1).join(" ") || resumeSource.last_name || "");
//     setValue("email", personal.email || resumeSource.email || "");
//     setValue("phone", personal.phone || resumeSource.phone || "");
//     setValue(
//       "city_state",
//       [personal.location?.city, personal.location?.state].filter(Boolean).join(", ") || resumeSource.city_state || ""
//     );
//     setValue("country", personal.location?.country || resumeSource.country || "");
//     setValue("address", personal.location?.full_address || resumeSource.address || "");
//     setValue("summary", formattedSummary || resumeSource.summary || "");
//     setValue("profileImage", resumeSource.profileImage || "");

//     setValue("linkedin", resumeSource.linkedin || "");
//     setValue("github", resumeSource.github || "");
//     setValue("stackoverflow", resumeSource.stackoverflow || "");
//     setValue("leetcode", resumeSource.leetcode || "");
//     setValue("postal_code", resumeSource.postal_code || "");
//     setValue("nationality", resumeSource.nationality || "");
//     setValue("birth_place", resumeSource.birth_place || "");
//     setValue("dob", resumeSource.dob || "");
//     setValue("driving_licence", resumeSource.driving_licence || "");

//   }, [extracteResumeData, resumeSource, setValue]);

//   // ----------------- SYNC SUMMARY -----------------
//   useEffect(() => {
//     const summarySections = sections.filter(sec => sec.type === "summary");
//     if (summarySections.length > 0) {
//       const summaryText = summarySections[0].summary || "";
//       setValue("summary", summaryText);
//     }
//   }, [sections, setValue]);

//   // ----------------- MAP SECTIONS + RESTORE SETTINGS -----------------
//   useEffect(() => {
//     if (!resumeSource) return;

//     if (resumeSource.resumeSettings) {
//       const settings = resumeSource.resumeSettings;
//       setResumeSettings(settings);

//       const template = settings.theme?.template || "professional";
//       setSelectedTemplate(template);

//       const color =
//         settings.theme?.templateColors?.[template] ||
//         settings.theme?.defaultColor ||
//         defaultResumeSettings.theme.defaultColor;

//       setThemeColor(color);
//     }

//     if (resumeSource.sections?.length) {
//       setSections(resumeSource.sections);
//       return;
//     }

//     const mappedSections = mapextracteResumeDataToSections(resumeSource);
//     setSections(mappedSections);

//   }, [resumeSource]);

//   // ----------------- SYNC SKILLS -----------------
//   useEffect(() => {
//     const skillSections = sections.filter(sec => sec.type === "skills");
//     const mergedSkills = skillSections.flatMap(sec =>
//       (sec.skills || []).map(skill => ({ skill: skill.name, level: skill.level ?? 3 }))
//     );
//     setValue("newSkillHistory", mergedSkills);
//   }, [sections, setValue]);

//   // ----------------- SYNC EDUCATION -----------------
//   useEffect(() => {
//     const educationSections = sections.filter(sec => sec.type === "education");
//     const educationHistory = educationSections.flatMap(sec =>
//       (sec.educations || []).map(edu => ({
//         school: edu.institute || "",
//         degree: edu.degree || "",
//         startDate: edu.startDate || "",
//         endDate: edu.endDate || "",
//         city_state: edu.city || "",
//         description: edu.description || "",
//       }))
//     );
//     setValue("educationHistory", educationHistory);
//   }, [sections, setValue]);

//   // ----------------- SYNC EXPERIENCE -----------------
//   useEffect(() => {
//     const expSections = sections.filter(sec => sec.type === "experience");
//     const employmentHistory = expSections.flatMap(sec =>
//       (sec.experiences || []).map(exp => ({
//         job_title: exp.jobTitle || "",
//         employer: exp.company || "",
//         city_state: exp.city || "",
//         startDate: exp.startDate || "",
//         endDate: exp.endDate || "",
//         description: exp.description || "",
//       }))
//     );
//     setValue("employmentHistory", employmentHistory);
//   }, [sections, setValue]);

//   // Skill handlers
//   const handleSkillDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedSkillIndex(index);
//   };

//   const handleSkillDrop = (e, sectionIndex, targetSkillIndex) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (draggedSkillIndex === null || draggedSkillIndex === targetSkillIndex) return;

//     const updatedSections = [...sections];
//     const skillsList = [...updatedSections[sectionIndex].skills];

//     const [movedSkill] = skillsList.splice(draggedSkillIndex, 1);
//     skillsList.splice(targetSkillIndex, 0, movedSkill);

//     updatedSections[sectionIndex].skills = skillsList;
//     setSections(updatedSections);
//     setDraggedSkillIndex(null);
//   };

//   const handleSkillUpdate = (sectionIndex, skillId, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;

//         if (skillId === null) {
//           return {
//             ...section,
//             [field]: value,
//           };
//         }

//         if (field === "delete") {
//           return {
//             ...section,
//             skills: section.skills.filter(
//               skill => skill.id !== skillId
//             ),
//           };
//         }

//         return {
//           ...section,
//           skills: section.skills.map(skill =>
//             skill.id === skillId
//               ? { ...skill, [field]: value }
//               : skill
//           ),
//         };
//       })
//     );
//   };

//   // Education handlers
//   const handleEducationDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedEducationIndex(index);
//   };

//   const handleEducationDrop = (e, sectionIndex, targetEduIndex) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (draggedEducationIndex === null || draggedEducationIndex === targetEduIndex) return;

//     const updatedSections = [...sections];
//     const educationList = [...updatedSections[sectionIndex].educations];

//     const [movedEdu] = educationList.splice(draggedEducationIndex, 1);
//     educationList.splice(targetEduIndex, 0, movedEdu);

//     updatedSections[sectionIndex].educations = educationList;
//     setSections(updatedSections);
//     setDraggedEducationIndex(null);
//   };

//   const handleEducationUpdate = (sectionIndex, eduId, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;
//         if (field === "delete") {
//           return {
//             ...section,
//             educations: section.educations.filter(
//               edu => edu.id !== eduId
//             ),
//           };
//         }
//         return {
//           ...section,
//           educations: section.educations.map(edu =>
//             edu.id === eduId
//               ? { ...edu, [field]: value }
//               : edu
//           ),
//         };
//       })
//     );
//   };

//   const handleAddEducation = (sectionIndex) => {
//     const newEducation = {
//       id: `e${Date.now()}`,
//       institute: "",
//       degree: "",
//       startDate: "",
//       endDate: "",
//       city: "",
//       description: ""
//     };

//     setSections(prev =>
//       prev.map((section, i) =>
//         i === sectionIndex
//           ? {
//             ...section,
//             educations: [...section.educations, newEducation]
//           }
//           : section
//       )
//     );
//   };

//   // Certification handlers
//   const handleCertDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedCertIndex(index);
//   };

//   const handleCertDrop = (e, sectionIndex, targetIndex) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (draggedCertIndex === null || draggedCertIndex === targetIndex) return;

//     const updatedSections = [...sections];
//     const certList = [...updatedSections[sectionIndex].certifications];

//     const [movedCert] = certList.splice(draggedCertIndex, 1);
//     certList.splice(targetIndex, 0, movedCert);

//     updatedSections[sectionIndex].certifications = certList;
//     setSections(updatedSections);
//     setDraggedCertIndex(null);
//   };

//   const handleCertUpdate = (sectionIndex, certId, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;

//         if (field === "delete") {
//           return {
//             ...section,
//             certifications: section.certifications.filter(
//               cert => cert.id !== certId
//             ),
//           };
//         }

//         return {
//           ...section,
//           certifications: section.certifications.map(cert =>
//             cert.id === certId
//               ? { ...cert, [field]: value }
//               : cert
//           ),
//         };
//       })
//     );
//   };

//   const handleAddCertification = (sectionIndex) => {
//     const newCert = {
//       id: `c${Date.now()}`,
//       name: "",
//       organization: "",
//       city: "",
//       startYear: "",
//       endYear: "",
//       description: ""
//     };

//     setSections(prev =>
//       prev.map((section, i) =>
//         i === sectionIndex
//           ? {
//             ...section,
//             certifications: [...section.certifications, newCert]
//           }
//           : section
//       )
//     );
//   };

//   // Experience handlers
//   const handleExpDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedExpIndex(index);
//   };

//   const handleExpDrop = (e, sectionIndex, targetIndex) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (draggedExpIndex === null || draggedExpIndex === targetIndex) return;

//     const updatedSections = [...sections];
//     const list = [...updatedSections[sectionIndex].experiences];

//     const [moved] = list.splice(draggedExpIndex, 1);
//     list.splice(targetIndex, 0, moved);

//     updatedSections[sectionIndex].experiences = list;
//     setSections(updatedSections);
//     setDraggedExpIndex(null);
//   };

//   const handleExpUpdate = (sectionIndex, expId, field, value) => {
//     setSections(prevSections =>
//       prevSections.map((section, sIndex) => {
//         if (sIndex !== sectionIndex) return section;
//         if (field === "delete") {
//           return {
//             ...section,
//             experiences: section.experiences.filter(
//               exp => exp.id !== expId
//             ),
//           };
//         }

//         return {
//           ...section,
//           experiences: section.experiences.map(exp =>
//             exp.id === expId ? { ...exp, [field]: value } : exp
//           ),
//         };
//       })
//     );
//   };

//   const handleAddExperience = (sectionIndex) => {
//     setSections(prevSections =>
//       prevSections.map((section, sIndex) => {
//         if (sIndex !== sectionIndex) return section;

//         return {
//           ...section,
//           experiences: [
//             ...section.experiences,
//             {
//               id: `x${Date.now()}`,
//               jobTitle: "",
//               company: "",
//               city: "",
//               startDate: "",
//               endDate: "",
//               description: "",
//             },
//           ],
//         };
//       })
//     );
//   };

//   const handleCustomDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedCustomIndex(index);
//   };

//   const handleCustomDrop = (e, sectionIndex, targetIndex) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (draggedCustomIndex === null || draggedCustomIndex === targetIndex) return;

//     const updatedSections = [...sections];
//     const itemsList = [...updatedSections[sectionIndex].items];

//     const [movedItem] = itemsList.splice(draggedCustomIndex, 1);
//     itemsList.splice(targetIndex, 0, movedItem);

//     updatedSections[sectionIndex].items = itemsList;
//     setSections(updatedSections);
//     setDraggedCustomIndex(null);
//   };

//   const handleCustomUpdate = (sectionIndex, itemId, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;
//         if (field === "delete") {
//           return {
//             ...section,
//             items: section.items.filter(
//               item => item.id !== itemId
//             ),
//           };
//         }
//         return {
//           ...section,
//           items: section.items.map(item =>
//             item.id === itemId
//               ? { ...item, [field]: value }
//               : item
//           ),
//         };
//       })
//     );
//   };

//   const handleAddCustomItem = (sectionIndex) => {
//     const newItem = {
//       id: `custom_${Date.now()}`,
//       title: "",
//       city: "",
//       startDate: "",
//       endDate: "",
//       description: "",
//     };

//     setSections(prev =>
//       prev.map((section, i) =>
//         i === sectionIndex
//           ? {
//             ...section,
//             items: [...section.items, newItem]
//           }
//           : section
//       )
//     );
//   };

//   const handleSimpleCustomUpdate = (sectionIndex, itemIndex, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;

//         if (itemIndex === null && field !== "add") {
//           return { ...section, [field]: value };
//         }
//         if (field === "add") {
//           return {
//             ...section,
//             items: [...(section.items || []), value]
//           };
//         }

//         if (field === "delete") {
//           return {
//             ...section,
//             items: section.items.filter((_, idx) => idx !== itemIndex),
//           };
//         }

//         return {
//           ...section,
//           items: section.items.map((item, idx) => {
//             if (idx !== itemIndex) return item;

//             const itemObj = typeof item === 'object' ? item : { name: item, level: 2 };
//             return { ...itemObj, [field]: value };
//           }),
//         };
//       })
//     );
//   };

//   // --- Hobbies Handler ---
//   const handleHobbiesUpdate = (sectionIndex, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) =>
//         i !== sectionIndex ? section : { ...section, [field]: value }
//       )
//     );
//   };

//   // --- Courses Handlers ---
//   const handleCourseDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedCourseIndex(index);
//   };

//   const handleCourseDrop = (e, sectionIndex, targetIndex) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (draggedCourseIndex === null || draggedCourseIndex === targetIndex) return;
//     const updatedSections = [...sections];
//     const list = [...updatedSections[sectionIndex].courses];
//     const [moved] = list.splice(draggedCourseIndex, 1);
//     list.splice(targetIndex, 0, moved);
//     updatedSections[sectionIndex].courses = list;
//     setSections(updatedSections);
//     setDraggedCourseIndex(null);
//   };

//   const handleCourseUpdate = (sectionIndex, courseId, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;
//         if (field === 'delete') {
//           return { ...section, courses: section.courses.filter(c => c.id !== courseId) };
//         }
//         return {
//           ...section,
//           courses: section.courses.map(c =>
//             c.id === courseId ? { ...c, [field]: value } : c
//           ),
//         };
//       })
//     );
//   };

//   const handleAddCourse = (sectionIndex) => {
//     setSections(prev =>
//       prev.map((section, i) =>
//         i !== sectionIndex ? section : {
//           ...section,
//           courses: [...(section.courses || []), {
//             id: `course_${Date.now()}`,
//             course: '',
//             institution: '',
//             startDate: '',
//             endDate: '',
//           }]
//         }
//       )
//     );
//   };

//   // --- Languages Handlers ---
//   const handleLanguageDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedLanguageIndex(index);
//   };

//   const handleLanguageDrop = (e, sectionIndex, targetIndex) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (draggedLanguageIndex === null || draggedLanguageIndex === targetIndex) return;
//     const updatedSections = [...sections];
//     const list = [...updatedSections[sectionIndex].languages];
//     const [moved] = list.splice(draggedLanguageIndex, 1);
//     list.splice(targetIndex, 0, moved);
//     updatedSections[sectionIndex].languages = list;
//     setSections(updatedSections);
//     setDraggedLanguageIndex(null);
//   };

//   const handleLanguageUpdate = (sectionIndex, itemId, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;
//         if (itemId === null && field !== 'add') {
//           return { ...section, [field]: value };
//         }
//         if (field === 'add') {
//           return { ...section, languages: [...(section.languages || []), value] };
//         }
//         if (field === 'delete') {
//           return { ...section, languages: section.languages.filter(l => l.id !== itemId) };
//         }
//         return {
//           ...section,
//           languages: section.languages.map(l =>
//             l.id === itemId ? { ...l, [field]: value } : l
//           ),
//         };
//       })
//     );
//   };

//   // --- Internships Handlers ---
//   const handleInternshipDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedInternshipIndex(index);
//   };

//   const handleInternshipDrop = (e, sectionIndex, targetIndex) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (draggedInternshipIndex === null || draggedInternshipIndex === targetIndex) return;
//     const updatedSections = [...sections];
//     const list = [...updatedSections[sectionIndex].internships];
//     const [moved] = list.splice(draggedInternshipIndex, 1);
//     list.splice(targetIndex, 0, moved);
//     updatedSections[sectionIndex].internships = list;
//     setSections(updatedSections);
//     setDraggedInternshipIndex(null);
//   };

//   const handleInternshipUpdate = (sectionIndex, itemId, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;
//         if (field === 'delete') {
//           return { ...section, internships: section.internships.filter(item => item.id !== itemId) };
//         }
//         return {
//           ...section,
//           internships: section.internships.map(item =>
//             item.id === itemId ? { ...item, [field]: value } : item
//           ),
//         };
//       })
//     );
//   };

//   const handleAddInternship = (sectionIndex) => {
//     setSections(prev =>
//       prev.map((section, i) =>
//         i !== sectionIndex ? section : {
//           ...section,
//           internships: [...(section.internships || []), {
//             id: `intern_${Date.now()}`,
//             jobTitle: '',
//             employer: '',
//             city: '',
//             startDate: '',
//             endDate: '',
//             description: '',
//             isCurrentlyInterning: false,
//           }]
//         }
//       )
//     );
//   };

//   // --- Activities Handlers ---
//   const handleActivityDragStart = (e, index) => {
//     e.stopPropagation();
//     setDraggedActivityIndex(index);
//   };

//   const handleActivityDrop = (e, sectionIndex, targetIndex) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (draggedActivityIndex === null || draggedActivityIndex === targetIndex) return;
//     const updatedSections = [...sections];
//     const list = [...updatedSections[sectionIndex].activities];
//     const [moved] = list.splice(draggedActivityIndex, 1);
//     list.splice(targetIndex, 0, moved);
//     updatedSections[sectionIndex].activities = list;
//     setSections(updatedSections);
//     setDraggedActivityIndex(null);
//   };

//   const handleActivityUpdate = (sectionIndex, itemId, field, value) => {
//     setSections(prev =>
//       prev.map((section, i) => {
//         if (i !== sectionIndex) return section;
//         if (field === 'delete') {
//           return { ...section, activities: section.activities.filter(a => a.id !== itemId) };
//         }
//         return {
//           ...section,
//           activities: section.activities.map(a =>
//             a.id === itemId ? { ...a, [field]: value } : a
//           ),
//         };
//       })
//     );
//   };

//   const handleAddActivity = (sectionIndex) => {
//     setSections(prev =>
//       prev.map((section, i) =>
//         i !== sectionIndex ? section : {
//           ...section,
//           activities: [...(section.activities || []), {
//             id: `activity_${Date.now()}`,
//             functionTitle: '',
//             employer: '',
//             city: '',
//             startDate: '',
//             endDate: '',
//             description: '',
//             isCurrentlyActive: false,
//           }]
//         }
//       )
//     );
//   };

//   const handleSelectTemplate = (id) => {
//     setSelectedTemplate(id);
//     const color =
//       defaultResumeSettings.theme.templateColors[id.toLowerCase()] ||
//       defaultResumeSettings.theme.defaultColor;

//     setThemeColor(color);
//     setResumeSettings(prev => ({
//       ...prev,
//       theme: {
//         ...prev.theme,
//         template: id,
//       },
//     }));
//   };

//   const handleAddNewSection = (newSection) => {
//     const newId = Math.max(...sections.map(s => s.id), -1) + 1;
//     const sectionToAdd = {
//       id: newId,
//       ...newSection
//     };
//     setSections([...sections, sectionToAdd]);
//   };
//   const handleSectionTitleUpdate = (sectionIndex, newTitle) => {
//     const updatedSections = [...sections];
//     updatedSections[sectionIndex] = {
//       ...updatedSections[sectionIndex],
//       title: newTitle
//     };
//     setSections(updatedSections);
//   };

//   const handleDeleteSection = (sectionIndex) => {
//     const updatedSections = sections.filter((_, i) => i !== sectionIndex);
//     setSections(updatedSections);
//   };

//   const handleAnimatedDeleteSection = (index) => {
//     setDeletingSectionIndex(index);

//     setTimeout(() => {
//       handleDeleteSection(index);
//       setDeletingSectionIndex(null);
//     }, 500);
//   };

//   // ✅ Dummy handler for child components
//   const handleDragEnd = () => { };

//   return (
//     <div className='lg:flex gap-1 pb-0'>
//       <ToastContainer />

//       <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] h-screen overflow-auto hide-scrollbar'>
//         {activeTab === 'edit' ? (
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className='mb-10'>
//               <ImpResumeScore
//                 score={checkATSData?.ATS_Score}
//                 loading={atsLoading}
//                 guide={checkATSData?.Improvment_Guide}
//               />

//               <ImpPersonalDetails register={register} watch={watch} selectedTemplate={selectedTemplate} setValue={setValue} />

//               {/* ✅ Wrap with DndContext */}
//               <DndContext
//                 sensors={sensors}
//                 collisionDetection={closestCenter}
//                 onDragEnd={handleSectionDragEnd}
//               >
//                 <SortableContext
//                   items={sections.map(s => s.id)}
//                   strategy={verticalListSortingStrategy}
//                 >
//                   <div className="space-y-2">
//                     {sections.map((section, index) => (
//                       <DraggableWrapper key={section.id} id={section.id}>
//                         <div
//                           className={`
//                             mb-[4px] transition-all duration-200 bg-white rounded-xl section-item
//                             ${deletingSectionIndex === index
//                               ? "!bg-red-400 !-translate-x-6 !opacity-0"
//                               : "!bg-white !opacity-100 !translate-x-0"}
//                           `}
//                         >
//                           <div className="acco_section">
//                             <Accordion flush={true}>
//                               <AccordionPanel>
//                                 <AccordionTitle className="group font-bold text-xl flex items-center justify-between">
//                                   <div className="flex items-center gap-2 flex-1">
//                                     {/* ✅ Use DragIcon instead of native drag */}
//                                     <DragIcon />

//                                     {editingSectionIndex === index ? (
//                                       <input
//                                         autoFocus
//                                         defaultValue={section.title}
//                                         onBlur={(e) => {
//                                           setEditingSectionIndex(null);
//                                           if (e.target.value.trim()) {
//                                             handleSectionTitleUpdate(index, e.target.value.trim());
//                                           }
//                                         }}
//                                         onKeyDown={(e) => {
//                                           if (e.key === "Enter") e.target.blur();
//                                         }}
//                                         className="bg-transparent border-b border-gray-300 outline-none text-xl font-bold w-full"
//                                       />
//                                     ) : (
//                                       <span
//                                         className="cursor-pointer"
//                                         onClick={() => setEditingSectionIndex(index)}
//                                       >
//                                         {section.title}
//                                       </span>
//                                     )}
//                                   </div>
//                                   <div
//                                     className="
//                                       flex items-center gap-3
//                                       opacity-0 translate-x-2
//                                       group-hover:opacity-100 group-hover:translate-x-0
//                                       transition-all duration-200
//                                     "
//                                   >
//                                     <FaPen
//                                       className="text-sm text-gray-400 hover:text-purple-600 cursor-pointer"
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         setEditingSectionIndex(index);
//                                       }}
//                                     />
//                                     <FaTrash
//                                       className="text-sm text-gray-400 hover:text-red-500 cursor-pointer"
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         handleAnimatedDeleteSection(index);
//                                       }}
//                                     />
//                                   </div>
//                                 </AccordionTitle>

//                                 <AccordionContent className='pt-0'>
//                                   {section.type === 'skills' && (
//                                     <ImpSkills
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleSkillUpdate={handleSkillUpdate}
//                                       handleSkillDragStart={handleSkillDragStart}
//                                       handleSkillDrop={handleSkillDrop}
//                                       draggedSkillIndex={draggedSkillIndex}
//                                       setDraggedSkillIndex={setDraggedSkillIndex}
//                                     />
//                                   )}

//                                   {section.type === "summary" && (
//                                     <ImpSummary watch={watch} setValue={setValue} sections={sections} setSections={setSections} sectionIndex={index} onAtsRefresh={handleAtsRefresh}/>
//                                   )}

//                                   {section.type === "education" && (
//                                     <ImpEducation
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleEducationUpdate={handleEducationUpdate}
//                                       handleEducationDragStart={handleEducationDragStart}
//                                       handleEducationDrop={handleEducationDrop}
//                                       handleAddEducation={handleAddEducation}
//                                       draggedEducationIndex={draggedEducationIndex}
//                                       handleDragEnd={handleDragEnd}
//                                     />
//                                   )}

//                                   {section.type === "certifications" && (
//                                     <ImpCertifications
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleCertUpdate={handleCertUpdate}
//                                       handleCertDragStart={handleCertDragStart}
//                                       handleCertDrop={handleCertDrop}
//                                       handleAddCertification={handleAddCertification}
//                                       draggedCertIndex={draggedCertIndex}
//                                       handleDragEnd={handleDragEnd}
//                                     />
//                                   )}

//                                   {section.type === "experience" && (
//                                     <ImpExperience
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleExpUpdate={handleExpUpdate}
//                                       handleExpDragStart={handleExpDragStart}
//                                       handleExpDrop={handleExpDrop}
//                                       handleAddExperience={handleAddExperience}
//                                       draggedExpIndex={draggedExpIndex}
//                                       handleDragEnd={handleDragEnd}
//                                       onAtsRefresh={handleAtsRefresh}
//                                     />
//                                   )}

//                                   {section.type === "hobbies" && (
//                                     <ImpHobbies
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleUpdate={handleHobbiesUpdate}
//                                     />
//                                   )}

//                                   {section.type === "courses" && (
//                                     <ImpCourses
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleUpdate={handleCourseUpdate}
//                                       handleDragStart={handleCourseDragStart}
//                                       handleDrop={handleCourseDrop}
//                                       handleAddCourse={handleAddCourse}
//                                       draggedIndex={draggedCourseIndex}
//                                       handleDragEnd={handleDragEnd}
//                                     />
//                                   )}

//                                   {section.type === "languages" && (
//                                     <ImpLanguages
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleUpdate={handleLanguageUpdate}
//                                       handleDragStart={handleLanguageDragStart}
//                                       handleDrop={handleLanguageDrop}
//                                       draggedIndex={draggedLanguageIndex}
//                                       setDraggedIndex={setDraggedLanguageIndex}
//                                     />
//                                   )}

//                                   {section.type === "internships" && (
//                                     <ImpInternships
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleUpdate={handleInternshipUpdate}
//                                       handleDragStart={handleInternshipDragStart}
//                                       handleDrop={handleInternshipDrop}
//                                       handleAddInternship={handleAddInternship}
//                                       draggedIndex={draggedInternshipIndex}
//                                       handleDragEnd={handleDragEnd}
//                                     />
//                                   )}

//                                   {section.type === "activities" && (
//                                     <ImpActivities
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleUpdate={handleActivityUpdate}
//                                       handleDragStart={handleActivityDragStart}
//                                       handleDrop={handleActivityDrop}
//                                       handleAddActivity={handleAddActivity}
//                                       draggedIndex={draggedActivityIndex}
//                                       handleDragEnd={handleDragEnd}
//                                     />
//                                   )}

//                                   {section.type === "custom_simple" && (
//                                     <ImpSimpleCustomSection
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleUpdate={handleSimpleCustomUpdate}
//                                       handleDragStart={handleCustomDragStart}
//                                       handleDrop={handleCustomDrop}
//                                       draggedIndex={draggedCustomIndex}
//                                       setDraggedIndex={setDraggedCustomIndex}
//                                     />
//                                   )}

//                                   {section.type === "custom" && (
//                                     <ImpCustomSection
//                                       section={section}
//                                       sectionIndex={index}
//                                       handleCustomUpdate={handleCustomUpdate}
//                                       handleCustomDragStart={handleCustomDragStart}
//                                       handleCustomDrop={handleCustomDrop}
//                                       handleAddCustomItem={handleAddCustomItem}
//                                       draggedIndex={draggedCustomIndex}
//                                       handleDragEnd={handleDragEnd}
//                                     />
//                                   )}
//                                 </AccordionContent>
//                               </AccordionPanel>
//                             </Accordion>
//                           </div>
//                         </div>
//                       </DraggableWrapper>
//                     ))}
//                   </div>
//                 </SortableContext>
//               </DndContext>

//               <AddSectionButton onAddNewSection={handleAddNewSection} sections={sections} />
//             </div>
//           </form>
//         ) : (
//           <div>
//             <CustomizeSection
//               selectedTemplate={selectedTemplate}
//               onSelectTemplate={handleSelectTemplate}
//               themeColor={themeColor}
//               setThemeColor={handleThemeColorChange}
//               resumeSettings={resumeSettings}
//               setResumeSettings={setResumeSettings}
//             />
//           </div>
//         )}

//         <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50">
//           {savingStatus === 'saving' && (
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/80 backdrop-blur text-white text-xs font-medium shadow-lg animate-pulse">
//               <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//               Saving changes...
//             </div>
//           )}

//           {savingStatus === 'saved' && (
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-xs font-medium shadow-lg animate-fade-in">
//               <AiFillSave className="text-sm" />
//               Saved successfully
//             </div>
//           )}

//           {savingStatus === 'error' && (
//             <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-xs font-medium shadow-lg animate-shake">
//               ❌ Save failed
//             </div>
//           )}
//         </div>
//       </div>

//       <div className='lg:w-6/12 bg-[#ffffff] px-0'>
//         <div className='h-screen overflow-y-scroll'>
//           <div ref={componentRef}>
//             <ActiveResume formData={formValues} sections={sections} themeColor={themeColor} setValue={setValue} resumeSettings={resumeSettings} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;