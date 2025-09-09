"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSubscriptions, getPlans } from "../reducers/PlanSlice";
import PaymentModal from "./PaymentModal";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import sub01 from "../assets/imagesource/sub01.png";
import sub02 from "../assets/imagesource/sub02.png";
import Check from "../assets/imagesource/Check.png";

import Image from "next/image";

const PriceListModal = ({ openPricModal, setOpenPriceModal }) => {
  const { plans } = useSelector((state) => state?.planst);
  const { subscriptionData } = useSelector((state) => state?.profile);
  const disptach = useDispatch();
  const [cSecrateKey, setCsecrateKey] = useState();
  const [sPublishKey, setSPublishKey] = useState();
  const [openPaymentModal, setOpenPaymentModal] = useState();
  const [subsId, setSubsId] = useState();
  const [customerId, setCustomerid] = useState();
  const [planId, setPlanId] = useState();
  useEffect(() => {
    disptach(getPlans());
  }, []);

  const handleCreateSubscription = (id) => {
    setPlanId(id);
    disptach(createSubscriptions({ plan_id: id })).then((res) => {
      console.log("resStripe", res);
      if (res?.payload?.status_code === 201) {
        setCsecrateKey(res?.payload?.clientSecret);
        setSPublishKey(res?.payload?.stripe_publish);
        setSubsId(res?.payload?.subscriptionId);
        setCustomerid(res?.payload?.customer_id);
        setOpenPaymentModal(true);
      }
    });
  };
  return (
    <>
      <Modal
        size="7xl"
        show={openPricModal}
        onClose={() => setOpenPriceModal(false)}
      >
        <ModalHeader className="border-none pb-0 absolute right-3 top-3 bg-transparent">
          &nbsp;
        </ModalHeader>
        <ModalBody className="bg-white p-0">
          <div className="key_benefits_section pt-0 lg:pt-0 pb-0">
            <div className="purchase_section py-8 lg:py-10">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 lg:mb-10">
                  <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6">
                    Find Your <span>Perfect Plan</span>
                  </h2>
                  <p className="text-[#4C4B4B] text-base lg:text-[18px] leading-[30px] lg:px-32">
                    Discover the ideal plan to fuel your business growth. Our
                    pricing options are carefully crafted to cater to
                    businesses.
                  </p>
                </div>
                <div className="subscription_tab_section">
                  <Tabs>
                    <TabList>
                      <Tab>One Time</Tab>
                      <Tab>Quarterly </Tab>
                      <Tab>Annual </Tab>
                    </TabList>

                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                          <div className="py-8 px-6 relative">
                            <Image src={sub01} alt="sub01" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Free
                            </h3>
                            <div className="flex items-center gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹0
                              </p>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  3 resumes (with watermark)
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                          <div className="py-8 px-6 relative">
                            <Image src={sub01} alt="sub01" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Silver
                            </h3>
                            <div className="flex items-center gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹199
                              </p>
                              <div className="pt-4">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹300
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  1 resume (Premium ATS score + better rating)
                                  +1 JD match resume
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                          <div className="py-8 px-6 relative">
                            <Image src={sub02} alt="sub02" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Gold
                            </h3>
                            <div className="flex items-center gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹499
                              </p>
                              <div className="pt-4">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹699
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  1 LinkedIn rewrite
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                          <div className="py-8 px-6 relative">
                            <Image src={sub01} alt="sub01" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Platinum
                            </h3>
                            <div className="flex items-center gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹649
                              </p>
                              <div className="pt-4">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹949
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  1 resume +1 LinkedIn rewrite
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                          <div className="py-8 px-6 relative">
                            <Image src={sub01} alt="sub01" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Free
                            </h3>
                            <div className="flex items-center gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹0
                              </p>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  3 resumes (with watermark)
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                          <div className="py-8 px-6 relative">
                            <Image src={sub01} alt="sub01" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Silver
                            </h3>
                            <div className="flex items-center gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹799
                              </p>
                              <div className="pt-4">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹999
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  8 resumes (premium ATS score) + 8 JD specific
                                  resume
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                          <div className="py-8 px-6 relative">
                            <Image src={sub02} alt="sub02" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Gold
                            </h3>
                            <div className="flex items-center gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹1299
                              </p>
                              <div className="pt-4">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹1599
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  8 resumes + 2 LinkedIn rewrites
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                          <div className="py-8 px-6 relative">
                            <Image src={sub01} alt="sub01" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Campus Basic
                            </h3>
                            <div className="gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹60,000
                              </p>
                              <div className="pt-0">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹90,000
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  500 resumes
                                </div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  ₹120/resume
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[10px] w-full px-6">
                              <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                          <div className="py-8 px-6 relative">
                            <Image src={sub01} alt="sub01" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Campus Pro
                            </h3>
                            <div className="gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹1,00,000
                              </p>
                              <div className="pt-4">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹1,50,000
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  1,000 resumes
                                </div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  ₹100/resume
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                          <div className="py-8 px-6 relative">
                            <Image src={sub02} alt="sub02" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Campus Plus
                            </h3>
                            <div className="gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹1,20,000
                              </p>
                              <div className="pt-0">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹1,70,000
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  500 resumes
                                </div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  500 LinkedIn rewrites
                                </div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  ₹80/resume + LinkedIn
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                          <div className="py-8 px-6 relative">
                            <Image src={sub01} alt="sub01" className="mb-6" />
                            <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                              Campus Elite
                            </h3>
                            <div className="gap-2 mb-8">
                              <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                ₹1,70,000
                              </p>
                              <div className="pt-0">
                                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                                  ₹2,00,000
                                </p>
                              </div>
                            </div>
                            <div className="mb-14 border-t border-[#edf0ff] pt-8">
                              <div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  1,000 resumes
                                </div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  1,000 LinkedIn rewrites
                                </div>
                                <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                  <Image
                                    src={Check}
                                    alt="Check"
                                    className="w-[14px] h-[14px] mr-2"
                                  />{" "}
                                  ₹85/resume + LinkedIn
                                </div>
                              </div>
                            </div>
                            <div className="absolute left-0 bottom-[20px] w-full px-6">
                              <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">
                                Get Started
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
            </div>
            {openPaymentModal && (
              <PaymentModal
                openPaymentModal={openPaymentModal}
                setOpenPaymentModal={setOpenPaymentModal}
                cSecrateKey={cSecrateKey}
                sPublishKey={sPublishKey}
                subsId={subsId}
                customerId={customerId}
                planId={planId}
              />
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default PriceListModal;
