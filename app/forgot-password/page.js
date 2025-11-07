'use client';

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../reducers/AuthSlice";
import Image from "next/image";
import logo from '../assets/imagesource/logo.png';
import { useEffect, useState } from "react";
import headerLogo from '../assets/imagesource/ResumeMile_Logo.png';
import Link from "next/link";
import LoginModal from "../modal/LoginModal";
import RegistrationModal from "../modal/RegistrationModal";
import ChoiceModal from '../modal/ChoiceModal';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);
  const [submitted, setSubmitted] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openChoiceModal,setOpenChoiceModal]=useState(false)
  const [chooseResumeType,setChooseResumeType]=useState()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(forgotPassword(data));
    setSubmitted(true);
  };

  useEffect(() => {
    if (error) setSubmitted(false);
  }, [error]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#bebebe] px-4">
      {/* Logo */}
      <div className="mb-8">
        <Image src={headerLogo} alt="Logo" width={180} height={40} />
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#112e51] mb-3">
          Forgot your password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Please enter the email address you'd like your password reset link sent to.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label className="block text-gray-700 mb-2 text-sm font-medium">
              Enter email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className={`w-full rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer w-full bg-[#1a73e8] text-white py-3 rounded-lg font-medium hover:bg-[#1559b0] transition-all duration-200 disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send New Password"}
          </button>

          {/* success message*/}
          {submitted && !loading && !error && message && (
            <div className="text-center text-green-600 text-sm mt-4">
              {typeof message === "string" ? message : message?.message}
            </div>
          )}


          {error && (
            <div className="text-center text-red-600 text-sm mt-4">
              {error?.message || "Something went wrong"}
            </div>
          )}


          <div className="mt-6 text-center">
            <button onClick={() => setOpenLoginModal(true)} className="text-[#1a73e8] font-medium hover:underline"> Back to Login</button>
            {/* <a href="/login" className="text-[#1a73e8] font-medium hover:underline">
              Back to Login
            </a> */}
          </div>
        </form>
      </div>
      <>
        {openLoginModal &&
          <LoginModal
            openLoginModal={openLoginModal}
            setOpenLoginModal={setOpenLoginModal}
            setOpenRegisterModal={setOpenRegisterModal}
          />
        }
      </>

      <>
        {openRegisterModal &&
          <RegistrationModal
            openRegisterModal={openRegisterModal}
            setOpenRegisterModal={setOpenRegisterModal}
            setChooseResumeType={setChooseResumeType}
            chooseResumeType={chooseResumeType}
          />
        }

      </>
    </div>
  );
}
