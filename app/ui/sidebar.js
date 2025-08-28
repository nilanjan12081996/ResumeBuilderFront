'use client';

import Image from 'next/image';
import Link from 'next/link'
import React, { useCallback, useEffect, useRef } from 'react'

import logo from '../assets/imagesource/logo.png';
import footer_logo from "../assets/imagesource/footer_logo.png";
import logoAdmin from "../assets/imagesource/logo_admin.png";

import { useState } from "react";

import { Poppins } from 'next/font/google';

import { BiSolidDashboard } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { usePathname, useRouter } from 'next/navigation';
import { FaRectangleList } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { getSearchHistory, reset } from '../reducers/SearchHistroySlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/AuthSlice';

import { HiDocumentText } from "react-icons/hi2";
import { HiHome } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // specify desired weights
  display: 'swap',
});

const Sidebar = () => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch()
  const { historyData, pagination, loading } = useSelector(state => state.his);
  const loaderRef = useRef(null);
  const topLoaderRef = useRef(null);
  //console.log(sidebarOpen,"sidebarOpen");
  const router = useRouter();
  const handleLogout = () => {
    // dispatch(logout())

    try {

      // Dispatch logout action
      dispatch(logout());
      dispatch(reset());

      // Navigate to home page
      router.push("/");

      // Force reload to ensure clean state
      // setTimeout(() => {
      //   window.location.reload();
      // }, 100);
    } catch (error) {
      console.error("Logout error:", error);
      // Fallback: still navigate to home
      router.push("/");
    }

  };

  const openMobileMenu = () => {
    setSidebarOpen(prev => !prev);
  }

  // For mobile menu start here
  // Add state to manage navbar collapse
  // const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  // Function to toggle navbar
  const toggleNavbar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to close navbar when menu item is clicked
  const closeNavbar = () => {
    setSidebarOpen(false);
  };
  // For mobile menu ends here
  

  


  

  return (
    <aside
      style={{ zIndex: 1 }}
      className={`absolute left-0 top-0 lg:top-[50px] z-9999 flex h-screen w-[240px] lg:w-auto flex-col lg:rounded-[0px] bg-[#ffffff] duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <button onClick={openMobileMenu} className={`menu_btn ${sidebarOpen ? 'right-[-24px]' : 'right-[-84px]'}`}>
        <FiMenu className='text-white text-xl' />
      </button>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="px-6 py-5 lg:py-6">
        <Link className='flex justify-center items-center' href="/dashboard" passHref>
          <Image src={logoAdmin} alt="logoAdmin" className='w-6/12' />
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill="#ffffff"
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className={`${poppins.className} sidebar_menu no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear overscroll-none`}>
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-2">
          {/* <!-- Menu Group --> */}
          <div>

            <ul className="mb-6 flex flex-col gap-1.5 mx-4">
              <li onClick={closeNavbar}>
                <Link href="/dashboard"
                  className={`group relative flex items-center gap-2 rounded-sm py-3 px-4 font-normal text-base text-[#8C8C8C] duration-300 ease-in-out hover:bg-graydark ${pathname.includes('dashboard') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                  passHref>
                  <HiHome className='text-2xl' />
                  Dashboard
                </Link>
              </li>

              <li onClick={closeNavbar}>
                <Link href="/resume-history"
                  className={`group relative flex items-center gap-2 rounded-sm py-3 px-4 font-normal text-base text-[#8C8C8C] duration-300 ease-in-out hover:bg-graydark ${pathname.includes('resume-history') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                  passHref>
                  <HiDocumentText className='text-2xl' />
                  Resume History
                </Link>
              </li>
              <li onClick={closeNavbar}>
                <Link href="/resume-templates"
                  className={`group relative flex items-center gap-2 rounded-sm py-3 px-4 font-normal text-base text-[#8C8C8C] duration-300 ease-in-out hover:bg-graydark ${pathname.includes('resume-templates') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                  passHref>
                  <BiSolidDashboard className='text-2xl' />
                  Resume Templates
                </Link>
              </li>

                    <li onClick={closeNavbar}>
                <Link href="/plans"
                  className={`group relative flex items-center gap-2 rounded-sm py-3 px-4 font-normal text-base text-[#8C8C8C] duration-300 ease-in-out hover:bg-graydark ${pathname.includes('resume-templates') &&
                    'bg-graydark dark:bg-meta-4'
                    }`}
                  passHref>
                  <BiSolidDashboard className='text-2xl' />
                  Plans
                </Link>
              </li>

                <li onClick={closeNavbar}>
                <button
                onClick={handleLogout}
                  className={`group relative flex items-center gap-2 rounded-sm py-3 px-4 font-normal text-base text-[#8C8C8C] duration-300 ease-in-out hover:bg-graydark ${pathname.includes('resume-templates') &&
                    'bg-graydark dark:bg-meta-4 cursor-pointer'
                    }`}
                  passHref>
                  <CiLogout className='text-2xl' />
                  Logout
                </button>
              </li>
            </ul>

          </div>

        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  )
}

export default Sidebar