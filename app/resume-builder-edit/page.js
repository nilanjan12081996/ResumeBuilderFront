'use client';
import { DndContext, closestCenter, TouchSensor, MouseSensor, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableSection } from './SortableSection';

import React, { useEffect, useRef, useState, useMemo } from 'react';

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

import { FaLanguage, FaPen, FaUser, FaCamera } from "react-icons/fa6";
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
import SimpleCustomSectionEdit from './SimpleCustomSectionEdit';
import AdvancedCustomSectionEdit from './AdvancedCustomSectionEdit';
import CustomizeSection from '../ui/CustomizeSection';
import ImageCropModal from '../ui/ImageCropModal';
import { useTabs } from '../context/TabsContext';
import CleanTemplate from '../TemplateNew/CleanTemplate';
import ClearTemplate from '../TemplateNew/ClearTemplate';
import VividTemplate from '../TemplateNew/VividTemplate';
import Professional from '../TemplateNew/Professional';
import PrimeATS from '../TemplateNew/PrimeATS';
import CorporateTemplate from '../TemplateNew/CorporateTemplate';
import { getSingleResume, saveResumeNew } from '../reducers/ResumeSlice';
import isEqual from 'lodash.isequal';
import { defaultResumeSettings } from "../config/defaultResumeSettings";



