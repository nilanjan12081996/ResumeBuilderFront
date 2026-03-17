'use client';

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, loginCustomer, resendOtpNew, verifyOtpNew } from "../reducers/AuthSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { createScratchFreeSubscription, createSubscriptionCount } from "../reducers/ResumeSlice";
import Link from "next/link";

const LoginModal = ({ openLoginModal, setOpenLoginModal, setOpenRegisterModal, setOpenChoiceModal }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state?.auth);
    const [error, setError] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpId, setOtpId] = useState(null);
    const [userEmail, setUserEmail] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otpSuccess, setOtpSuccess] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setError("");
        dispatch(loginCustomer({ ...data, app: 1 })).then((res) => {
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
                    localStorage.setItem("resumeToken", JSON.stringify({ token: accessToken }));
                    dispatch(createSubscriptionCount());
                    dispatch(createScratchFreeSubscription());
                    setOpenLoginModal(false);
                    router.push("/dashboard");
                    dispatch(getProfile());
                }
            } else if (res?.payload?.response?.data?.status_code === 401) {
                setError(res?.payload?.response?.data?.message);
            } else if (res?.payload?.response?.data?.status_code === 400) {
                setError(res?.payload?.response?.data?.message);
            } else if (res?.payload?.response?.data?.status_code === 422) {
                const validationErrors = res?.payload?.response?.data?.data || [];
                const combinedMessages = validationErrors.map((e) => e.message).join(" | ");
                setError(combinedMessages);
            }
        });
    };

    const handleSignup = () => {
        setOpenChoiceModal(true);
        setOpenLoginModal(false);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => {
            sessionStorage.setItem("googleAccessToken", JSON.stringify({ token: codeResponse.access_token }));
            router.push("/google-redirect");
        },
        onError: (error) => console.log("Login Failed:", error),
    });

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
                    localStorage.setItem('resumeToken', JSON.stringify({ token: accessToken }));
                    dispatch(createSubscriptionCount());
                    dispatch(createScratchFreeSubscription());
                    router.push("/dashboard");
                    dispatch(getProfile());
                    setTimeout(() => {
                        router.push("/dashboard");
                        setOpenLoginModal(false);
                    }, 5000);
                }
            } else {
                setOtpError("Invalid OTP. Please try again.");
            }
        });
    };

    const ResendOtpButton = ({ setOtp }) => {
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
            <button onClick={onResendClick} disabled={!canResend}
                className={`text-sm font-semibold transition-colors ${canResend ? "text-[#800080] hover:text-[#600060]" : "text-gray-400 cursor-not-allowed"}`}>
                {canResend ? "Resend OTP" : `Resend in ${timer}s`}
            </button>
        );
    };

    return (
        <>
            <style>{`
                .rm-modal-overlay .flowbite-modal-body { padding: 0 !important; }
                .rm-input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 12px;
                    font-size: 14px;
                    color: #1a1a2e;
                    background: #fafafa;
                    outline: none;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                }
                .rm-input:focus { border-color: #800080; background: #fff; box-shadow: 0 0 0 3px rgba(128,0,128,0.08); }
                .rm-input::placeholder { color: #b0b0c0; }
                .rm-btn-primary {
                    width: 100%;
                    padding: 13px;
                    background: linear-gradient(135deg, #800080, #b44db4);
                    color: #fff;
                    border: none;
                    border-radius: 12px;
                    font-size: 15px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s;
                    letter-spacing: 0.02em;
                    font-family: 'DM Sans', sans-serif;
                }
                .rm-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(128,0,128,0.3); }
                .rm-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .rm-btn-google {
                    width: 100%;
                    padding: 12px;
                    background: #fff;
                    color: #374151;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 12px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-family: 'DM Sans', sans-serif;
                }
                .rm-btn-google:hover { border-color: #800080; background: #fdf4ff; }
                .rm-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; display: block; font-family: 'DM Sans', sans-serif; }
                .rm-error { color: #dc2626; font-size: 12px; margin-top: 4px; }
                .rm-divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
                .rm-divider::before, .rm-divider::after { content: ''; flex: 1; height: 1px; background: #e5e7eb; }
                .rm-divider span { color: #9ca3af; font-size: 12px; font-weight: 500; }
                .otp-box {
                    width: 100%;
                    padding: 14px;
                    border: 2px solid #e5e7eb;
                    border-radius: 14px;
                    font-size: 22px;
                    text-align: center;
                    letter-spacing: 0.5em;
                    outline: none;
                    font-family: 'DM Sans', sans-serif;
                    transition: all 0.2s;
                    background: #fafafa;
                }
                .otp-box:focus { border-color: #800080; background: #fff; box-shadow: 0 0 0 3px rgba(128,0,128,0.08); }
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
            `}</style>

            <Modal size="lg" show={openLoginModal} onClose={() => setOpenLoginModal(false)} className="rm-modal-overlay">
                <ModalHeader className='border-none pb-0 absolute right-3 top-3 bg-transparent z-10'>&nbsp;</ModalHeader>
                <ModalBody className='bg-white p-0 rounded-2xl overflow-hidden'>
                    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

                        {/* Top accent bar */}
                        <div style={{ height: "5px", background: "linear-gradient(90deg, #800080, #b44db4, #e879f9)" }} />

                        <div style={{ padding: "40px 44px 44px" }}>

                            {!isVerified ? (
                                <>
                                    {/* Header */}
                                    <div style={{ marginBottom: "32px" }}>
                                        <div style={{
                                            width: "48px", height: "48px", borderRadius: "14px",
                                            background: "linear-gradient(135deg, #800080, #b44db4)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            marginBottom: "16px", boxShadow: "0 4px 14px rgba(128,0,128,0.3)"
                                        }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="white" />
                                            </svg>
                                        </div>
                                        <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#1a1a2e", margin: 0, lineHeight: 1.2 }}>
                                            Welcome back
                                        </h2>
                                        <p style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px" }}>
                                            Sign in to your ResumeMile account
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div style={{ marginBottom: "16px" }}>
                                            <label className="rm-label">Email Address</label>
                                            <input
                                                className="rm-input"
                                                type="email"
                                                placeholder="you@example.com"
                                                {...register("email", { required: "Email is required" })}
                                            />
                                            {errors?.email && <p className="rm-error">{errors.email.message}</p>}
                                        </div>

                                        <div style={{ marginBottom: "8px" }}>
                                            <label className="rm-label">Password</label>
                                            <div style={{ position: "relative" }}>
                                                <input
                                                    className="rm-input"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    style={{ paddingRight: "44px" }}
                                                    {...register("password", { required: "Password is required" })}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{
                                                        position: "absolute", right: "14px", top: "50%",
                                                        transform: "translateY(-50%)", background: "none",
                                                        border: "none", cursor: "pointer", color: "#9ca3af", padding: 0,
                                                        display: "flex", alignItems: "center"
                                                    }}
                                                >
                                                    {showPassword ? (
                                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                                                            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                                        </svg>
                                                    ) : (
                                                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                                                            <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    )}
                                                </button>
                                            </div>
                                            {errors?.password && <p className="rm-error">{errors.password.message}</p>}
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
                                            <Link href="/forgot-password" style={{ fontSize: "13px", color: "#800080", fontWeight: 600, textDecoration: "none" }}>
                                                Forgot password?
                                            </Link>
                                        </div>

                                        {error && (
                                            <div style={{
                                                background: "#fef2f2", border: "1px solid #fecaca",
                                                borderRadius: "10px", padding: "12px 16px",
                                                marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px"
                                            }}>
                                                <svg width="16" height="16" fill="#dc2626" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                                </svg>
                                                <p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p>
                                            </div>
                                        )}

                                        <button type="submit" className="rm-btn-primary" disabled={loading}>
                                            {loading ? (
                                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                                                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                                                        <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                                    </svg>
                                                    Signing in...
                                                </span>
                                            ) : "Sign In"}
                                        </button>
                                    </form>

                                    <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#6b7280" }}>
                                        Don't have an account?{" "}
                                        <button onClick={handleSignup} style={{ color: "#800080", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: "14px" }}>
                                            Sign Up
                                        </button>
                                    </p>
                                </>
                            ) : (
                                /* OTP Screen */
                                <div style={{ textAlign: "center", padding: "10px 0" }}>
                                    <div style={{
                                        width: "64px", height: "64px", borderRadius: "20px",
                                        background: "linear-gradient(135deg, #800080, #b44db4)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        margin: "0 auto 20px", boxShadow: "0 4px 18px rgba(128,0,128,0.3)"
                                    }}>
                                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>Check your inbox</h2>
                                    <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>We sent a 6-digit code to</p>
                                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#800080", marginBottom: "28px" }}>{userEmail}</p>

                                    <input
                                        className="otp-box"
                                        type="text"
                                        placeholder="○ ○ ○ ○ ○ ○"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        maxLength={6}
                                    />

                                    {otpError && (
                                        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "10px 14px", marginTop: "12px" }}>
                                            <p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{otpError}</p>
                                        </div>
                                    )}
                                    {otpSuccess && (
                                        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "10px 14px", marginTop: "12px" }}>
                                            <p style={{ color: "#16a34a", fontSize: "13px", margin: 0, fontWeight: 600 }}>{otpSuccess}</p>
                                        </div>
                                    )}

                                    <button onClick={handleVerifyOtp} disabled={isVerifying} className="rm-btn-primary" style={{ marginTop: "20px" }}>
                                        {isVerifying ? "Verifying..." : "Verify OTP"}
                                    </button>

                                    <div style={{ marginTop: "16px" }}>
                                        <ResendOtpButton setOtp={setOtp} />
                                    </div>
                                    <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "12px" }}>Didn't receive the code? Resend when the timer ends.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </ModalBody>
            </Modal>
        </>
    );
};

