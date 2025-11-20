// 'use client';

// import Image from 'next/image'
// import React, { useEffect } from 'react'

// import userFace from "../assets/imagesource/user_face.png";

// import logoAdmin from "../assets/imagesource/logo_admin.png";

// import { Poppins } from 'next/font/google';

// import { useState } from "react";
// import { usePathname } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProfile, logout } from '../reducers/AuthSlice';
// import { useRouter } from 'next/navigation';

// import { FaRectangleList } from 'react-icons/fa6';
// import Link from 'next/link';
// import { FaUser } from 'react-icons/fa';
// import { BiSolidCrown, BiSolidDashboard } from 'react-icons/bi';
// import { MdOutlineLogout } from 'react-icons/md';
// import { currentSubscription } from '../reducers/PlanSlice';


// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'], // specify desired weights
//   display: 'swap',
// });

// const Insideheader = () => {
//   const pathname = usePathname();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { profileData } = useSelector((state) => state?.profile)
//   const { currentSubscriptionData } = useSelector((state) => state?.planst)
//   const [open, setOpen] = useState(false);
//   const handleLogout = () => {
//     // dispatch(logout())

//     try {

//       // Dispatch logout action
//       dispatch(logout());
//       setOpen(false);
//       // Navigate to home page
//       router.push("/");

//       // Force reload to ensure clean state
//       // setTimeout(() => {
//       //   window.location.reload();
//       // }, 100);
//     } catch (error) {
//       console.error("Logout error:", error);
//       // Fallback: still navigate to home
//       router.push("/");
//     }

//   };
//   useEffect(() => {
//     dispatch(getProfile())
//     dispatch(currentSubscription());
//   }, [])

//   const handleUpgrade = () => {
//     router.push("/plans");
//   };

//   const hasActiveSubscription = () => {
//     if (!currentSubscriptionData?.data || !Array.isArray(currentSubscriptionData.data)) return false;

//     const activeSub = currentSubscriptionData.data.find((sub) => {
//       const endDate = new Date(sub.end_date || sub.subscription_end_date);
//       const currentDate = new Date();
//       return sub.status === 1 && endDate > currentDate;
//     });

//     return !!activeSub;
//   };




//   return (
//     <div className='bg-[#ffffff] rounded-[0px] py-4 px-6 mb-6 border-l border-[#f3f4f6]'>
//       <div className='flex justify-between items-center'>
//         <div className='w-3/12'>
//           <Link className='block lg:hidden' href="/dashboard" passHref>
//             <Image src={logoAdmin} alt="logoAdmin" className='w-full' />
//           </Link>
//         </div>
//         <div>
//           <div className='flex justify-end items-center gap-3'>
//             {hasActiveSubscription() ? (
//               <button
//                 onClick={handleUpgrade}
//                 className='mr-4 cursor-pointer bg-[#30B980] hover:bg-[#249b6e] text-[15px] leading-[45px] rounded-[25px] text-white font-semibold px-5 flex items-center gap-1 transition-all duration-300'
//               >
//                 <BiSolidCrown className='text-xl' />
//                 Subscription Plan
//               </button>
//             ) : (
//               <button
//                 onClick={handleUpgrade}
//                 className='mr-4 cursor-pointer bg-[#800080] hover:bg-black text-[15px] leading-[45px] rounded-[25px] text-white font-semibold px-5 flex items-center gap-1 transition-all duration-300'
//               >
//                 <BiSolidCrown className='text-xl' />
//                 Upgrade Now
//               </button>
//             )}
//             <p className='text-base text-[#cccccc] ${leagueSpartan.className}'>{profileData?.data?.fullname}</p>
//             <div className="relative">
//               {/* Profile Image */}
//               <div
//                 className="user_face cursor-pointer"
//                 onClick={() => setOpen(!open)}
//               >
//                 {profileData?.data?.avatar ? (
//                   <Image
//                     src={profileData?.data?.avatar}
//                     alt="userFace"
//                     width={50}
//                     height={50}
//                     className="rounded-full w-[50px] h-[50px] border border-gray-300"
//                   />
//                 ) : (
//                   <div className="rounded-full w-[50px] h-[50px] bg-gray-300 flex items-center justify-center border border-gray-300">
//                     <FaUser className="text-gray-600 text-[24px]" />
//                   </div>
//                 )}
//               </div>

//               {/* Dropdown Modal */}
//               {open && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
//                   <ul className="flex flex-col text-sm py-2">
//                     <li
//                       className=" flex align-center px-4 py-2 gap-2  duration-300 ease-in-out cursor-pointer text-[#8C8C8C] hover:bg-graydark hover:text-[#a635a2]"
//                       onClick={handleLogout}
//                     >
//                       <MdOutlineLogout className="text-2xl" />
//                       <p className='pt-1'>Logout</p>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//             {/* <div className='user_face'>
//               {profileData?.data?.avatar ? (
//                 <Image src={profileData?.data?.avatar} alt="userFace" width={50} height={50} className='rounded-full w-[50px] h-[50px]' />

