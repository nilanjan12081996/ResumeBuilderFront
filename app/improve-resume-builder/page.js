'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import isEqual from 'lodash.isequal';
import { AiFillSave } from "react-icons/ai";
// Import components
import ImpResumeScore from './components/ImpResumeScore';
import ImpPersonalDetails from './components/ImpPersonalDetails';
import ImpSkills from './components/ImpSkills';
import ImpSummary from './components/ImpSummary';
import ImpEducation from './components/ImpEducation';
import ImpCertifications from './components/ImpCertifications';
import ImpExperience from './components/ImpExperience';
import CustomizeSection from '../ui/CustomizeSection.jsx';
import ImpCoreCompetencies from "./components/ImpCoreCompetencies";
// Import templates
import Professional from "../TemplateNew/Professional";
import PrimeATS from "../TemplateNew/PrimeATS";
import CleanTemplate from "../TemplateNew/CleanTemplate";
import ClearTemplate from "../TemplateNew/ClearTemplate";
import VividTemplate from "../TemplateNew/VividTemplate";
import CorporateTemplate from '../TemplateNew/CorporateTemplate';

import { useTabs } from '../context/TabsContext.js';
import { checkATS } from '../reducers/DashboardSlice';
import { getSingleResume, saveResumeImprove } from '../reducers/ResumeSlice';
import { TbDragDrop } from 'react-icons/tb';
import ImpCustomSection from './components/ImpCustomSection';
import AddSectionButton from './components/AddSectionButton';
import { FaPen, FaTrash } from 'react-icons/fa';
import { defaultResumeSettings } from "../config/defaultResumeSettings";