export default LoginModal;


// 'use Client';

// import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
// import Image from "next/image";
// import Link from "next/link";
// import loginImg from "../assets/imagesource/login_img.png";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile, loginCustomer, resendOtpNew, verifyOtpNew } from "../reducers/AuthSlice";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import { checkSubscription } from "../reducers/ProfileSlice";
// import { getSearchHistory } from "../reducers/SearchHistroySlice";

// import { RiGoogleFill } from "react-icons/ri";
// import { useGoogleLogin } from "@react-oauth/google";
// import { createScratchFreeSubscription, createSubscriptionCount } from "../reducers/ResumeSlice";


// const LoginModal = ({ openLoginModal, setOpenLoginModal, setOpenRegisterModal, setOpenChoiceModal }) => {
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const { loading } = useSelector((state) => state?.auth);
//     const [error, setError] = useState()
//     const [isVerified, setIsVerified] = useState(false);
//     const [otp, setOtp] = useState("");
//     const [otpId, setOtpId] = useState(null);
//     const [userEmail, setUserEmail] = useState("");
//     const [otpError, setOtpError] = useState("");
//     const [otpSuccess, setOtpSuccess] = useState("");
//     const [isVerifying, setIsVerifying] = useState(false);




//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm();

//     const onSubmit = (data) => {
//         dispatch(loginCustomer({ ...data, app: 1 })).then((res) => {
//             console.log("login res", res);

