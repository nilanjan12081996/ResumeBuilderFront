"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import sub01 from "../../app/assets/imagesource/sub01.png";
import sub02 from "../../app/assets/imagesource/sub02.png";
import Check from "../../app/assets/imagesource/Check.png";

import CouponModal from "../modal/CouponModal";

import {
  createOrder,
  verifyOrder,
  currentSubscription,
  getIpData,
  getPlans,
  cancelSubscription,
} from "../reducers/PlanSlice";

const Page = () => {
  const dispatch = useDispatch();
  const { plans, ipData, currentSubscriptionData } = useSelector(
    (state) => state.planst || {}
  );

  // const usertypeId = sessionStorage.getItem("signup_type_id");c
   const usertypeId = localStorage.getItem("signup_type_id");
  const parsed = usertypeId ? JSON.parse(usertypeId) : null;

  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [couponModalData, setCouponModalData] = useState({
    amount: 0,
    currency: "INR",
    plan_id: null,
    planPrice: 0,
    currentPlanPrice: 0,
  });

  const hasActiveSubscription = () => {
    if (!currentSubscriptionData?.data?.length) return false;
    const now = new Date();
    return currentSubscriptionData.data.some((sub) => {
      const end = new Date(sub.end_date);
      return sub.status === 1 && end > now;
    });
  };

  const getCurrentActiveSubscription = () => {
    if (!currentSubscriptionData?.data?.length) return null;
    const now = new Date();
    return currentSubscriptionData.data.find((sub) => {
      const end = new Date(sub.end_date);
      return sub.status === 1 && end > now;
    });
  };

  const computeButtonState = (pln) => {
    const active = getCurrentActiveSubscription();
    const activePrice = Number(active?.Plan?.planPrice?.price || 0);
    const thisPrice = Number(pln?.planPrice?.price || 0);

    if (active && active.Plan?.id === pln?.id) {
      return { label: "Current Plan", disabled: true };
    }

    if (hasActiveSubscription()) {
      if (thisPrice < activePrice) return { label: "Downgrade", disabled: false };
      if (thisPrice > activePrice) return { label: "Upgrade", disabled: false };
      return { label: "Same Tier", disabled: true };
    }

    return { label: "Get Started", disabled: false };
  };

  const handlePlanClick = (e, pln) => {
    e.preventDefault();
    const active = getCurrentActiveSubscription();
    const activePrice = Number(active?.Plan?.planPrice?.price || 0);
    const thisPrice = Number(pln?.planPrice?.price || 0);

    if (active && active.Plan?.id === pln?.id) {
      toast.info("You are already on this plan.");
      return;
    }

    const payable = Number(thisPrice.toFixed(2));


    setCouponModalData({
      amount: payable,
      currency: pln?.planPrice?.currency || "INR",
      plan_id: pln?.id,
      planPrice: thisPrice,
      currentPlanPrice: activePrice,
    });

    setOpenCouponModal(true);
  };

  const loadRazorpayScript = (() => {
    let loaded;
    return () =>
      loaded ||
      (loaded = new Promise((resolve, reject) => {
        if (typeof window === "undefined") return resolve(false);
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
    e.preventDefault();
    const ip = ipData?.ip || "";
    const active = getCurrentActiveSubscription();
    const activePlanId = active?.Plan?.id || null;
    const newPlanPrice = Number(data?.planPrice ?? data?.amount ?? 0);
    const payableAmount = Number(data.amount || 0);

    try {
      await loadRazorpayScript();

      // If user confirmed cancel, call cancel-subscription first
      if (data.cancelCurrentPlan && activePlanId) {
        await dispatch(cancelSubscription({ ip_address: ipData.ip }));
      }

      // Then create new order
      const orderData = {
        amount: payableAmount,
        currency: data.currency,
        plan_id: data.plan_id,
        ip_address: ip,
        coupon_code: data.coupon_code,
        coupon_id: data.coupon_id,
        original_amount: data.original_amount,
        discount_amount: data.discount_amount,
        final_amount: data.final_amount,
      };

      const result = await dispatch(createOrder(orderData));
      if (!createOrder.fulfilled.match(result)) {
        toast.error(result?.payload?.message || "Failed to create order.");
        return;
      }

      const orderResponse = result.payload;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(payableAmount * 100),
        currency: data.currency,
        name: "ResumeMile",
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
            await dispatch(verifyOrder(userData));
            toast.success("Payment Successful");
            dispatch(currentSubscription(ip));
          } catch (err) {
            toast.error("Payment verification failed.");
          }
        },
        theme: { color: "#3399cc" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      toast.error("Something went wrong during payment.");
    }
  };

  useEffect(() => {
    dispatch(getIpData()).then((res) => {
      if (res?.payload?.ip) {
        dispatch(
          getPlans({
            plan_type: parsed?.signup_type_id,
            ip_address: res.payload.ip,
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    if (ipData?.ip) dispatch(currentSubscription(ipData.ip));
  }, [ipData]);

  const renderPlanCard = (pln) => {
    const btnState = computeButtonState(pln);
    const thisPrice = Number(pln?.planPrice?.price || 0);

    return (
      <div
        key={pln?.id}
        className={`pt-0 border rounded-[26px] bg-white ${pln?.id === 3 || pln?.id === 12 ? "border-[#800080]" : "border-[#e9edff]"
          }`}
      >
        <div className="py-8 px-6 relative min-h-[740px]">
          <div className="flex items-center justify-between mb-6">
            {pln?.plan_name === "Gold" || pln?.plan_name === "Campus Plus" ? (
              <Image src={sub02} alt="sub02" />
            ) : (
              <Image src={sub01} alt="sub01" />
            )}

            {(pln?.id === 3 || pln?.id === 12) && (
              <div className="bg-[#a536a2] px-3 py-2 rounded-[5px] text-xs text-white">
                Most Popular
              </div>
            )}
          </div>

          <h3 className="text-[20px] leading-[28px] text-[#1B223C] font-medium">{pln?.plan_name}</h3>
          <p className="pb-6 text-[#1B223C]">{pln?.placeholder}</p>

          <div className="flex items-center gap-2 mb-8">
            <p className="text-[#1D2127] text-[25px] leading-[35px] font-medium">
              {pln?.planPrice?.currency} {thisPrice.toFixed(2)}
            </p>

            {thisPrice > 0 && (
              <div className="flex flex-col items-start pt-1">
                <p className="text-[#797878] text-[14px] line-through">
                  {pln?.planPrice?.currency} {(thisPrice * 1.3).toFixed(2)}
                </p>
                <span className="text-[#30B980] text-[12px] font-medium mt-[2px]">30% OFF</span>
              </div>
            )}
          </div>

          <div className="mb-14 border-t border-[#edf0ff] pt-8">
            {pln?.PlanAccess?.map((pAccess, accessIndex) => (
              <div key={accessIndex} className="flex gap-1 text-[#1B223C] text-[13px] mb-2">
                <Image src={Check} alt="Check" className="w-[14px] h-[14px] mr-2" />
                {pAccess?.plan_access_description}
              </div>
            ))}
          </div>

          <div className="absolute left-0 bottom-[20px] w-full px-6">
            <button
              onClick={(e) => handlePlanClick(e, pln)}
              disabled={btnState.disabled}
              className={`text-[14px] leading-[40px] rounded-md w-full block transition-all duration-300 ${btnState.disabled
                ? "bg-green-100 text-green-700 border border-green-300 cursor-not-allowed"
                : "bg-white text-[#1B223C] border border-[#1B223C] hover:bg-[#1B223C] hover:text-white"
                }`}
            >
              {btnState.label}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="key_benefits_section pt-[4px] pb-10">
        <div className="purchase_section py-8 lg:py-20">
          <div className="max-w-6xl mx-auto">
            {/* ACTIVE SUBSCRIPTION NOTICE */}
            {hasActiveSubscription() && getCurrentActiveSubscription() && (
              <div className="mb-6 mx-4 lg:mx-0">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        You have an active subscription                     </h3>
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

            {/* TABS SECTION */}
            <div className="subscription_tab_section inner_plan">
              <Tabs>
                <TabList>
                  {parsed?.signup_type_id === 1 && (
                    <>
                      <Tab>Build</Tab>
                      <Tab>Break Through</Tab>
                    </>
                  )}
                  {parsed?.signup_type_id === 2 && <Tab>Institution</Tab>}
                </TabList>

                {/* SIGNUP TYPE 1 → TWO TABS */}
                {parsed?.signup_type_id === 1 && (
                  <>
                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5">
                        {plans?.data?.filter((pln) => pln?.plan_frequency === 1).map((pln) => renderPlanCard(pln))}
                      </div>
                    </TabPanel>

                    <TabPanel>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5">
                        {plans?.data?.filter((pln) => pln?.plan_frequency === 3).map((pln) => renderPlanCard(pln))}
                      </div>
                    </TabPanel>
                  </>
                )}

                {/* SIGNUP TYPE 2 → ONE TAB */}
                {parsed?.signup_type_id === 2 && (
                  <TabPanel>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 bg-white rounded-4xl p-5">
                      {plans?.data?.filter((pln) => pln?.plan_frequency === 12).map((pln) => renderPlanCard(pln))}
                    </div>
                  </TabPanel>
                )}
              </Tabs>
            </div>
          </div>
        </div>

        {openCouponModal && (
          <CouponModal
            isOpen={openCouponModal}
            onClose={() => setOpenCouponModal(false)}
            amount={couponModalData.amount}
            currency={couponModalData.currency}
            plan_id={couponModalData.plan_id}
            planPrice={couponModalData.planPrice}
            currentPlanPrice={couponModalData.currentPlanPrice}
            ip={ipData?.ip}
            onPayment={handlePaymentModal}
          />
        )}
      </div>
    </>
  );
};

export default Page;
