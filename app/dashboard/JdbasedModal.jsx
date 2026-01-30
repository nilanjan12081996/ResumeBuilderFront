// import { FileInput, Label, Modal, ModalBody, ModalHeader, Spinner, Textarea, TextInput } from "flowbite-react";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { BiImport } from "react-icons/bi";
// import { BsFillInfoCircleFill, BsGithub } from "react-icons/bs";
// import { FaGlobe } from "react-icons/fa";
// import { HiClipboardList } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { checkJdAts, getGeneratedQuestions, jdBasedResume, jdBasedResumeAchivmentInfo, jdBasedResumeBasicInfo, jdBasedResumeCertificateInfo, jdBasedResumeEducationInfo, jdBasedResumeExpInfo, jdBasedResumeLanguageInfo, jdBasedResumeProjectsInfo, jdBasedResumeSkillsInfo } from "../reducers/DashboardSlice";
// import JdAtsScoreModal from "../modal/JdAtsScoreModal";


// const JdbasedModal = ({ openModalImproveexistingResume,
//   setOpenModalImproveexistingResume,
//   setOpenModalCreateResumeJd,
//   setResumeId
// }) => {

//   const { loading } = useSelector((state) => state?.dash)
//   const dispatch = useDispatch()
//   const [showJdAtsModal, setShowJdAtsModal] = useState(false);
//   const [atsData, setAtsData] = useState(null);


//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const resumeFile = watch("resume_file");
//   useEffect(() => {
//     if (resumeFile && resumeFile[0]) {
//       console.log("Resume file selected:", resumeFile[0]);
//     }
//   }, [resumeFile]);

//   const onSubmit = (data) => {
//     console.log("Data", data);

//     const formData = new FormData()
//     if (data.resume_file && data.resume_file[0]) {

//       formData.append("resume_file", data.resume_file[0]);
//     } else {
//       console.error("No resume file selected");
//       toast.error("Please select a resume file to upload");
//       return;
//     }
//     {
//       (data?.linkedin_profile_file && data?.linkedin_profile_file[0]) && (
//         formData.append("linkedin_profile_file", data?.linkedin_profile_file[0])
//       )
//     }
//     {
//       data?.github_profile && (
//         formData.append("github_profile", data?.github_profile)
//       )
//     }
//     {
//       data?.portfolio_link && (
//         formData.append("portfolio_link", data?.portfolio_link)
//       )
//     }
//     {
//       data?.other_link && (
//         formData.append("other_link", data?.other_link)
//       )
//     }
//     formData.append("job_description", data?.job_description)

//     dispatch(jdBasedResume(formData)).then((res) => {
//       if (res?.payload?.status_code === 201) {
//         setResumeId(res?.payload?.data?.id)

//         const rawDataExperience = res?.payload?.raw_data?.experience?.steps?.[0]?.Experience;
//         if (rawDataExperience) {
//           localStorage.setItem('jd_resume_raw_experience', JSON.stringify(rawDataExperience));
//         }

//         const checkJdAtsPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           raw_data: res?.payload?.raw_data,
//           job_description: data?.job_description,
//         }
//         const questionPayload = {
//           jd_based_resume_id: res?.payload?.data?.id,
//           generated_questions: res?.payload?.generated_questions
//         }
//         const basicInfoPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           SuggestedRole: res?.payload?.raw_data?.suggested_role,
//           CandidateFullName: res?.payload?.raw_data?.full_name,
//           EmailAddress: res?.payload?.raw_data?.email,
//           PhoneNumber: res?.payload?.raw_data?.phone,
//           ProfessionalTitle: res?.payload?.raw_data?.professional_title,
//           Summary: res?.payload?.raw_data?.summary
//         }
//         const educationPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           data: res?.payload?.raw_data?.education
//         }
//         const expPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           data: res?.payload?.raw_data?.experience?.steps?.[0]?.Experience
//         }
//         const certPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           data: res?.payload?.raw_data?.certifications
//         }
//         const achPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           data: res?.payload?.raw_data?.achievements
//         }
//         const projectPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           data: res?.payload?.raw_data?.projects
//         }