const page = () => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const { loading, singleResumeInfo } = useSelector((state) => state?.resume)
  const { profileData } = useSelector((state) => state?.profile)
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const resume_id = searchParams.get('id')
  const resume_type = searchParams.get('fetch')
  console.log("resume_id", resume_id);
  console.log("resume_type", resume_type);
  const templateTextSettings = useRef({});
  const user_id = localStorage.getItem('user_id')
  const parseUserId = JSON.parse(user_id)
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

  // const handleSelectTemplate = (id) => {
  //   setSelectedTemplate(id);
  //   const color =
  //     defaultResumeSettings.theme.templateColors[id.toLowerCase()] ||
  //     defaultResumeSettings.theme.defaultColor;

  //   setThemeColor(color);
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



  const ActiveResume = templateMap[selectedTemplate] || Professional;
  const componentRef = useRef();
  const dispatch = useDispatch()
  console.log("profileData", profileData);
  const [empHistory, setEmpHistory] = useState([{ id: 1 }])
  const [education, setEducation] = useState([{ id: 1 }])
  const [newskill, setNewSkill] = useState([{ id: 1 }])
  const [sectionOrder, setSectionOrder] = useState([
    'summary', 'employment', 'education', 'skills', 'courses', 'hobbies', 'activities', 'languages', 'internships'
  ]);

  // Auto-Save State
  const [resumeIds, setResumeIds] = useState({ mongo_id: null, mysql_id: null });
  const [savingStatus, setSavingStatus] = useState('unsaved');
  const lastSavedData = useRef(null);

  // ── NEW: Profile crop states ──
  const [profileCropSrc, setProfileCropSrc] = useState(null);
  const [profileError, setProfileError] = useState("");

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

  // ── NEW: watch profileImage from form directly ──
  const profileImage = watch("profileImage");

  // Track which optional sections are active
  const [activeSections, setActiveSections] = useState([]);
  const [deletingSectionId, setDeletingSectionId] = useState(null);

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

  // ✅ Dynamic Simple Custom Sections - Create field arrays dynamically
  const simpleCustomSections = useMemo(() => {
    const sections = {};
    activeSections
      .filter(id => typeof id === 'string' && id.startsWith('custom_simple_'))
      .forEach(sectionId => {
        const historyFieldName = `customSimpleHistory_${sectionId}`;
        // We can't use useFieldArray inside forEach, so we'll handle this differently
      });
    return sections;
  }, [activeSections]);

  // ✅ Dynamic Advanced Custom Sections - Create field arrays dynamically
  const advancedCustomSections = useMemo(() => {
    const sections = {};
    activeSections
      .filter(id => typeof id === 'string' && id.startsWith('custom_advanced_'))
      .forEach(sectionId => {
        const historyFieldName = `customAdvancedHistory_${sectionId}`;
        // We can't use useFieldArray inside forEach, so we'll handle this differently
      });
    return sections;
  }, [activeSections]);

  const onSubmit = (data) => {
    setSavingStatus('saving');

    const dataToSave = {
      ...data,
      resumeSettings,
      activeSections: activeSections,
      sectionOrder: sectionOrder,
      resume_type: resume_type || "scratch",
      mongo_id: resumeIds.mongo_id,
      mysql_id: resumeIds.mysql_id
    };

    dispatch(saveResumeNew(dataToSave)).then((res) => {
      if (res.payload && res.payload.status_code === 200) {
        setSavingStatus('saved');
        lastSavedData.current = JSON.parse(JSON.stringify(dataToSave));
        toast.success("Resume saved successfully!");
      } else {
        setSavingStatus('error');
        toast.error("Failed to save resume.");
      }
    });
  };

  const formValues = watch();

  // ── UPDATED: Profile image handlers with crop + 1MB validation ──
  const handleImageChange = (e) => {
    setProfileError("");
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setProfileError("Only JPG, JPEG, PNG formats are supported.");
      e.target.value = "";
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      setProfileError("File size must be under 1MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setProfileCropSrc(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleDeleteImage = () => {
    setValue("profileImage", "");
    setProfileError("");
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
      if (resumeData.resumeSettings) {
        setResumeSettings(resumeData.resumeSettings);
        const savedTemplate = resumeData.resumeSettings.theme?.template;
        if (savedTemplate) {
          setSelectedTemplate(savedTemplate);
          const color =
            defaultResumeSettings.theme.templateColors[savedTemplate.toLowerCase()] ||
            defaultResumeSettings.theme.defaultColor;
          setThemeColor(color);
        }
      }
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

      // Show additional details section if relevant fields exist
      if (resumeData.postal_code || resumeData.driving_licence || resumeData.dob || resumeData.birth_place || resumeData.nationality) {
        setShowAdditionalDetails(true);
      }

      // Set IDs for Auto-Save
      if (resumeData._id || resumeData.mongo_id || resumeData.id || resumeData.mysql_id) {
        setResumeIds({
          mongo_id: resumeData.mongo_id || resumeData._id,
          mysql_id: resumeData.mysql_id || resumeData.id
        });
        setSavingStatus('saved');
      }

      // ✅ Prioritize saved activeSections over auto-detection
      if (resumeData.activeSections && Array.isArray(resumeData.activeSections) && resumeData.activeSections.length > 0) {
        console.log("✅ Loading saved activeSections:", resumeData.activeSections);
        setActiveSections(resumeData.activeSections);

        lastSavedData.current = {
          ...resumeData,
          activeSections: resumeData.activeSections,
          sectionOrder: resumeData.sectionOrder || sectionOrder
        };
      } else {
        // ✅ Only auto-detect if activeSections is NOT saved in database
        console.log("⚠️ No saved activeSections, auto-detecting from data");
        const newActiveSections = [];

        if (resumeData.employmentHistory && resumeData.employmentHistory.length > 0 && resumeData.employmentHistory.some(e => e.job_title || e.employer)) {
          newActiveSections.push('employment');
        }
        if (resumeData.educationHistory && resumeData.educationHistory.length > 0 && resumeData.educationHistory.some(e => e.school || e.degree)) {
          newActiveSections.push('education');
        }
        if (resumeData.newSkillHistory && resumeData.newSkillHistory.length > 0 && resumeData.newSkillHistory.some(s => s.skill)) {
          newActiveSections.push('skills');
        }
        if (resumeData.coursesHistory && resumeData.coursesHistory.length > 0 && resumeData.coursesHistory.some(c => c.course || c.institution)) {
          newActiveSections.push('courses');
        }
        if (resumeData.activityHistory && resumeData.activityHistory.length > 0 && resumeData.activityHistory.some(a => a.functionTitle || a.employer)) {
          newActiveSections.push('activities');
        }
        if (resumeData.languageHistory && resumeData.languageHistory.length > 0 && resumeData.languageHistory.some(l => l.language)) {
          newActiveSections.push('languages');
        }
        if (resumeData.internshipHistory && resumeData.internshipHistory.length > 0 && resumeData.internshipHistory.some(i => i.jobTitle || i.employer)) {
          newActiveSections.push('internships');
        }
        if (resumeData.hobbies && resumeData.hobbies.trim() !== "") {
          newActiveSections.push('hobbies');
        }
        if (resumeData.summary && resumeData.summary.trim() !== "") {
          newActiveSections.push('summary');
        }

        setActiveSections(newActiveSections);

        lastSavedData.current = {
          ...resumeData,
          activeSections: newActiveSections,
          sectionOrder: resumeData.sectionOrder || sectionOrder
        };
      }

      // Load saved sectionOrder
      if (resumeData.sectionOrder && Array.isArray(resumeData.sectionOrder) && resumeData.sectionOrder.length > 0) {
        console.log("✅ Loading saved sectionOrder:", resumeData.sectionOrder);
        setSectionOrder(resumeData.sectionOrder);
      }

      // ✅ Load Simple Custom Sections
      const simpleCustomKeys = Object.keys(resumeData).filter(key =>
        key.startsWith('customSimpleHistory_custom_simple_')
      );

      if (simpleCustomKeys.length > 0) {
        simpleCustomKeys.forEach(dynamicKey => {
          const sectionId = dynamicKey.replace('customSimpleHistory_', '');
          const titleKey = `customSimpleTitle_${sectionId}`;
          const hideLevelKey = `customSimpleHideLevel_${sectionId}`;

          const sectionData = resumeData[dynamicKey];
          const sectionTitle = resumeData[titleKey];
          const hideLevel = resumeData[hideLevelKey];

          if (sectionData && sectionData.length > 0) {
            setValue(dynamicKey, sectionData);
            if (sectionTitle) setValue(titleKey, sectionTitle);
            if (hideLevel !== undefined) setValue(hideLevelKey, hideLevel);

            setActiveSections(prev => {
              if (!prev.includes(sectionId)) {
                return [...prev, sectionId];
              }
              return prev;
            });

            setSectionOrder(prev => {
              if (!prev.includes(sectionId)) {
                return [...prev, sectionId];
              }
              return prev;
            });
          }
        });
      }

      // ✅ Load Advanced Custom Sections
      const advancedCustomKeys = Object.keys(resumeData).filter(key =>
        key.startsWith('customAdvancedHistory_custom_advanced_')
      );

      if (advancedCustomKeys.length > 0) {
        advancedCustomKeys.forEach(dynamicKey => {
          const sectionId = dynamicKey.replace('customAdvancedHistory_', '');
          const titleKey = `customAdvancedTitle_${sectionId}`;

          const sectionData = resumeData[dynamicKey];
          const sectionTitle = resumeData[titleKey];

          if (sectionData && sectionData.length > 0) {
            setValue(dynamicKey, sectionData);
            if (sectionTitle) setValue(titleKey, sectionTitle);

            setActiveSections(prev => {
              if (!prev.includes(sectionId)) {
                return [...prev, sectionId];
              }
              return prev;
            });

            setSectionOrder(prev => {
              if (!prev.includes(sectionId)) {
                return [...prev, sectionId];
              }
              return prev;
            });
          }
        });
      }
    }
  }, [singleResumeInfo, reset, setValue]);

  // --- Auto-Save Effect ---

  useEffect(() => {
    const currentDataNormalized = JSON.parse(JSON.stringify({
      ...formValues,
      resumeSettings,
    }));

    if (lastSavedData.current && isEqual(currentDataNormalized, lastSavedData.current)) {
      return;
    }

    setSavingStatus('saving');
    const timeoutId = setTimeout(() => {
      const currentData = JSON.parse(JSON.stringify({
        ...formValues,
        resumeSettings,
      }));

      const dataToSave = {
        ...currentData,
        activeSections: activeSections,
        sectionOrder: sectionOrder,
        resume_type: resume_type || "scratch",
        mongo_id: resumeIds.mongo_id,
        mysql_id: resumeIds.mysql_id
      };

      dispatch(saveResumeNew(dataToSave)).then((res) => {
        if (res.payload && res.payload.status_code === 200) {
          setSavingStatus('saved');
          lastSavedData.current = currentData;

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
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formValues, resumeSettings, activeSections, sectionOrder, resumeIds, resume_type, dispatch]);


  useEffect(() => {
    if (savingStatus === 'saved') {
      const timer = setTimeout(() => {
        setSavingStatus('unsaved');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [savingStatus]);

  const handleAddNewSection = (sectionData) => {
    const timestamp = Date.now();

    if (sectionData.id === 'custom_simple') {
      // ✅ Simple custom section with smart auto-incrementing name
      const newSectionId = `custom_simple_${timestamp}`;

      // Get all existing simple custom section titles
      const existingTitles = activeSections
        .filter(id => typeof id === 'string' && id.startsWith('custom_simple_'))
        .map(id => {
          const titleKey = `customSimpleTitle_${id}`;
          return watch(titleKey) || "";
        })
        .filter(title => title.trim() !== "");

      // Generate unique title
      let defaultTitle = "Custom Section (Simple)";
      let counter = 1;

      // Check if base title exists
      while (existingTitles.includes(defaultTitle)) {
        defaultTitle = `Custom Section (Simple) ${counter}`;
        counter++;
      }

      setActiveSections((prev) => [...prev, newSectionId]);
      setSectionOrder((prev) => [...prev, newSectionId]);

      // Initialize with default data
      setValue(`customSimpleHistory_${newSectionId}`, [{
        name: "",
        level: 2
      }]);
      setValue(`customSimpleTitle_${newSectionId}`, defaultTitle);
      setValue(`customSimpleHideLevel_${newSectionId}`, true);

    } else if (sectionData.id === 'custom_advanced') {
      // ✅ Advanced custom section with smart auto-incrementing name
      const newSectionId = `custom_advanced_${timestamp}`;

      // Get all existing advanced custom section titles
      const existingTitles = activeSections
        .filter(id => typeof id === 'string' && id.startsWith('custom_advanced_'))
        .map(id => {
          const titleKey = `customAdvancedTitle_${id}`;
          return watch(titleKey) || "";
        })
        .filter(title => title.trim() !== "");

      // Generate unique title
      let defaultTitle = "Custom Section (Advanced)";
      let counter = 1;

      // Check if base title exists
      while (existingTitles.includes(defaultTitle)) {
        defaultTitle = `Custom Section (Advanced) ${counter}`;
        counter++;
      }

      setActiveSections((prev) => [...prev, newSectionId]);
      setSectionOrder((prev) => [...prev, newSectionId]);

      // Initialize with default data
      setValue(`customAdvancedHistory_${newSectionId}`, [{
        title: "",
        city: "",
        startDate: "",
        endDate: "",
        description: "",
        isOngoing: false
      }]);
      setValue(`customAdvancedTitle_${newSectionId}`, defaultTitle);

    } else {
      // Existing sections
      if (!activeSections.includes(sectionData.id)) {
        setActiveSections((prev) => [...prev, sectionData.id]);
        setSectionOrder((prev) => {
          if (!prev.includes(sectionData.id)) {
            return [...prev, sectionData.id];
          }
          return prev;
        });
        if (sectionData.id === 'summary' && !watch('summary')) {
          setValue('summary', '');
        }
      }
    }
  };

  const handleAnimatedDeleteSection = (sectionId) => {
    setDeletingSectionId(sectionId);

    setTimeout(() => {
      const newActiveSections = activeSections.filter(s => s !== sectionId);
      const newSectionOrder = sectionOrder.filter(s => s !== sectionId);

      setActiveSections(newActiveSections);
      setSectionOrder(newSectionOrder);
      setDeletingSectionId(null);

      const updatedFormValues = { ...formValues };

      // ✅ Clean up Simple Custom Section
      if (typeof sectionId === 'string' && sectionId.startsWith('custom_simple_')) {
        const historyKey = `customSimpleHistory_${sectionId}`;
        const titleKey = `customSimpleTitle_${sectionId}`;
        const hideLevelKey = `customSimpleHideLevel_${sectionId}`;

        delete updatedFormValues[historyKey];
        delete updatedFormValues[titleKey];
        delete updatedFormValues[hideLevelKey];

        setValue(historyKey, undefined);
        setValue(titleKey, undefined);
        setValue(hideLevelKey, undefined);

        methods.unregister(historyKey);
        methods.unregister(titleKey);
        methods.unregister(hideLevelKey);
      }
      // ✅ Clean up Advanced Custom Section
      else if (typeof sectionId === 'string' && sectionId.startsWith('custom_advanced_')) {
        const historyKey = `customAdvancedHistory_${sectionId}`;
        const titleKey = `customAdvancedTitle_${sectionId}`;

        delete updatedFormValues[historyKey];
        delete updatedFormValues[titleKey];

        setValue(historyKey, undefined);
        setValue(titleKey, undefined);

        methods.unregister(historyKey);
        methods.unregister(titleKey);
      }
      // Core sections cleanup
      else if (sectionId === 'summary') {
        setValue('summary', '');
        setValue('summarySectionTitle', '');
        updatedFormValues.summary = '';
        updatedFormValues.summarySectionTitle = '';
      } else if (sectionId === 'employment') {
        setValue('employmentHistory', []);
        setValue('employmentSectionTitle', '');
        updatedFormValues.employmentHistory = [];
        updatedFormValues.employmentSectionTitle = '';
      } else if (sectionId === 'education') {
        setValue('educationHistory', []);
        setValue('educationSectionTitle', '');
        updatedFormValues.educationHistory = [];
        updatedFormValues.educationSectionTitle = '';
      } else if (sectionId === 'skills') {
        setValue('newSkillHistory', []);
        setValue('skillSectionTitle', '');
        updatedFormValues.newSkillHistory = [];
        updatedFormValues.skillSectionTitle = '';
      } else if (sectionId === 'courses') {
        setValue('coursesHistory', []);
        setValue('coursesSectionTitle', '');
        updatedFormValues.coursesHistory = [];
        updatedFormValues.coursesSectionTitle = '';
      } else if (sectionId === 'hobbies') {
        setValue('hobbies', '');
        setValue('hobbiesSectionTitle', '');
        updatedFormValues.hobbies = '';
        updatedFormValues.hobbiesSectionTitle = '';
      } else if (sectionId === 'activities') {
        setValue('activityHistory', []);
        setValue('activitiesSectionTitle', '');
        updatedFormValues.activityHistory = [];
        updatedFormValues.activitiesSectionTitle = '';
      } else if (sectionId === 'languages') {
        setValue('languageHistory', []);
        setValue('languagesSectionTitle', '');
        updatedFormValues.languageHistory = [];
        updatedFormValues.languagesSectionTitle = '';
      } else if (sectionId === 'internships') {
        setValue('internshipHistory', []);
        setValue('internshipsSectionTitle', '');
        updatedFormValues.internshipHistory = [];
        updatedFormValues.internshipsSectionTitle = '';
      }

      // Save to database
      const dataToSave = {
        ...updatedFormValues,
        activeSections: newActiveSections,
        sectionOrder: newSectionOrder,
        resume_type: resume_type || "scratch",
        mongo_id: resumeIds.mongo_id,
        mysql_id: resumeIds.mysql_id
      };

      console.log("🔍 Deleting section, data to save:", dataToSave);

      setSavingStatus('saving');
      dispatch(saveResumeNew(dataToSave)).then((res) => {
        if (res.payload?.status_code === 200) {
          setSavingStatus('saved');
          lastSavedData.current = JSON.parse(JSON.stringify(dataToSave));
        } else {
          setSavingStatus('error');
        }
      });
    }, 300);
  };

  return (
    <div>

      {/* ── NEW: Profile Crop Modal ── */}
      {profileCropSrc && (
        <ImageCropModal
          imageSrc={profileCropSrc}
          aspectRatio={1}
          onSave={(base64) => {
            setValue("profileImage", base64);
            setProfileCropSrc(null);
          }}
          onCancel={() => setProfileCropSrc(null)}
        />
      )}

      <div className='resume_tab_scrach'></div>
      <div className='lg:flex gap-1'>
        <ToastContainer />
        <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] h-screen overflow-auto hide-scrollbar'>
          {activeTab === 'edit' ?
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div>
                  {/* <div className='bg-white rounded-sm p-5 mb-[4px]'>
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
                  </div> */}

                  <div>
                    <div className='bg-white p-5 rounded-lg'>
                      <div className='mb-4'>
                        <h2 className='text-xl font-bold text-black pb-1'>Personal details</h2>
                        <p className='text-sm text-[#808897] font-medium'>Users who added phone number and email received 64% more positive feedback from recruiters.</p>
                      </div>

                      <div className='acco_section'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-center">

                            {/* ── UPDATED: Profile Photo with Crop Modal ── */}
                            <div className="flex flex-col items-center justify-center w-full md:w-48 border border-gray-200 rounded-lg bg-gray-50 p-2">
                              <label htmlFor="profile-upload" className="cursor-pointer flex flex-col items-center gap-2 relative group">
                                <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden relative">
                                  {profileImage ? (
                                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                  ) : (
                                    <FaUser className="text-[30px] text-[#800080]" />
                                  )}
                                  <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
                                    <FaCamera className="text-white text-sm opacity-0 group-hover:opacity-100 transition" />
                                  </div>
                                </div>
                                <span className="text-sm font-medium text-[#800080] hover:underline">Upload photo</span>
                              </label>
                              {profileImage && (
                                <button type="button" onClick={handleDeleteImage} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 !bg-transparent">
                                  <MdDelete size={12} /> Remove
                                </button>
                              )}
                              <span className="text-[10px] text-gray-400 text-center leading-tight">
                                JPG, JPEG, PNG<br />Up to 1MB
                              </span>
                              {profileError && (
                                <p className="text-[10px] text-red-500 text-center leading-tight max-w-[110px]">
                                  {profileError}
                                </p>
                              )}
                              <input type="file" id="profile-upload" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleImageChange} />
                            </div>

                            <div className="flex-1">
                              <label className="block text-sm font-medium text-gray-700">Job Target</label>
                              <input type="text" placeholder="SENIOR SOFTWARE ENGINEER" className="mt-1 w-full rounded-lg" {...register("job_target")} />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" placeholder="First Name" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("first_name")} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" placeholder="Last Name" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("last_name")} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" placeholder="Email" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("email")} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" placeholder="Phone" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("phone")} />
                          </div>

                          <div>
                            <label className="block !text-sm !font-medium !text-gray-500">
                              LinkedIn URL
                            </label>
                            <input
                              type="text"
                              placeholder="linkedin.com/in/yourprofile"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("linkedin")}
                            />
                          </div>
                          <div>
                            <label className="block !text-sm !font-medium !text-gray-500">
                              GitHub
                            </label>
                            <input
                              type="text"
                              placeholder="github.com/username"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("github")}
                            />
                          </div>

                          <div>
                            <label className="block !text-sm !font-medium !text-gray-500">
                              Stack Overflow
                            </label>
                            <input
                              type="text"
                              placeholder="stackoverflow.com/users/your-id"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("stackoverflow")}
                            />
                          </div>

                          <div>
                            <label className="block !text-sm !font-medium !text-gray-500">
                              LeetCode
                            </label>
                            <input
                              type="text"
                              placeholder="leetcode.com/username"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                              {...register("leetcode")}
                            />
                          </div>


                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" placeholder="Enter your address" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("address")} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">City, State</label>
                            <input type="text" placeholder="City,State" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("city_state")} />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Country</label>
                            <input type="text" placeholder="India" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("country")} />
                          </div>
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
                              className="flex items-center gap-2 !text-sm !text-[#800080] hover:!text-[#b98ab9] font-medium transition-colors"
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
                        </div>
                      </div>
                    </div>

                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                      <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
                        {sectionOrder.map((sectionId) => {
                          if (!activeSections.includes(sectionId)) return null;

                          // ✅ Determine section type and title
                          let sectionTitle = "";
                          let isSimpleCustom = false;
                          let isAdvancedCustom = false;

                          if (typeof sectionId === 'string' && sectionId.startsWith('custom_simple_')) {
                            isSimpleCustom = true;
                            const titleKey = `customSimpleTitle_${sectionId}`;
                            sectionTitle = watch(titleKey) || "Custom Section";
                          } else if (typeof sectionId === 'string' && sectionId.startsWith('custom_advanced_')) {
                            isAdvancedCustom = true;
                            const titleKey = `customAdvancedTitle_${sectionId}`;
                            sectionTitle = watch(titleKey) || "Custom Section";
                          } else {
                            // Static section titles
                            sectionTitle =
                              sectionId === 'employment' ? (watch('employmentSectionTitle') || "Employment History") :
                                sectionId === 'education' ? (watch('educationSectionTitle') || "Education") :
                                  sectionId === 'skills' ? (watch('skillSectionTitle') || "Skills") :
                                    sectionId === 'summary' ? (watch('summarySectionTitle') || "Personal Summary") :
                                      sectionId === 'courses' ? (watch('coursesSectionTitle') || "Courses") :
                                        sectionId === 'hobbies' ? (watch('hobbiesSectionTitle') || "Hobbies") :
                                          sectionId === 'activities' ? (watch('activitiesSectionTitle') || "Extra-curricular Activities") :
                                            sectionId === 'languages' ? (watch('languagesSectionTitle') || "Languages") :
                                              sectionId === 'internships' ? (watch('internshipsSectionTitle') || "Internships") :
                                                "Section";
                          }

                          return (
                            <div className='acco_section' key={sectionId}>
                              <SortableSection
                                id={sectionId}
                                title={sectionTitle}
                                onTitleUpdate={(newTitle) => {
                                  if (sectionId.startsWith('custom_simple_')) {
                                    const titleKey = `customSimpleTitle_${sectionId}`;
                                    setValue(titleKey, newTitle);
                                  } else if (sectionId.startsWith('custom_advanced_')) {
                                    const titleKey = `customAdvancedTitle_${sectionId}`;
                                    setValue(titleKey, newTitle);
                                  } else if (sectionId === 'summary') {
                                    setValue('summarySectionTitle', newTitle);
                                  } else if (sectionId === 'employment') {
                                    setValue('employmentSectionTitle', newTitle);
                                  } else if (sectionId === 'education') {
                                    setValue('educationSectionTitle', newTitle);
                                  } else if (sectionId === 'skills') {
                                    setValue('skillSectionTitle', newTitle);
                                  } else if (sectionId === 'courses') {
                                    setValue('coursesSectionTitle', newTitle);
                                  } else if (sectionId === 'hobbies') {
                                    setValue('hobbiesSectionTitle', newTitle);
                                  } else if (sectionId === 'activities') {
                                    setValue('activitiesSectionTitle', newTitle);
                                  } else if (sectionId === 'languages') {
                                    setValue('languagesSectionTitle', newTitle);
                                  } else if (sectionId === 'internships') {
                                    setValue('internshipsSectionTitle', newTitle);
                                  }
                                }}
                                onDelete={() => handleAnimatedDeleteSection(sectionId)}
                                canDelete={true}
                              >
                                {sectionId === 'employment' && (
                                  <EmpHistoryEdit
                                    register={register}
                                    empHistory={empHistory}
                                    setEmpHistory={setEmpHistory}
                                    watch={watch}
                                    control={control}
                                    setValue={setValue}
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
                                    setValue={setValue}
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
                                    control={control}
                                    watch={watch}
                                    noHeader={true}
                                  />
                                )}
                                {sectionId === 'courses' && (
                                  <CoursesEdit
                                    register={register}
                                    watch={watch}
                                    control={control}
                                    setValue={setValue}
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
                                    setValue={setValue}
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
                                    setValue={setValue}
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
                                    setValue={setValue}
                                    fields={internshipFields}
                                    append={internshipAppend}
                                    remove={internshipRemove}
                                    move={internshipMove}
                                    noHeader={true}
                                  />
                                )}

                                {/* ✅ Simple Custom Section */}
                                {isSimpleCustom && (
                                  <DynamicSimpleCustomSection
                                    sectionId={sectionId}
                                    register={register}
                                    watch={watch}
                                    setValue={setValue}
                                    control={control}
                                    noHeader={true}
                                  />
                                )}

                                {/* ✅ Advanced Custom Section */}
                                {isAdvancedCustom && (
                                  <DynamicAdvancedCustomSection
                                    sectionId={sectionId}
                                    register={register}
                                    watch={watch}
                                    control={control}
                                    setValue={setValue}
                                    noHeader={true}
                                  />
                                )}
                              </SortableSection>
                            </div>
                          );
                        })}
                      </SortableContext>
                    </DndContext>

                    <AddSectionEdit
                      onAddNewSection={handleAddNewSection}
                      activeSections={activeSections}
                    />
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

        <div className='lg:w-6/12 bg-[#ffffff] px-0'>
          <div className='h-screen overflow-y-scroll hide-scrollbar'>
          
          <div ref={componentRef}>
            <ActiveResume formData={formValues} empHistory={empHistory} themeColor={themeColor} sectionOrder={sectionOrder} resumeSettings={resumeSettings} />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ✅ Wrapper component for Simple Custom Section with dynamic useFieldArray
const DynamicSimpleCustomSection = ({ sectionId, register, watch, setValue, control, noHeader }) => {
  const historyFieldName = `customSimpleHistory_${sectionId}`;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: historyFieldName,
  });

  return (
    <SimpleCustomSectionEdit
      sectionId={sectionId}
      register={register}
      watch={watch}
      setValue={setValue}
      control={control}
      fields={fields}
      append={append}
      remove={remove}
      move={move}
      noHeader={noHeader}
    />
  );
};

