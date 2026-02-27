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

// Import @dnd-kit
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
import ImpSimpleCustomSection from './components/Impsimplecustomsection';
import AddSectionButton from './components/AddSectionButton';
import ResumeCompareModal from '../modal/ResumeCompareModal';

// Import Draggable Components
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
import { checkJdAts } from '../reducers/DashboardSlice';
import { getSingleResume, saveResumeJd } from '../reducers/ResumeSlice';
import { defaultResumeSettings } from "../config/defaultResumeSettings";
import { useDownload } from '../hooks/useDownload';
import CVSkeletonLoader from '../ui/CVSkeletonLoader';

const Page = () => {
  const componentRef = useRef();
  const templateTextSettings = useRef({});
  const originalFormValuesRef = useRef(null);
  const dispatch = useDispatch();
  const { extracteResumeData } = useSelector((state) => state?.dash);
  const { loading, singleResumeInfo } = useSelector((state) => state?.resume);
  const { checkJdAtsData, atsLoading } = useSelector((state) => state.dash);

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
  const [originalResumeData, setOriginalResumeData] = useState(null);
  const [originalAtsScore, setOriginalAtsScore] = useState(null);

  const hasInitialAtsCalled = useRef(false);

  useEffect(() => {
    if (resumeSource && !hasInitialAtsCalled.current) {

      const targetJD = sessionStorage.getItem("target_jd");

      const atsPayload = {
        security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
        resume_data: JSON.stringify(resumeSource),
        Ats_score: 0,
        JD: targetJD || ""
      };
      dispatch(checkJdAts(atsPayload));

      hasInitialAtsCalled.current = true;
    }
  }, [resumeSource, dispatch]);


  useEffect(() => {
  if (!atsLoading && checkJdAtsData?.ATS_Score > 0 && originalAtsScore === null) {
    setOriginalAtsScore(checkJdAtsData.ATS_Score);
  }
}, [checkJdAtsData, atsLoading, originalAtsScore]);


  // ATS REFRESH
  const handleAtsRefresh = () => {
    const targetJD = sessionStorage.getItem("target_jd");
    const payload = {
      ...formValues,
      sections,
      resume_type: "jd",
    };
    dispatch(checkJdAts({
      security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
      resume_data: JSON.stringify(payload),
      Ats_score: 0,
      JD: targetJD || ""
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

  // Setup sensors for @dnd-kit
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
  };

  const [themeColor, setThemeColor] = useState(
    defaultResumeSettings.theme.defaultColor
  );

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

  // Handle section drag end (@dnd-kit)
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
        resume_type: "jd",
      };

      if (resumeIds.mongo_id && resumeIds.mysql_id) {
        payload.mongo_id = resumeIds.mongo_id;
        payload.mysql_id = resumeIds.mysql_id;
      }

      dispatch(saveResumeJd(payload)).then((res) => {
        if (res.payload?.status_code === 200) {
          setSavingStatus("saved");
          lastSavedData.current = normalized;

          if (!resumeIds.mongo_id) {
            const mongo_id = res.payload.sectionsdata?.mongo_id;
            const mysql_id = res.payload.sectionsdata?.mysql_id;

            setResumeIds({ mongo_id, mysql_id });
            router.replace(
              `/jd-resume-builder?id=${mysql_id}&fetch=jd_resume`,
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
      resume_type: "jd",
    };

    if (resumeIds.mongo_id && resumeIds.mysql_id) {
      payload.mongo_id = resumeIds.mongo_id;
      payload.mysql_id = resumeIds.mysql_id;
    }

    dispatch(saveResumeJd(payload)).then((res) => {
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
            `/jd-resume-builder?id=${mysql_id}&fetch=jd_resume`,
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

  // Helper function to map resume data to sections
  const mapextracteResumeDataToSections = (resumeData) => {
    if (!resumeData) return [];

    let id = 0;

    const profileSummaryKey = Object.keys(resumeData?.additional_sections || {}).find(
      k => k.trim().toUpperCase() === "PROFILE SUMMARY"
    );
    const profileSummaryContent = profileSummaryKey
      ? resumeData.additional_sections[profileSummaryKey]?.content
      : null;
    const hasProfileSummary = Array.isArray(profileSummaryContent) && profileSummaryContent.length > 0 && profileSummaryContent.some(p => p?.trim());

    const summaryText = hasProfileSummary
      ? (profileSummaryContent.length > 1
        ? `<ul>${profileSummaryContent.map(p => `<li>${p}</li>`).join("")}</ul>`
        : profileSummaryContent[0])
      : (resumeData?.professional_summary?.summary_text || "");

    const summaryTitle = profileSummaryKey || "Professional Summary";

    const summarySection = summaryText
      ? { id: id++, title: summaryTitle, type: "summary", summary: summaryText }
      : null;

    // ----------------- TECHNICAL SKILLS -----------------
    const techCategories = resumeData?.technical_skills?.categories || {};
    const techSkills = Object.values(techCategories).flat();
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

    // ----------------- EDUCATION -----------------
    // CV তে "EDUCATION" key এর আসল নাম নেবে
    const educationKey = Object.keys(resumeData?.additional_sections || {}).find(
      k => k.trim().toUpperCase() === "EDUCATION"
    );
    const educationTitle = educationKey || "Education";

    const educationSection = (resumeData?.education || []).length > 0
      ? {
        id: id++,
        title: educationTitle,
        type: "education",
        educations: resumeData.education.map((edu, i) => ({
          id: `e_${i}_${Date.now()}`,
          institute: edu.institution || "",
          degree: `${edu.degree || ""} ${edu.field_of_study || ""}`.trim(),
          startDate: edu.start_date || "",
          endDate: edu.graduation_date || "",
          city: edu.location || "",
          description: edu.description || "",
        })),
      }
      : null;

    // ----------------- CERTIFICATIONS -----------------
    const certKey = Object.keys(resumeData?.additional_sections || {}).find(
      k => k.trim().toUpperCase() === "CERTIFICATIONS"
    );
    const certTitle = certKey || "Certifications";

    const certSection = (resumeData?.certifications || []).length > 0
      ? {
        id: id++,
        title: certTitle,
        type: "certifications",
        certifications: resumeData.certifications.map((c, i) => ({
          id: `c_${i}_${Date.now()}`,
          name: c.name || "",
          organization: c.organization || "",
          city: "",
          startYear: "",
          endYear: "",
          description: "",
        })),
      }
      : null;

    // ----------------- EXPERIENCE -----------------
    // CV তে "WORK EXPERIENCE" বা "EXPERIENCE" key এর আসল নাম নেবে
    const experienceKey = Object.keys(resumeData?.additional_sections || {}).find(
      k => ["WORK EXPERIENCE", "EXPERIENCE"].includes(k.trim().toUpperCase())
    );
    const experienceTitle = experienceKey || "Experience";

    const experienceSection = (resumeData?.work_experience || []).length > 0
      ? {
        id: id++,
        title: experienceTitle,
        type: "experience",
        experiences: resumeData.work_experience.map((exp, i) => ({
          id: `x_${i}_${Date.now()}`,
          jobTitle: exp.job_title || "",
          company: exp.company_name || "",
          city: exp.location || "",
          startDate: exp.start_date || "",
          endDate: exp.end_date || "",
          description: (exp.responsibilities || []).join("<br/>"),
        })),
      }
      : null;

    // ----------------- DYNAMIC ADDITIONAL SECTIONS -----------------
    // এই keys গুলো skip — উপরের structured sections এ already handle হয়েছে
    const SKIP_KEYS = new Set([
      "PROFILE SUMMARY",
      "EDUCATION",
      "CERTIFICATIONS",
      "WORK EXPERIENCE",
      "EXPERIENCE",
      "IT SKILLS",
      "CONTACT DETAILS",
    ]);

    const additionalSectionsList = [];
    const additionalSections = resumeData?.additional_sections || {};

    Object.entries(additionalSections).forEach(([key, value]) => {
      if (SKIP_KEYS.has(key.trim().toUpperCase())) return;
      if (!value?.content) return;
      if (Array.isArray(value.content) && value.content.length === 0) return;
      if (typeof value.content === "string" && !value.content.trim()) return;

      // Detect simple list
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
        additionalSectionsList.push({
          id: id++,
          title: key,          // ✅ CV এর আসল key name
          type: "custom",
          items: Array.isArray(value.content)
            ? value.content.map((item, i) => ({
              id: `custom_${i}_${Date.now()}`,
              title: typeof item === "string" ? item : item.title || item.name || "",
              city: item.city || "",
              startDate: item.start_date || "",
              endDate: item.end_date || "",
              description: item.description || "",
            }))
            : [
              {
                id: `custom_0_${Date.now()}`,
                title: typeof value.content === "string" ? value.content : "",
                city: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
        });
      }
    });

    const sections = [
      ...(summarySection ? [summarySection] : []),
      ...skillsSections,
      ...(educationSection ? [educationSection] : []),
      ...(certSection ? [certSection] : []),
      ...(experienceSection ? [experienceSection] : []),
      ...additionalSectionsList,
    ];

    return sections;
  };

  // ----------------- SETTING FORM VALUES -----------------
  useEffect(() => {
    if (!resumeSource) return;

    const resumeData = extracteResumeData?.resume_data || resumeSource;
    const personal = resumeData?.personal_information || {};
    const meta = resumeData?.metadata || {};

    const profileSummaryFromAdditional = resumeData?.additional_sections?.["PROFILE SUMMARY"]?.content;
    const hasProfileSummary = Array.isArray(profileSummaryFromAdditional) && profileSummaryFromAdditional.length > 0 && profileSummaryFromAdditional.some(p => p?.trim());

    const summaryPoints = hasProfileSummary
      ? profileSummaryFromAdditional
      : (resumeData?.professional_summary?.summary_text
        ? [resumeData.professional_summary.summary_text]
        : []);

    const formattedSummary =
      summaryPoints.length > 1
        ? `<ul>${summaryPoints.map(p => `<li>${p}</li>`).join("")}</ul>`
        : summaryPoints[0] || "";

    const fullName = personal.full_name || "";
    const nameParts = fullName.split(" ");

    setValue("job_target", meta.current_role || resumeSource.job_target || "");
    setValue("first_name", nameParts[0] || resumeSource.first_name || "");
    setValue("last_name", nameParts.slice(1).join(" ") || resumeSource.last_name || "");
    setValue("email", personal.email || resumeSource.email || "");
    setValue("phone", personal.phone || resumeSource.phone || "");
    setValue(
      "city_state",
      [personal.location?.city, personal.location?.state].filter(Boolean).join(", ") || resumeSource.city_state || ""
    );
    setValue("country", personal.location?.country || resumeSource.country || "");
    setValue("address", personal.location?.full_address || resumeSource.address || "");
    setValue("summary", formattedSummary || resumeSource.summary || "");
    setValue("profileImage", resumeSource.profileImage || "");

    // Additional Details
    setValue("linkedin", resumeSource.linkedin || "");
    setValue("github", resumeSource.github || "");
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

      const personal = (extracteResumeData?.resume_data || resumeSource)?.personal_information || {};
      const meta = (extracteResumeData?.resume_data || resumeSource)?.metadata || {};
      const fullName = personal.full_name || "";
      const nameParts = fullName.split(" ");

      const originalFormData = {
        job_target: meta.current_role || clonedSource.job_target || "",
        first_name: nameParts[0] || clonedSource.first_name || "",
        last_name: nameParts.slice(1).join(" ") || clonedSource.last_name || "",
        email: personal.email || clonedSource.email || "",
        phone: personal.phone || clonedSource.phone || "",
        city_state: [personal.location?.city, personal.location?.state].filter(Boolean).join(", ") || clonedSource.city_state || "",
        country: personal.location?.country || clonedSource.country || "",
        address: personal.location?.full_address || clonedSource.address || "",
        profileImage: clonedSource.profileImage || "",
        linkedin: clonedSource.linkedin || "",
        github: clonedSource.github || "",
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
        if (field === "addTop") {
          return {
            ...section,
            skills: [value, ...section.skills],
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

  // Custom section handlers
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

  // Simple custom section handler
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

  // Core competencies handler
  const handleCoreCompetencyUpdate = (sectionIndex, itemIndex, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;

        if (itemIndex === null) {
          return { ...section, [field]: value };
        }

        if (field === "delete") {
          return {
            ...section,
            items: section.items.filter((_, idx) => idx !== itemIndex),
          };
        }

        return {
          ...section,
          items: section.items.map((item, idx) =>
            idx === itemIndex ? { ...item, [field]: value } : item
          ),
        };
      })
    );
  };

  // Hobbies handler
  const handleHobbiesUpdate = (sectionIndex, field, value) => {
    setSections(prev =>
      prev.map((section, i) =>
        i !== sectionIndex ? section : { ...section, [field]: value }
      )
    );
  };

  // Courses handlers
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

  // Languages handlers
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

  // Internships handlers
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

  // Activities handlers
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
        if (field === "reorder") {
          return { ...section, activities: value };
        }
        if (field === 'delete') {
          return { ...section, activities: section.activities.filter(a => a.id !== itemId) };
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

  // const handleSelectTemplate = (id) => {
  //   setSelectedTemplate(id);
  //   const color =
  //     defaultResumeSettings.theme.templateColors[id.toLowerCase()] ||
  //     defaultResumeSettings.theme.defaultColor;

  //   setThemeColor(color);
  //   setResumeSettings(prev => ({
  //     ...prev,
  //     theme: {
  //       ...prev.theme,
  //       template: id,
  //     },
  //   }));
  // };

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

  useDownload({ componentRef, formValues, resumeSettings, sections, themeColor });
  if (!resumeSource) {
    return <CVSkeletonLoader />;
  }
  return (
    <div className='lg:flex gap-1 pb-0'>
      <ToastContainer />

      {/* Left Panel */}
      <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] h-screen overflow-auto hide-scrollbar'>
        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=''>

              {/* Resume Score */}
              <ImpResumeScore
                score={checkJdAtsData?.ATS_Score}
                loading={atsLoading}
                guide={checkJdAtsData?.Improvment_Guide}
                isComparingLoading={originalAtsScore === null}
                onCompareClick={() => originalAtsScore !== null && setShowCompare(true)}
              />

              {/* Personal Details */}
              <ImpPersonalDetails register={register} watch={watch} selectedTemplate={selectedTemplate} setValue={setValue} />

              {/* Dynamic Sections with @dnd-kit */}
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

      {/* Right Panel - Resume Preview */}
      <div className='lg:w-6/12 bg-[#ffffff] px-0'>
        <div className='h-screen overflow-y-scroll hide-scrollbar'>
          <div ref={componentRef}>
            <ActiveResume
              formData={formValues}
              sections={sections}
              themeColor={themeColor}
              setValue={setValue}
              resumeSettings={resumeSettings}
            />
          </div>
        </div>
      </div>
      <ResumeCompareModal
        isOpen={showCompare}
        onClose={() => setShowCompare(false)}
        oldData={originalResumeData}
        newData={formValues}
        oldScore={originalAtsScore}
        newScore={checkJdAtsData?.ATS_Score}
        currentTemplate={selectedTemplate}
        sections={sections}
        themeColor={themeColor}
        oldResumeSettings={originalResumeData?.oldResumeSettings}
        resumeSettings={resumeSettings}
        defaultOldTemplate="ats"
      />
    </div>
  );
};

export default Page;