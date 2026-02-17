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
import LinkedInLanguages from './components/LinkedInLanguages'; // ✅ NEW
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

  // States
  const [selectedTemplate, setSelectedTemplate]         = useState('linkedin');
  const [sections, setSections]                         = useState([]);
  const [draggedSkillIndex, setDraggedSkillIndex]       = useState(null);
  const [draggedEducationIndex, setDraggedEducationIndex] = useState(null);
  const [draggedExpIndex, setDraggedExpIndex]           = useState(null);
  const [draggedLanguageIndex, setDraggedLanguageIndex] = useState(null); // ✅ NEW
  const [editingSectionIndex, setEditingSectionIndex]   = useState(null);
  const [resumeSettings, setResumeSettings]             = useState(defaultResumeSettings);
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

  const resume_id   = searchParams.get("id");
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
    const normalized  = JSON.parse(JSON.stringify(currentData));

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
    const allSkills      = Object.values(techCategories).flat();
    const softSkills     = resumeData?.soft_skills || [];

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
          level:    typeof lang === "object"  ? (lang.level || "Intermediate") : "Intermediate",
        })),
      });
    }

    // 3. Profile Summary
    const profileSummaryContent = resumeData?.additional_sections?.["PROFILE SUMMARY"]?.content;
    const fallbackSummary       = resumeData?.professional_summary?.summary_text;
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
          jobTitle:    exp.job_title    || "",
          company:     exp.company_name || "",
          city:        exp.location     || "",
          startDate:   exp.start_date   || "",
          endDate:     exp.end_date     || "",
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
          institute:   edu.institution   || "",
          degree:      `${edu.degree || ""} ${edu.field_of_study || ""}`.trim(),
          startDate:   edu.start_date    || "",
          endDate:     edu.graduation_date || "",
          city:        edu.location      || "",
          description: edu.description   || "",
        })),
      });
    }

    // 7. Achievements
    const achievements = resumeData?.additional_sections?.["ACHIEVEMENTS"]?.content;
    if (Array.isArray(achievements) && achievements.length > 0) {
      sections.push({
        id: id++, title: "Achievements", type: "custom_simple",
        hideExperienceLevel: true,
        items: achievements.map((item, i) => ({
          id: `ach_${i}_${Date.now()}`,
          name: typeof item === "string" ? item : (item.name || ""),
          level: 2,
        })),
      });
    }

    return sections;
  };

  // -------------------- SET FORM VALUES --------------------
  useEffect(() => {
    if (!resumeSource) return;

    const resumeData      = extracteResumeData?.resume_data || resumeSource;
    const personal        = resumeData?.personal_information || {};
    const additionalSections = resumeData?.additional_sections || {};

    const fullName  = personal.full_name || "";
    const nameParts = fullName.split(" ");

    const headlineText =
      additionalSections?.Headline?.content ||
      resumeData?.metadata?.current_role    ||
      resumeSource.job_target               ||
      "";

    const fullAddress     = personal?.location?.full_address || "";
    const city            = personal?.location?.city  || "";
    const state           = personal?.location?.state || "";
    const formattedCityState = [city, state].filter(Boolean).join(", ");

    setValue("job_target",  headlineText);
    setValue("first_name",  nameParts[0] || resumeSource.first_name || "");
    setValue("last_name",   nameParts.slice(1).join(" ") || resumeSource.last_name || "");
    setValue("email",       personal.email  || resumeSource.email  || "");
    setValue("phone",       personal.phone  || resumeSource.phone  || "");
    setValue("address",     fullAddress     || resumeSource.address || "");
    setValue("city_state",  formattedCityState || resumeSource.city_state || "");
    setValue("linkedin",    personal.linkedin  || resumeSource.linkedin   || "");
    setValue("website",     resumeSource.website || "");
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

      const template = settings.theme?.template || "professional";
      setSelectedTemplate(template);

      const color =
        settings.theme?.templateColors?.[template] ||
        settings.theme?.defaultColor               ||
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
        school: edu.institute || "", degree: edu.degree || "",
        startDate: edu.startDate || "", endDate: edu.endDate || "",
        city_state: edu.city || "", description: edu.description || "",
      })));
    setValue("educationHistory", history);
  }, [sections, setValue]);

  // -------------------- SYNC EXPERIENCE --------------------
  useEffect(() => {
    const history = sections
      .filter(sec => sec.type === "experience")
      .flatMap(sec => (sec.experiences || []).map(exp => ({
        job_title: exp.jobTitle || "", employer: exp.company || "",
        city_state: exp.city || "", startDate: exp.startDate || "",
        endDate: exp.endDate || "", description: exp.description || "",
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
      const updated   = [...prev];
      const skills    = [...updated[sectionIndex].skills];
      const [moved]   = skills.splice(draggedSkillIndex, 1);
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
  //  LANGUAGE HANDLERS  ✅ NEW
  // ═══════════════════════════════════════════════════════════════
  const handleLanguageDragStart = (e, index) => {
    e.stopPropagation();
    setDraggedLanguageIndex(index);
  };

  const handleLanguageDrop = (e, sectionIndex, targetIndex) => {
    e.preventDefault(); e.stopPropagation();
    if (draggedLanguageIndex === null || draggedLanguageIndex === targetIndex) return;

    setSections(prev => {
      const updated    = [...prev];
      const langs      = [...(updated[sectionIndex].languages || [])];
      const [moved]    = langs.splice(draggedLanguageIndex, 1);
      langs.splice(targetIndex, 0, moved);
      updated[sectionIndex] = { ...updated[sectionIndex], languages: langs };
      return updated;
    });
    setDraggedLanguageIndex(null);
  };

  // handleLanguageUpdate — handles: field update, delete, add, hideProficiency toggle
  const handleLanguageUpdate = (sectionIndex, itemId, field, value) => {
    setSections(prev => prev.map((section, i) => {
      if (i !== sectionIndex) return section;

      // Toggle show/hide proficiency
      if (field === 'hideProficiency') {
        return { ...section, hideProficiency: value };
      }

      // Add new language row
      if (field === 'add') {
        return { ...section, languages: [...(section.languages || []), value] };
      }

      // Delete a language row
      if (field === 'delete') {
        return { ...section, languages: (section.languages || []).filter(l => l.id !== itemId) };
      }

      // Update a specific field on a language row
      return {
        ...section,
        languages: (section.languages || []).map(l =>
          l.id === itemId ? { ...l, [field]: value } : l
        ),
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
      const list    = [...updated[sectionIndex].educations];
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
      const list    = [...updated[sectionIndex].experiences];
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
  //  TEMPLATE / SECTION HANDLERS
  // ═══════════════════════════════════════════════════════════════
  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    const color =
      defaultResumeSettings.theme.templateColors[id.toLowerCase()] ||
      defaultResumeSettings.theme.defaultColor;
    setThemeColor(color);
    setResumeSettings(prev => ({ ...prev, theme: { ...prev.theme, template: id } }));
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

  const handleDragEnd = () => {};

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

                                  {/* ✅ Languages section */}
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