// ✅ Wrapper component for Advanced Custom Section with dynamic useFieldArray
const DynamicAdvancedCustomSection = ({ sectionId, register, watch, control, setValue, noHeader }) => {
  const historyFieldName = `customAdvancedHistory_${sectionId}`;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: historyFieldName,
  });

  return (
    <AdvancedCustomSectionEdit
      sectionId={sectionId}
      register={register}
      watch={watch}
      control={control}
      setValue={setValue}
      fields={fields}
      append={append}
      remove={remove}
      move={move}
      noHeader={noHeader}
    />
  );
};

export default page



// 'use client';
// import { DndContext, closestCenter, TouchSensor, MouseSensor, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
// import { SortableSection } from './SortableSection';

// import React, { useEffect, useRef, useState, useMemo } from 'react';

// import Image from 'next/image';

// import { HiClipboardList } from "react-icons/hi";
// import { MdPreview } from "react-icons/md";
// import { IoStatsChart } from "react-icons/io5";
// import { IoMdDownload } from "react-icons/io";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { AiFillSave } from "react-icons/ai";

// import { BiSolidUser } from "react-icons/bi";
// import { BiSolidBriefcase } from "react-icons/bi";
// import { FaGlobe } from "react-icons/fa";
// import { BiLogoLinkedinSquare } from "react-icons/bi";
// import { BsGithub } from "react-icons/bs";
// import { MdEmail } from "react-icons/md";
// import { FaLocationDot } from "react-icons/fa6";
// import { BiSolidPhone } from "react-icons/bi";

