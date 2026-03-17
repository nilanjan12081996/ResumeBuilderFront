'use client';

import React, { useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

const ATS_TIPS = [
    {
        title: "Add numbers to achievements",
        description: "Use measurable data to show results.",
        example: "Increased system performance by 40% by optimizing backend APIs.",
    },
    {
        title: "Show business impact",
        description: "Explain how your work helped the company.",
        example: "Reduced operational costs by ₹20L annually through process automation.",
    },
    {
        title: "Use strong action verbs",
        description: "Start each point with powerful verbs like Built, Led, Improved, Delivered, Scaled, Optimized, Reduced.",
        example: null,
    },
    {
        title: "Mention scale of work",
        description: "Highlight the size of systems, teams, or projects.",
        example: "Handled a platform serving 2M+ users with high availability.",
    },
    {
        title: "Highlight efficiency improvements",
        description: "Show how you saved time, cost, or effort.",
        example: "Reduced deployment time from 2 hours to 15 minutes using CI/CD pipelines.",
    },
    {
        title: "Show growth contributions",
        description: "Explain how your work helped the company grow.",
        example: "Contributed to a 25% increase in customer acquisition through product improvements.",
    },
    {
        title: "Demonstrate leadership or ownership",
        description: "Even if you were not a manager, show ownership.",
        example: "Led a cross-functional team of 5 engineers to deliver a critical release.",
    },
    {
        title: "Include problem–solution–result format",
        description: "Structure bullet points like this: Problem → Action → Result.",
        example: "Resolved payment failure issues by redesigning API flow, reducing transaction failures by 30%.",
    },
    {
        title: "Highlight recognition or awards",
        description: "Mention appreciation or performance recognition.",
        example: 'Received "Top Performer Award" for delivering the fastest project release.',
    },
    {
        title: "Show technical depth with outcomes",
        description: "Instead of only listing tools, connect them to results.",
        example: "Used Node.js and Redis to improve API response time by 60%.",
    },
];

const TipItem = ({ tip, index, isOpen, onToggle, visible }) => (
    <div
        onClick={onToggle}
        style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            padding: "9px 10px",
            borderRadius: "8px",
            cursor: "pointer",
            background: isOpen ? "#faf5ff" : "transparent",
            transition: "background 0.18s, opacity 0.25s, transform 0.25s",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transitionDelay: visible ? `${index * 35}ms` : "0ms",
        }}
    >
        <div style={{
            width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
            background: "#f0e6ff", color: "#800080",
            fontSize: "11px", fontWeight: 500,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginTop: "1px",
        }}>
            {index + 1}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "#1f2937", margin: 0, lineHeight: 1.4 }}>
                {tip.title}
            </p>
            <div style={{
                maxHeight: isOpen ? "120px" : "0px",
                overflow: "hidden",
                transition: "max-height 0.3s ease",
            }}>
                {tip.description && (
                    <p style={{ fontSize: "11px", color: "#6b7280", margin: "5px 0 0", lineHeight: 1.5 }}>
                        {tip.description}
                    </p>
                )}
                {tip.example && (
                    <p style={{ fontSize: "11px", color: "#6b7280", margin: "4px 0 0", lineHeight: 1.5 }}>
                        Example:{" "}
                        <span style={{
                            color: "#800080", fontWeight: 500,
                            background: "#faf5ff", padding: "2px 5px",
                            borderRadius: "4px", display: "inline",
                        }}>
                            {tip.example}
                        </span>
                    </p>
                )}
            </div>
        </div>

        <FiChevronDown
            size={13}
            style={{
                color: "#9ca3af", flexShrink: 0, marginTop: "4px",
                transition: "transform 0.25s",
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
        />
    </div>
);

const HowToImprove = () => {
    const [panelOpen, setPanelOpen] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [visibleItems, setVisibleItems] = useState(false);
    const panelRef = useRef(null);

    const togglePanel = () => {
        const next = !panelOpen;
        setPanelOpen(next);
        if (next) {
            setTimeout(() => setVisibleItems(true), 60);
        } else {
            setVisibleItems(false);
            setOpenIndex(null);
        }
    };

    const toggleTip = (i) => {
        setOpenIndex(prev => (prev === i ? null : i));
    };

    useEffect(() => {
        const handler = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) {
                setPanelOpen(false);
                setVisibleItems(false);
                setOpenIndex(null);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={panelRef} style={{ position: "relative", width: "fit-content" }}>
            {/* Trigger button — same style as original */}
            <button
                onClick={togglePanel}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-[#800080] border border-purple-100 hover:bg-purple-100 transition-all duration-200"
            >
                <AiOutlineInfoCircle size={14} />
                How to improve?
                <FiChevronDown
                    size={12}
                    style={{
                        transition: "transform 0.25s",
                        transform: panelOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                />
            </button>

            {/* Dropdown Panel */}
            <div style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                width: "360px",
                maxHeight: panelOpen ? "420px" : "0px",
                overflow: "hidden",
                background: "#fff",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(128,0,128,0.10), 0 2px 8px rgba(0,0,0,0.08)",
                border: "1px solid #f0e6ff",
                zIndex: 9999,
                transition: "max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.25s",
                opacity: panelOpen ? 1 : 0,
                pointerEvents: panelOpen ? "auto" : "none",
            }}>
                {/* Header */}
                <div style={{
                    padding: "12px 14px 10px",
                    borderBottom: "1px solid #f3e6f3",
                    display: "flex", alignItems: "center", gap: "8px",
                    position: "sticky", top: 0, background: "#fff", zIndex: 1,
                }}>
                    <div style={{
                        width: "20px", height: "20px", borderRadius: "50%",
                        background: "#f0e6ff", display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <AiOutlineInfoCircle size={12} style={{ color: "#800080" }} />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#1f2937" }}>
                        ATS Improvement Guide
                    </span>
                    <span style={{ fontSize: "11px", color: "#9ca3af", marginLeft: "auto" }}>
                        click to expand
                    </span>
                </div>

                {/* Thin pink scrollbar */}
                <style>{`
                    .ats-tips-scroll::-webkit-scrollbar { width: 4px; }
                    .ats-tips-scroll::-webkit-scrollbar-track { background: transparent; }
                    .ats-tips-scroll::-webkit-scrollbar-thumb { background: #e9b8f0; border-radius: 99px; }
                    .ats-tips-scroll::-webkit-scrollbar-thumb:hover { background: #c084fc; }
                `}</style>
                <div
                    className="ats-tips-scroll"
                    style={{
                        overflowY: "auto",
                        maxHeight: "360px",
                        padding: "6px 8px 10px",
                        scrollbarWidth: "thin",
                        scrollbarColor: "#e9b8f0 transparent",
                    }}
                >
                    {ATS_TIPS.map((tip, i) => (
                        <TipItem
                            key={i}
                            tip={tip}
                            index={i}
                            isOpen={openIndex === i}
                            onToggle={() => toggleTip(i)}
                            visible={visibleItems}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


const ImpResumeScore = ({ score = 0, loading = false, guide = "", onCompareClick, isComparingLoading }) => {
    const safeScore = Math.min(100, Math.max(0, Number(score) || 0));
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (loading) {
            setProgress(0);
            return;
        }

        let start = 0;
        const duration = 900;
        const step = safeScore / (duration / 16);

        const timer = setInterval(() => {
            start += step;
            if (start >= safeScore) {
                start = safeScore;
                clearInterval(timer);
            }
            setProgress(Math.round(start));
        }, 16);

        return () => clearInterval(timer);
    }, [safeScore, loading]);

    const progressColor =
        progress > 80 ? "#22c55e" :
            progress >= 60 ? "#facc15" :
                "#ef4444";

    return (
        <div className="bg-white rounded-lg p-5 mb-2 mx-auto">

            <div className="">
                <span className="text-[#828ba2] text-sm font-medium">
                    Resume ATS Score
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="w-24 h-24">
                    <CircularProgressbar
                        value={loading ? 25 : progress}
                        maxValue={100}
                        text={loading ? "Checking…" : `${progress}%`}
                        className={loading ? "loading-spinner" : ""}
                        styles={buildStyles({
                            pathColor: loading ? "#c084fc" : progressColor,
                            textColor: "#800080",
                            trailColor: "#f0f0f0",
                            textSize: loading ? "12px" : "20px",
                            strokeLinecap: "round",
                        })}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    {/* guide prop থাকলে How to improve দেখাবে — আগের মতোই */}
                    {guide && <HowToImprove />}

                    <div className="flex">
                        <button
                            onClick={onCompareClick}
                            disabled={isComparingLoading}
                            className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs border rounded-md transition duration-200 
                ${isComparingLoading
                                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                    : "text-[#800080] border-[#800080] hover:bg-[#800080] hover:text-white"
                                }`}
                        >
                            {isComparingLoading ? (
                                <>
                                    <span className="w-3 h-3 border-2 border-[#800080]/30 border-t-[#800080] rounded-full animate-spin" />
                                    Calculating Initial Score...
                                </>
                            ) : (
                                <>
                                    <MdOutlinePublishedWithChanges className="text-sm" />
                                    Compare Resume
                                    <span className="text-[10px] opacity-80">(Existing vs Updated)</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ImpResumeScore;

// 'use client';

// import React, { useEffect, useState } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import 'react-circular-progressbar/dist/styles.css';
// import { PiReadCvLogoDuotone } from 'react-icons/pi';
// import { MdOutlinePublishedWithChanges } from "react-icons/md";
// import { AiOutlineInfoCircle } from "react-icons/ai";

// const formatGuide = (text) => {
//     if (!text) return null;

//     const lines = text.split('\n').filter(l => l.trim() !== '');

//     return lines.map((line, idx) => {
//         // Bold (**text**)
//         const bolded = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

//         // Numbered improvement line
//         if (/^\d+\./.test(line)) {
//             return (
//                 <div key={idx} className="mt-3">
//                     <div className="flex gap-2">
//                         <span className="text-gray-800 font-medium">✔</span>
//                         <p
//                             className="text-gray-700 leading-relaxed"
//                             dangerouslySetInnerHTML={{ __html: bolded }}
//                         />
//                     </div>
//                 </div>
//             );
//         }

//         // 👉 Do this line (FORCED new line)
//         if (line.includes('Do this:')) {
//             return (
//                 <div key={idx} className="ml-6 mt-1 flex gap-2">
//                     <span className="text-gray-800">👉</span>
//                     <p
//                         className="text-gray-700 leading-relaxed"
//                         dangerouslySetInnerHTML={{
//                             __html: bolded.replace('👉', '').replace('Do this:', '<strong>Do this:</strong>')
//                         }}
//                     />
//                 </div>
//             );
//         }

//         // Bullet points
//         if (line.startsWith('-') || line.startsWith('•')) {
//             return (
//                 <div key={idx} className="flex gap-2 ml-4 mt-1">
//                     <span className="text-gray-800">•</span>
//                     <p
//                         className="text-gray-700 leading-relaxed"
//                         dangerouslySetInnerHTML={{
//                             __html: bolded.replace(/^[-•]\s*/, '')
//                         }}
//                     />
//                 </div>
//             );
//         }

//         // Section headings (**What's Missing:**)
//         if (line.startsWith('**') && line.endsWith('**')) {
//             return (
//                 <h4 key={idx} className="mt-4 text-sm font-semibold text-gray-900">
//                     {line.replace(/\*\*/g, '')}
//                 </h4>
//             );
//         }

//         // Key : Value
//         if (line.includes(':')) {
//             const [title, ...rest] = line.split(':');
//             return (
//                 <p key={idx} className="mt-2 text-gray-700">
//                     <strong>{title}:</strong> {rest.join(':')}
//                 </p>
//             );
//         }

//         // Normal text
//         return (
//             <p
//                 key={idx}
//                 className="mt-2 text-gray-700 leading-relaxed"
//                 dangerouslySetInnerHTML={{ __html: bolded }}
//             />
//         );
//     });
// };



// const ImpResumeScore = ({ score = 0, loading = false, guide = "", onCompareClick, isComparingLoading }) => {
//     const safeScore = Math.min(100, Math.max(0, Number(score) || 0));
//     const [progress, setProgress] = useState(0);

//     useEffect(() => {
//         if (loading) {
//             setProgress(0);
//             return;
//         }

//         let start = 0;
//         const duration = 900;
//         const step = safeScore / (duration / 16);

//         const timer = setInterval(() => {
//             start += step;
//             if (start >= safeScore) {
//                 start = safeScore;
//                 clearInterval(timer);
//             }
//             setProgress(Math.round(start));
//         }, 16);

//         return () => clearInterval(timer);
//     }, [safeScore, loading]);

//     const progressColor =
//         progress > 80 ? "#22c55e" :
//             progress >= 60 ? "#facc15" :
//                 "#ef4444";

//     return (
//         <div className="bg-white rounded-lg p-5 mb-2 mx-auto">

//             <div className="">
//                 <span className="text-[#828ba2] text-sm font-medium">
//                     Resume ATS Score
//                 </span>


//             </div>

//             <div className="flex items-center gap-6">
//                 <div className="w-24 h-24">
//                     <CircularProgressbar
//                         value={loading ? 25 : progress}
//                         maxValue={100}
//                         text={loading ? "Checking…" : `${progress}%`}
//                         className={loading ? "loading-spinner" : ""}
//                         styles={buildStyles({
//                             pathColor: loading ? "#c084fc" : progressColor,
//                             textColor: "#800080",
//                             trailColor: "#f0f0f0",
//                             textSize: loading ? "12px" : "20px",
//                             strokeLinecap: "round",
//                         })}
//                     />
//                 </div>
//                 <div className="flex flex-col gap-3">
//                     {guide && (
//                         <div className="relative group w-fit">
//                             <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-50 text-[#800080] border border-purple-100 hover:bg-purple-100 transition-all duration-200">
//                                 <AiOutlineInfoCircle size={14} />
//                                 How to improve?
//                             </button>
//                             <div className="
//                                 absolute top-full left-0 mt-[2px]
//                                 w-[420px] max-h-[55vh] overflow-y-auto
//                                 bg-white rounded-xl shadow-2xl border border-gray-100
//                                 p-5 text-sm
//                                 opacity-0 translate-y-1 pointer-events-none
//                                 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
//                                 transition-all duration-200 ease-out z-50
//                             ">
//                                 <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
//                                     <div className="w-6 h-6 rounded-full bg-purple-50 flex items-center justify-center">
//                                         <AiOutlineInfoCircle size={14} className="text-[#800080]" />
//                                     </div>
//                                     <h3 className="text-sm font-semibold text-gray-800">ATS Improvement Guide</h3>
//                                 </div>
//                                 <div className="space-y-1 text-gray-600">
//                                     {formatGuide(guide)}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex">
//                         <button
//                             onClick={onCompareClick}
//                             disabled={isComparingLoading}
//                             className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs border rounded-md transition duration-200 
//                 ${isComparingLoading
//                                     ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
//                                     : "text-[#800080] border-[#800080] hover:bg-[#800080] hover:text-white"
//                                 }`}
//                         >
//                             {isComparingLoading ? (
//                                 <>
//                                     <span className="w-3 h-3 border-2 border-[#800080]/30 border-t-[#800080] rounded-full animate-spin" />
//                                     Calculating Initial Score...
//                                 </>
//                             ) : (
//                                 <>
//                                     <MdOutlinePublishedWithChanges className="text-sm" />
//                                     Compare Resume
//                                     <span className="text-[10px] opacity-80">(Existing vs Updated)</span>
//                                 </>
//                             )}
//                         </button>
//                     </div>
//                 </div>

//             </div>

//         </div>
//     );
// };

// export default ImpResumeScore;
