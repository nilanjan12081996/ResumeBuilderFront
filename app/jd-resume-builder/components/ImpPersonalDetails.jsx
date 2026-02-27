import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MdDelete } from 'react-icons/md';
import { FaLock, FaUser, FaCamera } from 'react-icons/fa';
import ImageCropModal from "../../ui/ImageCropModal";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageJd } from '../../reducers/ResumeSlice';

const ImpPersonalDetails = ({ register, watch, selectedTemplate, setValue }) => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  // Profile crop states
  const [profileCropSrc, setProfileCropSrc] = useState(null);
  const [profileError, setProfileError] = useState("");

  const dispatch = useDispatch();
  const { uploadImageJdLoading } = useSelector((state) => state.resume);

  // Watch profileImage from form
  const profileImage = watch("profileImage");

  const handleImageChange = (e) => {
    setProfileError("");
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.type)) {
      setProfileError("Only JPG, JPEG, PNG formats are supported.");
      e.target.value = "";
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      setProfileError("File size must be under 1MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setProfileCropSrc(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropSave = async (base64) => {
    setProfileCropSrc(null);
    setProfileError("");

    try {
      // base64 → atob → Uint8Array → Blob → File
      const [meta, data] = base64.split(",");
      const mimeType = meta.match(/:(.*?);/)[1];
      const byteCharacters = atob(data);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteArray], { type: mimeType });
      const file = new File([blob], "profile.jpg", { type: mimeType });

      const formData = new FormData();
      formData.append("file", file);

      const result = await dispatch(uploadImageJd(formData));

      if (uploadImageJd.fulfilled.match(result)) {
        const destinationUrl = result?.payload?.destinationUrl;
        if (destinationUrl) {
          const baseUrl = process.env.NEXT_PUBLIC_API_RESUME_URL?.replace(/\/$/, ""); // trailing slash remove
          const fullUrl = `${baseUrl}${destinationUrl}`;
          setValue("profileImage", fullUrl);
        } else {
          setProfileError("Upload succeeded but no URL returned.");
        }
      } else {
        setProfileError("Image upload failed. Please try again.");
      }
    } catch (err) {
      console.error("handleCropSave error:", err);
      setProfileError("Something went wrong during upload.");
    }
  };

  const handleDeleteImage = () => {
    setValue("profileImage", "");
    setProfileError("");
  };

  return (
    <div className='acco_section'>

      {/* Profile Crop Modal */}
      {profileCropSrc && (
        <ImageCropModal
          imageSrc={profileCropSrc}
          aspectRatio={1}
          onSave={handleCropSave}
          onCancel={() => setProfileCropSrc(null)}
        />
      )}

      <Accordion className='mb-[4px]'>
        <AccordionPanel>
          <AccordionTitle className='font-bold text-xl'>Personal Details</AccordionTitle>
          <AccordionContent className='pt-0'>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Job Title + Photo */}
              <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
                <div
                  className={`p-2 flex flex-col items-center justify-center w-full md:w-48 border border-gray-200 rounded-lg 
                    ${selectedTemplate === "clean"
                      ? "bg-gray-100 opacity-60 cursor-not-allowed"
                      : "bg-gray-50"
                    }`}
                >
                  {selectedTemplate === "clean" ? (
                    <>
                      <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden">
                        <FaLock className="text-[28px] text-gray-500" />
                      </div>
                      <span className="text-[12px] text-gray-400 text-center mt-2">
                        This template doesn't support photo upload
                      </span>
                    </>
                  ) : (
                    <>
                      {/* Profile Photo with Crop */}
                      <label
                        htmlFor="profile-upload"
                        className="cursor-pointer flex flex-col items-center gap-2 relative group"
                      >
                        <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden relative">
                          {/*  Uploading spinner */}
                          {uploadImageJdLoading ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                              <svg className="animate-spin h-6 w-6 text-[#800080]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                            </div>
                          ) : profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="text-[30px] text-[#800080]" />
                          )}
                          {/* Hover overlay */}
                          {!uploadImageJdLoading && (
                            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
                              <FaCamera className="text-white text-sm opacity-0 group-hover:opacity-100 transition" />
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-[#800080] hover:underline">
                          {uploadImageJdLoading ? "Uploading..." : "Upload photo"}
                        </span>
                      </label>

                      {profileImage && !uploadImageJdLoading && (
                        <button
                          type="button"
                          onClick={handleDeleteImage}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 !bg-transparent"
                        >
                          <MdDelete size={12} /> Remove
                        </button>
                      )}

                      <span className="text-[10px] text-gray-400 text-center leading-tight">
                        JPG, JPEG, PNG<br />Up to 1MB
                      </span>

                      {profileError && (
                        <p className="text-[10px] text-red-500 text-center leading-tight max-w-[110px]">
                          {profileError}
                        </p>
                      )}

                      <input
                        type="file"
                        id="profile-upload"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleImageChange}
                        disabled={uploadImageJdLoading}
                      />
                    </>
                  )}
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Role
                  </label>
                  <input
                    type="text"
                    placeholder="SENIOR SOFTWARE ENGINEER"
                    className="mt-1 w-full rounded-lg"
                    {...register("job_target")}
                  />
                </div>
              </div>

              {/* First Name */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("first_name")}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("last_name")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">Email ID</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("email")}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">Phone Number</label>
                <input
                  type="text"
                  placeholder="Phone No."
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("phone")}
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">LinkedIn URL</label>
                <input
                  type="url"
                  placeholder="linkedin.com/in/yourprofile"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("linkedin")}
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">GitHub</label>
                <input
                  type="url"
                  placeholder="github.com/username"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("github")}
                />
              </div>

              {/* Stack Overflow */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">Stack Overflow</label>
                <input
                  type="url"
                  placeholder="stackoverflow.com/users/your-id"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("stackoverflow")}
                />
              </div>

              {/* LeetCode */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">LeetCode</label>
                <input
                  type="url"
                  placeholder="leetcode.com/username"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("leetcode")}
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block !text-sm !font-medium !text-gray-500">Complete Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                  {...register("address")}
                />
              </div>

              {/* City, State */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">City, State</label>
                <input
                  type="text"
                  placeholder="City, State"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("city_state")}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">Country</label>
                <input
                  type="text"
                  placeholder="Country"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("country")}
                />
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                  {...register("postal_code")}
                />
              </div>

              {/* Toggle Additional Details */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
                  className="flex items-center gap-2 !text-sm !text-[#800080] hover:!text-[#b98ab9] font-medium transition-colors"
                >
                  {showAdditionalDetails ? (
                    <><ChevronUp size={20} /> Hide additional details</>
                  ) : (
                    <><ChevronDown size={20} /> Add more details</>
                  )}
                </button>
              </div>

              {/* Additional Details */}
              {showAdditionalDetails && (
                <>
                  <div>
                    <label className="block !text-sm !font-medium !text-gray-500">Nationality</label>
                    <input
                      type="text"
                      placeholder="Nationality"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                      {...register("nationality")}
                    />
                  </div>

                  <div>
                    <label className="block !text-sm !font-medium !text-gray-500">Place of Birth</label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                      {...register("birth_place")}
                    />
                  </div>

                  <div>
                    <label className="block !text-sm !font-medium !text-gray-500">Date of Birth</label>
                    <input
                      type="date"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                      {...register("dob")}
                    />
                  </div>

                  <div>
                    <label className="block !text-sm !font-medium !text-gray-500">Driving License</label>
                    <input
                      type="text"
                      placeholder="License Number"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                      {...register("driving_licence")}
                    />
                  </div>
                </>
              )}
            </form>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
};