// import { HiAcademicCap } from "react-icons/hi2";

// import { FaLanguage, FaPen, FaUser } from "react-icons/fa6";
// import { MdSettingsSuggest } from "react-icons/md";
// import { FaDiagramProject } from "react-icons/fa6";
// import { FaCertificate } from "react-icons/fa";
// import { FaTrophy } from "react-icons/fa6";

// import { BiSolidBank } from "react-icons/bi";

// import { BsFillPlusCircleFill } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";

// import { FaTags } from "react-icons/fa";
// import { BiSolidBuilding } from "react-icons/bi";

// import { BiWorld } from "react-icons/bi";

// import { BsFillPersonVcardFill } from "react-icons/bs";
// import { BiCodeAlt } from "react-icons/bi";

// import { BiLink } from "react-icons/bi";

// import resume_sections_view from "../assets/imagesource/resume_sections_view.png";
// import resume_score2 from "../assets/imagesource/resume_score2.png";
// import resume_score from "../assets/imagesource/resume_score.png";

// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select, Toast, Progress, Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
// import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import Template1 from '../temp/Template1';
// import { useSearchParams } from 'next/navigation';
// import Template2 from '../temp/Template2';
// import { toast, ToastContainer } from 'react-toastify';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import EmpHistoryEdit from './EmpHistoryEdit';
// import EducationNewEdit from './EducationNewEdit';
// import SkillsNewEdit from './SkillsNewEdit';
// import PersonalSummaryEdit from './PersonalSummaryEdit';
// import AddSectionEdit from './AddSectionEdit';
// import CoursesEdit from './CoursesEdit';
// import HobbiesEdit from './HobbiesEdit';
// import ActivitiesEdit from './ActivitiesEdit';
// import LanguagesEdit from './newLanguageEdit';
// import InternshipsEdit from './InternshipsEdit';
// import CustomSectionEdit from './CustomSectionEdit';
// import SimpleCustomSectionEdit from './SimpleCustomSectionEdit';
// import AdvancedCustomSectionEdit from './AdvancedCustomSectionEdit';
// import CustomizeSection from '../ui/CustomizeSection';
// import { useTabs } from '../context/TabsContext';
// import CleanTemplate from '../TemplateNew/CleanTemplate';
// import ClearTemplate from '../TemplateNew/ClearTemplate';
// import VividTemplate from '../TemplateNew/VividTemplate';
// import Professional from '../TemplateNew/Professional';
// import PrimeATS from '../TemplateNew/PrimeATS';
// import CorporateTemplate from '../TemplateNew/CorporateTemplate';
// import { getSingleResume, saveResumeNew } from '../reducers/ResumeSlice';
// import isEqual from 'lodash.isequal';
// import { defaultResumeSettings } from "../config/defaultResumeSettings";



// const page = () => {
//   const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
//   const { loading, singleResumeInfo } = useSelector((state) => state?.resume)
//   const { profileData } = useSelector((state) => state?.profile)
//   const searchParams = useSearchParams();
//   console.log("searchParams", searchParams);
//   const resume_id = searchParams.get('id')
//   const resume_type = searchParams.get('fetch')
//   console.log("resume_id", resume_id);
//   console.log("resume_type", resume_type);
//   const templateTextSettings = useRef({});
//   const user_id = localStorage.getItem('user_id')
//   const parseUserId = JSON.parse(user_id)
//   const [selectedTemplate, setSelectedTemplate] = useState('ats');
//   const [resumeSettings, setResumeSettings] = useState(defaultResumeSettings);
//   const templateMap = {
//     professional: Professional,
//     ats: PrimeATS,
//     clean: CleanTemplate,
//     clear: ClearTemplate,
//     vivid: VividTemplate,
//     corporate: CorporateTemplate,
//   };
//   const [themeColor, setThemeColor] = useState(
//     defaultResumeSettings.theme.defaultColor
//   );

//   // const handleSelectTemplate = (id) => {
//   //   setSelectedTemplate(id);
//   //   const color =
//   //     defaultResumeSettings.theme.templateColors[id.toLowerCase()] ||
//   //     defaultResumeSettings.theme.defaultColor;

//   //   setThemeColor(color);
//   // };

//   const handleSelectTemplate = (id) => {
//     const templateKey = id.toLowerCase();

//     const currentTemplate = resumeSettings.theme?.template;
//     if (currentTemplate) {
//       templateTextSettings.current[currentTemplate] = { ...resumeSettings.text };
//     }

//     setSelectedTemplate(id);

//     const color =
//       defaultResumeSettings.theme.templateColors[templateKey] ||
//       defaultResumeSettings.theme.defaultColor;
//     setThemeColor(color);

//     const savedTextForTemplate = templateTextSettings.current[templateKey];
//     const textOverrides = defaultResumeSettings.templateTextOverrides?.[templateKey] || {};

//     const newText = savedTextForTemplate
//       ? savedTextForTemplate
//       : { ...defaultResumeSettings.text, ...textOverrides };

//     setResumeSettings(prev => ({
//       ...prev,
//       theme: { ...prev.theme, template: id },
//       text: newText,
//     }));
//   };



//   const ActiveResume = templateMap[selectedTemplate] || Professional;
//   const componentRef = useRef();
//   const dispatch = useDispatch()
//   console.log("profileData", profileData);
//   const [empHistory, setEmpHistory] = useState([{ id: 1 }])
//   const [education, setEducation] = useState([{ id: 1 }])
//   const [newskill, setNewSkill] = useState([{ id: 1 }])
//   const [sectionOrder, setSectionOrder] = useState([
//     'summary', 'employment', 'education', 'skills', 'courses', 'hobbies', 'activities', 'languages', 'internships'
//   ]);

//   // Auto-Save State
//   const [resumeIds, setResumeIds] = useState({ mongo_id: null, mysql_id: null });
//   const [savingStatus, setSavingStatus] = useState('unsaved');
//   const lastSavedData = useRef(null);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       setSectionOrder((items) => {
//         const oldIndex = items.indexOf(active.id);
//         const newIndex = items.indexOf(over.id);
//         return arrayMove(items, oldIndex, newIndex);
//       });
//     }
//   };

