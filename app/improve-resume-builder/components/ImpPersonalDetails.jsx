import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MdDelete } from 'react-icons/md';
import { FaLock, FaUser } from 'react-icons/fa';

const ImpPersonalDetails = ({ register, watch, selectedTemplate, setValue }) => {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setValue("profileImage", reader.result); // form data তে save
    };
    reader.readAsDataURL(file);
  }
};

const handleDeleteImage = () => {
  setSelectedImage(null);
  setValue("profileImage", "");
};


  return (
    <div className='acco_section'>
      <Accordion className='mb-[4px]'>
        <AccordionPanel>
          <AccordionTitle className='font-bold text-xl'>Personal Details</AccordionTitle>
          <AccordionContent className='pt-0'>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Job Title */}
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
                        This template doesn’t support photo upload
                      </span>
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="profile-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <div className="w-20 h-20 rounded-full bg-white border border-gray-300 flex items-center justify-center overflow-hidden">
                          {selectedImage ? (
                            <img
                              src={selectedImage}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="text-[30px] text-[#800080]" />
                          )}
                        </div>

                        <span className="text-sm font-medium text-[#800080] hover:underline">
                          Upload photo
                        </span>
                      </label>

                      {selectedImage && (
                        <button
                          type="button"
                          onClick={handleDeleteImage}
                          className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500"
                        >
                          <MdDelete size={12} /> Remove
                        </button>
                      )}

                      <span className="text-[10px] text-gray-400">
                        JPG / PNG • Max 2MB
                      </span>

                      <input
                        type="file"
                        id="profile-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Target
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
                <label className="block !text-sm !font-medium !text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("first_name")}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("last_name")}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("email")}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone No."
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("phone")}
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  placeholder="linkedin.com/in/yourprofile"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("linkedin")}
                />
              </div>
              {/* GitHub */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  GitHub
                </label>
                <input
                  type="url"
                  placeholder="github.com/username"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("github")}
                />
              </div>

              {/* Stack Overflow */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Stack Overflow
                </label>
                <input
                  type="url"
                  placeholder="stackoverflow.com/users/your-id"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("stackoverflow")}
                />
              </div>

              {/* LeetCode */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  LeetCode
                </label>
                <input
                  type="url"
                  placeholder="leetcode.com/username"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("leetcode")}
                />
              </div>

              {/* City, State */}
              {/* <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  City, State
                </label>
                <input
                  type="text"
                  placeholder="City, State"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("city_state")}
                />
              </div> */}

              {/* City, State */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  City, State
                </label>
                <input
                  type="text"
                  placeholder="City, State"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("city_state")}
                />
              </div>

              {/* Country */}
              <div>
                <label className="block !text-sm !font-medium !text-gray-500">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="Country"
                  className="mt-1 w-full rounded-lg border border-gray-300 p-2"
                  {...register("country")}
                />
              </div>

              {/* Toggle Additional Details */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}
                  className="flex items-center gap-2 !text-[#800080] hover:!text-[#b98ab9] font-medium transition-colors"
                >
                  {showAdditionalDetails ? (
                    <>
                      Hide additional details
                      <ChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Add more details
                      <ChevronDown size={20} />
                    </>
                  )}
                </button>
              </div>

              {/* Additional Details */}
              {showAdditionalDetails && (
                <>
                  <div className="md:col-span-2">
                    <label className="block !text-sm !font-medium !text-gray-500">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your address"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                      {...register("address")}
                    />
                  </div>

                  <div>
                    <label className="block !text-sm !font-medium !text-gray-500">
                      Nationality
                    </label>
                    <input
                      type="text"
                      placeholder="Nationality"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                      {...register("nationality")}
                    />
                  </div>

                  <div>
                    <label className="block !text-sm !font-medium !text-gray-500">
                      Place of Birth
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                      {...register("birth_place")}
                    />
                  </div>

                  <div>
                    <label className="block !text-sm !font-medium !text-gray-500">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                      {...register("dob")}
                    />
                  </div>

                  <div>
                    <label className="block !text-sm !font-medium !text-gray-500">
                      Driving License
                    </label>
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