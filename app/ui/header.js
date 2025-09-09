'use client';

import React from 'react';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Label, TextInput, Select } from "flowbite-react";
import Link from 'next/link';
import logo from '../assets/imagesource/logo.png';
import Image from 'next/image';

import { useState } from "react";

import { ToastContainer } from 'react-toastify';
import VerifyOtpModal from '../modal/verifyOtpModal';
import LoginModal from '../modal/LoginModal';
import RegistrationModal from '../modal/RegistrationModal';
import PriceListModal from '../modal/PriceListModal';

import { FaArrowRight } from "react-icons/fa6";
import { AiOutlineLogin } from 'react-icons/ai';
import ChoiceModal from '../modal/ChoiceModal';


const Header = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openChoiceModal,setOpenChoiceModal]=useState(false)
  const [chooseResumeType,setChooseResumeType]=useState()
  const [openVerifyOtpModal, setOpenVerifyOtpModal] = useState(false);
  const [openPricModal, setOpenPriceModal] = useState(false)

  // For mobile menu start here
  // Add state to manage navbar collapse
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Function to toggle navbar
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  // Function to close navbar when menu item is clicked
  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };
  // For mobile menu ends here



  return (
    <div>
      <ToastContainer />
      <div className="header_section w-full lg:pb-0 absolute left-0 lg:top-4">
        <div className="max-w-6xl mx-auto pt-4.5 lg:pt-0 lg:py-5 px-4 lg:px-5 rounded-b-2xl relative z-10">
          <div className="w-full">
            <div className="header_top flex justify-between items-center">
              <div className="flex items-center justify-between">
                {/* Logo area start here */}
                <div className="mr-2 hidden lg:block">
                  <Link href="/" passHref>
                    <Image src={logo} alt='logo' className='  ' />
                  </Link>
                </div>
                <div className="mr-2 lg:hidden">
                  <Link href="/" passHref>
                    <Image src={logo} alt='logo' className='w-[70px]' />
                  </Link>
                </div>
                {/* Logo area ends here */}

              </div>
              {/* Main menu start here */}
              <div className="menu_section pb-0">
                <div className="main_menu">
                  <Navbar fluid rounded className="bg-transparent pt-0 pb-0">
                    <div className="flex md:order-2 text-black toggle_point">
                      <NavbarToggle onClick={toggleNavbar} />
                    </div>
                    <NavbarCollapse className={isNavbarOpen ? 'block' : 'hidden md:block'}>
                      <li onClick={closeNavbar}>
                        <Link href="/" passHref>
                          Home
                        </Link>
                      </li>
                      <li onClick={closeNavbar}>
                        <Link href="/" passHref>
                          About Us
                        </Link>
                      </li>
                      <li onClick={closeNavbar}>
                        <Link href="/" passHref>
                          Services
                        </Link>
                      </li>
                    </NavbarCollapse>
                  </Navbar>
                </div>
              </div>
              {/* Main menu ends here */}
              {/* Login section start here */}
              <div className="mr-10 lg:mr-0 flex items-center mt-0 lg:mt-0">
                {/* <div className="flex gap-2">
                  <button onClick={() => setOpenLoginModal(true)} className="text-[#FF0000] bg-white cursor-pointer font-medium text-xs lg:text-sm rounded-[5px] px-2 py-1 lg:px-6 lg:py-2 border-2 border-[#FF0000] hover:bg-[#FF0000] hover:text-[#ffffff]">
                    Login
                  </button>
                  <button onClick={() => setOpenRegisterModal(true)} className="text-white bg-[#FF0000] cursor-pointer font-medium text-xs lg:text-sm rounded-[5px] px-2 py-1 lg:px-6 lg:py-2 border-2 border-[#FF0000] hover:bg-white hover:text-[#FF0000]">
                    Get Started
                  </button>
                </div> */}
                <div className="flex gap-2">
                  {/* <button onClick={() => setOpenLoginModal(true)} className="text-[#046D78] bg-white cursor-pointer font-medium text-xs lg:text-sm rounded-[5px] px-2 py-1 lg:px-6 lg:py-2 border-2 border-[#046D78] hover:bg-[#046D78] hover:text-[#ffffff]">
                    Login
                  </button> */}
                    <button onClick={() => setOpenLoginModal(true)} className="text-white bg-[#800080] flex items-center cursor-pointer font-medium text-xs lg:text-[16px] rounded-[5px] px-2 py-1 lg:px-6 lg:py-3 border-2 border-[#800080] hover:bg-white hover:text-[#800080]">
                    Log in
                    <AiOutlineLogin className='ml-2' />
                  </button>
                  <button onClick={() => setOpenChoiceModal(true)} className="text-white bg-[#800080] flex items-center cursor-pointer font-medium text-xs lg:text-[16px] rounded-[5px] px-2 py-1 lg:px-6 lg:py-3 border-2 border-[#800080] hover:bg-white hover:text-[#800080]">
                    Get Started
                    <FaArrowRight className='ml-2' />
                  </button>
                </div>
              </div>
              {/* Login section ends here */}
            </div>
          </div>

          {/* Login popup start here */}
          <>
            {openLoginModal &&
              <LoginModal
                openLoginModal={openLoginModal}
                setOpenLoginModal={setOpenLoginModal}
                setOpenRegisterModal={setOpenRegisterModal}
                setOpenChoiceModal={setOpenChoiceModal}
              />
            }
          </>
          {/* Login popup ends here */}


          {/* register popup start here */}
          <>
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

          </>
          {/* register popup ends here */}
          {
            openPricModal && (
              <PriceListModal
                openPricModal={openPricModal}
                setOpenPriceModal={setOpenPriceModal}
              />
            )
          }
          {
            openChoiceModal&&(
              <ChoiceModal
              openChoiceModal={openChoiceModal}
              setOpenChoiceModal={setOpenChoiceModal}
              setChooseResumeType={setChooseResumeType}
              setOpenRegisterModal={setOpenRegisterModal}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Header