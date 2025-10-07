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

import resume1 from "../assets/imagesource/resume1.png";
import resume2 from "../assets/imagesource/resume2.png";
import view_full_resume from "../assets/imagesource/view_full_resume.png";

import resume_sections_view from "../assets/imagesource/resume_sections_view.png";

import { BiEdit } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";

import { BsArrowRightShort } from "react-icons/bs";

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
import { checkATS, improveResume } from "../reducers/DashboardSlice";


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

  const loginData=localStorage.getItem('projects')
  const parseLoginData=JSON.parse(loginData)
  console.log("parseLoginData",parseLoginData);
  
  const { recentResume } = useSelector((state) => state?.resHist);

  const router = useRouter();
  const dispatch = useDispatch();
  const { error, improveResumeData, loading } = useSelector(
    (state) => state.dash
  );
  const [openModalCreateResume, setOpenModalCreateResume] = useState(false);
    const [openModalCreateResumeJd, setOpenModalCreateResumeJd] = useState(false);
     const [openModalCreateResumeLinkedIn, setOpenModalCreateResumeLinkedIn] = useState(false);
     const[resumeId,setResumeId]=useState()
  const [openModalImproveexistingResume, setOpenModalImproveexistingResume] =
    useState(false);
  const [openModalAlertModal, setOpenModalAlertModal] = useState(false);

  const [
    openModalImproveExistingResumeTwo,
    setOpenModalImproveExistingResumeTwo,
  ] = useState(false);

  const [openModalLinkedInRewrite, setOpenModalLinkedInRewrite] =
    useState(false);
  const [openATSmodal, setopenATSmodal] = useState(false);
  const [ATSscore, setATSscore] = useState(0);

  const [selectedResume, setSelectedResume] = useState(null);

  const alertContinueHandler = () => {
    setOpenModalImproveexistingResume(false);
    setOpenModalAlertModal(true);
  };

  const resumeBuilderHandler = () => {
    if (!selectedResume) {
      toast.error("Please select a resume first!");
      return;
    }
    router.push(`/resume-builder?template=${selectedResume}`);
  };

  const HandlerLinkedInRewrite = () => {
    router.push("/linkedIn-rewrite");
  };

  const handleSelect = (id) => {
    setSelectedResume(id);
  };

  // clear file input
  const clearFileInput = () => {
    const fileInput1 = document.getElementById("dropzone-file");

    if (fileInput1) {
      fileInput1.value = "";
    }

    // clear state variables if you are tracking them
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

  const handleResumeImprove = (data) => {
    console.log("Form data received:", data);
    console.log("Resume file:", data.resume_file);

    const formData = new FormData();

    // Check if linkedin_profile_file exists and append it
    // if (data.linkedin_profile_file && data.linkedin_profile_file[0]) {
    //   formData.append("linkedin_profile_file", data.linkedin_profile_file[0] || null);
    // } else{
    //   formData.append("linkedin_profile_file", null);
    // }

    // Check if resume_file exists and append it
    if (data.resume_file && data.resume_file[0]) {
      console.log("Appending resume file:", data.resume_file[0]);
      formData.append("resume_file", data.resume_file[0]);
    } else {
      console.error("No resume file selected");
      alert("Please select a resume file to upload");
      return;
    }
    data.linkedin_profile &&
      formData.append("linkedin_profile", data.linkedin_profile);
    data.portfolio_link &&
      formData.append("portfolio_link", data.portfolio_link);
    data.github_profile &&
      formData.append("github_profile", data.github_profile);
    data.other_link && formData.append("other_link", data.other_link);

    // Log FormData contents for debugging
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    dispatch(improveResume(formData))
      .then((res) => {
        console.log(" res ", res);
        const userData = {
          imp_resume_id: res?.payload?.data?.id,
          raw_data: res?.payload?.raw_data,
        };
        dispatch(checkATS(userData))
          .then((res) => {
            // toast.success(res?.payload?.message || "ATS score");
            setATSscore(res?.payload?.data?.ats_score);
            setopenATSmodal(true);
          })
          .catch((err) => {
            console.log("err", err);
          });
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(
          err?.message || "An error occurred while improving the resume."
        );
      });
      clearFileInput();
  };





  return (
    <div className={`${inter.className} antialiased`}>
      <ToastContainer />
      <div className="mb-0">
        <div className="main-content">
            <div className="welcome_area py-8 px-9 rounded-[10px] mb-5">
                <h3 className="text-[22px] lg:leading-[22px] leading-[30px] text-white font-semibold mb-4">
                    Welcome to your HiringEye Dashboard, Soumyajit Chandra!
                </h3>
                <p className="text-[18px] leading-[25px] text-white font-normal mb-0 lg:pr-20">
                    Boost your career with AI-powered tools. Create professional resumes and generate engaging LinkedIn content effortlessly.
                </p>
            </div>
            <div className="mb-5">
                <div className="flex gap-4">
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {
                        parseLoginData?.projects?.map((pros)=>(
                          pros?.id===1?
                          (
                             <div className="border bg-[#FFF5E2] border-[#FFF5E2] rounded-[10px] px-5 py-7">
                            <div className="bg-[#ffffff] w-[74px] h-[74px] rounded-full mb-5 flex items-center justify-center">
                              <CgFileDocument className="text-[#C78919] text-[40px]" />
                            </div>
                            <h3 className="text-[#000000] text-[22px] leading-[22px] font-semibold pb-4">Resume Builder</h3>
                            <p className="text-[#525252] text-[17px] leading-[27px] pb-6">
                              Create a professional resume in minutes with our AI-powered builder. Choose from our collection of templates and get hired faster.
                            </p>
                            <Link href="/dashboard" className="text-[18px] leading-[28px] text-[#C78919] hover:text-black font-medium inline-flex items-center gap-1" passHref>
                               Get Started <BsArrowRightShort className="text-2xl" />
                            </Link>
                        </div>
                          ):
                          pros?.id===2?
                          (
                            <div className="border bg-[#E0EFFF] border-[#E0EFFF] rounded-[10px] px-5 py-7">
                            <div className="bg-[#ffffff] w-[74px] h-[74px] rounded-full mb-5 flex items-center justify-center">
                              <BiLogoLinkedinSquare className="text-[#2781E5] text-[40px]" />
                            </div>
                            <h3 className="text-[#000000] text-[22px] leading-[22px] font-semibold pb-4">LinkedIn Content Generator</h3>
                            <p className="text-[#525252] text-[17px] leading-[27px] pb-6">
                              Generate engaging LinkedIn posts and comments that boost your professional presence. Stand out with AI-crafted content.
                            </p>
                            <Link href="#" className="text-[18px] leading-[28px] text-[#2781E5] hover:text-black font-medium inline-flex items-center gap-1" passHref>
                               Get Started <BsArrowRightShort className="text-2xl" />
                            </Link>
                        </div>
                          ):(
                            <>
                            </>
                          )
                        ))
                      }
                       
                       
                    </div>
                </div>
            </div>
            <div className="pb-14">
                <div className="lg:flex justify-between items-center bg-white border-[#e0e0e1] rounded-[10px] px-5 py-8 mb-4">
                    <div className="flex gap-3 items-center mb-4 lg:mb-0">
                        <div>
                            <h3 className="text-[#000000] text-[22px] leading-[22px] font-medium pb-2">
                                Ready to get started?
                            </h3>
                            <p className="text-[#525252] text-[17px] leading-[27px]">
                                Choose a tool above to begin enhancing your professional profile.
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="text-[#525252] text-[17px] leading-[27px] pb-2">
                            Total tools available
                        </p>
                        <h3 className="text-[#92278F] text-[26px] leading-[26px] font-semibold pb-0 lg:text-right">2</h3>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