//   const methods = useForm({
//     mode: "onChange",
//     defaultValues: {
//       employmentHistory: [{}],
//       educationHistory: [{}],
//       newSkillHistory: [{}],
//       coursesHistory: [{}],
//       activityHistory: [{}],
//       languageHistory: [{}],
//       internshipHistory: [{}],
//       profileImage: "",
//       hobbies: ""
//     }
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     control,
//     formState: { errors },
//   } = methods;

//   // Track which optional sections are active
//   const [activeSections, setActiveSections] = useState([]);
//   const [deletingSectionId, setDeletingSectionId] = useState(null);

//   // Employment History Field Array
//   const { fields: empFields, append: empAppend, remove: empRemove, move: empMove } = useFieldArray({
//     control,
//     name: "employmentHistory",
//   });

//   // Education History Field Array
//   const { fields: eduFields, append: eduAppend, remove: eduRemove, move: eduMove } = useFieldArray({
//     control,
//     name: "educationHistory",
//   });

//   // Skills Field Array
//   const { fields: skillFields, append: skillAppend, remove: skillRemove, move: skillMove } = useFieldArray({
//     control,
//     name: "newSkillHistory",
//   });

//   // Courses Field Array
//   const { fields: coursesFields, append: coursesAppend, remove: coursesRemove, move: coursesMove } = useFieldArray({
//     control,
//     name: "coursesHistory",
//   });

//   // Activities Field Array
//   const { fields: activitiesFields, append: activitiesAppend, remove: activitiesRemove, move: activitiesMove } = useFieldArray({
//     control,
//     name: "activityHistory",
//   });

//   // Languages Field Array
//   const { fields: languageFields, append: languageAppend, remove: languageRemove, move: languageMove } = useFieldArray({
//     control,
//     name: "languageHistory",
//   });

//   // Internships Field Array
//   const { fields: internshipFields, append: internshipAppend, remove: internshipRemove, move: internshipMove } = useFieldArray({
//     control,
//     name: "internshipHistory",
//   });

//   // ✅ Dynamic Simple Custom Sections - Create field arrays dynamically
//   const simpleCustomSections = useMemo(() => {
//     const sections = {};
//     activeSections
//       .filter(id => typeof id === 'string' && id.startsWith('custom_simple_'))
//       .forEach(sectionId => {
//         const historyFieldName = `customSimpleHistory_${sectionId}`;
//         // We can't use useFieldArray inside forEach, so we'll handle this differently
//       });
//     return sections;
//   }, [activeSections]);

//   // ✅ Dynamic Advanced Custom Sections - Create field arrays dynamically
//   const advancedCustomSections = useMemo(() => {
//     const sections = {};
//     activeSections
//       .filter(id => typeof id === 'string' && id.startsWith('custom_advanced_'))
//       .forEach(sectionId => {
//         const historyFieldName = `customAdvancedHistory_${sectionId}`;
//         // We can't use useFieldArray inside forEach, so we'll handle this differently
//       });
//     return sections;
//   }, [activeSections]);

//   const onSubmit = (data) => {
//     console.log("Manual Save / Final data:", data);
//     setSavingStatus('saving');

//     const dataToSave = {
//       ...data,
//       activeSections: activeSections,
//       sectionOrder: sectionOrder,
//       resume_type: resume_type || "scratch",
//       mongo_id: resumeIds.mongo_id,
//       mysql_id: resumeIds.mysql_id
//     };

//     dispatch(saveResumeNew(dataToSave)).then((res) => {
//       if (res.payload && res.payload.status_code === 200) {
//         setSavingStatus('saved');
//         lastSavedData.current = JSON.parse(JSON.stringify(dataToSave));
//         toast.success("Resume saved successfully!");
//       } else {
//         setSavingStatus('error');
//         toast.error("Failed to save resume.");
//       }
//     });
//   };

//   const formValues = watch();

//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result);
//         setValue("profileImage", reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDeleteImage = () => {
//     setSelectedImage(null);
//     setValue("profileImage", "");
//   };

//   const { activeTab } = useTabs();

//   useEffect(() => {
//     dispatch(getSingleResume({
//       id: resume_id,
//       fetch: resume_type
//     }))
//   }, [resume_id, resume_type])

//   console.log("singleResumeInfo", singleResumeInfo);

//   useEffect(() => {
//     if (singleResumeInfo?.data?.data) {
//       const resumeData = singleResumeInfo.data.data;
//       reset(resumeData);

//       // Update local states for accordion lists
//       if (resumeData.employmentHistory?.length > 0) {
//         setEmpHistory(resumeData.employmentHistory.map((_, i) => ({ id: i + 1 })));
//       }
//       if (resumeData.educationHistory?.length > 0) {
//         setEducation(resumeData.educationHistory.map((_, i) => ({ id: i + 1 })));
//       }
//       if (resumeData.newSkillHistory?.length > 0) {
//         setNewSkill(resumeData.newSkillHistory.map((_, i) => ({ id: i + 1 })));
//       }

//       // Update profile image preview
//       if (resumeData.profileImage) {
//         setSelectedImage(resumeData.profileImage);
//       }

//       // Show additional details section if relevant fields exist
//       if (resumeData.postal_code || resumeData.driving_licence || resumeData.dob || resumeData.birth_place || resumeData.nationality) {
//         setShowAdditionalDetails(true);
//       }

//       // Set IDs for Auto-Save
//       if (resumeData._id || resumeData.mongo_id || resumeData.id || resumeData.mysql_id) {
//         setResumeIds({
//           mongo_id: resumeData.mongo_id || resumeData._id,
//           mysql_id: resumeData.mysql_id || resumeData.id
//         });
//         setSavingStatus('saved');
//       }

//       // ✅ Prioritize saved activeSections over auto-detection
//       if (resumeData.activeSections && Array.isArray(resumeData.activeSections) && resumeData.activeSections.length > 0) {
//         console.log("✅ Loading saved activeSections:", resumeData.activeSections);
//         setActiveSections(resumeData.activeSections);

//         lastSavedData.current = {
//           ...resumeData,
//           activeSections: resumeData.activeSections,
//           sectionOrder: resumeData.sectionOrder || sectionOrder
//         };
//       } else {
//         // ✅ Only auto-detect if activeSections is NOT saved in database
//         console.log("⚠️ No saved activeSections, auto-detecting from data");
//         const newActiveSections = [];

//         if (resumeData.employmentHistory && resumeData.employmentHistory.length > 0 && resumeData.employmentHistory.some(e => e.job_title || e.employer)) {
//           newActiveSections.push('employment');
//         }
//         if (resumeData.educationHistory && resumeData.educationHistory.length > 0 && resumeData.educationHistory.some(e => e.school || e.degree)) {
//           newActiveSections.push('education');
//         }
//         if (resumeData.newSkillHistory && resumeData.newSkillHistory.length > 0 && resumeData.newSkillHistory.some(s => s.skill)) {
//           newActiveSections.push('skills');
//         }
//         if (resumeData.coursesHistory && resumeData.coursesHistory.length > 0 && resumeData.coursesHistory.some(c => c.course || c.institution)) {
//           newActiveSections.push('courses');
//         }
//         if (resumeData.activityHistory && resumeData.activityHistory.length > 0 && resumeData.activityHistory.some(a => a.functionTitle || a.employer)) {
//           newActiveSections.push('activities');
//         }
//         if (resumeData.languageHistory && resumeData.languageHistory.length > 0 && resumeData.languageHistory.some(l => l.language)) {
//           newActiveSections.push('languages');
//         }
//         if (resumeData.internshipHistory && resumeData.internshipHistory.length > 0 && resumeData.internshipHistory.some(i => i.jobTitle || i.employer)) {
//           newActiveSections.push('internships');
//         }
//         if (resumeData.hobbies && resumeData.hobbies.trim() !== "") {
//           newActiveSections.push('hobbies');
//         }
//         if (resumeData.summary && resumeData.summary.trim() !== "") {
//           newActiveSections.push('summary');
//         }

//         setActiveSections(newActiveSections);

//         lastSavedData.current = {
//           ...resumeData,
//           activeSections: newActiveSections,
//           sectionOrder: resumeData.sectionOrder || sectionOrder
//         };
//       }

//       // Load saved sectionOrder
//       if (resumeData.sectionOrder && Array.isArray(resumeData.sectionOrder) && resumeData.sectionOrder.length > 0) {
//         console.log("✅ Loading saved sectionOrder:", resumeData.sectionOrder);
//         setSectionOrder(resumeData.sectionOrder);
//       }

//       // ✅ Load Simple Custom Sections
//       const simpleCustomKeys = Object.keys(resumeData).filter(key =>
//         key.startsWith('customSimpleHistory_custom_simple_')
//       );

//       if (simpleCustomKeys.length > 0) {
//         simpleCustomKeys.forEach(dynamicKey => {
//           const sectionId = dynamicKey.replace('customSimpleHistory_', '');
//           const titleKey = `customSimpleTitle_${sectionId}`;
//           const hideLevelKey = `customSimpleHideLevel_${sectionId}`;

//           const sectionData = resumeData[dynamicKey];
//           const sectionTitle = resumeData[titleKey];
//           const hideLevel = resumeData[hideLevelKey];

//           if (sectionData && sectionData.length > 0) {
//             setValue(dynamicKey, sectionData);
//             if (sectionTitle) setValue(titleKey, sectionTitle);
//             if (hideLevel !== undefined) setValue(hideLevelKey, hideLevel);

//             setActiveSections(prev => {
//               if (!prev.includes(sectionId)) {
//                 return [...prev, sectionId];
//               }
//               return prev;
//             });

