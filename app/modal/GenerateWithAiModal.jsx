'use client';

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { HiSparkles } from "react-icons/hi2";

import {
    improvementSummary,
    improvementExperience,
    resetImpExperience,
    resetImpSummary,
    generateImpNewSummary,
    generateImpNewExperience,
    generateJdNewSummary,
    generateJdNewExperience,
} from "../reducers/DashboardSlice";

const TONES = [
    { label: "Professional", value: "Professional" },
    { label: "Impactful", value: "Impactful" },
    { label: "Leadership", value: "Leadership" },
];

const GenerateWithAiModal = ({
    open,
    onClose,
    aiType,
    initialText = "",
    fullResumeData,
    onApply,
}) => {
    const dispatch = useDispatch();
    console.log('fullResumeData', fullResumeData)
    const [tone, setTone] = useState("Professional");
    const [generatedHTML, setGeneratedHTML] = useState("");
    const [animatedText, setAnimatedText] = useState("");
    const [typingDone, setTypingDone] = useState(false);

    const scrollRef = useRef(null);
    const intervalRef = useRef(null);

    const lastAnimatedTextRef = useRef("");

    const {
        improvementSummaryLoading,
        improvementSummaryData,
        improvementExperienceLoading,
        improvementExperienceData,
        generateImpNewSummaryLoading,
        generateImpNewSummaryData,
        generateImpNewExperienceLoading,
        generateImpNewExperienceData,
        generateJdNewSummaryLoading,
        generateJdNewSummaryData,
        generateJdNewExperienceLoading,
        generateJdNewExperienceData,
    } = useSelector((state) => state.dash);

    const isLoading = 
        (aiType === "imp_summary" && (improvementSummaryLoading || generateImpNewSummaryLoading)) ||
        (aiType === "imp_experience" && (improvementExperienceLoading || generateImpNewExperienceLoading)) ||
        (aiType === "jd_summary" && generateJdNewSummaryLoading) ||
        (aiType === "jd_experience" && generateJdNewExperienceLoading);

    // Check if the field has existing content
    // const hasInitialText = !!initialText?.trim();
    const hasInitialText = !!initialText?.replace(/<[^>]*>/g, "").trim();

    const handleClose = () => {
        clearInterval(intervalRef.current);
        if (aiType === "imp_summary") dispatch(resetImpSummary());
        else dispatch(resetImpExperience());

        setGeneratedHTML("");
        setAnimatedText("");
        setTypingDone(false);
        lastAnimatedTextRef.current = "";
        onClose();
    };

    useEffect(() => {
        let raw;
        
        if (aiType === "imp_summary") {
            raw = improvementSummaryData?.summary || generateImpNewSummaryData?.summary;
        } else if (aiType === "imp_experience") {
            raw = improvementExperienceData?.summary || generateImpNewExperienceData?.summary;
        } else if (aiType === "jd_summary") {
            raw = generateJdNewSummaryData?.summary;
        } else if (aiType === "jd_experience") {
            raw = generateJdNewExperienceData?.summary;
        }

        if (!raw || raw === lastAnimatedTextRef.current) {
            return;
        }

        let html = "";
        let plainText = "";

        if (Array.isArray(raw) && raw.length > 0) {
            html = `<ul>${raw.map(item => `<li>${item}</li>`).join('')}</ul>`;
            plainText = raw.map(item => `• ${item}`).join("\n");
        } else if (typeof raw === "string") {
            const lines = raw.split(/\n|•/g).map(l => l.trim()).filter(Boolean);
            if (lines.length > 1) {
                html = `<ul>${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
                plainText = lines.map(l => `• ${l}`).join("\n");
            } else {
                html = lines[0] || "";
                plainText = lines[0] || "";
            }
        }

        lastAnimatedTextRef.current = raw;
        setGeneratedHTML(html);
        setAnimatedText("");
        setTypingDone(false);

        const tokens = plainText.split(/(\n|\s+)/).filter(Boolean);
        let index = 0;

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (index >= tokens.length) {
                clearInterval(intervalRef.current);
                setTypingDone(true);
                return;
            }
            const next = tokens[index];
            setAnimatedText(prev => prev + next);
            index++;
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, 40);

        return () => clearInterval(intervalRef.current);

    }, [
        aiType, 
        improvementSummaryData, 
        improvementExperienceData,
        generateImpNewSummaryData,
        generateImpNewExperienceData,
        generateJdNewSummaryData,
        generateJdNewExperienceData
    ]);

    useEffect(() => {
        if (!open) {
            clearInterval(intervalRef.current);
            setGeneratedHTML("");
            setAnimatedText("");
            setTypingDone(false);
            setTone("Professional");
            lastAnimatedTextRef.current = "";
        }
    }, [open]);

    const handleImprove = () => {
        const sourceText = initialText;
        if (!sourceText?.trim()) return;

        lastAnimatedTextRef.current = "";
        setAnimatedText("");
        setTypingDone(false);

        const payload = {
            security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
            tone,
            original_text: sourceText,
        };

        if (aiType === "imp_summary") {
            dispatch(improvementSummary(payload));
        } else {
            dispatch(improvementExperience(payload));
        }
    };

    const handleNewGenarate = () => {
        if (!fullResumeData) return;

        lastAnimatedTextRef.current = "";
        setAnimatedText("");
        setTypingDone(false);

        const payload = {
            security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
            tone,
            original_text: JSON.stringify(fullResumeData),
        };

        if (aiType === "jd_summary" || aiType === "jd_experience") {
            const targetJd = sessionStorage.getItem("target_jd");
            if (targetJd) {
                payload.JD = targetJd;
            }
        }

        if (aiType === "imp_summary") {
            dispatch(generateImpNewSummary(payload));
        } else if (aiType === "imp_experience") {
            dispatch(generateImpNewExperience(payload));
        } else if (aiType === "jd_summary") {
            dispatch(generateJdNewSummary(payload));
        } else if (aiType === "jd_experience") {
            dispatch(generateJdNewExperience(payload));
        }
    };

    const handleApply = () => {
        if (!generatedHTML) return;
        onApply(generatedHTML);
        handleClose();
    };

    if (!open) return null;

    return (
        <div className="fixed left-140 inset-0 z-[9999] flex items-center justify-center">
            <div className="bg-white min-w-[550px] max-w-md rounded-2xl p-4 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-sm font-bold tracking-wide text-[#800080] flex items-center">
                            <HiSparkles className="text-lg mr-2" /> AI WRITER
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Generate something new or improve what you've got!
                        </p>
                    </div>
                    <button onClick={handleClose}>
                        <FaTimes className="text-gray-400 hover:text-black" />
                    </button>
                </div>

                {/* Tone Selector */}
                {!animatedText && !isLoading && (
                    <div className="mt-5">
                        <p className="text-sm font-medium text-gray-600">Select Tone</p>
                        <div className="flex border-b border-gray-200 w-full">
                            {TONES.map(t => {
                                const active = tone === t.value;
                                return (
                                    <button
                                        key={t.value}
                                        type="button"
                                        onClick={() => setTone(t.value)}
                                        className={`flex-1 py-2 text-sm font-medium text-center relative transition-colors duration-200
                                        ${active ? "text-[#800080] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-[#800080]"
                                                : "text-gray-500 hover:text-[#800080]"}`
                                        }
                                    >
                                        {t.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Loading */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <ImSpinner2 className="animate-spin text-2xl text-purple-600 mb-3" />
                        <p className="text-sm text-gray-600">Putting words together...</p>
                    </div>
                )}

                {/* Modal Preview — shown after generation */}
                {!isLoading && animatedText && (
                    <div className="mt-6">
                        <div
                            ref={scrollRef}
                            className={`rounded-lg text-sm bg-gray-50 max-h-60 overflow-y-auto whitespace-pre-line p-3 transition-colors duration-300
                            ${typingDone ? "text-black" : "text-blue-600"}`}
                        >
                            {animatedText}
                            {!typingDone && <span className="animate-pulse ml-1">▍</span>}
                        </div>

                        <div className="flex gap-4 mt-5">
                            <button
                                onClick={handleNewGenarate}
                                className="w-1/2 py-2 rounded-lg !border !border-[#800080] text-sm hover:!text-[#800080] !transition"
                            >
                                Regenerate
                            </button>
                            <button
                                onClick={handleApply}
                                className="w-1/2 py-2 rounded-lg !bg-[#800080] !text-white text-sm hover:!bg-[#a173a1] !transition"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                )}

                {/* Initial Buttons — before any generation */}
                {!animatedText && !isLoading && (
                    <div className="flex mt-5 border border-[#e5d6e5] rounded-sm overflow-hidden relative">
                        {/* Generate — always visible */}
                        <button
                            onClick={handleNewGenarate}
                            className={`py-2 !bg-[#fff] !text-[#800080] text-sm hover:!bg-[#f3e6f3] transition ${hasInitialText ? "w-1/2" : "w-full"}`}
                        >
                            Generate
                        </button>

                        {/* Improve — only if field has existing text */}
                        {hasInitialText && (
                            <>
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-[2px] bg-[#d1b3d1]" />
                                <button
                                    onClick={handleImprove}
                                    className="w-1/2 py-2 !bg-[#fff] !text-[#800080] text-sm hover:!bg-[#f3e6f3] transition"
                                >
                                    Improve
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateWithAiModal;


// 'use client';

// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { FaTimes } from "react-icons/fa";
// import { ImSpinner2 } from "react-icons/im";
// import { HiSparkles } from "react-icons/hi2";

// import {
//     improvementSummary,
//     improvementExperience,
//     resetImpExperience,
//     resetImpSummary,
//     generateImpNewSummary,
//     generateImpNewExperience,
//     generateJdNewSummary,
//     generateJdNewExperience,
// } from "../reducers/DashboardSlice";

// const TONES = [
//     { label: "Professional", value: "Professional" },
//     { label: "Impactful", value: "Impactful" },
//     { label: "Leadership", value: "Leadership" },
// ];

// const GenerateWithAiModal = ({
//     open,
//     onClose,
//     aiType,
//     initialText = "",
//     fullResumeData,
//     onApply,
// }) => {
//     const dispatch = useDispatch();
//     console.log('fullResumeData', fullResumeData)
//     const [tone, setTone] = useState("Professional");
//     const [generatedHTML, setGeneratedHTML] = useState("");
//     const [animatedText, setAnimatedText] = useState("");
//     const [typingDone, setTypingDone] = useState(false);

//     const scrollRef = useRef(null);
//     const intervalRef = useRef(null);

//     const lastAnimatedTextRef = useRef("");

//     const {
//         improvementSummaryLoading,
//         improvementSummaryData,
//         improvementExperienceLoading,
//         improvementExperienceData,
//         generateImpNewSummaryLoading,
//         generateImpNewSummaryData,
//         generateImpNewExperienceLoading,
//         generateImpNewExperienceData,
//         generateJdNewSummaryLoading,
//         generateJdNewSummaryData,
//         generateJdNewExperienceLoading,
//         generateJdNewExperienceData,
//     } = useSelector((state) => state.dash);

//     const isLoading = 
//         (aiType === "imp_summary" && (improvementSummaryLoading || generateImpNewSummaryLoading)) ||
//         (aiType === "imp_experience" && (improvementExperienceLoading || generateImpNewExperienceLoading)) ||
//         (aiType === "jd_summary" && generateJdNewSummaryLoading) ||
//         (aiType === "jd_experience" && generateJdNewExperienceLoading);


//     const handleClose = () => {
//         clearInterval(intervalRef.current);
//         if (aiType === "imp_summary") dispatch(resetImpSummary());
//         else dispatch(resetImpExperience());

//         setGeneratedHTML("");
//         setAnimatedText("");
//         setTypingDone(false);
//         lastAnimatedTextRef.current = "";
//         onClose();
//     };

//     useEffect(() => {
//         let raw;
        
//         if (aiType === "imp_summary") {
//             raw = improvementSummaryData?.summary || generateImpNewSummaryData?.summary;
//         } else if (aiType === "imp_experience") {
//             raw = improvementExperienceData?.summary || generateImpNewExperienceData?.summary;
//         } else if (aiType === "jd_summary") {
//             raw = generateJdNewSummaryData?.summary;
//         } else if (aiType === "jd_experience") {
//             raw = generateJdNewExperienceData?.summary;
//         }

//         if (!raw || raw === lastAnimatedTextRef.current) {
//             return;
//         }

//         let html = "";
//         let plainText = "";

//         if (Array.isArray(raw) && raw.length > 0) {
//             html = `<ul>${raw.map(item => `<li>${item}</li>`).join('')}</ul>`;
//             plainText = raw.map(item => `• ${item}`).join("\n");
//         } else if (typeof raw === "string") {
//             const lines = raw.split(/\n|•/g).map(l => l.trim()).filter(Boolean);
//             if (lines.length > 1) {
//                 html = `<ul>${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
//                 plainText = lines.map(l => `• ${l}`).join("\n");
//             } else {
//                 html = lines[0] || "";
//                 plainText = lines[0] || "";
//             }
//         }

//         lastAnimatedTextRef.current = raw;
//         setGeneratedHTML(html);
//         setAnimatedText("");
//         setTypingDone(false);

//         const tokens = plainText.split(/(\n|\s+)/).filter(Boolean);
//         let index = 0;

//         clearInterval(intervalRef.current);
//         intervalRef.current = setInterval(() => {
//             if (index >= tokens.length) {
//                 clearInterval(intervalRef.current);
//                 setTypingDone(true);
//                 return;
//             }
//             const next = tokens[index];
//             setAnimatedText(prev => prev + next);
//             index++;
//             if (scrollRef.current) {
//                 scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//             }
//         }, 40);

//         return () => clearInterval(intervalRef.current);

//     }, [
//         aiType, 
//         improvementSummaryData, 
//         improvementExperienceData,
//         generateImpNewSummaryData,
//         generateImpNewExperienceData,
//         generateJdNewSummaryData,
//         generateJdNewExperienceData
//     ]);

//     useEffect(() => {
//         if (!open) {
//             clearInterval(intervalRef.current);
//             setGeneratedHTML("");
//             setAnimatedText("");
//             setTypingDone(false);
//             setTone("Professional");
//             lastAnimatedTextRef.current = "";
//         }
//     }, [open]);

//     const handleImprove = () => {
//         const sourceText = initialText;
//         if (!sourceText?.trim()) return;

//         lastAnimatedTextRef.current = "";
//         setAnimatedText("");
//         setTypingDone(false);

//         const payload = {
//             security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
//             tone,
//             original_text: sourceText,
//         };

//         if (aiType === "imp_summary") {
//             dispatch(improvementSummary(payload));
//         } else {
//             dispatch(improvementExperience(payload));
//         }
//     };

//     const handleNewGenarate = () => {
//         // Check if fullResumeData exists
//         if (!fullResumeData) return;

//         // Reset previous state
//         lastAnimatedTextRef.current = "";
//         setAnimatedText("");
//         setTypingDone(false);

//         // Base payload
//         const payload = {
//             security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
//             tone,
//             original_text: JSON.stringify(fullResumeData), // Convert fullResumeData to string
//         };

//         // For JD types, add the JD field from session storage
//         if (aiType === "jd_summary" || aiType === "jd_experience") {
//             const targetJd = sessionStorage.getItem("target_jd");
//             if (targetJd) {
//                 payload.JD = targetJd;
//             }
//         }

//         // Dispatch appropriate action based on aiType
//         if (aiType === "imp_summary") {
//             dispatch(generateImpNewSummary(payload));
//         } else if (aiType === "imp_experience") {
//             dispatch(generateImpNewExperience(payload));
//         } else if (aiType === "jd_summary") {
//             dispatch(generateJdNewSummary(payload));
//         } else if (aiType === "jd_experience") {
//             dispatch(generateJdNewExperience(payload));
//         }
//     };

//     const handleApply = () => {
//         if (!generatedHTML) return;
//         onApply(generatedHTML);
//         handleClose();
//     };

//     if (!open) return null;

//     return (
//         <div className="fixed left-140 inset-0 z-[9999] flex items-center justify-center">
//             <div className="bg-white min-w-[550px] max-w-md rounded-2xl p-4 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
//                 {/* Header */}
//                 <div className="flex justify-between items-start">
//                     <div>
//                         <h2 className="text-sm font-bold tracking-wide text-[#800080] flex items-center">
//                             <HiSparkles className="text-lg mr-2" /> AI WRITER
//                         </h2>
//                         <p className="text-sm text-gray-500 mt-1">
//                             Generate something new or improve what you've got!
//                         </p>
//                     </div>
//                     <button onClick={handleClose}>
//                         <FaTimes className="text-gray-400 hover:text-black" />
//                     </button>
//                 </div>

//                 {/* Tone Selector */}
//                 {!animatedText && !isLoading && (
//                     <div className="mt-5">
//                         <p className="text-sm font-medium text-gray-600">Select Tone</p>
//                         <div className="flex border-b border-gray-200 w-full">
//                             {TONES.map(t => {
//                                 const active = tone === t.value;
//                                 return (
//                                     <button
//                                         key={t.value}
//                                         type="button"
//                                         onClick={() => setTone(t.value)}
//                                         className={`flex-1 py-2 text-sm font-medium text-center relative transition-colors duration-200
//                                         ${active ? "text-[#800080] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-[#800080]"
//                                                 : "text-gray-500 hover:text-[#800080]"}`
//                                         }
//                                     >
//                                         {t.label}
//                                     </button>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//                 {/* Loading */}
//                 {isLoading && (
//                     <div className="flex flex-col items-center justify-center py-16">
//                         <ImSpinner2 className="animate-spin text-2xl text-purple-600 mb-3" />
//                         <p className="text-sm text-gray-600">Putting words together...</p>
//                     </div>
//                 )}

//                 {/* Modal Preview */}
//                 {!isLoading && animatedText && (
//                     <div className="mt-6">
//                         <div
//                             ref={scrollRef}
//                             className={`rounded-lg text-sm bg-gray-50 max-h-60 overflow-y-auto whitespace-pre-line p-3 transition-colors duration-300
//                             ${typingDone ? "text-black" : "text-blue-600"}`}
//                         >
//                             {animatedText}
//                             {!typingDone && <span className="animate-pulse ml-1">▍</span>}
//                         </div>

//                         <div className="flex gap-4 mt-5">
//                             <button
//                                 onClick={handleImprove}
//                                 className="w-1/2 py-2 rounded-lg !border !border-[#800080] text-sm hover:!text-[#800080] !transition"
//                             >
//                                 Regenerate
//                             </button>
//                             <button
//                                 onClick={handleApply}
//                                 className="w-1/2 py-2 rounded-lg !bg-[#800080] !text-white text-sm hover:!bg-[#a173a1] !transition"
//                             >
//                                 Apply
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* First Generate */}
//                 {!animatedText && !isLoading && (
//                     <div className="flex mt-5 border border-[#e5d6e5] rounded-sm overflow-hidden relative">
//                         <button
//                             onClick={handleNewGenarate}
//                             className="w-1/2 py-2 !bg-[#fff] !text-[#800080] text-sm hover:!bg-[#f3e6f3] transition">
//                             Generate
//                         </button>
//                         <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-[2px] bg-[#d1b3d1]" />
//                         <button
//                             onClick={handleImprove}
//                             className="w-1/2 py-2 !bg-[#fff] !text-[#800080] text-sm hover:!bg-[#f3e6f3] transition"
//                         >
//                             Improve
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default GenerateWithAiModal;