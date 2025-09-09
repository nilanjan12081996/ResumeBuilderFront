'use client';

import Image from 'next/image'
import React, { useEffect } from 'react'

import userFace from "../assets/imagesource/user_face.png";

import logoAdmin from "../assets/imagesource/logo_admin.png";

import { Poppins } from 'next/font/google';

import { useState } from "react";
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/AuthSlice';
import { useRouter } from 'next/navigation';
import { getProfile } from '../reducers/ProfileSlice';
import { FaRectangleList } from 'react-icons/fa6';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { BiSolidDashboard } from 'react-icons/bi';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // specify desired weights
  display: 'swap',
});

const Insideheader = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { profileData } = useSelector((state) => state?.profile)
  const handleLogout = () => {
    // dispatch(logout())

    try {

      // Dispatch logout action
      dispatch(logout());

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
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  console.log("headrr", profileData);


  return (
    <div className='bg-[#ffffff] rounded-[0px] py-4 px-6 mb-6 border-l border-[#f3f4f6]'>
      <div className='flex justify-between items-center'>
        <div className='w-3/12'>
          <Link className='block lg:hidden' href="/dashboard" passHref>
            <Image src={logoAdmin} alt="logoAdmin" className='w-full' />
          </Link>
        </div>
        <div>
          <div className='flex justify-end items-center gap-3'>
            {/* <button onClick={handleLogout} className='mr-4 text-black cursor-pointer'>Logout</button> */}
            <p className='text-base text-[#CDCDCD] ${leagueSpartan.className}'>{profileData?.data?.fullname}</p>
            <div className='user_face'>
              {profileData?.data?.avatar ? (
                <Image src={profileData?.data?.avatar} alt="userFace" width={50} height={50} className='rounded-full w-[50px] h-[50px]' />

              ) : (
                <Image src={userFace} alt="userFace" width={50}
                  height={50} className='rounded-full w-[50px] h-[50px]' />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Insideheader