//               ) : (
//                 <Image src={userFace} alt="userFace" width={50}
//                   height={50} className='rounded-full w-[50px] h-[50px]' />
//               )}

//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Insideheader

'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { BiSolidCrown } from 'react-icons/bi';
import { MdOutlineLogout } from 'react-icons/md';

import { getProfile, logout } from '../reducers/AuthSlice';
import { getIpData, currentSubscription, cancelSubscription } from '../reducers/PlanSlice';

import userFace from "../assets/imagesource/user_face.png";
import logoAdmin from "../assets/imagesource/logo_admin.png";
import { toast } from 'react-toastify';

const Insideheader = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { profileData } = useSelector((state) => state?.profile);
  const { currentSubscriptionData, ipData, loading } = useSelector((state) => state?.planst);

  const [open, setOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    dispatch(getProfile());

    // Fetch IP first, then subscription
    const fetchIpAndSubscription = async () => {
      const ipResult = await dispatch(getIpData());
      if (ipResult?.payload?.ip) {
        const ip_address = ipResult.payload.ip;
        dispatch(currentSubscription(ip_address));
      }
    };

    fetchIpAndSubscription();
  }, []);

  const handleLogout = () => {
    try {
      dispatch(logout());
      setOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  const hasActiveSubscription = () => {
    if (!currentSubscriptionData?.data || !Array.isArray(currentSubscriptionData.data)) return false;
    const activeSub = currentSubscriptionData.data.find((sub) => {
      const endDate = new Date(sub.end_date || sub.subscription_end_date);
      const currentDate = new Date();
      return sub.status === 1 && endDate > currentDate;
    });
    return !!activeSub;
  };

  const handleUpgrade = () => {
    router.push("/plans");
  };

  const confirmCancel = async () => {
    if (!ipData?.ip) return;

    const res = await dispatch(cancelSubscription({ ip_address: ipData.ip }));

    const result = res?.payload;

    console.log("result", result);

    if (result?.status === true) {
      toast.success("Your Subscription is successfully Cancelled");

      setShowCancelModal(false);
      dispatch(currentSubscription(ipData.ip));
      router.push("/dashboard");

    } else {
      toast.error(result?.message || "Failed to cancel subscription");
    }
  };


  return (
    <div className='bg-[#ffffff] rounded-[0px] py-4 px-6 mb-6 border-l border-[#f3f4f6]'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div className='w-3/12'>
          <Link className='block lg:hidden' href="/dashboard">
            <Image src={logoAdmin} alt="logoAdmin" className='w-full' />
          </Link>
        </div>

        {/* Buttons and profile */}
        <div className='flex justify-end items-center gap-3'>
          {/* Upgrade / Subscription Plan Button */}
          <button
            onClick={handleUpgrade}
            className={`mr-4 cursor-pointer text-[15px] leading-[45px] rounded-[25px] text-white font-semibold px-5 flex items-center gap-1 transition-all duration-300 ${hasActiveSubscription() ? "bg-[#30B980] hover:bg-[#249b6e]" : "bg-[#800080] hover:bg-black"
              }`}
          >
            <BiSolidCrown className='text-xl' />
            {hasActiveSubscription() ? "Subscription Plan" : "Upgrade Now"}
          </button>

          {/* Cancel Subscription Button */}
          {hasActiveSubscription() && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="mr-4 cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-[25px] transition-all duration-300"
            >
              Cancel Subscription
            </button>
          )}

          {/* Profile Name */}
          <p className='text-base text-[#cccccc]'>{profileData?.data?.fullname}</p>

          {/* Profile Image and Dropdown */}
          <div className="relative">
            <div
              className="user_face cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {profileData?.data?.avatar ? (
                <Image
                  src={profileData?.data?.avatar}
                  alt="userFace"
                  width={50}
                  height={50}
                  className="rounded-full w-[50px] h-[50px] border border-gray-300"
                />
              ) : (
                <div className="rounded-full w-[50px] h-[50px] bg-gray-300 flex items-center justify-center border border-gray-300">
                  <FaUser className="text-gray-600 text-[24px]" />
                </div>
              )}
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <ul className="flex flex-col text-sm py-2">
                  <li
                    className="flex align-center px-4 py-2 gap-2 cursor-pointer text-[#8C8C8C] hover:bg-graydark hover:text-[#a635a2]"
                    onClick={handleLogout}
                  >
                    <MdOutlineLogout className="text-2xl" />
                    <p className='pt-1'>Logout</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Subscription Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl w-96 text-center">
            <h2 className="text-lg font-semibold mb-4">Cancel Subscription</h2>
            <p className="mb-6 text-sm text-gray-600">
              By cancelling your subscription, you will lose access to premium features. Are you sure you want to continue?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 w-1/2"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white w-1/2"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Insideheader;
