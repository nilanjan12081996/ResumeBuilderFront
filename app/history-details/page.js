'use client';
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getSearchHistoryDetails } from "../reducers/SearchHistroySlice";
import { Spinner } from "flowbite-react";
import { Poppins } from 'next/font/google';
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'], // specify desired weights
    display: 'swap',
});
const page = () => {
    const { singleHistory, loading } = useSelector((state) => state?.his)
    const searchParams = useSearchParams();
    const dispatch = useDispatch()
    const id = searchParams.get('id');


    useEffect(() => {
        dispatch(getSearchHistoryDetails({ search_history_id: id }))
    }, [id])
    console.log("singleHitory", singleHistory);

    return (
        <>
            <p>
                <div>

                    <div className="how_it_works_section py-4 px-4 lg:px-0 lg:py-0">

                        <div className="">

                            {
                                loading ?
                                    <div className="flex justify-center items-center">
                                        <Spinner aria-label="Default status example" />
                                    </div>
                                    :
                                    <div className={`${poppins.variable} antialiased home_wrapper_arera`}>
                                        <div className="p-0 rounded-md mt-0">
                                            <div className="text-xl lg:text-3xl font-bold text-white mb-4">
                                                <span className="text-[#42C4AD] uppercase">{singleHistory?.search_query}</span>
                                            </div>

                                            <>

                                                <div className="mb-10">
                                                    <div className="mt-14 mb-6 spot_recommenda_bg rounded-[10px] px-6 py-7">
                                                        <div className="mb-2 lg:mb-4">
                                                            <h5 className="text-[#ffffff] text-[20px] lg:text-[28px] leading-[30px] font-semibold">Spot Recommendations</h5>
                                                        </div>
                                                        <div>
                                                            <h5 className="text-[#ffffff] text-[14px] lg:text-[18px] leading-[20px] font-medium">Short-term and long-term insights based on market sentiment.</h5>
                                                        </div>
                                                    </div>

                                                    <div className="lg:flex gap-10">
                                                        <div className="bg-[#2C2C2C] px-8 py-10 rounded-2xl shadow-lg lg:w-6/12 mb-5 lg:mb-0 short_term_spot">
                                                            <div className="mb-6 lg:flex justify-between items-center">
                                                                <h5 className="text-[#CDCDCD] text-[20px] leading-[30px] font-semibold mb-2 lg:mb-0">Short-term Spot </h5>
                                                                <div className="border-2 border-[#E49600] bg-[#FFF3DB] rounded-[25px] inline-block"><span className="text-[#E49600] text-[16px] leading-[38px] uppercase font-semibold px-8">{singleHistory?.search_response
                                                                    ?.spot_recommendations?.short_term?.action}</span></div>
                                                            </div>
                                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#F2F6FB] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#0B3363] uppercase pb-1.5">Entry Price</p>
                                                                    <span className="font-semibold text-[#06254B] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.spot_recommendations?.short_term?.entry_price}</span>
                                                                </div>
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#FEF2F2] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#BC0508] uppercase pb-1.5">Take Profit</p>
                                                                    <span className="font-semibold text-[#D91316] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.spot_recommendations?.short_term?.take_profit}</span>
                                                                </div>
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#F0FDF4] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#16A34A] uppercase pb-1.5">Stop Loss</p>
                                                                    <span className="font-semibold text-[#139E46] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.spot_recommendations?.short_term?.stop_loss}</span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-[#FFF7ED] rounded-[6px] p-6">
                                                                <p className="text-[#9A3412] text-base font-semibold pb-2">Analysis</p>
                                                                <p className="text-[#832A0C] text-[14px] leading-[24px] font-normal"> {singleHistory?.
                                                                    search_response?.spot_recommendations?.short_term?.rationale?.sentiment_analysis}</p>
                                                            </div>
                                                        </div>

                                                        <div className="bg-[#2C2C2C] px-8 py-10 rounded-2xl shadow-lg lg:w-6/12 long_term_spot">
                                                            <div className="mb-6 lg:flex justify-between items-center">
                                                                <h5 className="text-[#CDCDCD] text-[20px] leading-[30px] font-semibold mb-2 lg:mb-0">Long-term Spot</h5>
                                                                <div className="border-2 border-[#02571C] bg-[#E8FFEF] rounded-[25px] inline-block"><span className="text-[#02571C] text-[16px] leading-[38px] uppercase font-semibold px-8">{singleHistory?.search_response?.spot_recommendations?.long_term?.action}</span></div>
                                                            </div>
                                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#F2F6FB] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#0B3363] uppercase pb-1.5">Entry Price</p>
                                                                    <span className="font-semibold text-[#06254B] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.spot_recommendations?.long_term?.entry_price}</span>
                                                                </div>
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#FEF2F2] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#BC0508] uppercase pb-1.5">Take Profit</p>
                                                                    <span className="font-semibold text-[#D91316] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.spot_recommendations?.long_term?.take_profit}</span>
                                                                </div>

                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#F0FDF4] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#16A34A] uppercase pb-1.5">Stop Loss</p>
                                                                    <span className="font-semibold text-[#139E46] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.spot_recommendations?.long_term?.stop_loss}</span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-[#FFF7ED] rounded-[6px] p-6">
                                                                <p className="text-[#9A3412] text-base font-semibold pb-2">Analysis</p>
                                                                <p className="text-[#832A0C] text-[14px] leading-[24px] font-normal"> {singleHistory?.search_response?.spot_recommendations?.long_term?.rationale?.sentiment_analysis}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="mb-10">

                                                    <div className="mt-14 mb-6 leveraged_recommendations_bg rounded-[10px] px-6 py-7">
                                                        <div className="mb-2 lg:mb-4">
                                                            <h5 className="text-[#ffffff] text-[20px] lg:text-[28px] leading-[30px] font-semibold">Leveraged Recommendations</h5>
                                                        </div>
                                                        <div>
                                                            <h5 className="text-[#ffffff] text-[14px] lg:text-[18px] font-medium">Recommendations involving margin/leverage strategy.</h5>
                                                        </div>
                                                    </div>

                                                    <div className="lg:flex gap-10">

                                                        <div className="bg-[#2C2C2C] px-8 py-10 rounded-2xl shadow-lg lg:w-6/12 short_term_leveraged">
                                                            <div className="mb-6 lg:flex justify-between items-center">
                                                                <h5 className="text-[#CDCDCD] text-[20px] leading-[30px] font-semibold mb-2 lg:mb-0">Short-term Leveraged </h5>
                                                                <div className="flex items-center gap-1">
                                                                    <div className="border-2 border-[#02571C] bg-[#E8FFEF] rounded-[25px]">
                                                                        <span className="text-[#02571C] text-[16px] leading-[38px] uppercase font-semibold px-8">{singleHistory?.search_response?.leveraged_recommendations?.short_term?.position}</span>
                                                                    </div>
                                                                    <div className="border-2 border-[#E49600] bg-[#FFF3DB] rounded-[25px]">
                                                                        <span className="text-[#E49600] text-[16px] leading-[38px] uppercase font-semibold px-4">{singleHistory?.search_response?.leveraged_recommendations?.short_term?.leverage}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#F2F6FB] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#0B3363] uppercase pb-1.5">Entry Price</p>
                                                                    <span className="font-semibold text-[#06254] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.leveraged_recommendations?.short_term?.entry_price}</span>
                                                                </div>
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#FEF2F2] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#BC0508] uppercase pb-1.5">Take Profit</p>
                                                                    <span className="font-semibold text-[#D91316] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.leveraged_recommendations?.short_term?.take_profit}</span>
                                                                </div>
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#F0FDF4] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#16A34A] uppercase pb-1.5">Stop Loss</p>
                                                                    <span className="font-semibold text-[#139E46] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.leveraged_recommendations?.short_term?.stop_loss}</span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-[#EEF2FF] rounded-[6px] p-6">
                                                                <p className="text-[#4338CA] text-base font-semibold pb-2">Analysis</p>
                                                                <p className="text-[#4338CA] text-[14px] leading-[24px] font-normal"> {singleHistory?.search_response?.leveraged_recommendations?.short_term?.rationale?.sentiment_macro_analysis}</p>
                                                            </div>
                                                        </div>


                                                        <div className="bg-[#2C2C2C] px-8 py-10 rounded-2xl shadow-lg lg:w-6/12 long_term_leveraged">
                                                            <div className="mb-6 lg:flex justify-between items-center">
                                                                <h5 className="text-[#CDCDCD] text-[20px] leading-[30px] font-semibold mb-2 lg:mb-0">Long-term Leveraged </h5>
                                                                <div className="flex items-center gap-1">
                                                                    <div className="border-2 border-[#02571C] bg-[#E8FFEF] rounded-[25px]">
                                                                        <span className="text-[#02571C] text-[16px] leading-[38px] capitalize px-8 inline-block">{singleHistory?.search_response?.leveraged_recommendations?.long_term?.position}</span>
                                                                    </div>
                                                                    <div className="border-2 border-[#E72051] bg-[#FFDDE5] rounded-[25px]">
                                                                        <span className="text-[#E72051] text-[16px] leading-[38px] uppercase font-semibold px-4 inline-block">{singleHistory?.search_response?.leveraged_recommendations?.long_term?.leverage}</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#F2F6FB] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#0B3363] uppercase pb-1.5">Entry Price</p>
                                                                    <span className="font-semibold text-[#06254] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.leveraged_recommendations?.long_term?.entry_price}</span>
                                                                </div>
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#FEF2F2] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#BC0508] uppercase pb-1.5">Take Profit</p>
                                                                    <span className="font-semibold text-[#D91316] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.leveraged_recommendations?.long_term?.take_profit}</span>
                                                                </div>
                                                                <div className="text-[#2D2D2D] text-[15px] font-normal bg-[#F0FDF4] text-center rounded-[6px] py-4">
                                                                    <p className="text-sm text-[#16A34A] uppercase pb-1.5">Stop Loss</p>
                                                                    <span className="font-semibold text-[#139E46] text-xl">
                                                                        {/* {currency == "USD" ? "$" : currency == 'EURO' ? "€" : currency === 'AUD' ? 'A$' : '₮'} */}
                                                                        {singleHistory?.search_response?.leveraged_recommendations?.long_term?.stop_loss}</span>
                                                                </div>
                                                            </div>
                                                            <div className="bg-[#EEF2FF] rounded-[6px] p-6">
                                                                <p className="text-[#4338CA] text-base font-semibold pb-2">Analysis</p>
                                                                <p className="text-[#4338CA] text-[14px] leading-[24px] font-normal"> {singleHistory?.search_response?.leveraged_recommendations?.long_term?.rationale?.sentiment_macro_analysis}</p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </>





                                        </div>
                                    </div>
                            }



                        </div>

                    </div>
                </div>
            </p>
        </>
    )
}
export default page