"use client";

import React, { useEffect, useState } from "react";

import { Poppins } from "next/font/google";
import { League_Spartan } from "next/font/google";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { IoSearchOutline } from "react-icons/io5";
import {
  Select,
  Table,
  TextInput,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FileInput,
  Label,
  Textarea,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  checkAvilableSearch,
  getCoins,
  setIsClick,
} from "../reducers/CoinSlice";
import { FaArrowRightLong } from "react-icons/fa6";
import { getSearchHistory } from "../reducers/SearchHistroySlice";
import { toast, ToastContainer } from "react-toastify";

import Create_Resume_plus from "../assets/imagesource/Create_Resume_plus.png";
import Improve_existing_resume_icon from "../assets/imagesource/Improve_existing_resume_icon.png";
import jd_based_resume from "../assets/imagesource/jd_based_resume.png";

import resume1 from "../assets/imagesource/resum2.png";
import resume2 from "../assets/imagesource/resum1.png";

import view_full_resume from "../assets/imagesource/view_full_resume.png";

import resume_sections_view from "../assets/imagesource/resume_sections_view.png";

import { BiEdit } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";

import { CgArrowLeft } from "react-icons/cg";
import { BiImport } from "react-icons/bi";

import { HiClipboardList } from "react-icons/hi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { FaGlobe, FaLinkedin } from "react-icons/fa";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { BiLink } from "react-icons/bi";

import { BiPlus } from "react-icons/bi";
import { RiExchange2Line } from "react-icons/ri";
import { BiBriefcaseAlt } from "react-icons/bi";
import { BiLogoLinkedin } from "react-icons/bi";
import { getRecentResume } from "../reducers/ResumeHistorySlice";

import { useForm } from "react-hook-form";
import { addImpQuestions, checkATS, getUpdateResumeInfo, improveResume, updateAchievements, updateBasicInfo, updateCertification, updateEducation, updateExperience, updateExtraProject, updateLanguage, updateSkills } from "../reducers/DashboardSlice";
import JdbasedModal from "./JdbasedModal";
import JdBasedChooseModal from "./JdBasedChooseModal";
import LinkedInReWriteModal from "./LinkedInReWriteModal";
import LinkedInChooseModal from "./LinkedInChooseModal";
import ImproveResumeChooseModal from "./ImproveResumeChooseModal";
import { addCountResume, addCountResumeOrg } from "../reducers/ResumeSlice";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // specify desired weights
  display: "swap",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // specify desired weights
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"], // or ['latin-ext'] etc.
  weight: ["400", "500", "600", "700"], // specify desired weights
  variable: "--font-inter", // optional, for Tailwind usage
});

