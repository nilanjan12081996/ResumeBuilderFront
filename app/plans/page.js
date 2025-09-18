"use client";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  createSubscriptions,
  getIpData,
  getPlans,
  verifyOrder,
} from "../reducers/PlanSlice";
import PaymentModal from "../modal/PaymentModal";
import { checkSubscription } from "../reducers/ProfileSlice";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Image from "next/image";
import sub01 from "../../app/assets/imagesource/sub01.png";
import sub02 from "../../app/assets/imagesource/sub02.png";
import Check from "../../app/assets/imagesource/Check.png";
import RazorPaymentModal from "../modal/RazorPaymentModal";

const page = () => {
  const { plans, loading, ipData, createOrderData, error } = useSelector(
    (state) => state.planst
  );
  const { profileData } = useSelector((state) => state.profile);
  const usertypeId = sessionStorage.getItem("signup_type_id");
  const parsed = usertypeId ? JSON.parse(usertypeId) : null;
  console.log("userPlanId", parsed?.signup_type_id); // 2
  const dispatch = useDispatch();

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState();
  const [plan_id, sePlanid] = useState();

  const loadRazorpayScript = (() => {
    let loaded;
    return () =>
      loaded ||
      (loaded = new Promise((resolve, reject) => {
        const existing = document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        );
        if (existing) return resolve(true);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
        document.body.appendChild(script);
      }));
  })();

  const handlePaymentModal = async (e, data) => {
    console.log("data", data);
    e.preventDefault();
    // setAmount(data?.amount);
    // setCurrency(data?.currency);
    // sePlanid(data?.plan_id);

    try {
      const orderData = {
        amount: data.amount,
        currency: data.currency,
        plan_id: data.plan_id,
      };

      // Wait for the createOrder action to complete
      const result = await dispatch(createOrder(orderData));

      if (createOrder.fulfilled.match(result)) {
        console.log("Order created successfully:", result.payload);

        // Load Razorpay script
        await loadRazorpayScript();

        // Use the actual order data from the API response
        const orderResponse = result.payload;

        console.log("profileData", profileData);
        var options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.amount,
          currency: data.currency,
          name: "Resume Builder",
          description: `Plan ${data.plan_id}`,
          order_id: orderResponse.orderId,
          handler: async function (response) {
            const userData = {
              orderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              transaction_id: orderResponse.transaction_id,
            };
            try{
              const res= await dispatch(verifyOrder(userData));
              console.log("verifyOrder response:", res);
              alert("Payment Successful");
            }catch(err){
              console.log(err);
            } finally {
            }
          },
          prefill: {
            name: "User",
            email: "user@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        console.log("Razorpay options:", options);
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        console.error("Failed to create order:", result.payload);
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(getIpData()).then((res) => {
      console.log("Ipres:", res);
      if (res?.payload?.ip) {
        dispatch(
          getPlans({
            plan_type: parsed?.signup_type_id,
            ip_address: res?.payload?.ip,
          })
        );
      }
    });
  }, [dispatch]);
  // console.log("plans", plans);

  return (
    <>
      
      <div className="key_benefits_section pt-10 lg:pt-0 pb-10">
        <div className="purchase_section py-8 lg:py-20 px-0 lg:px-0">
          <div className="max-w-6xl mx-auto">
            {/* <div className="text-center mb-10 lg:mb-10">
                                 <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6">Find Your <span>Perfect Plan</span></h2>
                                 <p className="text-[#4C4B4B] text-base lg:text-[18px] leading-[30px] lg:px-32">Discover the ideal plan to fuel your business growth. Our pricing options are carefully crafted to cater to businesses.</p>
                              </div> */}
            <div className="subscription_tab_section">
              <Tabs>
                <TabList>
                  {parsed?.signup_type_id == 1 && <Tab>One Time</Tab>}
                  <Tab>Quarterly </Tab>
                  {parsed?.signup_type_id == 2 && <Tab>Annual </Tab>}
                </TabList>

                {parsed?.signup_type_id == 1 && (
                  <>
                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                        {plans?.data?.map((pln, index) => {
                          return (
                            <>
                              <div
                                className="pt-0 border border-[#e9edff] rounded-[26px] bg-white"
                                key={index}
                              >
                                <div className="py-8 px-6 relative">
                                  {pln?.plan_name === "Gold" ? (
                                    <Image
                                      src={sub02}
                                      alt="sub01"
                                      className="mb-6"
                                    />
                                  ) : (
                                    <Image
                                      src={sub01}
                                      alt="sub01"
                                      className="mb-6"
                                    />
                                  )}
                                  <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                                    {pln?.plan_name}
                                  </h3>
                                  <div className="flex items-center gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                      <span className="text-[#1D2127] text-[15px] leading-[50px] font-medium">
                                        {pln?.planPrice?.currency}
                                      </span>{" "}
                                      {pln?.planPrice?.price}
                                    </p>
                                  </div>
                                  <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                      {pln?.PlanAccess?.map((pAccess) => {
                                        return (
                                          <>
                                            <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                              <Image
                                                src={Check}
                                                alt="Check"
                                                className="w-[14px] h-[14px] mr-2"
                                              />{" "}
                                              {pAccess?.plan_access_description}
                                            </div>
                                          </>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <div className="absolute left-0 lg:bottom-[20px] bottom-[20px] w-full px-6">
                                    <button
                                      onClick={(e) =>
                                        handlePaymentModal(e, {
                                          amount: pln?.planPrice?.price,
                                          currency: pln?.planPrice?.currency,
                                          plan_id: pln?.planPrice?.plan_id,
                                        })
                                      }
                                      className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer"
                                    >
                                     {/* {loading? "Processing...": "Get Started"} */}
                                     Get Started
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}

                        {/* <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub01} alt='sub01' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Silver</h3>
                                                <div className="flex items-center gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹199</p>
                                                    <div className="pt-4">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹300</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 resume (Premium ATS score + better rating) +1 JD match resume
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[20px] w-full px-6">
                                                   <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub02} alt='sub02' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Gold</h3>
                                                <div className="flex items-center gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹499</p>
                                                   <div className="pt-4">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹699</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 LinkedIn rewrite
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[-20px] w-full px-6">
                                                   <button className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub01} alt='sub01' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Platinum</h3>
                                                <div className="flex items-center gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹649</p>
                                                   <div className="pt-4">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹949</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 resume  +1 LinkedIn rewrite
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[-20px] w-full px-6">
                                                   <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div> */}
                      </div>
                    </TabPanel>
                  </>
                )}

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
                          <button 
                            className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer"
                          >
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
                          <button 
                            className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer"
                          >
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
                          <button 
                            className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer"
                          >
                            Get Started
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                {/* <TabPanel>
                                       <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                                          <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub01} alt='sub01' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Campus Basic</h3>
                                                <div className="gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹60,000</p>
                                                   <div className="pt-0">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹90,000</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 500 resumes
                                                      </div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> ₹120/resume
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[10px] w-full px-6">
                                                   <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub01} alt='sub01' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Campus Pro</h3>
                                                <div className="gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹1,00,000</p>
                                                    <div className="pt-4">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹1,50,000</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1,000 resumes
                                                      </div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> ₹100/resume
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[20px] w-full px-6">
                                                   <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub02} alt='sub02' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Campus Plus</h3>
                                                <div className="gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹1,20,000</p>
                                                   <div className="pt-0">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹1,70,000</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 500 resumes
                                                      </div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 500 LinkedIn rewrites
                                                      </div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> ₹80/resume + LinkedIn
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[20px] w-full px-6">
                                                   <button className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub01} alt='sub01' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Campus Elite</h3>
                                                <div className="gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹1,70,000</p>
                                                   <div className="pt-0">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹2,00,000</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1,000 resumes
                                                      </div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1,000 LinkedIn rewrites
                                                      </div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> ₹85/resume + LinkedIn
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[20px] w-full px-6">
                                                   <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div>
                                          
                                       </div>
                                    </TabPanel> */}
                {parsed?.signup_type_id == 2 && (
                  <>
                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                        {plans?.data?.map((pln, index) => {
                          return (
                            <>
                              <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                <div className="py-8 px-6 relative">
                                  {pln?.plan_name === "Campus Plus" ? (
                                    <Image
                                      src={sub02}
                                      alt="sub01"
                                      className="mb-6"
                                    />
                                  ) : (
                                    <Image
                                      src={sub01}
                                      alt="sub01"
                                      className="mb-6"
                                    />
                                  )}
                                  <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">
                                    {pln?.plan_name}
                                  </h3>
                                  <div className="flex items-center gap-2 mb-8">
                                    <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">
                                      <span className="text-[#1D2127] text-[15px] leading-[50px] font-medium">
                                        {pln?.planPrice?.currency}
                                      </span>{" "}
                                      {pln?.planPrice?.price}
                                    </p>
                                  </div>
                                  <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                    <div>
                                      {pln?.PlanAccess?.map((pAccess) => {
                                        return (
                                          <>
                                            <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                              <Image
                                                src={Check}
                                                alt="Check"
                                                className="w-[14px] h-[14px] mr-2"
                                              />{" "}
                                              {pAccess?.plan_access_description}
                                            </div>
                                          </>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  <div className="absolute left-0 bottom-[20px] w-full px-6">
                                    <button
                                      onClick={handlePaymentModal}
                                      className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer"
                                    >
                                      Get Started
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}

                        {/* <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub01} alt='sub01' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Silver</h3>
                                                <div className="flex items-center gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹199</p>
                                                    <div className="pt-4">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹300</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 resume (Premium ATS score + better rating) +1 JD match resume
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[20px] w-full px-6">
                                                   <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white gold_card_box">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub02} alt='sub02' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Gold</h3>
                                                <div className="flex items-center gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹499</p>
                                                   <div className="pt-4">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹699</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 LinkedIn rewrite
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[-20px] w-full px-6">
                                                   <button className="bg-[#e1cbff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div>
                                          <div className="pt-0 border border-[#e9edff] rounded-[26px] bg-white">
                                             <div className="py-8 px-6 relative">
                                                <Image src={sub01} alt='sub01' className='mb-6' />
                                                <h3 className="text-[28px] leading-[28px] text-[#1B223C] pb-6 font-medium">Platinum</h3>
                                                <div className="flex items-center gap-2 mb-8">
                                                   <p className="text-[#1D2127] text-[40px] leading-[50px] font-medium">₹649</p>
                                                   <div className="pt-4">
                                                      <p className="text-[#797878] text-[14px] leading-[20px] line-through">₹949</p>
                                                   </div>
                                                </div>
                                                <div className="mb-14 border-t border-[#edf0ff] pt-8">
                                                   <div>
                                                      <div className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                                                         <Image src={Check} alt='Check' className='w-[14px] h-[14px] mr-2' /> 1 resume  +1 LinkedIn rewrite
                                                      </div>
                                                   </div>
                                                </div>
                                                <div className="absolute left-0 bottom-[-20px] w-full px-6">
                                                   <button className="bg-[#ffffff] hover:bg-[#1B223C] text-[#1B223C] hover:text-[#ffffff] border border-[#1B223C] text-[14px] leading-[40px] rounded-md w-full block cursor-pointer">Get Started</button>
                                                </div>
                                             </div>
                                          </div> */}
                      </div>
                    </TabPanel>
                  </>
                )}
              </Tabs>
            </div>
          </div>
        </div>
        {openPaymentModal && (
          <RazorPaymentModal
            openPaymentModal={openPaymentModal}
            setOpenPaymentModal={setOpenPaymentModal}
            amount={amount}
            currency={currency}
            plan_id={plan_id}
          />
        )}
      </div>
    </>
  );
};
export default page;