export default ImpPersonalDetails;

// import React, { useState } from 'react';
// import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { MdDelete } from 'react-icons/md';
// import { FaLock, FaUser, FaCamera } from 'react-icons/fa';
// import ImageCropModal from "../../ui/ImageCropModal";

// const ImpPersonalDetails = ({ register, watch, selectedTemplate, setValue }) => {
//   const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

//   // Profile crop states
//   const [profileCropSrc, setProfileCropSrc] = useState(null);
//   const [profileError, setProfileError] = useState("");

//   // Watch profileImage from form
//   const profileImage = watch("profileImage");

//   const handleImageChange = (e) => {
//     setProfileError("");
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowed = ["image/jpeg", "image/jpg", "image/png"];
//     if (!allowed.includes(file.type)) {
//       setProfileError("Only JPG, JPEG, PNG formats are supported.");
//       e.target.value = "";
//       return;
//     }
//     if (file.size > 1 * 1024 * 1024) {
//       setProfileError("File size must be under 1MB.");
//       e.target.value = "";
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => setProfileCropSrc(reader.result);
//     reader.readAsDataURL(file);
//     e.target.value = "";
//   };

//   const handleDeleteImage = () => {
//     setValue("profileImage", "");
//     setProfileError("");
//   };

//   return (
//     <div className='acco_section'>

