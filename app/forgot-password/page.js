'use client';

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../reducers/AuthSlice"; 
import Image from "next/image";
import logo from '../assets/imagesource/logo.png';
import { useEffect, useState } from "react";
import headerLogo from '../assets/imagesource/ResumeMile_Logo.png';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);
  const [submitted, setSubmitted] = useState(false);

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
              className={`w-full rounded-lg border ${
                errors.email ? "border-red-500" : "border-gray-300"
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
            {loading ? "Sending..." : "Request reset link"}
          </button>

          {/* success message*/}
          {submitted && !loading && !error && (
            <div className="text-center text-green-600 font-medium mt-4">
              A reset link has been sent to your email.
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 font-medium mt-4">
              Failed to send reset link. Try again later.
            </div>
          )}

          <div className="mt-6 text-center">
            <a href="/login" className="text-[#1a73e8] font-medium hover:underline">
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
