'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { HiClipboardList } from "react-icons/hi";
import { MdPreview } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

import { BiSolidUser } from "react-icons/bi";
import { BiSolidBriefcase } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BiSolidPhone } from "react-icons/bi";

import { HiAcademicCap } from "react-icons/hi2";

import { FaLanguage } from "react-icons/fa6";
import { MdSettingsSuggest } from "react-icons/md";
import { FaDiagramProject } from "react-icons/fa6";
import { FaCertificate } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa6";

import { BiSolidBank } from "react-icons/bi";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";  

import { FaTags } from "react-icons/fa";
import { BiSolidBuilding } from "react-icons/bi";

import { BiWorld } from "react-icons/bi";

import { BsFillPersonVcardFill } from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";

import { BiLink } from "react-icons/bi";

import { MdOutlineWorkOutline } from "react-icons/md";


import resume4 from "../assets/imagesource/resume4.png";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select } from "flowbite-react";
import LinkedInTemplate from './LinkedInTemplate';

const page = () => {
  return (
    <div className='lg:flex gap-5 pb-5'>
            <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] mb-4 lg:mb-0'>
               <div className='border-b border-[#E5E5E5] p-5 flex items-center justify-between'>
                  <div className='flex items-center gap-1'>
                    <HiClipboardList className='text-[#800080] text-2xl' />
                    <h3 className='text-[16px] text-[#151515] font-medium'>Resume Sections</h3>
                  </div>
                  <button className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-2 lg:px-4 flex items-center gap-1.5'><AiFillSave className='text-[18px]' /> Save Resume</button>
               </div>
               <div className='resume_tab_section'>
                  <Tabs>
                    <div className='border-b border-[#E5E5E5] p-5'>
                        <div className='tab_point'>
                          <TabList>
                            <Tab><span><BiSolidUser /></span> Personal Info</Tab>
                            <Tab><span><HiAcademicCap /></span> Education</Tab>
                            <Tab><span><BiSolidBriefcase /></span> Experience</Tab>
                            <Tab><span><FaLanguage /></span> Languages</Tab>
                            <Tab><span><MdSettingsSuggest /></span> Skills</Tab>
                            <Tab><span><FaCertificate /></span> Courses</Tab>
                            <Tab><span><FaTrophy /></span> Honors & Awards</Tab>
                          </TabList>
                        </div>
                    </div>
                    <div className='p-5 pr-0'>
                      <div className='mb-4'>
                          <div>
                            <TabPanel>
                              <div className='tab_wrap'>
                                <div className='mb-4'>
                                  <div className='mb-4'>
                                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Social link</h4>
                                    <p className='text-[14px] text-[#939393] font-normal'>Add your web presence to make it easy for employers to learn more about you.</p>
                                  </div>
                                  <div className='resume_form_area'>
                                    <div className='mb-3'>
                                        <div className='w-full resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">LinkedIn Profile Link <span>*</span></Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiLogoLinkedinSquare className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='https://www.linkedin.com/in/johndoe' />
                                          </div>
                                        </div>
                                    </div>
                                    
                                  </div>
                                </div>
                                <div className='mb-4'>
                                  <div className='mb-4'>
                                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Basic Info</h4>
                                    <p className='text-[14px] text-[#939393] font-normal'>Add your personal details that will appear at the top of your resume. * Required fieldse about you.</p>
                                  </div>
                                  <div className='resume_form_area'>
                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Full Name <span>*</span></Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiSolidUser className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Manisha Sharma' />
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Location <span>*</span></Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaLocationDot className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Trichy, TN' />
                                          </div>
                                        </div>
                                    </div>

                                    <div className='w-full resume_form_box mb-3'>
                                        <div className="mb-1 block">
                                        <Label htmlFor="base">Description <span>*</span></Label>
                                        </div>
                                        <div className='flex items-center'>
                                        <Textarea id="comment" placeholder="Trichy, TN" required rows={3} />
                                        </div>
                                    </div>

                                    <div className='w-full resume_form_box mb-3'>
                                        <div className="mb-1 block">
                                        <Label htmlFor="base">About <span>*</span></Label>
                                        </div>
                                        <div className='flex items-center'>
                                        <Textarea id="comment" placeholder="Trichy, TN" required rows={3} />
                                        </div>
                                    </div>

                                  </div>
                                </div>
                                <div className='mb-4'>
                                  <div className='mb-4'>
                                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Professional Details</h4>
                                    <p className='text-[14px] text-[#939393] font-normal'>Add information about your professional identity and career summary.</p>
                                  </div>
                                  <div className='resume_form_area'>
                                    <div className='mb-3'>
                                        <div className='w-full resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Current Company</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiSolidBriefcase className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Iksen India Ptv. Ltd.' />
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
    
                            <TabPanel>
                              <div className='tab_wrap'>
                                <div className='mb-4'>
                                  <div className='mb-4 lg:flex items-center justify-between'>
                                     <div className='mb-2 lg:mb-0'>
                                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Education 1</h4>
                                        <p className='text-[14px] text-[#939393] font-normal'>Add your educational background and qualifications</p>
                                     </div>
                                     <div className='flex justify-end items-center gap-2'>
                                      <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Education</button>
                                      <button className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                    </div>
                                  </div>
                                  <div className='resume_form_area'>
                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Institution/School</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiSolidBank className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Saranathan College of Engineering' />
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Location</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaLocationDot className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Trichy, TN' />
                                          </div>
                                        </div>
                                    </div>
                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Degree</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <HiAcademicCap className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='B.Tech' />
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Field of study</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <HiAcademicCap className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Computer Science' />
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 resume_form_box mb-4 ml-1">
                                  <Checkbox id="age" />
                                  <Label htmlFor="age">Currently studying here</Label>
                                </div>
                                <div className='mb-4'>
                                  <div className='resume_form_area'>
                                    <div className=''>
                                        <div className='w-full resume_form_box mb-3'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Date</Label>
                                          </div>
                                          <div className='field_box_date'>
                                            <Datepicker /> 
                                          </div>
                                        </div>
                                        <div className='w-full resume_form_box mb-3'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Additional Information</Label>
                                          </div>
                                          <div className='flex items-center'>
                                            <Textarea id="comment" placeholder="Honors, activities, relevant coursework..." required rows={3} />
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
    
                            <TabPanel>
                               <div className='tab_wrap'>
                                <div className='mb-4'>
                                  <div className='mb-4 lg:flex items-center justify-between'>
                                     <div className='mb-2 lg:mb-0'>
                                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Experience 1</h4>
                                        <p className='text-[14px] text-[#939393] font-normal'>Add your work experience and internships</p>
                                     </div>
                                     <div className='flex justify-end items-center gap-2'>
                                      <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Education</button>
                                      <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                    </div>
                                  </div>
                                  <div className='resume_form_area'>
                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Company</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiSolidBuilding className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Company or Organization Name' />
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Position</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiSolidBriefcase className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Job Title or Role' />
                                          </div>
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <div className='w-full resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Location</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaLocationDot className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='City, Country' />
                                          </div>
                                        </div>
                                    </div>
                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Skill Set</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaTags className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Add your Skills ' />
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Job Type</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <MdOutlineWorkOutline className='text-[#928F8F]' />
                                            </div>
                                            <Select required className='w-full'>
                                              <option>Choose Job Type</option>
                                              <option>01</option>
                                              <option>02</option>
                                              <option>03</option>
                                            </Select>
                                          </div>
                                        </div>
                                    </div>
                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Start Date <span>*</span></Label>
                                          </div>
                                          <div className='field_box_date'>
                                            <Datepicker /> 
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">End Date <span>*</span></Label>
                                          </div>
                                          <div className='field_box_date'>
                                            <Datepicker /> 
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 resume_form_box mb-4 ml-1">
                                  <Checkbox id="age" />
                                  <Label htmlFor="age">Currently studying here</Label>
                                </div>
                                <div className='mb-4'>
                                  <div className='resume_form_area'>
                                    <div className=''>
    
                                        <div className='w-full resume_form_box mb-3'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Additional Information</Label>
                                          </div>
                                          <div className='flex items-center'>
                                            <Textarea id="comment" placeholder="Honors, activities, relevant coursework..." required rows={3} />
                                          </div>
                                        </div>
    
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
    
                            <TabPanel>
                              <div className='tab_wrap'>
                                <div className='mb-4'>
                                  <div className='mb-4 flex items-center justify-between'>
                                     <div>
                                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Languages</h4>
                                        <p className='text-[14px] text-[#939393] font-normal'>Add languages you know and proficiency levels</p>
                                     </div>
                                  </div>
                                  <div className='resume_form_area'>
                                    <div className='mb-3'>
                                        <div className='w-full resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Language Name </Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaLanguage className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" className='w-full' placeholder='E.g English, Hindi, German, etc.' />
                                          </div>
                                        </div>
                                    </div>
                                    <div className='border border-[#E2E2E2] bg-white rounded-[4px] p-4 flex items-center justify-between'>
                                      <div className='flex items-center gap-2'>
                                        <span className='bg-[#F6EFFF] w-[26px] h-[26px] rounded-full flex items-center justify-center text-[#000000] text-[13px] font-medium'><BiWorld className='text-[#92278F]' /></span> English
                                      </div>
                                      <div className='flex justify-end items-center'>
                                        <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
    
                            <TabPanel>
                              <div className='tab_wrap'>
                                <div className='mb-4'>
                                  <div className='mb-4 lg:flex items-center justify-between'>
                                     <div className='mb-2 lg:mb-0'>
                                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Skill Category #1</h4>
                                        <p className='text-[14px] text-[#939393] font-normal'>Add your key skills and competencies</p>
                                     </div>
                                     <div className='flex justify-end items-center gap-2'>
                                      <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Skill</button>
                                      <button className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                    </div>
                                  </div>
                                  <div className='resume_form_area'>
                                    <div className=''>
                                        <div className='w-full resume_form_box mb-3'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Skill Category</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaTags className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Tools' className='w-full' />
                                          </div>
                                        </div>
                                        <div className='w-full resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base"> Skills</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiCodeAlt className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="email" sizing="md" className='w-full' placeholder='Separate multiple skills with commas for better formatting' />
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
    
                            <TabPanel>
                              <div className='tab_wrap'>
                                <div className='mb-4'>
                                  <div className='mb-4 flex items-center justify-between'>
                                     <div>
                                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Courses</h4>
                                        <p className='text-[14px] text-[#939393] font-normal'>Add relevant courses to showcase your skills and expertise</p>
                                     </div>
                                  </div>
                                  <div className='resume_form_area'>
    
                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Course Title</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaTrophy className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Name of the project' />
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Associated With</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaTrophy className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='E.g Developer, Designer, etc.' />
                                          </div>
                                        </div>
                                    </div>

                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Issuing Organization</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiSolidBuilding className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Company or Organization Name' />
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Completion Date</Label>
                                          </div>
                                          <div className='field_box_date'>
                                            <Datepicker /> 
                                          </div>
                                        </div>
                                    </div>
    
                                    <div className='w-full resume_form_box mb-3'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Description</Label>
                                      </div>
                                      <div className='flex items-center'>
                                        <Textarea id="comment" placeholder="Solved 100+ DSA problems on LeetCode." required rows={3} />
                                      </div>
                                    </div>
    
    
                                  </div>
                                </div>
    
                              </div>
                            </TabPanel>    
    
                            <TabPanel>  
                              <div className='tab_wrap'>
                                <div className='mb-4'>
                                  <div className='mb-4 lg:flex items-center justify-between'>
                                     <div className='mb-2 lg:mb-0'>
                                        <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Honors & Awards #1</h4>
                                        <p className='text-[14px] text-[#939393] font-normal'>Fill in the details for this section</p>
                                     </div>
                                     <div className='flex justify-end items-center gap-2'>
                                      <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Achievement</button>
                                      <button className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                    </div>
                                  </div>
                                  <div className='resume_form_area'>
                                    <div className='mb-3'>
                                        <div className='w-full resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Award Title</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaTrophy className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" className='w-full' placeholder='Employee of the Month, Excellence Award' />
                                          </div>
                                        </div>
                                    </div>
                                    <div className='lg:flex gap-4 mb-3'>
                                        <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base"> Issuing Organization</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiSolidBuilding className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="email" sizing="md" placeholder='Company or Organization Name' />
                                          </div>
                                        </div>
                                        <div className='lg:w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Date Recieved</Label>
                                          </div>
                                          <div className='field_box_date'>
                                            <Datepicker /> 
                                          </div>
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <div className='w-full resume_form_box mb-3'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Description</Label>
                                          </div>
                                          <div className='flex items-center'>
                                            <Textarea id="comment" placeholder="Solved 100+ DSA problems on LeetCode." required rows={3} />
                                          </div>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabPanel>
    
                          </div>
                      </div>
                    </div>
                  </Tabs>
               </div>
            </div>
            <div className='lg:w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] p-5'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-1'>
                  <MdPreview className='text-[#800080] text-2xl' />
                  <h3 className='text-[16px] text-[#151515] font-medium'>Preview</h3>
                </div>
                <div className='flex items-center gap-3'>
                  <button className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download PDF</button>
                </div>
              </div>
              <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
                 {/* <Image src={resume4} alt="resume4" className='' /> */}
                 <LinkedInTemplate/>
              </div>
            </div>

        </div>
  )
}

export default page