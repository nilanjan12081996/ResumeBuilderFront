import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";

import howItWorksImg from "../assets/imagesource/how_it_works_img.png";
import hw01 from "../assets/imagesource/hw01.png";
import hw02 from "../assets/imagesource/hw02.png";
import hw03 from "../assets/imagesource/hw03.png";
import hw04 from "../assets/imagesource/hw04.png";
import Image from 'next/image';

import How_it_works from "../assets/imagesource/How_it_works.png";

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
               <div className="w-full px-0 pt-14 lg:pt-24 text-center">
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-0 lg:mb-4">How It <span>Works</span></h1>
                  <p className="text-[#4C4B4B] text-sm lg:text-[18px] leading-[24px] mb-5 lg:mb-4">From Coin Search to Confidence — in Seconds</p>
               </div>
           </div>
        </div>
        </div>
      </div>
      {/* Why Choose Us section start here */}
      {/* how in works section start here */}
      <div className="how_it_works_section py-4 px-4 lg:px-0 lg:py-24">
         <div className='max-w-6xl mx-auto flex justify-center items-center h-full'>
            <div className="lg:flex gap-20">
               <div className="lg:w-6/12">
                 <Image src={How_it_works} alt='How_it_works' className='' />
               </div>
               <div className="lg:w-6/12 flex justify-center items-center">
                 <div>
                     <div className="my-7">
                        <div className="flex gap-4 mb-6">
                           <div className="w-[48px]">
                              <Image src={hw01} alt='hw01' className='' />
                           </div>
                           <div>
                              <p className="text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-0">Search a Coin</p>
                              <p className="text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0">Type in the coin symbol (e.g., BTC) and hit search.</p>
                           </div>
                        </div>
                        <div className="flex gap-4 mb-6">
                           <div className="w-[60px]">
                              <Image src={hw02} alt='hw02' className='' />
                           </div>
                           <div>
                              <p className="text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-0">Let Our AI Analyze</p>
                              <p className="text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0">Our backend fetches data, runs technical models, and generates insights.</p>
                           </div>
                        </div>
                        <div className="flex gap-4 mb-6">
                           <div className="w-[60px]">
                              <Image src={hw03} alt='hw03' className='' />
                           </div>
                           <div>
                              <p className="text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-0">View Results</p>
                              <p className="text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0">Get price, buy/sell recommendations, and market confidence levels.</p>
                           </div>
                        </div>
                        <div className="flex gap-4 mb-6">
                           <div className="w-[60px]">
                              <Image src={hw04} alt='hw04' className='' />
                           </div>
                           <div>
                              <p className="text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-0">Track Your History</p>
                              <p className="text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0">See what you&apos;ve searched and how each coin performed later.</p>
                           </div>
                        </div>
                        
                     </div>
                 </div>
               </div>
            </div>
         </div>
      </div>
      {/* how in works section ends here */}

      {/* Why Choose Us section ends here */}
    </div>
  )
}

export default page