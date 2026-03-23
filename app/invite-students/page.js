// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';

// import { Inter } from 'next/font/google';

// import resume01 from "../assets/imagesource/resume01.png";

// import { HiClipboardList } from "react-icons/hi";
// import { MdPreview } from "react-icons/md";
// import { IoStatsChart } from "react-icons/io5";
// import { IoMdDownload } from "react-icons/io";
// import { AiOutlineArrowRight } from "react-icons/ai";
// import { AiFillSave } from "react-icons/ai";

// import { BiImport, BiSolidUser } from "react-icons/bi";
// import { BiSolidBriefcase } from "react-icons/bi";
// import { FaGlobe } from "react-icons/fa";
// import { BiLogoLinkedinSquare } from "react-icons/bi";
// import { BsGithub } from "react-icons/bs";
// import { MdEmail } from "react-icons/md";
// import { FaLocationDot } from "react-icons/fa6";
// import { BiSolidPhone } from "react-icons/bi";

// import { HiAcademicCap } from "react-icons/hi2";

// import { FaLanguage } from "react-icons/fa6";
// import { MdSettingsSuggest } from "react-icons/md";
// import { FaDiagramProject } from "react-icons/fa6";
// import { FaCertificate } from "react-icons/fa";
// import { FaTrophy } from "react-icons/fa6";

// import { BiSolidBank } from "react-icons/bi";

// import { BsFillPlusCircleFill } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";

// import { FaTags } from "react-icons/fa";
// import { BiSolidBuilding } from "react-icons/bi";

// import { BiWorld } from "react-icons/bi";

// import { BsFillPersonVcardFill } from "react-icons/bs";
// import { BiCodeAlt } from "react-icons/bi";

// import { BiLink } from "react-icons/bi";

// import { HiDocumentText } from "react-icons/hi2";

// import { BsFiletypeCsv } from "react-icons/bs";

// import { RiSearchLine } from "react-icons/ri";

// import { FaArrowUpWideShort } from "react-icons/fa6";

// import { AiOutlineEdit } from "react-icons/ai";

// import { MdOutlineDelete } from "react-icons/md";

// import { BiFilter } from "react-icons/bi";


// import {
//   Label, TextInput, Modal, ModalBody, ModalFooter, ModalHeader, Checkbox, Textarea, Datepicker,
//   Select, FileInput, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow
// } from "flowbite-react";

// import serverApi from '../reducers/serverApi';
// import { useFieldArray, useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { invitedStudentsList, inviteStudents, inviteStudentsMannually, saveInvitedStudent } from '../reducers/InviteSlice';
// import { toast, ToastContainer } from 'react-toastify';
// import StudentList from './StudentList';



// const inter = Inter({
//   subsets: ['latin'], // or ['latin-ext'] etc.
//   weight: ['400', '500', '600', '700'], // specify desired weights
//   variable: '--font-inter', // optional, for Tailwind usage
// })

// const page = () => {
//   const { loading_for_csv, loading_for_manual, loading } = useSelector((state) => state?.inviteStd)

//   const dispatch = useDispatch()


//   const handleDownload = async () => {
//     try {
//       // Tell axios to expect a blob
//       const response = await serverApi.get("/api/usercsv/download", {
//         responseType: "blob",
//       });

//       // Create blob URL
//       const url = window.URL.createObjectURL(new Blob([response.data]));

//       // Create <a> element to trigger download
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "sample.csv"; // file name
//       document.body.appendChild(a);
//       a.click();

//       // Cleanup
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   };


//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const {
//     register: register1,
//     handleSubmit: handleSubmit1,
//     control,
//     reset: reset1,
//     formState: { errors: errors1 },
//   } = useForm({
//     defaultValues: {
//       students: [
//         { name: "", email: "", phone: "", resume_count: "" } // start with one student
//       ]
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "students",
//   });
//   const csvFile = watch("file")
//   const onSubmit = (data) => {
//     const formData = new FormData()
//     if (data.file && data.file[0]) {

