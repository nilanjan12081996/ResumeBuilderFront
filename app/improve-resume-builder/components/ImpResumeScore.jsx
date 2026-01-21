'use client';

import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { PiReadCvLogoDuotone } from 'react-icons/pi';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";

const formatGuide = (guideText) => {
    if (!guideText) return [];

    // Split sections by double newlines
    const sections = guideText.split('\n\n').map(s => s.trim());
    return sections.map((section, idx) => {
        // If it starts with a number or bullet, render as list item
        if (/^\d+\./.test(section)) {
            return <li key={idx} className="mb-2 text-gray-700">{section}</li>;
        }

        // If starts with **, render bold
        if (section.startsWith('**')) {
            const boldMatch = section.match(/\*\*(.*?)\*\*/g);
            if (boldMatch) {
                let formatted = section;
                boldMatch.forEach(match => {
                    formatted = formatted.replace(match, `<strong>${match.replace(/\*\*/g, '')}</strong>`);
                });
                return <p key={idx} className="mb-2 text-gray-700" dangerouslySetInnerHTML={{ __html: formatted }}></p>;
            }
        }

        return <p key={idx} className="mb-2 text-gray-700">{section}</p>;
    });
};

const ImpResumeScore = ({ score = 0, loading = false, guide = "" }) => {
    const safeScore = Math.min(100, Math.max(0, Number(score) || 0));
    const [progress, setProgress] = useState(0);
    const [showGuide, setShowGuide] = useState(false);

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
        <div className="bg-white rounded-lg p-5 mb-4 shadow-md max-w-2xl mx-auto">

            <div className="">
                <span className="text-[#828ba2] text-sm font-medium">
                    Resume ATS Score
                </span>


            </div>

            <div className="flex items-center gap-6">
                <div className="w-24 h-24">
                    <CircularProgressbar
                        value={loading ? 100 : progress}
                        maxValue={100}
                        text={loading ? "Checking…" : `${progress}%`}
                        styles={buildStyles({
                            pathColor: loading ? "#c084fc" : progressColor,
                            textColor: "#800080",
                            trailColor: "#f0f0f0",
                            textSize: "18px",
                            strokeLinecap: "round",
                            fontWeight: "bold",
                        })}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {guide && (
                        <button
                            onClick={() => setShowGuide(true)}
                            className="flex items-center gap-2 text-[#800080] hover:text-[#e799e7] text-sm font-medium"
                            title="View Improvement Guide"
                        >
                            <AiOutlineInfoCircle size={18} />
                            How to improve your resume?
                        </button>

                    )}
                    {/* GUIDE MODAL */}
                    {showGuide && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
                            <div className="bg-white max-w-3xl w-full rounded-lg p-6 relative overflow-y-auto max-h-[80vh]">
                                <button
                                    onClick={() => setShowGuide(false)}
                                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg font-bold"
                                >
                                    ✕
                                </button>

                                <h2 className="text-xl font-semibold mb-4 text-[#800080]">
                                    ATS Improvement Guide
                                </h2>

                                <div className="text-sm space-y-3">
                                    {formatGuide(guide)}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex gap-10">
                        <button className="flex items-center gap-1 text-sm font-thin text-[#800080] hover:text-[#e799e7]">
                            <PiReadCvLogoDuotone className="text-lg" />
                            Existing Resume
                        </button>

                        <button className="flex items-center gap-1 text-sm font-thin text-[#800080] hover:text-[#e799e7]">
                            <MdOutlinePublishedWithChanges className="text-lg" />
                            Changed Resume
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ImpResumeScore;
