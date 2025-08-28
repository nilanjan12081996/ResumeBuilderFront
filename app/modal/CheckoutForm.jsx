"use client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";

const CheckoutForm = ({
  setErrorMessage,
  cSecrateKey,
  sPublishKey,
  subsId,
  customerId,
  planId,
  errorMessage,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  // const returnUrl = `${process.env.NEXT_FRONT_BASE_URL}/payment-redirect/`;
  const returnUrl = `${
    process.env.NEXT_PUBLIC_FRONT_BASE_URL
  }/payment-redirect?subsId=${encodeURIComponent(
    subsId
  )}&customerId=${encodeURIComponent(
    customerId
  )}&sPublishKey=${encodeURIComponent(
    sPublishKey
  )}&cSecrateKey=${encodeURIComponent(cSecrateKey)}&planId=${encodeURIComponent(
    planId
  )}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      })
      .then(function (error) {
        console.log("error", error);

        if (error.error) {
          // setErrorMessage(error.error.message);
          toast.error(error.error.message);
        }
      });
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          type="submit"
          className="w-full h-12 mt-4 mb-0 text-base text-white uppercase bg-[#626adf] rounded-full hover:bg-black"
          //   disabled={loading}
        >
          {/* {loading ? "Wait ..." : "Pay"} */}
          Pay
        </button>
      </form>
    </>
  );
};
export default CheckoutForm;