const Page = () => {
  const { recentResume } = useSelector((state) => state?.resHist);
  const { profData } = useSelector((state) => state?.auth);
  const { profileData } = useSelector((state) => state?.profile)
  console.log("profData", profData);

  const router = useRouter();
  const dispatch = useDispatch();
  const { error, improveResumeData, loading } = useSelector(
    (state) => state.dash
  );
  const [openModalCreateResume, setOpenModalCreateResume] = useState(false);
  const [openModalCreateResumeJd, setOpenModalCreateResumeJd] = useState(false);
  const [openModalCreateResumeLinkedIn, setOpenModalCreateResumeLinkedIn] =
    useState(false);
  const [resumeId, setResumeId] = useState();
  const [resumeIdLkdin, setResumeIdLkdin] = useState();
  const [openModalImproveexistingResume, setOpenModalImproveexistingResume] =
    useState(false);
  const [openModalAlertModal, setOpenModalAlertModal] = useState(false);

  const [
    openModalImproveExistingResumeTwo,
    setOpenModalImproveExistingResumeTwo,
  ] = useState(false);
  const [openImproveResumeChooseModal, setOpenImproveResumeChooseModal] =
    useState(false);
  const [improveResumeId, setImproveResumeId] = useState();

  const [openModalLinkedInRewrite, setOpenModalLinkedInRewrite] =
    useState(false);
  const [openATSmodal, setopenATSmodal] = useState(false);
  const [ATSscore, setATSscore] = useState(0);


  const alertContinueHandler = () => {
    setOpenModalImproveexistingResume(false);
    setOpenModalAlertModal(true);
  };


  const HandlerLinkedInRewrite = (id) => {
    const encodedId = btoa(id);
    router.push(`/linkedIn-rewrite?id=${encodedId}`);
  };


  // clear file input
  const clearFileInput = () => {
    const fileInput1 = document.getElementById("dropzone-file");

    if (fileInput1) {
      fileInput1.value = "";
    }

  };


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch the resume_file field to see if it changes
  const resumeFile = watch("resume_file");
  console.log("improveResumeData", improveResumeData);

  useEffect(() => {
    if (resumeFile && resumeFile[0]) {
      console.log("Resume file selected:", resumeFile[0]);
    }
  }, [resumeFile]);

  // const handleResumeImprove = (data) => {
  //   console.log("Form data received:", data);
  //   console.log("Resume file:", data.resume_file);

  //   const formData = new FormData();

  //   if (data.resume_file && data.resume_file[0]) {
  //     console.log("Appending resume file:", data.resume_file[0]);
  //     formData.append("resume_file", data.resume_file[0]);
  //   } else {
  //     console.error("No resume file selected");
  //     // alert("Please select a resume file to upload");
  //     toast.error("Please select a resume file to upload");
  //     return;
  //   }
  //   data.linkedin_profile &&
  //     formData.append("linkedin_profile", data.linkedin_profile);
  //   data.portfolio_link &&
  //     formData.append("portfolio_link", data.portfolio_link);
  //   data.github_profile &&
  //     formData.append("github_profile", data.github_profile);
  //   data.other_link && formData.append("other_link", data.other_link);

  //   console.log("FormData contents:");
  //   for (let [key, value] of formData.entries()) {
  //     console.log(key, value);
  //   }

  //   dispatch(improveResume(formData))
  //     .then(async (res) => {
  //       const payload = res?.payload;
  //       console.log("payload", payload);

  //       // ✅ Only success case
  //       if (payload?.status_code !== 201) return;

  //       /* ===================== RESUME ID ===================== */
  //       const resumeid = payload?.data?.id;
  //       setImproveResumeId(resumeid);

  //       /* ===================== RAW EXPERIENCE (LOCAL STORAGE) ===================== */
  //       const rawDataExperience =
  //         payload?.raw_data?.experience?.steps?.[0]?.Experience;

  //       if (rawDataExperience) {
  //         localStorage.setItem(
  //           "imp_resume_raw_experience",
  //           JSON.stringify(rawDataExperience)
  //         );
  //       }

  //       const raw = payload?.raw_data || {};
  //       /* ===================== BASIC INFO ===================== */
  //       const basicInfoData = {
  //         SuggestedRole: raw?.suggested_role || "",
  //         CandidateFullName: raw?.full_name || "",
  //         EmailAddress: raw?.email || "",
  //         PhoneNumber: raw?.phone || "",
  //         ProfessionalTitle: raw?.professional_title || "",
  //         Summary: raw?.summary || "",
  //         location: raw?.location || "",
  //       };

  //       await dispatch(
  //         updateBasicInfo({
  //           resumeid: resumeid,  
  //           data: basicInfoData       
  //         })
  //       );

  //       /* ===================== EXPERIENCE ===================== */
  //       const experiencePayload =
  //         raw?.experience?.steps?.[0]?.Experience?.map((exp) => ({
  //           id: null,
  //           CompanyName: exp?.CompanyName || "",
  //           Position: exp?.Position || "",
  //           Duration: {
  //             StartDate: exp?.Duration?.StartDate || "",
  //             EndDate: exp?.Duration?.EndDate || "",
  //           },
  //           Location: exp?.Location || "",
  //           SkillSet: exp?.SkillSet || [],
  //           Projects: exp?.Projects?.map((proj) => ({
  //             id: null,
  //             Project_title: proj?.Project_title || "",
  //             Role: proj?.Role || "",
  //             Description: proj?.Description || "",
  //           })) || [],
  //         })) || [];

  //       if (experiencePayload.length) {
  //         await dispatch(updateExperience({ resumeid, data: experiencePayload }));
  //       }

  //       /* ===================== EDUCATION ===================== */
  //       const educationPayload =
  //         raw?.education?.map((edu) => ({
  //           id: null,
  //           CollegeUniversity: edu?.CollegeUniversity || "",
  //           Location: edu?.Location || "",
  //           CourseDegree: edu?.CourseDegree || "",
  //           GraduationYear: edu?.GraduationYear
  //             ? String(edu.GraduationYear)
  //             : "",
  //           GPAorGrade:
  //             edu?.GPAorGrade && Number(edu.GPAorGrade) !== 0
  //               ? String(edu.GPAorGrade)
  //               : "",
  //           AdditionalInformation: edu?.AdditionalInformation || "",
  //         })) || [];

  //       if (educationPayload.length) {
  //         await dispatch(updateEducation({ resumeid, data: educationPayload }));
  //       }

  //       /* ===================== SKILLS ===================== */
  //       const skillsPayload =
  //         raw?.skills?.map((sk) => ({
  //           id: null,
  //           Skill_Category: sk?.Skill_Category || "",
  //           Skills: sk?.Skills || [],
  //         })) || [];

  //       if (skillsPayload.length) {
  //         await dispatch(updateSkills({ resumeid, data: skillsPayload }));
  //       }

  //       /* ===================== LANGUAGES ===================== */
  //       const languagePayload =
  //         raw?.languages?.map((lang) => ({
  //           id: null,
  //           Language: lang?.Language || "",
  //           proficiency: lang?.Proficiency || "",
  //         })) || [];

  //       if (languagePayload.length) {
  //         await dispatch(updateLanguage({ resumeid, data: languagePayload }));
  //       }

  //       /* ===================== ACHIEVEMENTS ===================== */
  //       const achievementPayload =
  //         raw?.achievements?.map((ach) => ({
  //           id: null,
  //           Achievement_Titlee: ach?.Achievement_Titlee || "",
  //           Issuing_Organization: ach?.Issuing_Organization || "",
  //           Date_Received: ach?.Date_Received || "",
  //           Description: ach?.Description || "",
  //         })) || [];

  //       if (achievementPayload.length) {
  //         await dispatch(
  //           updateAchievements({ resumeid, data: achievementPayload })
  //         );
  //       }

  //       /* ===================== ATS CHECK ===================== */
  //       const atsRes = await dispatch(
  //         checkATS({
  //           imp_resume_id: resumeid,
  //           raw_data: raw,
  //         })
  //       );

  //       if (atsRes?.payload?.status_code === 200) {
  //         setATSscore(atsRes?.payload?.data?.old_ats);
  //         setopenATSmodal(true);
  //       }

  //       /* ===================== QUESTIONS ===================== */
  //       if (payload?.generated_questions) {
  //         await dispatch(
  //           addImpQuestions({
  //             imp_resume_id: resumeid,
  //             generated_questions: payload.generated_questions,
  //           })
  //         );
  //       }

  //       /* ===================== FINAL FETCH ===================== */
  //       await dispatch(getUpdateResumeInfo({ id: resumeid }));

  //       console.log("✅ Resume improve flow completed successfully");
  //     })
  //     .catch(() => {
  //       toast.error("Something went wrong while improving resume");
  //     })
  //     .finally(() => {
  //       clearFileInput();
  //     });



  // };

const handleResumeImprove = (data) => {
  if (!data.resume_file || !data.resume_file[0]) {
    toast.error("Please select resume PDF");
    return;
  }

  const formData = new FormData();
  formData.append("resume_pdf", data.resume_file[0]);

 dispatch(improveResume(formData))
  .then((res) => {
    console.log("spres", res);

    const payload = res?.payload;
    if (!payload || payload.status !== "success") {
      toast.error("Resume improve failed");
      return;
    }

    router.push("/improve-resume-builder");
  })
  .catch(() => {
    toast.error("Resume improve failed");
  });
};


  const onSubmit = (data) => {
    handleResumeImprove(data);
  };


  useEffect(() => {
    dispatch(getRecentResume()).then((res) => {
      console.log("Recent resume data:", res);
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Day
    const day = date.getDate();

    // Month (full name)
    const month = date.toLocaleString("en-US", { month: "long" });

    // Year
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  // ATS data modal
  const max = 100;
  const size = 124;
  const strokeWidth = 10;
  const label = "Current Resume ATS Score";
  const className = "";
  const clamped = Math.max(0, Math.min(ATSscore, max));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (clamped / max) * circumference;

  const isGood = clamped >= 70;
  const ringColor = isGood
    ? "#16a34a" /* tailwind green-600 */
    : "#ef4444"; /* red-500 */
  const badgeBg = isGood
    ? "bg-green-50 text-green-700"
    : "bg-red-50 text-red-700";

  return (
    <div className={`${inter.className} antialiased`}>
      <ToastContainer />
      <div className="mb-0">
        <div className="main-content p-4">
          <div className="welcome_area py-8 px-9 rounded-[10px] mb-10">
            <h3 className="text-[22px] lg:leading-[22px] leading-[30px] text-white font-semibold mb-4">
              Welcome to ResumeMile, {profData?.data?.fullname}!
            </h3>
            <p className="text-[18px] leading-[25px] text-white font-normal mb-0 lg:pr-20">
              Create a professional resume in minutes with our easy-to-use
              builder. Choose from our collection of templates and get hired
              faster.
            </p>
          </div>
          <div className="mb-10">
            <h3 className="text-[20px] leading-[20px] text-[#151515] font-medium mb-6">
              Quick Actions
            </h3>
            <div className="flex gap-4">
              <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setOpenModalCreateResume(true)}
                  className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
                >
                  <div className="bg-[#DBFCE7] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
                    <BiPlus className="text-[#00A63E] text-[30px]" />
                  </div>
                  <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
                    Create Resume From Scratch
                  </h3>
                  <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
                    Start fresh with a new resume using our professional
                    templates
                  </p>
                </div>
                <div
                  onClick={() => setOpenModalImproveExistingResumeTwo(true)}
                  className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
                >
                  <div className="bg-[#DBEAFE] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
                    <RiExchange2Line className="text-[#2B7FFF] text-[30px]" />
                  </div>
                  <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
                    Improve existing resume
                  </h3>
                  <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
                    Upload and enhance your current resume with AI-powered
                    suggestions
                  </p>
                </div>
                <div
                  onClick={() => setOpenModalImproveexistingResume(true)}
                  className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
                >
                  <div className="bg-[#FFEDD4] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
                    <BiBriefcaseAlt className="text-[#FF886D] text-[30px]" />
                  </div>
                  <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
                    JD based resume
                  </h3>
                  <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
                    Upload and enhance your current resume with AI-powered
                    suggestions
                  </p>
                </div>
                <div
                  onClick={() => setOpenModalLinkedInRewrite(true)}
                  className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
                >
                  <div className="bg-[#EAD9FF] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
                    <BiLogoLinkedin className="text-[#9747FF] text-[30px]" />
                  </div>
                  <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
                    LinkedIn Rewrite
                  </h3>
                  <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
                    Get AI-powered suggestions to enhance and optimize your
                    LinkedIn profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-14">
            <h3 className="text-[20px] leading-[20px] text-[#151515] font-medium mb-6">
              Recent Resumes
            </h3>
            <div className="lg:flex gap-4 pb-8 lg:pb-0">
              <div className="lg:w-8/12">
                {recentResume?.length === 0 ? (
                  <div className="bg-white text-[#7D7D7D]">
                    No recent resumes found.
                  </div>
                ) : (
                  recentResume?.map((resume) => (
                    <div
                      key={resume.id}
                      className="flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] px-5 py-4 mb-4"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center">
                          <CgFileDocument className="text-white text-2xl" />
                        </div>
                        <div>
                          <h3 className="text-[#151515] text-sm lg:text-base font-medium mb-1">
                            {resume.resume_name}
                          </h3>
                          <p className="text-[#7D7D7D] text-xs lg:text-sm">
                            Created on {formatDate(resume.created_at)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <Link
                          href={
                            resume.resume_type === "scratch_resume"
                              ? `/resume-builder-edit?id=${resume.id}&template=${resume?.template_detail?.[0]?.templete_id}`
                              : resume.resume_type === "linkedin_resume"
                                ? `/linkedIn-rewrite?id=${btoa(
                                  resume.id.toString()
                                )}`
                                : resume.resume_type === "jd_based_resume"
                                  ? `/jd-resume-builder?id=${btoa(
                                    resume.id.toString()
                                  )}&template=${resume?.template_detail?.[0]?.templete_id
                                  }`
                                  : resume.resume_type === "improve_resume"
                                    ? `/improve-resume-builder?id=${btoa(
                                      resume.id.toString()
                                    )}&template=${resume?.template_detail?.[0]?.templete_id
                                    }`
                                    : ""
                          }
                          className="text-xl text-[#797979] hover:text-[#A635A2] cursor-pointer"
                        >
                          <BiEdit />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="lg:w-4/12 border bg-white border-[#D5D5D5] rounded-[10px] px-6 py-7">
                <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
                  Resume Writing Tips
                </h3>
                <ul className="pl-4.5">
                  <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
                    Keep your resume to 1-2 pages maximum
                  </li>
                  <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
                    Use action verbs to describe your achievements
                  </li>
                  <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
                    Tailor your resume for each job application
                  </li>
                  <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
                    Include relevant keywords from the job posting
                  </li>
                  <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
                    Preview carefully before submitting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      {openModalCreateResumeJd && (
        <JdBasedChooseModal
          openModalCreateResumeJd={openModalCreateResumeJd}
          setOpenModalCreateResumeJd={setOpenModalCreateResumeJd}
          resumeId={resumeId}
        />
      )}

      {openModalCreateResumeLinkedIn && (
        <LinkedInChooseModal
          openModalCreateResumeLinkedIn={openModalCreateResumeLinkedIn}
          setOpenModalCreateResumeLinkedIn={setOpenModalCreateResumeLinkedIn}
        />
      )}

      {/* add modal for apply job ends here */}

      {/* add modal for JD Based here */}

      {openModalImproveexistingResume && (
        <JdbasedModal
          openModalImproveexistingResume={openModalImproveexistingResume}
          setOpenModalImproveexistingResume={setOpenModalImproveexistingResume}
          alertContinueHandler={alertContinueHandler}
          setOpenModalCreateResume={setOpenModalCreateResume}
          setOpenModalCreateResumeJd={setOpenModalCreateResumeJd}
          setResumeId={setResumeId}
        />
      )}

      {/* add modal for JD Based ends here */}

      {/* add modal for Alert start here */}
      <Modal
        size="xl"
        className="apply_modal_area"
        show={openModalAlertModal}
        onClose={() => setOpenModalAlertModal(false)}
      >
        <ModalHeader className="bg-white text-black border-0">
          <div className="flex items-center gap-1">Alert</div>
        </ModalHeader>
        <ModalBody className="bg-white p-0 rounded-b-[4px]">
          <p className="text-[#414141] text-[14px] leading-[24px] pt-0 px-6">
            According to the Job Description, your resume is missing the
            following: Python, SQL, Leadership. Please add these skills with
            relevant projects or experience to make your resume stronger and
            better aligned with the role.
          </p>
          <div className="p-5">
            <button
              onClick={() => true}
              className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]"
            >
              Continue
            </button>
          </div>
        </ModalBody>
      </Modal>
      {/* add modal for Alert ends here */}

      {/* add modal for apply job start here */}
      <Modal
        size="4xl"
        className="apply_modal_area"
        show={openModalImproveExistingResumeTwo}
        onClose={() => setOpenModalImproveExistingResumeTwo(false)}
      >
        <ModalHeader className="bg-white text-black modal_header">
          <div className="flex items-center gap-1">
            <HiClipboardList className="text-[#800080] text-3xl" />
            Improve Existing Resume
          </div>
        </ModalHeader>
        <ModalBody className="bg-white p-0 rounded-b-[4px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:flex gap-5 p-5">
              <div className="lg:w-6/12 p-0 pr-0">
                <div className="resume_form_area">
                  <div className="">
                    <div className="w-full resume_form_box mb-3">
                      <Label className="mb-2 block" htmlFor="file-upload">
                        LinkedIn Profile PDF
                      </Label>
                      <div>
                        <FileInput
                          id="file-upload"
                          accept=".pdf" // Optional: Hint to the browser for PDF only
                          helperText="Upload your PDF document (Max 5MB)"
                          {...register("linkedin_profile_file", {
                            required: false,
                          })}
                          aria-invalid={
                            errors.linkedin_profile_file ? "true" : "false"
                          }
                        />
                      </div>
                      {errors.linkedin_profile_file?.type === "required" && (
                        <p className="text-red-700 text-sm" role="alert">
                          linkedin_profile_file is required
                        </p>
                      )}
                      {/* </div> */}
                    </div>
                    <div className="w-full resume_form_box mb-3">
                      <div className="mb-1 block">
                        <Label htmlFor="base">Portfolio Link</Label>
                      </div>
                      <div className="field_box flex items-center">
                        <div className="p-3">
                          <FaGlobe className="text-[#928F8F]" />
                        </div>
                        <TextInput
                          id="portfolio_link"
                          type="url"
                          sizing="md"
                          placeholder="https://yourname.design"
                          {...register("portfolio_link", { required: false })}
                          aria-invalid={
                            errors.portfolio_link ? "true" : "false"
                          }
                        />
                      </div>
                      {errors.portfolio_link?.type === "required" && (
                        <p className="text-red-700 text-sm" role="alert">
                          portfolio_link link is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <div className="w-full resume_form_box mb-3">
                      <div className="mb-1 block">
                        <Label htmlFor="base">GitHub Profile Link</Label>
                      </div>
                      <div className="field_box flex items-center">
                        <div className="p-3">
                          <BsGithub className="text-[#928F8F]" />
                        </div>
                        <TextInput
                          id="github_profile"
                          type="url"
                          sizing="md"
                          placeholder="https://github.com/johndoe"
                          {...register("github_profile", { required: false })}
                          aria-invalid={
                            errors.github_profile ? "true" : "false"
                          }
                        />
                      </div>
                      {errors.github_profile?.type === "required" && (
                        <p className="text-red-700 text-sm" role="alert">
                          github_profile link is required
                        </p>
                      )}
                    </div>
                    <div className="w-full resume_form_box mb-3">
                      <div className="mb-1 block">
                        <Label htmlFor="base">More About Candidate</Label>
                      </div>
                      <div className="field_box flex items-center">
                        <div className="p-3">
                          <BiLink className="text-[#928F8F]" />
                        </div>
                        <TextInput
                          id="base"
                          type="url"
                          sizing="md"
                          placeholder="Additional Info Link"
                          {...register("other_link", { required: false })}
                          aria-invalid={errors.other_link ? "true" : "false"}
                        />
                      </div>
                      {errors.other_link?.type === "required" && (
                        <p className="text-red-700 text-sm" role="alert">
                          other_link link is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-6/12">
                <div className="flex w-full items-center justify-center">
                  <Label
                    htmlFor="dropzone-file"
                    className="resume_upload_box_small flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <BiImport className="text-[50px] lg:text-[70px] text-[#92278F]" />
                      <p className="mb-2 text-base lg:text-xl text-[#92278F]">
                        {resumeFile && resumeFile[0]
                          ? resumeFile[0].name
                          : "Import your Resume"}
                      </p>
                      {resumeFile && resumeFile[0] && (
                        <p className="text-sm text-green-600">
                          File selected successfully
                        </p>
                      )}
                    </div>
                    <FileInput
                      id="dropzone-file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      {...register("resume_file", { required: true })}
                      aria-invalid={errors.resume_file ? "true" : "false"}
                    />
                  </Label>
                </div>
                {errors.resume_file?.type === "required" && (
                  <p className="text-red-700 text-sm" role="alert">
                    Please upload the resume
                  </p>
                )}
              </div>
            </div>
            <div className="p-5 inset-shadow-xs">
              <button
                disabled={loading}
                className={`bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-white font-semibold w-full text-center rounded-[7px] 
    ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      {openModalLinkedInRewrite && (
        <LinkedInReWriteModal
          openModalLinkedInRewrite={openModalLinkedInRewrite}
          setOpenModalLinkedInRewrite={setOpenModalLinkedInRewrite}
          HandlerLinkedInRewrite={HandlerLinkedInRewrite}
          setOpenModalCreateResumeLinkedIn={setOpenModalCreateResumeLinkedIn}
          resumeIdLkdin={resumeIdLkdin}
          setResumeIdLkdin={setResumeIdLkdin}
        />
      )}

      {openImproveResumeChooseModal && (
        <ImproveResumeChooseModal
          openImproveResumeChooseModal={openImproveResumeChooseModal}
          setOpenImproveResumeChooseModal={setOpenImproveResumeChooseModal}
          improveResumeId={improveResumeId}
        />
      )}
    </div>
  );
};

export default Page;
