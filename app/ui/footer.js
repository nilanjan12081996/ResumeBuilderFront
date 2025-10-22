'use client';

import React from 'react'

import { Roboto } from 'next/font/google';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Link from 'next/link';

import { IoLocationSharp } from "react-icons/io5";
import { FaEnvelope } from "react-icons/fa6";
import { MdPhone } from "react-icons/md";
import { BiLogoFacebook } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { BiLogoLinkedin } from "react-icons/bi";

import { FaFacebook } from "react-icons/fa6";

import footerLogo from "../assets/imagesource/ResumeMile_logo_footer.png";
import Image from 'next/image';

import { ImLocation } from "react-icons/im";
import { IoDocumentTextSharp } from "react-icons/io5";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['700'], // optional: define font weights
  variable: '--font-roboto', // optional: for CSS variables
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // specify desired weights
  display: 'swap',
});

const Footer = () => {
  return (
    <div className='bg-[#F0E3FA]'>

      <div className='footer_top lg:pt-20 py-10 px-6 lg:px-0'>
        <div className='max-w-6xl mx-auto'>
          <div className='footer_top_container'>
            <div className='lg:w-full mb-6 lg:mb-0 text-center'>
              <Image src={footerLogo} alt='footerLogo' className='inline-block mb-8' />
              <div className="flex lg:justify-center lg:items-start items-start">
                <ImLocation className="text-[#92278F] text-xl mr-[-18px] mt-[5px]" />
                <p className="text-black text-sm leading-[24px] break-words whitespace-normal max-w-[400px]">
                  T-Hub, Plot No 1/C, Sy No 83/1, Raidurgam Panmaktha, Hyderabad Knowledge City,
                  Serilingampally, Hyderabad, Telangana 500081
                </p>
              </div>

              <div className='mt-3'>
                <ul className='flex justify-center items-center gap-4'>

                  <li className='flex justify-center items-center'>
                    <FaEnvelope className='text-[#92278F] text-xl mr-1' />
                    <p className='text-black text-sm leading-[24px]'>info@resumemile.com</p>
                  </li>
                  <li>
                    <Link className='flex justify-center items-center' href="/privacy-policy" passHref>
                      <IoDocumentTextSharp className='text-[#92278F] text-xl mr-1'/>
                      <p className='text-black text-sm leading-[24px]'>Privacy Policy</p>
                    </Link>
                  </li>
                  <li>
                    <Link className='flex justify-center items-center' href="/cancellation-policy" passHref>
                      <IoDocumentTextSharp className='text-[#92278F] text-xl mr-1'/>
                      <p className='text-black text-sm leading-[24px]'>Cancellation policy</p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

         <div className='border-t border-[#433c4e] pt-5 text-center mt-10'>
             <p className='text-sm text-[#433c4e]'>© 2025 HiringEye Solutions Private Limited</p>
          </div>

      </div>

      

    </div>
  )
}

export default Footer