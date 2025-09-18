"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder } from "../reducers/PlanSlice";

// Utility: load Razorpay checkout script once
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

export default function RazorpayCheckout({
  setErrorMessage,
  currency,
  amount,
  plan_id,
  errorMessage,
}) {
  const dispatch = useDispatch();
  const { loading, createOrderData, error } = useSelector((state) => state.planst);

  // Create Razorpay order using Redux
  const createOrderAction = useCallback(async () => {
    const orderData = {
      // amount: Math.round(amount * 100), // paise
      amount,
      currency,
      plan_id,
    };
    
    const result = await dispatch(createOrder(orderData));
    
    // if (createOrder.fulfilled.match(result)) {
    //   return result.payload;
    // } else {
    //   throw new Error(result.payload || "Failed to create Razorpay order");
    // }
  }, [dispatch, amount, currency, plan_id]);

  const handlePay = async (e) => {
    e.preventDefault();
    setErrorMessage(undefined);

    try {
      console.log("Starting payment process...");
      console.log("Amount:", amount, "Currency:", currency, "Plan ID:", plan_id);
      
      await loadRazorpayScript();
      console.log("Razorpay script loaded successfully");
      
      // Small delay to ensure script is fully loaded
      await new Promise(resolve => setTimeout(resolve, 100));

      const order = await createOrderAction();
      console.log("Order created:", order);

      // Check if Razorpay key is available
      const razorpayKey = process.env.RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        throw new Error("Razorpay key not found. Please check your environment variables.");
      }

      // Extract order details from the API response
      // The API response might be nested, so we need to access the correct properties
      const orderData = order.data || order;
      const orderId = orderData.id || orderData.order_id;
      let orderAmount = orderData.amount || orderData.amount_paid;
      const orderCurrency = orderData.currency || currency;

      // Convert amount to paise if needed (Razorpay expects amount in smallest currency unit)
      if (orderAmount && orderAmount < 100) {
        // If amount is less than 100, it's likely in rupees, convert to paise
        orderAmount = Math.round(orderAmount * 100);
      }

      console.log("Order details:", { orderId, orderAmount, orderCurrency });

      if (!orderId || !orderAmount) {
        throw new Error("Invalid order response: missing order ID or amount");
      }

      const options = {
        key: razorpayKey,
        amount: orderAmount,
        currency: orderCurrency,
        name: "Demo Store",
        description: `Plan ${plan_id}`,
        order_id: orderId,
        handler: function (response) {
          // response: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
          toast.success("Payment successful!");
          console.log("Payment success:", response);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      console.log("Razorpay options:", options);

      // Check if Razorpay is available
      if (typeof window.Razorpay === 'undefined') {
        throw new Error("Razorpay SDK not loaded properly. Please refresh the page and try again.");
      }

      console.log("Creating Razorpay instance...");
      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (err) {
        console.error("Payment failed:", err.error);
        setErrorMessage(err.error.description || "Payment failed");
        toast.error(err.error.description || "Payment failed");
      });

      console.log("Opening Razorpay modal...");
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      const msg = err.message || "Something went wrong";
      setErrorMessage(msg);
      toast.error(msg);
    }
  };


  useEffect(() => {
    loadRazorpayScript().catch(() => {});
  }, []);

  // Handle Redux errors
  useEffect(() => {
    if (error) {
      const errorMsg = typeof error === 'string' ? error : 'Something went wrong';
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    }
  }, [error, setErrorMessage]);

  return (
    <>
      <ToastContainer />
      {/* <form onSubmit={handlePay}>
        <button
          type="submit"
          className="w-full h-12 mt-1 mb-0 text-base text-white uppercase bg-[#626adf] rounded-full hover:bg-black disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Processing..." : `Pay ${currency} ${amount}`}
        </button>
        {errorMessage && (
          <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
        )}
       
        <div className="mt-2 text-xs text-gray-500">
          <p>Debug: Amount={amount}, Currency={currency}, Plan={plan_id}</p>
          <p>Razorpay Key: {process.env.RAZORPAY_KEY_ID ? 'Set' : 'Missing'}</p>
        </div>
      </form> */}
    </>
  );
}
