// "use client";
// import { useState, useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { applyCoupon, clearCouponState } from "../reducers/CouponSlice";
// import { createOrder } from "../reducers/PlanSlice";
// import { toast } from "react-toastify";

// const CouponModal = ({ isOpen, onClose, currency, plan_id, ip, onPayment }) => {
//   const dispatch = useDispatch();

//   // Coupon slice
//   const { appliedCoupon, loading: couponLoading, error: couponError } = useSelector(
//     (state) => state.coupon
//   );

//   // planst slice (matches your store)
//   const {
//     plans, // object, contains .data array
//     loading: orderLoading,
//     createOrderData,
//     error: orderError,
//   } = useSelector((state) => state.planst);

//   const [coupon, setCoupon] = useState("");
//   const [finalAmount, setFinalAmount] = useState(null);

//   // --- FIXED: read the array from plans.data and get planPrice.price
//   const selectedPlan = useMemo(() => {
//     // safety: plans may be undefined or plans.data may be undefined
//     const arr = plans?.data;
//     if (!arr || !Array.isArray(arr)) return null;
//     return arr.find((p) => p?.id === plan_id) || null;
//   }, [plans, plan_id]);

//   // Create order when modal opens and selectedPlan is available
//   useEffect(() => {
//     if (isOpen && selectedPlan) {
//       // get price from selectedPlan.planPrice.price (fallbacks handled)
//       const planPrice = Number(selectedPlan?.planPrice?.price ?? selectedPlan?.price ?? 0);

//       if (!planPrice || planPrice <= 0) {
//         toast.error("Invalid plan amount.");
//         return;
//       }

//       dispatch(
//         createOrder({
//           plan_id: plan_id,
//           ip_address: ip,
//           amount: planPrice,
//           currency: currency,
//         })
//       ).then((res) => {
//         if (res?.payload?.status_code === 200) {
//           const total = res?.payload?.order_details?.total_amount;
//           setFinalAmount(total);
//         } else {
//           toast.error(res?.payload?.message || "Failed to create order");
//         }
//       });
//     }
//   }, [isOpen, selectedPlan, dispatch, plan_id, ip, currency]);

//   // Apply coupon action
//   const handleApply = () => {
//     if (!coupon) {
//       toast.error("Enter a coupon code");
//       return;
//     }
//     if (!finalAmount) {
//       toast.error("Order not created yet");
//       return;
//     }

//     dispatch(
//       applyCoupon({
//         coupon_code: coupon,
//         order_amount: finalAmount,
//         currency,
//       })
//     );
//   };

//   // Handle coupon response
//   useEffect(() => {
//     if (appliedCoupon?.data) {
//       toast.success(appliedCoupon?.message || "Coupon applied successfully");
//       setFinalAmount(appliedCoupon.data.final_amount);
//       dispatch(clearCouponState());
//     }
//     if (couponError) {
//       toast.error(couponError);
//       dispatch(clearCouponState());
//     }
//   }, [appliedCoupon, couponError, dispatch]);

//   // Pay now -> call parent's onPayment with required fields
//   const handlePayNow = (e) => {
//     e.preventDefault();

//     if (!createOrderData) {
//       toast.error("Order not created yet");
//       return;
//     }

//     onPayment(e, {
//       amount: finalAmount,
//       currency,
//       plan_id,
//       orderId: createOrderData?.orderId,
//       key: createOrderData?.key,
//       transaction_id: createOrderData?.transaction_id,
//     });

//     onClose();
//   };

//   if (!isOpen) return null;

//   const order = createOrderData;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg p-6 w-[420px] shadow-lg">
//         <h2 className="text-lg font-semibold mb-4">Complete Payment</h2>

//         {orderLoading ? (
//           <p className="text-center text-gray-500">Creating order...</p>
//         ) : order ? (
//           <>
//             <div className="mb-4 border rounded p-3 bg-gray-50">
//               <p>
//                 Base Price: <strong>{currency} {order?.order_details?.base_amount}</strong>
//               </p>

