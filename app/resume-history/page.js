'use client';

import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { getResumeHistory } from '../reducers/ResumeHistorySlice';
import { convertToSubmitFormat } from '../utils/DateSubmitFormatter';
import Link from "next/link";
import Loader from '../ui/Loader';
import ScratchResumeModal from '../previewmodal/ScratchResumeModal';
import { CgFileDocument } from 'react-icons/cg';
import { BiEdit } from "react-icons/bi";
import { MdOutlinePreview } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { FaArrowUpWideShort } from "react-icons/fa6";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

// ── Type config ──
const TYPE_CONFIG = {
  scratch_resume: {
    label: "Scratch Resume",
    bgIcon: "#DBFCE7", iconColor: "#00A63E",
    badgeBg: "#DBFCE7", badgeColor: "#3B6D11",
  },
  improve: {
    label: "Improve Existing Resume",
    bgIcon: "#DBEAFE", iconColor: "#2B7FFF",
    badgeBg: "#DBEAFE", badgeColor: "#185FA5",
  },
  jd: {
    label: "JD Based Resume",
    bgIcon: "#FFEDD4", iconColor: "#FF7043",
    badgeBg: "#FFEDD4", badgeColor: "#854F0B",
  },
  linkedin: {
    label: "LinkedIn Rewrite",
    bgIcon: "#EAD9FF", iconColor: "#9747FF",
    badgeBg: "#EAD9FF", badgeColor: "#534AB7",
  },
};