//       formData.append("csv", data.file[0]);
//     } else {
//       console.error("No resume file selected");
//       toast.error("Please select a resume file to upload");
//       return;
//     }
//     dispatch(inviteStudents(formData)).then((res) => {
//       console.log("csvREs", res);
//       if (res?.payload?.response?.data?.status_code === 422) {
//         toast.error(res?.payload?.response?.data?.message)
//       }
//       else if (res?.payload?.status_code === 200) {
//         dispatch(invitedStudentsList({
//           page: 1,
//           limit: 10
//         }))
//         toast.success(res?.payload?.message)

//       }

//     })
//   }

//   // const onSubmitManual = (data) => {
//   //   if (!data.students || data.students.length === 0) {
//   //     toast.error("Please add at least one student");
//   //     return;
//   //   }

//   //   // Loop through each student and dispatch
//   //   data.students.forEach((student) => {
//   //     const payload = {
//   //       name: student.name,
//   //       email: student.email,
//   //       phone: student.phone,
//   //       resume_count: student.resume_count,
//   //     };

//   //     dispatch(inviteStudentsMannually(payload))
//   //       .unwrap()
//   //       .then((res) => {
//   //         console.log("Student invited:", res);
//   //         if(res?.status_code===201){
//   //             toast.success(`${student.name} invited successfully`);
//   //         }


//   //       })
//   //       .catch((err) => {
//   //         console.error("Error inviting student:", err);
//   //         toast.error(
//   //           err?.message || `Failed to invite ${student.name}`
//   //         );
//   //       });
//   //   });
//   // };


//   const onSubmitManual = (data) => {

//     // store all invited student ids
//     const invitedIds = [];

//     // Loop through students one by one
//     for (const student of data.students) {
//       const payload = {
//         name: student.name,
//         email: student.email,
//         phone: student.phone,
//         resume_count: student.resume_count,
//       };


//       dispatch(inviteStudentsMannually(payload)).then((res) => {
//         console.log("res", res);
//         if (res?.payload?.response?.data?.status_code === 422) {
//           toast.error(res?.payload?.response?.data?.message)
//         }
//         else if (res?.payload?.status_code === 201) {
//           toast.success(res?.payload?.message)
//           dispatch(invitedStudentsList({
//             page: 1,
//             limit: 10
//           }))
//           toast.success(res?.payload?.message)
//         }

//       })


//     };
//   }




//   useEffect(() => {
//     if (csvFile && csvFile[0]) {
//       console.log("Resume file selected:", csvFile[0]);
//     }
//   }, [csvFile]);




//   return (
//     <div className={`${inter.className} antialiased pb-8`}>
//       <ToastContainer />
//       <div className='mb-5 lg:mb-10 pt-6'>
//         <h2 className='text-xl lg:text-[30px] leading-[30px] text-[#151515] font-semibold mb-1 lg:mb-4'>Invite Students</h2>
//         <p className='text-sm leading-[18px] lg:text-[16px] lg:leading-[23px] text-[#575757] font-normal mb-0'>Easily invite and manage student profiles with seamless Excel upload or manual entry.</p>
//       </div>
//       <div className='bg-white rounded-[10px] p-5 lg:p-10 lg:flex gap-6 mb-5'>

//         <div className='lg:w-6/12 mb-4 lg:mb-0'>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className='mb-0'>
//               <div>
//                 <h4 className='text-[20px] text-[#151515] font-semibold pb-5'>Invite students through CSV.</h4>
//               </div>
//               <div className="flex w-full items-center justify-center">
//                 <Label
//                   htmlFor="dropzone-file"
//                   className="resume_upload_box_small2 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//                 >
//                   <div className="flex flex-col items-center justify-center pb-6 pt-5">
//                     <BsFiletypeCsv className="text-[70px] text-[#23A566]" />
//                     <p className="my-2 text-xl text-[#000000]">

//                       {csvFile && csvFile[0]
//                         ? csvFile[0].name
//                         : "Select a CSV file to import"}
//                     </p>

