'use client';

import { Button, Modal, ModalBody, ModalFooter, ModalHeader, FileInput, Label, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResumeHistory } from "../reducers/ResumeHistorySlice";
import { CgFileDocument } from "react-icons/cg";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { convertToSubmitFormat } from "../utils/DateSubmitFormatter";
import { MdOutlinePreview } from "react-icons/md";
import { applyJobs } from "../reducers/FeatureJobSlice";
import { toast } from "react-toastify";

const ApplyJobModal=({openJobApplyModal,
          setOpenJobApplyModal,id})=>{
             const{rHistory,loading}=useSelector((state)=>state?.resHist)
  const dispatch=useDispatch()
    const [totalPage, setTotalPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [statusFlag, setStatusFlag] = useState("all");
  const [sortByName, setSortByName] = useState(false);

  
    useEffect(()=>{
      const payload = {
      page: currentPage,
      limit: limit,
      
    };

  dispatch(getResumeHistory(payload)).then((res)=>{
    console.log(res,"histRes");
    const total=res?.payload?.pagination?.total_pages
    setTotalPage(Number.isInteger(total) && total > 0 ? total : 1)
  })
    },[currentPage,limit])

     const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleApplyJobs=(resumeId,type)=>{
    dispatch(applyJobs({
        job_id:id,
        resume_id:resumeId,
        ref_table:type
    })).then((res)=>{
        console.log("resJob",res);
        if(res?.payload?.status_code===201){
            toast.success(res?.payload?.message)
        }
        else{
            toast.error("Something went wrong")
        }
    })
  }

    return(
        <>
         <Modal size="7xl" className="apply_modal_area" show={openJobApplyModal} onClose={() => setOpenJobApplyModal(false)}>   
                <ModalHeader className='bg-white text-black modal_header'>
                   Select Resume
                </ModalHeader>
                <ModalBody className='bg-white p-0 rounded-b-[4px]'>
                    {/* <div className="lg:flex gap-5 p-5">
                        <div className='lg:w-6/12 border border-[#DADADA] rounded-[7px] p-4 pr-0 mb-4 lg:mb-0'>
                            <h3 className="text-[#151515] text-base font-medium pb-4">Select resume from the list</h3>
                              <ul className='grid grid-cols-2 gap-5 resume_list_area'>
                                 <li>
                                    <input type="radio" name="test" id="cb1" />
                                    <label for="cb1" className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-2'>
                                       <Image src={resume01} alt="resume01" className='' />
                                    </label>
                                    <p className='text-[#000000] text-base font-semibold text-center pt-1'>Modern Template</p>
                                 </li>
                                 <li>
                                    <input type="radio" name="test" id="cb2" />
                                    <label for="cb2" className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-2'>
                                       <Image src={resume01} alt="resume01" className='' />
                                    </label>
                                     <p className='text-[#000000] text-base font-semibold text-center'>Professional Template</p>
                                 </li>
                                 <li>
                                    <input type="radio" name="test" id="cb3" />
                                    <label for="cb3" className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-2'>
                                       <Image src={resume01} alt="resume01" className='' />
                                    </label>
                                     <p className='text-[#000000] text-base font-semibold text-center'>Technical Template</p>
                                 </li>
                                 <li>
                                    <input type="radio" name="test" id="cb4" />
                                    <label for="cb4" className='bg-white border border-[#D5D5D5] p-4 rounded-[8px] mb-2'>
                                       <Image src={resume01} alt="resume01" className='' />
                                    </label>
                                    <p className='text-[#000000] text-base font-semibold text-center'>Modern Template</p>
                                 </li>
                              </ul>
                        </div>
                        <div className='lg:w-6/12'>
                            <div className="flex w-full items-center justify-center">
                              <Label
                              htmlFor="dropzone-file"
                              className="resume_upload_box flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                              >
                              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                 <BiImport className="text-[40px] lg:text-[100px] text-[#92278F]" />
                                 <p className="mb-2 text-base lg:text-xl text-[#92278F]">
                                    Upload your resume
                                 </p>
                              </div>
                              <FileInput id="dropzone-file" className="hidden" />
                              </Label>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 inset-shadow-xs">
                       <button onClick={() => setOpenJobApplyModal(true)} className='bg-[#800080] hover:bg-[#151515] cursor-pointer px-10 text-[15px] leading-[45px] text-[#ffffff] font-semibold w-full text-center rounded-[7px]'>Apply Job</button>
                    </div> */}

                     <div className='border bg-white border-[#D5D5D5] rounded-[10px]'>
                            <div className='lg:px-8 px-4 py-8'>
                               <p className='text-[#151515] text-[20px] leading-[20px] lg:mb-4'>Your Resumes ({rHistory?.statistics?.total_resume})</p>
                            </div>
                            <div className='lg:px-8 px-4 py-0'>
                              {
                                rHistory?.data?.map((hist)=>(
                                  <div className='lg:flex justify-between items-center bg-white border-[#d9d9d9] rounded-[10px] mb-12'>
                                  <div className='lg:flex gap-3 items-center'>
                                    <div className='bg-[#9C9C9C] rounded-[10px] w-[55px] h-[55px] flex justify-center items-center mb-2 lg:mb-0'>
                                      <CgFileDocument className='text-[#ffffff] text-2xl' />
                                    </div>
                                    <div className='mb-2 lg:mb-0'>
                                      <h3 className='text-[#151515] text-base font-medium mb-1'>{hist?.resume_name}</h3>
                                      <div className='lg:flex items-center'>
                                        {/* <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>Template: Modern</p> */}
                                        {/* <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>{Math.floor(
                        (new Date() - new Date(convertToSubmitFormat(hist?.created_at))) / (1000 * 60 * 60 * 24)
                      )}{" "} Days ago</p> */}
                    
                                          <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>
                                          {(() => {
                                            const days = Math.floor(
                                              (new Date() - new Date(convertToSubmitFormat(hist?.created_at))) /
                                              (1000 * 60 * 60 * 24)
                                            );
                                            return days === 0 ? "Today" : `${days} Days ago`;
                                          })()}
                                        </p>
                    
                                        {/* <p className='text-[#7D7D7D] text-[13px] pr-8 software_point'>257 KB</p>
                                        <p className='text-[#7D7D7D] text-[13px] pr-8'>After analysis ATS Score: 80/100</p> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className='flex items-center gap-4 lg:gap-8'>
                    <button onClick={()=>handleApplyJobs(hist?.id,hist?.resume_type)} className={`text-[15px] bg-[#ae2991] text-white rounded-3xl px-5 py-2 cursor-pointer`}>
                      {loading?"Waiting..":"Apply"}  

                    </button>
                                   
                                
                    
                              
                                  </div>
                              </div>
                    
                                ))
                              }
                              
                            </div>
                            {
                            
                              
                              rHistory?.pagination?.total_pages>1&&(
                                 <div className="flex justify-center items-center mt-4 pagination_sec">
                                    <Pagination
                                      layout="pagination"
                                      currentPage={currentPage}
                                      totalPages={totalPage}
                                      onPageChange={onPageChange}
                                      previousLabel=""
                                      nextLabel=""
                                      showIcons
                                    />
                                    </div>
                              )
                              
                            }
                                 
                          </div>
                </ModalBody>
          </Modal>
        </>
    )
}
export default ApplyJobModal