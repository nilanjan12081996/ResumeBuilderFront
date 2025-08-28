'use client';

import React from 'react'

import Slider from "react-slick";

import testi_face from "../assets/imagesource/testi_face.png";
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
                        <p className='text-[13px] leading-[28px] text-black'>“.. followed by some bogus content. Aenean commodo ligula egget dolor. 
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.”</p>
                    </div>
                </div>
            </div>
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
                        <p className='text-[13px] leading-[28px] text-black'>“.. followed by some bogus content. Aenean commodo ligula egget dolor. 
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.”</p>
                    </div>
                </div>
            </div>
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
                        <p className='text-[13px] leading-[28px] text-black'>“.. followed by some bogus content. Aenean commodo ligula egget dolor. 
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.”</p>
                    </div>
                </div>
            </div>
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
                        <p className='text-[13px] leading-[28px] text-black'>“.. followed by some bogus content. Aenean commodo ligula egget dolor. 
                            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.”</p>
                    </div>
                </div>
            </div>
        </Slider>
    </div>
  )
}

export default Testimonial