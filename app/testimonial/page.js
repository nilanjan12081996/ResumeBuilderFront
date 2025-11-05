'use client';

import React from 'react'

import Slider from "react-slick";

import testi_face from "../assets/imagesource/testi_face.png";
import testi_face2 from "../assets/imagesource/testi-2.jpg";
import testi_face3 from "../assets/imagesource/testi-3.jpg";
import testi_face4 from "../assets/imagesource/testi-4.jpg";
import quote_icon from "../assets/imagesource/quote_icon.png";
import rating_icon from "../assets/imagesource/rating_icon.png";
import Image from 'next/image';

const Testimonial = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows:false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows:false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
  };
  return (
    <div>
        <Slider {...settings}>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <div className='flex justify-between items-center mb-5'>
                        <div className='flex gap-2 items-center justify-center'>
                            <div><Image src={testi_face} alt='testi_face' className='w-[63px] h-[63px]' /></div>
                            <div>
                                <p className='text-[24px] leading-[30px] text-[#071537] font-bold mb-1'>Olivia Green</p>
                                <Image src={rating_icon} alt='rating_icon' className='' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-[13px] leading-[28px] text-black'>"ResumeMile completely changed how I present myself professionally. The AI suggestions helped me highlight my strengths perfectly, and within two weeks, I landed multiple interview calls! The best part — my resume finally passed every ATS system without any issue. Highly recommended!"</p>
                    </div>
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <div className='flex justify-between items-center mb-5'>
                        <div className='flex gap-2 items-center justify-center'>
                            <div><Image src={testi_face2} alt='testi_face' className='w-[63px] h-[63px]' /></div>
                            <div>
                                <p className='text-[24px] leading-[30px] text-[#071537] font-bold mb-1'>Arjun Mehta</p>
                                <Image src={rating_icon} alt='rating_icon' className='' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-[13px] leading-[28px] text-black'>"I always struggled to make my resume stand out in a sea of applications. ResumeMile’s recruiter-approved templates and keyword optimization gave my profile a professional edge. I got shortlisted for my dream company within days. It’s like having a personal career coach!"</p>
                    </div>
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <div className='flex justify-between items-center mb-5'>
                        <div className='flex gap-2 items-center justify-center'>
                            <div><Image src={testi_face3} alt='testi_face' className='w-[63px] h-[63px]' /></div>
                            <div>
                                <p className='text-[24px] leading-[30px] text-[#071537] font-bold mb-1'>Anjali Das</p>
                                <Image src={rating_icon} alt='rating_icon' className='' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-[13px] leading-[28px] text-black'>"The LinkedIn optimization feature is a game-changer! ResumeMile helped me rewrite my summary, adjust keywords, and make my profile more discoverable. Since then, I’ve received messages from several recruiters. This platform truly delivers on its promise!"</p>
                    </div>
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <div className='flex justify-between items-center mb-5'>
                        <div className='flex gap-2 items-center justify-center'>
                            <div><Image src={testi_face4} alt='testi_face' className='w-[63px] h-[63px]' /></div>
                            <div>
                                <p className='text-[24px] leading-[30px] text-[#071537] font-bold mb-1'>Rajat Verma</p>
                                <Image src={rating_icon} alt='rating_icon' className='' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className='text-[13px] leading-[28px] text-black'>"As someone with years of experience, I wanted my resume to reflect my leadership journey. ResumeMile’s AI tools and design templates gave my profile the modern, executive touch it needed. I’ve already recommended it to my entire team!"</p>
                    </div>
                </div>
            </div>
        </Slider>
    </div>
  )
}

export default Testimonial