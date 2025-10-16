'use client';

import Image from "next/image";

import bannerImg from "../app/assets/imagesource/banner_img.png";
import banner01 from "../app/assets/imagesource/banner01.png";
import howItWorksImg from "../app/assets/imagesource/how_it_works_img.png";
import hw01 from "../app/assets/imagesource/hw01.png";
import hw02 from "../app/assets/imagesource/hw02.png";
import hw03 from "../app/assets/imagesource/hw03.png";

import bitCoinIcon from "../app/assets/imagesource/bit_coin_icon.png";
import etherum_icon from "../app/assets/imagesource/etherum_icon.png";
import x_coins_icon from "../app/assets/imagesource/x_coins_icon.png";
import Tether_icon from "../app/assets/imagesource/Tether_icon.png";
import bn_binance_coin_icon from "../app/assets/imagesource/bn_binance_coin_icon.png";
import solana_coin from "../app/assets/imagesource/solana_coin.png";
import usdc_icon from "../app/assets/imagesource/usdc_icon.png";
import Create_New_Resume_icon from "../app/assets/imagesource/Create_New_Resume_icon.png";
import ResumeTemplates_icon from "../app/assets/imagesource/ResumeTemplates_icon.png";
import sub01 from "../app/assets/imagesource/sub01.png";
import sub02 from "../app/assets/imagesource/sub02.png";
import Check from "../app/assets/imagesource/Check.png";
import hiring_icon from "../app/assets/imagesource/hiring_icon.png";
import check_point from "../app/assets/imagesource/check_point.png";

import about_img from "../app/assets/imagesource/about_img.png";


import Linkedin_img from "../app/assets/imagesource/Linkedin_img.png";
import Linkedin_icon from "../app/assets/imagesource/Linkedin_icon.png";





import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

import Link from "next/link";

import { Poppins } from 'next/font/google';
import Testimonial from "./testimonial/page";

import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5"
import { IoMdSave } from "react-icons/io";
import { MdTipsAndUpdates } from "react-icons/md";
import { SlCloudUpload } from "react-icons/sl";
import { TiDocumentText } from "react-icons/ti";
import { GrSettingsOption } from "react-icons/gr";

import { LuLinkedin } from "react-icons/lu";


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, Select, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { features } from "process";
import { getCoins } from "./reducers/CoinSlice";
import { useRouter } from "next/navigation";
import LoginModal from "./modal/LoginModal";
import TradingCoinList from "./TradingCoinList";
import FreeResumeTemplates from "./FreeResumeTemplates/page";
import RegistrationModal from "./modal/RegistrationModal";
import ChoiceModal from "./modal/ChoiceModal";
import { getIpData, getPlans, getPlansHome } from "./reducers/PlanSlice";
import { getFeatureJobOutSide } from "./reducers/FeatureJobSlice";
import striptags from "striptags";




const poppins = Poppins({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700'], // specify desired weights
   display: 'swap',
});

