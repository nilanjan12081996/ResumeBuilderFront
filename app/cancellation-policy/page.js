import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
import Image from 'next/image';

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

const page = () => {
  return (
     <div>
      <div className='banner_area p-0 lg:p-0'>
        {/* home banner section start here */}
        <div className="home_banner_area relative">
          <Image src={aboutBanner} alt='aboutBanner' className="hidden lg:block" />
          <Image src={bannerImg} alt='bannerImg' className="block lg:hidden" />
          <div className="banner_content_area absolute w-full h-full left-0 top-0">
           <div className='max-w-6xl mx-auto flex justify-center items-center h-full'>
               <div className="w-full px-4 pt-14 lg:pt-24 text-center">
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">Cancellation policy</h1>
               </div>
           </div>
        </div>
        </div>
      </div>
      {/* Why Choose Us section start here */}
      {/* how in works section start here */}
            {/* Key benefits section start here */}
            <div className="key_benefits_section pt-10 lg:pt-20 pb-10 px-4 lg:px-0">
               <div className='max-w-6xl mx-auto'>
                  <p className='text-sm lg:text-base leading-[24px] text-[#4C4B4B] mb-2'>At ResumeMile, we strive to deliver exceptional recruitment and hiring services. However, 
                    if you need to modify or cancel your order, subscription, or service request, please review the following policy:</p>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>1. Service Cancellation</h3>

                     <ul className='ml-5'>
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-4 list-disc'>For Subscription-Based Plans
                           <ul className='mt-4 ml-4'>
                              <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Cancellations will take effect at the end of the current billing cycle.</li>
                              <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>No partial or prorated refunds will be issued for unused days within a billing period unless required by law.</li>
                           </ul>
                        </li> 
                        <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-4 list-disc'>For One-Time Services (Job Posting / Talent Screening / Consulting)
                           <ul className='mt-4 ml-4'>
                              <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Cancellation requests made within 24 hours of purchase and before service commencement are eligible for a full refund.</li>
                              <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>If service delivery has already begun, cancellation may not be eligible for a refund, but we will assess on a case-by-case basis.</li>
                           </ul>
                        </li> 
                     </ul>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>2. Modification / Rescheduling</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-3'>If you wish to reschedule or modify a service (e.g., change job posting content or hiring plan), 
                        please contact us at least 48 hours prior to scheduled execution. We`ll do our best to accommodate changes without any additional charges.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>3. No-Show or Inactivity</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-3'>Failure to provide required information, approvals, or coordination within 7 days of request may result in service lapse without refund.</p>
                  </div>
                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>4. Contact for Cancellations</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>For any cancellation or refund requests, reach us at:</p>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>Email: support@resumemile.com</p>
                     <p>By purchasing or subscribing to any ResumeMile services, you acknowledge and agree to this Cancellation & Refund Policy.</p>
                  </div>

                  <div className='mb-4'>
                     <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>5. Refund Eligibility</h3>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>Refunds will only be issued under the following circumstances:</p>
                     <div className="overflow-x-auto mb-4">
                        <Table>
                            <TableHead>
                            <TableRow>
                                <TableHeadCell>Scenario</TableHeadCell>
                                <TableHeadCell>Eligibility</TableHeadCell>
                            </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                Duplicate payment or transaction error
                                </TableCell>
                                <TableCell>Full refund</TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                Service not delivered due to technical fault on our side
                                </TableCell>
                                <TableCell>Full or partial refund</TableCell>
                            </TableRow>
                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Customer dissatisfaction due to quality issues</TableCell>
                                <TableCell>Evaluated individually</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                      </div>
                     <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>Refunds, if approved, will be processed within 7-10 business days via the original payment method.</p>
                  </div>
               </div>
            </div>
            {/* Key benefits section ends here */}
      {/* how in works section ends here */}

      {/* Why Choose Us section ends here */}
    </div>
  )
}

export default page