//                     <p className='text-[#A4A4A4] text-base'>or drag and drop it here</p>
//                   </div>
//                   <FileInput {...register("file", { required: true })}
//                     accept='.csv'
//                     id="dropzone-file" className="hidden"
//                     aria-invalid={errors.resume_file ? "true" : "false"}
//                   />
//                 </Label>

//               </div>
//               {errors.file?.type === "required" && (
//                 <p className="text-red-700 text-sm" role="alert">
//                   Please upload csv
//                 </p>
//               )}
//               <div className='lg:flex gap-4 mt-3'>
//                 <button type='button' onClick={handleDownload} class="bg-[#F0F0F0] hover:bg-[#383737] cursor-pointer px-10 text-[15px] leading-[45px] text-[#383737] hover:text-[#ffffff] font-semibold w-full text-center rounded-[7px] flex gap-2 items-center mb-2 lg:mb-0"><BiImport className="text-[24px]" /> Download Sample CSV</button>
//                 <button class="bg-[#F6EFFF] hover:bg-[#800080] cursor-pointer px-10 text-[15px] leading-[45px] text-[#800080] hover:text-[#F6EFFF] font-semibold w-full text-center rounded-[7px]">{loading_for_csv || loading ? "Waiting..." : "Invite Students"}</button>
//               </div>
//             </div>
//           </form>
//         </div>
//         <div className='lg:w-6/12'>
//           <form onSubmit={handleSubmit1(onSubmitManual)}>
//             <div className=''>

//               <div>
//                 <div className="mb-4 flex items-center justify-between">
//                   <h4 className="text-[16px] lg:text-[20px] text-[#151515] font-semibold pb-1">
//                     Invite students manually
//                   </h4>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       append({ name: "", email: "", phone: "", resume_count: "" })
//                     }
//                     className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[32px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
//                   >
//                     <BsFillPlusCircleFill className="text-sm" /> Add Another Student
//                   </button>
//                 </div>

//                 {/* Loop through students */}
//                 {fields.map((field, index) => (
//                   <div
//                     key={field.id}
//                     className="resume_form_area  p-4 rounded mb-4 relative"
//                   >
//                     {/* Student Name */}
//                     <div className="resume_form_box mb-3">
//                       <Label>Student Name <span>*</span></Label>
//                       <div className="field_box flex items-center">
//                         <div className="p-3">
//                           <BiSolidUser className="text-[#928F8F]" />
//                         </div>
//                         <TextInput
//                           {...register1(`students.${index}.name`, {
//                             required: "Name is Required",
//                           })}
//                           type="text"
//                           placeholder="Student Name"
//                         />
//                       </div>
//                       {errors1?.students?.[index]?.name && (
//                         <span className="text-red-500">
//                           {errors1.students[index].name.message}
//                         </span>
//                       )}
//                     </div>

//                     {/* Email + Phone */}
//                     <div className="lg:flex gap-4 mb-3">
//                       <div className="lg:w-6/12 resume_form_box">
//                         <Label>Email <span>*</span></Label>
//                         <div className="field_box flex items-center">
//                           <div className="p-3">
//                             <MdEmail className="text-[#928F8F]" />
//                           </div>
//                           <TextInput
//                             {...register1(`students.${index}.email`, {
//                               required: "Email is required",
//                             })}
//                             type="email"
//                             placeholder="Enter student email"
//                           />
//                         </div>
//                         {errors1?.students?.[index]?.email && (
//                           <span className="text-red-500">
//                             {errors1.students[index].email.message}
//                           </span>
//                         )}
//                       </div>