const STATUS_CONFIG = {
  0: { label: "Saved",      bg: "#DBFCE7", color: "#3B6D11" },
  1: { label: "Saved",      bg: "#DBFCE7", color: "#3B6D11" }, // Draft → Saved
  2: { label: "Downloaded", bg: "#E6F1FB", color: "#185FA5" },
};
const page = () => {
  const { rHistory, loading } = useSelector((state) => state?.resHist);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortAsc, setSortAsc] = useState(false);
  const [openScratchModal, setOpenScratchModal] = useState(false);
  const [templateId, setTemplateId] = useState();
  const [resumeId, setResumeId] = useState();

  useEffect(() => {
    dispatch(getResumeHistory());
  }, []);

  // ── Filter + Search + Sort ──
  const filteredData = (rHistory?.data || [])
    .filter((hist) => {
      const type = hist?.data?.resume_type;
      const firstName = hist?.data?.first_name || "";
      const lastName = hist?.data?.last_name || "";
      const jobTarget = hist?.data?.job_target || "";
      const cfg = TYPE_CONFIG[type] || {};

      const matchesType = filterType === "all" || type === filterType;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        cfg.label?.toLowerCase().includes(searchLower) ||
        firstName.toLowerCase().includes(searchLower) ||
        lastName.toLowerCase().includes(searchLower) ||
        jobTarget.toLowerCase().includes(searchLower);

      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
      const nameA = (a?.data?.first_name || "").toLowerCase();
      const nameB = (b?.data?.first_name || "").toLowerCase();
      if (sortAsc) return nameA.localeCompare(nameB);
      return new Date(b.created_at) - new Date(a.created_at);
    });

  const getHref = (hist) => {
    const type = hist?.data?.resume_type;
    const id = hist.id;
    const name = hist?.name;
    if (type === "scratch_resume") return `/resume-builder-edit?id=${id}&fetch=${name}`;
    if (type === "linkedin")       return `/linkedIn-rewrite?id=${id}&fetch=${name}`;
    if (type === "jd")             return `/jd-resume-builder?id=${id}&fetch=${name}`;
    if (type === "improve")        return `/improve-resume-builder?id=${id}&fetch=${name}`;
    return "";
  };

  return (
    <div className={`${inter.className} antialiased p-4`}>

      {/* ── Header ── */}
      <div className='mb-6'>
        <h2 className='text-[26px] leading-[32px] text-[#151515] font-semibold mb-1'>
          Resume History
        </h2>
        <p className='text-[14px] text-[#7D7D7D] font-normal'>
          Manage and organize all your resumes in one place
        </p>
      </div>

      {/* ── Search + Filter Bar ── */}
      <div className='bg-white border border-[#E5E5E5] rounded-[12px] p-4 mb-6'>
        <div className='flex flex-col lg:flex-row gap-3 items-stretch lg:items-center'>

          {/* Search */}
          <div className='flex-1 flex items-center gap-2 bg-[#F5F5F5] rounded-[8px] px-3 py-2'>
            <RiSearchLine className='text-[18px] text-[#AAAAAA] flex-shrink-0' />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by name, job title...'
              className='bg-transparent text-[14px] text-[#151515] placeholder:text-[#AAAAAA] outline-none w-full border-none'
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className='text-[#AAAAAA] hover:text-[#151515] text-[16px] flex-shrink-0'
              >✕</button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className='flex gap-2 flex-wrap'>
            {[
              { key: "all", label: "All" },
              { key: "scratch_resume", label: "Scratch Resume" },
              { key: "improve", label: "Improve Existing" },
              { key: "jd", label: "JD Based" },
              { key: "linkedin", label: "LinkedIn Rewrite" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilterType(tab.key)}
                className={`text-[13px] font-medium px-3 py-[6px] rounded-[8px] border transition-all whitespace-nowrap cursor-pointer
                  ${filterType === tab.key
                    ? "bg-[#800080] text-white border-[#800080]"
                    : "bg-white text-[#575757] border-[#E5E5E5] hover:border-[#800080] hover:text-[#800080]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Button */}
          <button
            onClick={() => setSortAsc((prev) => !prev)}
            title={sortAsc ? "Sorted A→Z" : "Sorted by Latest"}
            className={`flex items-center gap-2 text-[13px] font-medium px-3 py-[6px] rounded-[8px] border transition-all cursor-pointer whitespace-nowrap
              ${sortAsc
                ? "bg-[#800080] text-white border-[#800080]"
                : "bg-white text-[#575757] border-[#E5E5E5] hover:border-[#800080] hover:text-[#800080]"
              }`}
          >
            <FaArrowUpWideShort className='text-[16px]' />
            {sortAsc ? "A → Z" : "Latest"}
          </button>
        </div>
      </div>

      {/* ── Resume List ── */}
      <div className='bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden'>

        {/* List Header */}
        <div className='px-6 py-4 border-b border-[#F0F0F0] flex items-center justify-between'>
          <h3 className='text-[16px] font-medium text-[#151515]'>Your Resumes</h3>
          <span className='text-[13px] text-[#AAAAAA] bg-[#F5F5F5] px-3 py-1 rounded-full'>
            {filteredData.length} {filteredData.length === 1 ? "resume" : "resumes"}
          </span>
        </div>

        {loading ? (
          <div className='py-10'><Loader /></div>
        ) : filteredData.length === 0 ? (
          <div className='py-16 flex flex-col items-center gap-3'>
            <div className='w-[60px] h-[60px] rounded-full bg-[#F5F5F5] flex items-center justify-center'>
              <CgFileDocument className='text-[28px] text-[#CCCCCC]' />
            </div>
            <p className='text-[#AAAAAA] text-[14px]'>No resumes found</p>
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setFilterType("all"); }}
                className='text-[13px] text-[#800080] hover:underline cursor-pointer'
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className='divide-y divide-[#F5F5F5] max-h-[520px] overflow-y-auto'>
            {filteredData.map((hist) => {
              const type = hist?.data?.resume_type;
              const cfg = TYPE_CONFIG[type] || {
                label: hist?.name?.replace(/_/g, " "),
                bgIcon: "#F0F0F0", iconColor: "#888",
                badgeBg: "#F0F0F0", badgeColor: "#555",
              };
              const status = STATUS_CONFIG[hist?.process_status] || STATUS_CONFIG[1];

              const firstName = hist?.data?.first_name || "";
              const lastName = hist?.data?.last_name || "";
              const fullName = [firstName, lastName].filter(Boolean).join(" ");
              const jobTarget = hist?.data?.job_target || "";

              const days = Math.floor(
                (new Date() - new Date(convertToSubmitFormat(hist?.created_at))) / 86400000
              );
              const timeAgo = days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`;

              const href = getHref(hist);

              return (
                <div
                  key={hist.id}
                  className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 px-6 py-4 hover:bg-[#FAFAFA] transition-colors'
                >
                  {/* Left — Icon + Info */}
                  <div className='flex items-center gap-4 flex-1 min-w-0'>
                    <div
                      className='w-[46px] h-[46px] rounded-[10px] flex-shrink-0 flex items-center justify-center'
                      style={{ background: cfg.bgIcon }}
                    >
                      <CgFileDocument className='text-[22px]' style={{ color: cfg.iconColor }} />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <div className='flex items-center gap-2 flex-wrap mb-1'>
                        <h4 className='text-[14px] font-medium text-[#151515] truncate'>
                          {cfg.label}
                          {fullName && <span className='text-[#7D7D7D] font-normal'> — {fullName}</span>}
                        </h4>
                      </div>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <span
                          className='text-[11px] font-medium px-[8px] py-[2px] rounded-full'
                          style={{ background: cfg.badgeBg, color: cfg.badgeColor }}
                        >
                          {cfg.label}
                        </span>
                        {jobTarget && (
                          <>
                            <span className='text-[#D5D5D5] text-[10px]'>·</span>
                            <span className='text-[12px] text-[#7D7D7D] truncate max-w-[220px]'>{jobTarget}</span>
                          </>
                        )}
                        <span className='text-[#D5D5D5] text-[10px]'>·</span>
                        <span className='text-[12px] text-[#AAAAAA]'>{timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right — Status + Actions */}
                  <div className='flex items-center gap-2 flex-shrink-0 lg:ml-4'>
                    <span
                      className='text-[12px] font-medium px-3 py-[4px] rounded-full'
                      style={{ background: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>

                    <Link
                      href={href}
                      className='flex items-center gap-1 text-[13px] font-medium text-[#7D7D7D] hover:text-[#185FA5] bg-white hover:bg-[#E6F1FB] border border-[#E5E5E5] hover:border-[#B5D4F4] px-3 py-[5px] rounded-[8px] transition-all'
                    >
                      <MdOutlinePreview className='text-[15px]' />
                      Preview
                    </Link>

                    <Link
                      href={href}
                      className='flex items-center gap-1 text-[13px] font-medium text-[#7D7D7D] hover:text-[#3B6D11] bg-white hover:bg-[#EAF3DE] border border-[#E5E5E5] hover:border-[#C0DD97] px-3 py-[5px] rounded-[8px] transition-all'
                    >
                      <BiEdit className='text-[15px]' />
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {openScratchModal && (
        <ScratchResumeModal
          openScratchModal={openScratchModal}
          setOpenScratchModal={setOpenScratchModal}
          templateId={templateId}
          resumeId={resumeId}
        />
      )}
    </div>
  );
};

export default page;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import Image from 'next/image';

// import { Inter } from 'next/font/google';

// import resume01 from "../assets/imagesource/resume01.png";

// import { FaArrowUpWideShort } from "react-icons/fa6";
// import { RiSearchLine } from "react-icons/ri";
// import { Pagination, Select, TextInput } from 'flowbite-react';
// import { CgFileDocument } from 'react-icons/cg';
// import { BiDownload } from "react-icons/bi";
// import { RiDraftLine } from "react-icons/ri";
// import { BsSave } from "react-icons/bs";

// import { BiEdit } from "react-icons/bi";
// import { MdOutlinePreview } from "react-icons/md";
// import { MdDataUsage } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';
// import { getResumeHistory } from '../reducers/ResumeHistorySlice';
// import { convertToSubmitFormat } from '../utils/DateSubmitFormatter';
// import Link from "next/link";
// import ScratchResumeModal from '../previewmodal/ScratchResumeModal';
// import Loader from '../ui/Loader';


// const inter = Inter({
//   subsets: ['latin'], // or ['latin-ext'] etc.
//   weight: ['400', '500', '600', '700'], // specify desired weights
//   variable: '--font-inter', // optional, for Tailwind usage
// })

// const page = () => {
//   const { rHistory, loading } = useSelector((state) => state?.resHist)
//   const dispatch = useDispatch()
//   const [totalPage, setTotalPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [typingTimeout, setTypingTimeout] = useState(null);
//   const [statusFlag, setStatusFlag] = useState("all");
//   const [sortByName, setSortByName] = useState(false);
//   const [openScratchModal, setOpenScratchModal] = useState(false)
//   const [openimvModal, setOpenImvModal] = useState(false)
//   const [templateId, setTemplateId] = useState()
//   const [resumeId, setResumeId] = useState()
//   const handleOpenScratchModal = (id, resumeid) => {
//     setOpenScratchModal(true)
//     setTemplateId(id)
//     setResumeId(resumeid)
//   }
//   const handleOpenImvModal = (id, resumeid) => {
//     setOpenImvModal(true)
//     setTemplateId(id)
//     setResumeId(resumeid)
//   }

//   useEffect(() => {
//     //   const payload = {
//     //   page: currentPage,
//     //   limit: limit,
//     //   sortByName: sortByName ? "true" : "false",
//     // };
//     // if (searchQuery && searchQuery.trim() !== "") {
//     //   payload.searchQuery = searchQuery.trim();
//     // }
//     // if (statusFlag && statusFlag !== "all") {
//     //   payload.statusFlag = statusFlag;
//     // }

//     dispatch(getResumeHistory()).then((res) => {
//       console.log(res, "histRes");
//       // const total=res?.payload?.pagination?.total_pages
//       // setTotalPage(Number.isInteger(total) && total > 0 ? total : 1)
//     })
//   }, [])

//   // const onPageChange = (page) => {
//   //   setCurrentPage(page);
//   // };

//   // const handleSearchChange = (e) => {
//   //   const value = e.target.value;
//   //   setSearchQuery(value);

//   //   // Optional: delay API call while user is typing (debounce)
//   //   if (typingTimeout) clearTimeout(typingTimeout);
//   //   setTypingTimeout(
//   //     setTimeout(() => {
//   //       // Trigger new search only if value is not empty or after typing stops
//   //       dispatch(getResumeHistory({ page: 1, limit, searchQuery: value })).then((res) => {
//   //         const total = res?.payload?.pagination?.total_pages;
//   //         setTotalPage(Number.isInteger(total) && total > 0 ? total : 1);
//   //         setCurrentPage(1);
//   //       });
//   //     }, 600) // waits 600ms after typing stops
//   //   );
//   // };

//   //   const handleSearchKeyDown = (e) => {
//   //   if (e.key === "Enter") {
//   //     dispatch(getResumeHistory({ page: 1, limit, searchQuery })).then((res) => {
//   //       const total = res?.payload?.pagination?.total_pages;
//   //       setTotalPage(Number.isInteger(total) && total > 0 ? total : 1);
//   //       setCurrentPage(1);
//   //     });
//   //   }
//   // };
//   console.log("rHistory", rHistory);

//   return (
//     <div className={`${inter.className} antialiased p-4`}>
//       <div className='mb-2 lg:mb-4'>
//         <h2 className='text-xl lg:text-[30px] leading-[30px] text-[#151515] font-semibold mb-1s lg:mb-4'>Resume History</h2>
//         <p className='text-sm leading-[18px] lg:text-[16px] lg:leading-[23px] text-[#575757] font-normal mb-0'>Manage and organize all your resumes in one place</p>
//       </div>
//       <div className='search_section mb-6'>
//         <div className='lg:flex items-center gap-4 border border-[#d5d5d5] bg-white p-4 rounded-[10px]'>
//           <div className='lg:w-10/12 mb-2 lg:mb-0'>
//             <div className='bg-[#F3F4F6] rounded-[8px] flex gap-4 items-center'>
//               <button className='w-[42px] h-[42px] flex justify-center items-center cursor-pointer'><RiSearchLine className='text-xl text-[#999999]' /></button>
//               <TextInput
//                 // value={searchQuery}
//                 // onChange={handleSearchChange}
//                 //  onKeyDown={handleSearchKeyDown}
//                 id="base" type="text" sizing="md" placeholder='Search resume...' className='w-full' />
//             </div>
//           </div>
//           <div className='lg:w-3/12'>
//             <div className='flex justify-center items-center gap-4'>
//               <Select value={statusFlag} onChange={(e) => setStatusFlag(e.target.value)} id="countries" className='w-[80%]'>
//                 <option value="all">All</option>
//                 <option value="saved">Saved</option>
//                 <option value="complete">Complete</option>
//                 <option value="downloaded">Downloaded</option>
//                 <option value="draft">Draft</option>
//               </Select>
//               <button onClick={() => setSortByName((prev) => !prev)}
//                 // className='bg-white hover:bg-[#a635a2] text-black hover:text-white border border-[#D5D5D5] rounded-[8px] w-[42px] h-[42px] flex justify-center items-center cursor-pointer'
//                 className={`${sortByName ? "bg-[#a635a2] text-white" : "bg-white text-black"
//                   } hover:bg-[#a635a2] hover:text-white border border-[#D5D5D5] rounded-[8px] w-[42px] h-[42px] flex justify-center items-center cursor-pointer`}
//               ><FaArrowUpWideShort className='text-2xl' /></button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='mb-6'>
//         <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-4'>
//           <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
//             <div className='flex gap-3 items-center'>
//               <div className='bg-[#D5F1FF] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
//                 <CgFileDocument className='text-[#0993D0] text-3xl' />
//               </div>
//               <div>
//                 <p className='text-[#7D7D7D] text-[15px]'>Total resumes</p>
//                 <h3 className='text-[#151515] text-[22px] font-medium mb-1'>{rHistory?.statistics?.total_resume}</h3>
//               </div>
//             </div>
//           </div>

//           <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
//             <div className='flex gap-3 items-center'>
//               <div className='bg-[#DEFFD5] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
//                 <BiDownload className='text-[#186603] text-2xl' />
//               </div>
//               <div>
//                 <p className='text-[#7D7D7D] text-[15px]'>Total Downloads</p>
//                 <h3 className='text-[#151515] text-[22px] font-medium mb-1'>{rHistory?.statistics?.total_downloaded_resume}</h3>
//               </div>
//             </div>
//           </div>
//           <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
//             <div className='flex gap-3 items-center'>
//               <div className='bg-[#F7FFD5] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
//                 <RiDraftLine className='text-[#AE7100] text-2xl' />
//               </div>
//               <div>
//                 <p className='text-[#7D7D7D] text-[15px]'>Drafts</p>
//                 <h3 className='text-[#151515] text-[22px] font-medium mb-1'>{rHistory?.statistics?.total_draft_resume}</h3>
//               </div>
//             </div>
//           </div>
//           <div className='border bg-white border-[#D5D5D5] rounded-[10px] px-4 py-4'>
//             <div className='flex gap-3 items-center'>
//               <div className='bg-[#EFE3FF] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center'>
//                 <BsSave className='text-[#92278F] text-2xl' />
//               </div>
//               <div>
//                 <p className='text-[#7D7D7D] text-[15px]'>Saved</p>
//                 <h3 className='text-[#151515] text-[22px] font-medium mb-1'>{rHistory?.statistics?.total_saved_resume}</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className='border bg-white border-[#D5D5D5] rounded-[10px]'>
//         <div className='lg:px-8 px-4 py-8'>
//           <p className="text-[#151515] text-[20px] leading-[20px] lg:mb-4">
//             Your Resumes
//             {typeof rHistory?.data?.length === 'number' && (
//               <span className="ml-1">({rHistory.data.length})</span>
//             )}
//           </p>

//         </div>
//         {
//           loading ? (
//             <>
//               <Loader />
//             </> 
//           ) : (
//             <>
//               <div className='lg:px-8 px-4 py-0'>
//                 {
//                   rHistory?.data?.map((hist) => (
//                     <div className='lg:flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] mb-12'>
//                       <div className='lg:flex gap-3 items-center'>
//                         <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center mb-2 lg:mb-0'>
//                           <CgFileDocument className='text-[#ffffff] text-2xl' />
//                         </div>
//                         <div className='mb-2 lg:mb-0'>
//                           <h3 className='text-[#151515] text-base font-medium mb-1'>{hist?.name}</h3>
//                           <div className='lg:flex items-center'>
//                             {/* <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Template: {hist?.template_detail?.[0]?.templete_id==1?"Modern":"Proffessional"}</p> */}
//                             {/* <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>{Math.floor(
//     (new Date() - new Date(convertToSubmitFormat(hist?.created_at))) / (1000 * 60 * 60 * 24)
//   )}{" "} Days ago</p> */}

//                             <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>
//                               {(() => {
//                                 const days = Math.floor(
//                                   (new Date() - new Date(convertToSubmitFormat(hist?.created_at))) /
//                                   (1000 * 60 * 60 * 24)
//                                 );
//                                 return days === 0 ? "Today" : `${days} Days ago`;
//                               })()}
//                             </p>

//                             {/* <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>257 KB</p>
//                     <p className='text-[#7D7D7D] text-[13px] pr-8'>After analysis ATS Score: 80/100</p> */}
//                           </div>
//                         </div>
//                       </div>
//                       <div className='flex items-center gap-4 lg:gap-8'>
//                         <button className={`text-[15px] ${hist?.process_status === 0 ? "text-[#ae2991]" : hist?.process_status === 1 ? "text-[#AE7100]" : "text-[#42AE29]"}  hover:text-[#ffffff] ${hist?.process_status === 0 ? "bg-[#d8bed2]" : hist?.process_status === 1 ? "bg-[#F7FFD5]" : "bg-[#a1bd9b]"}  ${hist?.process_status === 0 ? "hover:bg-[#ae2991]" : hist?.process_status === 1 ? "hover:bg-[#AE7100]" : "hover:bg-[#42AE29]"} rounded-3xl px-5 py-2 cursor-pointer`}>{hist?.process_status === 0 ? "Saved" : hist?.process_status === 1 ? "Draft" : "Downloaded"}</button>
//                         {/* <button
//               onClick={hist?.resume_type==="scratch_resume"?  ()=> handleOpenScratchModal(hist?.template_detail?.[0]?.templete_id,hist.id):hist?.resume_type==="improve_resume"?()=>{handleOpenImvModal(hist?.template_detail?.[0]?.templete_id,hist.id)}:""}
//                 className='text-[15px] text-[#2781E5] hover:text-[#0993D0] cursor-pointer flex items-center'><MdOutlinePreview className='text-xl mr-1' />
//                 Preview
//                 </button> */}
//                         <Link
//                           href={
//                             hist.resume_type === "scratch_resume" ? `/resume-builder-edit?id=${hist.id}&template=${hist?.template_detail?.[0]?.templete_id}`
//                               : hist.resume_type === "linkedin_resume" ? `/linkedIn-rewrite?id=${btoa(hist.id.toString())}`
//                                 : hist.resume_type === "jd_based_resume" ? `/jd-resume-builder?id=${hist.id}&template=${hist?.template_detail?.[0]?.templete_id}`
//                                   : hist.resume_type === "improve_resume" ? `/improve-resume-builder?id=${btoa(hist.id.toString())}&template=${hist?.template_detail?.[0]?.templete_id}` : ""}
//                           className='text-[15px] text-[#2781E5] hover:text-[#0993D0] cursor-pointer flex items-center'><MdOutlinePreview className='text-xl mr-1' />
//                           Preview
//                         </Link>
//                         <Link
//                           href={
//                             hist.name === "scratch_resume" ? `/resume-builder-edit?id=${hist.id}&fetch=${hist?.name}`
//                               : hist.resume_type === "linkedin_resume" ? `/linkedIn-rewrite?id=${btoa(hist.id.toString())}`
//                                 : hist.resume_type === "jd_based_resume" ? `/jd-resume-builder?id=${hist.id}&template=${hist?.template_detail?.[0]?.templete_id}`
//                                   : hist.resume_type === "improve_resume" ? `/improve-resume-builder?id=${btoa(hist.id.toString())}&template=${hist?.template_detail?.[0]?.templete_id}` : ""}
//                           className='text-[15px] text-[#42AE29] hover:text-[#186603] cursor-pointer flex items-center'>
//                           <BiEdit className='text-xl mr-1' />
//                           Edit
//                         </Link>


//                       </div>
//                     </div>

//                   ))
//                 }

//               </div>
//             </>
//           )
//         }

//         {/* {
        
          
//           rHistory?.pagination?.total_pages>1&&(
//              <div className="flex justify-center items-center mt-4 pagination_sec">
//                 <Pagination
//                   layout="pagination"
//                   currentPage={currentPage}
//                   totalPages={totalPage}
//                   onPageChange={onPageChange}
//                   previousLabel=""
//                   nextLabel=""
//                   showIcons
//                 />
//                 </div>
//           )
          
//         } */}

//       </div>
//       {
//         openScratchModal && (
//           <ScratchResumeModal
//             openScratchModal={openScratchModal}
//             setOpenScratchModal={setOpenScratchModal}
//             templateId={templateId}
//             resumeId={resumeId}
//           />
//         )
//       }

//     </div>
//   )
// }

// export default page