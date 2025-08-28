import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
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
                  <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>At CryptoIntuit (“we”, “us”, or “our”), your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website (https://cryptointuit.com) or use our services.</p>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>1. Information We Collect</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>Personal Information:</p>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>We may collect personal information such as:</p>
                     <ul className='ml-5'>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Full name</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Email address</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Wallet address (if applicable)</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Payment details (handled securely via third-party services)</li>
                     </ul>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>2. Cookies</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>We use cookies and similar technologies to enhance your experience, analyze traffic, and personalize content. You may disable cookies through your browser settings at any time.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>3. How We Use Your Information</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>We may use your information to:</p>
                     <ul className='ml-5'>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Provide and improve our services</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Process transactions securely</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Send updates, newsletters, or promotional content (if you opt in)</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Analyze site performance and user behavior</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Prevent fraud, spam, and abuse</li>
                     </ul>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>4. Data Sharing</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>We do not sell or trade your personal data. We may share data with trusted third-party service providers (such as payment processors and analytics tools) solely to operate and enhance our platform.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>5. Data Security</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>We take appropriate measures to protect your information. However, no method of transmission over the internet is 100% secure. Use the platform at your own risk.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>6. Your Rights</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>You may have the right to:</p>
                     <ul className='ml-5'>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Access your personal information</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Update or correct your information</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Request deletion of your data</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Withdraw from marketing communications</li>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>To exercise these rights, please email us at customerservice@adaptrixai.com.</li>
                     </ul>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>7. Children’s Privacy</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>CryptoIntuit is not intended for children under 13. We do not knowingly collect personal information from children.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>8. Changes to This Policy</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>We may update this Privacy Policy from time to time. Any changes will be reflected on this page, with the effective date updated accordingly.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>9. Contact Us</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-0'>customerservice@adaptrixai.com</p>
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