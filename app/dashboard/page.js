"use client";

import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { League_Spartan } from "next/font/google";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

import { BiEdit } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { BiPlus } from "react-icons/bi";
import { RiExchange2Line } from "react-icons/ri";
import { BiBriefcaseAlt } from "react-icons/bi";
import { BiLogoLinkedin } from "react-icons/bi";

import { getRecentResume } from "../reducers/ResumeHistorySlice";
import JdbasedModal from "./JdbasedModal";
import ImproveExistingModal from "./ImproveExistingModal";
import LinkedInReWriteModal from "./LinkedInReWriteModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const Page = () => {
  const { recentResume } = useSelector((state) => state?.resHist);
  const { profData } = useSelector((state) => state?.auth);

  const router = useRouter();
  const dispatch = useDispatch();

  // Modal states
  const [openModalImproveexistingResume, setOpenModalImproveexistingResume] = useState(false); // JD Based
  const [openModalImproveExistingResumeTwo, setOpenModalImproveExistingResumeTwo] = useState(false); // Improve Existing
  const [openModalLinkedInRewrite, setOpenModalLinkedInRewrite] = useState(false); // LinkedIn
  const [openModalAlertModal, setOpenModalAlertModal] = useState(false);
  const [openModalCreateResumeJd, setOpenModalCreateResumeJd] = useState(false);
  const [resumeId, setResumeId] = useState();

  useEffect(() => {
    dispatch(getRecentResume());
  }, []);

  return (
    <div className={`${inter.className} antialiased`}>
      <ToastContainer />
      <div className="mb-0">
        <div className="main-content p-4">

          {/* Welcome */}
          <div className="welcome_area py-8 px-9 rounded-[10px] mb-10">
            <h3 className="text-[22px] lg:leading-[22px] leading-[30px] text-white font-semibold mb-4">
              Welcome to ResumeMile, {profData?.data?.fullname}!
            </h3>
            <p className="text-[18px] leading-[25px] text-white font-normal mb-0 lg:pr-20">
              Create a professional resume in minutes with our easy-to-use builder.
              Choose from our collection of templates and get hired faster.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h3 className="text-[20px] leading-[20px] text-[#151515] font-medium mb-6">
              Quick Actions
            </h3>
            <div className="flex gap-4">
              <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">

                {/* Create from Scratch */}
                <div
                  onClick={() => router.push("/resume-builder")}
                  className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
                >
                  <div className="bg-[#DBFCE7] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
                    <BiPlus className="text-[#00A63E] text-[30px]" />
                  </div>
                  <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
                    Create Resume From Scratch
                  </h3>
                  <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
                    Start fresh with a new resume using our professional templates
                  </p>
                </div>

                {/* Improve Existing Resume */}
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
                    Upload and enhance your current resume with AI-powered suggestions
                  </p>
                </div>

                {/* JD Based Resume */}
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
                    Tailor your resume to any job description with AI assistance
                  </p>
                </div>

                {/* LinkedIn Rewrite */}
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
                    Get AI-powered suggestions to enhance and optimize your LinkedIn profile.
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* Recent Resumes */}
          <div className="mb-14">
            <h3 className="text-[20px] leading-[20px] text-[#151515] font-medium mb-6">
              Recent Resumes
            </h3>
            <div className="lg:flex gap-4 pb-8 lg:pb-0">
              <div className="lg:w-8/12">
                {recentResume?.length === 0 ? (
                  <div className="bg-white text-[#7D7D7D]">No recent resumes found.</div>
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
                                ? `/linkedIn-rewrite?id=${btoa(resume.id.toString())}`
                                : resume.resume_type === "jd_based_resume"
                                  ? `/jd-resume-builder?id=${btoa(resume.id.toString())}&template=${resume?.template_detail?.[0]?.templete_id}`
                                  : resume.resume_type === "improve_resume"
                                    ? `/improve-resume-builder?id=${btoa(resume.id.toString())}&template=${resume?.template_detail?.[0]?.templete_id}`
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

      {/* 1. JD Based Resume Modal */}
      <JdbasedModal
        open={openModalImproveexistingResume}
        onClose={() => setOpenModalImproveexistingResume(false)}
      />

      {/* 2. Improve Existing Resume Modal */}
      <ImproveExistingModal
        open={openModalImproveExistingResumeTwo}
        onClose={() => setOpenModalImproveExistingResumeTwo(false)}
      />

      {/* 3. LinkedIn Rewrite Modal */}
      <LinkedInReWriteModal
        open={openModalLinkedInRewrite}
        onClose={() => setOpenModalLinkedInRewrite(false)}
      />

      

      {/* 5. Alert Modal */}
      <Modal
        size="xl"
        className="apply_modal_area"
        show={openModalAlertModal}
        onClose={() => setOpenModalAlertModal(false)}
      >
        <ModalHeader className="bg-white text-black border-0">
          Alert
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
              onClick={() => setOpenModalAlertModal(false)}
              className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-white font-semibold w-full text-center rounded-[7px]"
            >
              Continue
            </button>
          </div>
        </ModalBody>
      </Modal>

    </div>
  );
};