//             setSectionOrder(prev => {
//               if (!prev.includes(sectionId)) {
//                 return [...prev, sectionId];
//               }
//               return prev;
//             });
//           }
//         });
//       }

//       // ✅ Load Advanced Custom Sections
//       const advancedCustomKeys = Object.keys(resumeData).filter(key =>
//         key.startsWith('customAdvancedHistory_custom_advanced_')
//       );

//       if (advancedCustomKeys.length > 0) {
//         advancedCustomKeys.forEach(dynamicKey => {
//           const sectionId = dynamicKey.replace('customAdvancedHistory_', '');
//           const titleKey = `customAdvancedTitle_${sectionId}`;

//           const sectionData = resumeData[dynamicKey];
//           const sectionTitle = resumeData[titleKey];

//           if (sectionData && sectionData.length > 0) {
//             setValue(dynamicKey, sectionData);
//             if (sectionTitle) setValue(titleKey, sectionTitle);

//             setActiveSections(prev => {
//               if (!prev.includes(sectionId)) {
//                 return [...prev, sectionId];
//               }
//               return prev;
//             });

//             setSectionOrder(prev => {
//               if (!prev.includes(sectionId)) {
//                 return [...prev, sectionId];
//               }
//               return prev;
//             });
//           }
//         });
//       }
//     }
//   }, [singleResumeInfo, reset, setValue]);

//   // --- Auto-Save Effect ---
//   useEffect(() => {
//     const currentDataNormalized = JSON.parse(JSON.stringify(formValues));

//     if (lastSavedData.current && isEqual(currentDataNormalized, lastSavedData.current)) {
//       return;
//     }

//     setSavingStatus('saving');
//     const timeoutId = setTimeout(() => {
//       const currentData = JSON.parse(JSON.stringify(formValues));

//       const dataToSave = {
//         ...currentData,
//         activeSections: activeSections,
//         sectionOrder: sectionOrder,
//         resume_type: resume_type || "scratch",
//         mongo_id: resumeIds.mongo_id,
//         mysql_id: resumeIds.mysql_id
//       };

//       dispatch(saveResumeNew(dataToSave)).then((res) => {
//         if (res.payload && res.payload.status_code === 200) {
//           setSavingStatus('saved');
//           lastSavedData.current = currentData;

//           if (!resumeIds.mongo_id) {
//             const newMongoId = res.payload.sectionsdata?.mongo_id;
//             const newMysqlId = res.payload.sectionsdata?.mysql_id;
//             if (newMongoId && newMysqlId) {
//               setResumeIds({
//                 mongo_id: newMongoId,
//                 mysql_id: newMysqlId
//               });
//             }
//           }
//         } else {
//           console.error("Auto-save failed:", res);
//           setSavingStatus('error');
//         }
//       });
//     }, 2000);

//     return () => clearTimeout(timeoutId);
//   }, [formValues, activeSections, sectionOrder, resumeIds, resume_type, dispatch]);

//   useEffect(() => {
//     if (savingStatus === 'saved') {
//       const timer = setTimeout(() => {
//         setSavingStatus('unsaved');
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [savingStatus]);

//   const handleAddNewSection = (sectionData) => {
//     const timestamp = Date.now();

//     if (sectionData.id === 'custom_simple') {
//       // ✅ Simple custom section with smart auto-incrementing name
//       const newSectionId = `custom_simple_${timestamp}`;

//       // Get all existing simple custom section titles
//       const existingTitles = activeSections
//         .filter(id => typeof id === 'string' && id.startsWith('custom_simple_'))
//         .map(id => {
//           const titleKey = `customSimpleTitle_${id}`;
//           return watch(titleKey) || "";
//         })
//         .filter(title => title.trim() !== "");

//       // Generate unique title
//       let defaultTitle = "Custom Section (Simple)";
//       let counter = 1;

//       // Check if base title exists
//       while (existingTitles.includes(defaultTitle)) {
//         defaultTitle = `Custom Section (Simple) ${counter}`;
//         counter++;
//       }

//       setActiveSections((prev) => [...prev, newSectionId]);
//       setSectionOrder((prev) => [...prev, newSectionId]);

//       // Initialize with default data
//       setValue(`customSimpleHistory_${newSectionId}`, [{
//         name: "",
//         level: 2
//       }]);
//       setValue(`customSimpleTitle_${newSectionId}`, defaultTitle);
//       setValue(`customSimpleHideLevel_${newSectionId}`, true);

//     } else if (sectionData.id === 'custom_advanced') {
//       // ✅ Advanced custom section with smart auto-incrementing name
//       const newSectionId = `custom_advanced_${timestamp}`;

//       // Get all existing advanced custom section titles
//       const existingTitles = activeSections
//         .filter(id => typeof id === 'string' && id.startsWith('custom_advanced_'))
//         .map(id => {
//           const titleKey = `customAdvancedTitle_${id}`;
//           return watch(titleKey) || "";
//         })
//         .filter(title => title.trim() !== "");

//       // Generate unique title
//       let defaultTitle = "Custom Section (Advanced)";
//       let counter = 1;

//       // Check if base title exists
//       while (existingTitles.includes(defaultTitle)) {
//         defaultTitle = `Custom Section (Advanced) ${counter}`;
//         counter++;
//       }

//       setActiveSections((prev) => [...prev, newSectionId]);
//       setSectionOrder((prev) => [...prev, newSectionId]);

//       // Initialize with default data
//       setValue(`customAdvancedHistory_${newSectionId}`, [{
//         title: "",
//         city: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//         isOngoing: false
//       }]);
//       setValue(`customAdvancedTitle_${newSectionId}`, defaultTitle);

//     } else {
//       // Existing sections
//       if (!activeSections.includes(sectionData.id)) {
//         setActiveSections((prev) => [...prev, sectionData.id]);
//         setSectionOrder((prev) => {
//           if (!prev.includes(sectionData.id)) {
//             return [...prev, sectionData.id];
//           }
//           return prev;
//         });
//         if (sectionData.id === 'summary' && !watch('summary')) {
//           setValue('summary', '');
//         }
//       }
//     }
//   };

//   const handleAnimatedDeleteSection = (sectionId) => {
//     setDeletingSectionId(sectionId);

//     setTimeout(() => {
//       const newActiveSections = activeSections.filter(s => s !== sectionId);
//       const newSectionOrder = sectionOrder.filter(s => s !== sectionId);

//       setActiveSections(newActiveSections);
//       setSectionOrder(newSectionOrder);
//       setDeletingSectionId(null);

//       const updatedFormValues = { ...formValues };

//       // ✅ Clean up Simple Custom Section
//       if (typeof sectionId === 'string' && sectionId.startsWith('custom_simple_')) {
//         const historyKey = `customSimpleHistory_${sectionId}`;
//         const titleKey = `customSimpleTitle_${sectionId}`;
//         const hideLevelKey = `customSimpleHideLevel_${sectionId}`;

//         delete updatedFormValues[historyKey];
//         delete updatedFormValues[titleKey];
//         delete updatedFormValues[hideLevelKey];

//         setValue(historyKey, undefined);
//         setValue(titleKey, undefined);
//         setValue(hideLevelKey, undefined);

//         methods.unregister(historyKey);
//         methods.unregister(titleKey);
//         methods.unregister(hideLevelKey);
//       }
//       // ✅ Clean up Advanced Custom Section
//       else if (typeof sectionId === 'string' && sectionId.startsWith('custom_advanced_')) {
//         const historyKey = `customAdvancedHistory_${sectionId}`;
//         const titleKey = `customAdvancedTitle_${sectionId}`;

//         delete updatedFormValues[historyKey];
//         delete updatedFormValues[titleKey];

//         setValue(historyKey, undefined);
//         setValue(titleKey, undefined);

//         methods.unregister(historyKey);
//         methods.unregister(titleKey);
//       }
//       // Core sections cleanup
//       else if (sectionId === 'summary') {
//         setValue('summary', '');
//         setValue('summarySectionTitle', '');
//         updatedFormValues.summary = '';
//         updatedFormValues.summarySectionTitle = '';
//       } else if (sectionId === 'employment') {
//         setValue('employmentHistory', []);
//         setValue('employmentSectionTitle', '');
//         updatedFormValues.employmentHistory = [];
//         updatedFormValues.employmentSectionTitle = '';
//       } else if (sectionId === 'education') {
//         setValue('educationHistory', []);
//         setValue('educationSectionTitle', '');
//         updatedFormValues.educationHistory = [];
//         updatedFormValues.educationSectionTitle = '';
//       } else if (sectionId === 'skills') {
//         setValue('newSkillHistory', []);
//         setValue('skillSectionTitle', '');
//         updatedFormValues.newSkillHistory = [];
//         updatedFormValues.skillSectionTitle = '';
//       } else if (sectionId === 'courses') {
//         setValue('coursesHistory', []);
//         setValue('coursesSectionTitle', '');
//         updatedFormValues.coursesHistory = [];
//         updatedFormValues.coursesSectionTitle = '';
//       } else if (sectionId === 'hobbies') {
//         setValue('hobbies', '');
//         setValue('hobbiesSectionTitle', '');
//         updatedFormValues.hobbies = '';
//         updatedFormValues.hobbiesSectionTitle = '';
//       } else if (sectionId === 'activities') {
//         setValue('activityHistory', []);
//         setValue('activitiesSectionTitle', '');
//         updatedFormValues.activityHistory = [];
//         updatedFormValues.activitiesSectionTitle = '';
//       } else if (sectionId === 'languages') {
//         setValue('languageHistory', []);
//         setValue('languagesSectionTitle', '');
//         updatedFormValues.languageHistory = [];
//         updatedFormValues.languagesSectionTitle = '';
//       } else if (sectionId === 'internships') {
//         setValue('internshipHistory', []);
//         setValue('internshipsSectionTitle', '');
//         updatedFormValues.internshipHistory = [];
//         updatedFormValues.internshipsSectionTitle = '';
//       }

