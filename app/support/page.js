import Link from 'next/link'
import React from 'react'


import { Button, Label, Textarea, TextInput } from 'flowbite-react';

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
import Image from 'next/image';


import { FaPlus } from "react-icons/fa";


import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { RiMapPin2Line } from "react-icons/ri";


import { FaMapMarkerAlt } from "react-icons/fa";
import { BiSolidPhone } from "react-icons/bi";
import { BiLogoGmail } from "react-icons/bi";



const page = () => {
  return (
    <div>
      <div className='banner_area p-0 lg:p-0'>
        {/* home banner section start here */}
        <div className="home_banner_area relative">
          <Image src={aboutBanner} alt='aboutBanner' className="hidden lg:block" />
          <Image src={bannerImg} alt='bannerImg' className="block lg:hidden" />
          <div className="banner_content_area absolute w-full h-full left-0 top-0">
           <div className='max-w-6xl mx-auto flex justify-center items-center h-full'>
               <div className="w-full px-4 pt-14 lg:pt-24 text-center">
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">Support</h1>
               </div>
           </div>
        </div>
        </div>
      </div>


      {/* Who We Are section start here */}
      <div className="py-10 lg:py-20">
        <div className='max-w-6xl mx-auto'>
           <div className='mb-0 px-5 lg:px-0'>
              <div className='lg:w-8/12 mx-auto text-center'>
                <h2 className="text-[#031E2D] text-[23px] lg:text-[40px] leading-[48px] font-semibold lg:pb-4">We’d Love to Hear From You</h2>
                <p className="text-[#424242] text-sm lg:text-[16px] leading-[24px] pb-6">Whether you&apos;re exploring automation for your product, need support integrating our tools, or just want to chat about making your workflows smarter—we're here to help.</p>
              </div>
           </div>
           <div className="certificate_completion_sec">
                <div className="max-w-6xl mx-auto lg:py-4 px-4 lg:px-0">
                    <div className="">

                        <div className="lg:w-7/12 mx-auto bg-[#ffffff] rounded-[10px] shadow-xl p-5 lg:p-10">
                            <div className='my-5'>
                                <h3 className='text-[#800080] text-xl lg:text-[24px] leading-[26px] font-semibold pb-3'>Get In Touch</h3>
                                <p className='text-[#424242] text-sm lg:text-[14px] leading-[20px]'>We&lsquo;re here to help! If you have any questions or would like to discuss how our automation tools can enhance your product and streamline your operations, feel free to reach out.</p>
                            </div>
                            <div className='w-full'>
                                <div className='form_area'>
                                    <div className='flex gap-4 mb-3'>
                                        <div className='w-full mb-2'>
                                            <TextInput id="base" type="text" placeholder='First Name' sizing="md" />
                                        </div>
                                        <div className='w-full mb-2'>
                                            <TextInput id="base" type="text" placeholder='Last Name' sizing="md" />
                                        </div>
                                    </div>
                                    <div className='flex gap-4 mb-3'>
                                        <div className='w-full mb-2'>
                                            <TextInput id="base" type="email" placeholder='Email Address' sizing="md" />
                                        </div>
                                        <div className='w-full mb-2'>
                                            <TextInput id="base" type="text" placeholder="Phone Number" sizing="md" />
                                        </div>
                                    </div>
                                    <div className='mb-5'>
                                        <Textarea id="comment" placeholder="Your massage" required rows={6} />
                                    </div>
                                    <Button type="submit">Get to Know </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      {/* Who We Are section ends here */}





    </div>
  )
}

export default page