//                       <div className="lg:w-6/12 resume_form_box">
//                         <Label>Phone <span>*</span></Label>
//                         <div className="field_box flex items-center">
//                           <div className="p-3">
//                             <BiSolidPhone className="text-[#928F8F]" />
//                           </div>
//                           <TextInput
//                             {...register1(`students.${index}.phone`, {
//                               required: "Phone is required",
//                             })}
//                             type="text"
//                             placeholder="+91-5362563762"
//                           />
//                         </div>
//                         {errors1?.students?.[index]?.phone && (
//                           <span className="text-red-500">
//                             {errors1.students[index].phone.message}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Resume Count */}
//                     <div className="resume_form_box">
//                       <Label>Resumes Assigned <span>*</span></Label>
//                       <div className="field_box flex items-center">
//                         <div className="p-3">
//                           <HiDocumentText className="text-[#928F8F]" />
//                         </div>
//                         <TextInput
//                           {...register1(`students.${index}.resume_count`, {
//                             required: "Resume Count is required",
//                             valueAsNumber: true,
//                             max: { value: 100, message: "Value cannot be greater than 100" },
//                           })}
//                           type="number"
//                           placeholder="Max 100"
//                         />
//                       </div>
//                       {errors1?.students?.[index]?.resume_count && (
//                         <span className="text-red-500">
//                           {errors1.students[index].resume_count.message}
//                         </span>
//                       )}
//                     </div>

//                     {/* Delete button */}
//                     {fields.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => remove(index)}
//                         className="absolute top-2 right-2 text-red-500 hover:text-black"
//                       >
//                         <MdOutlineDelete className="text-xl" />
//                       </button>
//                     )}
//                   </div>
//                 ))}

//                 {/* Single Add Student button */}
//                 <button
//                   type="submit"
//                   className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]"
//                 >
//                   {loading_for_manual || loading ? "Waiting..." : "Add Student"}
//                 </button>
//               </div>



//             </div>
//           </form>
//         </div>
//       </div>
//       <StudentList />
//     </div>
//   )
// }

// export default page


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
import { invitedStudentsList, inviteStudents, inviteStudentsMannually, saveInvitedStudent } from '../reducers/InviteSlice';
import { toast, ToastContainer } from 'react-toastify';
import StudentList from './StudentList';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

// ─── Resume type config ───────────────────────────────────────────────────────
const RESUME_TYPE_CONFIG = [
  {
    key: 'improve',
    label: 'Improve Existing Resume',
    icon: <HiDocumentText className="text-purple-500 text-lg" />,
    color: 'purple',
    subscriptionKey: 'imp_count',
  },
  {
    key: 'linkdin',
    label: 'LinkedIn Rewrite',
    icon: <BiLogoLinkedinSquare className="text-blue-500 text-lg" />,
    color: 'blue',
    subscriptionKey: 'link_count',
  },
]

