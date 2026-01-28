
'use client';

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { HiSparkles } from "react-icons/hi2";

import {
    generateImpSummary,
    generateImpExperience,
    resetImpExperience,
    resetImpSummary,
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
    onApply,
}) => {
    const dispatch = useDispatch();

    const [tone, setTone] = useState("Professional");
    const [generatedHTML, setGeneratedHTML] = useState(""); // HTML for TipTap
    const [animatedText, setAnimatedText] = useState(""); // For modal animation
    const [typingDone, setTypingDone] = useState(false);

    const scrollRef = useRef(null);
    const intervalRef = useRef(null);

    const {
        generateImpSummaryLoading,
        generateImpSummaryData,
        generateImpExperienceLoading,
        generateImpExperienceData,
    } = useSelector((state) => state.dash);

    const handleClose = () => {
        if (aiType === "imp_summary") dispatch(resetImpSummary());
        else dispatch(resetImpExperience());

        setGeneratedHTML("");
        setAnimatedText("");
        setTypingDone(false);
        onClose();
    };

    useEffect(() => {
        const raw =
            aiType === "imp_summary"
                ? generateImpSummaryData?.summary
                : generateImpExperienceData?.summary;

        if (!raw) return;

        // --- Prepare HTML for TipTap ---
        let html = "";
        if (Array.isArray(raw) && raw.length > 0) {
            html = `<ul>${raw.map(item => `<li>${item}</li>`).join('')}</ul>`;
        } else if (typeof raw === "string") {
            const lines = raw.split(/\n|•/g).map(l => l.trim()).filter(Boolean);
            if (lines.length > 1) {
                html = `<ul>${lines.map(line => `<li>${line}</li>`).join('')}</ul>`;
            } else {
                html = lines[0] || "";
            }
        }
        setGeneratedHTML(html);

        // --- Prepare animated plain text for modal ---
        let plainText = "";
        if (Array.isArray(raw) && raw.length > 0) {
            plainText = raw.map(item => `• ${item}`).join("\n");
        } else if (typeof raw === "string") {
            const lines = raw.split(/\n|•/g).map(l => l.trim()).filter(Boolean);
            if (lines.length > 1) {
                plainText = lines.map(l => `• ${l}`).join("\n"); // multiple lines → bullets
            } else {
                plainText = lines[0] || ""; // single line → plain text
            }
        }

        setAnimatedText(""); // reset
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
        generateImpSummaryData?.summary,
        generateImpExperienceData?.summary,
    ]);

    useEffect(() => {
        if (!open) {
            clearInterval(intervalRef.current);
            setGeneratedHTML("");
            setAnimatedText("");
            setTypingDone(false);
            setTone("Professional");
        }
    }, [open]);

    if (!open) return null;

    const isLoading =
        aiType === "imp_summary"
            ? generateImpSummaryLoading
            : generateImpExperienceLoading;

    const handleGenerate = () => {
        const sourceText = generatedHTML || initialText;
        if (!sourceText?.trim()) return;

        if (aiType === "imp_summary") {
            dispatch(generateImpSummary({
                security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
                tone,
                original_text: sourceText,
            }));
        } else {
            dispatch(generateImpExperience({
                security_id: process.env.NEXT_PUBLIC_AI_SECURITY_ID,
                tone,
                original_text: sourceText,
            }));
        }
    };

    const handleApply = () => {
        if (!generatedHTML) return;
        onApply(generatedHTML); // pass proper HTML to TipTap
        handleClose();
    };

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

                {/* Modal Preview */}
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
                                onClick={handleGenerate}
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

                {/* First Generate */}
                {!animatedText && !isLoading && (
                    <div className="flex mt-5 border border-[#e5d6e5] rounded-sm overflow-hidden relative">
                        <button className="w-1/2 py-2 !bg-[#fff] !text-[#800080] text-sm hover:!bg-[#f3e6f3] transition">
                            Generate
                        </button>
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-[2px] bg-[#d1b3d1]" />
                        <button
                            onClick={handleGenerate}
                            className="w-1/2 py-2 !bg-[#fff] !text-[#800080] text-sm hover:!bg-[#f3e6f3] transition"
                        >
                            Improve
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateWithAiModal;

