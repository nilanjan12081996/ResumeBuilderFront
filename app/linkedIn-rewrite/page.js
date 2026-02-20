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
import LinkedInResumeScore from './components/LinkedInResumeScore';
import LinkedInPersonalDetails from './components/LinkedInPersonalDetails';
import LinkedInSkills from './components/LinkedInSkills';
import LinkedInSummary from './components/LinkedInSummary';
import LinkedInEducation from './components/LinkedInEducation';
import LinkedInExperience from './components/LinkedInExperience';
import LinkedInLanguages from './components/LinkedInLanguages';
import LinkedInCourses from './components/LinkedInCourses';
import LinkedInHonors from './components/LinkedInHonors';
import LinkedInSimpleCustomSection from './components/LinkedInSimpleCustomSection';
import LinkedInCustomSection from './components/LinkedInCustomSection';
import LinkedInAddSectionButton from './components/LinkedInAddSectionButton';
import CustomizeSection from '../ui/CustomizeSection.jsx';

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
import LinkedInPrime from '../TemplateNew/LinkedInPrime';

import { useTabs } from '../context/TabsContext.js';
import { checkATS } from '../reducers/DashboardSlice';
import { getSingleResume, saveResumeLinkedIn } from '../reducers/ResumeSlice';
import { defaultResumeSettings } from "../config/defaultResumeSettings";


