"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { applyCoupon, clearCouponState } from "../reducers/CouponSlice";
import { currentSubscription } from "../reducers/PlanSlice";

const CouponModal = ({ isOpen, onClose, amount, currency, plan_id, planPrice, currentPlanPrice, ip, onPayment }) => {
  const dispatch = useDispatch();
  const { appliedCoupon, loading: couponLoading } = useSelector((state) => state.coupon || {});

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(Number(amount || 0));
  const [gstAmount, setGstAmount] = useState(0);
  const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => {
    dispatch(currentSubscription(ip));
  }, [dispatch, ip]);

  useEffect(() => {
    setFinalAmount(Number(amount || 0));
    setDiscountAmount(0);
    setCouponCode("");
    setConfirmCancel(false);
  }, [amount, plan_id]);

  useEffect(() => {
    setGstAmount(currency === "INR" ? (finalAmount * 18) / 100 : 0);
  }, [finalAmount, currency]);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    dispatch(
      applyCoupon({
        coupon_code: couponCode,
        order_amount: amount,
        currency,
      })
    ).then((res) => {
      if (res?.payload?.status_code === 200 && res.payload?.data) {
        const data = res.payload.data;
        let discount = 0;
        if (data.coupon_type === "percentage") discount = (amount * Number(data.coupon_value)) / 100;
        else if (data.coupon_type === "fixed_amount") discount = Number(data.coupon_value);
        const newFinal = Number((amount - discount).toFixed(2));
        setDiscountAmount(discount);
        setFinalAmount(newFinal >= 0 ? newFinal : 0);
        toast.success("Coupon applied");
      } else toast.error(res?.payload?.message || "Invalid coupon");
      dispatch(clearCouponState());
    });
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscountAmount(0);
    setFinalAmount(Number(amount || 0));
    dispatch(clearCouponState());
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    if (!plan_id) return toast.error("Plan not found");
    if (finalAmount < 0) return toast.error("Invalid amount");

    if (currentPlanPrice > 0 && !confirmCancel) {
      return toast.error("Please confirm that you want to cancel your current plan.");
    }

    const paymentData = {
      amount: Number(finalAmount.toFixed(2)),
      currency,
      plan_id,
      planPrice,
      cancelCurrentPlan: confirmCancel,
    };

    onPayment(e, paymentData);
    onClose();
  };

  if (!isOpen) return null;

  const totalPayable = Number((finalAmount + gstAmount).toFixed(2));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="relative bg-white rounded-2xl p-6 w-[420px] shadow-2xl transition-all duration-300">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <IoClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Complete Your Payment</h2>

        <div className="mb-4 border rounded-lg p-4 bg-gray-50 space-y-2">
          <div className="flex justify-between">
            <span>Base Payable:</span>
            <span>{currency} {Number(amount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%):</span>
            <span>{currency} {gstAmount.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Discount ({couponCode.toUpperCase()}):</span>
              <span>- {currency} {discountAmount.toFixed(2)}</span>
            </div>
          )}
          {currentPlanPrice > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <input type="checkbox" id="confirmCancel" checked={confirmCancel} onChange={(e) => setConfirmCancel(e.target.checked)} className="w-4 h-4"/>
              <label htmlFor="confirmCancel" className="text-sm text-gray-700">I want to cancel my current plan and switch to this plan</label>
            </div>
          )}
          <div className="flex justify-between font-semibold text-[#92278F] border-t pt-2">
            <span>Total Payable:</span>
            <span>{currency} {totalPayable.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input type="text" placeholder="Enter coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 border rounded-md px-3 py-2"/>
          {discountAmount <= 0 && <button onClick={handleApplyCoupon} className="px-5 py-2 bg-black text-white rounded-md">{couponLoading ? "Checking..." : "Apply"}</button>}
        </div>

        {discountAmount > 0 && (
          <div className="mt-2 p-2 bg-green-50 border border-green-300 rounded-md flex justify-between items-center">
            <div className="text-green-700 font-medium">Coupon Applied: {couponCode}</div>
            <button onClick={handleRemoveCoupon} className="text-red-500 text-sm hover:underline">✖ Remove</button>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button onClick={handlePayNow} className="px-5 py-2 bg-[#800080] text-white rounded-lg hover:bg-[#b670b6]">
            Pay {currency} {totalPayable.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponModal;



// 2nd option 
// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { applyCoupon, clearCouponState } from "../reducers/CouponSlice";
// import { createOrder, currentSubscription, upgradePlanOrder } from "../reducers/PlanSlice";

// const CouponModal = ({ isOpen, onClose, amount, currency, plan_id, planPrice, ip, onPayment, currentPlanPrice }) => {
//   const dispatch = useDispatch();
//   const { appliedCoupon, loading: couponLoading, error: couponError } = useSelector(
//     (state) => state.coupon || {}
//   );
//   const { plans, loading: plansLoading, currentSubscriptionData } = useSelector(
//     (state) => state.planst || {}
//   );

//   console.log('currentPlanPrice', currentPlanPrice)
//   const [couponCode, setCouponCode] = useState("");
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(Number(amount || 0));
//   const [gstAmount, setGstAmount] = useState(0);
  

//   useEffect(() => {
//     // fetch latest subscription info (optional)
//     dispatch(currentSubscription(ip));
//   }, [dispatch, ip]);

//   // whenever base amount changes, reset coupon fields
//   useEffect(() => {
//     setFinalAmount(Number(amount || 0));
//     setDiscountAmount(0);
//     setCouponCode("");
//   }, [amount, plan_id]);

//   // GST calculation (only for INR in this example)
//   useEffect(() => {
//     if (currency === "INR") {
//       setGstAmount((finalAmount * 18) / 100);
//     } else {
//       setGstAmount(0);
//     }
//   }, [finalAmount, currency]);

//   const handleApplyCoupon = () => {
//     if (!couponCode.trim()) return;
//     dispatch(
//       applyCoupon({
//         coupon_code: couponCode,
//         order_amount: amount,
//         currency,
//       })
//     ).then((res) => {
//       if (res?.payload?.status_code === 200 && res.payload?.data) {
//         const data = res.payload.data;
//         let discount = 0;
//         if (data.coupon_type === "percentage") {
//           discount = (amount * Number(data.coupon_value)) / 100;
//         } else if (data.coupon_type === "fixed_amount") {
//           discount = Number(data.coupon_value);
//         }
//         const newFinal = Number((amount - discount).toFixed(2));
//         setDiscountAmount(discount);
//         setFinalAmount(newFinal >= 0 ? newFinal : 0);
//         toast.success("Coupon applied");
//       } else {
//         toast.error(res?.payload?.message || "Invalid coupon");
//       }
//       dispatch(clearCouponState());
//     }).catch((err) => {
//       console.error("Coupon apply error", err);
//       toast.error("Failed to apply coupon");
//       dispatch(clearCouponState());
//     });
//   };

//   const handleRemoveCoupon = () => {
//     setCouponCode("");
//     setDiscountAmount(0);
//     setFinalAmount(Number(amount || 0));
//     dispatch(clearCouponState());
//   };

//   const handlePayNow = (e) => {
//     e.preventDefault();

//     if (!plan_id) return toast.error("Plan not found");
//     if (finalAmount < 0) return toast.error("Invalid amount");

//     // Build data object for parent handler (parent will decide upgrade vs create)
//     const paymentData = {
//       amount: Number(finalAmount.toFixed(2)),
//       currency,
//       plan_id,
//       planPrice: Number(planPrice || 0), // send full plan price so parent can determine upgrade vs new
//     };

//     onPayment(e, paymentData);
//     onClose();
//   };

//   if (!isOpen) return null;

//   const totalPayable = Number((finalAmount + gstAmount).toFixed(2));

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="relative bg-white rounded-2xl p-6 w-[420px] shadow-2xl transition-all duration-300">
//         <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
//           <IoClose size={24} />
//         </button>

//         <h2 className="text-xl font-semibold mb-4 text-center">Complete Your Payment</h2>

//         <div className="mb-4 border rounded-lg p-4 bg-gray-50 space-y-2">
//           {planPrice > 0 && (
//             <>
//               {/* New plan price */}
//               <div className="flex justify-between">
//                 <span className="text-gray-600">New Plan Amount:</span>
//                 <span className="font-medium text-gray-800">
//                   {currency} {Number(planPrice).toFixed(2)}
//                 </span>
//               </div>


//               {/* Payable difference */}
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Base Payable:</span>
//                 <span className="font-semibold text-[#92278F]">
//                   {currency} {Number(amount).toFixed(2)}
//                 </span>
//               </div>
//             </>
//           )}


//           {planPrice === 0 && (
//             <div className="flex justify-between">
//               <span>Base Price:</span>
//               <span>{currency} {Number(amount).toFixed(2)}</span>
//             </div>
//           )}

//           <div className="flex justify-between">
//             <span>GST (18%):</span>
//             <span>{currency} {gstAmount.toFixed(2)}</span>
//           </div>

//           {discountAmount > 0 && (
//             <div className="flex justify-between text-green-700">
//               <span>Discount ({couponCode.toUpperCase()}):</span>
//               <span>- {currency} {discountAmount.toFixed(2)}</span>
//             </div>
//           )}

//           <div className="flex justify-between font-semibold text-[#92278F] border-t pt-2">
//             <span>Total Payable:</span>
//             <span>{currency} {totalPayable.toFixed(2)}</span>
//           </div>
//         </div>

//         <div className="mb-4">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter coupon code"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//               disabled={couponLoading || discountAmount > 0}
//               className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/40"
//             />
//             {discountAmount <= 0 && (
//               <button
//                 type="button"
//                 onClick={handleApplyCoupon}
//                 disabled={couponLoading}
//                 className="px-5 py-2 bg-black text-white rounded-md hover:opacity-90 transition-all whitespace-nowrap"
//               >
//                 {couponLoading ? "Checking..." : "Apply"}
//               </button>
//             )}
//           </div>

//           {discountAmount > 0 && (
//             <div className="mt-2 p-2 bg-green-50 border border-green-300 rounded-md flex justify-between items-center">
//               <div className="text-green-700 font-medium">Coupon Applied: {couponCode}</div>
//               <button onClick={handleRemoveCoupon} className="text-red-500 text-sm hover:underline">✖ Remove</button>
//             </div>
//           )}

//           {couponError && (
//             <p className="text-red-500 text-sm mt-1">
//               {typeof couponError === "string" ? couponError : couponError?.message || "Invalid coupon"}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-end mt-4">
//           <button
//             onClick={handlePayNow}
//             className="px-5 py-2 bg-[#800080] text-white rounded-lg hover:bg-[#b670b6] transition disabled:opacity-50"
//             disabled={plansLoading}
//           >
//             {plansLoading ? "Processing..." : `Pay ${currency} ${totalPayable.toFixed(2)}`}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CouponModal;


// 1st option problem width update dowangrade
// "use client";
// import { useState, useEffect, useMemo } from "react";
// import { IoClose } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { applyCoupon, clearCouponState } from "../reducers/CouponSlice";
// import { createOrder, currentSubscription, upgradePlanOrder } from "../reducers/PlanSlice";
// import { toast } from "react-toastify";

// const CouponModal = ({ isOpen, onClose, currency, plan_id, ip, onPayment }) => {
//   const dispatch = useDispatch();

//   const { appliedCoupon, loading: couponLoading, error: couponError } = useSelector(
//     (state) => state.coupon || {}
//   );
//   const { plans, loading, currentSubscriptionData } = useSelector(
//     (state) => state.planst || {}
//   );

//   const [couponCode, setCouponCode] = useState("");
//   const [discountAmount, setDiscountAmount] = useState(0);
//   const [finalAmount, setFinalAmount] = useState(0);
//   const [gstAmount, setGstAmount] = useState(0);

//   console.log("currentSubscriptionData", currentSubscriptionData);

//   // ✅ Fetch current subscription
//   useEffect(() => {
//     dispatch(currentSubscription());
//   }, [dispatch]);

//   // ✅ Find selected plan
//   const selectedPlan = useMemo(() => {
//     const arr = plans?.data;
//     if (!arr || !Array.isArray(arr)) return null;
//     return arr.find((p) => p?.id === plan_id) || null;
//   }, [plans, plan_id]);

//   // ✅ Current subscription plan price (if any)
//   const subscriptionPrice = useMemo(() => {
//     const current = currentSubscriptionData?.data?.[0];
//     if (current?.Plan?.planPrice?.price) {
//       return Number(current.Plan.planPrice.price);
//     }
//     return 0;
//   }, [currentSubscriptionData]);

//   // ✅ Calculate base price with downgrade/upgrade logic
//   const basePrice = useMemo(() => {
//     const selectedPrice = Number(selectedPlan?.planPrice?.price ?? selectedPlan?.price ?? 0);

//     // 🟩 If user already has a subscription, subtract current plan price (upgrade case)
//     if (subscriptionPrice > 0 && selectedPrice > subscriptionPrice) {
//       return selectedPrice - subscriptionPrice;
//     }

//     // 🟥 If user tries to downgrade (smaller plan), show warning
//     if (subscriptionPrice > 0 && selectedPrice < subscriptionPrice) {
//       toast.warning("You are downgrading from your current plan.");
//       return selectedPrice; // keep it as-is or make 0 if needed
//     }

//     return selectedPrice;
//   }, [selectedPlan, subscriptionPrice]);

//   // ✅ Reset price when plan changes
//   useEffect(() => {
//     if (selectedPlan) {
//       setFinalAmount(basePrice);
//       setDiscountAmount(0);
//       setCouponCode("");
//     }
//   }, [selectedPlan, basePrice]);

//   // ✅ GST calculation
//   useEffect(() => {
//     if (currency === "INR") {
//       setGstAmount((finalAmount * 18) / 100);
//     } else {
//       setGstAmount(0);
//     }
//   }, [finalAmount, currency]);

//   // ✅ Apply coupon
//   const handleApplyCoupon = () => {
//     if (!couponCode.trim()) return;

//     dispatch(
//       applyCoupon({
//         coupon_code: couponCode,
//         order_amount: basePrice,
//         currency,
//       })
//     ).then((res) => {
//       if (res?.payload?.status_code === 200 && res.payload?.data) {
//         const data = res.payload.data;
//         let discount = 0;

//         if (data.coupon_type === "percentage") {
//           discount = (basePrice * Number(data.coupon_value)) / 100;
//         } else if (data.coupon_type === "fixed_amount") {
//           discount = Number(data.coupon_value);
//         }

//         setDiscountAmount(discount);
//         setFinalAmount(basePrice - discount);
//       } else {
//         setDiscountAmount(0);
//         setFinalAmount(basePrice);
//         toast.error(res?.payload?.message || "Invalid coupon");
//       }

//       dispatch(clearCouponState());
//     });
//   };

//   // ✅ Remove coupon
//   const handleRemoveCoupon = () => {
//     setCouponCode("");
//     setDiscountAmount(0);
//     setFinalAmount(basePrice);
//     dispatch(clearCouponState());
//   };

//   // ✅ Handle Pay Now
// const handlePayNow = (e) => {
//   e.preventDefault();
//   if (!selectedPlan) return toast.error("Plan not found");

//   const hasSubscription = currentSubscriptionData?.data?.[0];
//   const isUpgrade = hasSubscription && subscriptionPrice > 0;

//   const orderData = {
//     amount: finalAmount, // discounted amount
//     currency,
//     ip_address: ip,
//   };

//   // ✅ If user already has a plan → upgrade flow
//   if (isUpgrade) {
//     orderData.current_plan_id = hasSubscription.Plan?.id;
//     orderData.new_plan_id = plan_id;

//     dispatch(upgradePlanOrder(orderData)).then((res) => {
//       if (res?.payload?.status_code === 201) {
//         const order = res.payload;
//         onPayment(e, {
//           amount: finalAmount,
//           currency,
//           plan_id,
//           orderId: order?.orderId,
//           key: order?.key,
//           transaction_id: order?.transaction_id,
//         });
//         onClose();
//       } else {
//         toast.error(res?.payload?.message || "Failed to create upgrade order");
//       }
//     });
//   }

//   // ✅ If user has no subscription → normal order flow
//   else {
//     dispatch(
//       createOrder({
//         plan_id,
//         ip_address: ip,
//         amount: finalAmount,
//         currency,
//       })
//     ).then((res) => {
//       if (res?.payload?.status_code === 200) {
//         const order = res.payload;
//         onPayment(e, {
//           amount: finalAmount,
//           currency,
//           plan_id,
//           orderId: order?.orderId,
//           key: order?.key,
//           transaction_id: order?.transaction_id,
//         });
//         onClose();
//       } else {
//         toast.error(res?.payload?.message || "Failed to create order");
//       }
//     });
//   }
// };


//   if (!isOpen) return null;

//   const totalPrice = finalAmount + gstAmount;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
//       <div className="relative bg-white rounded-2xl p-6 w-[420px] shadow-2xl transition-all duration-300">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
//         >
//           <IoClose size={24} />
//         </button>

//         <h2 className="text-xl font-semibold mb-4 text-center">
//           Complete Your Payment
//         </h2>

//         {selectedPlan ? (
//           <>
//             {/* 🔹 Price Breakdown */}
//            {/* 🔹 Price Breakdown */}
// <div className="mb-4 border rounded-lg p-4 bg-gray-50 space-y-2">
//   {/* ✅ If user already has a plan */}
//   {subscriptionPrice > 0 && (
//     <>
//       <div className="flex justify-between">
//         <span className="text-gray-600">Current Plan Amount:</span>
//         <span className="font-medium text-gray-800">
//           {currency} {subscriptionPrice.toFixed(2)}
//         </span>
//       </div>
//       <div className="flex justify-between">
//         <span className="text-gray-600">New Plan Amount:</span>
//         <span className="font-medium text-gray-800">
//           {currency} {(Number(selectedPlan?.planPrice?.price ?? selectedPlan?.price) || 0).toFixed(2)}
//         </span>
//       </div>
//       <div className="flex justify-between border-b pb-2">
//         <span className="text-gray-600">Upgrade Base Amount:</span>
//         <span className="font-semibold text-[#92278F]">
//           {currency} {basePrice.toFixed(2)}
//         </span>
//       </div>
//     </>
//   )}

//   {/* ✅ Base & GST */}
//   {subscriptionPrice === 0 && (
//     <div className="flex justify-between">
//       <span>Base Price:</span>
//       <span>
//         {currency} {basePrice.toFixed(2)}
//       </span>
//     </div>
//   )}

//   <div className="flex justify-between">
//     <span>GST (18%):</span>
//     <span>
//       {currency} {gstAmount.toFixed(2)}
//     </span>
//   </div>

//   {discountAmount > 0 && (
//     <div className="flex justify-between text-green-700">
//       <span>Discount ({couponCode.toUpperCase()}):</span>
//       <span>
//         - {currency} {discountAmount.toFixed(2)}
//       </span>
//     </div>
//   )}

//   <div className="flex justify-between font-semibold text-[#92278F] border-t pt-2">
//     <span>Total Payable:</span>
//     <span>
//       {currency} {(finalAmount + gstAmount).toFixed(2)}
//     </span>
//   </div>
// </div>


//             {/* 🔹 Coupon Field */}
//             <div className="mb-4">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter coupon code"
//                   value={couponCode}
//                   onChange={(e) => setCouponCode(e.target.value)}
//                   disabled={couponLoading || discountAmount > 0}
//                   className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-black/40"
//                 />
//                 {discountAmount <= 0 && (
//                   <button
//                     type="button"
//                     onClick={handleApplyCoupon}
//                     disabled={couponLoading}
//                     className="px-5 py-2 bg-black text-white rounded-md hover:opacity-90 transition-all whitespace-nowrap"
//                   >
//                     {couponLoading ? "Checking..." : "Apply"}
//                   </button>
//                 )}
//               </div>

//               {discountAmount > 0 && (
//                 <div className="mt-2 p-2 bg-green-50 border border-green-300 rounded-md flex justify-between items-center">
//                   <div className="text-green-700 font-medium">
//                     Coupon Applied: {couponCode}
//                   </div>
//                   <button
//                     onClick={handleRemoveCoupon}
//                     className="text-red-500 text-sm hover:underline"
//                   >
//                     ✖ Remove
//                   </button>
//                 </div>
//               )}

//               {couponError && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {typeof couponError === "string"
//                     ? couponError
//                     : couponError?.message || "Invalid coupon"}
//                 </p>
//               )}
//             </div>

//             {/* 🔹 Pay Button */}
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={handlePayNow}
//                 className="px-5 py-2 bg-[#800080] text-white rounded-lg hover:bg-[#b670b6] transition disabled:opacity-50"
//                 disabled={loading}
//               >
//                 {loading ? "Processing..." : "Pay Now"}
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-center text-gray-500">Loading plan details...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CouponModal;

