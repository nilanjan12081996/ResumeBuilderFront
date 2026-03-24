'use client';

import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, registerCustomer, verifyOtpNew, resendOtpNew } from "../reducers/AuthSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { getIpData } from "../reducers/PlanSlice";
import { createScratchFreeSubscription, createSubscriptionCount } from "../reducers/ResumeSlice";
import Link from "next/link";

const RegistrationModal = ({ openRegisterModal, setOpenRegisterModal, setOpenVerifyOtpModal, setOpenLoginModal, openPricModal, setOpenPriceModal, chooseResumeType }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state?.auth);
    const { ipData } = useSelector((state) => state.planst);
    const [error, setError] = useState("");
    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [otpId, setOtpId] = useState(null);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otpSuccess, setOtpSuccess] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    useEffect(() => {
        dispatch(getIpData());
    }, [dispatch]);

    const openLoginModal = () => {
        setOpenLoginModal(true);
        setOpenRegisterModal(false);
    };

    const onSubmit = (data) => {
        if (!chooseResumeType) return;
        setError("");
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
        };
        dispatch(registerCustomer(payload1)).then((res) => {
            if (res?.payload?.status_code === 201) {
                setOtpId(res?.payload?.data?.id);
                setShowOtpScreen(true);
            } else if (res?.payload?.response?.data?.status_code === 422) {
                const validationErrors = res?.payload?.response?.data?.data || [];
                const combinedMessages = validationErrors.map((e) => e.message).join(" | ");
                setError(combinedMessages);
            } else if (res?.payload?.response?.data?.message) {
                setError(res?.payload?.response?.data?.message);
            }
        });
    };

    const handleVerifyOtp = () => {
        if (!otp || otp.trim().length === 0) {
            setOtpError("Please enter the OTP");
            return;
        }
        setIsVerifying(true);
        dispatch(verifyOtpNew({ id: otpId, otp })).then((res) => {
            setIsVerifying(false);
            if (res?.payload?.status_code === 200) {
                setOtpError("");
                setOtpSuccess("OTP Verified Successfully!");
                dispatch(createScratchFreeSubscription()).then(() => {
                    dispatch(createSubscriptionCount());
                });
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

    const handleResendOtp = () => {
        dispatch(resendOtpNew(otpId));
    };

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
            handleResendOtp();
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

    const EyeIcon = ({ show }) => show ? (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ) : (
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
                .rm-reg-input {
                    width: 100%;
                    padding: 11px 16px;
                    border: 1.5px solid #e5e7eb;
                    border-radius: 12px;
                    font-size: 13.5px;
                    color: #1a1a2e;
                    background: #fafafa;
                    outline: none;
                    transition: all 0.2s;
                    font-family: 'DM Sans', sans-serif;
                    box-sizing: border-box;
                }
                .rm-reg-input:focus { border-color: #800080; background: #fff; box-shadow: 0 0 0 3px rgba(128,0,128,0.08); }
                .rm-reg-input::placeholder { color: #b0b0c0; }
                .rm-reg-btn {
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
                    font-family: 'DM Sans', sans-serif;
                }
                .rm-reg-btn:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(128,0,128,0.3); }
                .rm-reg-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
                .rm-reg-label { font-size: 12.5px; font-weight: 600; color: #374151; margin-bottom: 5px; display: block; font-family: 'DM Sans', sans-serif; }
                .rm-reg-error { color: #dc2626; font-size: 11.5px; margin-top: 3px; }
                .rm-reg-field { margin-bottom: 14px; }
                .rm-eye-btn { position: absolute; right: 13px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0; display: flex; align-items: center; }
                .rm-reg-google {
                    width: 100%;
                    padding: 11px;
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
                    margin-bottom: 18px;
                }
                .rm-reg-google:hover { border-color: #800080; background: #fdf4ff; }
                .rm-reg-divider { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
                .rm-reg-divider::before, .rm-reg-divider::after { content: ''; flex: 1; height: 1px; background: #e5e7eb; }
                .rm-reg-divider span { color: #9ca3af; font-size: 12px; font-weight: 500; }
                .otp-box-reg {
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
                .otp-box-reg:focus { border-color: #800080; background: #fff; box-shadow: 0 0 0 3px rgba(128,0,128,0.08); }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>

            <Modal size="lg" show={openRegisterModal} onClose={() => setOpenRegisterModal(false)}>
                <ModalHeader className='border-none pb-0 absolute right-3 top-3 bg-transparent z-10'>&nbsp;</ModalHeader>
               <ModalBody className='rm-modal-body bg-white p-0 rounded-2xl overflow-y-auto' style={{ maxHeight: '90dvh' }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

                        {/* Top accent bar */}
                        <div style={{ height: "5px", background: "linear-gradient(90deg, #800080, #b44db4, #e879f9)" }} />

                        <div style={{ padding: "36px 44px 40px" }}>

                            {!showOtpScreen ? (
                                <>
                                    {/* Header */}
                                    <div style={{ marginBottom: "28px" }}>
                                        <div style={{
                                            width: "48px", height: "48px", borderRadius: "14px",
                                            background: "linear-gradient(135deg, #800080, #b44db4)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            marginBottom: "14px", boxShadow: "0 4px 14px rgba(128,0,128,0.3)"
                                        }}>
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                                <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a1a2e", margin: 0, lineHeight: 1.2 }}>
                                            Create your account
                                        </h2>
                                        <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "5px" }}>
                                            Join ResumeMile and land your dream job
                                        </p>
                                    </div>

                                    {/* Form */}
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/* Name Row */}
                                        <div style={{ display: "flex", gap: "12px" }}>
                                            <div className="rm-reg-field" style={{ flex: 1 }}>
                                                <label className="rm-reg-label">First Name</label>
                                                <input className="rm-reg-input" type="text" placeholder="John"
                                                    {...register("first_name", { required: "Required" })} />
                                                {errors?.first_name && <p className="rm-reg-error">{errors.first_name.message}</p>}
                                            </div>
                                            <div className="rm-reg-field" style={{ flex: 1 }}>
                                                <label className="rm-reg-label">Last Name</label>
                                                <input className="rm-reg-input" type="text" placeholder="Doe"
                                                    {...register("last_name", { required: "Required" })} />
                                                {errors?.last_name && <p className="rm-reg-error">{errors.last_name.message}</p>}
                                            </div>
                                        </div>

                                        <div className="rm-reg-field">
                                            <label className="rm-reg-label">Email Address</label>
                                            <input className="rm-reg-input" type="email" placeholder="you@example.com"
                                                {...register("email", { required: "Email is required" })} />
                                            {errors?.email && <p className="rm-reg-error">{errors.email.message}</p>}
                                        </div>

                                        <div className="rm-reg-field">
                                            <label className="rm-reg-label">Username</label>
                                            <input className="rm-reg-input" type="text" placeholder="johndoe123"
                                                {...register("username", { required: "Username is required" })} />
                                            {errors?.username && <p className="rm-reg-error">{errors.username.message}</p>}
                                        </div>

                                        {chooseResumeType == 2 && (
                                            <div className="rm-reg-field">
                                                <label className="rm-reg-label">Institution Name</label>
                                                <input className="rm-reg-input" type="text" placeholder="Acme Corp"
                                                    {...register("organization_name", { required: "Institution name is required" })} />
                                                {errors?.organization_name && <p className="rm-reg-error">{errors.organization_name.message}</p>}
                                            </div>
                                        )}

                                        <div className="rm-reg-field">
                                            <label className="rm-reg-label">Password</label>
                                            <div style={{ position: "relative" }}>
                                                <input className="rm-reg-input" type={showPassword ? "text" : "password"}
                                                    placeholder="Min. 6 characters" style={{ paddingRight: "44px" }}
                                                    {...register("password", { required: "Password is required" })} />
                                                <button type="button" className="rm-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                                                    <EyeIcon show={showPassword} />
                                                </button>
                                            </div>
                                            {errors?.password && <p className="rm-reg-error">{errors.password.message}</p>}
                                        </div>

                                        <div className="rm-reg-field">
                                            <label className="rm-reg-label">Confirm Password</label>
                                            <div style={{ position: "relative" }}>
                                                <input className="rm-reg-input" type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Re-enter password" style={{ paddingRight: "44px" }}
                                                    {...register("confirm_password", {
                                                        required: "Please confirm your password",
                                                        validate: (value) => value === password || "Passwords do not match"
                                                    })} />
                                                <button type="button" className="rm-eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                    <EyeIcon show={showConfirmPassword} />
                                                </button>
                                            </div>
                                            {errors?.confirm_password && <p className="rm-reg-error">{errors.confirm_password.message}</p>}
                                        </div>

                                        {error && (
                                            <div style={{
                                                background: "#fef2f2", border: "1px solid #fecaca",
                                                borderRadius: "10px", padding: "11px 14px",
                                                marginBottom: "14px", display: "flex", alignItems: "flex-start", gap: "8px"
                                            }}>
                                                <svg width="16" height="16" fill="#dc2626" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "1px" }}>
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                                </svg>
                                                <p style={{ color: "#dc2626", fontSize: "13px", margin: 0 }}>{error}</p>
                                            </div>
                                        )}

                                        <button type="submit" className="rm-reg-btn" disabled={loading}>
                                            {loading ? (
                                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
                                                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                                                        <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                                    </svg>
                                                    Creating account...
                                                </span>
                                            ) : "Create Account"}
                                        </button>
                                    </form>

                                    <p style={{ textAlign: "center", marginTop: "20px", fontSize: "13.5px", color: "#6b7280" }}>
                                        Already have an account?{" "}
                                        <button onClick={openLoginModal} style={{ color: "#800080", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: "13.5px" }}>
                                            Sign In
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
                                    <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1a1a2e", marginBottom: "8px" }}>Verify your email</h2>
                                    <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>We sent a 6-digit code to</p>
                                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#800080", marginBottom: "28px" }}>{watch("email")}</p>

                                    <input
                                        className="otp-box-reg"
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

                                    <button onClick={handleVerifyOtp} disabled={isVerifying} className="rm-reg-btn" style={{ marginTop: "20px" }}>
                                        {isVerifying ? "Verifying..." : "Verify OTP"}
                                    </button>

                                    <div style={{ marginTop: "16px" }}>
                                        <ResendOtpButton handleResendOtp={handleResendOtp} setOtp={setOtp} />
                                    </div>
                                    <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "12px" }}>Didn't receive the code? You can resend it once the timer ends.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
};

export default RegistrationModal;

// 'use client';

// import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
// import Image from "next/image";
// import registerStepone from "../assets/imagesource/register_stepone.png";
// import { useForm } from "react-hook-form";
// import VerifyOtpModal from "./verifyOtpModal";
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile, registerCustomer, registerCustomerOrg, verifyOtpNew, resendOtpNew } from "../reducers/AuthSlice";
// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import { checkSubscription } from "../reducers/ProfileSlice";
// import { useRouter } from "next/navigation";
// import { getSearchHistory } from "../reducers/SearchHistroySlice";

// import { RiGoogleFill } from "react-icons/ri";
// import Link from 'next/link';
// import { useGoogleLogin } from "@react-oauth/google";
// import { getIpData } from "../reducers/PlanSlice";
// import { createScratchFreeSubscription, createSubscriptionCount } from "../reducers/ResumeSlice";




// const RegistrationModal = ({ openRegisterModal, setOpenRegisterModal, setOpenVerifyOtpModal, setOpenLoginModal, openPricModal, setOpenPriceModal, chooseResumeType }) => {

//     console.log("chooseResumeType", chooseResumeType);

//     const dispatch = useDispatch();
//     const router = useRouter();
//     const { loading } = useSelector((state) => state?.auth);
//     const [error, setError] = useState()

//     const [showOtpScreen, setShowOtpScreen] = useState(false);
//     const [otpId, setOtpId] = useState(null);  // store user id from register API
//     const [otp, setOtp] = useState("");
//     const [otpError, setOtpError] = useState("");
//     const [otpSuccess, setOtpSuccess] = useState("");
//     const [isVerifying, setIsVerifying] = useState(false);


//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm();
//     const password = watch("password");


//     const openLoginModal = () => {
//         setOpenLoginModal(true);
//         setOpenRegisterModal(false);
//     }

//     const handlePriceModal = () => {
//         setOpenPriceModal(true)
//         setOpenRegisterModal(false);
//     }
//     const { ipData } = useSelector((state) => state.planst);
//     useEffect(() => {
//         dispatch(getIpData());
//     }, [dispatch]);
//     const onSubmit = (data) => {
//         if (!chooseResumeType) {
//             return;
//         }
//         const payload1 = {
//             app: 1,
//             sign_up_type: chooseResumeType,
//             fullname: data?.first_name + " " + data?.last_name,
//             username: data?.username,
//             email: data?.email,
//             password: data?.password,
//             ...(chooseResumeType == 2 && { organization_name: data?.organization_name }),
//             confirm_password: data?.confirm_password,
//             ip_address: ipData?.ip,

//         }

//         dispatch(registerCustomer(payload1)).then((res) => {
//             console.log("resRegind", res);
//             if (res?.payload?.status_code === 201) {
//                 setOtpId(res?.payload?.data?.id);
//                 setShowOtpScreen(true);  // switch modal to OTP form
//             }
//             else if (res?.payload?.response?.data?.status_code === 422) {
//                 const validationErrors = res?.payload?.response?.data?.data || [];
//                 console.log("validationErrors", validationErrors);

//                 // Extract "message" from each error
//                 const combinedMessages = validationErrors.map((e) => e.message).join(" | ");

//                 setError(combinedMessages);
//             }
//         })
//     }

//     const handleVerifyOtp = () => {
//         if (!otp || otp.trim().length === 0) {
//             setOtpError("Please enter the OTP");
//             return;
//         }
//         setIsVerifying(true);
//         dispatch(verifyOtpNew({ id: otpId, otp })).then((res) => {
//             setIsVerifying(false);
//             if (res?.payload?.status_code === 200) {
//                 setOtpError(""); // clear previous error
//                 setOtpSuccess("OTP Verified Successfully!");
//                 dispatch(createScratchFreeSubscription()).then(() => {
//                     dispatch(createSubscriptionCount());
//                 });
//                 // Wait 3 seconds before redirect
//                 setTimeout(() => {
//                     setOpenRegisterModal(false);
//                     dispatch(getProfile());
//                     router.push("/plans");
//                 }, 5000);
//             } else {
//                 setOtpError("Invalid OTP. Please try again.");
//             }
//         });
//     };


//     // --- Resend OTP ---
//     const handleResendOtp = () => {
//         dispatch(resendOtpNew(otpId));
//     };

//     // --- OTP Resend Button Component ---
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
//             setOtp(""); // clear OTP input
//             handleResendOtp();
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
//             <Modal size="6xl" show={openRegisterModal} onClose={() => setOpenRegisterModal(false)}>
//                 <ModalHeader className='border-none pb-0 absolute right-3 top-3 bg-transparent'>&nbsp;</ModalHeader>
//                 <ModalBody className='bg-white p-0'>
//                     <div className="lg:flex min-h-[600px]">
//                         <div className='w-6/12 hidden lg:block register_image'>
//                             &nbsp;
//                         </div>
//                         <div className='lg:w-6/12 flex justify-center items-center'>
//                             <div className='py-16 px-5 lg:py-10 lg:px-20'>
//                                 {!showOtpScreen ? (
//                                     <>
//                                         <h2 className='text-[#000000] text-2xl lg:text-[30px] leading-[35px] font-semibold pb-5 text-center'>Sign Up</h2>
//                                         <div className='form_area'>
//                                             <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-0">
//                                                 <div className='flex gap-4'>
//                                                     <div className='w-full mb-2'>
//                                                         <div className="mb-0 block">
//                                                             <Label>First Name</Label>
//                                                         </div>
//                                                         <TextInput type="text" placeholder="Enter First Name"
//                                                             {...register("first_name", {
//                                                                 required: "First name is required",
//                                                             })}
//                                                         />
//                                                         {errors?.first_name && (
//                                                             <span className="text-red-500">
//                                                                 {errors?.first_name?.message}
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                     <div className='w-full mb-2'>
//                                                         <div className="mb-0 block">
//                                                             <Label>Last Name</Label>
//                                                         </div>
//                                                         <TextInput type="text" placeholder="Enter Last Name"
//                                                             {...register("last_name", {
//                                                                 required: "Last name is required",
//                                                             })}
//                                                         />
//                                                         {errors?.last_name && (
//                                                             <span className="text-red-500">
//                                                                 {errors?.last_name?.message}
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                                 <div className='mb-2'>
//                                                     <div className="mb-0 block">
//                                                         <Label>Email Address</Label>
//                                                     </div>
//                                                     <TextInput type="email" placeholder="Enter your Email Id"
//                                                         {...register("email", {
//                                                             required: "Email is required",
//                                                         })}
//                                                     />
//                                                     {errors?.email && (
//                                                         <span className="text-red-500">
//                                                             {errors?.email?.message}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 <div className='mb-2'>
//                                                     <div className="mb-0 block">
//                                                         <Label>Username</Label>
//                                                     </div>
//                                                     <TextInput type="text" placeholder="Enter your Username"
//                                                         {...register("username", {
//                                                             required: "Username is required",
//                                                         })}
//                                                     />
//                                                     {errors?.username && (
//                                                         <span className="text-red-500">
//                                                             {errors?.username?.message}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 {
//                                                     chooseResumeType == 2 && (
//                                                         <div className='mb-2'>
//                                                             <div className="mb-0 block">
//                                                                 <Label>Organization Name</Label>
//                                                             </div>
//                                                             <TextInput type="text" placeholder="Enter your Organization Name"
//                                                                 {...register("organization_name", {
//                                                                     required: "Organization Name is required",
//                                                                 })}
//                                                             />
//                                                             {errors?.organization_name && (
//                                                                 <span className="text-red-500">
//                                                                     {errors?.organization_name?.message}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     )
//                                                 }

//                                                 <div className='mb-2'>
//                                                     <div className="mb-0 block">
//                                                         <Label>Enter your Password</Label>
//                                                     </div>
//                                                     <TextInput type="password" placeholder='Type your password'
//                                                         {...register("password", {
//                                                             required: "Password is required",
//                                                         })}
//                                                     />
//                                                     {errors?.password && (
//                                                         <span className="text-red-500">
//                                                             {errors?.password?.message}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 <div className='mb-2'>
//                                                     <div className="mb-0 block">
//                                                         <Label>Confirm your Password</Label>
//                                                     </div>

//                                                     <TextInput
//                                                         type="password"
//                                                         placeholder="Type your password"
//                                                         {...register("confirm_password", {
//                                                             required: "Confirm Password is required",
//                                                             validate: (value) =>
//                                                                 value === password || "Password do not Match",
//                                                         })}
//                                                     />
//                                                     {errors.confirm_password && (
//                                                         <span className="text-red-500">
//                                                             {errors.confirm_password.message}
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                                 <Button type="submit" className='mt-2'>{loading ? "Wait..." : "Sign Up"}</Button>
//                                                 {
//                                                     error && (
//                                                         <div className="text-center text-sm text-red-600 mt-3">{error}</div>
//                                                     )
//                                                 }
//                                             </form>

//                                             <div className="mt-6 text-center">
//                                                 <p className="text-[#615D5D] text-[14px] leading-[20px] font-normal">Already have an account? <Link onClick={() => openLoginModal(true)} className="text-[#000000] hover:text-[#615D5D] font-medium" href="/" passHref>Log In</Link></p>
//                                             </div>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     // --- OTP screen ---
//                                     <div className="p-8 flex flex-col items-center bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto text-center">
//                                         <h2 className="text-3xl font-semibold mb-3 text-gray-900">Verify Your Email</h2>
//                                         <p className="text-gray-600 mb-6 text-sm">
//                                             We’ve sent a 6-digit verification code to your email:
//                                             <br />
//                                             <span className="font-medium text-blue-600">{watch("email")}</span>
//                                         </p>

//                                         <input
//                                             type="text"
//                                             placeholder="Enter OTP"
//                                             value={otp}
//                                             onChange={(e) => setOtp(e.target.value)}
//                                             className="border border-gray-300 rounded-xl p-3 mb-4 w-64 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
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

//                                         <div className="mt-4">
//                                             <ResendOtpButton handleResendOtp={handleResendOtp} setOtp={setOtp} />
//                                         </div>

//                                         <p className="text-gray-500 text-sm mt-4">
//                                             Didn’t receive the code? You can resend it once the timer ends.
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </ModalBody>
//             </Modal>


//         </>
//     )
// };

// export default RegistrationModal;