export default function Home() {
  
   const { coins } = useSelector((state) => state?.coinData)
   const{fetJobsOutSide}=useSelector((state)=>state?.featJob)
   const dispatch = useDispatch()
   const [searchTerm, setSearchTerm] = useState("");
   const [selectedCurrency, setSelectedCurrency] = useState('USD');
   const [selectedCoin, setSelectedCoin] = useState('');
   const [selectedCoinSymbol, setSelectedCoinSymbol] = useState('');
   const [showDropdown, setShowDropdown] = useState(false);
   const router = useRouter();
   const [openLoginModal, setOpenLoginModal] = useState(false);
   const [openChoiceModal,setOpenChoiceModal]=useState(false)
   const [chooseResumeType,setChooseResumeType]=useState()
   const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState(false);
   const [openPricModal, setOpenPriceModal] = useState(false)
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
      const { plans, loading, ipData, createOrderData, error, currentSubscriptionData,plansHomeData } = useSelector(
    (state) => state.planst
  );

  useEffect(() => {
     dispatch(getIpData()).then((res) => {
       console.log("Ipres:", res);
       if (res?.payload?.ip) {
         dispatch(
           getPlans({
             plan_type:1,
             ip_address: res?.payload?.ip,
           })
         );
       }
        if (res?.payload?.ip) {
         dispatch(
           getPlansHome({
             plan_type:2,
             ip_address: res?.payload?.ip,
           })
         );
       }
     });
   }, [dispatch]);

   console.log("plans",plans);
   console.log("plansHomeData",plansHomeData);

   useEffect(()=>{
      dispatch(getFeatureJobOutSide({page:1,limit:3}))
   },[])
   console.log("fetJobsOutSide",fetJobsOutSide);
   
   
   return (
      <div className={`${poppins.variable} antialiased home_wrapper_arera`}>

         {/* home banner section start here */}
         <div className="home_banner_area relative">
            <Image src={bannerImg} alt='bannerImg' className='w-full hidden lg:block' />
            <div className="banner_content_area lg:absolute w-full h-full left-0 top-0">
               <div className='max-w-6xl mx-auto lg:flex justify-center items-center h-full'>
                  <div className="lg:w-6/12 px-4 pt-20 lg:pt-24">
                     {/* <p className="text-[16px] leading-[18px] text-[#000000] font-semibold mb-4">Built by ex-MAANG recruiters. Designed for your success.</p> */}
                     <p className="text-[18px] leading-[18px] text-[#800080] uppercase font-semibold mb-2"> AI RESUME BUILDER</p>
                     <h1 className="text-2xl leading-[30px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">Build an ATS-Ready Resume <span>Instantly with AI</span>.</h1>
                     <p className="text-[#2A2A2A] text-sm lg:text-[18px] leading-[28px] mb-5 lg:mb-6">
                        Create an interview-ready resume tailored to any job description in seconds. Built by ex-MAANG recruiters. Designed for your success.
                     </p>
                     <ul>
                        <li className="text-[#2A2A2A] text-[18px] leading-[28px] float-left flex items-center mr-5 mb-3"><Image src={check_point} alt='check_point' className='mr-2' /> Create New Resume</li>
                        <li className="text-[#2A2A2A] text-[18px] leading-[28px] float-left flex items-center mr-5 mb-3"><Image src={check_point} alt='check_point' className='mr-2' /> ATS Friendly</li>
                        <li className="text-[#2A2A2A] text-[18px] leading-[28px] float-left flex items-center mr-5 mb-3"><Image src={check_point} alt='check_point' className='mr-2' /> Customize your existing resume</li>
                     </ul>
                  </div>
                  <div className="lg:w-6/12">
                     <Image src={banner01} alt='banner01' className='lg:mb-[0]' />
                  </div>
               </div>
            </div>
         </div>
         {/* home banner section ends here */}

         {/* how it works section start here */}
         <div className="how_it_works_section px-4 lg:px-0 py-10 lg:py-20" id="about">
            <div className='max-w-6xl mx-auto h-full'>
               <div>
                  <div className="lg:flex gap-20 mb-0 lg:mb-0">
                     <div className="lg:w-6/12 mb-4 lg:mb-0">
                        <Image src={about_img} alt='about_img' className='rounded-[15px]' />
                     </div>
                     <div className="lg:w-6/12">
                        <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6">About <span className="text-[#a536a2]">Us</span></h2>
                        <p className="text-[#737272] text-sm lg:text-[16px] leading-[30px] pb-6">
                           At <strong>AI Resume Builder</strong>, we believe your resume isn’t just a document — it’s your story, your first impression, 
                           and your ticket to new opportunities. Yet most job seekers struggle to create resumes that are both <strong>ATS-friendly</strong> and <strong>eye-catching to recruiters.</strong>
                           We built our AI-powered platform to <strong>eliminate the guesswork</strong> and give every job seeker the tools to shine. With <strong>ATS-friendly resumes, recruiter-approved 
                           templates, and personalized AI suggestions,</strong> we help you transform a plain document into a <strong>career-winning resume</strong>.
                        </p>
                        <p className="text-[#737272] text-sm lg:text-[16px] leading-[30px] pb-6">
                           But we don’t stop there. Your <strong>LinkedIn profile is your digital first impression</strong>, and we ensure it’s just as powerful. 
                           From rewriting your professional summary to optimizing keywords for recruiters, we craft LinkedIn profiles that <strong>get you noticed, 
                           grow your visibility, and open new opportunities</strong>.
                        </p>
                        <p className="text-[#737272] text-sm lg:text-[16px] leading-[30px] pb-6">
                           Whether you’re a <strong>student chasing your first break, a professional aiming for growth, or a leader targeting global roles</strong>, 
                           our platform adapts to your journey. In just minutes, you’ll have a <strong>resume and LinkedIn profile that are modern, impactful, and interview-ready.</strong>
                        </p>
                        <p className="text-[#737272] text-sm lg:text-[16px] leading-[30px] pb-6">
                           Our mission is simple: <strong>to empower you to land the job you deserve with confidence.</strong>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div> 
         {/* how it works section ends here */}

         {/* how it works section start here */}
        <div className="how_it_works_section px-4 lg:px-0 py-10 lg:py-20">
            <div className='max-w-6xl mx-auto h-full'>
               <div>
                  <div className="text-center mb-10 lg:mb-28">
                     <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6">How It <span className="text-[#a536a2]">Works</span></h2>
                     <p className="text-[#2A2A2A] text-sm lg:text-[20px] leading-[30px]">Quickly upload, customize, and download your resume tailored to any <br></br> job description in no time</p>
                  </div>
                  <div className="lg:flex gap-20 mb-10 lg:mb-20">
                     <div className="lg:w-6/12 lg:pr-20 flex justify-center items-center mb-4 lg:mb-0">
                        <div>
                           <div className="mb-4">
                              <p className="text-black text-[16px] leading-[24px] font-medium uppercase flex items-center"><SlCloudUpload className="text-[#1570EF] text-xl mr-2" /> CREATE RESUME</p>
                           </div>
                           <h2 className="text-2xl text-[#1D2939] lg:text-[42px] lg:leading-[45px] font-semibold mb-5"><span className="text-[#1E6BFF]">Create or import</span> your resume with ease</h2>
                           <p className="text-[#000000] text-[16px] leading-[26px] mb-6">Start your resume from scratch with our templates, upload an existing one, or import your LinkedIn profile.</p>
                           <button onClick={()=>setOpenRegisterModal(true)} className="text-xs cursor-pointer lg:text-[16px] text-[#1570EF] hover:bg-[#207AEF] hover:text-white font-medium uppercase border border-[#207AEF] rounded-[10px] px-5 py-3 inline-block">CREATE MY REUSME</button>
                        </div>
                     </div>
                     <div className="lg:w-6/12">
                        <Image src={hw01} alt='hw01' className='' />
                     </div>
                  </div>
                  <div className="lg:flex gap-20 mb-10 lg:mb-20">
                     <div className="lg:w-6/12 mb-4 lg:mb-0">
                        <Image src={Linkedin_img} alt='Linkedin_img' className='' />
                     </div>
                     <div className="lg:w-6/12 lg:pr-20 flex justify-center items-center">
                        <div>
                           <div className="mb-4">
                              <p className="text-black text-[16px] leading-[24px] font-medium uppercase flex items-center"><LuLinkedin className="text-[#F28938] text-2xl mr-1.5" /> IMPROVE </p>
                           </div>
                           <h2 className="text-2xl text-[#1D2939] lg:text-[42px] lg:leading-[45px] font-semibold mb-5">Quickly enhance  <span className="text-[#F28938]">your LinkedIn</span> profile with AI</h2>
                           <p className="text-[#000000] text-[16px] leading-[26px] mb-6">Start your resume from scratch with our templates, upload an existing one, or import your LinkedIn profile.</p>
                           <button onClick={()=>setOpenRegisterModal(true)} className="text-xs cursor-pointer lg:text-[16px] text-[#F28938] hover:bg-[#F28938] hover:text-white font-medium uppercase border border-[#F28938] rounded-[10px] px-5 py-3 inline-block" >IMPROVE LINKEDIN PROFILE</button>
                        </div>
                     </div>
                  </div>
                  <div className="lg:flex gap-20 mb-4">
                     <div className="lg:w-6/12 lg:pr-20 flex justify-center items-center mb-4 lg:mb-0">
                        <div>
                           <div className="mb-4">
                              <p className="text-black text-[16px] leading-[24px] font-medium uppercase flex items-center"><GrSettingsOption className="text-[#9747FF] text-xl mr-2" /> CUTOMIZATION</p>
                           </div>
                           <h2 className="text-2xl text-[#1D2939] lg:text-[42px] lg:leading-[45px] font-semibold mb-5"><span className="text-[#9747FF]">Quickly customize</span> your resume with AI</h2>
                           <p className="text-[#000000] text-[16px] leading-[26px] mb-6">Simply input your experience, and let our AI generate impactful bullet points that showcase your skill and experience.</p>
                           <button onClick={()=>setOpenRegisterModal(true)} className="text-xs cursor-pointer lg:text-[16px] text-[#9747FF] hover:bg-[#9747FF] hover:text-white font-medium uppercase border border-[#9747FF] rounded-[10px] px-5 py-3 inline-block">CUSTOMIZE MY REUSME</button>
                        </div>
                     </div>
                     <div className="lg:w-6/12">
                        <Image src={hw03} alt='hw03' className='' />
                     </div>
                  </div>
                  <div className="lg:flex gap-20 mb-10 lg:mb-20">
                     <div className="lg:w-6/12 mb-4 lg:mb-0">
                        <Image src={hw02} alt='hw02' className='' />
                     </div>
                     <div className="lg:w-6/12 lg:pr-20 flex justify-center items-center">
                        <div>
                           <div className="mb-4">
                              <p className="text-black text-[16px] leading-[24px] font-medium uppercase flex items-center"><TiDocumentText className="text-[#039855] text-2xl mr-1.5 rotate-10" /> ATS RESUME GENERATOR</p>
                           </div>
                           <h2 className="text-2xl text-[#1D2939] lg:text-[42px] lg:leading-[45px] font-semibold mb-5">Build an <span className="text-[#039855]">ATS-Friendly Resume</span> Instantly with AI</h2>
                           <p className="text-[#000000] text-[16px] leading-[26px] mb-6">Start your resume from scratch with our templates, upload an existing one, or import your LinkedIn profile.</p>
                           <button onClick={()=>setOpenRegisterModal(true)} className="text-xs cursor-pointer lg:text-[16px] text-[#039855] hover:bg-[#039855] hover:text-white font-medium uppercase border border-[#039855] rounded-[10px] px-5 py-3 inline-block" >CREATE ATS FRIENDLY REUSME</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div> 
         {/* how it works section ends here */}

         {/* Resume Templates section start here */}
         <div className="resume_templates_section px-4 pt-10 lg:pt-20 lg:pb-20">
            <div className='max-w-6xl mx-auto'>
               <div className="mb-10 px-2 lg:px-0">
                  <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6 text-center">Access Free <span className="text-[#A536A2]">Resume Templates</span></h2>
                  <p className="text-[#2A2A2A] text-[18px] leading-[30px] lg:px-40 px-10 text-center">All the templates are ATS compliant and can be customized according to your style using our AI Resume Builder.</p>
               </div>
               <FreeResumeTemplates />
            </div>
         </div>
         {/* Resume Templates section ends here */}

         {/* Key benefits section start here */}
         <div className="key_benefits_section px-4 pt-10 lg:pt-20 lg:pb-20">
            <div className='max-w-6xl mx-auto'>
               <div className="mb-10">
                  <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6 text-center">Explore <span className="text-[#A536A2]">AI Resume Builder Features</span></h2>
                  <p className="text-[#2A2A2A] text-[18px] leading-[30px] lg:px-40 px-10 text-center">Dive into a powerful suite of career development tools and features designed to advance careers at all levels.</p>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-[#ffffff] shadow-lg rounded-[10px] px-5 py-5">
                     <div className="flex items-center mb-3">
                        <Image src={Create_New_Resume_icon} alt='Create_New_Resume_icon' className='' />
                        <h3 className="text-[#320731] text-xl leading-[30px] ml-2">Create New Resume</h3>
                     </div>
                     <p className="text-[#585858] text-base leading-[25px]">Create your resume for success build a standout resume in minutes.</p>
                  </div>
                  <div className="bg-[#ffffff] shadow-lg rounded-[10px] px-5 py-5">
                     <div className="flex items-center mb-3">
                        <Image src={ResumeTemplates_icon} alt='ResumeTemplates_icon' className='' />
                        <h3 className="text-[#320731] text-xl leading-[30px] ml-2">Resume Templates</h3>
                     </div>
                     <p className="text-[#585858] text-base leading-[25px]">Choose from professional, ATS-friendly designs</p>
                  </div>
                  <div className="bg-[#ffffff] shadow-lg rounded-[10px] px-5 py-5">
                     <div className="flex items-center mb-3">
                        <Image src={ResumeTemplates_icon} alt='ResumeTemplates_icon' className='' />
                        <h3 className="text-[#320731] text-xl leading-[30px] ml-2">Customize Existing Resume</h3>
                     </div>
                     <p className="text-[#585858] text-base leading-[25px]">Personalize your resume layout and branding</p>
                  </div>
               </div>
            </div>
         </div>
         {/* Key benefits section ends here */}



         {/* Key benefits section start here */}
         {/* <div className="key_benefits_section px-4 pt-10 pb-10 lg:pt-20 lg:pb-20 bg-[#fbfbfb]">
            <div className='max-w-6xl mx-auto'>
               <div className="mb-10">
                  <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6 text-center">Featured <span className="text-[#A536A2]">Jobs</span></h2>
                  <p className="text-[#2A2A2A] text-[18px] leading-[30px] lg:px-40 px-10 text-center">Discover roles that match your skills and goals.</p>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {
                     fetJobsOutSide?.data?.map((fetJobs)=>(
                        <div className="bg-[#ffffff] shadow-lg rounded-[10px] px-5 py-5">
                     <div className="mb-3">
                        <Image src={hiring_icon} alt='hiring_icon' className='mb-2' />
                        <h3 className="text-[#320731] text-xl leading-[30px] ml-0">{fetJobs?.job_role}</h3>
                     </div>
                     <p className="text-[#585858] text-sm leading-[24px] pb-4">
                       
                        {striptags(fetJobs?.job_description.slice(0,200))} ...
                     </p>
                     <button onClick={()=>setOpenRegisterModal(true)} className="bg-[#ffffff] hover:bg-[#7f007f] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Know More</button>
                  </div>
                     ))
                  }
                  
               </div>
            </div>
         </div> */}
         {/* Key benefits section ends here */}



         {/* Testimonials section start here */}
         <div className="testimonials_section lg:pt-20 lg:pb-20 pt-10 pb-10 pb-5 px-4 lg:px-0">
            <div className='max-w-6xl mx-auto'>
               <div className="lg:flex gap-12">
                  <div className="lg:w-4/12 mb-4 lg:mb-0">
                    <p className="text-base leading-[27px] text-white uppercase mb-1">testimonials</p>
                    <h2 className="text-2xl lg:text-[40px] lg:leading-[40px] text-white font-bold mb-2 lg:mb-4 pr-20">What people say</h2>
                    <p className="text-sm leading-[24px] text-white">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. 
                     Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non</p>
                  </div>
                  <div className="lg:w-8/12">
                    <Testimonial />
                  </div>
               </div>
            </div>
         </div>
         {/* Testimonials section ends here */}

         {/* Purchase section start here */}
         <div className="purchase_section py-8 lg:py-20 px-4 lg:px-0" id="pricing">
            <div className='max-w-6xl mx-auto'>
               <div className="text-center mb-10 lg:mb-10">
                  <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6">Find Your <span>Perfect Plan</span></h2>
                  <p className="text-[#4C4B4B] text-base lg:text-[18px] leading-[30px] lg:px-32">Discover the ideal plan to fuel your business growth. Our pricing options are carefully crafted to cater to businesses.</p>
               </div>
               <div className="subscription_tab_section">
                  <Tabs>
                     <TabList>
                        <Tab>Build</Tab>
                        <Tab>Break Through </Tab>
                        <Tab>Institution </Tab>
                     </TabList>
            
                     <TabPanel>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                           {
                              plans?.data?.map((oneTime)=>(
                                 <>
                                 {
                                    oneTime?.plan_frequency===1&&(
                                 <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                    <div className="py-8 px-6 relative min-h-[680px]">
                                    <Image src={sub01} alt='sub01' className='mb-6' />
                                    <h3 className="text-[20px] leading-[28px] text-[#1B223C] pb-6 font-medium">{oneTime?.plan_name}</h3>
                                    <div className="flex items-center gap-2 mb-8">
                                       <p className="text-[#1D2127] text-[35px] leading-[45px] font-medium">{oneTime?.planPrice?.currency} {oneTime?.planPrice?.price}</p>
                                          {/* <div className="pt-4">
                                          <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹300</p>
                                       </div> */}
                                    </div>
                                    <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                       <div>
                                          
                                          
                                             {
                                                oneTime?.PlanAccess?.map((planAccessName)=>(
                                                   <>
                                                   <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                   <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' />
                                                   {planAccessName?.plan_access_description}
                                                   </div>
                                                   </>
                                                ))
                                             } 
                                       
                                       </div>
                                    </div>
                                    <div className="absolute left-0 bottom-[20px] w-full px-6">
                                       <button onClick={()=>setOpenLoginModal(true)} className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                    </div>
                                 </div>
                                 </div>
                                    )
                                 }
                                 
                                 
                                 </>
                                  
                              ))
                           }
                           {/* <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                              <div className="py-8 px-6 relative">
                                 <Image src={sub01} alt='sub01' className='mb-6' />
                                 <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Silver</h3>
                                 <div className="flex items-center gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹199</p>
                                     <div className="pt-4">
                                       <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹300</p>
                                    </div>
                                 </div>
                                 <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 resume (Premium ATS score + better rating) +1 JD match resume
                                       </div>
                                    </div>
                                 </div>
                                 <div className="absolute left-0 bottom-[20px] w-full px-6">
                                    <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                 </div>
                              </div>
                           </div> */}
                           {/* <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                              <div className="py-8 px-6 relative">
                                 <Image src={sub02} alt='sub02' className='mb-6' />
                                 <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Gold</h3>
                                 <div className="flex items-center gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹499</p>
                                    <div className="pt-4">
                                       <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹699</p>
                                    </div>
                                 </div>
                                 <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 LinkedIn rewrite
                                       </div>
                                    </div>
                                 </div>
                                 <div className="absolute left-0 lg:bottom-[-20px] bottom-[20px] w-full px-6">
                                    <button className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                 </div>
                              </div>
                           </div>
                           <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                              <div className="py-8 px-6 relative">
                                 <Image src={sub01} alt='sub01' className='mb-6' />
                                 <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Platinum</h3>
                                 <div className="flex items-center gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹649</p>
                                    <div className="pt-4">
                                       <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹949</p>
                                    </div>
                                 </div>
                                 <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 resume  +1 LinkedIn rewrite
                                       </div>
                                    </div>
                                 </div>
                                 <div className="absolute left-0 lg:bottom-[-20px] bottom-[20px] w-full px-6">
                                    <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                 </div>
                              </div>
                           </div> */}
                           
                        </div>
                     </TabPanel>
                     <TabPanel>
                         <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                           
                           {/* <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                              <div className="py-8 px-6 relative">
                                 <Image src={sub01} alt='sub01' className='mb-6' />
                                 <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Free</h3>
                                 <div className="flex items-center gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹0</p>
                                 </div>
                                 <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 3 resumes (with watermark)
                                       </div>
                                    </div>
                                 </div>
                                 <div className="absolute left-0 bottom-[20px] w-full px-6">
                                    <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                 </div>
                              </div>
                           </div> */}
                                      {
                              plans?.data?.map((oneTime)=>(
                                 <>
                                 {
                                    oneTime?.plan_frequency===3&&(
                                 <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                    <div className="py-8 px-6 relative min-h-[680px]">
                                    <Image src={sub01} alt='sub01' className='mb-6' />
                                    <h3 className="text-[20px] leading-[28px] text-[#1B223C] pb-6 font-medium">{oneTime?.plan_name}</h3>
                                    <div className="flex items-center gap-2 mb-8">
                                       <p className="text-[#1D2127] text-[35px] leading-[45px] font-medium">{oneTime?.planPrice?.currency} {oneTime?.planPrice?.price}</p>
                                          {/* <div className="pt-4">
                                          <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹300</p>
                                       </div> */}
                                    </div>
                                    <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                       <div>
                                          
                                          
                                             {
                                                oneTime?.PlanAccess?.map((planAccessName)=>(
                                                   <>
                                                   <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                   <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' />
                                                   {planAccessName?.plan_access_description}
                                                   </div>
                                                   </>
                                                ))
                                             } 
                                       
                                       </div>
                                    </div>
                                    <div className="absolute left-0 bottom-[20px] w-full px-6">
                                       <button onClick={()=>setOpenLoginModal(true)} className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                    </div>
                                 </div>
                                 </div>
                                    )
                                 }
                                 
                                 
                                 </>
                                  
                              ))
                           }
                        
                        </div>
                     </TabPanel>
                     <TabPanel>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                           {/* <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                              <div className="py-8 px-6 relative">
                                 <Image src={sub01} alt='sub01' className='mb-6' />
                                 <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Campus Basic</h3>
                                 <div className="gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹60,000</p>
                                    <div className="pt-0">
                                       <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹90,000</p>
                                    </div>
                                 </div>
                                 <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 500 resumes
                                       </div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> ₹120/resume
                                       </div>
                                    </div>
                                 </div>
                                 <div className="absolute left-0 bottom-[10px] w-full px-6">
                                    <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                 </div>
                              </div>
                           </div>
                           <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                              <div className="py-8 px-6 relative">
                                 <Image src={sub01} alt='sub01' className='mb-6' />
                                 <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Campus Pro</h3>
                                 <div className="gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹1,00,000</p>
                                     <div className="pt-4">
                                       <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹1,50,000</p>
                                    </div>
                                 </div>
                                 <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1,000 resumes
                                       </div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> ₹100/resume
                                       </div>
                                    </div>
                                 </div>
                                 <div className="absolute left-0 bottom-[20px] w-full px-6">
                                    <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                 </div>
                              </div>
                           </div>
                           <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                              <div className="py-8 px-6 relative">
                                 <Image src={sub02} alt='sub02' className='mb-6' />
                                 <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Campus Plus</h3>
                                 <div className="gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹1,20,000</p>
                                    <div className="pt-0">
                                       <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹1,70,000</p>
                                    </div>
                                 </div>
                                 <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 500 resumes
                                       </div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 500 LinkedIn rewrites
                                       </div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> ₹80/resume + LinkedIn
                                       </div>
                                    </div>
                                 </div>
                                 <div className="absolute left-0 bottom-[20px] w-full px-6">
                                    <button className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                 </div>
                              </div>
                           </div>
                           <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                              <div className="py-8 px-6 relative">
                                 <Image src={sub01} alt='sub01' className='mb-6' />
                                 <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Campus Elite</h3>
                                 <div className="gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹1,70,000</p>
                                    <div className="pt-0">
                                       <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹2,00,000</p>
                                    </div>
                                 </div>
                                 <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1,000 resumes
                                       </div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1,000 LinkedIn rewrites
                                       </div>
                                       <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                          <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> ₹85/resume + LinkedIn
                                       </div>
                                    </div>
                                 </div>
                                 <div className="absolute left-0 bottom-[20px] w-full px-6">
                                    <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                 </div>
                              </div>
                           </div> */}

                                            {
                              plansHomeData?.data?.map((oneTime)=>(
                                 <>
                                 {
                                    oneTime?.plan_frequency===12&&(
                                 <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                    <div className="py-8 px-6 relative min-h-[680px]">
                                    <Image src={sub01} alt='sub01' className='mb-6' />
                                    <h3 className="text-[20px] leading-[28px] text-[#1B223C] pb-6 font-medium">{oneTime?.plan_name}</h3>
                                    <div className="flex items-center gap-2 mb-8">
                                       <p className="text-[#1D2127] text-[35px] leading-[45px] font-medium">{oneTime?.planPrice?.currency} {oneTime?.planPrice?.price}</p>
                                          {/* <div className="pt-4">
                                          <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹300</p>
                                       </div> */}
                                    </div>
                                    <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                       <div>
                                          
                                          
                                             {
                                                oneTime?.PlanAccess?.map((planAccessName)=>(
                                                   <>
                                                   <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                   <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' />
                                                   {planAccessName?.plan_access_description}
                                                   </div>
                                                   </>
                                                ))
                                             } 
                                       
                                       </div>
                                    </div>
                                    <div className="absolute left-0 bottom-[20px] w-full px-6">
                                       <button onClick={()=>setOpenLoginModal(true)} className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                    </div>
                                 </div>
                                 </div>
                                    )
                                 }
                                 
                                 
                                 </>
                                  
                              ))
                           }
                           
                        </div>
                     </TabPanel>
                  </Tabs>
               </div>
            </div>
         </div>
         {/* Purchase section ends here */}

         {openLoginModal &&
            <LoginModal
               openLoginModal={openLoginModal}
               setOpenLoginModal={setOpenLoginModal}
               setOpenRegisterModal={setOpenRegisterModal}
                setOpenChoiceModal={setOpenChoiceModal}
            />
         }

               {openRegisterModal &&
              <RegistrationModal
                openRegisterModal={openRegisterModal}
                setOpenRegisterModal={setOpenRegisterModal}
                openVerifyOtpModal={openVerifyOtpModal}
                setOpenVerifyOtpModal={setOpenVerifyOtpModal}
                setOpenLoginModal={setOpenLoginModal}
                openPricModal={openPricModal}
                setOpenPriceModal={setOpenPriceModal}
                chooseResumeType={chooseResumeType}
              />
            }
                {
            openChoiceModal&&(
              <ChoiceModal
              openChoiceModal={openChoiceModal}
              setOpenChoiceModal={setOpenChoiceModal}
              setChooseResumeType={setChooseResumeType}
              setOpenRegisterModal={setOpenRegisterModal}
              />
            )
          }
      </div>

   );
}
