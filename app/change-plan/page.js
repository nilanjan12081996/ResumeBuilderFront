'use client';

import { Label, Select, TextInput } from "flowbite-react";
import { League_Spartan } from "next/font/google";
import { useForm } from "react-hook-form";
import { switchPlan } from "../reducers/BlueConnectsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { detectIccid } from "../reducers/AuthSlice";
import { toast, ToastContainer } from "react-toastify";


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
    const { loadingSwitchPlan, switchPlanData, switchPlanError } = useSelector((state) => state?.blueConnects);

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
        toast.error("Work in progress", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const onSubmit1 = (data) => {
        const payload = {
            ...data,
            x_access_token: "opencom_sk8def63cb-ada0-45d9-bf00-239b58392ecf-84cc1ba9-7368-4ab7-b1e3-62cb531458a8",
        };

        dispatch(switchPlan(payload)).then((res) => {
            console.log("switchplan res", res)
            if (res?.payload?.status_code === 200) {
                setShowError(false);
                setShowAttTable(true);
            } else {
                setShowAttTable(false);
                setShowError(true);
            }
        })
    };

    return (
        <>
            <ToastContainer />
            <div className={`${leagueSpartan.variable} antialiased`}>
                <h2 className='${leagueSpartan.className} text-2xl font-semibold mb-2'>Change Plan</h2>

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
                                            <Label htmlFor="base">Sim</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register("sim", {
                                                maxLength: {
                                                    value: 25,
                                                    message: "Sim must not exceed 25 characters",
                                                },
                                            })}
                                        />
                                        {errors.sim && (
                                            <p className="text-red-500 text-sm">{errors.sim.message}</p>
                                        )}
                                    </div>
                                </div>
                                <div className='lg:flex gap-4 mb-4'>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">New Plan ID</Label>
                                        </div>
                                        <TextInput id="base" type="text" sizing="md"
                                            {...register("newplanID", {
                                                required: "Plan ID is required",
                                            })}
                                        />
                                        {errors?.newplanID && (
                                            <p className="text-red-500 text-sm">
                                                {errors.newplanID.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className='w-6/12'>&nbsp;</div>
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
                                            {...register("E911ADDRESS.ZIP", {
                                                required: "Zip is required",
                                                pattern: {
                                                    value: /^[0-9]{5}$/,
                                                    message: "E911 ZIP Code must be exactly 5 digits",
                                                },
                                            })}
                                        />
                                        {errors?.E911ADDRESS?.ZIP && (
                                            <p className="text-red-500 text-sm">
                                                {errors.E911ADDRESS.ZIP.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className='w-6/12'>&nbsp;</div>
                                </div>
                                <button className='lg:mt-8'>Submit</button>
                            </div>
                        </form>
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
                                    {/* <div className='lg:w-6/12'>
                                <div className="mb-1 block">
                                    <Label htmlFor="base">Sim</Label>
                                </div>
                                <TextInput id="base" type="text" sizing="md"
                                    {...register1("sim", {
                                        pattern: {
                                            value: /^\d{19,}$/,
                                            message: "Sim must be at least 19 digits",
                                        },
                                    })}
                                />
                                {errors1?.sim && (
                                    <p className="text-red-500 text-sm">{errors1.sim.message}</p>
                                )}
                            </div> */}
                                    <div className='w-6/12'>&nbsp;</div>
                                </div>
                                <div className='lg:flex gap-4 mb-4'>
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
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">Keep Expiry Same</Label>
                                        </div>
                                        <Select
                                            id="base"
                                            {...register1("keepExpirySame", {
                                                required: "Keep Expiry Same is required",
                                            })}
                                        >
                                            <option value="N">No</option>
                                            <option value="Y">Yes</option>
                                        </Select>
                                        {errors1?.keepExpirySame && (
                                            <p className="text-red-500 text-sm">
                                                {errors1.keepExpirySame.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button className='lg:mt-8'>Submit</button>
                            </div>
                        </form>

                        {showError && switchPlanError && (
                            <div className="bg-white p-12 mt-6 rounded-2xl shadow">
                                <div className="flex">
                                    <div className="mr-2 font-semibold">Error : </div>
                                    <div className="text-red-600">{switchPlanError}</div>
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