//               {order?.order_details?.gst_applicable && (
//                 <p>
//                   GST ({order?.order_details?.gst_rate_percent}%):{" "}
//                   <strong>{currency} {Number(order?.order_details?.gst_amount).toFixed(2)}</strong>
//                 </p>
//               )}

//               <p className="border-t mt-2 pt-2 font-semibold">
//                 Total: <strong>{currency} {Number(order?.order_details?.total_amount).toFixed(2)}</strong>
//               </p>

//               {finalAmount != null && finalAmount !== order?.order_details?.total_amount && (
//                 <>
//                   <p className="text-green-700 mt-2">
//                     Discount: <strong>{currency} {(Number(order?.order_details?.total_amount) - Number(finalAmount)).toFixed(2)}</strong>
//                   </p>
//                   <p className="font-semibold">
//                     Final Payable: <strong>{currency} {Number(finalAmount).toFixed(2)}</strong>
//                   </p>
//                 </>
//               )}
//             </div>

//             <div className="mb-4">
//               <input
//                 type="text"
//                 value={coupon}
//                 onChange={(e) => setCoupon(e.target.value)}
//                 placeholder="Enter coupon code"
//                 className="w-full border rounded p-2 mb-2"
//               />
//               <button
//                 onClick={handleApply}
//                 className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
//                 disabled={couponLoading}
//               >
//                 {couponLoading ? "Applying..." : "Apply Coupon"}
//               </button>
//             </div>

//             <div className="flex justify-end gap-2 mt-4">
//               <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
//               <button onClick={handlePayNow} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//                 Pay Now {currency} {finalAmount != null ? Number(finalAmount).toFixed(2) : ""}
//               </button>
//             </div>
//           </>
//         ) : orderError ? (
//           <p className="text-center text-red-500">{orderError}</p>
//         ) : (
//           <p className="text-center text-gray-500">No order data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CouponModal;

"use client";
import { useState, useEffect, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, clearCouponState } from "../reducers/CouponSlice";
import { createOrder } from "../reducers/PlanSlice";
import { toast } from "react-toastify";