//       {/* Profile Crop Modal */}
//       {profileCropSrc && (
//         <ImageCropModal
//           imageSrc={profileCropSrc}
//           aspectRatio={1}
//           onSave={(base64) => {
//             setValue("profileImage", base64);
//             setProfileCropSrc(null);
//           }}
//           onCancel={() => setProfileCropSrc(null)}
//         />
//       )}

//       <Accordion className='mb-[4px]'>
//         <AccordionPanel>
//           <AccordionTitle className='font-bold text-xl'>Personal Details</AccordionTitle>
//           <AccordionContent className='pt-0'>
//             <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

//               {/* Job Title + Photo */}
//               <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
//                 <div
//                   className={`p-2 flex flex-col items-center justify-center w-full md:w-48 border border-gray-200 rounded-lg 
//                     ${selectedTemplate === "clean"
//                       ? "bg-gray-100 opacity-60 cursor-not-allowed"
//                       : "bg-gray-50"
//                     }`}
//                 >
//                   {selectedTemplate === "clean" ? (
//                     <>
//                       <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden">
//                         <FaLock className="text-[28px] text-gray-500" />
//                       </div>
//                       <span className="text-[12px] text-gray-400 text-center mt-2">
//                         This template doesn't support photo upload
//                       </span>
//                     </>
//                   ) : (
//                     <>
//                       {/* Profile Photo with Crop */}
//                       <label
//                         htmlFor="profile-upload"
//                         className="cursor-pointer flex flex-col items-center gap-2 relative group"
//                       >
//                         <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden relative">
//                           {profileImage ? (
//                             <img
//                               src={profileImage}
//                               alt="Profile"
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <FaUser className="text-[30px] text-[#800080]" />
//                           )}
//                           {/* Hover overlay */}
//                           <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/25 transition flex items-center justify-center">
//                             <FaCamera className="text-white text-sm opacity-0 group-hover:opacity-100 transition" />
//                           </div>
//                         </div>
//                         <span className="text-sm font-medium text-[#800080] hover:underline">
//                           Upload photo
//                         </span>
//                       </label>

//                       {profileImage && (
//                         <button
//                           type="button"
//                           onClick={handleDeleteImage}
//                           className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 !bg-transparent"
//                         >
//                           <MdDelete size={12} /> Remove
//                         </button>
//                       )}

//                       <span className="text-[10px] text-gray-400 text-center leading-tight">
//                         JPG, JPEG, PNG<br />Up to 1MB
//                       </span>

//                       {profileError && (
//                         <p className="text-[10px] text-red-500 text-center leading-tight max-w-[110px]">
//                           {profileError}
//                         </p>
//                       )}

//                       <input
//                         type="file"
//                         id="profile-upload"
//                         accept=".jpg,.jpeg,.png"
//                         className="hidden"
//                         onChange={handleImageChange}
//                       />
//                     </>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Job Role
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="SENIOR SOFTWARE ENGINEER"
//                     className="mt-1 w-full rounded-lg"
//                     {...register("job_target")}
//                   />
//                 </div>
//               </div>

