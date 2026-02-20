
'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { BiSolidCrown } from 'react-icons/bi';
import { MdOutlineLogout } from 'react-icons/md';
import { MdDownload } from "react-icons/md";
import { getProfile, logout } from '../reducers/AuthSlice';
import { getIpData, currentSubscription, cancelSubscription } from '../reducers/PlanSlice';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import userFace from "../assets/imagesource/user_face.png";
import logoAdmin from "../assets/imagesource/logo_admin.png";
import { toast } from 'react-toastify';
import { useTabs } from '../context/TabsContext';

const Insideheader = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { profileData } = useSelector((state) => state?.profile);
  const { currentSubscriptionData, ipData, loading } = useSelector((state) => state?.planst);

  const [open, setOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const { pdfLoading, docxLoading } = useSelector((state) => state?.resume);
  const { activeTab, setActiveTab } = useTabs();
  const TAB_VISIBLE_ROUTES = [
    "/resume-builder",
    "/resume-builder-edit",
    "/improve-resume-builder",
    "/jd-resume-builder",
    "/linkedIn-rewrite"
  ];
  const showTabs = TAB_VISIBLE_ROUTES.some(route =>
    pathname.startsWith(route)
  );



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

  const handleDownloadPDF = () => {
    window.dispatchEvent(new CustomEvent("download-pdf"));
    setShowDownloadMenu(false);
  };

  const handleDownloadDocx = () => {
    window.dispatchEvent(new CustomEvent("download-docx"));
    setShowDownloadMenu(false);
  };

  return (
    <div className='bg-[#ffffff] rounded-[0px] py-2 px-6 border-l border-[#f3f4f6]'>
      <div className='flex justify-between items-center'>
        {/* Logo */}
        <div className=''>
          <Link className='block lg:hidden' href="/dashboard">
            <Image src={logoAdmin} alt="logoAdmin" className='w-full' />
          </Link>
        </div>

        {showTabs && (
          <div className="flex justify-center">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setActiveTab("edit")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition
        ${activeTab === "edit"
                    ? "bg-white shadow text-black"
                    : "text-gray-500 hover:text-black"}`}
              >
                Edit
              </button>

              <button
                onClick={() => setActiveTab("customize")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition
        ${activeTab === "customize"
                    ? "bg-white shadow text-black"
                    : "text-gray-500 hover:text-black"}`}
              >
                Customize
              </button>
            </div>
          </div>
        )}



        {/* Buttons and profile */}
        <div className='flex justify-end items-center gap-3'>
          {/* Upgrade / Subscription Plan Button */}
          {/* <button
            onClick={handleUpgrade}
            className={`mr-4 cursor-pointer text-[15px] leading-[45px] rounded-[25px] text-white font-semibold px-5 flex items-center gap-1 transition-all duration-300 ${hasActiveSubscription() ? "bg-[#30B980] hover:bg-[#249b6e]" : "bg-[#800080] hover:bg-black"
              }`}
          >
            <BiSolidCrown className='text-xl' />
            {hasActiveSubscription() ? "Subscription Plan" : "Upgrade Now"}
          </button> */}

          {/* Cancel Subscription Button */}
          {/* {hasActiveSubscription() && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="mr-4 cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-[25px] transition-all duration-300"
            >
              Cancel Subscription
            </button>
          )} */}

          {showTabs && (
            <div className="relative">
              {/* Main Download Button */}
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                disabled={pdfLoading || docxLoading}
                className="cursor-pointer group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                {/* Shine effect */}
                <span className="absolute inset-0 w-full h-full bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />

                {(pdfLoading || docxLoading) ? (
                  <>
                    <AiOutlineLoading3Quarters className="text-base animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <MdDownload className="text-base transition-transform duration-200 group-hover:-translate-y-0.5" />
                    <span>Download</span>
                    <svg
                      className={`w-3.5 h-3.5 ml-0.5 transition-transform duration-200 ${showDownloadMenu ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>

              {/* Dropdown */}
              {showDownloadMenu && (
                <div
                  className="absolute right-0 mt-3 w-64 rounded-2xl z-50 overflow-hidden"
                  style={{
                    background: "#fff",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.1)",
                    animation: "dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1)"
                  }}
                >
                  {/* Header */}
                  <div className="px-4 py-3" style={{ background: "linear-gradient(135deg, #faf5ff, #f3e8ff)" }}>
                    <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#7c3aed" }}>
                      Export Resume
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Choose your preferred format</p>
                  </div>

                  {/* PDF Option */}
                  <button
                    onClick={handleDownloadPDF}
                    disabled={pdfLoading}
                    className="cursor-pointer w-full flex items-center gap-3 px-4 py-3.5 transition-all duration-150 text-left disabled:opacity-50 group/btn"
                    style={{ borderBottom: "1px solid #f3f4f6" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fdf8ff"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {/* PDF Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-150 group-hover/btn:scale-110"
                      style={{ background: "linear-gradient(135deg, #fee2e2, #fecaca)" }}
                    >
                      {pdfLoading ? (
                        <AiOutlineLoading3Quarters className="text-red-500 animate-spin text-sm" />
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M7 18H17V16H7V18Z" fill="#ef4444" />
                          <path d="M17 14H7V12H17V14Z" fill="#ef4444" />
                          <path d="M11 10H7V8H11V10Z" fill="#ef4444" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9L15 2H6ZM6 4H14V10H20V19C20 19.5523 19.5523 20 19 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4Z" fill="#ef4444" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">PDF Document</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Best for sharing &amp; printing</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* DOCX Option */}
                  <button
                    onClick={handleDownloadDocx}
                    disabled={docxLoading}
                    className="cursor-pointer w-full flex items-center gap-3 px-4 py-3.5 transition-all duration-150 text-left disabled:opacity-50 group/btn"
                    onMouseEnter={e => e.currentTarget.style.background = "#fdf8ff"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {/* DOCX Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-150 group-hover/btn:scale-110"
                      style={{ background: "linear-gradient(135deg, #dbeafe, #bfdbfe)" }}
                    >
                      {docxLoading ? (
                        <AiOutlineLoading3Quarters className="text-blue-500 animate-spin text-sm" />
                      ) : (
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                          <path d="M9 12H15M9 16H15M9 8H11" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9L15 2H6ZM6 4H14V10H20V19C20 19.5523 19.5523 20 19 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4Z" fill="#3b82f6" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">Word Document</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Editable .docx format</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Backdrop */}
              {showDownloadMenu && (
                <div className="fixed inset-0 z-40" onClick={() => setShowDownloadMenu(false)} />
              )}

              {/* Animation keyframes */}
              <style>{`
      @keyframes dropIn {
        from { opacity: 0; transform: translateY(-8px) scale(0.96); }
        to   { opacity: 1; transform: translateY(0)   scale(1); }
      }
    `}</style>
            </div>
          )}
          {/* Profile Name & Image */}
          <div className="relative">
            <div
              className="user_face cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {profileData?.data?.avatar ? (
                <Image
                  src={profileData?.data?.avatar}
                  alt="userFace"
                  width={40}
                  height={40}
                  className="rounded-full w-[40px] h-[40px] border border-gray-300"
                />
              ) : (
                <div className="rounded-full w-[40px] h-[40px] bg-gray-300 flex items-center justify-center border border-gray-300">
                  <FaUser className="text-gray-600 text-[20px]" />
                </div>
              )}
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                {/* Header: Name & Email */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-800">
                    {profileData?.data?.fullname}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {profileData?.data?.email}
                  </p>
                </div>

                {/* Menu Items */}
                <ul className="flex flex-col py-2">
                  <li className="px-0">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 text-sm cursor-pointer rounded-lg hover:bg-gray-100"
                    >
                      <FaUser className="text-base" />
                      My Profile
                    </Link>
                  </li>
                  <li
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 text-sm cursor-pointer rounded-lg hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    <MdOutlineLogout className="text-base" />
                    Log Out
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