//       // Save to database
//       const dataToSave = {
//         ...updatedFormValues,
//         activeSections: newActiveSections,
//         sectionOrder: newSectionOrder,
//         resume_type: resume_type || "scratch",
//         mongo_id: resumeIds.mongo_id,
//         mysql_id: resumeIds.mysql_id
//       };

//       console.log("🔍 Deleting section, data to save:", dataToSave);

//       setSavingStatus('saving');
//       dispatch(saveResumeNew(dataToSave)).then((res) => {
//         if (res.payload?.status_code === 200) {
//           setSavingStatus('saved');
//           lastSavedData.current = JSON.parse(JSON.stringify(dataToSave));
//         } else {
//           setSavingStatus('error');
//         }
//       });
//     }, 300);
//   };

//   return (
//     <div>
//       <div className='resume_tab_scrach'></div>
//       <div className='lg:flex gap-1'>
//         <ToastContainer />
//         <div className='lg:w-6/12 bg-[#eff2f9] rounded-[8px] h-screen overflow-auto hide-scrollbar'>
//           {activeTab === 'edit' ?
//             <FormProvider {...methods}>
//               <form onSubmit={methods.handleSubmit(onSubmit)}>
//                 <div>
//                   <div className='bg-white rounded-sm p-5 mb-[4px]'>
//                     <div className='flex justify-between items-center'>
//                       <div className='flex items-center gap-2 mb-2'>
//                         <span className='bg-[#f6efff] rounded-[5px] px-2 py-1 text-[14px] text-[#800080] font-bold'>10%</span>
//                         <span className='text-[#828ba2] text-[14px] leading-[20px] font-normal'>Resume completeness</span>
//                       </div>
//                       <div className='flex items-center gap-2 mb-2'>
//                         <span className='bg-[#e7f4ed] rounded-[5px] px-2 py-1 text-[14px] text-[#477d62] font-bold'>+10%</span>
//                         <span className='text-[#828ba2] text-[14px] leading-[20px] font-normal'>Add job title</span>
//                       </div>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       <Progress progress={10} size="sm" />
//                     </div>
//                   </div>

//                   <div>
//                     <div className='bg-white p-5 rounded-lg'>
//                       <div className='mb-4'>
//                         <h2 className='text-xl font-bold text-black pb-1'>Personal details</h2>
//                         <p className='text-sm text-[#808897] font-medium'>Users who added phone number and email received 64% more positive feedback from recruiters.</p>
//                       </div>

//                       <div className='acco_section'>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
//                             <div className="flex flex-col items-center justify-center w-full md:w-48 border border-gray-200 rounded-lg bg-gray-50">
//                               <label htmlFor="profile-upload" className="cursor-pointer flex flex-col items-center gap-2">
//                                 <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden">
//                                   {selectedImage ? (
//                                     <img src={selectedImage} alt="Profile" className="w-full h-full object-cover" />
//                                   ) : (
//                                     <FaUser className="text-[30px] text-[#800080]" />
//                                   )}
//                                 </div>
//                                 <span className="text-sm font-medium text-[#800080] hover:underline">Upload photo</span>
//                               </label>
//                               {selectedImage && (
//                                 <button type="button" onClick={handleDeleteImage} className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
//                                   <MdDelete size={12} /> Remove
//                                 </button>
//                               )}
//                               <span className="text-[10px] text-gray-400">JPG / PNG • Max 2MB</span>
//                               <input type="file" id="profile-upload" accept="image/*" className="hidden" onChange={handleImageChange} />
//                             </div>
//                             <div className="flex-1">
//                               <label className="block text-sm font-medium text-gray-700">Job Target</label>
//                               <input type="text" placeholder="SENIOR SOFTWARE ENGINEER" className="mt-1 w-full rounded-lg" {...register("job_target")} />
//                             </div>
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700">First Name</label>
//                             <input type="text" placeholder="First Name" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("first_name")} />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700">Last Name</label>
//                             <input type="text" placeholder="Last Name" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("last_name")} />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700">Email</label>
//                             <input type="email" placeholder="Email" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("email")} />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700">Phone</label>
//                             <input type="text" placeholder="Phone" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("phone")} />
//                           </div>

//                           <div>
//                             <label className="block !text-sm !font-medium !text-gray-500">
//                               LinkedIn URL
//                             </label>
//                             <input
//                               type="url"
//                               placeholder="linkedin.com/in/yourprofile"
//                               className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                               {...register("linkedin")}
//                             />
//                           </div>
//                           <div>
//                             <label className="block !text-sm !font-medium !text-gray-500">
//                               GitHub
//                             </label>
//                             <input
//                               type="url"
//                               placeholder="github.com/username"
//                               className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                               {...register("github")}
//                             />
//                           </div>

//                           <div>
//                             <label className="block !text-sm !font-medium !text-gray-500">
//                               Stack Overflow
//                             </label>
//                             <input
//                               type="url"
//                               placeholder="stackoverflow.com/users/your-id"
//                               className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                               {...register("stackoverflow")}
//                             />
//                           </div>

//                           <div>
//                             <label className="block !text-sm !font-medium !text-gray-500">
//                               LeetCode
//                             </label>
//                             <input
//                               type="url"
//                               placeholder="leetcode.com/username"
//                               className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                               {...register("leetcode")}
//                             />
//                           </div>


//                           <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700">Address</label>
//                             <input type="text" placeholder="Enter your address" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("address")} />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700">City, State</label>
//                             <input type="text" placeholder="City,State" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("city_state")} />
//                           </div>

//                           <div>
//                             <label className="block text-sm font-medium text-gray-700">Country</label>
//                             <input type="text" placeholder="India" className="mt-1 w-full rounded-lg border border-gray-300 p-2" {...register("country")} />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700">
//                               Postal Code
//                             </label>
//                             <input
//                               type="text"
//                               placeholder="Postal Code"
//                               className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                               {...register("postal_code")}
//                             />
//                           </div>

//                           <div className="md:col-span-2">
//                             <button
//                               type="button"
//                               onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
//                               className="flex items-center gap-2 !text-sm !text-[#800080] hover:!text-[#b98ab9] font-medium transition-colors"
//                             >
//                               {showAdditionalDetails ? (
//                                 <>
//                                   Hide additional details
//                                   <ChevronUp size={20} />
//                                 </>
//                               ) : (
//                                 <>
//                                   Add more details
//                                   <ChevronDown size={20} />
//                                 </>
//                               )}
//                             </button>
//                           </div>
//                           {showAdditionalDetails && (
//                             <>
//                               <div>
//                                 <label className="block !text-sm !font-medium !text-gray-500">
//                                   Nationality
//                                 </label>
//                                 <input
//                                   type="text"
//                                   placeholder="Nationality"
//                                   className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                                   {...register("nationality")}
//                                 />
//                               </div>

//                               <div>
//                                 <label className="block !text-sm !font-medium !text-gray-500">
//                                   Place of Birth
//                                 </label>
//                                 <input
//                                   type="text"
//                                   placeholder="City, Country"
//                                   className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                                   {...register("birth_place")}
//                                 />
//                               </div>

//                               <div>
//                                 <label className="block !text-sm !font-medium !text-gray-500">
//                                   Date of Birth
//                                 </label>
//                                 <input
//                                   type="date"
//                                   className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                                   {...register("dob")}
//                                 />
//                               </div>

//                               <div>
//                                 <label className="block !text-sm !font-medium !text-gray-500">
//                                   Driving License
//                                 </label>
//                                 <input
//                                   type="text"
//                                   placeholder="License Number"
//                                   className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                                   {...register("driving_licence")}
//                                 />
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//                       <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
//                         {sectionOrder.map((sectionId) => {
//                           if (!activeSections.includes(sectionId)) return null;

//                           // ✅ Determine section type and title
//                           let sectionTitle = "";
//                           let isSimpleCustom = false;
//                           let isAdvancedCustom = false;

//                           if (typeof sectionId === 'string' && sectionId.startsWith('custom_simple_')) {
//                             isSimpleCustom = true;
//                             const titleKey = `customSimpleTitle_${sectionId}`;
//                             sectionTitle = watch(titleKey) || "Custom Section";
//                           } else if (typeof sectionId === 'string' && sectionId.startsWith('custom_advanced_')) {
//                             isAdvancedCustom = true;
//                             const titleKey = `customAdvancedTitle_${sectionId}`;
//                             sectionTitle = watch(titleKey) || "Custom Section";
//                           } else {
//                             // Static section titles
//                             sectionTitle =
//                               sectionId === 'employment' ? (watch('employmentSectionTitle') || "Employment History") :
//                                 sectionId === 'education' ? (watch('educationSectionTitle') || "Education") :
//                                   sectionId === 'skills' ? (watch('skillSectionTitle') || "Skills") :
//                                     sectionId === 'summary' ? (watch('summarySectionTitle') || "Personal Summary") :
//                                       sectionId === 'courses' ? (watch('coursesSectionTitle') || "Courses") :
//                                         sectionId === 'hobbies' ? (watch('hobbiesSectionTitle') || "Hobbies") :
//                                           sectionId === 'activities' ? (watch('activitiesSectionTitle') || "Activities") :
//                                             sectionId === 'languages' ? (watch('languagesSectionTitle') || "Languages") :
//                                               sectionId === 'internships' ? (watch('internshipsSectionTitle') || "Internships") :
//                                                 "Section";
//                           }

