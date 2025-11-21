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

import { MdOutlineWorkOutline } from "react-icons/md";


import resume4 from "../assets/imagesource/resume4.png";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select } from "flowbite-react";
import LinkedInTemplate from './LinkedInTemplate';
import BasicInfoLkdin from './BasicInfoLkdin';
import EducationLkdin from './EducationLkdin';
import ExpLkdin from './ExpLkdin';
import LanguageLkdin from './LanguageLkdin';
import SkillsLkdin from './SkillsLkdin';
import CoursesLkdin from './CoursesLkdin';
import AwardLkdin from './AwardLkdin';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkedinAtsScoreAnalyze, linkedgetDetails, linkedInBasicInfo, linkedInEduInfo, linkedInEnhance, linkedInExpInfo, linkedInLangInfo, linkedInSkillInfo, linkedInUsageInfo } from '../reducers/LinkedinSlice';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { convertToSubmitFormat } from '../utils/DateSubmitFormatter';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import LinkdinAtsScoreAnalyzeModal from '../modal/LinkdinAtsScoreAnalyzeModal';

const page = () => {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const { lkdDetails, lkdUsageInfo } = useSelector((state) => state?.linkedIn)
  const [enhancing, setEnhancing] = useState(false);
  const [openLinkdinAtsModal, setOpenLinkdinAtsModal] = useState(false);
  const [atsData, setAtsData] = useState(null)

  const dispatch = useDispatch()
  const searchParams = useSearchParams();
  const id = atob(searchParams.get("id"))
  console.log("id", id);
  const componentRef = useRef();
  useEffect(() => {
    dispatch(linkedgetDetails({ lkdin_resume_id: id }))
    dispatch(linkedInUsageInfo(id));
  }, [id])
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const formValues = watch();
  // console.log('remaining', lkdUsageInfo)

  const handleAnalyzeResume = async () => {
    try {
      const res = await dispatch(getLinkedinAtsScoreAnalyze({ id })).unwrap();
      if (res?.data) {
        setAtsData(res.data);
        setOpenLinkdinAtsModal(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch ATS Score");
    }
  };



  useEffect(() => {
    if (lkdDetails?.data?.[0]?.experience_info) {
      const mappedExp = lkdDetails?.data?.[0]?.experience_info?.map((exp) => (
        {
          id: exp.id,
          company_name: exp.company_name || "",
          position: exp.position || "",
          location: exp.location || "",
          skill: exp.skill_set || "",
          job_type: exp.job_type || "",
          start_date: exp.start_date || null,
          end_date: exp.end_date || null,
          current_work: exp.end_date === null, // mark current if no end_date
          job_description: exp.job_description || "",
        }
      ))
      setExperiences(mappedExp)
    }
  }, [lkdDetails])

  const [educationEntries, setEducationEntries] = useState([
    { id: Date.now(), institution: "", location: "", field_study: "", degree: "", start_time: null, end_time: null, cgpa: "" }
  ])

  useEffect(() => {
    if (lkdDetails?.data?.[0]?.education_info) {
      console.log('lkdDetails', lkdDetails)
      const mappedEducation = lkdDetails?.data?.[0]?.education_info.map((edu) => {
        // Try to separate field and degree if possible
        let degree = "";
        let field_study = "";
        if (edu.course) {
          // Look for parentheses (common LinkedIn format)
          const match = edu.course.match(/^(.*?)\s*\((.*?)\)$/);
          if (match) {
            field_study = match[1].trim();  // "Computer Science"
            degree = match[2].trim();       // "Bachelor of Science - BS"
          } else {
            degree = edu.course; // fallback if no parentheses
          }
        }

        return {
          id: edu.id,
          institution: edu.college || "",
          location: edu.location || "",
          degree,
          field_study,
          start_time: edu.course_start ? new Date(edu.course_start) : null,
          end_time: edu.course_completed && edu.course_completed !== "1970-01-01"
            ? new Date(edu.course_completed)
            : null,
          cgpa: edu.cgpa || null,
          additionalInfo: edu.aditional_info || "",
          currentlyStudying: !edu.course_completed || edu.course_completed === "1970-01-01",
        };
      });

      setEducationEntries(mappedEducation);
    }
  }, [lkdDetails]);






  const [experiences, setExperiences] = useState([
    {
      id: Date.now(),
      company_name: "",
      position: "",
      location: "",
      skill: "",
      job_type: "",
      start_date: null,
      end_date: null,
      current_work: false,
      job_description: "",
    },
  ]);

  const [languages, setLanguages] = useState([
    { id: Date.now(), language_name: "" },
  ]);

  useEffect(() => {
    if (lkdDetails?.data?.[0]?.language_info?.length > 0) {
      const mappedLanguages = lkdDetails.data[0].language_info.map((lang) => ({
        id: lang.id,
        language_name: lang.language || "",
        proficiency: lang.level || "",
      }));
      setLanguages(mappedLanguages);
    }
  }, [lkdDetails, setLanguages]);

  const [skills, setSkills] = useState([
    { id: Date.now(), skill_category: "", skill: "" }
  ])

  useEffect(() => {
    if (lkdDetails?.data?.[0]?.skills_info?.length > 0) {
      const formattedSkills = lkdDetails?.data?.[0]?.skills_info.map((s) => ({
        id: s.id,
        skill_category: s.category || "",
        skill: s.skill_set || "",
      }));
      setSkills(formattedSkills);
    }
  }, [lkdDetails?.data?.[0]?.skills_info]);

  const onSubmit = (data) => {
    console.log("LinkedIn Submit Data:", data);

    const lkdin_resume_id = lkdDetails?.data?.[0]?.basic_info?.[0]?.lkdin_resume_id;
    console.log("lkdin_resume_id:", lkdin_resume_id);


    const basicInfoPayload = {
      ...data,
      lkdin_resume_id,
      basicinfo_id: lkdDetails?.data?.[0]?.basic_info?.[0]?.id || null
    };

    console.log("Basic Info Payload:", basicInfoPayload);

    dispatch(linkedInBasicInfo(basicInfoPayload)).then((res) => {
      console.log("Basic Info Response:", res);

      if (res?.payload?.status_code === 201) {

        // Education Info
        const eduPayload = {
          lkdin_resume_id,
          education_info: educationEntries.map((edu) => ({
            id: edu?.id || null,
            name_of_the_institution: edu.institution,
            location: edu.location,
            field_study: edu.field_study,
            degree_name: edu.degree,
            duration: {
              start_date: convertToSubmitFormat(edu.start_time),
              end_date: convertToSubmitFormat(edu.end_time),
            },

            cgpa: edu.cgpa,
            additional_information: edu.additionalInfo,
          }))
        };

        console.log("Education Payload:", eduPayload);
        dispatch(linkedInEduInfo(eduPayload));


        // Experience Info
        const expPayload = {
          lkdin_resume_id,
          experience_info: experiences.map((exp) => ({
            id: exp?.id || null,
            company_name: exp.company_name,
            position: exp.position,
            location: exp.location,
            skill_set: exp.skill?.split(",").map((s) => s.trim()),
            additional_information: exp.job_description || "",
            job_type: exp.job_type || "",
            duration: {
              start_date: exp.start_date,
              end_date: exp.end_date,
            },
            current_work: exp.current_work ? 1 : 0,
            projects:
              exp.projects?.map((proj) => ({
                title: proj.title,
                role: proj.role,
                technology: proj.technology?.split(",").map((t) => t.trim()),
                description: proj.description,
              })) || [],
          })),
        };

        console.log("✅ Final Experience Payload:", expPayload);
        dispatch(linkedInExpInfo(expPayload));



        // Skills Info
        const skillPayload = {
          lkdin_resume_id,

          skill_info: skills.map(sk => ({
            skill_category: sk.skill_category,
            position: "test",
            skills: sk.skill.split(',').map(t => t.trim())
            // skill: sk.skill.split(',').map(t => t.trim())
          }))
        };
        console.log("Skills Payload:", skillPayload);
        dispatch(linkedInSkillInfo(skillPayload));

        console.log('languages', languages)
        // Language Info
        const langPayload = {
          lkdin_resume_id,
          language_info: languages.map((lang) => ({
            language_name: lang.language_name,
            proficiency_level: lang.proficiency,
          })),
        };
        console.log("Language Payload:", langPayload);
        dispatch(linkedInLangInfo(langPayload));
      }
    });
  };
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


  const handleEnhanceLinkedInPDF = async () => {
    try {
      setEnhancing(true);
      const lkdin_resume_id = lkdDetails?.data?.[0]?.basic_info?.[0]?.lkdin_resume_id;
      console.log('lkdin_resume_id', lkdin_resume_id)

      if (!lkdin_resume_id) {
        setEnhancing(false);
        return;
      }

      const payload = {
        lkdin_resume_id,
        linkedin_text: lkdDetails?.data?.[0],
      };

      const resultAction = await dispatch(linkedInEnhance(payload));

      if (linkedInEnhance.fulfilled.match(resultAction)) {
        dispatch(linkedInUsageInfo(id));
        toast.success("Linkedin Rewrite Enhance successfully!");
        console.log("Enhance result:", resultAction.payload);

        const rewriteData = resultAction?.payload?.data;
        console.log('rewriteData', rewriteData)

        // ALL DISPATCHES NOW WORK ✔
        dispatch(
          linkedInBasicInfo({
            lkdin_resume_id,
            ...rewriteData?.personal_info,
          })
        );

        dispatch(
          linkedInExpInfo({
            lkdin_resume_id,
            experience_info: rewriteData?.experience_info,
          })
        );

        dispatch(
          linkedInEduInfo({
            lkdin_resume_id,
            education_info: rewriteData?.education_info,
          })
        );

        dispatch(
          linkedInSkillInfo({
            lkdin_resume_id,
            skill_info: rewriteData?.skill_info,
          })
        );

        dispatch(
          linkedInLangInfo({
            lkdin_resume_id,
            language_info: rewriteData?.language_info,
          })

        )
        dispatch(linkedgetDetails({ lkdin_resume_id }))
      } else {
        console.error("Enhance Error:", resultAction.payload);
      }
    } catch (error) {
      console.error("Enhance PDF Error:", error);
    } finally {
      setEnhancing(false);
    }
  };


  // useEffect(() => {
  //   if (id) {
  //     dispatch(linkedInUsageInfo(id));
  //   }
  // }, [id]);

  const maxLimit = lkdUsageInfo?.data?.enhance_limit?.max_limit;
  const used = lkdUsageInfo?.data?.usage_limit;

  const remaining =
    typeof maxLimit === "number" && typeof used === "number"
      ? maxLimit - used
      : 5;



  return (
    <div className='lg:flex gap-5 pb-5'>

      <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] mb-4 lg:mb-0'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='border-b border-[#E5E5E5] p-5'>
            <div className=' flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <HiClipboardList className='text-[#800080] text-2xl' />
                <h3 className='text-[16px] text-[#151515] font-medium'>Resume Sections</h3>
              </div>
              <div className='flex items-center gap-1'>
                <button
                  onClick={handleEnhanceLinkedInPDF}
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
                      Enhance LinkedIn
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
            <Tabs>
              <div className='border-b border-[#E5E5E5] p-5'>
                <div className='tab_point'>
                  <TabList>
                    <Tab><span><BiSolidUser /></span> Personal Info</Tab>
                    <Tab><span><HiAcademicCap /></span> Education</Tab>
                    <Tab><span><BiSolidBriefcase /></span> Experience</Tab>
                    <Tab><span><FaLanguage /></span> Languages</Tab>
                    <Tab><span><MdSettingsSuggest /></span> Skills</Tab>
                    {/* <Tab><span><FaCertificate /></span> Courses</Tab>
                    <Tab><span><FaTrophy /></span> Honors & Awards</Tab> */}
                  </TabList>
                </div>
              </div>
              <div className='p-5 pr-0'>
                <div className='mb-4'>
                  <div>
                    <TabPanel>
                      <BasicInfoLkdin lkdDetails={lkdDetails} setValue={setValue} register={register} />
                    </TabPanel>

                    <TabPanel>
                      <EducationLkdin lkdDetails={lkdDetails} setValue={setValue} register={register} educationEntries={educationEntries} setEducationEntries={setEducationEntries} />
                    </TabPanel>

                    <TabPanel>
                      <ExpLkdin lkdDetails={lkdDetails} experiences={experiences} setExperiences={setExperiences} />
                    </TabPanel>

                    <TabPanel>
                      <LanguageLkdin lkdDetails={lkdDetails} languages={languages} setLanguages={setLanguages} />
                    </TabPanel>

                    <TabPanel>
                      <SkillsLkdin lkdDetails={lkdDetails} skills={skills} setSkills={setSkills} />
                    </TabPanel>

                    {/* <TabPanel>
                      <CoursesLkdin />
                    </TabPanel>

                    <TabPanel>
                      <AwardLkdin />
                    </TabPanel> */}

                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </form>
      </div>
      <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] p-5'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center gap-1'>
            <MdPreview className='text-[#800080] text-2xl' />
            <button
              onClick={() => setOpenPreviewModal(true)}
              className='text-[16px] text-[#151515] font-medium cursor-pointer hover:text-[#800080]'
            >
              Preview
            </button>
          </div>

          <div className='flex items-center gap-1'>
            <button
              onClick={handleAnalyzeResume}
              className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'
            >
              <IoStatsChart className='text-base' />check linkedIn score
            </button>
          </div>

          <div className='flex items-center gap-3'>
            {/* <button onClick={handlePrint} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download PDF</button> */}
            <div className="relative group inline-block">
              <button
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
        <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
          {/* <Image src={resume4} alt="resume4" className='' /> */}
          <LinkedInTemplate ref={componentRef} data={formValues} educationEntries={educationEntries} experiences={experiences} languages={languages} skills={skills} />
        </div>
        <LinkdinAtsScoreAnalyzeModal
          show={openLinkdinAtsModal}
          setShow={setOpenLinkdinAtsModal}
          atsData={atsData}
        />
        {/* Resume Preview Modal */}
        <Modal
          show={openPreviewModal}
          size="6xl"
          onClose={() => setOpenPreviewModal(false)}
        >
          <ModalHeader className='text-black border-0 pt-2 pr-2'>
            Preview
          </ModalHeader>
          <ModalBody className='bg-white p-5 rounded-b-[4px]'>
            <div ref={componentRef} className='border border-[#E5E5E5] rounded-[8px] p-5'>
              <LinkedInTemplate
                data={formValues}
                educationEntries={educationEntries}
                experiences={experiences}
                languages={languages}
                skills={skills}
              />
            </div>
          </ModalBody>
        </Modal>

      </div>

    </div>


  )
}

export default page