export default Page;




// "use client";

// import React, { useEffect, useState } from "react";

// import { Poppins } from "next/font/google";
// import { League_Spartan } from "next/font/google";
// import { Inter } from "next/font/google";
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Modal,
//   ModalBody,
//   ModalHeader,
//   FileInput,
//   Label,
// } from "flowbite-react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";


// import { BiEdit } from "react-icons/bi";
// import { CgFileDocument } from "react-icons/cg";

// import { BiImport } from "react-icons/bi";

// import { HiClipboardList } from "react-icons/hi";

// import { BiPlus } from "react-icons/bi";
// import { RiExchange2Line } from "react-icons/ri";
// import { BiBriefcaseAlt } from "react-icons/bi";
// import { BiLogoLinkedin } from "react-icons/bi";
// import { getRecentResume } from "../reducers/ResumeHistorySlice";

// import { useForm } from "react-hook-form";
// import { extracteResume } from "../reducers/DashboardSlice";
// import JdbasedModal from "./JdbasedModal";
// import JdBasedChooseModal from "./JdBasedChooseModal";
// import LinkedInReWriteModal from "./LinkedInReWriteModal";


// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"], // specify desired weights
//   display: "swap",
// });

// const leagueSpartan = League_Spartan({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"], // specify desired weights
//   display: "swap",
// });

// const inter = Inter({
//   subsets: ["latin"], // or ['latin-ext'] etc.
//   weight: ["400", "500", "600", "700"], // specify desired weights
//   variable: "--font-inter", // optional, for Tailwind usage
// });

// const Page = () => {
//   const { recentResume } = useSelector((state) => state?.resHist);
//   const { profData } = useSelector((state) => state?.auth);
//   console.log("profData", profData);

//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { error, extracteResumeData, loading } = useSelector(
//     (state) => state.dash
//   );
//   const [openModalCreateResume, setOpenModalCreateResume] = useState(false);
//   const [openModalCreateResumeJd, setOpenModalCreateResumeJd] = useState(false);
//   const [openModalCreateResumeLinkedIn, setOpenModalCreateResumeLinkedIn] =
//     useState(false);
//   const [resumeId, setResumeId] = useState();
//   const [resumeIdLkdin, setResumeIdLkdin] = useState();
//   const [openModalImproveexistingResume, setOpenModalImproveexistingResume] =
//     useState(false);
//   const [openModalAlertModal, setOpenModalAlertModal] = useState(false);

//   const [
//     openModalImproveExistingResumeTwo,
//     setOpenModalImproveExistingResumeTwo,
//   ] = useState(false);
//   const [openImproveResumeChooseModal, setOpenImproveResumeChooseModal] =
//     useState(false);
//   const [improveResumeId, setImproveResumeId] = useState();

//   const [openModalLinkedInRewrite, setOpenModalLinkedInRewrite] =
//     useState(false);
//   const [openATSmodal, setopenATSmodal] = useState(false);
//   const [ATSscore, setATSscore] = useState(0);


//   const alertContinueHandler = () => {
//     setOpenModalImproveexistingResume(false);
//     setOpenModalAlertModal(true);
//   };




//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   // Watch the resume_file field to see if it changes
//   const resumeFile = watch("resume_file");
//   console.log("extracteResumeData", extracteResumeData);

//   useEffect(() => {
//     if (resumeFile && resumeFile[0]) {
//       console.log("Resume file selected:", resumeFile[0]);
//     }
//   }, [resumeFile]);

  
// const handleResumeImprove = (data) => {
//   if (!data.resume_file || !data.resume_file[0]) {
//     toast.error("Please select resume PDF");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("resume_pdf", data.resume_file[0]);

//  dispatch(extracteResume(formData))
//   .then((res) => {
//     console.log("spres", res);

//     const payload = res?.payload;
//     if (!payload || payload.status !== "success") {
//       toast.error("Resume improve failed");
//       return;
//     }

//     router.push("/improve-resume-builder");
//   })
//   .catch(() => {
//     toast.error("Resume improve failed");
//   });
// };


//   const onSubmit = (data) => {
//     handleResumeImprove(data);
//   };


//   useEffect(() => {
//     dispatch(getRecentResume()).then((res) => {
//       console.log("Recent resume data:", res);
//     });
//   }, []);