//                           return (
//                             <div className='acco_section' key={sectionId}>
//                               <SortableSection
//                                 id={sectionId}
//                                 title={sectionTitle}
//                                 onTitleUpdate={(newTitle) => {
//                                   if (sectionId.startsWith('custom_simple_')) {
//                                     const titleKey = `customSimpleTitle_${sectionId}`;
//                                     setValue(titleKey, newTitle);
//                                   } else if (sectionId.startsWith('custom_advanced_')) {
//                                     const titleKey = `customAdvancedTitle_${sectionId}`;
//                                     setValue(titleKey, newTitle);
//                                   } else if (sectionId === 'summary') {
//                                     setValue('summarySectionTitle', newTitle);
//                                   } else if (sectionId === 'employment') {
//                                     setValue('employmentSectionTitle', newTitle);
//                                   } else if (sectionId === 'education') {
//                                     setValue('educationSectionTitle', newTitle);
//                                   } else if (sectionId === 'skills') {
//                                     setValue('skillSectionTitle', newTitle);
//                                   } else if (sectionId === 'courses') {
//                                     setValue('coursesSectionTitle', newTitle);
//                                   } else if (sectionId === 'hobbies') {
//                                     setValue('hobbiesSectionTitle', newTitle);
//                                   } else if (sectionId === 'activities') {
//                                     setValue('activitiesSectionTitle', newTitle);
//                                   } else if (sectionId === 'languages') {
//                                     setValue('languagesSectionTitle', newTitle);
//                                   } else if (sectionId === 'internships') {
//                                     setValue('internshipsSectionTitle', newTitle);
//                                   }
//                                 }}
//                                 onDelete={() => handleAnimatedDeleteSection(sectionId)}
//                                 canDelete={true}
//                               >
//                                 {sectionId === 'employment' && (
//                                   <EmpHistoryEdit
//                                     register={register}
//                                     empHistory={empHistory}
//                                     setEmpHistory={setEmpHistory}
//                                     watch={watch}
//                                     control={control}
//                                     setValue={setValue}
//                                     fields={empFields}
//                                     append={empAppend}
//                                     remove={empRemove}
//                                     move={empMove}
//                                     noHeader={true}
//                                   />
//                                 )}
//                                 {sectionId === 'education' && (
//                                   <EducationNewEdit
//                                     register={register}
//                                     education={education}
//                                     setEducation={setEducation}
//                                     watch={watch}
//                                     control={control}
//                                     setValue={setValue}
//                                     fields={eduFields}
//                                     append={eduAppend}
//                                     remove={eduRemove}
//                                     move={eduMove}
//                                     noHeader={true}
//                                   />
//                                 )}
//                                 {sectionId === 'skills' && (
//                                   <SkillsNewEdit
//                                     register={register}
//                                     newskill={newskill}
//                                     setNewSkill={setNewSkill}
//                                     watch={watch}
//                                     setValue={setValue}
//                                     control={control}
//                                     fields={skillFields}
//                                     append={skillAppend}
//                                     remove={skillRemove}
//                                     move={skillMove}
//                                     noHeader={true}
//                                   />
//                                 )}
//                                 {sectionId === 'summary' && (
//                                   <PersonalSummaryEdit
//                                     register={register}
//                                     control={control}
//                                     watch={watch}
//                                     noHeader={true}
//                                   />
//                                 )}
//                                 {sectionId === 'courses' && (
//                                   <CoursesEdit
//                                     register={register}
//                                     watch={watch}
//                                     control={control}
//                                     setValue={setValue}
//                                     fields={coursesFields}
//                                     append={coursesAppend}
//                                     remove={coursesRemove}
//                                     move={coursesMove}
//                                     noHeader={true}
//                                   />
//                                 )}
//                                 {sectionId === 'hobbies' && (
//                                   <HobbiesEdit register={register} noHeader={true} />
//                                 )}
//                                 {sectionId === 'activities' && (
//                                   <ActivitiesEdit
//                                     register={register}
//                                     watch={watch}
//                                     control={control}
//                                     setValue={setValue}
//                                     fields={activitiesFields}
//                                     append={activitiesAppend}
//                                     remove={activitiesRemove}
//                                     move={activitiesMove}
//                                     noHeader={true}
//                                   />
//                                 )}
//                                 {sectionId === 'languages' && (
//                                   <LanguagesEdit
//                                     register={register}
//                                     watch={watch}
//                                     setValue={setValue}
//                                     control={control}
//                                     fields={languageFields}
//                                     append={languageAppend}
//                                     remove={languageRemove}
//                                     move={languageMove}
//                                     noHeader={true}
//                                   />
//                                 )}
//                                 {sectionId === 'internships' && (
//                                   <InternshipsEdit
//                                     register={register}
//                                     watch={watch}
//                                     control={control}
//                                     setValue={setValue}
//                                     fields={internshipFields}
//                                     append={internshipAppend}
//                                     remove={internshipRemove}
//                                     move={internshipMove}
//                                     noHeader={true}
//                                   />
//                                 )}

//                                 {/* ✅ Simple Custom Section */}
//                                 {isSimpleCustom && (
//                                   <DynamicSimpleCustomSection
//                                     sectionId={sectionId}
//                                     register={register}
//                                     watch={watch}
//                                     setValue={setValue}
//                                     control={control}
//                                     noHeader={true}
//                                   />
//                                 )}

//                                 {/* ✅ Advanced Custom Section */}
//                                 {isAdvancedCustom && (
//                                   <DynamicAdvancedCustomSection
//                                     sectionId={sectionId}
//                                     register={register}
//                                     watch={watch}
//                                     control={control}
//                                     setValue={setValue}
//                                     noHeader={true}
//                                   />
//                                 )}
//                               </SortableSection>
//                             </div>
//                           );
//                         })}
//                       </SortableContext>
//                     </DndContext>

//                     <AddSectionEdit
//                       onAddNewSection={handleAddNewSection}
//                       activeSections={activeSections}
//                     />
//                   </div>

//                   <div className="fixed bottom-[20px] left-1/2 -translate-x-1/2 z-50">
//                     {savingStatus === 'saving' && (
//                       <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/80 backdrop-blur text-white text-xs font-medium shadow-lg animate-pulse">
//                         <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
//                         Saving changes...
//                       </div>
//                     )}

//                     {savingStatus === 'saved' && (
//                       <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white text-xs font-medium shadow-lg animate-fade-in">
//                         <AiFillSave className="text-sm" />
//                         Saved successfully
//                       </div>
//                     )}

//                     {savingStatus === 'error' && (
//                       <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-xs font-medium shadow-lg animate-shake">
//                         ❌ Save failed
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </form>
//             </FormProvider>
//             :
//             <CustomizeSection
//               selectedTemplate={selectedTemplate}
//               onSelectTemplate={handleSelectTemplate}
//               themeColor={themeColor}
//               setThemeColor={setThemeColor}
//               resumeSettings={resumeSettings}
//               setResumeSettings={setResumeSettings}
//             />
//           }
//         </div>

//         <div className='lg:w-6/12 bg-[#ffffff] rounded-[8px]'>
//           <div className='flex items-center justify-between'>
//             <div className='flex items-center gap-1 mb-2 lg:mb-0'></div>
//             <div className='lg:flex items-center gap-3'></div>
//           </div>
//           <div ref={componentRef} className='border border-[#E5E5E5] rounded-[8px] mb-4'>
//             <ActiveResume formData={formValues} empHistory={empHistory} themeColor={themeColor} sectionOrder={sectionOrder} resumeSettings={resumeSettings} />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ✅ Wrapper component for Simple Custom Section with dynamic useFieldArray
// const DynamicSimpleCustomSection = ({ sectionId, register, watch, setValue, control, noHeader }) => {
//   const historyFieldName = `customSimpleHistory_${sectionId}`;

//   const { fields, append, remove, move } = useFieldArray({
//     control,
//     name: historyFieldName,
//   });

//   return (
//     <SimpleCustomSectionEdit
//       sectionId={sectionId}
//       register={register}
//       watch={watch}
//       setValue={setValue}
//       control={control}
//       fields={fields}
//       append={append}
//       remove={remove}
//       move={move}
//       noHeader={noHeader}
//     />
//   );
// };

// // ✅ Wrapper component for Advanced Custom Section with dynamic useFieldArray
// const DynamicAdvancedCustomSection = ({ sectionId, register, watch, control, setValue, noHeader }) => {
//   const historyFieldName = `customAdvancedHistory_${sectionId}`;

//   const { fields, append, remove, move } = useFieldArray({
//     control,
//     name: historyFieldName,
//   });

//   return (
//     <AdvancedCustomSectionEdit
//       sectionId={sectionId}
//       register={register}
//       watch={watch}
//       control={control}
//       setValue={setValue}
//       fields={fields}
//       append={append}
//       remove={remove}
//       move={move}
//       noHeader={noHeader}
//     />
//   );
// };

// export default page