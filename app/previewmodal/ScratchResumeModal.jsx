import { Modal, ModalBody, ModalHeader } from "flowbite-react"
import Template1 from "../temp/Template1"
import Template2 from "../temp/Template2"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getSingleResume } from "../reducers/ResumeSlice"
import { useForm } from "react-hook-form"

const ScratchResumeModal=({ openScratchModal,
          setOpenScratchModal,
        templateId,resumeId})=>{

    const{loading,singleResumeInfo}=useSelector((state)=>state?.resume)
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);
//   const searchParams = useSearchParams();
//    const template = searchParams.get("template");
//   const resumeId=searchParams.get("id")
  // const user_id=sessionStorage.getItem('user_id');c
  const user_id=localStorage.getItem('user_id')
  const parseUserId=JSON.parse(user_id)
  const[type,setType]=useState()
  const[isCreated,setIsCreated]=useState(false)


   const componentRef = useRef();
 

const dispatch=useDispatch()
useEffect(()=>{
dispatch(getSingleResume({id:resumeId}))
},[])
console.log("singleResumeInfo",singleResumeInfo);

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

  const formValues = watch();

   useEffect(()=>{
     setValue("full_name",singleResumeInfo?.data?.personal_info?.full_name)
        setValue("email",singleResumeInfo?.data?.personal_info?.email)
        setValue("phone",singleResumeInfo?.data?.personal_info?.phone)
        setValue("location",singleResumeInfo?.data?.personal_info?.location)
       setValue("title",singleResumeInfo?.data?.personal_info?.title)
       setValue("personal_web",singleResumeInfo?.data?.personal_info?.personal_web)
       setValue("github_profile",singleResumeInfo?.data?.personal_info?.github_profile)
       setValue("linkdin_profile",singleResumeInfo?.data?.personal_info?.linkdin_profile)
       setValue("goal",singleResumeInfo?.data?.personal_info?.goal)
    },[singleResumeInfo])


  useEffect(() => {
    if (singleResumeInfo?.data?.education_info?.length > 0) {
      const formattedEducation = singleResumeInfo.data?.education_info.map((edu) => ({
        id: edu.id,
        institution: edu.institution || "",
        location: edu.location || "",
        field_study: edu.field_study || "",
        degree: edu.degree || "",
        start_time: edu.start_time ? new Date(edu.start_time) : null,
        end_time: edu.end_time ? new Date(edu.end_time) : null,
        cgpa: edu.cgpa || "",
        additionalInfo: edu.information || "",
        currentlyStudying: !edu.end_time, // optional logic
      }));
      setEducationEntries(formattedEducation);
    }
  }, [singleResumeInfo]);

   useEffect(() => {
  if (singleResumeInfo?.data?.experience_info?.length > 0) {
    const formattedExperiences = singleResumeInfo.data.experience_info.map(exp => ({
      id: exp.id,
      company_name: exp.company || "",
      position: exp.position || "",
      location: exp.location || "",
      skill: exp.skill?.join(", ") || "", // convert array to string
      start_date: exp.start_time ? new Date(exp.start_time) : null,
      end_date: exp.end_time ? new Date(exp.end_time) : null,
      current_work: exp.current_work === 1, // convert 1/0 to boolean
      projects: exp.experience_project_info?.map(proj => ({
        id: proj.id,
        title: proj.project_title || "",
        role: proj.role || "",
        technology: proj.skill?.join(", ") || "", // again convert array to string
        description: proj.description || "",
      })) || []
    }));

    setExperiences(formattedExperiences);
  }
}, [singleResumeInfo]);

  useEffect(() => {
    if (singleResumeInfo?.data?.language_info?.length > 0) {
      const formattedLanguages = singleResumeInfo.data.language_info.map(lang => ({
        id: lang.id,
        language_name: lang.language_name || "",
        proficiency: lang.proficiency || "",
      }));
      setLanguages(formattedLanguages);
    }
  }, [singleResumeInfo]);
    useEffect(() => {
    if (singleResumeInfo?.data?.skill_info?.length > 0) {
      const formattedSkills = singleResumeInfo.data?.skill_info.map((sk) => ({
        id: sk.id,
        skill_category: sk.skill_category || "",
        skill: Array.isArray(sk.skill) ? sk.skill.join(", ") : sk.skill || "",
      }));
      setSkills(formattedSkills);
    }
  }, [singleResumeInfo]);

  useEffect(() => {
    if (singleResumeInfo?.data?.project_info?.length > 0) {
      const formattedProjects = singleResumeInfo.data.project_info.map((proj) => ({
        id: proj.id,
        project_title: proj.project_title || "",
        role: proj.role || "",
        start_time: proj.start_time ? new Date(proj.start_time) : null,
        end_time: proj.end_time ? new Date(proj.end_time) : null,
        project_url: proj.project_url || "",
        // convert skill array → comma-separated string
        skill: Array.isArray(proj.skill) ? proj.skill.join(", ") : proj.skill || "",
        description: proj.description || "",
      }));

      setPersonalPro(formattedProjects);
    }
  }, [singleResumeInfo]);


    useEffect(() => {
    if (singleResumeInfo?.data?.certificate_info?.length > 0) {
      const formattedCertificates = singleResumeInfo.data.certificate_info.map((cer) => ({
        id: cer.id,
        certification_name: cer.certification_name || "",
        issuing_organization: cer.issuing_organization || "",
        obtained_date: cer.obtained_date ? new Date(cer.obtained_date) : null,
        certification_id: cer.certification_id || "",
      }));
      setCertificates(formattedCertificates);
    }
  }, [singleResumeInfo]);

     useEffect(() => {
  if (singleResumeInfo?.data?.achievement_info?.length > 0) {
    const formattedAchievements = singleResumeInfo.data.achievement_info.map((ach) => ({
      id: ach.id,
      achievement_title: ach.achivements_title || "", // map spelling
      organization: ach.organization || "",
      receive_date: ach.receive_date ? new Date(ach.receive_date) : null,
      description: ach.description || "",
    }));

    setAchivments(formattedAchievements);
  }
}, [singleResumeInfo]);

    return(
        <>
         <Modal
                size="xl"
                className="apply_modal_area"
                show={openScratchModal}
                onClose={() => setOpenScratchModal(false)}
              >
                <ModalHeader className="bg-white text-black modal_header">
                 Preview
                </ModalHeader>
                <ModalBody className="bg-white p-0 rounded-b-[4px]">
                     <div  className='border border-[#E5E5E5] rounded-[8px] mb-4'>
             {/* <Image src={resume_sections_view} alt="resume_sections_view" className='' /> */}
             {
              templateId==1&&(
                <Template1  
                data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates}
                />
              )
             }
             {
              templateId==2&&(
              <Template2  
              data={formValues} education={educationEntries} experiences={experiences} skills={skills} languages={languages} personalPro={personalPro} achivments={achivments} certificates={certificates}
              />
              )
             }
             
          </div>
                </ModalBody>
              </Modal>
        </>
    )
}
export default ScratchResumeModal