// ─── Counter field component ──────────────────────────────────────────────────
const CounterField = ({ label, icon, color, fieldKey, index, register1, errors1, watch1, setValue1 }) => {
  const fieldName = `students.${index}.${fieldKey}`
  const currentVal = Number(watch1(fieldName)) || 0

  const increment = () => {
    if (currentVal < 100) setValue1(fieldName, currentVal + 1)
  }
  const decrement = () => {
    if (currentVal > 0) setValue1(fieldName, currentVal - 1)
  }

  const colorMap = {
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', btn: 'bg-purple-100 hover:bg-purple-200 text-purple-700', text: 'text-purple-700', badge: 'bg-purple-100' },
    blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   btn: 'bg-blue-100 hover:bg-blue-200 text-blue-700',     text: 'text-blue-700',   badge: 'bg-blue-100'   },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', btn: 'bg-orange-100 hover:bg-orange-200 text-orange-700', text: 'text-orange-700', badge: 'bg-orange-100' },
    green:  { bg: 'bg-green-50',  border: 'border-green-200',  btn: 'bg-green-100 hover:bg-green-200 text-green-700',  text: 'text-green-700',  badge: 'bg-green-100'  },
  }
  const c = colorMap[color] || colorMap.purple

  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} p-3`}>
      {/* Label row */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm flex-shrink-0">
          {icon}
        </div>
        <span className={`text-xs font-semibold ${c.text} leading-tight`}>{label}</span>
      </div>

      {/* Counter row */}
      <div className="flex items-center gap-2">
        {/* Decrement */}
        <button
          type="button"
          onClick={decrement}
          disabled={currentVal === 0}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition ${c.btn} disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0`}
        >
          −
        </button>

        {/* Manual input */}
        <input
          type="number"
          min={0}
          max={100}
          {...register1(fieldName, {
            valueAsNumber: true,
            min: { value: 0, message: 'Min 0' },
            max: { value: 100, message: 'Max 100' },
          })}
          className={`w-full text-center text-sm font-bold border ${c.border} rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-offset-0 bg-white ${c.text}`}
          style={{ MozAppearance: 'textfield' }}
        />

        {/* Increment */}
        <button
          type="button"
          onClick={increment}
          disabled={currentVal >= 100}
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition ${c.btn} disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0`}
        >
          +
        </button>
      </div>

      {/* Max label */}
      <p className="text-[10px] text-gray-400 text-center mt-1.5">Max 100</p>

      {errors1?.students?.[index]?.[fieldKey] && (
        <p className="text-red-500 text-xs mt-1">{errors1.students[index][fieldKey].message}</p>
      )}
    </div>
  )
}

// ─── Dynamic quota section ────────────────────────────────────────────────────
const ResumeQuotaFields = ({ index, register1, errors1, watch1, setValue1, activeTypes }) => {
  if (!activeTypes || activeTypes.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
        <p className="text-xs text-gray-400">No active subscription found to assign resume types.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        Resume Quota
        <span className="text-gray-400 font-normal normal-case ml-1">(set 0 if not needed)</span>
      </p>
      <div className={`grid gap-2 ${activeTypes.length === 1 ? 'grid-cols-1' : activeTypes.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
        {activeTypes.map((type) => (
          <CounterField
            key={type.key}
            label={type.label}
            icon={type.icon}
            color={type.color}
            fieldKey={type.key}
            index={index}
            register1={register1}
            errors1={errors1}
            watch1={watch1}
            setValue1={setValue1}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const page = () => {
  const { loading_for_csv, loading_for_manual, loading } = useSelector((state) => state?.inviteStd)
  const { currentSubscriptionData } = useSelector((state) => state?.planst)
  const dispatch = useDispatch()

  // Determine which resume types are active in current subscription
  const activeTypes = React.useMemo(() => {
    if (!currentSubscriptionData?.data || !Array.isArray(currentSubscriptionData.data)) {
      // fallback: show all types if no subscription data
      return RESUME_TYPE_CONFIG
    }

    // Aggregate counts across all active subscriptions
    const totals = { imp_count: 0, link_count: 0, jd_count: 0, scratch_count: 0 }
    currentSubscriptionData.data.forEach((sub) => {
      if (sub.status === 1) {
        totals.imp_count    += sub.imp_count    || 0
        totals.link_count   += sub.link_count   || 0
        totals.jd_count     += sub.jd_count     || 0
        totals.scratch_count += sub.scratch_count || 0
      }
    })

    // Only show types that have quota > 0
    const active = RESUME_TYPE_CONFIG.filter((t) => totals[t.subscriptionKey] > 0)
    // If none active (e.g. fresh/no quota), show all so admin can still assign
    return active.length > 0 ? active : RESUME_TYPE_CONFIG
  }, [currentSubscriptionData])

  const emptyStudent = () => ({
    name: '', email: '', phone: '', improve: 0, linkdin: 0,
  })

  const handleDownload = async () => {
    try {
      const response = await serverApi.get("/api/usercsv/download", { responseType: "blob" })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const a = document.createElement("a")
      a.href = url
      a.download = "sample.csv"
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading file:", error)
    }
  }

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm()

  const {
    register: register1,
    handleSubmit: handleSubmit1,
    control,
    reset: reset1,
    watch: watch1,
    setValue: setValue1,
    formState: { errors: errors1 },
  } = useForm({ defaultValues: { students: [emptyStudent()] } })

  const { fields, append, remove } = useFieldArray({ control, name: "students" })

  const csvFile = watch("file")

  const onSubmit = (data) => {
    const formData = new FormData()
    if (data.file && data.file[0]) {
      formData.append("csv", data.file[0])
    } else {
      toast.error("Please select a resume file to upload")
      return
    }
    dispatch(inviteStudents(formData)).then((res) => {
      if (res?.payload?.response?.data?.status_code === 422) {
        toast.error(res?.payload?.response?.data?.message)
      } else if (res?.payload?.status_code === 200) {
        dispatch(invitedStudentsList({ page: 1, limit: 10 }))
        toast.success(res?.payload?.message)
      }
    })
  }

  const onSubmitManual = (data) => {
    for (const student of data.students) {
      const payload = {
        name:    student.name,
        email:   student.email,
        phone:   student.phone,
        improve: Number(student.improve) || 0,
        linkdin: Number(student.linkdin) || 0,
      }

      dispatch(inviteStudentsMannually(payload)).then((res) => {
        if (res?.payload?.response?.data?.status_code === 422) {
          toast.error(res?.payload?.response?.data?.message)
        } else if (res?.payload?.status_code === 201) {
          toast.success(res?.payload?.message)
          dispatch(invitedStudentsList({ page: 1, limit: 10 }))
        }
      })
    }
    // Reset only the quota fields (improve, linkdin) to 0, keep name/email/phone
    const currentVals = data.students.map((s) => ({
      name:    s.name,
      email:   s.email,
      phone:   s.phone,
      improve: 0,
      linkdin: 0,
    }))
    reset1({ students: currentVals })
  }

  // Listen for fill-form event from StudentList floating bar
  useEffect(() => {
    const handler = (e) => {
      const selectedStudents = e.detail || []
      if (selectedStudents.length === 0) return
      const newStudents = selectedStudents.map((s) => ({
        name:    s?.user?.fullname || '',
        email:   s?.user?.email   || '',
        phone:   s?.user?.phone   || '',
        improve: 0,
        linkdin: 0,
      }))
      reset1({ students: newStudents })
      // Scroll to manual form
      setTimeout(() => {
        document.getElementById('manual-invite-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
    window.addEventListener('fill-invite-form', handler)
    return () => window.removeEventListener('fill-invite-form', handler)
  }, [reset1])

  useEffect(() => {
    if (csvFile && csvFile[0]) {
      console.log("Resume file selected:", csvFile[0])
    }
  }, [csvFile])

  return (
    <div className={`${inter.className} antialiased pb-8`}>
      <ToastContainer />
      <div className='mb-5 lg:mb-10 pt-6 px-5'>
        <h2 className='text-xl lg:text-[30px] leading-[30px] text-[#151515] font-semibold mb-1 lg:mb-4'>Invite Students</h2>
        <p className='text-sm leading-[18px] lg:text-[16px] lg:leading-[23px] text-[#575757] font-normal mb-0'>
          Easily invite and manage student profiles with seamless Excel upload or manual entry.
        </p>
      </div>

      <div className='bg-white rounded-[10px] p-5 lg:p-10 lg:flex gap-6 mb-5'>

        {/* ── CSV Upload ── */}
        <div className='lg:w-6/12 mb-4 lg:mb-0'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-0'>
              <h4 className='text-[20px] text-[#151515] font-semibold pb-5'>Invite students through CSV.</h4>
              <div className="flex w-full items-center justify-center">
                <Label
                  htmlFor="dropzone-file"
                  className="resume_upload_box_small2 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <BsFiletypeCsv className="text-[70px] text-[#23A566]" />
                    <p className="my-2 text-xl text-[#000000]">
                      {csvFile && csvFile[0] ? csvFile[0].name : "Select a CSV file to import"}
                    </p>
                    <p className='text-[#A4A4A4] text-base'>or drag and drop it here</p>
                  </div>
                  <FileInput
                    {...register("file", { required: true })}
                    accept='.csv'
                    id="dropzone-file"
                    className="hidden"
                    aria-invalid={errors.resume_file ? "true" : "false"}
                  />
                </Label>
              </div>
              {errors.file?.type === "required" && (
                <p className="text-red-700 text-sm" role="alert">Please upload csv</p>
              )}
              <div className='lg:flex gap-4 mt-3'>
                <button
                  type='button'
                  onClick={handleDownload}
                  className="bg-[#F0F0F0] hover:bg-[#383737] cursor-pointer px-10 text-[15px] leading-[45px] text-[#383737] hover:text-[#ffffff] font-semibold w-full text-center rounded-[7px] flex gap-2 items-center mb-2 lg:mb-0"
                >
                  <BiImport className="text-[24px]" /> Download Sample CSV
                </button>
                <button className="bg-[#F6EFFF] hover:bg-[#800080] cursor-pointer px-10 text-[15px] leading-[45px] text-[#800080] hover:text-[#F6EFFF] font-semibold w-full text-center rounded-[7px]">
                  {loading_for_csv || loading ? "Waiting..." : "Invite Students"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ── Manual Invite ── */}
        <div className='lg:w-6/12' id="manual-invite-form">
          <form onSubmit={handleSubmit1(onSubmitManual)}>
            <div>
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-[16px] lg:text-[20px] text-[#151515] font-semibold pb-1">
                  Invite students manually
                </h4>
                <button
                  type="button"
                  onClick={() => append(emptyStudent())}
                  className="bg-[#F6EFFF] hover:bg-[#800080] rounded-[7px] text-[10px] leading-[32px] text-[#92278F] hover:text-[#ffffff] font-medium cursor-pointer px-2 flex items-center gap-1"
                >
                  <BsFillPlusCircleFill className="text-sm" /> Add Another Student
                </button>
              </div>

              {/* Student fields loop */}
              {fields.map((field, index) => (
                <div key={field.id} className="resume_form_area p-4 rounded-xl border border-gray-100 bg-gray-50/50 mb-4 relative">

                  {/* Student index label */}
                  {fields.length > 1 && (
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Student {index + 1}
                    </p>
                  )}

                  {/* Name */}
                  <div className="resume_form_box mb-3">
                    <Label>Student Name <span>*</span></Label>
                    <div className="field_box flex items-center">
                      <div className="p-3"><BiSolidUser className="text-[#928F8F]" /></div>
                      <TextInput
                        {...register1(`students.${index}.name`, { required: "Name is Required" })}
                        type="text"
                        placeholder="Student Name"
                      />
                    </div>
                    {errors1?.students?.[index]?.name && (
                      <span className="text-red-500 text-xs">{errors1.students[index].name.message}</span>
                    )}
                  </div>

                  {/* Email + Phone */}
                  <div className="lg:flex gap-4 mb-3">
                    <div className="lg:w-6/12 resume_form_box mb-2 lg:mb-0">
                      <Label>Email <span>*</span></Label>
                      <div className="field_box flex items-center">
                        <div className="p-3"><MdEmail className="text-[#928F8F]" /></div>
                        <TextInput
                          {...register1(`students.${index}.email`, { required: "Email is required" })}
                          type="email"
                          placeholder="Enter student email"
                        />
                      </div>
                      {errors1?.students?.[index]?.email && (
                        <span className="text-red-500 text-xs">{errors1.students[index].email.message}</span>
                      )}
                    </div>
                    <div className="lg:w-6/12 resume_form_box">
                      <Label>Phone <span>*</span></Label>
                      <div className="field_box flex items-center">
                        <div className="p-3"><BiSolidPhone className="text-[#928F8F]" /></div>
                        <TextInput
                          {...register1(`students.${index}.phone`, { required: "Phone is required" })}
                          type="text"
                          placeholder="+91-9876543210"
                        />
                      </div>
                      {errors1?.students?.[index]?.phone && (
                        <span className="text-red-500 text-xs">{errors1.students[index].phone.message}</span>
                      )}
                    </div>
                  </div>

                  {/* ── Dynamic Resume Quota Fields ── */}
                  <ResumeQuotaFields
                    index={index}
                    register1={register1}
                    errors1={errors1}
                    watch1={watch1}
                    setValue1={setValue1}
                    activeTypes={activeTypes}
                  />

                  {/* Delete button */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition"
                    >
                      <MdOutlineDelete className="text-base" />
                    </button>
                  )}
                </div>
              ))}

              {/* Submit */}
              <button
                type="submit"
                className="bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-white font-semibold w-full text-center rounded-[7px] transition"
              >
                {loading_for_manual || loading ? "Waiting..." : "Add Student"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <StudentList />
    </div>
  )
}

export default page