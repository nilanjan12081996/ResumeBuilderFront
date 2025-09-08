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

import resume_sections_view from "../assets/imagesource/resume_sections_view.png";
import resume_score2 from "../assets/imagesource/resume_score2.png";
import resume_score from "../assets/imagesource/resume_score.png";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker, Select } from "flowbite-react";

const page = () => {
  const [openModalAnalyzeResume, setOpenModalAnalyzeResume] = useState(false);
  const [openModalAnalyzeResumeBig, setOpenModalAnalyzeResumeBig] = useState(false);
  return (
    <div className='flex gap-5 pb-5'>
        <div className='w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px]'>
           <div className='border-b border-[#E5E5E5] p-5 flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <HiClipboardList className='text-[#800080] text-2xl' />
                <h3 className='text-[16px] text-[#151515] font-medium'>Resume Sections</h3>
              </div>
              <button className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><AiFillSave className='text-[18px]' /> Save Resume</button>
           </div>
           <div className='resume_tab_section'>
              <Tabs>
                <div className='border-b border-[#E5E5E5] p-5'>
                    <div className='tab_point'>
                      <TabList>
                        <Tab><span><BiSolidUser /></span> Personal Info</Tab>
                        <Tab><span><HiAcademicCap /></span> Education</Tab>
                        <Tab><span><BiSolidBriefcase /></span> Work Experience</Tab>
                        <Tab><span><FaLanguage /></span> Languages</Tab>
                        <Tab><span><MdSettingsSuggest /></span> Skills</Tab>
                        <Tab><span><FaDiagramProject /></span> Personal Projects</Tab>
                        <Tab><span><FaCertificate /></span> Certifications</Tab>
                        <Tab><span><FaTrophy /></span> Achievements</Tab>
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
                                <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Basic Info</h4>
                                <p className='text-[14px] text-[#939393] font-normal'>Add your personal details that will appear at the top of your resume. * Required fields</p>
                              </div>
                              <div className='resume_form_area'>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Full Name <span>*</span></Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiSolidUser className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='Kabilan S' />
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Email Address <span>*</span></Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <MdEmail className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="email" sizing="md" placeholder='Kabilan S' />
                                      </div>
                                    </div>
                                </div>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Phone Number <span>*</span></Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiSolidPhone className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='+91-5362563762' />
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
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
                              </div>
                            </div>
                            <div className='mb-4'>
                              <div className='mb-4'>
                                <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Web & Social</h4>
                                <p className='text-[14px] text-[#939393] font-normal'>Add your web presence to make it easy for employers to learn more about you.</p>
                              </div>
                              <div className='resume_form_area'>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Personal Website</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <FaGlobe className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='https://yourname.design' />
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">LinkedIn Profile </Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiLogoLinkedinSquare className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='https://www.linkedin.com/in/johndoe' />
                                      </div>
                                    </div>
                                </div>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">GitHub Profile</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BsGithub className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='https://github.com/johndoe' />
                                      </div>
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
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Career Title</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiSolidBriefcase className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='UI Designer' />
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Career Goals</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiSolidBriefcase className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='Briefly Describe your career goals' />
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
                                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Education 1</h4>
                                    <p className='text-[14px] text-[#939393] font-normal'>Add your educational background and qualifications</p>
                                 </div>
                                 <div className='flex justify-end items-center gap-2'>
                                  <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Education</button>
                                  <button className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                </div>
                              </div>
                              <div className='resume_form_area'>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
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
                                    <div className='w-6/12 resume_form_box'>
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
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
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
                                    <div className='w-6/12 resume_form_box'>
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
                                        <Label htmlFor="base">GPA or Grade</Label>
                                      </div>
                                      <div className='field_box flex items-center pl-3'>
                                        <TextInput id="base" type="text" sizing="md" placeholder='e.g. 3.8/4.0 or 85%' />
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
                              <div className='mb-4 flex items-center justify-between'>
                                 <div>
                                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Experience 1</h4>
                                    <p className='text-[14px] text-[#939393] font-normal'>Add your work experience and internships</p>
                                 </div>
                                 <div className='flex justify-end items-center gap-2'>
                                  <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Education</button>
                                  <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                </div>
                              </div>
                              <div className='resume_form_area'>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
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
                                    <div className='w-6/12 resume_form_box'>
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
                                <div className='mb-3'>
                                    <div className='w-full resume_form_box'>
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
                                </div>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Start Date <span>*</span></Label>
                                      </div>
                                      <div className='field_box_date'>
                                        <Datepicker /> 
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
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
                                    <div>
                                      <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Project 1</h4>
                                    </div>

                                    <div className='flex gap-4 mb-3'>
                                        <div className='w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Project Title</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <FaDiagramProject className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Name of the project' />
                                          </div>
                                        </div>
                                        <div className='w-6/12 resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Your Role</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiSolidBriefcase className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='E.g Developer, Designer, etc.' />
                                          </div>
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <div className='w-full resume_form_box'>
                                          <div className="mb-1 block">
                                            <Label htmlFor="base">Technologies Used</Label>
                                          </div>
                                          <div className='field_box flex items-center'>
                                            <div className='p-3'>
                                              <BiCodeAlt className='text-[#928F8F]' />
                                            </div>
                                            <TextInput id="base" type="text" sizing="md" placeholder='Enter the technologies used in this project' />
                                          </div>
                                        </div>
                                    </div>

                                    <div className='w-full resume_form_box mb-3'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Description</Label>
                                      </div>
                                      <div className='flex items-center'>
                                        <Textarea id="comment" placeholder="Write a description about the project" required rows={3} />
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
                                 <div className='flex justify-end items-center gap-2'>
                                  <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add New Language</button>
                                </div>
                              </div>
                              <div className='resume_form_area'>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Language Name </Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <FaLanguage className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='E.g English, Hindi, German, etc.' />
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Proficiency</Label>
                                      </div>
                                      <div className='field_box pl-3'>
                                        <Select required>
                                          <option>Intermediate</option>
                                          <option>English</option>
                                          <option>Hindi</option>
                                          <option>bengali</option>
                                        </Select>
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
                              <div className='mb-4 flex items-center justify-between'>
                                 <div>
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
                                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Projects</h4>
                                    <p className='text-[14px] text-[#939393] font-normal'>Add notable projects you&lsquo;ve worked on</p>
                                 </div>
                                 <div className='flex justify-end items-center gap-2'>
                                  <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Project</button>
                                  <button className='bg-[#ffffff] hover:bg-[#000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                </div>
                              </div>
                              <div className='resume_form_area'>

                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Project Title</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <FaDiagramProject className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='Name of the project' />
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Your Role</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiSolidBriefcase className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='E.g Developer, Designer, etc.' />
                                      </div>
                                    </div>
                                </div>
                                
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Start Date <span>*</span></Label>
                                      </div>
                                      <div className='field_box_date'>
                                        <Datepicker /> 
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">End Date <span>*</span></Label>
                                      </div>
                                      <div className='field_box_date'>
                                        <Datepicker /> 
                                      </div>
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <div className='w-full resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Project URL</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiLink className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='E.g. https://yourname.design' />
                                      </div>
                                    </div>
                                </div>

                                <div className='mb-3'>
                                    <div className='w-full resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Technologies Used</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiCodeAlt className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='Enter the technologies used in this project' />
                                      </div>
                                    </div>
                                </div>

                                <div className='w-full resume_form_box mb-3'>
                                  <div className="mb-1 block">
                                    <Label htmlFor="base">Description</Label>
                                  </div>
                                  <div className='flex items-center'>
                                    <Textarea id="comment" placeholder="Write a description about the project" required rows={3} />
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
                                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Certifications</h4>
                                    <p className='text-[14px] text-[#939393] font-normal'>Fill in the details for this section</p>
                                 </div>
                                 <div className='flex justify-end items-center gap-2'>
                                  <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[30px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Certification</button>
                                  <button className='bg-[#ffffff] hover:bg-[#0000000] border border-[#D5D5D5] rounded-[7px] text-[10px] leading-[30px] text-[#828282] hover:text-[#92278F] font-medium cursor-pointer px-2 flex items-center gap-1'><MdDelete className='text-sm text-[#FF0000]' /> Delete</button>
                                </div>
                              </div>
                              <div className='resume_form_area'>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Certification Name</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <FaCertificate className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='Name of th certification' />
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base"> Issuing Organization</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BiSolidBuilding className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="email" sizing="md" placeholder='E.g. Coursera, Udemy, etc.' />
                                      </div>
                                    </div>
                                </div>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Date Obtained</Label>
                                      </div>
                                      <div className='field_box_date'>
                                        <Datepicker /> 
                                      </div>
                                    </div>
                                    <div className='w-6/12 resume_form_box'>
                                      <div className="mb-1 block">
                                        <Label htmlFor="base">Certification ID</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <BsFillPersonVcardFill className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='Enter certification ID' />
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
                                    <h4 className='text-[16px] text-[#151515] font-semibold pb-1'>Achievement #1</h4>
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
                                        <Label htmlFor="base">Achievement Title</Label>
                                      </div>
                                      <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                          <FaTrophy className='text-[#928F8F]' />
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" placeholder='Employee of the Month, Excellence Award' />
                                      </div>
                                    </div>
                                </div>
                                <div className='flex gap-4 mb-3'>
                                    <div className='w-6/12 resume_form_box'>
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
                                    <div className='w-6/12 resume_form_box'>
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
        <div className='w-6/12 bg-[#ffffff] border border-[#E5E5E5] rounded-[8px] p-5'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-1'>
              <MdPreview className='text-[#800080] text-2xl' />
              <h3 className='text-[16px] text-[#151515] font-medium'>Preview</h3>
            </div>
            <div className='flex items-center gap-3'>
              <button onClick={() => setOpenModalAnalyzeResume(true)} className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoStatsChart className='text-base' /> Analyze Resume</button>
              <button onClick={() => setOpenModalAnalyzeResumeBig(true)} className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download DOCX</button>
              <button className='bg-[#800080] hover:bg-[#F6EFFF] rounded-[7px] text-[12px] leading-[36px] text-[#ffffff] hover:text-[#92278F] font-medium cursor-pointer px-4 flex items-center gap-1.5'><IoMdDownload className='text-[18px]' /> Download PDF</button>
            </div>
          </div>
          <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
             <Image src={resume_sections_view} alt="resume_sections_view" className='' />
          </div>
          <div className='flex items-center justify-between mb-0'>
            <div className='flex items-center gap-1'>
              <h3 className='text-[12px] text-[#060606] font-medium'>Template: <span className='text-[#6D6D6D]'>Modern</span></h3>
            </div>
            <div className='flex items-center gap-3'>
              <button className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[12px] leading-[36px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-4 flex items-center gap-1.5'> Change Template <AiOutlineArrowRight className='text-base' /></button>
            </div>
          </div>
        </div>

        {/* add modal for apply job start here */}
        <Modal size="3xl" className="apply_modal_area" show={openModalAnalyzeResume} onClose={() => setOpenModalAnalyzeResume(false)}>
              <ModalHeader className='bg-white text-black border-0 pt-2 pr-2'>&nbsp;</ModalHeader>
              <ModalBody className='bg-white p-5 rounded-b-[4px] relative'>
                  <div className='border border-[#E5E5E5] rounded-[8px] p-5 mb-3'>
                    <h3 className='text-base font-medium mb-4 text-[#151515]'>After</h3>
                    <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
                      <Image src={resume_sections_view} alt="resume_sections_view" className='' />
                    </div>
                    <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute left-[30px] bottom-[-130px] p-5'>
                      <Image src={resume_score} alt="resume_score" className='mb-0' />
                    </div>
                  </div>
                  <div>
                      <p className='text-[14px] text-[#DF1B35] font-semibold pb-0'>Important Note: </p>
                      <p className='text-[14px] text-[#626262]'>Unlock enhanced features and maximize your potential by upgrading to our Premium packages.</p>
                    </div>
              </ModalBody>
          </Modal>
        {/* add modal for apply job ends here */}

        {/* add modal for apply job start here */}
        <Modal size="6xl" className="apply_modal_area" show={openModalAnalyzeResumeBig} onClose={() => setOpenModalAnalyzeResumeBig(false)}>
              <ModalHeader className='bg-white text-black border-0 pt-2 pr-2'>&nbsp;</ModalHeader>
              <ModalBody className='bg-white p-5 rounded-b-[4px] relative'>
                  <div className='flex gap-4'>
                    <div className='border border-[#E5E5E5] rounded-[8px] p-5 mb-3 w-6/12 relative'>
                      <h3 className='text-base font-medium mb-4 text-[#151515]'>Before</h3>
                      <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
                        <Image src={resume_sections_view} alt="resume_sections_view" className='' />
                      </div>
                      <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute left-[10px] bottom-[20px] p-5'>
                        <Image src={resume_score} alt="resume_score" className='mb-0' />
                      </div>
                    </div>
                    <div className='border border-[#E5E5E5] rounded-[8px] p-5 mb-3 w-6/12 relative'>
                      <h3 className='text-base font-medium mb-4 text-[#151515]'>After</h3>
                      <div className='border border-[#E5E5E5] rounded-[8px] mb-4'>
                        <Image src={resume_sections_view} alt="resume_sections_view" className='' />
                      </div>
                      <div className='bg-[#FFFFFF] rounded-[10px] shadow-2xl absolute right-[10px] bottom-[20px] p-5'>
                        <Image src={resume_score2} alt="resume_score2" className='mb-0' />
                      </div>
                    </div>
                  </div>
              </ModalBody>
          </Modal>
        {/* add modal for apply job ends here */}
    </div>
  )
}

export default page