//         const skillsPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           data: res?.payload?.raw_data?.skills
//         }
//         const langPayload = {
//           jd_resume_id: res?.payload?.data?.id,
//           data: res?.payload?.raw_data?.languages
//         }
//         try {
//           Promise.all(
//             [
//               dispatch(jdBasedResumeBasicInfo(basicInfoPayload)),
//               dispatch(jdBasedResumeEducationInfo(educationPayload)),
//               dispatch(jdBasedResumeExpInfo(expPayload))
//                 .then((res) => {
//                   if (res?.payload?.status_code === 200) {
//                     dispatch(getGeneratedQuestions(questionPayload));
//                   } else {
//                     console.log("Experience info failed");
//                   }
//                 })
//                 .catch((err) => {
//                   console.log("Error saving experience info:", err);
//                 }),
//               dispatch(jdBasedResumeCertificateInfo(certPayload)),
//               dispatch(jdBasedResumeAchivmentInfo(achPayload)),
//               dispatch(jdBasedResumeProjectsInfo(projectPayload)),
//               dispatch(jdBasedResumeSkillsInfo(skillsPayload)),
//               dispatch(jdBasedResumeLanguageInfo(langPayload)),
//               // dispatch(getGeneratedQuestions(questionPayload)),
//               dispatch(checkJdAts(checkJdAtsPayload))
//                 .then((atsRes) => {
//                   console.log('atsRes', atsRes);
//                   if (atsRes?.payload?.status === true) {
//                     setAtsData(atsRes?.payload?.data);
//                     setShowJdAtsModal(true);
//                   } else {
//                     toast.error("Failed to fetch ATS Score");
//                   }
//                 })
//             ]
//           )
//           //  alertContinueHandler();
//           setOpenModalCreateResumeJd(true)
//         } catch (error) {
//           console.error("Error while saving resume sections", error);
//           toast.error("Something went wrong while saving resume data");
//         }
//       }
//     })
//   }
//   return (
//     <>
//       <Modal
//         size="4xl"
//         className="apply_modal_area"
//         show={openModalImproveexistingResume}
//         onClose={() => setOpenModalImproveexistingResume(false)}
//       >
//         <ModalHeader className="bg-white text-black modal_header">
//           <div className="flex items-center gap-1">
//             <HiClipboardList className="text-[#800080] text-3xl" />
//             ATS Friendly Resume
//           </div>
//         </ModalHeader>
//         <ModalBody className="bg-white p-0 rounded-b-[4px]">
//           {
//             loading && (
//               <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
//                 <Spinner size="xl" color="purple" />
//                 <span className="ml-3 text-lg font-semibold text-purple-700">Processing...</span>
//               </div>
//             )
//           }
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="lg:flex gap-5 p-5">
//               <div className="lg:w-6/12 p-0 pr-0">
//                 <div className="resume_form_area">
//                   <div className="">
//                     {/* <div className="w-full resume_form_box mb-3">
//                             <div className="mb-1 block">
//                               <Label htmlFor="base">
//                                 LinkedIn Profile Link <span>*</span>
//                               </Label>
//                             </div>
//                             <div className="field_box flex items-center">
//                               <div className="p-3">
//                                 <BiLogoLinkedinSquare className="text-[#928F8F]" />
//                               </div>
//                               <TextInput
//                                 id="base"
//                                 type="text"
//                                 sizing="md"
//                                 placeholder="https://www.linkedin.com/in/johndoe"
//                               />
//                             </div>
//                           </div> */}

//                     <div className="w-full resume_form_box mb-3">
//                       <Label className="mb-2 block" htmlFor="file-upload">
//                         LinkedIn Profile PDF (if any)
//                       </Label>
//                       {/* <div className="field_box flex items-center">
//                                 <div className="p-3">
//                                 <FaLinkedin className="text-[#928F8F]" />
//                                 </div> */}

