"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../reducers/AuthSlice";
import { useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);

  // Read token from URL and decode it (VERY IMPORTANT)
  const params = useParams();
  const token = params?.token ? decodeURIComponent(params.token) : null;

  console.log("DECODED TOKEN:", token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      token: token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
    };

    dispatch(resetPassword(payload));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#bebebe] px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#112e51] mb-3">
          Reset Password
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Enter your new password below.
        </p>

        {!token ? (
          <p className="text-center text-red-600 font-medium">
            Invalid or missing token!
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* New Password */}
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword", { required: "Password is required" })}
                className={`w-full rounded-lg border ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block text-gray-700 mb-2 text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("newPassword") ||
                    "Passwords do not match",
                })}
                className={`w-full rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a73e8]`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-[#800080] hover:bg-[#a471a4] text-white py-3 rounded-lg font-medium hover:bg-[#1559b0] transition-all duration-200 disabled:opacity-70"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>

            {/* SUCCESS MESSAGE */}
            {message && !loading && !error && (
              <div className="text-center text-green-600 text-sm mt-4">
                {typeof message === "string" ? message : message?.message}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {error && (
              <div className="text-center text-red-600 text-sm mt-4">
                {error?.message || "Something went wrong"}
              </div>
            )}

            <div className="mt-6 text-center">
              <a href="/login" className="text-[#1a73e8] font-medium hover:underline">
                Back to Login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