//   return (
//     <div className={`${inter.className} antialiased`}>
//       <ToastContainer />
//       <div className="mb-0">
//         <div className="main-content p-4">
//           <div className="welcome_area py-8 px-9 rounded-[10px] mb-10">
//             <h3 className="text-[22px] lg:leading-[22px] leading-[30px] text-white font-semibold mb-4">
//               Welcome to ResumeMile, {profData?.data?.fullname}!
//             </h3>
//             <p className="text-[18px] leading-[25px] text-white font-normal mb-0 lg:pr-20">
//               Create a professional resume in minutes with our easy-to-use
//               builder. Choose from our collection of templates and get hired
//               faster.
//             </p>
//           </div>
//           <div className="mb-10">
//             <h3 className="text-[20px] leading-[20px] text-[#151515] font-medium mb-6">
//               Quick Actions
//             </h3>
//             <div className="flex gap-4">
//               <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-4">
//                 <div
//                   // onClick={() => setOpenModalCreateResume(true)}
//                   onClick={() => router.push("/resume-builder")}
//                   className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
//                 >
//                   <div className="bg-[#DBFCE7] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
//                     <BiPlus className="text-[#00A63E] text-[30px]" />
//                   </div>
//                   <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
//                     Create Resume From Scratch
//                   </h3>
//                   <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
//                     Start fresh with a new resume using our professional
//                     templates
//                   </p>
//                 </div>
//                 <div
//                   onClick={() => setOpenModalImproveExistingResumeTwo(true)}
//                   className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
//                 >
//                   <div className="bg-[#DBEAFE] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
//                     <RiExchange2Line className="text-[#2B7FFF] text-[30px]" />
//                   </div>
//                   <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
//                     Improve existing resume
//                   </h3>
//                   <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
//                     Upload and enhance your current resume with AI-powered
//                     suggestions
//                   </p>
//                 </div>
//                 <div
//                   onClick={() => setOpenModalImproveexistingResume(true)}
//                   className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
//                 >
//                   <div className="bg-[#FFEDD4] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
//                     <BiBriefcaseAlt className="text-[#FF886D] text-[30px]" />
//                   </div>
//                   <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
//                     JD based resume
//                   </h3>
//                   <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
//                     Upload and enhance your current resume with AI-powered
//                     suggestions
//                   </p>
//                 </div>
//                 <div
//                   onClick={() => setOpenModalLinkedInRewrite(true)}
//                   className="border bg-white border-[#D5D5D5] hover:border-[#800080] rounded-[10px] px-5 py-7 cursor-pointer"
//                 >
//                   <div className="bg-[#EAD9FF] w-[42px] h-[42px] rounded-[10px] mb-5 flex items-center justify-center">
//                     <BiLogoLinkedin className="text-[#9747FF] text-[30px]" />
//                   </div>
//                   <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
//                     LinkedIn Rewrite
//                   </h3>
//                   <p className="text-[#575757] text-[15px] leading-[23px] pb-0">
//                     Get AI-powered suggestions to enhance and optimize your
//                     LinkedIn profile.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mb-14">
//             <h3 className="text-[20px] leading-[20px] text-[#151515] font-medium mb-6">
//               Recent Resumes
//             </h3>
//             <div className="lg:flex gap-4 pb-8 lg:pb-0">
//               <div className="lg:w-8/12">
//                 {recentResume?.length === 0 ? (
//                   <div className="bg-white text-[#7D7D7D]">
//                     No recent resumes found.
//                   </div>
//                 ) : (
//                   recentResume?.map((resume) => (
//                     <div
//                       key={resume.id}
//                       className="flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] px-5 py-4 mb-4"
//                     >
//                       <div className="flex gap-3 items-center">
//                         <div className="bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center">
//                           <CgFileDocument className="text-white text-2xl" />
//                         </div>
//                         <div>
//                           <h3 className="text-[#151515] text-sm lg:text-base font-medium mb-1">
//                             {resume.resume_name}
//                           </h3>
//                           <p className="text-[#7D7D7D] text-xs lg:text-sm">
//                             Created on {formatDate(resume.created_at)}
//                           </p>
//                         </div>
//                       </div>
//                       <div>
//                         <Link
//                           href={
//                             resume.resume_type === "scratch_resume"
//                               ? `/resume-builder-edit?id=${resume.id}&template=${resume?.template_detail?.[0]?.templete_id}`
//                               : resume.resume_type === "linkedin_resume"
//                                 ? `/linkedIn-rewrite?id=${btoa(
//                                   resume.id.toString()
//                                 )}`
//                                 : resume.resume_type === "jd_based_resume"
//                                   ? `/jd-resume-builder?id=${btoa(
//                                     resume.id.toString()
//                                   )}&template=${resume?.template_detail?.[0]?.templete_id
//                                   }`
//                                   : resume.resume_type === "improve_resume"
//                                     ? `/improve-resume-builder?id=${btoa(
//                                       resume.id.toString()
//                                     )}&template=${resume?.template_detail?.[0]?.templete_id
//                                     }`
//                                     : ""
//                           }
//                           className="text-xl text-[#797979] hover:text-[#A635A2] cursor-pointer"
//                         >
//                           <BiEdit />
//                         </Link>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <div className="lg:w-4/12 border bg-white border-[#D5D5D5] rounded-[10px] px-6 py-7">
//                 <h3 className="text-[#151515] text-[18px] leading-[22px] font-medium pb-3">
//                   Resume Writing Tips
//                 </h3>
//                 <ul className="pl-4.5">
//                   <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
//                     Keep your resume to 1-2 pages maximum
//                   </li>
//                   <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
//                     Use action verbs to describe your achievements
//                   </li>
//                   <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
//                     Tailor your resume for each job application
//                   </li>
//                   <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
//                     Include relevant keywords from the job posting
//                   </li>
//                   <li className="text-[#575757] text-[14px] leading-[23px] font-normal mb-2 list-disc">
//                     Preview carefully before submitting
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
     
