'use client';

import { Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { resetStatesPwg } from "../reducers/PwgnsSlice";
import { useDispatch, useSelector } from "react-redux";
import { League_Spartan } from "next/font/google";
import { resetStatesBlueConnects, subscriberInquiry } from "../reducers/BlueConnectsSlice";
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
    const { loadingSubscriberInquiry, subscriberInquiryData, subscriberInquiryError } = useSelector((state) => state?.blueConnects);

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

        dispatch(subscriberInquiry(payload)).then((res) => {
            console.log("inquiry res", res)
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
            <ToastContainer />
            <div className={`${leagueSpartan.variable} antialiased`}>
                <h2 className='${leagueSpartan.className} text-2xl font-semibold mb-2'>Balance Information</h2>

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='bg-white rounded-[10px] py-6 px-8 my-5 form_area form_details'>
                            <div className='lg:flex gap-4 mb-4'>
                                <div className='lg:w-6/12'>
                                    <div className="mb-1 block">
                                        <Label htmlFor="base">MDN</Label>
                                    </div>
                                    <TextInput id="base" type="text" sizing="md"
                                        {...register("mdn", {
                                            required: "mdn is required",
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: "MDN must be a 10-digit number",
                                            },
                                        })}
                                    />
                                    {errors?.mdn && (
                                        <p className="text-red-500 text-sm">{errors.mdn.message}</p>
                                    )}
                                </div>
                                <div className='lg:w-6/12'>
                                    <div className="mb-1 block">
                                        <Label htmlFor="base">ESN</Label>
                                    </div>
                                    <TextInput id="base" type="text" sizing="md"
                                        {...register("esn", {
                                            maxLength: {
                                                value: 25,
                                                message: "Esn must not exceed 25 characters",
                                            },
                                        })}
                                    />
                                    {errors?.esn && (
                                        <p className="text-red-500 text-sm">{errors.esn.message}</p>
                                    )}
                                </div>

                            </div>
                            <div className='lg:flex gap-4 mb-4'>
                                <div className='lg:w-6/12'>
                                    <div className="mb-1 block">
                                        <Label htmlFor="base">Pending Balance</Label>
                                    </div>
                                    <Select id="countries" {...register("pendingBalance")}>
                                        <option>Select</option>
                                        <option value="Y">Yes</option>
                                        <option value="N">No</option>
                                    </Select>
                                </div>
                                <div className='w-6/12'>&nbsp;</div>
                            </div>

                            <button className='lg:mt-8'>Submit</button>
                        </div>
                    </form>
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
                                            {...register1("msisdn", {
                                                required: "MSISDN is required",
                                                pattern: {
                                                    value: /^[0-9]{10}$/,
                                                    message: "MSISDN must be a 10-digit number",
                                                },
                                            })}
                                        />
                                        {errors1?.msisdn && (
                                            <p className="text-red-500 text-sm">{errors1.msisdn.message}</p>
                                        )}
                                    </div>
                                    <div className='lg:w-6/12'>
                                        <div className="mb-1 block">
                                            <Label htmlFor="base">Balance Information</Label>
                                        </div>
                                        <Select
                                            id="base"
                                            {...register1("balance_info", {
                                                required: "Balance Info is required",
                                            })}
                                        >
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </Select>
                                        {errors1?.balance_info && (
                                            <p className="text-red-500 text-sm">
                                                {errors1.balance_info.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <button className='lg:mt-8'>{loadingSubscriberInquiry ? "Submitting..." : "Submit"}</button>
                            </div>
                        </form>

                        {showAttTable && subscriberInquiryData &&
                            <div className="bg-white p-12 mt-6 rounded-2xl shadow">
                                {subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo && (
                                    <>
                                        <h3 className="text-lg font-bold mt-4 mb-2 underline">
                                            Balance Information:
                                        </h3>
                                        <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Tariff Code
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Product Type
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Active Date
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Valid From
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Valid To
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Next Renewal
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo?.purchase?.map(
                                                    (balance, bIndex) => (
                                                        <tr key={bIndex} className="hover:bg-gray-50">
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {balance?.tarrifCode}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {balance?.productType}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {balance?.activeDate}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {balance?.validFrom}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {balance?.validTo}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {balance?.nextRenewal || "N/A"}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>

                                        <h4 className="text-lg font-bold mt-4 mb-2 underline">
                                            TPSP Status:
                                        </h4>
                                        <div className="ml-4 mb-4">
                                            <p>
                                                <strong>Result Code:</strong>{" "}
                                                {
                                                    subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo
                                                        ?.tpspStatus?.resultCode
                                                }
                                            </p>
                                            <p>
                                                <strong>Result String:</strong>{" "}
                                                {
                                                    subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo
                                                        ?.tpspStatus?.resultstring
                                                }
                                            </p>
                                            <p>
                                                <strong>Result String:</strong>{" "}
                                                {
                                                    subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo
                                                        ?.tpspStatus?.resultString
                                                }
                                            </p>
                                            <p>
                                                <strong>Air Time Expiration:</strong>{" "}
                                                {
                                                    subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo
                                                        ?.tpspStatus?.airTimeExpiration
                                                }
                                            </p>
                                            <p>
                                                <strong>Monitory Balance:</strong>{" "}
                                                {
                                                    subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo
                                                        ?.tpspStatus?.monitoryBalance
                                                }
                                            </p>
                                            <p>
                                                <strong>Auto Renew Status:</strong>{" "}
                                                {
                                                    subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo
                                                        ?.tpspStatus?.autoRenewStatus
                                                }
                                            </p>
                                            <p>
                                                <strong>Auto Renew Execution Date:</strong>{" "}
                                                {
                                                    subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo
                                                        ?.tpspStatus?.autoRenewExecutionDate
                                                }
                                            </p>
                                        </div>

                                        <h4 className="text-md font-bold mt-2 underline">Balances:</h4>
                                        <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Service Type
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Quantity
                                                    </th>
                                                    <th className="border border-gray-300 px-4 py-2 text-left">
                                                        Units Description
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subscriberInquiryData?.data?.wholeSaleApi?.wholeSaleResponse?.result?.balanceInfo?.balances?.map(
                                                    (bal, bIndex) => (
                                                        <tr key={bIndex} className="hover:bg-gray-50">
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {bal?.servicetype}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {bal?.quantity}
                                                            </td>
                                                            <td className="border border-gray-300 px-4 py-2">
                                                                {bal?.unitsdescription}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </>
                                )}
                            </div>
                        }

                        {showError && subscriberInquiryError && (
                            <div className="bg-white p-12 mt-6 rounded-2xl shadow">
                                <div className="flex">
                                    <div className="mr-2 font-semibold">Error : </div>
                                    <div className="text-red-600">{subscriberInquiryError}</div>
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