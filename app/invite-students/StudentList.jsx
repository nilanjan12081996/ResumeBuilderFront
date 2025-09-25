import { Checkbox, Pagination, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from "flowbite-react"
import { useEffect, useState } from "react"
import { AiOutlineEdit } from "react-icons/ai"
import { BiFilter } from "react-icons/bi"
import { MdOutlineDelete } from "react-icons/md"
import { RiSearchLine } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { invitedStudentsList } from "../reducers/InviteSlice"
import { convertToSubmitFormat } from "../utils/DateSubmitFormatter"

const StudentList=()=>{
    const{studentsData}=useSelector((state)=>state?.inviteStd)
    const dispatch=useDispatch()
       const [totalPage, setTotalPage] = useState(1);
      const [limit, setLimit] = useState(10);
      const [currentPage, setCurrentPage] = useState(1);
         const onPageChange = (page) => {
    setCurrentPage(page);
  };
    useEffect(()=>{
        dispatch(invitedStudentsList({
            page:currentPage,
            limit:limit
        })).then((res)=>{
            console.log("inviteRes",res);
            const total=res?.payload?.page
            setTotalPage(Number.isInteger(total) && total > 0 ? total : 1)
            
        })
},[currentPage,limit])
console.log("studentsData",studentsData);

    return(
        <>
                <div className='bg-white rounded-[10px] p-5 lg:p-10'>
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
                                        <TableHeadCell className='bg-[#f0f0f0]'>Last Date </TableHeadCell>
                                        <TableHeadCell className='bg-[#f0f0f0]'>Mobile No</TableHeadCell>
                                        <TableHeadCell className='bg-[#f0f0f0]'>Email ID</TableHeadCell>
                                        <TableHeadCell className='bg-[#f0f0f0]'>Number of Resume</TableHeadCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="divide-y">
                                    {
                                        studentsData?.data?.map((stds)=>(
                                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <TableCell className="p-4 bg-[#ffffff] border-b border-[#f0f0f0]">
                                           <Checkbox />
                                        </TableCell>
                                        <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{stds?.user?.fullname}</TableCell>
                                        <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{convertToSubmitFormat(stds?.last_date)}</TableCell>
                                        <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{stds?.user?.phone}</TableCell>
                                        <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{stds?.user?.email}</TableCell>
                                        <TableCell className="bg-[#ffffff] border-b border-[#f0f0f0]">{stds?.resume_access}</TableCell>
                                        {/* <TableCell className='flex items-center gap-6 bg-[#ffffff] border-b border-[#f0f0f0] pb-[20px]'>

                                            <button className='text-[#4E7FFF] hover:text-black cursor-pointer'><AiOutlineEdit className='text-2xl' /></button>
                                            <button className='text-[#FF4B4B] hover:text-black cursor-pointer'><MdOutlineDelete className='text-2xl' /></button>
                                        </TableCell> */}
                                    </TableRow>
                                        ))
                                    }
                                    
                                 
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    {
                        studentsData?.page>1&&(
                            <>
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
                            </>
                        )
                    }
                  
                </div>
        </>
    )
}
export default StudentList