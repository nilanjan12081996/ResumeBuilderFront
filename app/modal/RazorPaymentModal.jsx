"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import RazorpayCheckout from "./RazorpayCheckout";

const RazorPaymentModal = ({
  openPaymentModal,
  setOpenPaymentModal,
  amount,
  currency,
  plan_id
}) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [options, setOptions] = useState(null);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
  
  }, []);
  return (
    <>
      <Modal
        size="xl"
        show={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
      >
        <ModalHeader className="border-none pb-0 bg-white">&nbsp;</ModalHeader>
        <ModalBody className="bg-white p-5">
          <Elements stripe={stripePromise} options={options}>
            <RazorpayCheckout
              setErrorMessage={setErrorMessage}
              currency={currency}
              amount={amount}
              plan_id={plan_id}
              errorMessage={errorMessage}
            />
          </Elements>
        </ModalBody>
      </Modal>
    </>
  );
};
export default RazorPaymentModal;
