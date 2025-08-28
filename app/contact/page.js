import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
import Image from 'next/image';
import { Button, Label, Textarea, TextInput } from 'flowbite-react';

import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const page = () => {
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
                                <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">Contact <span>Us</span></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Why Choose Us section start here */}
            <div className="certificate_completion_sec">
                <div className="max-w-6xl mx-auto lg:py-4 px-4 lg:px-0">
                    <div className="lg:flex">
                        <div className="lg:w-6/12 mb-6 lg:mb-0">
                            <div className='flex items-center gap-2 mb-4'>
                                <div>
                                    <FaPhoneAlt className='text-[#52b69a]' />
                                </div>
                                <div className='text-base text-black'>+61 416 206 144</div>
                            </div>
                            <div className='flex items-center gap-2 mb-4'>
                                <div>
                                    <FaEnvelope className='text-[#52b69a]' />
                                </div>
                                <div className='text-base text-black'>customerservice@adaptrixai.com</div>
                            </div>
                            <div className='flex items-start justify-start gap-2 mb-4'>
                                <div className='pt-1'>
                                    <IoLocationSharp className='text-[#52b69a] text-2xl' />
                                </div>
                                <div className='text-base text-black'>Melbourne, Australia (or wherever applicable)</div>
                            </div>
                            <div>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d805170.0496601658!2d145.05313529999998!3d-37.9725665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1752758598986!5m2!1sen!2sin"
                                    width="100%"
                                    height="400px"
                                    title="Melbourne, Australia"
                                    style={{ border: 'none' }}
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div className="lg:w-6/12 lg:pl-10 flex justify-center items-center">
                            <div>
                                <h2 className="text-[#0B0B2C] text-xl lg:text-[20px] lg:leading-[30px] font-extrabold capitalize pb-8">If you have any query feel free to ASK or Contact us!</h2>
                                <div className='form_area'>
                                    <div className='mb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="base">Name</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" />
                                    </div>
                                    <div className='mb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="base">Phone Number</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" />
                                    </div>
                                    <div className='mb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="base">Email </Label>
                                        </div>
                                        <TextInput id="base" type="email" sizing="md" />
                                    </div>
                                    <div className='mb-4'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="comment">Your massage</Label>
                                        </div>
                                        <Textarea id="comment" placeholder="Your massage" required rows={4} />
                                    </div>
                                    <Button type="submit">Submit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Why Choose Us section ends here */}
        </div>
    )
}

export default page