//             if (res?.payload?.status_code === 200) {
//                 const userData = res?.payload?.data;
//                 const accessToken = res?.payload?.access_token;

//                 setUserEmail(data.email);
//                 setOtpId(userData?.id);

//                 if (userData?.is_otp_verified == 0) {
//                     setIsVerified(true);
//                     dispatch(resendOtpNew({ id: userData?.id }));
//                     return;
//                 }

//                 if (accessToken) {
//                     localStorage.setItem(
//                         "resumeToken",
//                         JSON.stringify({ token: accessToken })
//                     );
//                     dispatch(createSubscriptionCount())
//                     dispatch(createScratchFreeSubscription());
//                     setOpenLoginModal(false);
//                     router.push("/dashboard");
//                     dispatch(getProfile());
//                 }
//             }

//             else if (res?.payload?.response?.data?.status_code === 401) {
//                 setError(res?.payload?.response?.data?.message);
//             }
//             else if (res?.payload?.response?.data?.status_code === 400) {
//                 setError(res?.payload?.response?.data?.message);
//             }
//         });
//     };

//     const handleSignup = () => {
//         setOpenChoiceModal(true)
//         setOpenLoginModal(false)
//     }


//     const googleLogin = useGoogleLogin({
//         onSuccess: (codeResponse) => {
//             //    sessionStorage.setItem("googleAccessToken", codeResponse.access_token);
//             sessionStorage.setItem(
//                 "googleAccessToken",
//                 JSON.stringify({ token: codeResponse.access_token })
//             );
//             router.push("/google-redirect");
//         },
//         onError: (error) => console.log("Login Failed:", error),
//     });

