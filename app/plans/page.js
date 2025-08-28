'use client';
import { useEffect, useState } from "react"
import { IoIosCheckmarkCircle } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { createSubscriptions, getPlans } from "../reducers/PlanSlice"
import PaymentModal from "../modal/PaymentModal";
import { checkSubscription } from "../reducers/ProfileSlice";

const page = () => {
    const { plans } = useSelector((state) => state?.planst)
    const { subscriptionData } = useSelector((state) => state?.profile)
    const disptach = useDispatch()
    const [cSecrateKey, setCsecrateKey] = useState()
    const [sPublishKey, setSPublishKey] = useState()
    const [openPaymentModal, setOpenPaymentModal] = useState()
    const [subsId, setSubsId] = useState()
    const [customerId, setCustomerid] = useState()
    const [planId, setPlanId] = useState()
    useEffect(() => {
        disptach(getPlans())
    }, [])
    useEffect(() => {
        disptach(checkSubscription())
    }, [])
    console.log("subscriptionData", subscriptionData);

    const handleCreateSubscription = (id) => {
        setPlanId(id)
        disptach(createSubscriptions({ plan_id: id })).then((res) => {
            console.log("resStripe", res)
            if (res?.payload?.status_code === 201) {
                setCsecrateKey(res?.payload?.clientSecret)
                setSPublishKey(res?.payload?.stripe_publish)
                setSubsId(res?.payload?.subscriptionId)
                setCustomerid(res?.payload?.customer_id)
                setOpenPaymentModal(true)
            }
        })
    }
    return (
        <>
            <div className="key_benefits_section pt-10 lg:pt-0 pb-10">
                <div className=''>
                    {
                        (subscriptionData?.data && new Date(subscriptionData.data.stripe_subscription_end_date) > new Date()) && (
                            <div className="bg-[#222222] rounded-4xl p-5 mb-4">
                                <p className="text-2xl text-white mb-2">Your Active Plan</p>
                                <div>
                                    <p className="text-[#42C4AD] text-[15px] mb-1"><span className="text-[#6d6d6d]">Plan Name:</span> {subscriptionData?.data?.Plan?.plan_name}</p>
                                    <p className="text-[#42C4AD] text-[15px] mb-1"><span className="text-[#6d6d6d]">Price:</span> ${subscriptionData?.data?.Plan?.price}/{subscriptionData?.data?.Plan?.billing_cycle}</p>
                                    <p className="text-[#42C4AD] text-[15px] mb-1"><span className="text-[#6d6d6d]">Start Date:</span> {new Date(subscriptionData?.data?.stripe_subscription_start_date).toISOString().split('T')[0]}</p>
                                    <p className="text-[#42C4AD] text-[15px] mb-1"><span className="text-[#6d6d6d]">End Date:</span> {new Date(subscriptionData?.data?.stripe_subscription_end_date).toISOString().split('T')[0]}</p>
                                </div>

                            </div>
                        )
                    }

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-[#222222] rounded-4xl p-5">
                        {
                            plans?.data?.map((plansDatas, index) => {
                                return (
                                    <div key={index}>
                                        {
                                            index % 2 == 0 ? (
                                                <div key={index}>
                                                    <div className="pt-5" >
                                                        <div className="py-8 px-6">
                                                            <h3 className="text-[19px] text-[#ffffff] pb-6 font-medium">{plansDatas?.plan_name}</h3>
                                                            <div className="flex items-center gap-2 mb-8">
                                                                <p className="text-[#ffffff] text-[36px] leading-[36px] font-extrabold">{plansDatas?.currency} {plansDatas?.price}</p>
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
                                                                                    <div className="flex gap-1 text-[#6d6d6d] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" />{fets}</div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                    {/* <div className="flex gap-1 text-[#393d42] text-[14px] mb-2"><IoIosCheckmarkCircle className="text-[#bfc4c7] text-xl" /> real-time analysis</div> */}
                                                                </div>
                                                            </div>
                                                            {
                                                                (subscriptionData?.data && new Date(subscriptionData?.data?.stripe_subscription_end_date) > new Date()) || subscriptionData?.data?.subscription_status === "active" ? (
                                                                    <>

                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {
                                                                            plansDatas?.price !== 0 && (
                                                                                <div className="mt-[50px]">
                                                                                    <button onClick={() => handleCreateSubscription(plansDatas?.id)} className="bg-[#EBFFFC] hover:bg-[#055346] text-[#055346] hover:text-[#EBFFFC] text-[16px] leading-[40px] rounded-md w-full block cursor-pointer">Choose Plan</button>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </>

                                                                )
                                                            }

                                                        </div>
                                                    </div>

                                                </div>
                                            ) : (
                                                <>
                                                    <div className="most_popular_bg border-[10px] border-[#8ac6b1] rounded-4xl p-4" >
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
                                                                {(subscriptionData?.data && new Date(subscriptionData?.data?.stripe_subscription_end_date) > new Date()) || subscriptionData?.data?.subscription_status === "active" ? (
                                                                    <></>
                                                                ) : (
                                                                    <div>
                                                                        <button onClick={() => handleCreateSubscription(plansDatas?.id)} className="bg-[#013859] hover:bg-[#52A8CD] text-[#F3F3F3] hover:text-[#EBFFFC] text-[16px] leading-[40px] rounded-md w-full block cursor-pointer">Choose Plan</button>
                                                                    </div>
                                                                )}

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
                {
                    openPaymentModal && (
                        <PaymentModal
                            openPaymentModal={openPaymentModal}
                            setOpenPaymentModal={setOpenPaymentModal}
                            cSecrateKey={cSecrateKey}
                            sPublishKey={sPublishKey}
                            subsId={subsId}
                            customerId={customerId}
                            planId={planId}
                        />
                    )
                }
            </div>
        </>
    )
}
export default page