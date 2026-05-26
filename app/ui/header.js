'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import logo from '../assets/imagesource/logo.png';
import headerLogo from '../assets/imagesource/ResumeMile_Logo.png';

import { ToastContainer } from 'react-toastify';
import VerifyOtpModal from '../modal/verifyOtpModal';
import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import PriceListModal from '../modal/PriceListModal';
import ChoiceModal from '../modal/ChoiceModal';

import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openChoiceModal, setOpenChoiceModal] = useState(false);
  const [chooseResumeType, setChooseResumeType] = useState();
  const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState(false);
  const [openPricModal, setOpenPriceModal] = useState(false);

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleOpenSignup = () => setOpenRegisterModal(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('open-signup-modal', handleOpenSignup);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-signup-modal', handleOpenSignup);
    };
  }, []);

  const toggleNavbar = () => setIsNavbarOpen(!isNavbarOpen);
  const closeNavbar = () => setIsNavbarOpen(false);

  const handleNavClick = (sectionId) => {
    closeNavbar();
    if (pathname === '/') {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 lg:px-10 transition-all duration-300 font-jakarta border-b ${
          scrolled 
            ? 'h-[64px] bg-white/95 shadow-sm border-transparent' 
            : 'h-[80px] bg-white/85 backdrop-blur-md border-[#dfa8de]/30'
        }`}
      >
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer mr-auto" onClick={() => router.push('/')}>
          <div className="hidden lg:block">
            <Image src={headerLogo} alt='logo' className='h-[42px] w-auto' />
          </div>
          <div className="lg:hidden">
            <Image src={logo} alt='logo' className='w-[70px] h-auto' />
          </div>
        </div>

        {/* Right Side Container: Menu + Actions */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Desktop Menu - Pill style */}
          <div className="flex gap-1 bg-[#FBF5FB] p-1 rounded-full border border-[#CAC4D0]">
            <div 
              onClick={() => handleNavClick('services')}
              className="text-[13px] font-medium text-[#79747E] px-[18px] py-[7px] rounded-full cursor-pointer transition-all hover:text-[#80007E] hover:bg-white hover:shadow-sm"
            >
              Services
            </div>
            <div 
              onClick={() => handleNavClick('how')}
              className="text-[13px] font-medium text-[#80007E] bg-white shadow-sm px-[18px] py-[7px] rounded-full cursor-pointer transition-all font-semibold"
            >
              How it works
            </div>
            <div 
              onClick={() => handleNavClick('pricing')}
              className="text-[13px] font-medium text-[#79747E] px-[18px] py-[7px] rounded-full cursor-pointer transition-all hover:text-[#80007E] hover:bg-white hover:shadow-sm"
            >
              Pricing
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <div 
              onClick={() => setOpenLoginModal(true)} 
              className="text-[14px] font-semibold text-[#80007E] cursor-pointer transition-colors hover:text-[#6B006A]"
            >
              Sign in
            </div>
            <button 
              onClick={() => setOpenChoiceModal(true)} 
              className="flex items-center gap-[6px] text-[14px] font-semibold text-white bg-[#80007E] px-[20px] py-[10px] rounded-xl border-none cursor-pointer transition-all hover:bg-[#6B006A] hover:shadow-[0_4px_12px_rgba(128,0,126,0.25)] hover:-translate-y-[1px] active:translate-y-0"
            >
              Sign up free <span className="text-[16px] leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={toggleNavbar} className="text-[#80007E] p-2 text-2xl focus:outline-none">
            {isNavbarOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isNavbarOpen && (
        <div className="fixed top-[64px] left-0 right-0 bg-white shadow-lg border-t border-[#dfa8de]/30 z-40 lg:hidden flex flex-col font-jakarta">
          <div 
            onClick={() => handleNavClick('services')}
            className="px-6 py-4 text-[15px] font-medium text-[#49454F] border-b border-[#F2E5F2] active:bg-[#FAF0FA]"
          >
            Services
          </div>
          <div 
            onClick={() => handleNavClick('how')}
            className="px-6 py-4 text-[15px] font-medium text-[#49454F] border-b border-[#F2E5F2] active:bg-[#FAF0FA]"
          >
            How it works
          </div>
          <div 
            onClick={() => handleNavClick('pricing')}
            className="px-6 py-4 text-[15px] font-medium text-[#49454F] border-b border-[#F2E5F2] active:bg-[#FAF0FA]"
          >
            Pricing
          </div>
          <div className="p-6 flex flex-col gap-3">
            <button 
              onClick={() => { closeNavbar(); setOpenLoginModal(true); }}
              className="w-full py-3 rounded-xl border border-[#80007E] text-[#80007E] font-semibold text-[15px]"
            >
              Sign in
            </button>
            <button 
              onClick={() => { closeNavbar(); setOpenChoiceModal(true); }}
              className="w-full py-3 rounded-xl bg-[#80007E] text-white font-semibold text-[15px] flex items-center justify-center gap-2"
            >
              Sign up free <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <>
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
        {openPricModal && (
          <PriceListModal
            openPricModal={openPricModal}
            setOpenPriceModal={setOpenPriceModal}
          />
        )}
        {openChoiceModal && (
          <ChoiceModal
            openChoiceModal={openChoiceModal}
            setOpenChoiceModal={setOpenChoiceModal}
            setChooseResumeType={setChooseResumeType}
            setOpenRegisterModal={setOpenRegisterModal}
          />
        )}
      </>
    </>
  )
}

export default Header;