//     // OTP Verification Handler
//     const handleVerifyOtp = () => {
//         if (!otp || otp.trim().length === 0) {
//             setOtpError("Please enter the OTP");
//             return;
//         }
//         setIsVerifying(true);
//         dispatch(verifyOtpNew({ id: otpId, otp })).then((res) => {
//             setIsVerifying(false);
//             if (res?.payload?.status_code === 200) {
//                 const accessToken = res?.payload?.access_token;

//                 setOtpError("");
//                 setOtpSuccess("OTP Verified Successfully!");

//                 if (accessToken) {
//                     // sessionStorage.setItem('resumeToken', JSON.stringify({ token: accessToken }));c
//                     localStorage.setItem('resumeToken', JSON.stringify({ token: accessToken }));
//                     dispatch(createSubscriptionCount());
//                     dispatch(createScratchFreeSubscription());
//                     router.push("/dashboard");
//                     dispatch(getProfile());

//                     setTimeout(() => {
//                         router.push("/dashboard");
//                         setOpenLoginModal(false);
//                     }, 5000);
//                 }
//             } else {
//                 // console.log('res',res)
//                 setOtpError("Invalid OTP. Please try again.");
//             }
//         });
//     };



//     // Resend OTP Button Component (same as Register Page)
//     const ResendOtpButton = ({ handleResendOtp, setOtp }) => {
//         const [timer, setTimer] = useState(30);
//         const [canResend, setCanResend] = useState(false);

//         useEffect(() => {
//             let interval = null;
//             if (timer > 0) {
//                 interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//             } else {
//                 setCanResend(true);
//                 clearInterval(interval);
//             }
//             return () => clearInterval(interval);
//         }, [timer]);

//         const onResendClick = () => {
//             setOtp("");
//             dispatch(resendOtpNew({ id: otpId }));
//             setTimer(30);
//             setCanResend(false);
//         };

//         return (
//             <button
//                 onClick={onResendClick}
//                 disabled={!canResend}
//                 className={`font-medium p-2 rounded-lg transition-colors ${canResend ? "text-blue-600 hover:text-blue-800" : "text-gray-400 cursor-not-allowed"
//                     }`}
//             >
//                 {canResend ? "Resend OTP" : `Resend in ${timer}s`}
//             </button>
//         );
//     };



