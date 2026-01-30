'use client';

import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { PiReadCvLogoDuotone } from 'react-icons/pi';
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";

const formatGuide = (text) => {
    if (!text) return null;

    const lines = text.split('\n').filter(l => l.trim() !== '');

    return lines.map((line, idx) => {
        // Bold (**text**)
        const bolded = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Numbered improvement line
        if (/^\d+\./.test(line)) {
            return (
                <div key={idx} className="mt-3">
                    <div className="flex gap-2">
                        <span className="text-gray-800 font-medium">✔</span>
                        <p
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: bolded }}
                        />
                    </div>
                </div>
            );
        }

        // 👉 Do this line (FORCED new line)
        if (line.includes('Do this:')) {
            return (
                <div key={idx} className="ml-6 mt-1 flex gap-2">
                    <span className="text-gray-800">👉</span>
                    <p
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: bolded.replace('👉', '').replace('Do this:', '<strong>Do this:</strong>')
                        }}
                    />
                </div>
            );
        }

        // Bullet points
        if (line.startsWith('-') || line.startsWith('•')) {
            return (
                <div key={idx} className="flex gap-2 ml-4 mt-1">
                    <span className="text-gray-800">•</span>
                    <p
                        className="text-gray-700 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: bolded.replace(/^[-•]\s*/, '')
                        }}
                    />
                </div>
            );
        }

        // Section headings (**What's Missing:**)
        if (line.startsWith('**') && line.endsWith('**')) {
            return (
                <h4 key={idx} className="mt-4 text-sm font-semibold text-gray-900">
                    {line.replace(/\*\*/g, '')}
                </h4>
            );
        }

        // Key : Value
        if (line.includes(':')) {
            const [title, ...rest] = line.split(':');
            return (
                <p key={idx} className="mt-2 text-gray-700">
                    <strong>{title}:</strong> {rest.join(':')}
                </p>
            );
        }

        // Normal text
        return (
            <p
                key={idx}
                className="mt-2 text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: bolded }}
            />
        );
    });
};



const ImpResumeScore = ({ score = 0, loading = false, guide = "" }) => {
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
                <div className="flex flex-col gap-2">
                    {guide && (
                        <div className="relative group w-fit">
                            <div className="flex items-center gap-2 text-[#800080] hover:text-[#e799e7] text-sm font-medium cursor-pointer">
                                <AiOutlineInfoCircle size={18} />
                                How to improve your resume?
                            </div>
                            {/* <div
                                className="
        absolute top-full left-0 mt-2
        w-[400px] max-h-[60vh] overflow-y-auto
        bg-white rounded-lg shadow-xl border
        p-4 text-sm
        opacity-0 translate-y-2
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-200 ease-out
        z-50
    "
                            >



                                <h3 className="text-[#800080] font-semibold mb-2">
                                    ATS Improvement Guide
                                </h3>

                                <div className="space-y-2 text-gray-700">
                                    {formatGuide(guide)}
                                </div>
                            </div> */}
                        </div>
                    )}

                    {/* EXISTING / CHANGED RESUME */}
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