//               {/* First Name */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">First Name</label>
//                 <input
//                   type="text"
//                   placeholder="First Name"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("first_name")}
//                 />
//               </div>

//               {/* Last Name */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">Last Name</label>
//                 <input
//                   type="text"
//                   placeholder="Last Name"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("last_name")}
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">Email ID</label>
//                 <input
//                   type="text"
//                   placeholder="Email"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("email")}
//                 />
//               </div>

//               {/* Phone */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">Phone Number</label>
//                 <input
//                   type="text"
//                   placeholder="Phone No."
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("phone")}
//                 />
//               </div>

//               {/* LinkedIn */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">LinkedIn URL</label>
//                 <input
//                   type="url"
//                   placeholder="linkedin.com/in/yourprofile"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("linkedin")}
//                 />
//               </div>

//               {/* GitHub */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">GitHub</label>
//                 <input
//                   type="url"
//                   placeholder="github.com/username"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("github")}
//                 />
//               </div>

//               {/* Stack Overflow */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">Stack Overflow</label>
//                 <input
//                   type="url"
//                   placeholder="stackoverflow.com/users/your-id"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("stackoverflow")}
//                 />
//               </div>

//               {/* LeetCode */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">LeetCode</label>
//                 <input
//                   type="url"
//                   placeholder="leetcode.com/username"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("leetcode")}
//                 />
//               </div>

//               {/* Address */}
//               <div className="md:col-span-2">
//                 <label className="block !text-sm !font-medium !text-gray-500">Complete Address</label>
//                 <input
//                   type="text"
//                   placeholder="Enter your address"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                   {...register("address")}
//                 />
//               </div>

//               {/* City, State */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">City, State</label>
//                 <input
//                   type="text"
//                   placeholder="City, State"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("city_state")}
//                 />
//               </div>

//               {/* Country */}
//               <div>
//                 <label className="block !text-sm !font-medium !text-gray-500">Country</label>
//                 <input
//                   type="text"
//                   placeholder="Country"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2"
//                   {...register("country")}
//                 />
//               </div>

//               {/* Postal Code */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Postal Code</label>
//                 <input
//                   type="text"
//                   placeholder="Postal Code"
//                   className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                   {...register("postal_code")}
//                 />
//               </div>

//               {/* Toggle Additional Details */}
//               <div className="md:col-span-2">
//                 <button
//                   type="button"
//                   onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
//                   className="flex items-center gap-2 !text-sm !text-[#800080] hover:!text-[#b98ab9] font-medium transition-colors"
//                 >
//                   {showAdditionalDetails ? (
//                     <><ChevronUp size={20} /> Hide additional details</>
//                   ) : (
//                     <><ChevronDown size={20} /> Add more details</>
//                   )}
//                 </button>
//               </div>

//               {/* Additional Details */}
//               {showAdditionalDetails && (
//                 <>
//                   <div>
//                     <label className="block !text-sm !font-medium !text-gray-500">Nationality</label>
//                     <input
//                       type="text"
//                       placeholder="Nationality"
//                       className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                       {...register("nationality")}
//                     />
//                   </div>

//                   <div>
//                     <label className="block !text-sm !font-medium !text-gray-500">Place of Birth</label>
//                     <input
//                       type="text"
//                       placeholder="City, Country"
//                       className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                       {...register("birth_place")}
//                     />
//                   </div>

//                   <div>
//                     <label className="block !text-sm !font-medium !text-gray-500">Date of Birth</label>
//                     <input
//                       type="date"
//                       className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                       {...register("dob")}
//                     />
//                   </div>

//                   <div>
//                     <label className="block !text-sm !font-medium !text-gray-500">Driving License</label>
//                     <input
//                       type="text"
//                       placeholder="License Number"
//                       className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                       {...register("driving_licence")}
//                     />
//                   </div>
//                 </>
//               )}
//             </form>
//           </AccordionContent>
//         </AccordionPanel>
//       </Accordion>
//     </div>
//   );
// };

// export default ImpPersonalDetails;