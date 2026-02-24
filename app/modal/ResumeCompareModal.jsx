'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimeATS from "../TemplateNew/PrimeATS";
import Professional from "../TemplateNew/Professional";
import CleanTemplate from "../TemplateNew/CleanTemplate";
import ClearTemplate from "../TemplateNew/ClearTemplate";
import VividTemplate from "../TemplateNew/VividTemplate";
import CorporateTemplate from '../TemplateNew/CorporateTemplate';
import { defaultResumeSettings } from "../config/defaultResumeSettings";
import LinkedInPrime from "../TemplateNew/LinkedInPrime";

const templateMap = {
    professional: Professional,
    ats: PrimeATS,
    clean: CleanTemplate,
    clear: ClearTemplate,
    vivid: VividTemplate,
    corporate: CorporateTemplate,
    linkedin: LinkedInPrime,
};

const ScoreRing = ({ score, color, delay = 0 }) => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setAnimated(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    const offset = circumference - (animated ? score / 100 : 0) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: 72, height: 72 }}>
            <svg width="72" height="72" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5" />
                <circle
                    cx="36" cy="36" r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="5"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1)' }}
                />
            </svg>
            <span className="absolute text-sm font-black" style={{ color }}>{score}%</span>
        </div>
    );
};

const DiffBadge = ({ oldScore, newScore }) => {
    const diff = newScore - oldScore;
    if (diff === 0) return null;
    const positive = diff > 0;
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 300 }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-black"
            style={{
                background: positive ? 'linear-gradient(135deg, #d1fae5, #a7f3d0)' : 'linear-gradient(135deg, #fee2e2, #fca5a5)',
                color: positive ? '#065f46' : '#991b1b',
                border: `1px solid ${positive ? '#6ee7b7' : '#fca5a5'}`,
                boxShadow: positive ? '0 4px 12px rgba(16,185,129,0.2)' : '0 4px 12px rgba(239,68,68,0.2)'
            }}
        >
            <span>{positive ? '↑' : '↓'}</span>
            <span>{Math.abs(diff)}% {positive ? 'Improved' : 'Decreased'}</span>
        </motion.div>
    );
};