//                       <div>
//                         <FileInput
//                           id="file-upload"
//                           accept=".pdf" // Optional: Hint to the browser for PDF only
//                           helperText="Upload your PDF document (Max 5MB)"
//                           {...register("linkedin_profile_file", {
//                             required: false,
//                           })}
//                           aria-invalid={
//                             errors.linkedin_profile_file ? "true" : "false"
//                           }
//                         />
//                       </div>
//                       {errors.linkedin_profile_file?.type === "required" && (
//                         <p className="text-red-700 text-sm" role="alert">
//                           linkedin Profile File is required
//                         </p>
//                       )}
//                       {/* </div> */}
//                     </div>
//                     <div className="w-full resume_form_box mb-3">
//                       <div className="mb-1 block">
//                         <Label htmlFor="base">
//                           Portfolio Link
//                         </Label>
//                       </div>
//                       <div className="field_box flex items-center">
//                         <div className="p-3">
//                           <FaGlobe className="text-[#928F8F]" />
//                         </div>
//                         <TextInput
//                           id="base"
//                           type="text"
//                           sizing="md"
//                           placeholder="https://yourname.design"
//                           {...register("portfolio_link")}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="">
//                     <div className="w-full resume_form_box mb-3">
//                       <div className="mb-1 block">
//                         <Label htmlFor="base">
//                           GitHub Profile Link
//                         </Label>
//                       </div>
//                       <div className="field_box flex items-center">
//                         <div className="p-3">
//                           <BsGithub className="text-[#928F8F]" />
//                         </div>
//                         <TextInput
//                           id="base"
//                           type="text"
//                           sizing="md"
//                           placeholder="https://github.com/johndoe"
//                           {...register("github_profile")}
//                         />
//                       </div>
//                     </div>

//                     <div className="w-full resume_form_box mb-3">
//                       <div className="mb-1 block">
//                         <Label htmlFor="base">Portfolio Link</Label>
//                       </div>
//                       <div className="field_box flex items-center">
//                         <div className="p-3">
//                           <FaGlobe className="text-[#928F8F]" />
//                         </div>
//                         <TextInput
//                           id="portfolio_link"
//                           type="url"
//                           sizing="md"
//                           placeholder="https://yourname.design"
//                           {...register("portfolio_link", { required: false })}
//                           aria-invalid={
//                             errors.portfolio_link ? "true" : "false"
//                           }
//                         />
//                       </div>
//                       {errors.portfolio_link?.type === "required" && (
//                         <p className="text-red-700 text-sm" role="alert">
//                           portfolio_link link is required
//                         </p>
//                       )}
//                     </div>
//                     <div className="w-full resume_form_box mb-3">
//                       <div className="mb-1 block">
//                         <Label htmlFor="base">
//                           Other Link
//                         </Label>
//                       </div>
//                       <div className="field_box flex items-center">
//                         <div className="p-3">
//                           <BsFillInfoCircleFill className="text-[#928F8F]" />
//                         </div>
//                         <TextInput
//                           id="base"
//                           type="text"
//                           sizing="md"
//                           placeholder="https://mywebsite.com"
//                           {...register("other_link")}
//                         />
//                       </div>
//                     </div>
//                     <div className="w-full resume_form_box mb-3">
//                       <div className="mb-1 block">
//                         <Label htmlFor="base">
//                           Job Description <span>*</span>
//                         </Label>
//                       </div>
//                       <div className="flex items-center">
//                         <Textarea
//                           id="comment"
//                           placeholder="Write a little bit about your job..."

//                           rows={3}
//                           {...register("job_description", { required: "Job Description is Required" })}
//                         />
//                         {
//                           errors?.job_description && (
//                             <p className="text-red-700 text-sm" >
//                               {errors?.job_description.message}
//                             </p>
//                           )
//                         }
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="lg:w-6/12">
//                 <div className="flex w-full items-center justify-center">
//                   <Label
//                     htmlFor="dropzone-file"
//                     className="resume_upload_box_small flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//                   >
//                     <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                       <BiImport className="text-[70px] text-[#92278F]" />
//                       <p className="mb-2 text-xl text-[#92278F]">
//                         {/* Import your Resume */}
//                         {resumeFile && resumeFile[0]
//                           ? resumeFile[0].name
//                           : "Import your Resume"}
//                       </p>
//                       {resumeFile && resumeFile[0] && (
//                         <p className="text-sm text-green-600">
//                           File selected successfully
//                         </p>
//                       )}
//                     </div>
//                     <FileInput id="dropzone-file" className="hidden"
//                       accept=".pdf,.doc,.docx"
//                       {...register("resume_file", { required: true })}
//                       aria-invalid={errors.resume_file ? "true" : "false"}
//                     />
//                   </Label>
//                 </div>
//                 {errors.resume_file?.type === "required" && (
//                   <p className="text-red-700 text-sm" role="alert">
//                     Please upload the resume
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="p-5 inset-shadow-xs">
//               <button
//                 type="submit"
//                 //onClick={() => alertContinueHandler(true)}
//                 className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]"
//               >
//                 Continue
//               </button>
//             </div>
//           </form>
//         </ModalBody>
//       </Modal>
//       <JdAtsScoreModal
//         showJdAtsModal={showJdAtsModal}
//         setShowJdAtsModal={setShowJdAtsModal}
//         atsData={atsData}
//         setOpenModalCreateResumeJd={setOpenModalCreateResumeJd}
//       />

