import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";

import howItWorksImg from "../assets/imagesource/how_it_works_img.png";
import hw01 from "../assets/imagesource/hw01.png";
import hw02 from "../assets/imagesource/hw02.png";
import hw03 from "../assets/imagesource/hw03.png";
import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';
import { MdTipsAndUpdates } from 'react-icons/md';
import { IoMdSave } from 'react-icons/io';
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoIosListBox } from "react-icons/io";

const page = () => {
  return (
    <div>
      <div className='banner_area p-4 lg:p-0'>
        {/* home banner section start here */}
        <div className="home_banner_area relative">
         <Image src={aboutBanner} alt='aboutBanner' className="hidden lg:block" />
         <Image src={bannerImg} alt='bannerImg' className="block lg:hidden" />
          <div className="banner_content_area absolute w-full h-full left-0 top-0">
           <div className='max-w-6xl mx-auto flex justify-center items-center h-full'>
               <div className="w-full lg:px-4 pt-14 lg:pt-24 text-center">
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">Features</h1>
                  <p className="text-[#4C4B4B] text-sm lg:text-[18px] leading-[24px] mb-5 lg:mb-4">Everything You Need for Smarter Crypto Analysis</p>
               </div>
           </div>
        </div>
        </div>
      </div>
      {/* Why Choose Us section start here */}
      {/* how in works section start here */}
            {/* Key benefits section start here */}
            <div className="key_benefits_section pt-10 lg:pt-20 lg:pb-10 px-4 lg:px-0">
               <div className='max-w-6xl mx-auto'>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                     <div className="bg-[#fbfafa] shadow-xl rounded-[10px] px-5 py-8 text-center">
                        <div className="flex justify-center items-center mb-3">
                           <IoSearchOutline className="text-5xl" />
                        </div>
                        <h3 className="text-[#083991] text-xl mb-2">Coin Search & Analysis</h3>
                        <p className="text-[#8E8E8E] text-sm">Real-time technical analysis, buy/sell range, current price, and confidence.</p>
                     </div>
                     <div className="bg-[#fbfafa] shadow-xl rounded-[10px] px-5 py-8 text-center">
                        <div className="flex justify-center items-center mb-3">
                           <MdTipsAndUpdates className="text-5xl" />
                        </div>
                        <h3 className="text-[#083991] text-xl mb-2">AI-Powered Insights</h3>
                        <p className="text-[#8E8E8E] text-sm">Our engine analyzes trends, volume, volatility & more.</p>
                     </div>
                     <div className="bg-[#fbfafa] shadow-xl rounded-[10px] px-5 py-8 text-center">
                        <div className="flex justify-center items-center mb-3">
                           <IoMdSave className="text-5xl" />
                        </div>
                        <h3 className="text-[#083991] text-xl mb-2">Search History</h3>
                        <p className="text-[#8E8E8E] text-sm">View all your previous searches and outcomes.</p>
                     </div>
                        <div className="bg-[#fbfafa] shadow-xl rounded-[10px] px-5 py-8 text-center">
                        <div className="flex justify-center items-center mb-3">
                           <AiFillSafetyCertificate className="text-5xl" />
                        </div>
                        <h3 className="text-[#083991] text-xl mb-2">Secure Accounts</h3>
                        <p className="text-[#8E8E8E] text-sm">Login with email and protect your data.</p>
                     </div>
                     <div className="bg-[#fbfafa] shadow-xl rounded-[10px] px-5 py-8 text-center">
                        <div className="flex justify-center items-center mb-3">
                           <IoIosListBox className="text-5xl" />
                        </div>
                        <h3 className="text-[#083991] text-xl mb-2">Subscription Tiers</h3>
                        <p className="text-[#8E8E8E] text-sm">Free users get 2 searches/day; 10$ for 10 predictions, 100$ for 120 predictions, Reach out for enterprise level.</p>
                     </div>
                  </div>
               </div>
            </div>
            {/* Key benefits section ends here */}
      {/* how in works section ends here */}

      {/* Why Choose Us section ends here */}
    </div>
  )
}

export default page