const Page = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const { improveResumeData } = useSelector((state) => state?.dash);
  const { loading, singleResumeInfo } = useSelector((state) => state?.resume);
  console.log('singleResumeInfo', singleResumeInfo)
  // console.log('singleResumeInfo', singleResumeInfo)
  const resumeSource =
    singleResumeInfo?.data?.data ||
    improveResumeData?.resume_data ||
    null;


  // Resume ID tracking
  const [resumeIds, setResumeIds] = useState({ mongo_id: null, mysql_id: null });

  // Auto-Save State
  const lastSavedData = useRef(null);
  const isInitialLoad = useRef(true);
  const [savingStatus, setSavingStatus] = useState('unsaved'); // 'saved', 'saving', 'error', 'unsaved'

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
  const [selectedTemplate, setSelectedTemplate] = useState('Professional');
  const [sections, setSections] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [draggedSkillIndex, setDraggedSkillIndex] = useState(null);
  const [draggedEducationIndex, setDraggedEducationIndex] = useState(null);
  const [draggedCertIndex, setDraggedCertIndex] = useState(null);
  const [draggedExpIndex, setDraggedExpIndex] = useState(null);
  const [draggedCustomIndex, setDraggedCustomIndex] = useState(null);
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [resumeSettings, setResumeSettings] = useState(defaultResumeSettings);
  const [deletingSectionIndex, setDeletingSectionIndex] = useState(null);
  const { activeTab } = useTabs();
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

  const ActiveResume = templateMap[selectedTemplate] || Professional;

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
  const resume_type = searchParams.get("fetch"); // "improve"


  // -------------------- INITIAL DATA LOAD --------------------
  useEffect(() => {
    if (!resumeSource) return;

    // set resume IDs (EDIT MODE)
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
    };

    //  compare WITHOUT IDs
    const normalized = JSON.parse(JSON.stringify(currentData));

    if (lastSavedData.current && isEqual(normalized, lastSavedData.current)) {
      return;
    }

    setSavingStatus("saving");

    const timeoutId = setTimeout(() => {
      const payload = {
        ...currentData,
        resume_type: "improve",
      };

      //  send IDs ONLY after first save
      if (resumeIds.mongo_id && resumeIds.mysql_id) {
        payload.mongo_id = resumeIds.mongo_id;
        payload.mysql_id = resumeIds.mysql_id;
      }

      dispatch(saveResumeImprove(payload)).then((res) => {
        if (res.payload?.status_code === 200) {
          setSavingStatus("saved");
          lastSavedData.current = normalized;

          // FIRST SAVE → capture IDs
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
  }, [formValues, sections]);


  // -------------------- MANUAL SAVE --------------------
  const onSubmit = (data) => {
    setSavingStatus("saving");

    const payload = {
      ...data,
      sections,
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
          JSON.stringify({ ...data, sections })
        );

        // 🧠 FIRST SAVE ONLY
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
        fetch: resume_type, // "improve"
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
  const mapImproveResumeDataToSections = (resumeData) => {
    if (!resumeData) return [];

    const sections = [];
    let id = 0;

    // ----------------- TECHNICAL SKILLS -----------------
    const techCategories = resumeData?.technical_skills?.categories || {};
    const techSkills = Object.values(techCategories).flat();

    if (techSkills.length > 0) {
      sections.push({
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

    // ----------------- SOFT SKILLS -----------------
    if ((resumeData?.soft_skills || []).length > 0) {
      sections.push({
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

    // ----------------- SUMMARY -----------------
    if (resumeData?.professional_summary?.summary_text) {
      sections.push({
        id: id++,
        title: "Professional Summary",
        type: "summary",
        summary: resumeData.professional_summary.summary_text,
      });
    }

    // ----------------- EDUCATION -----------------
    if ((resumeData?.education || []).length > 0) {
      sections.push({
        id: id++,
        title: "Education",
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
      });
    }

    // ----------------- CERTIFICATIONS -----------------
    if ((resumeData?.certifications || []).length > 0) {
      sections.push({
        id: id++,
        title: "Certifications",
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
      });
    }

    // ----------------- EXPERIENCE -----------------
    if ((resumeData?.work_experience || []).length > 0) {
      sections.push({
        id: id++,
        title: "Experience",
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
      });
    }

    // ----------------- DYNAMIC ADDITIONAL SECTIONS -----------------
    const additionalSections = resumeData?.additional_sections || {};
    const hasMainExperience = (resumeData?.work_experience || []).length > 0;

    Object.entries(additionalSections).forEach(([key, value]) => {
      if (!value?.content || value.content.length === 0) return;

      const normalizedKey = key.toLowerCase().trim();

      // Skip summary, personal info, profile, header
      // if (
      //   normalizedKey.includes("summary") ||
      //   normalizedKey.includes("personal") ||
      //   normalizedKey.includes("profile") ||
      //   normalizedKey.includes("header")
      // ) return;

      // Skip experience if main experience exists
      // if (
      //   hasMainExperience &&
      //   (
      //     normalizedKey.includes("experience") ||
      //     normalizedKey.includes("employment") ||
      //     normalizedKey.includes("career") ||
      //     normalizedKey.includes("timeline")
      //   )
      // ) return;

      // Core competencies
      if (
        normalizedKey.includes("core competencies") ||
        normalizedKey.includes("competencies")
      ) {
        sections.push({
          id: id++,
          title: key,
          type: "core_competencies",
          items: value.content,
        });
        return;
      }

      // Everything else (including achievements) → custom
      sections.push({
        id: id++,
        title: key,
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
    });

    return sections;
  };

  // ----------------- SETTING FORM VALUES -----------------
useEffect(() => {
  if (!resumeSource) return;

  const resumeData = improveResumeData?.resume_data || resumeSource;
  const personal = resumeData?.personal_information || {};
  const meta = resumeData?.metadata || {};

  // Profile summary
  const profileSummaryFromAdditional =
    resumeData?.additional_sections?.["PROFILE SUMMARY"]?.content;

  const summaryPoints =
    Array.isArray(profileSummaryFromAdditional) && profileSummaryFromAdditional.length > 0
      ? profileSummaryFromAdditional
      : resumeData?.professional_summary?.summary_text
        ? [resumeData.professional_summary.summary_text]
        : [];

  const formattedSummary =
    summaryPoints.length > 1
      ? `<ul>${summaryPoints.map(p => `<li>${p}</li>`).join("")}</ul>`
      : summaryPoints[0] || "";

  // Name
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
  
}, [improveResumeData, resumeSource, setValue]);


// ----------------- SYNC SUMMARY -----------------
useEffect(() => {
  const summarySections = sections.filter(sec => sec.type === "summary");
  if (summarySections.length > 0) {
    const summaryText = summarySections[0].summary || "";
    setValue("summary", summaryText);
  }
}, [sections, setValue]);

  // ----------------- MAP SECTIONS -----------------
  useEffect(() => {
    if (!resumeSource) return;

    // IF already saved resume (edit mode)
    if (resumeSource.sections?.length) {
      setSections(resumeSource.sections);
      return;
    }

    // ELSE generated resume (create mode)
    const mappedSections = mapImproveResumeDataToSections(resumeSource);
    setSections(mappedSections);
  }, [resumeSource]);


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


  // Drag handlers for sections
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
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === targetIndex) return;

    const updatedSections = [...sections];
    const [draggedItem] = updatedSections.splice(draggedIndex, 1);
    updatedSections.splice(targetIndex, 0, draggedItem);

    setSections(updatedSections);
    setDraggedIndex(null);
  };

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

        // toggle hideExperienceLevel
        if (skillId === null) {
          return {
            ...section,
            [field]: value,
          };
        }

        // delete skill
        if (field === "delete") {
          return {
            ...section,
            skills: section.skills.filter(
              skill => skill.id !== skillId
            ),
          };
        }

        // update skill
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
          ? {
            ...section,
            educations: [...section.educations, newEducation]
          }
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
          ? {
            ...section,
            certifications: [...section.certifications, newCert]
          }
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
        if (field === "delete") {
          return {
            ...section,
            items: section.items.filter(
              item => item.id !== itemId
            ),
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
          ? {
            ...section,
            items: [...section.items, newItem]
          }
          : section
      )
    );
  };


  const handleCoreCompetencyUpdate = (sectionIndex, itemIndex, field, value) => {
    setSections(prev =>
      prev.map((section, i) => {
        if (i !== sectionIndex) return section;

        if (itemIndex === null) {
          return {
            ...section,
            [field]: value,
          };
        }

        // delete
        if (field === "delete") {
          return {
            ...section,
            items: section.items.filter((_, idx) => idx !== itemIndex),
          };
        }

        // update name / level
        return {
          ...section,
          items: section.items.map((item, idx) =>
            idx === itemIndex ? { ...item, [field]: value } : item
          ),
        };
      })
    );
  };





  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
    const color =
      defaultResumeSettings.theme.templateColors[id.toLowerCase()] ||
      defaultResumeSettings.theme.defaultColor;

    setThemeColor(color);
  };

  const handleAddNewSection = (newSection) => {
    const newId = Math.max(...sections.map(s => s.id), -1) + 1;
    const sectionToAdd = {
      id: newId,
      ...newSection
    };
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


  return (
    <div className='lg:flex gap-1 pb-0'>
      <ToastContainer />

      {/* Left Panel */}
      <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] h-screen overflow-auto hide-scrollbar'>
        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-10'>

              {/* Resume Score */}

              <ImpResumeScore
                score={checkATSData?.ATS_Score}
                loading={atsLoading}
                guide={checkATSData?.Improvment_Guide}
              />

              {/* Personal Details */}
              <ImpPersonalDetails register={register} watch={watch} selectedTemplate={selectedTemplate} setValue={setValue} />

              {/* Dynamic Sections */}
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`
                      mb-[4px] transition-all duration-200 bg-white rounded-xl section-item
                      ${draggedIndex === index
                        ? "opacity-20 border-cyan-500 scale-95"
                        : "opacity-100 border-gray-200 shadow-sm hover:shadow-md hover:border-cyan-300"
                      }`}
                  >
                    <div
                      className={`
                      acco_section
                      transition-all duration-300 ease-in-out
                      ${deletingSectionIndex === index
                          ? "!bg-red-400 !-translate-x-6 !opacity-0"
                          : "!bg-white !opacity-100 !translate-x-0"}
                      `}
                    >
                      <Accordion flush={true}>
                        <AccordionPanel>
                          <AccordionTitle className="group font-bold text-xl flex items-center justify-between">
                            <div className="flex items-center gap-2 flex-1">

                              <span
                                className="drag-wrapper cursor-grab active:cursor-grabbing"
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnd={handleDragEnd}
                              >
                                <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                              </span>

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
                              <ImpSummary watch={watch} setValue={setValue} sections={sections} setSections={setSections} sectionIndex={index}/>
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
                              />
                            )}
                            {section.type === "core_competencies" && (
                              <ImpCoreCompetencies
                                section={section}
                                sectionIndex={index}
                                handleUpdate={handleCoreCompetencyUpdate}
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
                ))}
                <AddSectionButton onAddNewSection={handleAddNewSection} />
              </div>
            </div>
          </form>
        ) : (
          <div>
            <CustomizeSection
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              themeColor={themeColor}
              setThemeColor={setThemeColor}
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
        <div className='h-screen overflow-y-scroll'>
          <div ref={componentRef}>
            <ActiveResume formData={formValues} sections={sections} themeColor={themeColor} setValue={setValue} resumeSettings={resumeSettings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;