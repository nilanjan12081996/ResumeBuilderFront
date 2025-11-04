"use client";
import { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  createSubscriptions,
  currentSubscription,
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
import { toast, ToastContainer } from "react-toastify";
import { applyCoupon, clearCouponState } from "../reducers/CouponSlice";
import CouponModal from "../modal/CouponModal"; // we will create/use this

const page = () => {
  const { plans, loading, ipData, createOrderData, error, currentSubscriptionData } = useSelector(
    (state) => state.planst
  );
  const { appliedCoupon, loading: couponLoading, error: couponError } = useSelector(
    (state) => state.coupon
  );

  const [openCouponModal, setOpenCouponModal] = useState(false);

  const { profileData } = useSelector((state) => state.profile);
  const usertypeId = sessionStorage.getItem("signup_type_id");
  const parsed = usertypeId ? JSON.parse(usertypeId) : null;
  console.log("userPlanId", parsed?.signup_type_id); // 2
  const dispatch = useDispatch();

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [amount, setAmount] = useState();
  const [currency, setCurrency] = useState();
  const [plan_id, sePlanid] = useState();
  console.log("currentSubscriptionData", currentSubscriptionData)

  // Helper function to check if user has active subscription
  const hasActiveSubscription = () => {
    if (!currentSubscriptionData?.data?.length) return false;

    return currentSubscriptionData.data.some(sub => {
      const endDate = new Date(sub.end_date);
      const currentDate = new Date();
      return sub.status === 1 && endDate > currentDate;
    });
  };

  // Helper function to get current active subscription details
  const getCurrentActiveSubscription = () => {
    if (!currentSubscriptionData?.data?.length) return null;

    return currentSubscriptionData.data.find(sub => {
      const endDate = new Date(sub.end_date);
      const currentDate = new Date();
      return sub.status === 1 && endDate > currentDate;
    });
  };

  // Helper function to get the last plan for a specific frequency
  const getLastPlan = (frequency) => {
    if (!plans?.data?.length) return null;

    const filteredPlans = plans.data.filter((pln) => pln?.plan_frequency === frequency);
    return filteredPlans.length > 0 ? filteredPlans[filteredPlans.length - 1] : null;
  };

  // Helper function to render a plan card
  const renderPlanCard = (pln) => {
    // Check if this is a free plan (price is 0 or null)
    const isFreePlan = pln?.planPrice?.price === 0 || pln?.planPrice?.price === null || pln?.planPrice?.price === undefined;

    // Disable button if it's a free plan and user has no current subscription
    const shouldDisableButton = isFreePlan && !hasActiveSubscription();

    // Inside renderPlanCard()

    const activePlan = getCurrentActiveSubscription();
    const isActivePlan = activePlan && activePlan.Plan?.id === pln?.id;
    const activePrice = activePlan ? parseFloat(activePlan.Plan?.planPrice?.price || 0) : 0;
    const thisPrice = parseFloat(pln?.planPrice?.price || 0);

    let buttonLabel = "Upgrade";
    let isDisabled = false;

    // Logic for plan comparison
    if (isActivePlan) {
      buttonLabel = "Current Plan";
      isDisabled = true;
    } else if (hasActiveSubscription()) {
      if (thisPrice < activePrice) {
        buttonLabel = "Downgrade";
      } else if (thisPrice > activePrice) {
        buttonLabel = "Upgrade";
      } else {
        buttonLabel = "Same Tier";
        isDisabled = true;
      }
    } else if (!hasActiveSubscription()) {
      buttonLabel = "Get Started";
    }


    return (

      <div
        className={`pt-0 border rounded-[26px] bg-white ${pln?.id === 3 || pln?.id === 12 ? "border-[#800080]" : "border-[#e9edff]"
          }`}
      >
        <div className="py-8 px-6 relative min-h-[740px]">
          <div className="flex items-center justify-between mb-6">
            {pln?.plan_name === "Gold" || pln?.plan_name === "Campus Plus" ? (
              <Image src={sub02} alt="sub02" className="" />
            ) : (
              <Image src={sub01} alt="sub01" className="" />
            )}
            {(pln?.id === 3 || pln?.id === 12) && (
              <div className="bg-[#a536a2] px-3 py-2 rounded-[5px] text-xs text-white">
                Most Popular
              </div>
            )}
          </div>
          <h3 className="text-[20px] leading-[28px] text-[#1B223C] font-medium">
            {pln?.plan_name}
          </h3>
          <p className="pb-6 text-[#1B223C]">{pln?.placeholder}</p>
          {/* <div className="flex items-center gap-2 mb-8">
            <p className="text-[#1D2127] text-[35px] leading-[45px] font-medium">
              <span className="text-[#1D2127] text-[15px] leading-[50px] font-medium">
                {pln?.planPrice?.currency}
              </span>{" "}
              {pln?.planPrice?.price}
            </p>
          </div> */}
          <div className="flex items-center gap-2 mb-8">
            <p className="text-[#1D2127] text-[25px] leading-[35px] font-medium">
              {pln?.planPrice?.currency}{" "}
              {parseFloat(pln?.planPrice?.price || 0).toFixed(2)}
            </p>

            {parseFloat(pln?.planPrice?.price || 0) > 0 && (
              <div className="flex flex-col items-start pt-1">
                <p className="text-[#797878] text-[14px] leading-[20px] line-through">
                  {pln?.planPrice?.currency === "INR"
                    ? `₹${(parseFloat(pln?.planPrice?.price) * 1.3).toFixed(2)}`
                    : `$${(parseFloat(pln?.planPrice?.price) * 1.3).toFixed(2)}`}
                </p>
                <span className="text-[#30B980] text-[12px] font-medium mt-[2px]">
                  30% OFF
                </span>
              </div>
            )}
          </div>

          <div className="mb-14 border-t border-[#edf0ff] pt-8">
            <div>
              {pln?.PlanAccess?.map((pAccess, accessIndex) => {
                return (
                  <div key={accessIndex} className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                    <Image
                      src={Check}
                      alt="Check"
                      className="w-[14px] h-[14px] mr-2"
                    />{" "}
                    {pAccess?.plan_access_description}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="absolute left-0 lg:bottom-[20px] bottom-[20px] w-full px-6">
            {/* <button
              onClick={(e) =>
                !shouldDisableButton &&
                !hasActiveSubscription() &&
                handlePaymentModal(e, {
                  amount: pln?.planPrice?.price,
                  currency: pln?.planPrice?.currency,
                  plan_id: pln?.planPrice?.plan_id,
                })
              }
              disabled={shouldDisableButton || hasActiveSubscription()}
              className={`text-[14px] leading-[40px] rounded-md w-full block transition-none
                ${shouldDisableButton || hasActiveSubscription()
                  ? "bg-[#f5f5f5] text-[#999] border border-[#ddd] cursor-not-allowed opacity-60"
                  : "bg-[#ffffff] text-[#1B223C] border border-[#1B223C] hover:bg-[#1B223C] hover:text-[#ffffff] cursor-pointer"
                }`}
            >
              {shouldDisableButton ? "Current Plan" : hasActiveSubscription() ? "Already Subscribed" : "Upgrade"}
            </button> */}
            {/* <button
              onClick={(e) =>
                !isDisabled &&
                handlePaymentModal(e, {
                  amount: pln?.planPrice?.price,
                  currency: pln?.planPrice?.currency,
                  plan_id: pln?.planPrice?.plan_id,
                })
              }
              disabled={isDisabled}
              className={`text-[14px] leading-[40px] rounded-md w-full block transition-all duration-300
    ${isDisabled
                  ? "bg-green-100 text-green-700 border border-green-300 cursor-not-allowed" 
                  : "bg-[#ffffff] text-[#1B223C] border border-[#1B223C] hover:bg-[#1B223C] hover:text-[#ffffff] cursor-pointer"
                }`}
            >
              {buttonLabel}
            </button> */}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!isDisabled) {
                  setAmount(pln?.planPrice?.price);
                  setCurrency(pln?.planPrice?.currency);
                  sePlanid(pln?.planPrice?.plan_id);
                  setOpenCouponModal(true); // <-- open coupon modal
                }
              }}
              disabled={isDisabled}
              className={`text-[14px] leading-[40px] rounded-md w-full block transition-all duration-300
    ${isDisabled
                  ? "bg-green-100 text-green-700 border border-green-300 cursor-not-allowed"
                  : "bg-[#ffffff] text-[#1B223C] border border-[#1B223C] hover:bg-[#1B223C] hover:text-[#ffffff] cursor-pointer"
                }`}
            >
              {buttonLabel}
            </button>


          </div>
        </div>
      </div>
    );
  };

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

    // Prevent payment if user has active subscription
    if (hasActiveSubscription()) {
      toast.error("You already have an active subscription. Please wait for it to expire before purchasing a new plan.");
      return;
    }
    // setAmount(data?.amount);
    // setCurrency(data?.currency);
    // sePlanid(data?.plan_id);

    try {
      const orderData = {
        amount: data.amount,
        currency: data.currency,
        plan_id: data.plan_id,
        ip_address: ipData?.ip,
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
            try {
              const res = await dispatch(verifyOrder(userData));
              console.log("verifyOrder response:", res);
              toast.success("Payment Successful");
              dispatch(currentSubscription(ipData?.ip));
            } catch (err) {
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
        toast.error("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Error in payment process:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  console.log("ipdata", ipData)
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
  useEffect(() => {
    dispatch(currentSubscription(ipData?.ip))
      .then((res) => {
        console.log("checkSubscription", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [ipData]);

  return (
    <>
      <div className="key_benefits_section pt-10 lg:pt-0 pb-10">
        <div className="purchase_section py-8 lg:py-20 px-0 lg:px-0">
          <div className="max-w-6xl mx-auto">
            <ToastContainer />
            {/* <div className="text-center mb-10 lg:mb-10">
                                 <h2 className="text-2xl lg:text-[60px] lg:leading-[70px] text-black font-bold mb-2 lg:mb-6">Find Your <span>Perfect Plan</span></h2>
                                 <p className="text-[#4C4B4B] text-base lg:text-[18px] leading-[30px] lg:px-32">Discover the ideal plan to fuel your business growth. Our pricing options are carefully crafted to cater to businesses.</p>
                              </div> */}
            {/* Current Subscription Message */}
            {hasActiveSubscription() && getCurrentActiveSubscription() && (
              <div className="mb-6 mx-4 lg:mx-0">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        You have an active subscription
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          <strong>Plan:</strong> {getCurrentActiveSubscription().Plan?.plan_name}
                        </p>
                        <p>
                          <strong>Valid until:</strong> {new Date(getCurrentActiveSubscription().end_date).toLocaleDateString()}
                        </p>
                        <p>
                          <strong>Features:</strong> {getCurrentActiveSubscription().Plan?.PlanAccess?.map(access => access.plan_access_description).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Show Last Plan when no subscription exists */}
            {!hasActiveSubscription() && !currentSubscriptionData?.data?.length && (
              <div className="mb-6 mx-4 lg:mx-0 px-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Currently Active Plan: Free Plan
                      </h3>
                      <p className="text-sm text-blue-700">
                        Choose from our available plans below to get started
                      </p>
                    </div>
                  </div>

                  {/* Show last plan for each frequency type */}
                  {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {parsed?.signup_type_id == 1 && getLastPlan(1) && (
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-gray-900 mb-2">Free Plan</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {getLastPlan(1)?.planPrice?.currency} {getLastPlan(1)?.planPrice?.price}
                        </p>
                        <div className="text-xs text-gray-500">
                          {getLastPlan(1)?.PlanAccess?.slice(0, 2).map(access => access.plan_access_description).join(', ')}
                          {getLastPlan(1)?.PlanAccess?.length > 2 && '...'}
                        </div>
                      </div>
                    )}
                    {parsed?.signup_type_id == 2 && getLastPlan(12) && (
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <h4 className="font-medium text-gray-900 mb-2">Free Plan</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {getLastPlan(12)?.planPrice?.currency} {getLastPlan(12)?.planPrice?.price}
                        </p>
                        <div className="text-xs text-gray-500">
                          {getLastPlan(12)?.PlanAccess?.slice(0, 2).map(access => access.plan_access_description).join(', ')}
                          {getLastPlan(12)?.PlanAccess?.length > 2 && '...'}
                        </div>
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            )}

            <div className="subscription_tab_section inner_plan">
              <Tabs>
                <TabList>
                  {parsed?.signup_type_id == 1 && (
                    <>
                      <Tab>Build</Tab>
                      <Tab>Break Through</Tab>
                    </>
                  )}
                  {parsed?.signup_type_id == 2 && <Tab>Institution</Tab>}
                </TabList>

                {parsed?.signup_type_id == 1 && (
                  <>
                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                        {plans?.data
                          ?.filter((pln) => pln?.plan_frequency === 1)
                          .map((pln, index) => {
                            return (
                              <div key={index}>
                                {renderPlanCard(pln)}
                              </div>
                            );
                          })}


                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                        {plans?.data
                          ?.filter((pln) => pln?.plan_frequency === 3)
                          .map((pln, index) => {
                            return (
                              <div key={index}>
                                {renderPlanCard(pln)}
                              </div>
                            );
                          })}
                      </div>
                    </TabPanel>
                  </>
                )}


                {parsed?.signup_type_id == 2 && (
                  <>
                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5 mx-4 lg:mx-0">
                        {plans?.data
                          ?.filter((pln) => pln?.plan_frequency === 12)
                          .map((pln, index) => {
                            return (
                              <div key={index}>
                                {renderPlanCard(pln)}
                              </div>
                            );
                          })}


                      </div>
                    </TabPanel>
                  </>
                )}
              </Tabs>
            </div>
          </div>
        </div>
        {openCouponModal && (
          <CouponModal
            isOpen={openCouponModal}
            onClose={() => setOpenCouponModal(false)}
            amount={amount}
            currency={currency}
            plan_id={plan_id}
            ip={ipData?.ip}
            onPayment={handlePaymentModal} // existing function to call Razorpay
          />

        )}

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