const CouponModal = ({ isOpen, onClose, currency, plan_id, ip, onPayment }) => {
  const dispatch = useDispatch();

  // Redux states
  const { appliedCoupon, loading: couponLoading, error: couponError } = useSelector(
    (state) => state.coupon
  );
  const { plans, createOrderData, loading } = useSelector((state) => state.planst);

  // Local states
  const [coupon, setCoupon] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);
  const [discountInfo, setDiscountInfo] = useState(null);
  const [couponMessage, setCouponMessage] = useState(null);

  // Find selected plan
  const selectedPlan = useMemo(() => {
    const arr = plans?.data;
    if (!arr || !Array.isArray(arr)) return null;
    return arr.find((p) => p?.id === plan_id) || null;
  }, [plans, plan_id]);

  // Base amount from plan
  useEffect(() => {
    if (selectedPlan) {
      const planPrice = Number(selectedPlan?.planPrice?.price ?? selectedPlan?.price ?? 0);
      setFinalAmount(planPrice);
    }
  }, [selectedPlan]);

  console.log('selectedPlan',selectedPlan)
  // Apply Coupon
  const handleApply = () => {
    if (!coupon) {
      setCouponMessage({ type: "error", text: "Enter a coupon code" });
      return;
    }
    if (!finalAmount) {
      setCouponMessage({ type: "error", text: "Invalid plan amount" });
      return;
    }

    setCouponMessage(null);
    dispatch(
      applyCoupon({
        coupon_code: coupon,
        order_amount: finalAmount,
        currency,
      })
    );
  };

  // Coupon Response Handling
  useEffect(() => {
    if (appliedCoupon?.data) {
      const data = appliedCoupon.data;

      setDiscountInfo({
        code: data.coupon_code,
        type: data.coupon_type,
        value: data.coupon_value,
        discount: data.discount_amount,
        savings: data.savings,
      });

      setFinalAmount(data.final_amount);
      setCouponMessage({
        type: "success",
        text: appliedCoupon.message || "Coupon applied successfully",
      });

      dispatch(clearCouponState());
    }

    if (couponError) {
      // ✅ Extract deep message from couponError.data if available
      let errMsg = "Something went wrong";
      try {
        if (Array.isArray(couponError?.data) && couponError.data.length > 0) {
          errMsg = couponError.data[0]?.message || errMsg;
        } else if (couponError?.message) {
          errMsg = couponError.message;
        } else if (typeof couponError === "string") {
          errMsg = couponError;
        }
      } catch {
        errMsg = "Invalid coupon";
      }

      setCouponMessage({ type: "error", text: errMsg });
      dispatch(clearCouponState());
    }
  }, [appliedCoupon, couponError, dispatch]);

  // Handle Payment (create order)
  const handlePayNow = (e) => {
    e.preventDefault();
    if (!selectedPlan) return toast.error("Plan not found");
    if (!finalAmount) return toast.error("Invalid amount");

    dispatch(
      createOrder({
        plan_id,
        ip_address: ip,
        amount: finalAmount,
        currency,
      })
    ).then((res) => {
      if (res?.payload?.status_code === 200) {
        const order = res.payload;
        toast.success("Order created successfully");

        onPayment(e, {
          amount: finalAmount,
          currency,
          plan_id,
          orderId: order?.orderId,
          key: order?.key,
          transaction_id: order?.transaction_id,
        });

        onClose();
      } else {
        toast.error(res?.payload?.message || "Failed to create order");
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="relative bg-white rounded-2xl p-6 w-[420px] shadow-2xl transition-all duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Complete Your Payment
        </h2>

        {selectedPlan ? (
          <>
            {/* Plan Summary */}
            <div className="mb-4 border rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600">
                Plan: <strong>{selectedPlan?.plan_name}</strong>
              </p>
              <p className="font-semibold mt-1">
                Price: {currency}{" "}
                {Number(selectedPlan?.planPrice?.price ?? selectedPlan?.price ?? 0).toFixed(2)}
              </p>

              {discountInfo && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-700 text-sm font-medium">
                    Coupon Applied: <strong>{discountInfo.code}</strong>
                  </p>
                  <p className="text-green-700 text-sm">
                    You saved{" "}
                    {discountInfo.type === "fixed_amount"
                      ? `${currency} ${discountInfo.value}`
                      : `${discountInfo.value}%`}
                    !
                  </p>
                </div>
              )}

              {finalAmount && (
                <p className="mt-3 font-semibold text-green-700">
                  Final Payable (without GST):{" "}
                  <strong>
                    {currency} {Number(finalAmount).toFixed(2)}
                  </strong>
                </p>
              )}
            </div>

            {/* Coupon Field */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Have a Coupon?</label>
              <div className="flex mt-1 gap-2">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  onClick={handleApply}
                  className=" cursor-pointer px-4 bg-[#000] text-white rounded-lg hover:bg-[#2c2b2b] transition disabled:opacity-50"
                  disabled={couponLoading}
                >
                  {couponLoading ? "..." : "Apply"}
                </button>
              </div>

              {/* Inline message (Success/Error) */}
              {couponMessage?.text && typeof couponMessage.text === "string" && (
                <p
                  className={`text-sm mt-2 ${
                    couponMessage.type === "error" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePayNow}
                className="cursor-pointer px-4 py-2 bg-[#800080] text-white rounded-lg hover:bg-[#b670b6] transition disabled:opacity-50"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : `Pay Now ${currency} ${Number(finalAmount).toFixed(2)}`}
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">Loading plan details...</p>
        )}
      </div>
    </div>
  );
};

export default CouponModal;
