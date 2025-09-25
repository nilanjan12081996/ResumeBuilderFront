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
import { saveAchivmentInfo, saveCertificatesInfo, saveEducationInfo, saveLanguageInfo, savePersonalInfo, saveProjectInfo, saveSkillInfo, saveWorkExp } from '../reducers/ResumeSlice';
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

const page = () => {
  const{jdBasedDetailsData}=useSelector((state)=>state?.dash)
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);
  const searchParams = useSearchParams();
  const template = searchParams.get("template");
  const id=atob(searchParams.get("id"))
  const user_id=sessionStorage.getItem('user_id')
  const parseUserId=JSON.parse(user_id)
  const componentRef = useRef();
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(jdBasedResumeDetails({jd_resume_id:id}))
  },[id])

  console.log("jdBasedDetailsData",jdBasedDetailsData);
  

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

  const[skills,setSkills]=useState([
    {id:Date.now(),skill_category:"",skill:""}
  ])

  const[personalPro,setPersonalPro]=useState([
    {id:Date.now(),project_title:"",role:"",start_time:null,end_time:null,project_url:"",skill:"",description:""}
  ])

  const[certificates,setCertificates]=useState([
    {id:Date.now(),certification_name:"",issuing_organization:"",obtained_date:null,certification_id:""}
  ])

  const[achivments,setAchivments]=useState([
    {id:Date.now(),achievement_title:"",organization:"",receive_date:null,description:""}
  ])

  const[educationEntries,setEducationEntries]=useState([
    {id:Date.now(),institution:"",location:"",field_study:"",degree:"",start_time:null,end_time:null,cgpa:""}
  ])

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
  const onSubmit=(data)=>{
    console.log("data",data);
      
dispatch(savePersonalInfo(data)).then((res)=>{
  console.log("res",res);
 
  if(res?.payload?.status_code===201){
     
    const eduPayload={
       resume_id: res?.payload?.id,
       education_arr:educationEntries.map((edu)=>(
        {
          institution:edu?.institution,
          location:edu?.location,
          field_study:edu?.field_study,
          degree:edu?.degree,
          start_time:convertToSubmitFormat(edu?.start_time),
          end_time:convertToSubmitFormat(edu?.end_time),
          cgpa:edu?.gpa,
          information:edu?.additionalInfo
        }
       ))
    }
  
    
    dispatch(saveEducationInfo(eduPayload))



    const payload = {
      resume_id: res?.payload?.id,
      data: experiences.map(exp => ({
        company_name: exp.company_name,
        position: exp.position,
        location: exp.location,
        skill: exp.skill.split(",").map(s => s.trim()), // turn comma string into array
        start_date:convertToSubmitFormat(exp.start_date),
        end_date:convertToSubmitFormat(exp.end_date),
        current_work: exp.current_work ? 1 : 0,
        projects: exp.projects.map(proj => ({
          title: proj.title,
          role: proj.role,
          technology: proj.technology.split(",").map(t => t.trim()),
          description: proj.description
        }))
      }))
    };
    dispatch(saveWorkExp(payload))

     const payloadLang = {
          user_id: parseUserId?.user_id,
          resume_id: res?.payload?.id,
          data: languages.map((lang) => ({
            language_name: lang.language_name,
            proficiency: lang.proficiency,
          })),
        };
        dispatch(saveLanguageInfo(payloadLang))

  
      const payloadSkills={
        user_id: parseUserId?.user_id,
        data:skills.map((sk)=>(
          {
            resume_id:res?.payload?.id,
            skill_category:sk.skill_category,
            position:"test",
            skill:sk.skill.split(',').map(t=>t.trim())
          }
          
        ))
      }
      dispatch(saveSkillInfo(payloadSkills))

      const payloadProject={
         user_id: parseUserId?.user_id,
         resume_id: res?.payload?.id,
         data:personalPro.map((pPro)=>(
          {
            project_title:pPro?.project_title,
            role:pPro?.role,
            start_time:convertToSubmitFormat(pPro?.start_time),
            end_time:convertToSubmitFormat(pPro?.end_time),
            project_url:pPro?.project_url,
            skill:pPro.skill.split(',').map(t=>t.trim())
          }
         ))
      }
      dispatch(saveProjectInfo(payloadProject))


      const payloadCerticate={
         user_id: parseUserId?.user_id,
         resume_id: res?.payload?.id,
         data:certificates.map((cer)=>(
          {
            certification_name:cer?.certification_name,
            issuing_organization:cer?.issuing_organization,
            obtained_date:convertToSubmitFormat(cer?.obtained_date),
            certification_id:cer?.certification_id
          }
         ))
      }
      dispatch(saveCertificatesInfo(payloadCerticate))

      const payloadAchive={
         user_id: parseUserId?.user_id,
         resume_id: res?.payload?.id,
         data:achivments.map((achiv)=>(
          {

            achievement_title:achiv?.achievement_title,
            organization:achiv?.organization,
            receive_date:convertToSubmitFormat(achiv?.receive_date),
            description:achiv?.description
          }
         ))
      }
      dispatch(saveAchivmentInfo(payloadAchive))
      

    
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
    <div className='lg:flex gap-5 pb-5'>
      
      
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
              <Tabs>
                <div className='border-b border-[#E5E5E5] p-5'>
                    <div className='tab_point'>
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
                        <PersonalInfoJd register={register} errors={errors} jdBasedDetailsData={jdBasedDetailsData} setValue={setValue}/>
                        </TabPanel>
                        
                      <TabPanel>
                      <EducationJd register={register} errors={errors} educationEntries={educationEntries}setEducationEntries={setEducationEntries} jdBasedDetailsData={jdBasedDetailsData} setValue={setValue}/>
                      </TabPanel>
                        

                        <TabPanel>
                          <WorkExpJd experiences={experiences} setExperiences={setExperiences} register={register} jdBasedDetailsData={jdBasedDetailsData} errors={errors}/>
                        </TabPanel>

                        <TabPanel>
                         <LanguageJd 
                         languages={languages}
                          setLanguages={setLanguages}
                          jdBasedDetailsData={jdBasedDetailsData}
                          />
                        </TabPanel>

                        <TabPanel>
                          <SkillsJd register={register} errors={errors} skills={skills} setSkills={setSkills} jdBasedDetailsData={jdBasedDetailsData}/>
                        </TabPanel>

                        <TabPanel>
                          <PersonalProjectJd register={register} errors={errors} personalPro={personalPro} setPersonalPro={setPersonalPro} jdBasedDetailsData={jdBasedDetailsData}/>
                        </TabPanel>

                        <TabPanel>
                         <CertificatesJd register={register} errors={errors} certificates={certificates} setCertificates={setCertificates} jdBasedDetailsData={jdBasedDetailsData}/>
                        </TabPanel>

                        <TabPanel>  
                         <AchivmentsJd register={register} errors={errors} achivments={achivments} setAchivments={setAchivments} jdBasedDetailsData={jdBasedDetailsData}/>
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
              <MdPreview className='text-[#800080] text-2xl' />
              <h3 className='text-[16px] text-[#151515] font-medium'>Preview</h3>
            </div>
            <div className='lg:flex items-center gap-3'>
              <button onClick={() => setOpenModalAnalyzeResume(true)} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoStatsChart className='text-base' /> Analyze Resume</button>
              <button onClick={() => downloadDocx()} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5 mb-2 lg:mb-0'><IoMdDownload className='text-[18px]' /> Download DOCX</button>
              <button onClick={handlePrint} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download PDF</button>
            </div>
          </div>
          <div ref={componentRef} className='border border-[#E5E5E5] rounded-[8px] mb-4'>
             {/* <Image src={resume_sections_view} alt="resume_sections_view" className='' /> */}
             {
              template==="resume1"&&(
                <Template1 ref={componentRef} data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates}/>
              )
             }
             {
              template==="resume2"&&(
              <Template2 ref={componentRef} data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates}/>
              )
             }
             
          </div>
          <div className='flex items-center justify-between mb-0'>
            <div className='flex items-center gap-1'>
              <h3 className='text-[12px] text-[#060606] font-medium'>Template: <span className='text-[#6D6D6D]'>Modern</span></h3>
            </div>
            <div className='flex items-center gap-3'>
              <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5'> Change Template <AiOutlineArrowRight className='text-base' /></button>
            </div>
          </div>
        </div>

        {/* add modal for apply job start here */}
        <Modal size="3xl" className="apply_modal_area" show={openModalAnalyzeResume} onClose={() => setOpenModalAnalyzeResume(false)}>
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
          </Modal>
        {/* add modal for apply job ends here */}

        {/* add modal for apply job start here */}
        <Modal size="6xl" className="apply_modal_area" show={openModalAnalyzeResumeBig} onClose={() => setOpenModalAnalyzeResumeBig(false)}>
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
          </Modal>
        {/* add modal for apply job ends here */}
    </div>
  )
}

export default page