import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
import Image from 'next/image';

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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">Privacy Policy</h1>
               </div>
           </div>
        </div>
        </div>
      </div>
      {/* Why Choose Us section start here */}
      {/* how in works section start here */}
            {/* Key benefits section start here */}
            <div className="key_benefits_section pt-10 lg:pt-20 pb-10 px-4 lg:px-0">
               <div className='max-w-6xl mx-auto'>
                  <p className='text-sm lg:text-base leading-[24px] text-[#4C4B4B] mb-2'>ResumeMile we are committed to protecting your privacy. This Privacy Policy explains how we 
                     collect, use, store, and protect your personal information when you access or use our website, platform, or services (collectively, the “Services”).</p>
                  <p className='text-sm lg:text-base leading-[24px] text-[#4C4B4B] mb-2'>By using ResumeMile, you consent to the practices described in this Privacy Policy.</p>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>1. Information We Collect</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-4'>We collect the following types of information:</p>
                     <div className='mb-4'>
                        <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>a) Information You Provide</p>
                        <ul className='ml-5'>
                           <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Job Seekers: Name, email, phone number, resume/CV, employment history, education, skills, profile details.</li>
                           <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Employers/Recruiters: Name, company details, job postings, contact information.</li>
                           <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Support Queries: Messages or feedback submitted via contact forms or email.</li>
                        </ul>
                     </div>
                     <div className='mb-4'>
                        <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>b) Automatically Collected Information</p>
                        <ul className='ml-5'>
                           <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>IP address, browser type, device information, usage statistics, and cookies.</li>
                        </ul>
                     </div>
                     <div className='mb-4'>
                        <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>c) Third-Party Data</p>
                        <ul className='ml-5'>
                           <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Data obtained from social logins (Google, LinkedIn, etc.), with your permission.</li>
                        </ul>
                     </div>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>2. How We Use Your Information</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-3'>We use your data to:</p>
                     <ul className='ml-5'>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Create and manage your account</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Connect job seekers with employers</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Improve and personalize our Services</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Send job alerts, updates, and service-related communications</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Prevent fraud and ensure platform security</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Comply with legal obligations</li>
                     </ul>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>3. Sharing of Information</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-3'>We may share your information in the following cases:</p>
                     <ul className='ml-5'>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>With Employers/Recruiters: If you apply for a job or make your profile visible.</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>With Service Providers: For hosting, analytics, email delivery, or payment processing.</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>For Legal Reasons: If required by law or to protect our rights and users.</li>
                     </ul>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>We do not sell your data to third parties.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>4. Cookies and Tracking</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>We use cookies to enhance your browsing experience. You can control cookie usage via your 
                        browser settings, but disabling them may affect certain features.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>5. Data Security</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>We implement administrative, technical, and physical safeguards to protect your information. However, no system is 100% secure, and we cannot guarantee absolute security.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>6. Data Retention</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>We retain your information as long as your account is active or as needed to provide our Services. You may 
                        request deletion at any time.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>7. Your Rights</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-3'>Depending on your location, you may have the right to:</p>
                     <ul className='ml-5'>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Access, update, or delete your data</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Withdraw consent or disable marketing communications</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Request account deletion</li>
                     </ul>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>To exercise these rights, contact us at [Insert Contact Email].</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>8. Third-Party Links</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>Our platform may contain links to external websites. We are not responsible for their privacy practices.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>9. Children’s Privacy</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>Our Services are not intended for individuals under 18 years of age. We do not knowingly collect data from minors.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>10. Changes to This Policy</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last Updated” date.</p>
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