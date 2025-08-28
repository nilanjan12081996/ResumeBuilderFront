'use client';

import { Button, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import Image from "next/image";
import registerStepone from "../assets/imagesource/register_stepone.png";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { otpVerifyCustomer } from "../reducers/AuthSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const VerifyOtpModal = ({ openVerifyOtpModal, setOpenVerifyOtpModal, setOpenLoginModal, whichPlan }) => {
    console.log("whichPlan", whichPlan)
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector((state) => state?.auth);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(otpVerifyCustomer(data)).then((res) => {
            console.log("otp res", res)
            if (res?.payload?.status_code === 200) {
                toast.success(res?.payload?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                });
                setOpenVerifyOtpModal(false);
                // if (whichPlan === 1) {
                //     router.push("https://buy.stripe.com/3cI28rgoRb7536h4li4sE07")
                // } else if (whichPlan === 2) {
                //     router.push("https://buy.stripe.com/eVq9AT2y11wvcGR1964sE06")
                // } else if (whichPlan === 3) {
                //     router.push("https://buy.stripe.com/bJe4gzegJfnl0Y9eZW4sE05")
                // } else if (whichPlan === 4) {
                //     router.push("https://buy.stripe.com/fZu4gz2y17UT4al0524sE04")
                // } else if (whichPlan === 6) {
                //     router.push("https://buy.stripe.com/5kQ6oH5Kd0srfT34li4sE03")
                // } else if (whichPlan === 7) {
                //     router.push("https://buy.stripe.com/6oU5kDc8Bcb99uFeZW4sE02")
                // } else if (whichPlan === 8) {
                //     router.push("https://buy.stripe.com/28E14ndcF1wv36h6tq4sE01")
                // } else {
                //     router.push("/pricing")
                // }
                setOpenLoginModal(true);
            } else {
                toast.error(res?.payload?.response?.data?.data?.[0]?.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        })
    };

    return (
        <>
            <Modal size="6xl" show={openVerifyOtpModal} onClose={() => setOpenVerifyOtpModal(false)}>
                <ModalHeader className='border-none pb-0 absolute right-3 top-3 bg-transparent'>&nbsp;</ModalHeader>
                <ModalBody className='bg-white p-0'>
                    <div className="flex">
                        <div className='w-6/12 flex justify-center items-center'>
                            <div className='py-10 px-20'>
                                <h2 className='text-[#000000] text-[30px] leading-[35px] font-semibold pb-4'>Verify Otp with GetMobile</h2>
                                <div className='form_area'>
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-0">
                                        <div className='mb-2'>
                                            <div className="mb-1 block">
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
                                            <div className="mb-1 block">
                                                <Label>Otp</Label>
                                            </div>
                                            <TextInput type="text" placeholder="Enter your Otp"
                                                {...register("otp", {
                                                    required: "Otp is required",
                                                })}
                                            />
                                            {errors?.otp && (
                                                <span className="text-red-500">
                                                    {errors?.otp?.message}
                                                </span>
                                            )}
                                        </div>
                                        <h5 className="font-semibold text-red-400">Otp is valid for 5 minute&apos;s</h5>
                                        <Button type="submit" className='mt-2'>{loading ? "Wait..." : "Submit"}</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='w-6/12'>
                            <Image src={registerStepone} alt='registerStepone' />
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
};

export default VerifyOtpModal;