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

import footerLogo from "../assets/imagesource/footer_logo.png";
import Image from 'next/image';

import { ImLocation } from "react-icons/im";

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

      <div className='footer_top lg:py-20 py-10 px-6 lg:px-0'>
        <div className='max-w-6xl mx-auto'>
          <div className='footer_top_container'>
            <div className='lg:w-full mb-6 lg:mb-0 text-center'>
              <Image src={footerLogo} alt='footerLogo' className='inline-block mb-8' />
              <div className='flex lg:justify-center lg:items-center items-start'>
                <ImLocation className='text-[#92278F] text-xl mr-1' />
                <p className='text-black text-sm leading-[24px]'>1234 Main Street, Suite 500, Downtown District, Anytown, State, 12345, USA</p>
              </div>
              <div className='mt-3'>
                <ul className='flex justify-center items-center gap-4'>
                  <li className='flex justify-center items-center'>
                    <MdPhone className='text-[#92278F] text-xl mr-1'/>
                    <p className='text-black text-sm leading-[24px]'>(123) 456-7890</p>
                  </li>
                  <li className='flex justify-center items-center'>
                    <FaEnvelope className='text-[#92278F] text-xl mr-1' />
                    <p className='text-black text-sm leading-[24px]'>example@email.com</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer