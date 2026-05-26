'use client';

import React from 'react'
import Link from 'next/link';
import footerLogo from "../assets/imagesource/ResumeMile_logo_footer.png";
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='bg-[#18181B] text-[#A1A1AA] py-16 px-6 lg:px-10 font-jakarta border-t border-[#27272A]'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8'>

          {/* Logo & Description */}
          <div className='lg:col-span-4'>
            <div className='mb-6'>
              <Image src={footerLogo} alt='ResumeMile Logo' className='h-[42px] w-auto' style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className='text-[14px] leading-[24px] font-light mb-6 pr-4 text-[#A1A1AA]'>
              Built by ex-MAANG recruiters who've reviewed 50,000+ resumes. We know exactly what gets you shortlisted — and what gets you filtered out.
            </p>
            <a href="mailto:info@resumemile.ai" className='text-[#dfa8de] hover:text-[#CE82CC] transition-colors text-[14px]'>
              info@resumemile.ai
            </a>
          </div>

          {/* Spacer */}
          <div className='hidden lg:block lg:col-span-2'></div>

          {/* Links Columns */}
          <div className='lg:col-span-2'>
            <h4 className='text-[11px] font-bold tracking-widest text-[#71717A] uppercase mb-6'>Services</h4>
            <ul className='flex flex-col gap-4 text-[14px] font-light'>
              <li><button onClick={() => window.dispatchEvent(new Event('open-signup-modal'))} className='hover:text-white transition-colors text-left w-full'>Build My Resume</button></li>
              <li><button onClick={() => window.dispatchEvent(new Event('open-signup-modal'))} className='text-[#dfa8de] hover:text-[#CE82CC] transition-colors text-left w-full'>Match to Job Description</button></li>
              <li><button onClick={() => window.dispatchEvent(new Event('open-signup-modal'))} className='hover:text-white transition-colors text-left w-full'>LinkedIn Rewrite</button></li>
              <li><button onClick={() => window.dispatchEvent(new Event('open-signup-modal'))} className='hover:text-white transition-colors text-left w-full'>Resume Templates</button></li>
            </ul>
          </div>

          <div className='lg:col-span-2'>
            <h4 className='text-[11px] font-bold tracking-widest text-[#71717A] uppercase mb-6'>Company</h4>
            <ul className='flex flex-col gap-4 text-[14px] font-light'>
              <li><Link href="/#services" className='hover:text-white transition-colors'>About Us</Link></li>
              <li><Link href="/#pricing" className='hover:text-white transition-colors'>Pricing</Link></li>
              <li><Link href="/support" className='hover:text-white transition-colors'>Support</Link></li>
            </ul>
          </div>

          <div className='lg:col-span-2'>
            <h4 className='text-[11px] font-bold tracking-widest text-[#71717A] uppercase mb-6'>Legal</h4>
            <ul className='flex flex-col gap-4 text-[14px] font-light'>
              <li><Link href="/privacy-policy" className='hover:text-white transition-colors'>Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className='hover:text-white transition-colors'>Terms & Conditions</Link></li>
              <li><Link href="/cancellation-policy" className='hover:text-white transition-colors'>Cancellation Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom line */}
        <div className='border-t border-[#27272A] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-[#71717A] font-light'>
          <p>© 2026 HiringEye Solutions Private Limited · T-Hub, Hyderabad Knowledge City, Telangana 500081</p>
          <p></p>
        </div>
      </div>
    </div>
  )
}

export default Footer;