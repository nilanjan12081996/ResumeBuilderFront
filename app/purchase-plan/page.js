'use client';

import { Label, TextInput } from "flowbite-react";
import { League_Spartan } from "next/font/google";
import { useForm } from "react-hook-form";
import { purchasePlan, resetStatesPwg } from "../reducers/PwgnsSlice";
import { buyPlan, resetStatesBlueConnects } from "../reducers/BlueConnectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { detectIccid } from "../reducers/AuthSlice";

const leagueSpartan = League_Spartan({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // specify desired weights
    display: 'swap',
});

const Page = () => {
    const dispatch = useDispatch();
    const [showTmobileTable, setShowTmobileTable] = useState(false);
    const [showAttTable, setShowAttTable] = useState(false);
    const [showError, setShowError] = useState(false);
    const [iccid, setIccid] = useState("");
    const [showIccid, setShowIccid] = useState(true);
    const [showTmobile, setShowTmobile] = useState(false);
    const [showAtt, setShowAtt] = useState(false);
    const { loadingIccid } = useSelector((state) => state?.auth);
    const { loadingPurchasePlan, purchasePlanData, purchasePlanError } = useSelector((state) => state?.pwg);
    const { loadingBuyPlan, buyPlanData, buyPlanError } = useSelector((state) => state?.blueConnects);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {
        register: register1,
        handleSubmit: handleSubmit1,
        formState: { errors: errors1 },
    } = useForm();

    const handleIccid = (e) => {
        setIccid(e.target.value);
    };

    const handleSubmitIccid = () => {
        console.log("iccid", iccid)
        dispatch(detectIccid(iccid)).then((res) => {
            console.log("iccid res", res)
            if (res?.payload?.status_code === 200) {
                if (res?.payload?.data?.["T-Mobile"] === true) {
                    setShowError(false);
                    setShowAtt(false);
                    setShowTmobile(true);
                } else if (res?.payload?.data?.["AT&T"] === true) {
                    setShowError(false);
                    setShowTmobile(false);
                    setShowAtt(true);
                }
            }
        })
    };

    const onSubmit = (data) => {
        const payload = {
            ...data,
            x_access_token: "opencom_sk8def63cb-ada0-45d9-bf00-239b58392ecf-84cc1ba9-7368-4ab7-b1e3-62cb531458a8"
        };

        // Strictly check that at least one field in E911ADDRESS is not empty or whitespace
        const hasValidE911Address = data?.E911ADDRESS &&
            Object.values(data.E911ADDRESS).some(val => typeof val === 'string' && val.trim() !== "");

        if (hasValidE911Address) {
            payload.E911ADDRESS = data.E911ADDRESS;
        } else {
            // Ensure E911ADDRESS is removed if not valid
            delete payload.E911ADDRESS;
        }

        dispatch(purchasePlan(payload)).then((res) => {
            console.log("purchase res", res)
            if (res?.payload?.status_code === 200) {
                setShowError(false);
                setShowTmobileTable(true);
            } else {
                setShowTmobileTable(false);
                setShowError(true);
            }
        })
    };

    const onSubmit1 = (data) => {
        const payload = {
            ...data,
            x_access_token: "opencom_sk8def63cb-ada0-45d9-bf00-239b58392ecf-84cc1ba9-7368-4ab7-b1e3-62cb531458a8",
        };

        dispatch(buyPlan(payload)).then((res) => {
            console.log("buy res", res);
            if (res?.payload?.status_code === 200) {
                setShowError(false);
                setShowAttTable(true);
            } else {
                setShowAttTable(false);
                setShowError(true);
            }
        })
    };

    useEffect(() => {
        dispatch(resetStatesPwg());
        dispatch(resetStatesBlueConnects());
    }, [dispatch]);

    return (
        <>
            <div className={`${leagueSpartan.variable} antialiased`}>
                <h2 className='${leagueSpartan.className} text-2xl font-semibold mb-2'>Purchase Plan</h2>

                {showIccid &&
                    <div className='bg-white rounded-[10px] py-6 px-8 my-5 form_area form_details'>
                        <div className='lg:flex gap-4 mb-4'>
                            <div className='lg:w-6/12'>
                                <div className="mb-1 block">
                                    <Label htmlFor="base">Enter ICCID</Label>
                                </div>
                                <TextInput id="base" type="text" sizing="md"
                                    value={iccid}
                                    onChange={handleIccid}
                                />
                            </div>
                            <div className='w-6/12'>&nbsp;</div>
                        </div>
                        <button onClick={handleSubmitIccid} className='lg:mt-8'>{loadingIccid ? "wait..." : "Submit"}</button>
                    </div>
                }

                {showTmobile &&
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='bg-white rounded-[10px] py-6 px-8 my-5 form_area form_details'>
                                <div className='lg:flex gap-4 mb-4'>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">MDN</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register("mdn", {
                                                required: "MDN is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "MDN must be a 10-digit number",
                                                },
                                            })}
                                        />
                                        {errors.mdn && (
                                            <p className="text-red-500 text-sm">{errors.mdn.message}</p>
                                        )}
                                    </div>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">Plan ID</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register("plan_id", { required: "Plan id is required", })}
                                        />
                                        {errors?.plan_id && (
                                            <p className="text-red-500 text-sm">
                                                {errors.plan_id.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <h3 className='text-[#878787] text-xl font-semibold mb-4'>E911 Address</h3>
                                <div className='lg:flex gap-4 mb-4'>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">Street 1</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register("E911ADDRESS.STREET1")}
                                        />
                                    </div>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">Street 2</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md" {...register("E911ADDRESS.STREET2")} />
                                    </div>
                                </div>
                                <div className='lg:flex gap-4 mb-4'>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">City</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register("E911ADDRESS.CITY")}
                                        />
                                    </div>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">State</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register("E911ADDRESS.STATE"
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className='lg:flex gap-4 mb-4'>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">E911 ZIP Code</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register("E911ADDRESS.ZIP")}
                                        />
                                    </div>
                                    <div className='w-6/12'>&nbsp;</div>
                                </div>
                                <button className='lg:mt-8'>{loadingPurchasePlan ? "Submitting..." : "Submit"}</button>
                            </div>
                        </form>

                        {showError && purchasePlanError && (
                            <div className="bg-white p-12 mt-6 rounded-2xl shadow">
                                <div className="flex">
                                    <div className="mr-2 font-semibold">Error : </div>
                                    <div className="text-red-600">{purchasePlanError}</div>
                                </div>
                            </div>
                        )}
                    </>
                }

                {showAtt &&
                    <>
                        <form onSubmit={handleSubmit1(onSubmit1)}>
                            <div className='bg-white rounded-[10px] py-6 px-8 my-5 form_area form_details'>
                                <div className='lg:flex gap-4 mb-4'>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">MSISDN</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register1("MSISDN", {
                                                required: "MSISDN is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "MSISDN must be a 10-digit number",
                                                },
                                            })}
                                        />
                                        {errors1?.MSISDN && (
                                            <p className="text-red-500 text-sm">{errors1.MSISDN.message}</p>
                                        )}
                                    </div>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">New Plan Code</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register1("planCode", {
                                                required: "Plan Code is required",
                                            })}
                                        />
                                        {errors1?.planCode && (
                                            <p className="text-red-500 text-sm">
                                                {errors1.planCode.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button className='lg:mt-8'>{loadingBuyPlan ? "Submitting..." : "Submit"}</button>
                            </div>
                        </form>

                        {showError && buyPlanError && (
                            <div className="bg-white p-12 mt-6 rounded-2xl shadow">
                                <div className="flex">
                                    <div className="mr-2 font-semibold">Error : </div>
                                    <div className="text-red-600">{buyPlanError}</div>
                                </div>
                            </div>
                        )}
                    </>
                }

            </div>
        </>
    )
};

export default Page;