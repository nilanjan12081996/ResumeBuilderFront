'use client';
import React, { useState } from "react";
import { FaUser, FaCamera } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";

const LinkedInPersonalDetails = ({ register, watch, setValue }) => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  const profileImage = watch("profileImage");
  const coverImage   = watch("coverImage");

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setValue("profileImage", reader.result);
    reader.readAsDataURL(file);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setValue("coverImage", reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="acco_section bg-white rounded-xl mb-1 overflow-hidden">

      {/* ══ Cover + Profile Photo ══════════════════════════════════ */}
      <div className="relative" style={{ marginBottom: "52px" }}>

        {/* ── Cover Photo ── */}
        <div className="relative group">
          <label htmlFor="linkedin-cover-upload" className="cursor-pointer block">
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover"
                className="w-full object-cover rounded-t-xl"
                style={{ height: "90px" }}
              />
            ) : (
              <div
                className="w-full flex items-center justify-center rounded-t-xl text-white text-sm font-medium gap-2"
                style={{ height: "90px", background: "linear-gradient(135deg, #0a66c2 0%, #7c3aed 100%)" }}
              >
                <FaCamera size={14} />
                <span>Upload cover photo</span>
              </div>
            )}
          </label>
          <input
            type="file"
            id="linkedin-cover-upload"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
          />

          {/* Cover action buttons — top right corner */}
          {coverImage && (
            <div className="absolute top-2 right-2 flex gap-1">
              <label
                htmlFor="linkedin-cover-upload"
                className="cursor-pointer flex items-center gap-1 bg-black/50 hover:bg-black/70 text-white text-xs px-2 py-1 rounded-full transition"
              >
                <FaCamera size={10} />
                Change
              </label>
              <button
                type="button"
                onClick={() => setValue("coverImage", "")}
                className="flex items-center gap-1 !bg-red-500/80 hover:!bg-red-600 !text-white text-xs px-2 py-1 rounded-full transition"
              >
                ✕ Remove
              </button>
            </div>
          )}
        </div>

        {/* ── Profile Photo — overlapping cover ── */}
        <div className="absolute left-5" style={{ bottom: "-44px" }}>
          <div className="flex flex-col items-center gap-1">

            {/* Circle */}
            <label htmlFor="linkedin-profile-upload" className="cursor-pointer block relative group">
              <div className="w-16 h-16 rounded-full border-[3px] border-white overflow-hidden bg-gray-100 shadow">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <FaUser size={24} />
                  </div>
                )}
              </div>
              {/* Camera hover overlay */}
              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
                <FaCamera className="text-white text-sm opacity-0 group-hover:opacity-100 transition" />
              </div>
            </label>
            <input
              type="file"
              id="linkedin-profile-upload"
              accept="image/*"
              className="hidden"
              onChange={handleProfileChange}
            />

            {/* Remove text link — below circle */}
            {profileImage && (
              <button
                type="button"
                onClick={() => setValue("profileImage", "")}
                className="text-xs !text-red-400 hover:!text-red-600 font-medium leading-none transition"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ══ Form Fields ══════════════════════════════════════════ */}
      <div className="p-5 pt-2">

        {/* Headline */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
          <input
            type="text"
            placeholder="Frontend Developer || React Js || Next Js..."
            className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            {...register("job_target")}
          />
          <p className="text-xs text-gray-400 mt-1">Appears below your name like LinkedIn</p>
        </div>

        {/* First + Last Name */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("first_name")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("last_name")}
            />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("email")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              placeholder="+91 98765 43210"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("phone")}
            />
          </div>
        </div>

        {/* Address + City, State */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              placeholder="Street address"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("address")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City, State</label>
            <input
              type="text"
              placeholder="Kolkata, West Bengal"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("city_state")}
            />
          </div>
        </div>

        {/* Country + Postal Code */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              placeholder="India"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("country")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              placeholder="700001"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("postal_code")}
            />
          </div>
        </div>

        {/* LinkedIn + Website */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input
              type="url"
              placeholder="linkedin.com/in/yourprofile"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("linkedin")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website / Portfolio</label>
            <input
              type="url"
              placeholder="yourportfolio.com"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              {...register("website")}
            />
          </div>
        </div>

        {/* Toggle — additional details */}
        <button
          type="button"
          onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
          className="flex items-center gap-2 !text-sm !text-[#800080] hover:!text-[#b98ab9] font-medium transition-colors mb-3"
        >
          {showAdditionalDetails ? (
            <><ChevronUp size={20} /> Hide additional details</>
          ) : (
            <><ChevronDown size={20} /> Add more details</>
          )}
        </button>

        {showAdditionalDetails && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
              <input
                type="url"
                placeholder="github.com/username"
                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                {...register("github")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stack Overflow</label>
              <input
                type="url"
                placeholder="stackoverflow.com/users/..."
                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                {...register("stackoverflow")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LeetCode</label>
              <input
                type="url"
                placeholder="leetcode.com/username"
                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                {...register("leetcode")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInPersonalDetails;