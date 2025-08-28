import Link from 'next/link'
import React from 'react'

import aboutBanner from "../assets/imagesource/about_banner.png";
import bannerImg from "../assets/imagesource/banner_img.png";
import About_us from "../assets/imagesource/About_us.png";
import Image from 'next/image';

import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";

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
                  <h1 className="text-xl leading-[24px] lg:text-[60px] lg:leading-[60px] text-black font-bold mb-2 lg:mb-4">FAQ<span>s</span></h1>
               </div>
           </div>
        </div>
        </div>
      </div>
            {/* Why Choose Us section start here */}
      <div className="about_section">
        <div className="accordian_section max-w-6xl mx-auto lg:py-4 px-4 lg:px-0">
          <Accordion>
            <AccordionPanel>
                <AccordionTitle>What is Cryptointuit?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Cryptointuit is an AI‑powered platform that analyzes real‑time market data and on‑chain signals to forecast short‑, medium‑ and long‑term 
                        price movements for major crypto‑assets.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel>
                <AccordionTitle>Which trading pairs are supported?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        We currently cover all top‑100 coins by market cap against USDT, . Additional fiat pairs (BTC,ETH, USD, EUR, AUD) are in beta.
                    </p>
                </AccordionContent>
            </AccordionPanel>
            <AccordionPanel>
                <AccordionTitle>How are the predictions generated?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Our ensemble models combine deep‑learning time‑series networks, sentiment analysis of news & social feeds, and technical‑indicator clustering. 
                        The output is a directional forecast plus confidence interval and probability score.
                    </p>
                </AccordionContent>
            </AccordionPanel>

            <AccordionPanel>
                <AccordionTitle>Is past performance guaranteed to repeat?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        No. All forecasts are estimates based on historical and real‑time data; crypto markets remain highly volatile.
                    </p>
                </AccordionContent>
            </AccordionPanel>

            <AccordionPanel>
                <AccordionTitle>Does Cryptointuit place trades on my behalf?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Not at this stage. We provide signals, charts and alerts—you decide if and how to act on them.
                    </p>
                </AccordionContent>
            </AccordionPanel>


            <AccordionPanel>
                <AccordionTitle>Do you offer an API?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Not at this stage.
                    </p>
                </AccordionContent>
            </AccordionPanel>

            <AccordionPanel>
                <AccordionTitle>How accurate are the forecasts?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Over the last 12‑month back‑test the hourly model achieved a mean directional‑accuracy of 86 % and the 24‑hour model 91 % across BTC/USDT and ETH/USDT.
                    </p>
                </AccordionContent>
            </AccordionPanel>

            <AccordionPanel>
                <AccordionTitle>Is Cryptointuit regulated?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        As an analytics provider, Cryptointuit is not required to hold an Australian Financial Services Licence. We do not provide personal financial advice or brokerage services.
                    </p>
                </AccordionContent>
            </AccordionPanel>

            <AccordionPanel>
                <AccordionTitle>Is this financial advice?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        No. All content is for informational purposes only. Cryptocurrency trading involves substantial risk, and you should consult a licensed financial professional before investing.
                    </p>
                </AccordionContent>
            </AccordionPanel>

            <AccordionPanel>
                <AccordionTitle>Can I cancel anytime?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Absolutely—subscriptions can be canceled anytime; access continues until the end of the current billing cycle.
                    </p>
                </AccordionContent>
            </AccordionPanel>

            <AccordionPanel>
                <AccordionTitle>Where can I get support?</AccordionTitle>
                <AccordionContent className="accodian_cont">
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Reach us via whatsapp, or e‑mail at customerservice@adaptrixai.com.
                    </p>
                </AccordionContent>
            </AccordionPanel>


        </Accordion>
        </div>
      </div>
      {/* Why Choose Us section ends here */}
    </div>
  )
}

export default page