//       {openModalCreateResumeJd && (
//         <JdBasedChooseModal
//           openModalCreateResumeJd={openModalCreateResumeJd}
//           setOpenModalCreateResumeJd={setOpenModalCreateResumeJd}
//           resumeId={resumeId}
//         />
//       )}

//       {openModalLinkedInRewrite && (
//   <LinkedInReWriteModal
//     openModalImproveexistingResume={openModalLinkedInRewrite} 
//     setOpenModalImproveexistingResume={setOpenModalLinkedInRewrite}
//   />
// )}

//       {/* add modal for JD Based here */}

//       {openModalImproveexistingResume && (
//         <JdbasedModal
//           openModalImproveexistingResume={openModalImproveexistingResume}
//           setOpenModalImproveexistingResume={setOpenModalImproveexistingResume}
//           alertContinueHandler={alertContinueHandler}
//           setOpenModalCreateResume={setOpenModalCreateResume}
//           setOpenModalCreateResumeJd={setOpenModalCreateResumeJd}
//           setResumeId={setResumeId}
//         />
//       )}

//       {/* add modal for JD Based ends here */}

//       {/* add modal for Alert start here */}
//       <Modal
//         size="xl"
//         className="apply_modal_area"
//         show={openModalAlertModal}
//         onClose={() => setOpenModalAlertModal(false)}
//       >
//         <ModalHeader className="bg-white text-black border-0">
//           <div className="flex items-center gap-1">Alert</div>
//         </ModalHeader>
//         <ModalBody className="bg-white p-0 rounded-b-[4px]">
//           <p className="text-[#414141] text-[14px] leading-[24px] pt-0 px-6">
//             According to the Job Description, your resume is missing the
//             following: Python, SQL, Leadership. Please add these skills with
//             relevant projects or experience to make your resume stronger and
//             better aligned with the role.
//           </p>
//           <div className="p-5">
//             <button
//               onClick={() => true}
//               className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]"
//             >
//               Continue
//             </button>
//           </div>
//         </ModalBody>
//       </Modal>
//       {/* add modal for Alert ends here */}

//       {/* add modal for apply job start here */}
//       <Modal
//         size="lg"
//         className="apply_modal_area"
//         show={openModalImproveExistingResumeTwo}
//         onClose={() => setOpenModalImproveExistingResumeTwo(false)}
//       >
//         <ModalHeader className="bg-white text-black modal_header">
//           <div className="flex items-center gap-1">
//             <HiClipboardList className="text-[#800080] text-3xl" />
//             Improve Existing Resume
//           </div>
//         </ModalHeader>
//         <ModalBody className="bg-white p-0 rounded-b-[4px]">
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="lg:flex gap-5 p-5">
//               <div className="w-full">
//                 <div className="flex w-full items-center justify-center">
//                   <Label
//                     htmlFor="dropzone-file"
//                     className="resume_upload_box_small flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//                   >
//                     <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                       <BiImport className="text-[50px] lg:text-[70px] text-[#92278F]" />
//                       <p className="mb-2 text-base lg:text-xl text-[#92278F]">
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
//                     <FileInput
//                       id="dropzone-file"
//                       className="hidden"
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
//                 disabled={loading}
//                 className={`bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-white font-semibold w-full text-center rounded-[7px] 
//     ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//               >
//                 {loading ? "Processing..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default Page;
