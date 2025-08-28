'use client';

import React from 'react'

import Slider from "react-slick";

import testi_face from "../assets/imagesource/testi_face.png";
import quote_icon from "../assets/imagesource/quote_icon.png";
import rating_icon from "../assets/imagesource/rating_icon.png";
import resume01 from "../assets/imagesource/resume01.png";
import resume02 from "../assets/imagesource/resume02.png";
import resume03 from "../assets/imagesource/resume03.png";
import Image from 'next/image';

const FreeResumeTemplates = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:true,
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
                    <Image src={resume01} alt='resume01' className='' />
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <Image src={resume02} alt='resume02' className='' />
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <Image src={resume03} alt='resume03' className='' />
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <Image src={resume01} alt='resume01' className='' />
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <Image src={resume02} alt='resume02' className='' />
                </div>
            </div>
            <div className='px-4 pb-4'>
                <div className='bg-white rounded-xl p-6 shadow-lg text-left'>
                    <Image src={resume03} alt='resume03' className='' />
                </div>
            </div>
        </Slider>
    </div>
  )
}

export default FreeResumeTemplates