const LinkedInResumeBuilder = () => {
  const componentRef = useRef();
  const templateTextSettings = useRef({});
  const dispatch = useDispatch();
  const { extracteResumeData } = useSelector((state) => state?.dash);
  const { loading, singleResumeInfo } = useSelector((state) => state?.resume);

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

  useEffect(() => {
    if (!resumeSource) return;
    const atsPayload = {
      security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
      resume_data: JSON.stringify(resumeSource),
      Ats_score: 0
    };
    dispatch(checkATS(atsPayload));
  }, [resumeSource, dispatch]);

  const { checkATSData, atsLoading } = useSelector((state) => state.dash);

  // ── ATS REFRESH ──
  const handleAtsRefresh = () => {
    const payload = {
      ...formValues,
      sections,
      resume_type: "linkedin",
    };
    dispatch(checkATS({
      security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
      resume_data: JSON.stringify(payload),
      Ats_score: 0,
    }));
  };

  // States
  const [selectedTemplate, setSelectedTemplate] = useState('linkedin');
  const [sections, setSections] = useState([]);
  const [draggedSkillIndex, setDraggedSkillIndex] = useState(null);
  const [draggedEducationIndex, setDraggedEducationIndex] = useState(null);
  const [draggedExpIndex, setDraggedExpIndex] = useState(null);
  const [draggedLanguageIndex, setDraggedLanguageIndex] = useState(null);
  const [draggedCourseIndex, setDraggedCourseIndex] = useState(null);
  const [draggedHonorIndex, setDraggedHonorIndex] = useState(null);
  const [draggedCustomIndex, setDraggedCustomIndex] = useState(null);
  const [draggedCertIndex, setDraggedCertIndex] = useState(null);
  const [draggedInternshipIndex, setDraggedInternshipIndex] = useState(null);
  const [draggedActivityIndex, setDraggedActivityIndex] = useState(null);
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const linkedInDefaultSettings = {
    ...defaultResumeSettings,
    theme: {
      ...defaultResumeSettings.theme,
      template: "linkedin",
      defaultColor: "#293d48",
    },
  };
  const [resumeSettings, setResumeSettings] = useState(linkedInDefaultSettings);
  const [deletingSectionIndex, setDeletingSectionIndex] = useState(null);
  const { activeTab } = useTabs();

  //  Setup sensors for @dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
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
          templateColors: { ...prev.theme.templateColors, [template]: color },
        },
      };
    });
  };

  const ActiveResume = templateMap[selectedTemplate] || LinkedInPrime;

  // Form handling
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const formValues = watch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const resume_id = searchParams.get("id");
  const resume_type = searchParams.get("fetch");

  //  Handle section drag end (outer DndContext)
  const handleSectionDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
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

    lastSavedData.current = JSON.parse(JSON.stringify({
      ...resumeSource,
      sections,
      resumeSettings: resumeSource.resumeSettings || defaultResumeSettings,
    }));

    setSavingStatus("saved");
    isInitialLoad.current = false;
  }, [resumeSource]);

  // -------------------- AUTO SAVE --------------------
  useEffect(() => {
    if (isInitialLoad.current) return;

    const currentData = { ...formValues, sections, resumeSettings };
    const normalized = JSON.parse(JSON.stringify(currentData));

    if (lastSavedData.current && isEqual(normalized, lastSavedData.current)) return;

    setSavingStatus("saving");

    const timeoutId = setTimeout(() => {
      const payload = { ...currentData, sections, resumeSettings, resume_type: "linkedin" };

      if (resumeIds.mongo_id && resumeIds.mysql_id) {
        payload.mongo_id = resumeIds.mongo_id;
        payload.mysql_id = resumeIds.mysql_id;
      }

      dispatch(saveResumeLinkedIn(payload)).then((res) => {
        if (res.payload?.status_code === 200) {
          setSavingStatus("saved");
          lastSavedData.current = normalized;

          if (!resumeIds.mongo_id) {
            const mongo_id = res.payload.sectionsdata?.mongo_id;
            const mysql_id = res.payload.sectionsdata?.mysql_id;
            setResumeIds({ mongo_id, mysql_id });
            router.replace(`/linkedIn-rewrite?id=${mysql_id}&fetch=linkdin_resume`, { scroll: false });
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

    const payload = { ...data, sections, resumeSettings, resume_type: "linkdin" };

    if (resumeIds.mongo_id && resumeIds.mysql_id) {
      payload.mongo_id = resumeIds.mongo_id;
      payload.mysql_id = resumeIds.mysql_id;
    }

    dispatch(saveResumeLinkedIn(payload)).then((res) => {
      if (res.payload?.status_code === 200) {
        setSavingStatus("saved");
        lastSavedData.current = JSON.parse(JSON.stringify({ ...data, sections, resumeSettings }));

        if (!resumeIds.mongo_id) {
          const mongo_id = res.payload.sectionsdata?.mongo_id;
          const mysql_id = res.payload.sectionsdata?.mysql_id;
          setResumeIds({ mongo_id, mysql_id });
          router.replace(`/linkedin-resume-builder?id=${mysql_id}&fetch=linkdin_resume`, { scroll: false });
        }
      } else {
        setSavingStatus("error");
      }
    });
  };

  useEffect(() => {
    if (!resume_id || !resume_type) return;
    dispatch(getSingleResume({ id: resume_id, fetch: resume_type }));
  }, [resume_id, resume_type, dispatch]);

  // -------------------- AUTO HIDE STATUS --------------------
  useEffect(() => {
    if (savingStatus === "saved") {
      const timer = setTimeout(() => setSavingStatus("unsaved"), 2000);
      return () => clearTimeout(timer);
    }
  }, [savingStatus]);

  // -------------------- SECTION MAPPER --------------------
  const mapLinkedInDataToSections = (resumeData) => {
    if (!resumeData) return [];
    const sections = [];
    let id = 0;

    // 1. Skills
    const techCategories = resumeData?.technical_skills?.categories || {};
    const allSkills = Object.values(techCategories).flat();
    const softSkills = resumeData?.soft_skills || [];

    if (allSkills.length > 0 || softSkills.length > 0) {
      sections.push({
        id: id++, title: "Skills", type: "skills",
        skills: [
          ...allSkills.map((skill, i) => ({ id: `ts_${i}_${Date.now()}`, name: skill, level: 3 })),
          ...softSkills.map((skill, i) => ({ id: `ss_${i}_${Date.now()}`, name: skill, level: 3 })),
        ],
      });
    }

    // 2. Languages
    const languages = resumeData?.personal_information?.languages || [];
    if (languages.length > 0) {
      sections.push({
        id: id++, title: "Languages", type: "languages",
        hideProficiency: false,
        languages: languages.map((lang, i) => ({
          id: `lang_${i}_${Date.now()}`,
          language: typeof lang === "string" ? lang : (lang.name || ""),
          level: typeof lang === "object" ? (lang.level || "Intermediate") : "Intermediate",
        })),
      });
    }

    // 3. Profile Summary
    const profileSummaryContent = resumeData?.additional_sections?.["PROFILE SUMMARY"]?.content;
    const fallbackSummary = resumeData?.professional_summary?.summary_text;
    let summaryHtml = "";

    if (Array.isArray(profileSummaryContent) && profileSummaryContent.length > 0) {
      summaryHtml = `<ul>${profileSummaryContent.map((p) => `<li>${p}</li>`).join("")}</ul>`;
    } else if (typeof profileSummaryContent === "string" && profileSummaryContent.trim()) {
      summaryHtml = profileSummaryContent;
    } else if (fallbackSummary) {
      summaryHtml = fallbackSummary;
    }

    if (summaryHtml) {
      sections.push({ id: id++, title: "Profile Summary", type: "summary", summary: summaryHtml });
    }

    // 4. Core Competencies
    const coreComp = resumeData?.additional_sections?.["CORE COMPETENCIES"]?.content;
    if (Array.isArray(coreComp) && coreComp.length > 0) {
      sections.push({
        id: id++, title: "Core Competencies", type: "custom_simple",
        hideExperienceLevel: true,
        items: coreComp.map((item, i) => ({
          id: `cc_${i}_${Date.now()}`,
          name: typeof item === "string" ? item : (item.name || item.title || ""),
          level: 2,
        })),
      });
    }

    // 5. Experience
    if ((resumeData?.work_experience || []).length > 0) {
      sections.push({
        id: id++, title: "Experience", type: "experience",
        experiences: resumeData.work_experience.map((exp, i) => ({
          id: `x_${i}_${Date.now()}`,
          jobTitle: exp.job_title || "",
          company: exp.company_name || "",
          city: exp.location || "",
          startDate: exp.start_date || "",
          endDate: exp.end_date || "",
          description: Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0
            ? `<ul>${exp.responsibilities.map((r) => `<li>${r}</li>`).join("")}</ul>`
            : exp.description || "",
        })),
      });
    }

    // 6. Education
    if ((resumeData?.education || []).length > 0) {
      sections.push({
        id: id++, title: "Education", type: "education",
        educations: resumeData.education.map((edu, i) => ({
          id: `e_${i}_${Date.now()}`,
          institute: edu.institution || "",
          degree: `${edu.degree || ""} ${edu.field_of_study || ""}`.trim(),
          startDate: edu.start_date || "",
          endDate: edu.graduation_date || "",
          city: edu.location || "",
          description: edu.description || "",
        })),
      });
    }

    // 7. Honors & Awards
    const honorsAwards = resumeData?.additional_sections?.["Honors-Awards"]?.content;
    if (Array.isArray(honorsAwards) && honorsAwards.length > 0) {
      sections.push({
        id: id++,
        title: "Honors & Awards",
        type: "honors",
        items: honorsAwards.map((item, i) => ({
          id: `honor_${i}_${Date.now()}`,
          title: typeof item === "string" ? item : (item.title || item.name || ""),
          issuer: typeof item === "object" ? (item.issuer || "") : "",
          startDate: typeof item === "object" ? (item.startDate || "") : "",
          endDate: typeof item === "object" ? (item.endDate || "") : "",
          description: typeof item === "object" ? (item.description || "") : "",
        })),
      });
    }


    return sections;
  };

  // -------------------- SET FORM VALUES --------------------
  useEffect(() => {
    if (!resumeSource) return;

    const resumeData = extracteResumeData?.resume_data || resumeSource;
    const personal = resumeData?.personal_information || {};
    const additionalSections = resumeData?.additional_sections || {};

    const fullName = personal.full_name || "";
    const nameParts = fullName.split(" ");

    const headlineText =
      additionalSections?.Headline?.content ||
      resumeData?.metadata?.current_role ||
      resumeSource.job_target ||
      "";

    const fullAddress = personal?.location?.full_address || "";
    const city = personal?.location?.city || "";
    const state = personal?.location?.state || "";
    const formattedCityState = [city, state].filter(Boolean).join(", ");

    setValue("job_target", headlineText);
    setValue("first_name", nameParts[0] || resumeSource.first_name || "");
    setValue("last_name", nameParts.slice(1).join(" ") || resumeSource.last_name || "");
    setValue("email", personal.email || resumeSource.email || "");
    setValue("phone", personal.phone || resumeSource.phone || "");
    setValue("address", fullAddress || resumeSource.address || "");
    setValue("city_state", formattedCityState || resumeSource.city_state || "");
    setValue("linkedin", personal.linkedin || resumeSource.linkedin || "");
    setValue("website", resumeSource.website || "");
  }, [extracteResumeData, resumeSource, setValue]);

  // -------------------- SYNC SUMMARY --------------------
  useEffect(() => {
    const summarySections = sections.filter(sec => sec.type === "summary");
    if (summarySections.length > 0) setValue("summary", summarySections[0].summary || "");
  }, [sections, setValue]);

  // -------------------- MAP SECTIONS + RESTORE SETTINGS --------------------
  useEffect(() => {
    if (!resumeSource) return;

    if (resumeSource.resumeSettings) {
      const settings = resumeSource.resumeSettings;
      setResumeSettings(settings);

      const template = settings.theme?.template || "linkedin";
      setSelectedTemplate(template);

      const color =
        settings.theme?.templateColors?.[template] ||
        settings.theme?.defaultColor ||
        defaultResumeSettings.theme.defaultColor;

      setThemeColor(color);
    }

    if (resumeSource.sections?.length) {
      setSections(resumeSource.sections);
      return;
    }

    setSections(mapLinkedInDataToSections(resumeSource));
  }, [resumeSource]);

  // -------------------- SYNC SKILLS --------------------
  useEffect(() => {
    const merged = sections
      .filter(sec => sec.type === "skills")
      .flatMap(sec => (sec.skills || []).map(s => ({ skill: s.name, level: s.level ?? 3 })));
    setValue("newSkillHistory", merged);
  }, [sections, setValue]);

  // -------------------- SYNC EDUCATION --------------------
  useEffect(() => {
    const history = sections
      .filter(sec => sec.type === "education")
      .flatMap(sec => (sec.educations || []).map(edu => ({
        school: edu.institute || "",
        degree: edu.degree || "",
        startDate: edu.startDate || "",
        endDate: edu.endDate || "",
        city_state: edu.city || "",
        description: edu.description || "",
      })));
    setValue("educationHistory", history);
  }, [sections, setValue]);

  // -------------------- SYNC EXPERIENCE --------------------
  useEffect(() => {
    const history = sections
      .filter(sec => sec.type === "experience")
      .flatMap(sec => (sec.experiences || []).map(exp => ({
        job_title: exp.jobTitle || "",
        employer: exp.company || "",
        city_state: exp.city || "",
        startDate: exp.startDate || "",
        endDate: exp.endDate || "",
        description: exp.description || "",
      })));
    setValue("employmentHistory", history);
  }, [sections, setValue]);

  // ═══════════════════════════════════════════════════════════════
  //  SKILL HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleSkillDragStart = (e, index) => { e.stopPropagation(); setDraggedSkillIndex(index); };

  const handleSkillDrop = (e, sectionIndex, targetSkillIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedSkillIndex === null || draggedSkillIndex === targetSkillIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const skills = [...updated[sectionIndex].skills];
      const [moved] = skills.splice(draggedSkillIndex, 1);
      skills.splice(targetSkillIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], skills };
      return updated;
    });
    setDraggedSkillIndex(null);
  };

  const handleSkillUpdate = (sectionIndex, skillId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (skillId === null) return { ...section, [field]: value };
      if (field === "delete") return { ...section, skills: section.skills.filter(s => s.id !== skillId) };
      return { ...section, skills: section.skills.map(s => s.id === skillId ? { ...s, [field]: value } : s) };
    }));
  };

  // ═══════════════════════════════════════════════════════════════
  //  LANGUAGE HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleLanguageDragStart = (e, index) => { e.stopPropagation(); setDraggedLanguageIndex(index); };

  const handleLanguageDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedLanguageIndex === null || draggedLanguageIndex === targetIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const langs = [...(updated[sectionIndex].languages || [])];
      const [moved] = langs.splice(draggedLanguageIndex, 1);
      langs.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], languages: langs };
      return updated;
    });
    setDraggedLanguageIndex(null);
  };

  const handleLanguageUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === 'hideProficiency') return { ...section, hideProficiency: value };
      if (field === 'add') return { ...section, languages: [...(section.languages || []), value] };
      if (field === 'delete') return { ...section, languages: (section.languages || []).filter(l => l.id !== itemId) };
      return {
        ...section,
        languages: (section.languages || []).map(l => l.id === itemId ? { ...l, [field]: value } : l),
      };
    }));
  };

  // ═══════════════════════════════════════════════════════════════
  //  EDUCATION HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleEducationDragStart = (e, index) => { e.stopPropagation(); setDraggedEducationIndex(index); };

  const handleEducationDrop = (e, sectionIndex, targetEduIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedEducationIndex === null || draggedEducationIndex === targetEduIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const list = [...updated[sectionIndex].educations];
      const [moved] = list.splice(draggedEducationIndex, 1);
      list.splice(targetEduIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], educations: list };
      return updated;
    });
    setDraggedEducationIndex(null);
  };

  const handleEducationUpdate = (sectionIndex, eduId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === "delete") return { ...section, educations: section.educations.filter(e => e.id !== eduId) };
      return { ...section, educations: section.educations.map(e => e.id === eduId ? { ...e, [field]: value } : e) };
    }));
  };

  const handleAddEducation = (sectionIndex) => {
    setSections(prev => prev.map((section, i) =>
      i === sectionIndex
        ? { ...section, educations: [...section.educations, { id: `e${Date.now()}`, institute: "", degree: "", startDate: "", endDate: "", city: "", description: "" }] }
        : section
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  EXPERIENCE HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleExpDragStart = (e, index) => { e.stopPropagation(); setDraggedExpIndex(index); };

  const handleExpDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedExpIndex === null || draggedExpIndex === targetIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const list = [...updated[sectionIndex].experiences];
      const [moved] = list.splice(draggedExpIndex, 1);
      list.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], experiences: list };
      return updated;
    });
    setDraggedExpIndex(null);
  };

  const handleExpUpdate = (sectionIndex, expId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === "delete") return { ...section, experiences: section.experiences.filter(e => e.id !== expId) };
      return { ...section, experiences: section.experiences.map(e => e.id === expId ? { ...e, [field]: value } : e) };
    }));
  };

  const handleAddExperience = (sectionIndex) => {
    setSections(prev => prev.map((section, i) =>
      i === sectionIndex
        ? { ...section, experiences: [...section.experiences, { id: `x${Date.now()}`, jobTitle: "", company: "", city: "", startDate: "", endDate: "", description: "" }] }
        : section
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  CERTIFICATIONS HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleCertDragStart = (e, index) => { e.stopPropagation(); setDraggedCertIndex(index); };

  const handleCertDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedCertIndex === null || draggedCertIndex === targetIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const list = [...updated[sectionIndex].certifications];
      const [moved] = list.splice(draggedCertIndex, 1);
      list.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], certifications: list };
      return updated;
    });
    setDraggedCertIndex(null);
  };

  const handleCertUpdate = (sectionIndex, certId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === "delete") return { ...section, certifications: section.certifications.filter(c => c.id !== certId) };
      return { ...section, certifications: section.certifications.map(c => c.id === certId ? { ...c, [field]: value } : c) };
    }));
  };

  const handleAddCertification = (sectionIndex) => {
    setSections(prev => prev.map((section, i) =>
      i === sectionIndex
        ? { ...section, certifications: [...section.certifications, { id: `c${Date.now()}`, name: "", organization: "", city: "", startYear: "", endYear: "", description: "" }] }
        : section
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  HOBBIES HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleHobbiesUpdate = (sectionIndex, field, value) => {
    setSections(prev => prev.map((section, i) =>
      i !== sectionIndex ? section : { ...section, [field]: value }
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  INTERNSHIPS HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleInternshipDragStart = (e, index) => { e.stopPropagation(); setDraggedInternshipIndex(index); };

  const handleInternshipDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedInternshipIndex === null || draggedInternshipIndex === targetIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const list = [...updated[sectionIndex].internships];
      const [moved] = list.splice(draggedInternshipIndex, 1);
      list.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], internships: list };
      return updated;
    });
    setDraggedInternshipIndex(null);
  };

  const handleInternshipUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === 'delete') return { ...section, internships: section.internships.filter(item => item.id !== itemId) };
      return { ...section, internships: section.internships.map(item => item.id === itemId ? { ...item, [field]: value } : item) };
    }));
  };

  const handleAddInternship = (sectionIndex) => {
    setSections(prev => prev.map((section, i) =>
      i !== sectionIndex ? section : {
        ...section,
        internships: [...(section.internships || []), {
          id: `intern_${Date.now()}`, jobTitle: '', employer: '', city: '',
          startDate: '', endDate: '', description: '', isCurrentlyInterning: false,
        }]
      }
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  ACTIVITIES HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleActivityDragStart = (e, index) => { e.stopPropagation(); setDraggedActivityIndex(index); };

  const handleActivityDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedActivityIndex === null || draggedActivityIndex === targetIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const list = [...updated[sectionIndex].activities];
      const [moved] = list.splice(draggedActivityIndex, 1);
      list.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], activities: list };
      return updated;
    });
    setDraggedActivityIndex(null);
  };

  const handleActivityUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === 'delete') return { ...section, activities: section.activities.filter(a => a.id !== itemId) };
      return { ...section, activities: section.activities.map(a => a.id === itemId ? { ...a, [field]: value } : a) };
    }));
  };

  const handleAddActivity = (sectionIndex) => {
    setSections(prev => prev.map((section, i) =>
      i !== sectionIndex ? section : {
        ...section,
        activities: [...(section.activities || []), {
          id: `activity_${Date.now()}`, functionTitle: '', employer: '', city: '',
          startDate: '', endDate: '', description: '', isCurrentlyActive: false,
        }]
      }
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  COURSES HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleCourseDragStart = (e, index) => { e.stopPropagation(); setDraggedCourseIndex(index); };

  const handleCourseDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedCourseIndex === null || draggedCourseIndex === targetIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const list = [...(updated[sectionIndex].courses || [])];
      const [moved] = list.splice(draggedCourseIndex, 1);
      list.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], courses: list };
      return updated;
    });
    setDraggedCourseIndex(null);
  };

  const handleCourseUpdate = (sectionIndex, courseId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === "delete") return { ...section, courses: (section.courses || []).filter(c => c.id !== courseId) };
      return { ...section, courses: (section.courses || []).map(c => c.id === courseId ? { ...c, [field]: value } : c) };
    }));
  };

  const handleAddCourse = (sectionIndex) => {
    setSections(prev => prev.map((section, i) =>
      i === sectionIndex
        ? { ...section, courses: [...(section.courses || []), { id: `course_${Date.now()}`, course: '', institution: '', startDate: '', endDate: '' }] }
        : section
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  HONORS HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleHonorDragStart = (e, index) => { e.stopPropagation(); setDraggedHonorIndex(index); };

  const handleHonorDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedHonorIndex === null || draggedHonorIndex === targetIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const list = [...(updated[sectionIndex].items || [])];
      const [moved] = list.splice(draggedHonorIndex, 1);
      list.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], items: list };
      return updated;
    });
    setDraggedHonorIndex(null);
  };

  const handleHonorUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === "delete") return { ...section, items: (section.items || []).filter(it => it.id !== itemId) };
      return { ...section, items: (section.items || []).map(it => it.id === itemId ? { ...it, [field]: value } : it) };
    }));
  };

  const handleAddHonor = (sectionIndex) => {
    setSections(prev => prev.map((section, i) =>
      i === sectionIndex
        ? {
          ...section,
          items: [
            ...(section.items || []),
            {
              id: `honor_${Date.now()}`,
              title: '',
              issuer: '',
              startDate: '',
              endDate: '',
              description: ''
            }
          ]
        }
        : section
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  CUSTOM SIMPLE HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleSimpleCustomUpdate = (sectionIndex, itemIndex, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (itemIndex === null && field !== "add") return { ...section, [field]: value };
      if (field === "add") return { ...section, items: [...(section.items || []), value] };
      if (field === "delete") return { ...section, items: (section.items || []).filter((_, idx) => idx !== itemIndex) };
      return {
        ...section,
        items: (section.items || []).map((item, idx) => {
          if (idx !== itemIndex) return item;
          const obj = typeof item === 'object' ? item : { name: item, level: 2 };
          return { ...obj, [field]: value };
        }),
      };
    }));
  };

  // ═══════════════════════════════════════════════════════════════
  //  CUSTOM ADVANCED HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleCustomDragStart = (e, index) => { e.stopPropagation(); setDraggedCustomIndex(index); };

  const handleCustomDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedCustomIndex === null || draggedCustomIndex === targetIndex) return;
    setSections(prev => {
      const updated = [...prev];
      const list = [...(updated[sectionIndex].items || [])];
      const [moved] = list.splice(draggedCustomIndex, 1);
      list.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], items: list };
      return updated;
    });
    setDraggedCustomIndex(null);
  };

  const handleCustomUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;
      if (field === "delete") return { ...section, items: (section.items || []).filter(it => it.id !== itemId) };
      return { ...section, items: (section.items || []).map(it => it.id === itemId ? { ...it, [field]: value } : it) };
    }));
  };

  const handleAddCustomItem = (sectionIndex) => {
    setSections(prev => prev.map((section, i) =>
      i === sectionIndex
        ? { ...section, items: [...(section.items || []), { id: `custom_${Date.now()}`, title: "", city: "", startDate: "", endDate: "", description: "" }] }
        : section
    ));
  };

  // ═══════════════════════════════════════════════════════════════
  //  TEMPLATE / SECTION HANDLERS
  // ═══════════════════════════════════════════════════════════════
  // const handleSelectTemplate = (id) => {
  //   setSelectedTemplate(id);
  //   const color =
  //     defaultResumeSettings.theme.templateColors[id.toLowerCase()] ||
  //     defaultResumeSettings.theme.defaultColor;
  //   setThemeColor(color);
  //   setResumeSettings(prev => ({ ...prev, theme: { ...prev.theme, template: id } }));
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
    const newId = sections.length > 0 ? Math.max(...sections.map(s => s.id)) + 1 : 0;
    setSections(prev => [...prev, { id: newId, ...newSection }]);
  };

  const handleSectionTitleUpdate = (sectionIndex, newTitle) => {
    setSections(prev => prev.map((s, i) => i === sectionIndex ? { ...s, title: newTitle } : s));
  };

  const handleDeleteSection = (sectionIndex) => {
    setSections(prev => prev.filter((_, i) => i !== sectionIndex));
  };

  const handleAnimatedDeleteSection = (index) => {
    setDeletingSectionIndex(index);
    setTimeout(() => {
      handleDeleteSection(index);
      setDeletingSectionIndex(null);
    }, 500);
  };

  const handleDragEnd = () => { };

  // ═══════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className='lg:flex gap-1 pb-0'>
      <ToastContainer />

      <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] h-screen overflow-auto hide-scrollbar'>
        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-10'>
              <LinkedInResumeScore
                score={checkATSData?.ATS_Score}
                loading={atsLoading}
                guide={checkATSData?.Improvment_Guide}
              />

              <LinkedInPersonalDetails register={register} watch={watch} setValue={setValue} />

              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleSectionDragEnd}>
                <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
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
                                          if (e.target.value.trim()) handleSectionTitleUpdate(index, e.target.value.trim());
                                        }}
                                        onKeyDown={(e) => { if (e.key === "Enter") e.target.blur(); }}
                                        className="bg-transparent border-b border-gray-300 outline-none text-xl font-bold w-full"
                                      />
                                    ) : (
                                      <span className="cursor-pointer" onClick={() => setEditingSectionIndex(index)}>
                                        {section.title}
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-3 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                                    <FaPen
                                      className="text-sm text-gray-400 hover:text-purple-600 cursor-pointer"
                                      onClick={(e) => { e.stopPropagation(); setEditingSectionIndex(index); }}
                                    />
                                    <FaTrash
                                      className="text-sm text-gray-400 hover:text-red-500 cursor-pointer"
                                      onClick={(e) => { e.stopPropagation(); handleAnimatedDeleteSection(index); }}
                                    />
                                  </div>
                                </AccordionTitle>

                                <AccordionContent className='pt-0'>

                                  {section.type === 'skills' && (
                                    <LinkedInSkills
                                      section={section}
                                      sectionIndex={index}
                                      handleSkillUpdate={handleSkillUpdate}
                                      handleSkillDragStart={handleSkillDragStart}
                                      handleSkillDrop={handleSkillDrop}
                                      draggedSkillIndex={draggedSkillIndex}
                                      setDraggedSkillIndex={setDraggedSkillIndex}
                                    />
                                  )}

                                  {section.type === 'languages' && (
                                    <LinkedInLanguages
                                      section={section}
                                      sectionIndex={index}
                                      handleLanguageUpdate={handleLanguageUpdate}
                                      handleLanguageDragStart={handleLanguageDragStart}
                                      handleLanguageDrop={handleLanguageDrop}
                                      draggedLanguageIndex={draggedLanguageIndex}
                                      setDraggedLanguageIndex={setDraggedLanguageIndex}
                                    />
                                  )}

                                  {section.type === "summary" && (
                                    <LinkedInSummary
                                      watch={watch} setValue={setValue}
                                      sections={sections} setSections={setSections}
                                      sectionIndex={index}
                                      onAtsRefresh={handleAtsRefresh}
                                    />
                                  )}

                                  {section.type === "education" && (
                                    <LinkedInEducation
                                      section={section} sectionIndex={index}
                                      handleEducationUpdate={handleEducationUpdate}
                                      handleEducationDragStart={handleEducationDragStart}
                                      handleEducationDrop={handleEducationDrop}
                                      handleAddEducation={handleAddEducation}
                                      draggedEducationIndex={draggedEducationIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}

                                  {section.type === "experience" && (
                                    <LinkedInExperience
                                      section={section} sectionIndex={index}
                                      handleExpUpdate={handleExpUpdate}
                                      handleExpDragStart={handleExpDragStart}
                                      handleExpDrop={handleExpDrop}
                                      handleAddExperience={handleAddExperience}
                                      draggedExpIndex={draggedExpIndex}
                                      handleDragEnd={handleDragEnd}
                                      onAtsRefresh={handleAtsRefresh}
                                    />
                                  )}

                                  {section.type === "courses" && (
                                    <LinkedInCourses
                                      section={section} sectionIndex={index}
                                      handleUpdate={handleCourseUpdate}
                                      handleDragStart={handleCourseDragStart}
                                      handleDrop={handleCourseDrop}
                                      handleAddCourse={handleAddCourse}
                                      draggedIndex={draggedCourseIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}

                                  {section.type === "honors" && (
                                    <LinkedInHonors
                                      section={section} sectionIndex={index}
                                      handleUpdate={handleHonorUpdate}
                                      handleDragStart={handleHonorDragStart}
                                      handleDrop={handleHonorDrop}
                                      handleAddItem={handleAddHonor}
                                      draggedIndex={draggedHonorIndex}
                                      handleDragEnd={handleDragEnd}
                                    />
                                  )}
                                  {section.type === "custom_simple" && (
                                    <LinkedInSimpleCustomSection
                                      section={section} sectionIndex={index}
                                      handleUpdate={handleSimpleCustomUpdate}
                                      handleDragStart={handleCustomDragStart}
                                      handleDrop={handleCustomDrop}
                                      draggedIndex={draggedCustomIndex}
                                      setDraggedIndex={setDraggedCustomIndex}
                                    />
                                  )}

                                  {section.type === "custom" && (
                                    <LinkedInCustomSection
                                      section={section} sectionIndex={index}
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

              {/* Add Section Button */}
              <LinkedInAddSectionButton
                onAddNewSection={handleAddNewSection}
                sections={sections}
              />

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

        {/* ── Save status indicator ── */}
        <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50">
          {savingStatus === 'saving' && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/80 backdrop-blur text-white text-xs font-medium shadow-lg animate-pulse">
              <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Saving changes...
            </div>
          )}
          {savingStatus === 'saved' && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-xs font-medium shadow-lg animate-fade-in">
              <AiFillSave className="text-sm" /> Saved successfully
            </div>
          )}
          {savingStatus === 'error' && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-xs font-medium shadow-lg animate-shake">
              ❌ Save failed
            </div>
          )}
        </div>
      </div>

      {/* ── Template preview ── */}
      <div className='lg:w-6/12 bg-[#ffffff] px-0'>
        <div className='h-screen overflow-y-scroll'>
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
    </div>
  );
};

export default LinkedInResumeBuilder;