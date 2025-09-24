'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Inter } from 'next/font/google';

import resume01 from "../assets/imagesource/resume01.png";

import { HiClipboardList } from "react-icons/hi";
import { MdPreview } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

import { BiImport, BiSolidUser } from "react-icons/bi";
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

import { HiDocumentText } from "react-icons/hi2";

import { BsFiletypeCsv } from "react-icons/bs";

import { RiSearchLine } from "react-icons/ri";

import { FaArrowUpWideShort } from "react-icons/fa6";

import { AiOutlineEdit } from "react-icons/ai";

import { MdOutlineDelete } from "react-icons/md";

import { BiFilter } from "react-icons/bi";


import { Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker,
     Select, FileInput, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

import serverApi from '../reducers/serverApi';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { inviteStudents, inviteStudentsMannually, saveInvitedStudent } from '../reducers/InviteSlice';
import { toast, ToastContainer } from 'react-toastify';
import StudentList from './StudentList';



const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})

const page = () => {
    const{loading_for_csv,loading_for_manual,loading}=useSelector((state)=>state?.inviteStd)
    const dispatch=useDispatch()

const handleDownload = async () => {
  try {
    // Tell axios to expect a blob
    const response = await serverApi.get("/api/usercsv/download", {
      responseType: "blob",
    });

    // Create blob URL
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Create <a> element to trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample.csv"; // file name
    document.body.appendChild(a);
    a.click();

    // Cleanup
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

    const {
    register: register1,
    handleSubmit: handleSubmit1,
    control,
    reset: reset1,
    formState: { errors: errors1 },
  } = useForm({
     defaultValues: {
      students: [
        { name: "", email: "", phone: "", resume_count: "" } // start with one student
      ]
    }
  });

   const { fields, append, remove } = useFieldArray({
    control,
    name: "students",
  });
 const csvFile=watch("file")
  const onSubmit=(data)=>{
    const formData=new FormData()
       if (data.file && data.file[0]) {
          
          formData.append("file", data.file[0]);
        } else {
          console.error("No resume file selected");
          toast.error("Please select a resume file to upload");
          return;
        }
     dispatch(inviteStudents(formData)).then((res)=>{
        console.log("csvREs",res);
        // if(res?.payload?.data?.status_code===200){
        //     dispatch(saveInvitedStudent({user:res?.payload?.data?.allIds})).then((res)=>{
        //          console.log(res,"resmap");
        //         if(res?.payload?.status_code===201){
        //             toast.success(res?.payload?.message)
        //         }
        //     })

        // }
        
     })
  }

// const onSubmitManual = (data) => {
//   if (!data.students || data.students.length === 0) {
//     toast.error("Please add at least one student");
//     return;
//   }

//   // Loop through each student and dispatch
//   data.students.forEach((student) => {
//     const payload = {
//       name: student.name,
//       email: student.email,
//       phone: student.phone,
//       resume_count: student.resume_count,
//     };

//     dispatch(inviteStudentsMannually(payload))
//       .unwrap()
//       .then((res) => {
//         console.log("Student invited:", res);
//         if(res?.status_code===201){
//             toast.success(`${student.name} invited successfully`);
//         }
        

//       })
//       .catch((err) => {
//         console.error("Error inviting student:", err);
//         toast.error(
//           err?.message || `Failed to invite ${student.name}`
//         );
//       });
//   });
// };


const onSubmitManual = async (data) => {
  if (!data.students || data.students.length === 0) {
    toast.error("Please add at least one student");
    return;
  }

  try {
    // store all invited student ids
    const invitedIds = [];

    // Loop through students one by one
    for (const student of data.students) {
      const payload = {
        name: student.name,
        email: student.email,
        phone: student.phone,
        resume_count: student.resume_count,
      };

      try {
        const res = await dispatch(inviteStudentsMannually(payload)).unwrap();

        if (res?.status_code === 201) {
          toast.success(`${student.name} invited successfully`);
          if (res?.allIds?.[0]) {
            invitedIds.push(res?.allIds?.[0]); // ✅ collect student id
          }
        }
      } catch (err) {
        console.error("Error inviting student:", err);
        toast.error(err?.message || `Failed to invite ${student.name}`);
      }
    }

    // ✅ After all students invited, call saveInvitedStudent with all IDs
    if (invitedIds.length > 0) {
      //const mapPayload = { user: invitedIds };

    //  const mapRes = await dispatch(saveInvitedStudent(mapPayload)).unwrap();

      if (mapRes?.status_code === 201) {
        toast.success("All invited students mapped successfully");
        reset1()
      }
    }
  } catch (err) {
    console.error("Final error:", err);
    toast.error("Something went wrong while saving invited students");
  }
};
     



useEffect(() => {
      if (csvFile && csvFile[0]) {
        console.log("Resume file selected:", csvFile[0]);
      }
    }, [csvFile]);



          
  return (
    <div className={`${inter.className} antialiased pb-8`}>
        <ToastContainer/>
        <div className='mb-5 lg:mb-10 pt-6'>
            <h2 className='text-xl lg:text-[30px] leading-[30px] text-[#151515] font-semibold mb-1 lg:mb-4'>Invite Students</h2>
            <p className='text-sm leading-[18px] lg:text-[16px] lg:leading-[23px] text-[#575757] font-normal mb-0'>Easily invite and manage student profiles with seamless Excel upload or manual entry.</p>
        </div>
        <div className='bg-white rounded-[10px] p-5 lg:p-10 lg:flex gap-6 mb-5'>
            <div className='lg:w-6/12 mb-4 lg:mb-0'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-0'>
                    <div>
                        <h4 className='text-[20px] text-[#151515] font-semibold pb-5'>Invite students through CSV.</h4>
                    </div> 
                    <div className="flex w-full items-center justify-center">
                        <Label
                        htmlFor="dropzone-file"
                        className="resume_upload_box_small2 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <BsFiletypeCsv className="text-[70px] text-[#23A566]" />
                                <p className="my-2 text-xl text-[#000000]">
                                     {/* Import your Resume */}
                                    {csvFile && csvFile[0]
                                    ? csvFile[0].name
                                    : "Select a CSV file to import"}  
                                        </p>
                                
                                <p className='text-[#A4A4A4] text-base'>or drag and drop it here</p>
                            </div>
                            <FileInput {...register("file",{ required: true })}
                            accept='.csv'
                            id="dropzone-file" className="hidden" 
                             aria-invalid={errors.resume_file ? "true" : "false"}
                            />
                        </Label>
                  
                    </div> 
                           {errors.file?.type === "required" && (
                  <p className="text-red-700 text-sm" role="alert">
                    Please upload csv
                  </p>
                )}
                    <div className='lg:flex gap-4 mt-3'>
                        <button type='button' onClick={handleDownload} class="bg-[#F0F0F0] hover:bg-[#383737] cursor-pointer px-10 text-[15px] leading-[45px] text-[#383737] hover:text-[#ffffff] font-semibold w-full text-center rounded-[7px] flex gap-2 items-center mb-2 lg:mb-0"><BiImport className="text-[24px]" /> Download Sample CSV</button>
                        <button class="bg-[#F6EFFF] hover:bg-[#800080] cursor-pointer px-10 text-[15px] leading-[45px] text-[#800080] hover:text-[#F6EFFF] font-semibold w-full text-center rounded-[7px]">{loading_for_csv||loading?"Waiting...":"Invite Students"}</button>
                    </div>
                </div>
                </form>
            </div>
            <div className='lg:w-6/12'>
            <form onSubmit={handleSubmit1(onSubmitManual)}>
                <div className=''>
                    {/* <div className='mb-0'>
                        <div className='mb-4 flex items-center justify-between'>
                            <div className='w-6/12'>
                              <h4 className='text-[16px] lg:text-[20px] text-[#151515] font-semibold pb-1'>Invite students manually</h4>
                            </div>
                            <div className='flex justify-end items-center gap-2 w-6/12'>
                                <button
                                 onClick={() =>
                                        append({ name: "", email: "", phone: "", resume_count: "" })
                                        }
                                className='bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[32px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1'><BsFillPlusCircleFill className='text-sm' /> Add Another Student</button>
                            </div>  
                        </div>
                        <div className='resume_form_area'>
                            <div className='mb-3'>
                                <div className='w-full resume_form_box'>
                                    <div className="mb-1 block">
                                    <Label htmlFor="base">Student Name <span> *</span></Label>
                                    </div>
                                    <div className='field_box flex items-center'>
                                    <div className='p-3'>
                                        <BiSolidUser className='text-[#928F8F]' />
                                    </div>
                                    <TextInput {...register1("name",{required:"Name is Required"})} id="base" type="text" sizing="md" placeholder='Student Name' />
                                    
                                        {errors1?.name && (
                                        <span className="text-red-500">
                                            {errors1?.name?.message}
                                        </span>
                                        )}
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div className='mb-4'>
                        <div className='resume_form_area'>
                            <div className='lg:flex gap-4 mb-3'>
                                <div className='lg:w-6/12 resume_form_box mb-2 lg:mb-0'>
                                    <div className="mb-1 block">
                                    <Label htmlFor="base">Student Email Id <span>*</span></Label>
                                    </div>
                                    <div className='field_box flex items-center'>
                                    <div className='p-3'>
                                        <MdEmail className='text-[#928F8F]' />
                                    </div>
                                    <TextInput {...register1("email",{required:"Email is required"})} id="base" type="email" sizing="md" placeholder='Enter student email address' />
                                        {errors1?.email && (
                                        <span className="text-red-500">
                                            {errors1?.email?.message}
                                        </span>
                                        )}
                                    </div>
                                </div>
                                <div className='lg:w-6/12 resume_form_box'>
                                    <div className="mb-1 block">
                                    <Label htmlFor="base">Phone Number <span>*</span></Label>
                                    </div>
                                    <div className='field_box flex items-center'>
                                    <div className='p-3'>
                                        <BiSolidPhone className='text-[#928F8F]' />
                                    </div>
                                    <TextInput {...register1("phone",{required:"Phone is required"})} id="base" type="text" sizing="md" placeholder='+91-5362563762   ' />
                                     {errors1?.phone && (
                                        <span className="text-red-500">
                                            {errors1?.phone?.message}
                                        </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='resume_form_area'>
                            <div className='mb-3'>
                                <div className='w-full resume_form_box'>
                                    <div className="mb-1 block">
                                    <Label htmlFor="base">Resumes Assigned <span> *</span></Label>
                                    </div>
                                    <div className='field_box flex items-center'>
                                        <div className='p-3'>
                                            <HiDocumentText className='text-[#928F8F]' />
                                        </div>
                                        <TextInput {...register1("resume_count",{required:"Resume Count is required",

                                            valueAsNumber: true, // ensures it’s treated as number
                                            max: {
                                            value: 100,
                                            message: "Value cannot be greater than 100",
                                            },
                                        })} id="base" type="text" sizing="md" placeholder='Max 100' />
                                     {errors1?.resume_count && (
                                        <span className="text-red-500">
                                            {errors1?.resume_count?.message}
                                        </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button class="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]">Add Student</button>
                    </div> */}

                      <div>
    <div className="mb-4 flex items-center justify-between">
      <h4 className="text-[16px] lg:text-[20px] text-[#151515] font-semibold pb-1">
        Invite students manually
      </h4>
      <button
        type="button"
        onClick={() =>
          append({ name: "", email: "", phone: "", resume_count: "" })
        }
        className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[32px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
      >
        <BsFillPlusCircleFill className="text-sm" /> Add Another Student
      </button>
    </div>

    {/* Loop through students */}
    {fields.map((field, index) => (
      <div
        key={field.id}
        className="resume_form_area  p-4 rounded mb-4 relative"
      >
        {/* Student Name */}
        <div className="resume_form_box mb-3">
          <Label>Student Name <span>*</span></Label>
          <div className="field_box flex items-center">
            <div className="p-3">
              <BiSolidUser className="text-[#928F8F]" />
            </div>
            <TextInput
              {...register1(`students.${index}.name`, {
                required: "Name is Required",
              })}
              type="text"
              placeholder="Student Name"
            />
          </div>
          {errors1?.students?.[index]?.name && (
            <span className="text-red-500">
              {errors1.students[index].name.message}
            </span>
          )}
        </div>

        {/* Email + Phone */}
        <div className="lg:flex gap-4 mb-3">
          <div className="lg:w-6/12 resume_form_box">
            <Label>Email <span>*</span></Label>
            <div className="field_box flex items-center">
              <div className="p-3">
                <MdEmail className="text-[#928F8F]" />
              </div>
              <TextInput
                {...register1(`students.${index}.email`, {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Enter student email"
              />
            </div>
            {errors1?.students?.[index]?.email && (
              <span className="text-red-500">
                {errors1.students[index].email.message}
              </span>
            )}
          </div>

          <div className="lg:w-6/12 resume_form_box">
            <Label>Phone <span>*</span></Label>
            <div className="field_box flex items-center">
              <div className="p-3">
                <BiSolidPhone className="text-[#928F8F]" />
              </div>
              <TextInput
                {...register1(`students.${index}.phone`, {
                  required: "Phone is required",
                })}
                type="text"
                placeholder="+91-5362563762"
              />
            </div>
            {errors1?.students?.[index]?.phone && (
              <span className="text-red-500">
                {errors1.students[index].phone.message}
              </span>
            )}
          </div>
        </div>

        {/* Resume Count */}
        <div className="resume_form_box">
          <Label>Resumes Assigned <span>*</span></Label>
          <div className="field_box flex items-center">
            <div className="p-3">
              <HiDocumentText className="text-[#928F8F]" />
            </div>
            <TextInput
              {...register1(`students.${index}.resume_count`, {
                required: "Resume Count is required",
                valueAsNumber: true,
                max: { value: 100, message: "Value cannot be greater than 100" },
              })}
              type="number"
              placeholder="Max 100"
            />
          </div>
          {errors1?.students?.[index]?.resume_count && (
            <span className="text-red-500">
              {errors1.students[index].resume_count.message}
            </span>
          )}
        </div>

        {/* Delete button */}
        {fields.length > 1 && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-black"
          >
            <MdOutlineDelete className="text-xl" />
          </button>
        )}
      </div>
    ))}

    {/* Single Add Student button */}
    <button
      type="submit"
      className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]"
    >
    {loading_for_manual||loading?"Waiting...":"Add Student"}  
    </button>
  </div>



                </div>
            </form>
            </div>
        </div>
        {/* <div className='bg-white rounded-[10px] p-5 lg:p-10'>
            <div className='lg:flex justify-between items-center mb-4'>
                <h4 className='text-[20px] text-[#151515] font-semibold pb-5'>Invited Students</h4>
                <div className='flex items-center gap-2 lg:w-3/12 search_section'>
                    <div className='w-10/12'>
                        <div className='bg-[#F3F4F6] rounded-[8px] flex gap-2 items-center pl-2'>
                            <button className='w-[42px] h-[42px] flex justify-center items-center cursor-pointer'>
                                <RiSearchLine className='text-xl text-[#999999]' />
                            </button>
                            <TextInput id="base" type="text" sizing="md" placeholder='Search resume...' className='w-full pl-0' />
                        </div>
                    </div>
                    <div className='w-2/12'>
                        <div className='flex justify-center items-center gap-4'>
                            <button className='bg-white hover:bg-[#a635a2] text-black hover:text-white border border-[#D5D5D5] rounded-[8px] w-[42px] h-[42px] flex justify-center items-center cursor-pointer'><BiFilter className='text-3xl text-[#686868]' /></button>
                        </div>
                    </div>
                </div>
            </div> 
            <div className='invited_students_table_wrap'>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell className="p-4 bg-[#f0f0f0]">
                                  <Checkbox />
                                </TableHeadCell>
                                <TableHeadCell className='bg-[#f0f0f0]'>Name</TableHeadCell>
                                <TableHeadCell className='bg-[#f0f0f0]'>Date </TableHeadCell>
                                <TableHeadCell className='bg-[#f0f0f0]'>Mobile No</TableHeadCell>
                                <TableHeadCell className='bg-[#f0f0f0]'>Email ID</TableHeadCell>
                                <TableHeadCell className='bg-[#f0f0f0]'>Add More Credit</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="p-4 bg-[#ffffff] border-b border-[#f0f0f0]">
                                   <Checkbox />
                                </TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">Ethan Noah</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">10 March, 2023</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">1234567890</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">xyz@xyz.com</TableCell>
                                <TableCell className='flex items-center gap-6 bg-[#ffffff] border-b border-[#f0f0f0] pb-[20px]'>
                                    <button className='text-[#4E7FFF] hover:text-black cursor-pointer'><AiOutlineEdit className='text-2xl' /></button>
                                    <button className='text-[#FF4B4B] hover:text-black cursor-pointer'><MdOutlineDelete className='text-2xl' /></button>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="p-4 bg-[#ffffff] border-b border-[#f0f0f0]">
                                   <Checkbox />
                                </TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">Ethan Noah</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">10 March, 2023</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">1234567890</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">xyz@xyz.com</TableCell>
                                <TableCell className='flex items-center gap-6 bg-[#ffffff] border-b border-[#f0f0f0]'>
                                    <button className='text-[#4E7FFF] hover:text-black cursor-pointer'><AiOutlineEdit className='text-2xl' /></button>
                                    <button className='text-[#FF4B4B] hover:text-black cursor-pointer'><MdOutlineDelete className='text-2xl' /></button>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="p-4 bg-[#ffffff] border-b border-[#f0f0f0]">
                                   <Checkbox />
                                </TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">Ethan Noah</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">10 March, 2023</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">1234567890</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">xyz@xyz.com</TableCell>
                                <TableCell className='flex items-center gap-6 bg-[#ffffff] border-b border-[#f0f0f0]'>
                                    <button className='text-[#4E7FFF] hover:text-black cursor-pointer'><AiOutlineEdit className='text-2xl' /></button>
                                    <button className='text-[#FF4B4B] hover:text-black cursor-pointer'><MdOutlineDelete className='text-2xl' /></button>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="p-4 bg-[#ffffff] border-b border-[#f0f0f0]">
                                   <Checkbox />
                                </TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">Ethan Noah</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">10 March, 2023</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">1234567890</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">xyz@xyz.com</TableCell>
                                <TableCell className='flex items-center gap-6 bg-[#ffffff] border-b border-[#f0f0f0]'>
                                    <button className='text-[#4E7FFF] hover:text-black cursor-pointer'><AiOutlineEdit className='text-2xl' /></button>
                                    <button className='text-[#FF4B4B] hover:text-black cursor-pointer'><MdOutlineDelete className='text-2xl' /></button>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="p-4 bg-[#ffffff] border-b border-[#f0f0f0]">
                                   <Checkbox />
                                </TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">Ethan Noah</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">10 March, 2023</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">1234567890</TableCell>
                                <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">xyz@xyz.com</TableCell>
                                <TableCell className='flex items-center gap-6 bg-[#ffffff] border-b border-[#f0f0f0]'>
                                    <button className='text-[#4E7FFF] hover:text-black cursor-pointer'><AiOutlineEdit className='text-2xl' /></button>
                                    <button className='text-[#FF4B4B] hover:text-black cursor-pointer'><MdOutlineDelete className='text-2xl' /></button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div> */}
        <StudentList/>
    </div>
  )
}

export default page