//     </>
//   )
// }
// export default JdbasedModal;

"use client";

import { FileInput, Label, Modal, ModalBody, ModalHeader, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiImport } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { improveResume, fetchMissingSkills } from "../reducers/DashboardSlice"; // adjust path

const JdbasedModal = ({ openModalImproveexistingResume, setOpenModalImproveexistingResume }) => {
  const [resumeFileName, setResumeFileName] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const resumeFile = watch("resume_file");
  const jobDescription = watch("job_description");

  useEffect(() => {
    if (resumeFile && resumeFile[0]) {
      setResumeFileName(resumeFile[0].name);
    }
  }, [resumeFile]);

  const handleResumeImprove = async (data) => {
    if (!data.resume_file || !data.resume_file[0]) {
      toast.error("Please select resume PDF");
      return;
    }
    if (!data.job_description) {
      toast.error("Job Description is required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume_pdf", data.resume_file[0]);

      // Step 1: Improve Resume / Extract Skills
      const improveRes = await dispatch(improveResume(formData));
      const improvePayload = improveRes?.payload;

      if (!improvePayload || improvePayload.status !== "success") {
        toast.error("Resume extraction failed: base resume issue");
        setLoading(false);
        return;
      }

      toast.success("Resume extracted successfully!");

      // Extract skills from resume data
      const resumeData = improvePayload.resume_data;

      // 1️⃣ Technical skills from categories
      const technicalCategories = resumeData.technical_skills?.categories || {};
      let technicalSkills = [];
      Object.values(technicalCategories).forEach((arr) => {
        technicalSkills = technicalSkills.concat(arr);
      });

      // 2️⃣ Soft skills
      const softSkills = resumeData.soft_skills || [];

      // Combine all skills into a single string
      const allSkills = [...technicalSkills, ...softSkills].join(", ");

      // Step 2: Call fetchMissingSkills
      const missingSkillsPayload = {
        security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID, // from env
        Skill: allSkills,
        JD: data.job_description
      };

      const missingSkillsRes = await dispatch(fetchMissingSkills(missingSkillsPayload));
      const missingSkillsData = missingSkillsRes?.payload;

      if (!missingSkillsData) {
        toast.error("Failed to fetch missing skills");
        setLoading(false);
        return;
      }

      console.log("Missing Skills Data:", missingSkillsData);
      toast.success("Missing skills fetched successfully!");

      // Redirect or further process
      router.push("/jd-resume-builder");

    } catch (error) {
      toast.error("Resume extraction failed: base resume issue");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    handleResumeImprove(data);
  };

  return (
    <Modal
      size="xl"
      className="apply_modal_area"
      show={openModalImproveexistingResume}
      onClose={() => setOpenModalImproveexistingResume(false)}
    >
      <ModalHeader className="bg-white text-black modal_header">
        ATS Friendly Resume
      </ModalHeader>
      <ModalBody className="bg-white p-5 rounded-b-[4px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Resume Upload Box */}
          <div className="flex flex-col items-center">
            <Label
              htmlFor="dropzone-file"
              className="resume_upload_box_small flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <BiImport className="text-[70px] text-[#92278F]" />
                <p className="mb-2 text-xl text-[#92278F]">
                  {resumeFileName || "Import your Resume"}
                </p>
                {resumeFileName && (
                  <p className="text-sm text-green-600">File selected successfully</p>
                )}
              </div>
              <FileInput
                id="dropzone-file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                {...register("resume_file", { required: "Please upload the resume" })}
              />
            </Label>
            {errors.resume_file && (
              <p className="text-red-700 text-sm mt-1">{errors.resume_file.message}</p>
            )}
          </div>

          {/* Job Description */}
          <div className="w-full resume_form_box">
            <div className="mb-1 block">
              <Label htmlFor="job_description">
                Job Description <span>*</span>
              </Label>
            </div>
            <Textarea
              id="job_description"
              placeholder="Write a little bit about your job..."
              rows={10}
              {...register("job_description", { required: "Job Description is required" })}
              aria-invalid={errors.job_description ? "true" : "false"}
            />
            {errors.job_description && (
              <p className="text-red-700 text-sm mt-1">{errors.job_description.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default JdbasedModal;