const ResumeCompareModal = ({
    isOpen,
    onClose,
    oldData,
    newData,
    oldScore,
    newScore,
    currentTemplate,
    sections,
    themeColor,
    resumeSettings,
    oldResumeSettings,
    defaultOldTemplate
}) => {
    const [leftReady, setLeftReady] = useState(false);
    const [rightReady, setRightReady] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLeftReady(false);
            setRightReady(false);
            const t1 = setTimeout(() => setLeftReady(true), 200);
            const t2 = setTimeout(() => setRightReady(true), 700);
            return () => { clearTimeout(t1); clearTimeout(t2); };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const NewTemplate = templateMap[currentTemplate?.toLowerCase()] || PrimeATS;
    const oldTemplateName = oldData?.oldResumeSettings?.theme?.template
        || oldResumeSettings?.theme?.template
        || defaultOldTemplate
        || "ats";
    const OldTemplate = templateMap[oldTemplateName?.toLowerCase()] || PrimeATS;

    // ✅ old theme color resolve
    const oldThemeColor =
        oldResumeSettings?.theme?.templateColors?.[oldTemplateName] ||
        oldResumeSettings?.theme?.defaultColor ||
        "#2E86C1";


    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0"
                        style={{ background: 'rgba(8,8,20,0.75)', backdropFilter: 'blur(12px)' }}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 32, stiffness: 260 }}
                        className="relative w-full flex flex-col"
                        style={{
                            maxWidth: '100vw',
                            height: '94vh',
                            borderRadius: '28px 28px 0 0',
                            background: '#f0f2f7',
                            overflow: 'hidden',
                            boxShadow: '0 -20px 80px rgba(0,0,0,0.4)',
                        }}
                    >
                        {/* Drag Handle */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div style={{ width: 44, height: 5, borderRadius: 99, background: 'rgba(0,0,0,0.12)' }} />
                        </div>

                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-8 py-4"
                            style={{ background: 'white', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                        >
                            <div className="flex items-center gap-4">
                                <div style={{
                                    width: 44, height: 44,
                                    borderRadius: 14,
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 8px 20px rgba(99,102,241,0.35)'
                                }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                        <rect x="3" y="3" width="7" height="9" rx="2" fill="white" opacity="0.8" />
                                        <rect x="14" y="3" width="7" height="9" rx="2" fill="white" />
                                        <rect x="3" y="15" width="18" height="2" rx="1" fill="white" opacity="0.5" />
                                        <rect x="3" y="19" width="12" height="2" rx="1" fill="white" opacity="0.3" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f0f1a', letterSpacing: '-0.4px', lineHeight: 1.2 }}>
                                        Resume Comparison
                                    </h2>
                                    <p style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginTop: 1 }}>
                                        Original draft vs AI-optimized version
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <DiffBadge oldScore={oldScore} newScore={newScore} />
                                <button
                                    onClick={onClose}
                                    style={{
                                        width: 40, height: 40,
                                        borderRadius: 12,
                                        background: '#f1f5f9',
                                        border: '1px solid rgba(0,0,0,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        fontSize: 18, color: '#64748b',
                                        fontWeight: 300,
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#dc2626'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Panels */}
                        <div className="flex-1 flex overflow-hidden" style={{ gap: 12, padding: '12px 12px 12px 12px' }}>

                            {/* LEFT — Original */}
                            <motion.div
                                initial={{ x: -80, opacity: 0 }}
                                animate={{ x: leftReady ? 0 : -80, opacity: leftReady ? 1 : 0 }}
                                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                                className="flex flex-col"
                                style={{ flex: 1, borderRadius: 20, overflow: 'hidden', background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
                            >
                                {/* Panel Header */}
                                <div style={{
                                    padding: '14px 20px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    borderBottom: '1px solid #f1f5f9',
                                    background: '#fafbfc',
                                    flexShrink: 0,
                                }}>
                                    <div className="flex items-center gap-3">
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#94a3b8' }} />
                                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>
                                            Original Draft
                                        </span>
                                    </div>
                                    <ScoreRing score={oldScore} color="#94a3b8" delay={400} />
                                </div>

                                {/* Resume Preview */}
                                <div
                                    style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}
                                    className="custom-scrollbar"
                                >
                                    <motion.div
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: leftReady ? 0 : 30, opacity: leftReady ? 1 : 0 }}
                                        transition={{ delay: 0.3, type: 'spring', damping: 30 }}
                                        style={{
                                            transformOrigin: 'top center',
                                            transform: 'scale(0.78)',
                                            marginTop: -40,
                                            background: 'white',
                                            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
                                            borderRadius: 8,
                                        }}
                                    >
                                        <OldTemplate
                                            formData={oldData}
                                            sections={oldData?.sections || []}
                                            themeColor={oldThemeColor}
                                            resumeSettings={oldResumeSettings || defaultResumeSettings}
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Divider Arrow */}
                            <div className="flex items-center justify-center flex-shrink-0" style={{ width: 40, zIndex: 10 }}>
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.9, type: 'spring', stiffness: 400 }}
                                    style={{
                                        width: 40, height: 40,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
                                        flexShrink: 0,
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M14 7l5 5-5 5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* RIGHT — Optimized */}
                            <motion.div
                                initial={{ x: 80, opacity: 0 }}
                                animate={{ x: rightReady ? 0 : 80, opacity: rightReady ? 1 : 0 }}
                                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                                className="flex flex-col"
                                style={{
                                    flex: 1, borderRadius: 20, overflow: 'hidden',
                                    background: 'white',
                                    boxShadow: '0 4px 32px rgba(99,102,241,0.18)',
                                    border: '1.5px solid rgba(99,102,241,0.2)',
                                }}
                            >
                                {/* Panel Header */}
                                <div style={{
                                    padding: '14px 20px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    borderBottom: '1px solid rgba(99,102,241,0.1)',
                                    background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
                                    flexShrink: 0,
                                }}>
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            animate={{ scale: [1, 1.3, 1] }}
                                            transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6, delay: 1.2 }}
                                            style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366f1' }}
                                        />
                                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6366f1' }}>
                                            AI Optimized
                                        </span>
                                        <span style={{
                                            fontSize: 9, fontWeight: 700, letterSpacing: '0.05em',
                                            padding: '2px 6px', borderRadius: 6,
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            color: 'white', textTransform: 'uppercase'
                                        }}>✦ NEW</span>
                                    </div>
                                    <ScoreRing score={newScore} color="#6366f1" delay={900} />
                                </div>

                                {/* Resume Preview */}
                                <div
                                    style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}
                                    className="custom-scrollbar"
                                >
                                    <motion.div
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: rightReady ? 0 : 30, opacity: rightReady ? 1 : 0 }}
                                        transition={{ delay: 0.2, type: 'spring', damping: 30 }}
                                        style={{
                                            transformOrigin: 'top center',
                                            transform: 'scale(0.78)',
                                            marginTop: -40,
                                            background: 'white',
                                            boxShadow: '0 8px 40px rgba(99,102,241,0.15)',
                                            borderRadius: 8,
                                        }}
                                    >
                                        <NewTemplate
                                            formData={newData}
                                            sections={sections}
                                            themeColor={themeColor}
                                            resumeSettings={resumeSettings}
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>

                    <style>{`
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
          `}</style>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ResumeCompareModal;