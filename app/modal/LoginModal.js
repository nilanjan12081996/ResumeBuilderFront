'use Client';

import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import loginImg from "../assets/imagesource/login_img.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, loginCustomer, resendOtpNew, verifyOtpNew } from "../reducers/AuthSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { checkSubscription } from "../reducers/ProfileSlice";
import { getSearchHistory } from "../reducers/SearchHistroySlice";

import { RiGoogleFill } from "react-icons/ri";
import { useGoogleLogin } from "@react-oauth/google";


const LoginModal = ({ openLoginModal, setOpenLoginModal, setOpenRegisterModal, setOpenChoiceModal }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state?.auth);
    const [error, setError] = useState()
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpId, setOtpId] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otpSuccess, setOtpSuccess] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);




    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // const onSubmit = (data) => {
    //     dispatch(loginCustomer({...data,app:1})).then((res) => {
    //         console.log("login res", res)
    //         if (res?.payload?.status_code === 200) {

    //                     if(res?.payload?.data?.project?.length>1){
    //                         setOpenLoginModal(false);
    //                     router.push('/dashboard');
    //                     }
    //                     else{
    //                          setOpenLoginModal(false);
    //                     // router.push('/dashboard');
    //                     }
    //                     dispatch(getProfile())


    //         } else if (res?.payload?.response?.data?.status_code === 401) {
    //             setError(res?.payload?.response?.data?.message)
    //             // toast.error(res?.payload?.response?.data?.message, {
    //             //     position: "top-right",
    //             //     autoClose: 5000,
    //             //     hideProgressBar: false,
    //             //     closeOnClick: true,
    //             //     progress: undefined,
    //             //     theme: "dark",
    //             // });
    //         }
    //         else if(res?.payload?.response?.data?.status_code===400){
    //             setError(res?.payload?.response?.data?.message)
    //         }
    //     })
    // };

    const onSubmit = (data) => {
        dispatch(loginCustomer({ ...data, app: 1 })).then((res) => {
            console.log("login res", res);

            if (res?.payload?.status_code === 200) {
                const userData = res?.payload?.data;
                const accessToken = res?.payload?.access_token;

                setUserEmail(data.email);
                setOtpId(userData?.id);

                if (userData?.is_otp_verified == 0) {
                    setIsVerified(true);
                    dispatch(resendOtpNew({ id: userData?.id }));
                    return;
                }

                if (accessToken) {
                    // sessionStorage.setItem(
                    //     "resumeToken",
                    //     JSON.stringify({ token: accessToken })
                    // );c

                     localStorage.setItem(
                        "resumeToken",
                        JSON.stringify({ token: accessToken })
                    );

                    setOpenLoginModal(false);
                    router.push("/dashboard");
                    dispatch(getProfile());
                }
            }

            else if (res?.payload?.response?.data?.status_code === 401) {
                setError(res?.payload?.response?.data?.message);
            }
            else if (res?.payload?.response?.data?.status_code === 400) {
                setError(res?.payload?.response?.data?.message);
            }
        });
    };

    const handleSignup = () => {
        setOpenChoiceModal(true)
        setOpenLoginModal(false)
    }


    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            //    sessionStorage.setItem("googleAccessToken", codeResponse.access_token);
            sessionStorage.setItem(
                "googleAccessToken",
                JSON.stringify({ token: codeResponse.access_token })
            );
            router.push("/google-redirect");
        },
        onError: (error) => console.log("Login Failed:", error),
    });

    // OTP Verification Handler
    const handleVerifyOtp = () => {
        if (!otp || otp.trim().length === 0) {
            setOtpError("Please enter the OTP");
            return;
        }
        setIsVerifying(true);
        dispatch(verifyOtpNew({ id: otpId, otp })).then((res) => {
            setIsVerifying(false);
            if (res?.payload?.status_code === 200) {
                const accessToken = res?.payload?.access_token;

                setOtpError("");
                setOtpSuccess("OTP Verified Successfully!");

                if (accessToken) {
                    // sessionStorage.setItem('resumeToken', JSON.stringify({ token: accessToken }));c
                     localStorage.setItem('resumeToken', JSON.stringify({ token: accessToken }));
                    router.push("/dashboard");
                    dispatch(getProfile());

                    setTimeout(() => {
                        router.push("/dashboard");
                        setOpenLoginModal(false);
                    }, 5000);
                }
            } else {
                // console.log('res',res)
                setOtpError("Invalid OTP. Please try again.");
            }
        });
    };



    // Resend OTP Button Component (same as Register Page)
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
            setOtp("");
            dispatch(resendOtpNew({ id: otpId }));
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



    return (
        <>
            <Modal size="6xl" show={openLoginModal} onClose={() => setOpenLoginModal(false)}>
                <ModalHeader className='border-none pb-0 absolute right-3 top-3 bg-transparent'>&nbsp;</ModalHeader>
                <ModalBody className='bg-white p-0'>
                    <div className="lg:flex">
                        <div className='w-6/12 hidden lg:block login_image'>
                            &nbsp;
                        </div>
                        <div className='lg:w-6/12 py-20 px-10 lg:py-32 lg:px-20'>
                            {!isVerified ? (
                                <div className='py-0 px-0'>
                                    <h2 className='text-[#000000] text-2xl lg:text-[30px] lg:leading-[35px] font-semibold pb-4'>Log In</h2>
                                    <div className='form_area'>
                                        <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-0">
                                            <div className='mb-2'>
                                                <div className="mb-1 block">
                                                    <Label htmlFor="email1">Your Email</Label>
                                                </div>
                                                <TextInput id="email1" type="email" placeholder="name@gmail.com"
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
                                                <div className="mb-1 block">
                                                    <Label htmlFor="password1">Enter your Password</Label>
                                                </div>
                                                <TextInput id="password1" type="password"
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
                                            <div className="flex items-center justify-between gap-0 mb-8">
                                                <div className='flex gap-1 items-center'>
                                                    <Checkbox id="remember" />
                                                    <p htmlFor="remember" className='text-[#8E8E8E] text-sm'>Remember me</p>
                                                </div>
                                                <div>
                                                    <Link className='text-[#8E8E8E] text-sm' href="/forgot-password" passHref>Forgot Password ?</Link>
                                                </div>
                                            </div>
                                            <Button type="submit">{loading ? "Wait..." : "Submit"}</Button>
                                            {
                                                error && (
                                                    <div className="text-center text-sm text-red-600 mt-3">{error}</div>
                                                )
                                            }
                                            {/* <p className="text-center mt-2 flex justify-center items-center">Already Have an account? <button className="sign_up_btn" onClick={handleSignup}>Sign Up</button> </p> */}
                                        </form>
                                        {/* <div className="mt-4 text-center continue_width">
                                            <p className="text-[#525252] text-[14px] leading-[20px]">Or Continue With</p>
                                        </div>
                                        <div className="mt-4 flex justify-center items-center">
                                            <button onClick={() => { googleLogin() }} className="google_btn"><RiGoogleFill className="text-[18px] mr-1" /> Google</button>
                                        </div> */}
                                        <div className="mt-6 text-center">
                                            <p className="text-[#615D5D] text-[14px] leading-[20px] font-normal">Don’t have an account? <Link onClick={() => handleSignup(true)} className="text-[#000000] hover:text-[#615D5D] font-medium" href="/" passHref>Sign Up</Link></p>
                                        </div>
                                    </div>
                                </div>
                            ) :
                                (
                                    /* OTP SCREEN SAME AS REGISTER PAGE */
                                    <div className="p-10 flex flex-col items-center bg-white rounded-xl shadow-lg max-w-md mx-auto text-center">

                                        <h2 className="text-3xl font-semibold mb-2 text-gray-900">Verify Your Email</h2>

                                        <p className="text-gray-600 mb-6 text-sm">
                                            We’ve sent a 6-digit verification code to:
                                            <br />
                                            <span className="font-medium text-blue-600">{userEmail}</span>
                                        </p>

                                        <input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-64 text-center text-lg tracking-widest focus:ring-2 focus:ring-blue-500"
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


                                        <div className="my-4">
                                            <ResendOtpButton handleResendOtp={resendOtpNew} setOtp={setOtp} />
                                        </div>

                                        <p className="text-gray-500 text-sm mt-3">
                                            Didn’t receive the code? Resend when the timer ends.
                                        </p>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
};

export default LoginModal;