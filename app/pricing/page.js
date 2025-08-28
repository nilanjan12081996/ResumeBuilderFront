'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
import Image from 'next/image';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getPlans } from '../reducers/PlanSlice';
import LoginModal from '../modal/LoginModal';

const page = () => {
   const { plans } = useSelector((state) => state?.planst)
   const disptach = useDispatch()
   const [openLoginModal, setOpenLoginModal] = useState(false);
   const hanleloginModal = () => {
      setOpenLoginModal(true)
   }

   useEffect(() => {
      disptach(getPlans())
   }, [])
   return (
      <div>
         <div className='banner_area p-4 lg:p-0'>
            {/* home banner section start here */}
            <div className="home_banner_area relative">
               <Image src={aboutBanner} alt='aboutBanner' className="hidden lg:block" />
               <Image src={bannerImg} alt='bannerImg' className="block lg:hidden" />
               <div className="banner_content_area absolute w-full h-full left-0 top-0">
                  <div className='max-w-6xl mx-auto flex justify-center items-center h-full'>
                     <div className="w-full px-4 pt-14 lg:pt-24 text-center">
                        <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">Pricing</h1>
                        <p className="text-[#4C4B4B] text-sm lg:text-[18px] leading-[24px] mb-5 lg:mb-4">Simple, Transparent Pricing</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Why Choose Us section start here */}
         {/* how in works section start here */}
         {/* Key benefits section start here */}
         <div className="key_benefits_section py-4 px-4 lg:px-0 lg:py-24">
            <div className='max-w-6xl mx-auto'>
               <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5">
                  {
                     plans?.data?.map((plansDatas, index) => {
                        return (
                           <div key={index}>
                              {
                                 index % 2 == 0 ? (
                                    <>
                                       <div className="pt-5" key={index}>
                                          <div className="py-8 px-6">
                                             <h3 className="text-[19px] text-[#1D2127] pb-6 font-medium">{plansDatas?.plan_name}</h3>
                                             <div className="flex items-center gap-2 mb-8">
                                                <p className="text-[#1D2127] text-[36px] leading-[36px] font-extrabold">{plansDatas?.currency} {plansDatas?.price}</p>
                                                <div>
                                                   <p className="text-[#cbced1] text-[12px] leading-[16px]">/month</p>
                                                </div>
                                             </div>
                                             <div className="mb-10">
                                                <div>
                                                   {
                                                      plansDatas?.plan_features?.map((fets, index) => {
                                                         return (
                                                            <div key={index}>
                                                               <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" />{fets}</div>
                                                            </div>
                                                         )
                                                      })
                                                   }

                                                   {/* <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> real-time analysis</div> */}
                                                </div>
                                             </div>
                                             {
                                                plansDatas?.price !== 0 && (
                                                   <div className="mt-[50px]">
                                                      <button onClick={() => { hanleloginModal() }} className="bg-[#EBFFFC] hover:bg-[#055346] text-[#055346] hover:text-[#EBFFFC] text-[16px] leading-[40px] rounded-md w-full block cursor-pointer">Choose Plan</button>
                                                   </div>
                                                )
                                             }

                                          </div>
                                       </div>

                                    </>
                                 ) : (
                                    <>
                                       <div className="most_popular_bg border-[10px] border-[#8ac6b1] rounded-4xl p-4" key={index}>
                                          <div className="">
                                             <div className="pt-2 px-1">
                                                <div className="flex justify-between items-center pb-6">
                                                   <h3 className="text-[15px] text-[#F3F3F3] font-medium">{plansDatas?.plan_name}</h3>
                                                   <div className="text-[12px] font-medium rounded-md leading-[30px] text-[#023F9B] px-4 bg-white">
                                                      Most Popular
                                                   </div>
                                                </div>
                                                <div className="flex items-center gap-2 mb-8">
                                                   <p className="text-[#ffffff] text-[36px] leading-[36px] font-extrabold">{plansDatas?.currency} {plansDatas?.price}</p>
                                                   <div>
                                                      <p className="text-[#F3F3F3] text-[12px] leading-[16px]">/month</p>
                                                   </div>
                                                </div>
                                                <div className="mb-16">
                                                   <div>
                                                      {
                                                         plansDatas?.plan_features?.map((ft, index) => {
                                                            return (
                                                               <div key={index}>
                                                                  <div className="flex gap-1 text-[#F3F3F3] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#52A8CD] text-xl" />{ft}</div>
                                                               </div>
                                                            )
                                                         })
                                                      }

                                                      {/* <div className="flex gap-1 text-[#F3F3F3] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#52A8CD] text-xl" /> real-time analysis</div>
                                                      <div className="flex gap-1 text-[#F3F3F3] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#52A8CD] text-xl" /> priority analysis</div>
                                                      <div className="flex gap-1 text-[#F3F3F3] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#52A8CD] text-xl" /> 10 searches</div> */}
                                                   </div>
                                                </div>
                                                <div>
                                                   <button onClick={() => { hanleloginModal() }} className="bg-[#013859] hover:bg-[#52A8CD] text-[#F3F3F3] hover:text-[#EBFFFC] text-[16px] leading-[40px] rounded-md w-full block cursor-pointer">Choose Plan</button>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </>
                                 )
                              }
                           </div>
                        )
                     })
                  }
                  {/* <div className="pt-5">
                     <div className="py-8 px-6">
                        <h3 className="text-[19px] text-[#1D2127] pb-6 font-medium">Free</h3>
                        <div className="flex items-center gap-2 mb-8">
                           <p className="text-[#1D2127] text-[36px] leading-[36px] font-extrabold">$0</p>
                           <div>
                              <p className="text-[#cbced1] text-[12px] leading-[16px]">/month</p>
                           </div>
                        </div>
                        <div className="mb-16">
                           <div>
                              <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> 2 searches/day</div>
                              <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> real-time analysis</div>
                           </div>
                        </div>
                        <div className="mt-[120px]">
                           <button className="bg-[#EBFFFC] hover:bg-[#055346] text-[#055346] hover:text-[#EBFFFC] text-[16px] leading-[40px] rounded-md w-full block cursor-pointer">Choose Plan</button>
                        </div>
                     </div>
                  </div>
                  <div className="most_popular_bg border-[10px] border-[#8ac6b1] rounded-4xl p-4">
                     <div className="">
                        <div className="pt-2 px-6">
                           <div className="flex justify-between items-center pb-6">
                              <h3 className="text-[19px] text-[#F3F3F3] font-medium">Pro</h3>
                              <div className="text-[12px] font-medium rounded-md leading-[30px] text-[#023F9B] px-4 bg-white">
                                 Most Popular
                              </div>
                           </div>
                           <div className="flex items-center gap-2 mb-8">
                              <p className="text-[#ffffff] text-[36px] leading-[36px] font-extrabold">$10</p>
                              <div>
                                 <p className="text-[#F3F3F3] text-[12px] leading-[16px]">/month</p>
                              </div>
                           </div>
                           <div className="mb-16">
                              <div>
                                 <div className="flex gap-1 text-[#F3F3F3] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#52A8CD] text-xl" /> Unlimited searches</div>
                                 <div className="flex gap-1 text-[#F3F3F3] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#52A8CD] text-xl" /> real-time analysis</div>
                                 <div className="flex gap-1 text-[#F3F3F3] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#52A8CD] text-xl" /> priority analysis</div>
                                 <div className="flex gap-1 text-[#F3F3F3] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#52A8CD] text-xl" /> 10 searches</div>
                              </div>
                           </div>
                           <div>
                              <button className="bg-[#013859] hover:bg-[#52A8CD] text-[#F3F3F3] hover:text-[#EBFFFC] text-[16px] leading-[40px] rounded-md w-full block cursor-pointer">Choose Plan</button>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="pt-5">
                     <div className="py-8 px-6">
                        <h3 className="text-[19px] text-[#1D2127] pb-6 font-medium">Premium</h3>
                        <div className="flex items-center gap-2 mb-8">
                           <p className="text-[#1D2127] text-[36px] leading-[36px] font-extrabold">$100</p>
                           <div>
                              <p className="text-[#cbced1] text-[12px] leading-[16px]">/month</p>
                           </div>
                        </div>
                        <div className="mb-16">
                           <div>
                              <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> Unlimited searches</div>
                              <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> real-time analysis</div>
                              <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> priority analysis</div>
                              <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> 120 searches</div>
                           </div>
                        </div>
                        <div>
                           <button className="bg-[#EBFFFC] hover:bg-[#055346] text-[#055346] hover:text-[#EBFFFC] text-[16px] leading-[40px] rounded-md w-full block cursor-pointer">Choose Plan</button>
                        </div>
                     </div>
                  </div> */}
                  {/* <div className="pt-5">
                     <div className="py-8 px-6">
                        <h3 className="text-[19px] text-[#1D2127] pb-6 font-medium">Enterprise</h3>
                        <div className="mb-16">
                              <div>
                                 <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> </div>
                              </div>
                           </div>
                        <div className="mt-[240px]">
                           <button className="bg-[#EBFFFC] hover:bg-[#055346] text-[#055346] hover:text-[#EBFFFC] text-[16px] leading-[40px] rounded-md w-full block cursor-pointer">Discuss with us</button>
                        </div>
                     </div>
                  </div> */}
               </div>
            </div>
         </div>
         {/* Key benefits section ends here */}
         {/* how in works section ends here */}

         {/* Why Choose Us section ends here */}
         {openLoginModal &&
            <LoginModal
               openLoginModal={openLoginModal}
               setOpenLoginModal={setOpenLoginModal}
            />
         }
      </div>
   )
}

export default page