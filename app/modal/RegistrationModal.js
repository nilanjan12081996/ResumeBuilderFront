'use client';

import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import Image from "next/image";
import registerStepone from "../assets/imagesource/register_stepone.png";
import { useForm } from "react-hook-form";
import VerifyOtpModal from "./verifyOtpModal";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, registerCustomer, registerCustomerOrg, verifyOtpNew, resendOtpNew } from "../reducers/AuthSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { checkSubscription } from "../reducers/ProfileSlice";
import { useRouter } from "next/navigation";
import { getSearchHistory } from "../reducers/SearchHistroySlice";

import { RiGoogleFill } from "react-icons/ri";
import Link from 'next/link';
import { useGoogleLogin } from "@react-oauth/google";
import { getIpData } from "../reducers/PlanSlice";



const RegistrationModal = ({ openRegisterModal, setOpenRegisterModal, setOpenVerifyOtpModal, setOpenLoginModal, openPricModal, setOpenPriceModal, chooseResumeType }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state?.auth);
    const [error, setError] = useState()

    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [otpId, setOtpId] = useState(null);  // store user id from register API
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otpSuccess, setOtpSuccess] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = watch("password");


    const openLoginModal = () => {
        setOpenLoginModal(true);
        setOpenRegisterModal(false);
    }

    const handlePriceModal = () => {
        setOpenPriceModal(true)
        setOpenRegisterModal(false);
    }
    const { ipData } = useSelector((state) => state.planst);
    useEffect(() => {
        dispatch(getIpData());
    }, [dispatch]);
    const onSubmit = (data) => {
        const payload1 = {
            app: 1,
            sign_up_type: chooseResumeType,
            fullname: data?.first_name + " " + data?.last_name,
            username: data?.username,
            email: data?.email,
            password: data?.password,
            ...(chooseResumeType == 2 && { organization_name: data?.organization_name }),
            confirm_password: data?.confirm_password,
            ip_address: ipData?.ip,

        }

        dispatch(registerCustomer(payload1)).then((res) => {
            console.log("resRegind", res);
            if (res?.payload?.status_code === 201) {
                // setOpenRegisterModal(false);
                setOtpId(res?.payload?.data?.id);
                setShowOtpScreen(true);  // switch modal to OTP form
                // router.push('/plans');
                //    handlePriceModal()
            }
            //               else if (res?.payload?.response?.data?.status_code === 422) {
            //                     const validationErrors = res?.payload?.response?.data?.errors || [];
            //                     console.log("validationErrors", validationErrors);
            //                     // Extract "msg" from each error
            //                     const combinedMessages = validationErrors.map((e) => e.msg).join(" | ");

            //   setError(combinedMessages);
            // }
            else if (res?.payload?.response?.data?.status_code === 422) {
                const validationErrors = res?.payload?.response?.data?.data || [];
                console.log("validationErrors", validationErrors);

                // Extract "message" from each error
                const combinedMessages = validationErrors.map((e) => e.message).join(" | ");

                setError(combinedMessages);
            }
        })
    }

    // --- OTP submit ---
    // const handleVerifyOtp = () => {
    //     if (!otp || otp.trim().length === 0) {
    //         setOtpError("Please enter the OTP");
    //         return;
    //     }
    //     dispatch(verifyOtpNew({ id: otpId, otp })).then((res) => {
    //         if (res?.payload?.status_code === 200) {
    //             setOpenRegisterModal(false);
    //             dispatch(getProfile())
    //             router.push("/plans");
    //         } else {
    //             // console.log('res',res)
    //             setOtpError("Invalid OTP. Please try again.");
    //         }
    //     });
    // };

    const handleVerifyOtp = () => {
        if (!otp || otp.trim().length === 0) {
            setOtpError("Please enter the OTP");
            return;
        }
        setIsVerifying(true);
        dispatch(verifyOtpNew({ id: otpId, otp })).then((res) => {
            setIsVerifying(false);
            if (res?.payload?.status_code === 200) {
                setOtpError(""); // clear previous error
                setOtpSuccess("OTP Verified Successfully!");

                // Wait 3 seconds before redirect
                setTimeout(() => {
                    setOpenRegisterModal(false);
                    dispatch(getProfile());
                    router.push("/plans");
                }, 5000);
            } else {
                setOtpError("Invalid OTP. Please try again.");
            }
        });
    };


    // --- Resend OTP ---
    const handleResendOtp = () => {
        dispatch(resendOtpNew(otpId));
    };

    // --- OTP Resend Button Component ---
    const ResendOtpButton = ({ handleResendOtp, setOtp }) => {
        const [timer, setTimer] = useState(30);
        const [canResend, setCanResend] = useState(false);

        useEffect(() => {
            let interval = null;
            if (timer > 0) {
                interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            } else {
                setCanResend(true);
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [timer]);

        const onResendClick = () => {
            setOtp(""); // clear OTP input
            handleResendOtp();
            setTimer(30);
            setCanResend(false);
        };

        return (
            <button
                onClick={onResendClick}
                disabled={!canResend}
                className={`font-medium p-2 rounded-lg transition-colors ${canResend ? "text-blue-600 hover:text-blue-800" : "text-gray-400 cursor-not-allowed"
                    }`}
            >
                {canResend ? "Resend OTP" : `Resend in ${timer}s`}
            </button>
        );
    };






    // const googleLogin = useGoogleLogin({
    //     onSuccess: (codeResponse) => {
    //     //    sessionStorage.setItem("googleAccessToken", codeResponse.access_token);
    //       sessionStorage.setItem(
    //         "googleAccessToken",
    //         JSON.stringify({ token: codeResponse.access_token })
    //       );
    //       router.push("/google-redirect");
    //     },
    //     onError: (error) => console.log("Login Failed:", error),
    //   });

    return (
        <>
            <Modal size="6xl" show={openRegisterModal} onClose={() => setOpenRegisterModal(false)}>
                <ModalHeader className='border-none pb-0 absolute right-3 top-3 bg-transparent'>&nbsp;</ModalHeader>
                <ModalBody className='bg-white p-0'>
                    <div className="lg:flex min-h-[600px]">
                        <div className='w-6/12 hidden lg:block register_image'>
                            &nbsp;
                        </div>
                        <div className='lg:w-6/12 flex justify-center items-center'>
                            <div className='py-16 px-5 lg:py-10 lg:px-20'>
                                {!showOtpScreen ? (
                                    <>
                                        <h2 className='text-[#000000] text-2xl lg:text-[30px] leading-[35px] font-semibold pb-5 text-center'>Sign Up</h2>
                                        <div className='form_area'>
                                            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-0">
                                                <div className='flex gap-4'>
                                                    <div className='w-full mb-2'>
                                                        <div className="mb-0 block">
                                                            <Label>First Name</Label>
                                                        </div>
                                                        <TextInput type="text" placeholder="Enter First Name"
                                                            {...register("first_name", {
                                                                required: "First name is required",
                                                            })}
                                                        />
                                                        {errors?.first_name && (
                                                            <span className="text-red-500">
                                                                {errors?.first_name?.message}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className='w-full mb-2'>
                                                        <div className="mb-0 block">
                                                            <Label>Last Name</Label>
                                                        </div>
                                                        <TextInput type="text" placeholder="Enter Last Name"
                                                            {...register("last_name", {
                                                                required: "Last name is required",
                                                            })}
                                                        />
                                                        {errors?.last_name && (
                                                            <span className="text-red-500">
                                                                {errors?.last_name?.message}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='mb-2'>
                                                    <div className="mb-0 block">
                                                        <Label>Email Address</Label>
                                                    </div>
                                                    <TextInput type="email" placeholder="Enter your Email Id"
                                                        {...register("email", {
                                                            required: "Email is required",
                                                        })}
                                                    />
                                                    {errors?.email && (
                                                        <span className="text-red-500">
                                                            {errors?.email?.message}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='mb-2'>
                                                    <div className="mb-0 block">
                                                        <Label>Username</Label>
                                                    </div>
                                                    <TextInput type="text" placeholder="Enter your Username"
                                                        {...register("username", {
                                                            required: "Username is required",
                                                        })}
                                                    />
                                                    {errors?.username && (
                                                        <span className="text-red-500">
                                                            {errors?.username?.message}
                                                        </span>
                                                    )}
                                                </div>
                                                {
                                                    chooseResumeType == 2 && (
                                                        <div className='mb-2'>
                                                            <div className="mb-0 block">
                                                                <Label>Organization Name</Label>
                                                            </div>
                                                            <TextInput type="text" placeholder="Enter your Organization Name"
                                                                {...register("organization_name", {
                                                                    required: "Organization Name is required",
                                                                })}
                                                            />
                                                            {errors?.organization_name && (
                                                                <span className="text-red-500">
                                                                    {errors?.organization_name?.message}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )
                                                }

                                                <div className='mb-2'>
                                                    <div className="mb-0 block">
                                                        <Label>Enter your Password</Label>
                                                    </div>
                                                    <TextInput type="password" placeholder='Type your password'
                                                        {...register("password", {
                                                            required: "Password is required",
                                                        })}
                                                    />
                                                    {errors?.password && (
                                                        <span className="text-red-500">
                                                            {errors?.password?.message}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className='mb-2'>
                                                    <div className="mb-0 block">
                                                        <Label>Confirm your Password</Label>
                                                    </div>
                                                    {/* <TextInput type="password" placeholder='Type your password'
                                                {...register("confirm_password", {
                                                    required: "Password is required",
                                                })}
                                            />
                                            {errors?.confirm_password && (
                                                <span className="text-red-500">
                                                    {errors?.confirm_password?.message}
                                                </span>
                                            )} */}
                                                    <TextInput
                                                        type="password"
                                                        placeholder="Type your password"
                                                        {...register("confirm_password", {
                                                            required: "Confirm Password is required",
                                                            validate: (value) =>
                                                                value === password || "Password do not Match",
                                                        })}
                                                    />
                                                    {errors.confirm_password && (
                                                        <span className="text-red-500">
                                                            {errors.confirm_password.message}
                                                        </span>
                                                    )}
                                                </div>
                                                <Button type="submit" className='mt-2'>{loading ? "Wait..." : "Sign Up"}</Button>
                                                {
                                                    error && (
                                                        <div className="text-center text-sm text-red-600 mt-3">{error}</div>
                                                    )
                                                }
                                            </form>
                                            {/* <div className="mt-4 text-center continue_width">
                                        <p className="text-[#525252] text-[14px] leading-[20px]">Or Continue With</p>
                                    </div>
                                    <div className="mt-4 flex justify-center items-center">
                                        <button onClick={()=>{googleLogin()}} className="google_btn"><RiGoogleFill className="text-[18px] mr-1" /> Google</button>
                                    </div> */}
                                            <div className="mt-6 text-center">
                                                <p className="text-[#615D5D] text-[14px] leading-[20px] font-normal">Already have an account? <Link onClick={() => openLoginModal(true)} className="text-[#000000] hover:text-[#615D5D] font-medium" href="/" passHref>Log In</Link></p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // --- OTP screen ---
                                    <div className="p-8 flex flex-col items-center bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto text-center">
                                        <h2 className="text-3xl font-semibold mb-3 text-gray-900">Verify Your Email</h2>
                                        <p className="text-gray-600 mb-6 text-sm">
                                            We’ve sent a 6-digit verification code to your email:
                                            <br />
                                            <span className="font-medium text-blue-600">{watch("email")}</span>
                                        </p>

                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-64 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {otpError && (
                                            <p className="text-red-500 text-sm my-2">{otpError}</p>
                                        )}

                                        {otpSuccess && (
                                            <p className="text-green-600 text-sm mt-2 font-medium">{otpSuccess}</p>
                                        )}

                                        <button
                                            onClick={handleVerifyOtp}
                                            disabled={isVerifying}
                                            className={`${isVerifying ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                                } text-white font-medium py-3 px-6 rounded-xl w-full transition`}
                                        >
                                            {isVerifying ? "Verifying OTP..." : "Verify OTP"}
                                        </button>

                                        <div className="mt-4">
                                            <ResendOtpButton handleResendOtp={handleResendOtp} setOtp={setOtp} />
                                        </div>

                                        <p className="text-gray-500 text-sm mt-4">
                                            Didn’t receive the code? You can resend it once the timer ends.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>


        </>
    )
};

export default RegistrationModal;