//     return (
//         <>
//             <Modal size="6xl" show={openLoginModal} onClose={() => setOpenLoginModal(false)}>
//                 <ModalHeader className='border-none pb-0 absolute right-3 top-3 bg-transparent'>&nbsp;</ModalHeader>
//                 <ModalBody className='bg-white p-0'>
//                     <div className="lg:flex">
//                         <div className='w-6/12 hidden lg:block login_image'>
//                             &nbsp;
//                         </div>
//                         <div className='lg:w-6/12 py-20 px-10 lg:py-32 lg:px-20'>
//                             {!isVerified ? (
//                                 <div className='py-0 px-0'>
//                                     <h2 className='text-[#000000] text-2xl lg:text-[30px] lg:leading-[35px] font-semibold pb-4'>Log In</h2>
//                                     <div className='form_area'>
//                                         <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-0">
//                                             <div className='mb-2'>
//                                                 <div className="mb-1 block">
//                                                     <Label htmlFor="email1">Your Email</Label>
//                                                 </div>
//                                                 <TextInput id="email1" type="email" placeholder="name@gmail.com"
//                                                     {...register("email", {
//                                                         required: "Email is required",
//                                                     })}
//                                                 />
//                                                 {errors?.email && (
//                                                     <span className="text-red-500">
//                                                         {errors?.email?.message}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <div className='mb-2'>
//                                                 <div className="mb-1 block">
//                                                     <Label htmlFor="password1">Enter your Password</Label>
//                                                 </div>
//                                                 <TextInput id="password1" type="password"
//                                                     {...register("password", {
//                                                         required: "Password is required",
//                                                     })}
//                                                 />
//                                                 {errors?.password && (
//                                                     <span className="text-red-500">
//                                                         {errors?.password?.message}
//                                                     </span>
//                                                 )}
//                                             </div>
//                                             <div className="flex items-center justify-between gap-0 mb-8">
//                                                 <div className='flex gap-1 items-center'>
//                                                     <Checkbox id="remember" />
//                                                     <p htmlFor="remember" className='text-[#8E8E8E] text-sm'>Remember me</p>
//                                                 </div>
//                                                 <div>
//                                                     <Link className='text-[#8E8E8E] text-sm' href="/forgot-password" passHref>Forgot Password ?</Link>
//                                                 </div>
//                                             </div>
//                                             <Button type="submit">{loading ? "Wait..." : "Submit"}</Button>
//                                             {
//                                                 error && (
//                                                     <div className="text-center text-sm text-red-600 mt-3">{error}</div>
//                                                 )
//                                             }
//                                         </form>
//                                         <div className="mt-6 text-center">
//                                             <p className="text-[#615D5D] text-[14px] leading-[20px] font-normal">Don’t have an account? <Link onClick={() => handleSignup(true)} className="text-[#000000] hover:text-[#615D5D] font-medium" href="/" passHref>Sign Up</Link></p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) :
//                                 (
//                                     /* OTP SCREEN SAME AS REGISTER PAGE */
//                                     <div className="p-10 flex flex-col items-center bg-white rounded-xl shadow-lg max-w-md mx-auto text-center">

//                                         <h2 className="text-3xl font-semibold mb-2 text-gray-900">Verify Your Email</h2>

//                                         <p className="text-gray-600 mb-6 text-sm">
//                                             We’ve sent a 6-digit verification code to:
//                                             <br />
//                                             <span className="font-medium text-blue-600">{userEmail}</span>
//                                         </p>

//                                         <input
//                                             type="text"
//                                             placeholder="Enter OTP"
//                                             value={otp}
//                                             onChange={(e) => setOtp(e.target.value)}
//                                             className="border border-gray-300 rounded-xl p-3 mb-4 w-64 text-center text-lg tracking-widest focus:ring-2 focus:ring-blue-500"
//                                         />
//                                         {otpError && (
//                                             <p className="text-red-500 text-sm my-2">{otpError}</p>
//                                         )}

//                                         {otpSuccess && (
//                                             <p className="text-green-600 text-sm mt-2 font-medium">{otpSuccess}</p>
//                                         )}


//                                         <button
//                                             onClick={handleVerifyOtp}
//                                             disabled={isVerifying}
//                                             className={`${isVerifying ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//                                                 } text-white font-medium py-3 px-6 rounded-xl w-full transition`}
//                                         >
//                                             {isVerifying ? "Verifying OTP..." : "Verify OTP"}
//                                         </button>


//                                         <div className="my-4">
//                                             <ResendOtpButton handleResendOtp={resendOtpNew} setOtp={setOtp} />
//                                         </div>

//                                         <p className="text-gray-500 text-sm mt-3">
//                                             Didn’t receive the code? Resend when the timer ends.
//                                         </p>

//                                     </div>
//                                 )
//                             }
//                         </div>
//                     </div>
//                 </ModalBody>
//             </Modal>
//         </>
//     )
// };

// export default LoginModal;