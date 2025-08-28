import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
import About_us from "../assets/imagesource/About_us.png";
import how_it_works_img from "../assets/imagesource/how_it_works_img.png";
import How_it_works from "../assets/imagesource/How_it_works.png";
import Image from 'next/image';

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
               <div className="w-full px-4 pt-14 lg:pt-24 text-center">
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">About <span>Us</span></h1>
                  <p className="text-[#4C4B4B] text-sm lg:text-[18px] leading-[24px] mb-5 lg:mb-4">Built for Traders, by Traders (and AI Geeks)</p>
               </div>
           </div>
        </div>
        </div>
      </div>
      {/* Why Choose Us section start here */}
      <div className="about_section">
        <div className="max-w-6xl mx-auto lg:py-4 px-4 lg:px-0">
          <div className="lg:flex mb-28">
            <div className="lg:w-6/12 mb-4 lg:mb-0">
              <Image src={About_us} alt='About_us' className="" />
            </div>
            <div className="lg:w-6/12 lg:pl-10 flex justify-center items-center">
              <div>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">CryptoIntuit is a cutting-edge crypto trading insights platform developed by AdaptrixAI, an award‑wining AI consulting firm based in Melbourne. Built by traders and AI specialists, CryptoIntuit takes the complexity out of crypto data and empowers traders with smart insights and fast decisions.</p>
                <h2 className="text-[#0B0B2C] text-xl lg:text-2xl lg:leading-[40px] font-extrabold capitalize pb-0">Mission</h2>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">CryptoIntuit’s mission is to democratize crypto trading intelligence. We provide tools and insights that once belonged to institutional traders—making advanced analysis accessible to all.</p>
                <h2 className="text-[#0B0B2C] text-xl lg:text-2xl lg:leading-[40px] font-extrabold capitalize pb-0">Vision</h2>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">We aspire to be the AI co‑pilot for every crypto investor, combining human insight with autonomous AI to help users make faster, smarter, and more confident trading decisions.</p>
              </div>
            </div>
          </div>
          <div className="lg:flex mb-28">
            <div className="lg:w-6/12 lg:pr-10 flex justify-center items-center">
              <div>
                <h2 className="text-[#0B0B2C] text-xl lg:text-4xl lg:leading-[70px] font-extrabold capitalize pb-0">Why AdaptrixAI?</h2>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">AdaptrixAI is at the forefront of transforming how businesses harness artificial intelligence and data science. We craft agentic AI solutions—intelligent systems that learn from data and take autonomous actions to streamline operations and create measurable value</p>
                <div className='mb-7'>
                  <ul className='pl-5 gap-4'>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Adaptrix IT +13</li>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Adaptrix AI +13</li>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Adaptrix AI +13</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:w-6/12 mb-4 lg:mb-0">
              <Image src={how_it_works_img} alt='how_it_works_img' className="" />
            </div>
          </div>
          <div className='mb-28'>
            <h3 className="text-[#0B0B2C] text-xl lg:text-4xl lg:leading-[70px] font-extrabold capitalize text-center pb-10">Key strengths</h3>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='p-6 rounded-2xl shadow-xl'>
                 <h3 className='text-[#0B0B2C] text-xl lg:text-2xl lg:leading-[40px] font-semibold capitalize pb-0'>Tailored AI Services</h3>
                 <p className='text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4'>Specializing in AI consulting, generative AI development, data engineering, MLOps, and industry‑specific automation</p>
                 <ul className='pl-5 gap-4'>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>LinkedIn +1</li>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Adaptrix AI +1</li>
                  </ul>
              </div>
              <div className='p-6 rounded-2xl shadow-xl'>
                 <h3 className='text-[#0B0B2C] text-xl lg:text-2xl lg:leading-[40px] font-semibold capitalize pb-0'>Agentic AI Expertise</h3>
                 <p className='text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4'>Deploying autonomous agents that adapt to dynamic environments and align with real-world business goals</p>
                 <ul className='pl-5 gap-4'>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>AI Magazine +15</li>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Adaptrix AI +15</li>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Adaptrix AI +15</li>
                  </ul>
              </div>
              <div className='p-6 rounded-2xl shadow-xl'>
                 <h3 className='text-[#0B0B2C] text-xl lg:text-2xl lg:leading-[40px] font-semibold capitalize pb-0'>Real Impact</h3>
                 <p className='text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4'>Proven enterprise-grade solutions, from AI chatbots and predictive analytics to automation across sectors like finance, energy, retail, and travel</p>
                 <ul className='pl-5 gap-4'>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Adaptrix AI +1</li>
                    <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>LinkedIn +1</li>
                  </ul>
              </div>
            </div>
          </div>
          <div className="lg:flex mb-28">
            <div className="lg:w-6/12 mb-4 lg:mb-0">
              <Image src={How_it_works} alt='How_it_works' className="" />
            </div>
            <div className="lg:w-6/12 lg:pl-10 flex justify-center items-center">
              <div>
                <h2 className="text-[#0B0B2C] text-xl lg:text-2xl lg:leading-[40px] font-extrabold capitalize pb-0">Built By Traders & AI Geeks</h2>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">CryptoIntuit was born from the frustrations of sifting through endless data and charts. Developed by AdaptrixAI’s AI experts and trading professionals, our platform simplifies data to actionable insights so you can focus on strategy—not spreadsheets.</p>
                <h2 className="text-[#0B0B2C] text-xl lg:text-2xl lg:leading-[40px] font-extrabold capitalize pb-0">Our Approach</h2>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">Data‑driven yet human‑centered: AI analyzes and highlights the signal—you make the decision.</p>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">Transparent and explainable: All model reasoning is visible and interpretable.</p>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">Continuously evolving: With real‑time feedback and ongoing AI refinement, our platform improves with your use.</p>
                                <h2 className="text-[#0B0B2C] text-xl lg:text-2xl lg:leading-[40px] font-extrabold capitalize pb-0">Trust & Reliability</h2>
                <p className="text-[#69697B] font-medium text-sm leading-[24px] lg:text-base lg:leading-[26px] pb-4">Because CryptoIntuit is backed by AdaptrixAI, you can be confident in its reliability, scalability, and mission alignment. Our parent company has partnered with global enterprises to deliver advanced AI tools that drive practical outcomes and long‑term growth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Why Choose Us section ends here */}
    </div>
  )
}

export default page