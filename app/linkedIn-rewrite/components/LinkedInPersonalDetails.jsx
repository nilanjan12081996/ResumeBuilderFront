'use client';
import React, { useState } from "react";
import { FaUser, FaCamera } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import ImageCropModal from "../../ui/ImageCropModal";
import { MdDelete } from "react-icons/md";

const LinkedInPersonalDetails = ({ register, watch, setValue }) => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  // Profile crop
  const [profileCropSrc, setProfileCropSrc] = useState(null);
  const [profileError, setProfileError] = useState("");

  // Cover crop
  const [coverCropSrc, setCoverCropSrc] = useState(null);

  const profileImage = watch("profileImage");
  const coverImage = watch("coverImage");

  const handleProfileChange = (e) => {
    setProfileError("");
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setProfileError("Only JPG, JPEG, PNG formats are supported.");
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      setProfileError("File size must be under 1MB.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setProfileCropSrc(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCoverCropSrc(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="acco_section bg-white rounded-xl mb-1 overflow-hidden">

      {/* Profile Crop Modal */}
      {profileCropSrc && (
        <ImageCropModal
          imageSrc={profileCropSrc}
          aspectRatio={1}
          onSave={(base64) => { setValue("profileImage", base64); setProfileCropSrc(null); }}
          onCancel={() => setProfileCropSrc(null)}
        />
      )}
      {coverCropSrc && (
        <ImageCropModal
          imageSrc={coverCropSrc}
          onSave={(base64) => { setValue("coverImage", base64); setCoverCropSrc(null); }}
          onCancel={() => setCoverCropSrc(null)}
        />
      )}

      {/* ══ Cover + Profile Photo ══════════════════════════════════ */}
      <div className="relative" style={{ marginBottom: "90px" }}>

        {/* ── Cover Photo ── */}
        <div className="relative group">
          <label htmlFor="linkedin-cover-upload" className="cursor-pointer block">
            {coverImage ? (
              <div className="w-full rounded-t-xl overflow-hidden" style={{ aspectRatio: "4 / 1" }}>
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover object-center"
                />
              </div>
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
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleCoverChange}
          />

          {coverImage && (
            <div className="absolute top-2 right-2 flex gap-1">
              <label
                htmlFor="linkedin-cover-upload"
                className="cursor-pointer flex items-center gap-1 bg-black/50 hover:bg-black/70 text-white text-xs px-2 py-1 rounded-full transition"
              >
                <FaCamera size={10} /> Change
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

        {/* ── Profile Photo ── */}
        <div className="absolute left-5" style={{ bottom: "-90px" }}>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="linkedin-profile-upload" className="cursor-pointer block relative group">
              <div className="w-20 h-20 rounded-full border-[3px] border-white overflow-hidden bg-gray-100 shadow">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <FaUser size={24} />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
                <FaCamera className="text-white text-sm opacity-0 group-hover:opacity-100 transition" />
              </div>
            </label>
            <input
              type="file"
              id="linkedin-profile-upload"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleProfileChange}
            />
            {profileImage && (
              <button
                type="button"
                onClick={() => setValue("profileImage", "")}
                className="flex items-center gap-1 text-xs text-gray-500 hover:!text-red-500 !bg-transparent"
              >
                <MdDelete size={12} /> Remove
              </button>
            )}
            <p className="text-[10px] text-gray-400 text-center leading-tight max-w-[90px]">
              JPG, JPEG, PNG<br />Up to 1MB
            </p>
            {profileError && (
              <p className="text-[10px] text-red-500 text-center leading-tight max-w-[110px]">
                {profileError}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ══ Form Fields ══════════════════════════════════════════ */}
      <div className="p-5 pt-2">

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

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input type="text" placeholder="First Name" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("first_name")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input type="text" placeholder="Last Name" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("last_name")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="email@example.com" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("email")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="text" placeholder="+91 98765 43210" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("phone")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" placeholder="Street address" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("address")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City, State</label>
            <input type="text" placeholder="Kolkata, West Bengal" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("city_state")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input type="text" placeholder="India" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("country")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input type="text" placeholder="700001" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("postal_code")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
            <input type="text" placeholder="linkedin.com/in/yourprofile" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("linkedin")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website / Portfolio</label>
            <input type="text" placeholder="yourportfolio.com" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("website")} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
          className="flex items-center gap-2 !text-sm !text-[#800080] hover:!text-[#b98ab9] font-medium transition-colors mb-3"
        >
          {showAdditionalDetails ? <><ChevronUp size={20} /> Hide additional details</> : <><ChevronDown size={20} /> Add more details</>}
        </button>

        {showAdditionalDetails && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
              <input type="text" placeholder="github.com/username" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("github")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stack Overflow</label>
              <input type="text" placeholder="stackoverflow.com/users/..." className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("stackoverflow")} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LeetCode</label>
              <input type="text" placeholder="leetcode.com/username" className="w-full rounded-lg border border-gray-300 p-2 text-sm" {...register("leetcode")} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInPersonalDetails;