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
                                <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">Terms & Conditions</h1>
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
                    <p className='text-sm lg:text-base leading-[24px] text-[#4C4B4B] mb-2'>Welcome to ResumeMile (“we,” “us,” “our”). By accessing or using https://resumemile.ai/  and any related services , you agree to be bound by these Terms & Conditions. If you do not agree with these Terms, please do not use our Site or Services.</p>
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>1. Services</h3>

                        <ul className='ml-5'>
                            <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-4 list-disc'>ResumeMile provides digital AI tools designed to enhance professional career growth, including:</p>
                            <ul className='mt-4 ml-4'>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>an AI-powered Resume Builder that helps users generate, format, and optimize resumes tailored to job descriptions and roles; and</li>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>an AI LinkedIn Profile Rewrite Tool that assists users in rewriting and improving their LinkedIn profiles for better engagement and visibility.</li>
                            </ul>

                        </ul>
                        <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>We may periodically add, modify, or remove features, tools, or integrations (“Additional Services”) to improve functionality and user experience.</p>
                    </div>
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>2. Registration, Accounts & Access</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>You may need to register or create an account to use certain features. You agree to provide accurate and up-to-date information.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>We reserve the right to suspend, restrict, or terminate your access if we detect misuse, suspicious activity, or a breach of these Terms.</li>
                        </ul>
                    </div>
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>3. Acceptable Use</h3>

                        <ul className='ml-5'>
                            <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-4 list-disc'>You agree to use the Site and Services only for lawful purposes and in accordance with these Terms.
                                You must not:</p>
                            <ul className='mt-4 ml-4'>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>upload, transmit, or share unlawful, misleading, or offensive material;</li>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>use the Services to impersonate another person or misrepresent your affiliation;</li>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>reverse engineer, decompile, or modify the platform’s software;</li>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>use automated tools or bots to interact with the Site;</li>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>violate LinkedIn’s or any third-party platform’s policies when applying AI-generated content externally.</li>
                            </ul>

                        </ul>
                        <p className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2'>You are solely responsible for the accuracy and ethical use of any AI-generated resume or profile content.</p>
                    </div>
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>4. Intellectual Property</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>All trademarks, logos, features, designs, code, and written materials on the Site and within the Services are the exclusive property of ResumeMile or its licensors.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>You may not copy, modify, distribute, display, sell, or use any of our intellectual property without prior written consent.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>“ResumeMile” and associated brand assets are protected trademarks.</li>
                        </ul>
                    </div>

                    {/* Section 5 */}
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>5. Privacy & Data</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Your use of the Services involves the collection and processing of personal information. Please read our <Link className="text-[#800080]" href='/privacy-policy'>Privacy Policy</Link> to understand how we collect, store, and use your data.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>By submitting content (e.g., resumes, LinkedIn profile data, prompts, or AI-generated text), you grant ResumeMile a limited, non-exclusive, royalty-free, worldwide licence to use that content solely for delivering and improving the Services.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>You confirm you have all necessary rights to the content you submit.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>While we use reasonable safeguards to protect user data, we cannot guarantee absolute security or that the Services will be uninterrupted or error-free.</li>
                        </ul>
                    </div>

                    {/* Section 6 */}
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>6. Payments & Billing</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Certain Services or premium features may require payment.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Fees are stated in [currency] and are exclusive of taxes unless otherwise specified.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>All payments must be made on time; delayed or failed payments may result in suspension of access.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Except where required by law, payments are non-refundable.</li>
                        </ul>
                    </div>

                    {/* Section 7 */}
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>7. Termination & Suspension</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>You may discontinue use of the Services at any time.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>We may suspend or terminate your account if you violate these Terms, misuse the Services, or if required by law.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Upon termination, all rights and licences granted to you will immediately end.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Sections 4 (Intellectual Property), 5 (Privacy & Data), 8 (Disclaimers & Limitation of Liability), 9 (Indemnity), 10 (Governing Law) and 11 (General) survive termination.</li>
                        </ul>
                    </div>

                    {/* Section 8 */}
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>8. Disclaimers & Limitation of Liability</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>The Services are provided “as is” and “as available.” We make no warranties regarding accuracy, reliability, or suitability of AI-generated resumes or LinkedIn rewrites.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>We do not guarantee job placement, employment opportunities, or recruiter responses from use of the Services.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>To the maximum extent permitted by law, ResumeMile and its affiliates will not be liable for any indirect, incidental, consequential, or punitive damages arising out of or relating to your use of the Site or Services.</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>Our total aggregate liability for any claims will not exceed the total fees you paid for the Services in the preceding 12 months (if any).</li>
                        </ul>
                    </div>

                    {/* Section 9 */}
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>9. Indemnity</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>You agree to indemnify and hold harmless ResumeMile, its affiliates, employees, and partners from any claims, losses, damages, or expenses (including legal fees) arising from:</li>
                            <ul className='mt-2 ml-6'>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>your violation of these Terms;</li>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>your misuse of AI-generated content; or</li>
                                <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>your infringement of any third-party rights.</li>
                            </ul>
                        </ul>
                    </div>

                    {/* Section 10 */}
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>10. Governing Law & Dispute Resolution</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>These Terms are governed by the laws of India. Any disputes shall fall under the exclusive jurisdiction of the courts of [City, State – e.g., Hyderabad, Telangana].</li>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>If any provision of these Terms is held invalid, the remaining sections shall continue in full force.</li>
                        </ul>
                    </div>

                    {/* Section 11 */}
                    <div className='mb-4'>
                        <h3 className='text-base leading-[20px] lg:text-[18px] lg:leading-[30px] text-black font-medium mb-1'>11. Changes to Terms</h3>
                        <ul className='mt-4 ml-4'>
                            <li className='text-sm lg:text-base leading-[20px] text-[#4C4B4B] mb-2 list-disc'>We may update these Terms from time to time by posting a revised version on this page. The updated version will indicate a new “Last Updated” date. Continued use of the Site or Services means you accept the revised Terms.</li>
                        </ul>
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