'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Inter } from 'next/font/google';

import resume01 from "../assets/imagesource/resume01.png";
import hiring_icon from "../assets/imagesource/hiring_icon.png";
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getFeatureJob } from '../reducers/FeatureJobSlice';
import striptags from 'striptags';
import { Pagination } from 'flowbite-react';
import { useRouter } from 'next/navigation';


const inter = Inter({
  subsets: ['latin'], // or ['latin-ext'] etc.
  weight: ['400', '500', '600', '700'], // specify desired weights
  variable: '--font-inter', // optional, for Tailwind usage
})

const page = () => {
  const{jobs}=useSelector((state)=>state?.featJob)
  const dispatch=useDispatch()
    const router=useRouter()
   const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(()=>{
    dispatch(getFeatureJob({page:currentPage,limit:limit})).then((res)=>{
      const total=res?.payload?.pagination?.total_pages
      setTotalPage(Number.isInteger(total) && total > 0 ? total : 1)
    })
  },[currentPage,limit])
  console.log("jobs",jobs);

    const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleDetails=(id)=>{
  //    const encodedId = btoa(id.toString()); 
  //    router.push(`/featured-jobs-details?id=${encodedId}`);
  // }
  
  return (
     <div className={`${inter.className} antialiased`}>
      <div className='mb-5 lg:mb-10 pt-6'>
        <h2 className='text-xl lg:text-[30px] leading-[30px] text-[#151515] font-semibold mb-1 lg:mb-4'>Featured Jobs</h2>
        <p className='text-sm leading-[18px] lg:text-[16px] lg:leading-[23px] text-[#575757] font-normal mb-0'>Discover roles that match your skills and goals.</p>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8'>
        {
          jobs?.data?.map((ftJobs)=>(
          <div className='bg-[#FFFFFF] rounded-[10px] px-8 py-8 shadow-lg'>
          <Image src={hiring_icon} alt="hiring_icon" className='mb-4' />
          <h3 className='text-[#560654] text-[20px] font-semibold pb-2'>{ftJobs?.job_role}</h3>
          <p className='text-[#6C6C6C] text-[15px] leading-[22px] pb-4'>{striptags(ftJobs?.job_description)}</p>
          <Link className='bg-[#800080] hover:bg-[#151515] text-[15px] leading-[45px] text-[#ffffff] font-semibold block text-center rounded-[7px]' href={{pathname:"/featured-jobs-details",query:{id:btoa(ftJobs?.id)}}} >Read More</Link>
        </div>
          ))
        }
      
        {/* <div className='bg-[#FFFFFF] rounded-[10px] px-8 py-8 shadow-lg'>
          <Image src={hiring_icon} alt="hiring_icon" className='mb-4' />
          <h3 className='text-[#560654] text-[20px] font-semibold pb-2'>Sales Manager</h3>
          <p className='text-[#6C6C6C] text-[15px] leading-[22px] pb-4'>We are looking for a dynamic Sales Manager to lead our sales team and drive revenue growth. The role involves developing sales strategies..</p>
          <Link className='bg-[#800080] hover:bg-[#151515] text-[15px] leading-[45px] text-[#ffffff] font-semibold block text-center rounded-[7px]' href="/" passHref>Read More</Link>
        </div>
        <div className='bg-[#FFFFFF] rounded-[10px] px-8 py-8 shadow-lg'>
          <Image src={hiring_icon} alt="hiring_icon" className='mb-4' />
          <h3 className='text-[#560654] text-[20px] font-semibold pb-2'>Sales Manager</h3>
          <p className='text-[#6C6C6C] text-[15px] leading-[22px] pb-4'>We are looking for a dynamic Sales Manager to lead our sales team and drive revenue growth. The role involves developing sales strategies..</p>
          <Link className='bg-[#800080] hover:bg-[#151515] text-[15px] leading-[45px] text-[#ffffff] font-semibold block text-center rounded-[7px]' href="/" passHref>Read More</Link>
        </div> */}
      </div>
      {
          jobs?.pagination?.total_pages>1&&(
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
  )
}

export default page