'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimeATS from "../TemplateNew/PrimeATS";
import Professional from "../TemplateNew/Professional";
import CleanTemplate from "../TemplateNew/CleanTemplate";
import ClearTemplate from "../TemplateNew/ClearTemplate";
import VividTemplate from "../TemplateNew/VividTemplate";
import CorporateTemplate from '../TemplateNew/CorporateTemplate';
import LinkedInPrime from "../TemplateNew/LinkedInPrime";
import ResumePageViewer from "../ui/ResumePageViewer";

const templateMap = {
    professional: Professional,
    ats: PrimeATS,
    clean: CleanTemplate,
    clear: ClearTemplate,
    vivid: VividTemplate,
    corporate: CorporateTemplate,
    linkedin: LinkedInPrime,
};

const ResumePreviewModal = ({
    isOpen,
    onClose,
    formData,
    sections,
    themeColor,
    resumeSettings,
    selectedTemplate
}) => {
    if (!isOpen) return null;

    const ActiveTemplate = templateMap[selectedTemplate?.toLowerCase()] || PrimeATS;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    {/* Modal Container - A4-like centered panel */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 12 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 12 }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="relative z-10 w-[55%] max-w-[680px] min-w-[320px] max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
                        style={{ background: "#fff" }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-5 py-3 border-b border-gray-100 flex-shrink-0"
                            style={{ background: "linear-gradient(135deg, #faf5ff, #f3e8ff)" }}
                        >
                            <div>
                                <p className="text-sm font-bold text-purple-700">Resume Preview</p>
                                <p className="text-[11px] text-gray-400">Live preview of your resume</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-full bg-white/70 hover:bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 transition shadow-sm"
                            >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable resume body */}
                        <div className="overflow-y-auto flex-1 bg-gray-50 p-3">
                            <ResumePageViewer
                                sections={sections}
                                formValues={formData}
                                resumeSettings={resumeSettings}
                            >
                                <ActiveTemplate
                                    formData={formData}
                                    sections={sections}
                                    themeColor={themeColor}
                                    resumeSettings={resumeSettings}
                                />
                            </ResumePageViewer>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResumePreviewModal;
