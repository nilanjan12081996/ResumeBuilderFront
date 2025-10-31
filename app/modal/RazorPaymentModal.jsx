"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CheckoutForm from "./CheckoutForm";
import RazorpayCheckout from "./RazorpayCheckout";
import { createOrder } from "../reducers/PlanSlice";

const RazorPaymentModal = ({
  openPaymentModal,
  setOpenPaymentModal,
  amount,
  currency,
  plan_id
}) => {
  const dispatch = useDispatch();
  const [stripePromise, setStripePromise] = useState(null);
  const [options, setOptions] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch order details when modal opens
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (openPaymentModal && plan_id) {
        try {
          setLoading(true);
          const response = await dispatch(
            createOrder({ amount, currency, plan_id })
          );
          const data = response?.payload;
          if (data?.order_details) {
            setOrderDetails(data.order_details);
          } else {
            console.error("Order details not found in response");
          }
        } catch (err) {
          console.error("Error fetching order details:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrderDetails();
  }, [openPaymentModal, plan_id, dispatch]);

  return (
    <>
      <Modal
        size="xl"
        show={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
      >
        <ModalHeader className="border-none pb-0 bg-white">
          <span className="text-lg font-semibold">Payment Options</span>
        </ModalHeader>

        <ModalBody className="bg-white p-5">
          {/* Price Summary Section */}
          <div className="bg-[#e8f7ed] rounded-xl p-4 mb-4 shadow-sm border border-[#c4e7cd]">
            <h2 className="text-lg font-semibold mb-2 text-[#064d1d]">
              Price Summary
            </h2>

            {loading ? (
              <p className="text-gray-400 text-sm">Fetching price details...</p>
            ) : orderDetails ? (
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>₹{orderDetails.base_amount.toFixed(2)}</span>
                </div>

                {orderDetails.gst_applicable && (
                  <div className="flex justify-between">
                    <span>
                      GST ({orderDetails.gst_rate_percent}
                      %):
                    </span>
                    <span>₹{orderDetails.gst_amount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-gray-300 my-2"></div>

                <div className="flex justify-between font-semibold text-[#1a4b1a]">
                  <span>Total:</span>
                  <span>₹{orderDetails.total_amount.toFixed(2)}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                Unable to load order details.
              </p>
            )}
          </div>

          {/* Razorpay Payment Section */}
          <Elements stripe={stripePromise} options={options}>
            <RazorpayCheckout
              setErrorMessage={setErrorMessage}
              currency={currency}
              amount={orderDetails?.total_amount || amount}
              plan_id={plan_id}
              errorMessage={errorMessage}
            />
          </Elements>

          {/* Optional: show error */}
          {errorMessage && (
            <p className="mt-3 text-sm text-red-600">{errorMessage}</p>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default RazorPaymentModal;
