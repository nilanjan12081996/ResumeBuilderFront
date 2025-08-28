'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeSubscriptions } from '../reducers/PlanSlice';
import Link from 'next/link';
const page = () => {
    const { loading } = useSelector((state) => state?.planst)
    const searchParams = useSearchParams();
    const subsId = searchParams.get('subsId');
    const customerId = searchParams.get('customerId');
    const secrateKey = searchParams.get('cSecrateKey')
    const planId = searchParams.get('planId')
    const dispatch = useDispatch()
    const [status, setStatus] = useState(false)
    useEffect(() => {
        dispatch(completeSubscriptions({ subscription_id: subsId, secret_key: secrateKey, plan_id: planId, customer_id: customerId })).then((res) => {
            console.log("paymentres", res);
            if (res?.payload?.status_code === 201) {
                setStatus('success')
            }
            else {
                setStatus('fail')

            }

        })
    }, [subsId, customerId, secrateKey, planId])

    return (
        <>
            {
                loading ? (
                    <>
                        <h1 className='text-center text-red-600'>Please do not refresh this page</h1>
                    </>
                ) : (
                    <>
                        {
                            status === 'success' ? (
                                <>
                                    <div className="bg-gray-100 h-screen">
                                        <div className="bg-white p-6  md:mx-auto">
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="text-green-600 w-16 h-16 mx-auto my-6"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                                                ></path>
                                            </svg>
                                            <div className="text-center">
                                                <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                                                    Payment Done!
                                                </h3>
                                                <p className="text-gray-600 my-2">
                                                    Thank you for completing your secure online payment.
                                                </p>
                                                <p> Have a great day! </p>
                                                <div className="py-10 text-center">
                                                    <Link
                                                        href="/dashboard"
                                                        className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                                                    >
                                                        GO BACK
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="bg-gray-100 h-screen">
                                        <div className="bg-white p-6  md:mx-auto">
                                            {/* <svg
                viewBox="0 0 24 24"
                className="text-Red-600 w-16 h-16 mx-auto my-6"
              >
                <path
                  fill="currentColor"
                  d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                ></path>
              </svg> */}
                                            {/* <RxCross1 /> */}
                                            <div className="text-center">
                                                <h3 className="md:text-2xl text-base text-red-700 font-semibold text-center">
                                                    Payment Faild!
                                                </h3>
                                                <p className="text-gray-600 my-2">Try Again Later</p>
                                                <p> Have a great day! </p>
                                                <div className="py-10 text-center">
                                                    <Link
                                                        href="/plans"
                                                        className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                                                    >
                                                        GO BACK
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    )
}
export default page