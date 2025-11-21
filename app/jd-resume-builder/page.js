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
import { jdBasedResumeAchivmentInfo, jdBasedResumeCertificateInfo, jdBasedResumeEducationInfo, jdBasedResumeLanguageInfo, jdBasedResumeBasicInfo, jdBasedResumeProjectsInfo, jdBasedResumeSkillsInfo, jdBasedResumeExpInfo, jdBasedAtsScoreAnalyze } from '../reducers/DashboardSlice';
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
// import htmlDocx from "html-docx-js/dist/html-docx";
// import juice from 'juice';
// import html2docx from "html2docx";
import JdAtsScoreAnalyzeModal from '../modal/JdAtsScoreAnalyzeModal';

const page = () => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0); // default to Personal Info
  const tabsRef = useRef(null); // ref to scroll into view

  const [openJdAtsModal, setOpenJdAtsModal] = useState(false);
  const [atsData, setAtsData] = useState(null)
  const { jdBasedDetailsData, jdBasedAtsScoreAnalyzeData } = useSelector((state) => state?.dash)
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const id = atob(searchParams.get("id"))
  const user_id = sessionStorage.getItem('user_id')
  const parseUserId = JSON.parse(user_id)
  const componentRef = useRef();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(jdBasedResumeDetails({ jd_resume_id: id }))
  }, [id])

  console.log("jdBasedDetailsData", jdBasedDetailsData);

  const handleAnalyzeResume = async () => {
    try {
      const res = await dispatch(jdBasedAtsScoreAnalyze({ id })).unwrap();
      if (res?.data) {
        setAtsData(res.data);
        setOpenJdAtsModal(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch ATS Score");
    }
  };


  const [experiences, setExperiences] = useState([
    {
      id: Date.now(),
      company_name: "",
      position: "",
      location: "",
      skill: "",
      start_date: null,
      end_date: null,
      current_work: false,
      projects: [{ id: Date.now() + 1, title: "", role: "", technology: "", description: "" }]
    }
  ]);

  const [languages, setLanguages] = useState([
    { id: Date.now(), language_name: "", proficiency: "" },
  ]);

  const [skills, setSkills] = useState([
    { id: Date.now(), skill_category: "", skill: "" }
  ])

  const [personalPro, setPersonalPro] = useState([
    { id: Date.now(), project_title: "", role: "", start_time: null, end_time: null, project_url: "", skill: "", description: "" }
  ])

  const [certificates, setCertificates] = useState([
    { id: Date.now(), certification_name: "", issuing_organization: "", obtained_date: null, certification_id: "" }
  ])

  const [achivments, setAchivments] = useState([
    { id: Date.now(), achievement_title: "", organization: "", receive_date: null, description: "" }
  ])

  const [educationEntries, setEducationEntries] = useState([
    { id: Date.now(), institution: "", location: "", field_study: "", degree: "", start_time: null, end_time: null, cgpa: "" }
  ])

  const [extraProjects, setExtraProjects] = useState([
    {
      id: Date.now(),
      project_name: "",
      role: "",
      start_date: null,
      end_date: null,
      technology: "",
      description: "",
    }
  ]);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();


  //   useEffect(()=>{
  //     setValue("full_name",jdBasedDetailsData?.data?.[0]?.basic_info?.candidate_name)
  // },[jdBasedDetailsData,setValue])
  const formValues = watch();

  // useEffect(() => {
  //   console.log('jdBasedDetailsDataExp', jdBasedDetailsData?.data?.[0]?.experience);
  //   if (jdBasedDetailsData?.data?.[0]?.experience?.length > 0) {
  //     const formattedExperiences = jdBasedDetailsData.data[0].experience.map(exp => {
  //       let skills = [];
  //       try {
  //         skills = JSON.parse(exp.skill_set); // string to array convert
  //       } catch (e) {
  //         skills = [];
  //       }

  //       return {
  //         id: exp.id,
  //         company_name: exp.company_name || "",
  //         position: exp.Position || "",
  //         location: exp.location || "",
  //         skill: Array.isArray(skills) ? skills.join(",") : exp.skill_set || "",
  //         start_date: exp.start_date ? new Date(exp.start_date) : null,
  //         end_date: exp.end_date ? new Date(exp.end_date) : null,
  //         current_work: false,
  //         projects: exp.projects || [
  //           { id: Date.now(), title: "", role: "", technology: "", description: "" }
  //         ]
  //       };
  //     });
  //     setExperiences(formattedExperiences);
  //   }
  // }, [jdBasedDetailsData]);

  useEffect(() => {
    console.log('PersonalProjectJd', jdBasedDetailsData?.data?.[0]?.project)
    console.log('jdBasedDetailsDataExp', jdBasedDetailsData?.data?.[0]?.experience);
    if (jdBasedDetailsData?.data?.[0]?.experience?.length > 0) {
      const formattedExperiences = jdBasedDetailsData.data[0].experience.map(exp => {
        let skills = [];
        try {
          skills = JSON.parse(exp.skill_set); // string to array convert
        } catch (e) {
          skills = [];
        }

        // add for exp projeect 
        const jdProjects = jdBasedDetailsData?.data?.[0]?.project;
        const relatedProjects = jdProjects
          .filter((proj) => proj.exp_id === exp.id)
          .map((proj) => ({
            id: proj.id,
            title: proj.Project_title || "",
            role: proj.Role || "",
            // technology: Array.isArray(JSON.parse(proj.skill_set_use || "[]"))
            //   ? JSON.parse(proj.skill_set_use).join(", ")
            //   : proj.skill_set_use || "",
            // description: proj.description || "",
               technology: (() => {
      if (!proj.skill_set_use) return "";
      try {
        const parsed = JSON.parse(proj.skill_set_use);
        return Array.isArray(parsed) ? parsed.join(", ") : proj.skill_set_use;
      } catch (e) {
        return proj.skill_set_use;
      }
    })(),
          }));

        return {
          id: exp.id,
          company_name: exp.company_name || "",
          position: exp.Position || "",
          location: exp.location || "",
          skill: Array.isArray(skills) ? skills.join(",") : exp.skill_set || "",
          start_date: exp.start_date ? new Date(exp.start_date) : null,
          end_date: exp.end_date ? new Date(exp.end_date) : null,
          current_work: false,
          projects:
            relatedProjects.length > 0
              ? relatedProjects
              : [
                {
                  id: Date.now(),
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
  }, [jdBasedDetailsData]);

  useEffect(() => {
    if (jdBasedDetailsData?.data?.[0]?.skill?.length > 0) {
      const existingSkills = jdBasedDetailsData.data[0].skill.map((sk, index) => ({
        id: Date.now() + index,
        skill_category: sk.categoty || "",
        skill: JSON.parse(sk.skill_set || "[]").join(", "),
      }));
      setSkills(existingSkills);
    } else {
      setSkills([{ id: Date.now(), skill_category: "", skill: "" }]);
    }
  }, [jdBasedDetailsData, setSkills]);

  useEffect(() => {
    if (jdBasedDetailsData?.data?.length > 0) {
      const existingLanguages = jdBasedDetailsData.data[0].language || [];
      if (existingLanguages.length > 0) {
        setLanguages(
          existingLanguages.map((lang, index) => ({
            id: Date.now() + index,
            language_name: lang.language || "",
            proficiency: lang.proficiency || "",
          }))
        );
      } else {
        setLanguages([{ id: Date.now(), language_name: "", proficiency: "" }]);
      }
    }
  }, [jdBasedDetailsData]);

  useEffect(() => {
    if (
      jdBasedDetailsData?.data?.length > 0 &&
      jdBasedDetailsData.data[0]?.resume_achievement?.length > 0
    ) {
      console.log(
        "AchivmentsJd",
        jdBasedDetailsData.data[0].resume_achievement
      );

      const achievements = jdBasedDetailsData.data[0].resume_achievement.map(
        (ach, index) => ({
          id: ach.id || Date.now() + index,
          achievement_title: ach.achivement_name || "",
          organization: ach.achivement_organization_name || "",
          receive_date: ach.achivement_date
            ? new Date(ach.achivement_date)
            : null,
          description: ach.description || "",
        })
      );

      setAchivments(achievements);
    } else {
      setAchivments([
        {
          id: Date.now(),
          achievement_title: "",
          organization: "",
          receive_date: null,
          description: "",
        },
      ]);
    }
  }, [jdBasedDetailsData, setAchivments]);

  useEffect(() => {
    console.log('PersonalProjectJd', jdBasedDetailsData?.data?.[0]?.project)
    if (jdBasedDetailsData?.data?.[0]?.project?.length > 0) {
      const existingProjects = jdBasedDetailsData.data[0].project.map((proj, index) => ({
        id: Date.now() + index,
        project_title: proj.Project_title || "",
        role: proj.Role || "",
        start_time: proj.start_time ? new Date(proj.start_time) : null,
        end_time: proj.end_time ? new Date(proj.end_time) : null,
        project_url: proj.project_url || "",
        skill: proj.skill_set_use ? JSON.parse(proj.skill_set_use).join(", ") : "",
        description: proj.description || ""
      }));
      setPersonalPro(existingProjects);
    } else {
      setPersonalPro([{ id: Date.now(), project_title: "", role: "", start_time: null, end_time: null, project_url: "", skill: "", description: "" }]);
    }
  }, [jdBasedDetailsData, setPersonalPro]);

  useEffect(() => {
    if (jdBasedDetailsData?.data?.[0]?.education) {
      const mappedEducation = jdBasedDetailsData?.data?.[0]?.education.map((edu) => ({
        id: edu.id,
        institution: edu.college || "",
        location: edu.location || "",
        degree: edu.course?.split(" in ")[0] || "",   // e.g. "Master of Science (M.Sc.)"
        field_study: edu.course?.split(" in ")[1] || "", // e.g. "Computer Science"
        start_time: edu.start_date || null,   // if available
        end_time: edu.course_completed !== "1970-01-01" ? edu.course_completed : null,
        cgpa: edu.cgpa || "",
        additionalInfo: edu.aditional_info || "",
        currentlyStudying: !edu.course_completed || edu.course_completed === "1970-01-01",
      }));

      setEducationEntries(mappedEducation);
    }
  }, [jdBasedDetailsData]);

  // add for extra project
  useEffect(() => {
    const extraProjData = jdBasedDetailsData?.data?.[0]?.extra_project;

    if (extraProjData?.length > 0) {
      const formattedExtraProjects = extraProjData.map((proj, index) => ({
        id: proj.id || Date.now() + index,
        project_name: proj.project_name || "",
        role: proj.role || "",
        start_date: proj.start_date ? new Date(proj.start_date) : null,
        end_date: proj.end_date ? new Date(proj.end_date) : null,
        technology: proj.technology ? JSON.parse(proj.technology).join(", ") : "",
        description: proj.description || "",
      }));
      setExtraProjects(formattedExtraProjects);
    } else {
      setExtraProjects([{
        id: Date.now(),
        project_name: "",
        role: "",
        start_date: null,
        end_date: null,
        technology: "",
        description: "",
      }]);
    }
  }, [jdBasedDetailsData, setExtraProjects]);


  useEffect(() => {
    // console.log('CertificatesJd',jdBasedDetailsData?.data[0]?.certification)
    if (jdBasedDetailsData?.data?.length > 0 && jdBasedDetailsData?.data[0]?.certification?.length > 0) {
      console.log('CertificatesJd', jdBasedDetailsData.data[0].certification);

      const certs = jdBasedDetailsData.data[0].certification.map((cert, index) => ({
        id: cert.id || Date.now() + index,
        certification_name: cert.certification_name || "",
        issuing_organization: cert.certification_organization_name || "",
        obtained_date: cert.certification_date ? new Date(cert.certification_date) : null,
        certification_id: cert.certification_id || ""
      }));

      setCertificates(certs);
    } else {
      setCertificates([
        {
          id: Date.now(),
          certification_name: "",
          issuing_organization: "",
          obtained_date: null,
          certification_id: ""
        }
      ]);
    }
  }, [jdBasedDetailsData, setCertificates]);

  const onSubmit = (data) => {
    console.log("data", data);

    dispatch(jdBasedResumeBasicInfo({ ...data, basicinfo_id: jdBasedDetailsData?.data?.[0]?.basic_info?.[0]?.id, jd_resume_id: jdBasedDetailsData?.data?.[0]?.id })).then((res) => {
      console.log("res", res);

      if (res?.payload?.status_code === 200) {
        const jdResumeId = jdBasedDetailsData?.data?.[0]?.id;
        const eduPayload = {
          jd_resume_id: jdResumeId,
          data: educationEntries.map((edu) => (
            {
              id: edu?.id || null,
              institution: edu?.institution,
              location: edu?.location,
              field_study: edu?.field_study,
              degree: edu?.degree,
              start_time: convertToSubmitFormat(edu?.start_time),
              end_time: convertToSubmitFormat(edu?.end_time),
              cgpa: edu?.gpa,
              information: edu?.additionalInfo,
              // jd_resume_id: res?.payload?.jd_resume_id
            }
          ))
        }


        dispatch(jdBasedResumeEducationInfo(eduPayload))



        const payload = {
          jd_resume_id: jdResumeId,
          data: experiences.map(exp => ({
            id: exp?.id || null,
            company_name: exp.company_name,
            position: exp.position,
            location: exp.location,
            skill: exp.skill.split(",").map(s => s.trim()), // turn comma string into array
            start_date: convertToSubmitFormat(exp.start_date),
            end_date: convertToSubmitFormat(exp.end_date),
            current_work: exp.current_work ? 1 : 0,
            projects: exp.projects.map(proj => ({
              title: proj.title,
              role: proj.role,
              technology: proj.technology.split(",").map(t => t.trim()),
              description: proj.description
            }))
          }))
        };
        dispatch(jdBasedResumeExpInfo(payload))

        const payloadLang = {
          jd_resume_id: jdResumeId,
          user_id: parseUserId?.user_id,
          resume_id: res?.payload?.id,
          data: languages.map((lang) => ({
            // id: lang?.id || null,
            language_name: lang.language_name,
            proficiency: lang.proficiency,
          })),
        };
        dispatch(jdBasedResumeLanguageInfo(payloadLang))

        console.log('skills', skills)
        const payloadSkills = {
          jd_resume_id: jdResumeId,
          user_id: parseUserId?.user_id,
          data: skills.map((sk) => (
            {
              resume_id: res?.payload?.id,
              skill_category: sk.skill_category,
              position: "test",
              skill: sk.skill.split(',').map(t => t.trim())
            }

          ))
        }
        dispatch(jdBasedResumeSkillsInfo(payloadSkills))

        const payloadProject = {
          jd_resume_id: jdResumeId,
          user_id: parseUserId?.user_id,
          resume_id: res?.payload?.id,
          data: personalPro.map((pPro) => (
            {
              project_title: pPro?.project_title,
              role: pPro?.role,
              start_time: convertToSubmitFormat(pPro?.start_time),
              end_time: convertToSubmitFormat(pPro?.end_time),
              project_url: pPro?.project_url,
              skill: pPro.skill.split(',').map(t => t.trim())
            }
          ))
        }
        dispatch(jdBasedResumeProjectsInfo(payloadProject))


        const payloadCerticate = {
          jd_resume_id: jdResumeId,
          user_id: parseUserId?.user_id,
          resume_id: res?.payload?.id,
          data: certificates.map((cer) => (
            {
              certification_name: cer?.certification_name,
              issuing_organization: cer?.issuing_organization,
              obtained_date: convertToSubmitFormat(cer?.obtained_date),
              certification_id: cer?.certification_id
            }
          ))
        }
        dispatch(jdBasedResumeCertificateInfo(payloadCerticate))

        const payloadAchive = {
          jd_resume_id: jdResumeId,
          user_id: parseUserId?.user_id,
          resume_id: res?.payload?.id,
          data: achivments.map((achiv) => (
            {
              achievement_title: achiv?.achievement_title,
              organization: achiv?.organization,
              receive_date: convertToSubmitFormat(achiv?.receive_date),
              description: achiv?.description
            }
          ))
        }
        dispatch(jdBasedResumeAchivmentInfo(payloadAchive))



      }

    })
  }


  const handlePrint = useReactToPrint({
    contentRef: componentRef, // Updated for newer versions of react-to-print
    documentTitle: `${formValues?.full_name || 'Resume'}_Resume`, // Dynamic file name
    pageStyle: `
    @page {
      size: A4;
      margin: 0.5in;
    }

    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      margin: 0;
    }

    /* Disable browser default headers and footers */
    @page {
      margin: 0;
    }

    /* Hide default header/footer added by Chrome/Edge/WPS */
    @page :header {
      display: none;
    }
    @page :footer {
      display: none;
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
  return (
    <div className='lg:flex gap-5 pb-5 min-h-screen'>


      <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] mb-4 lg:mb-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='border-b border-[#E5E5E5] p-5 flex items-center justify-between'>
            <div className='flex items-center gap-1 lg:mb-4 lg:mb-0'>
              <HiClipboardList className='text-[#800080] text-2xl' />
              <h3 className='text-[16px] text-[#151515] font-medium'>Resume Sections</h3>
            </div>
            <button type="submit" className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-2 lg:px-4 flex items-center gap-1.5'><AiFillSave className='text-[18px]' /> Save Resume</button>
          </div>
          <div className='resume_tab_section'>
            <Tabs selectedIndex={activeTabIndex} onSelect={(index) => setActiveTabIndex(index)}>
              <div className='border-b border-[#E5E5E5] p-5'>
                <div className='tab_point relative' ref={tabsRef}>
                  <span
                    className="absolute -top-3 right-2 text-xs font-semibold bg-purple-600 text-white px-2 py-1 rounded-full animate-pulse cursor-pointer z-10"
                    onClick={() => {
                      setActiveTabIndex(2);
                      setTimeout(() => {
                        const section = document.getElementById("resumate-section");
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
                    <TabPanel>
                      <PersonalInfoJd register={register} errors={errors} jdBasedDetailsData={jdBasedDetailsData} setValue={setValue} />
                    </TabPanel>

                    <TabPanel>
                      <EducationJd register={register} errors={errors} educationEntries={educationEntries} setEducationEntries={setEducationEntries} jdBasedDetailsData={jdBasedDetailsData} setValue={setValue} />
                    </TabPanel>


                    <TabPanel>
                      <WorkExpJd experiences={experiences} setExperiences={setExperiences} register={register} jdBasedDetailsData={jdBasedDetailsData} errors={errors} />
                    </TabPanel>

                    <TabPanel>
                      <LanguageJd
                        languages={languages}
                        setLanguages={setLanguages}
                        jdBasedDetailsData={jdBasedDetailsData}
                      />
                    </TabPanel>

                    <TabPanel>
                      <SkillsJd register={register} errors={errors} skills={skills} setSkills={setSkills} jdBasedDetailsData={jdBasedDetailsData} />
                    </TabPanel>

                    <TabPanel>
                      <PersonalProjectJd register={register} errors={errors} personalPro={personalPro} setPersonalPro={setPersonalPro} jdBasedDetailsData={jdBasedDetailsData} />
                    </TabPanel>

                    <TabPanel>
                      <CertificatesJd register={register} errors={errors} certificates={certificates} setCertificates={setCertificates} jdBasedDetailsData={jdBasedDetailsData} />
                    </TabPanel>

                    <TabPanel>
                      <AchivmentsJd register={register} errors={errors} achivments={achivments} setAchivments={setAchivments} jdBasedDetailsData={jdBasedDetailsData} />
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
            {/* <button onClick={() => setOpenModalAnalyzeResume(true)} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoStatsChart className='text-base' /> Analyze Resume</button> */}
            {/* <button onClick={() => downloadDocx()} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoMdDownload className='text-[18px]' /> Download DOCX</button> */}
            <button onClick={handlePrint} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download PDF</button>
          </div>
        </div>
        <div ref={componentRef} className='border border-[#E5E5E5] rounded-[8px] mb-4'>
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
        {/* <div className='flex items-center justify-between mb-0'>
          <div className='flex items-center gap-1'>
            <h3 className='text-[12px] text-[#060606] font-medium'>Template: <span className='text-[#6D6D6D]'>Modern</span></h3>
          </div>
          <div className='flex items-center gap-3'>
            <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5'> Change Template <AiOutlineArrowRight className='text-base' /></button>
          </div>
        </div> */}
      </div>

      {/* add modal for apply job start here */}
      {/* <Modal size="3xl" className="apply_modal_area" show={openModalAnalyzeResume} onClose={() => setOpenModalAnalyzeResume(false)}>
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
      </Modal> */}
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
      <JdAtsScoreAnalyzeModal
        show={openJdAtsModal}
        setShow={setOpenJdAtsModal}
        atsData={atsData}
      />
      <Modal
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
      </Modal>


    </div>
  )
}

export default page