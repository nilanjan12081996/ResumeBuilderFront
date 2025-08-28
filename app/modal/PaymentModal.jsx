"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const PaymentModal = ({
  openPaymentModal,
  setOpenPaymentModal,
  cSecrateKey,
  sPublishKey,
  subsId,
  customerId,
  planId,
}) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [options, setOptions] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    const promise = loadStripe(sPublishKey);
    setStripePromise(promise);

    const stripe_options = {
      clientSecret: cSecrateKey,
    };
    setOptions(stripe_options);
  }, [cSecrateKey, sPublishKey]);
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
            <CheckoutForm
              setErrorMessage={setErrorMessage}
              cSecrateKey={cSecrateKey}
              sPublishKey={sPublishKey}
              subsId={subsId}
              customerId={customerId}
              planId={planId}
              errorMessage={errorMessage}
            />
          </Elements>
        </ModalBody>
      </Modal>
    </>
  );
};
export default PaymentModal;
