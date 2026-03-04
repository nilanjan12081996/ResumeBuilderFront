"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRemainingCount } from "../reducers/ResumeSlice";

// ─── Helper: get all active plan segments for a given count key ───────────────
const getPlanBreakdown = (details = [], countKey) => {
    return details
        .filter((d) => d[countKey] > 0 && d.status === 1)
        .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
        .map((d) => ({
            count: d[countKey],
            endDate: d.endDate,
            id: d.id,
        }));
};

const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const getDaysLeft = (dateStr) => {
    if (!dateStr) return null;
    const diff = new Date(dateStr) - new Date();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

// ─── Plan Expiry Breakdown Tooltip / Inline List ──────────────────────────────
const PlanBreakdownList = ({ breakdown, color, isUrgentFn }) => {
    if (!breakdown || breakdown.length === 0) return null;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "6px", zIndex: 1 }}>
            {breakdown.map((plan) => {
                const daysLeft = getDaysLeft(plan.endDate);
                const isUrgent = daysLeft !== null && daysLeft <= 7;
                return (
                    <div
                        key={plan.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: isUrgent ? "#fef2f2" : "#f8fafc",
                            border: `1px solid ${isUrgent ? "#fecaca" : "#e2e8f0"}`,
                            borderRadius: "8px",
                            padding: "4px 8px",
                            gap: "6px",
                        }}
                    >
                        {/* Count badge */}
                        <span style={{
                            fontSize: "11px",
                            fontWeight: 800,
                            color: color,
                            background: color + "18",
                            borderRadius: "6px",
                            padding: "1px 7px",
                            minWidth: "28px",
                            textAlign: "center",
                        }}>
                            {plan.count}
                        </span>

                        {/* Expiry info */}
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
                            <span style={{ fontSize: "10px" }}>{isUrgent ? "⚠️" : "📅"}</span>
                            <span style={{
                                fontSize: "10px",
                                fontWeight: 700,
                                color: isUrgent ? "#dc2626" : "#64748b",
                                whiteSpace: "nowrap",
                            }}>
                                {formatDate(plan.endDate)}
                            </span>
                        </div>

                        {/* Days left pill */}
                        <span style={{
                            fontSize: "9px",
                            fontWeight: 800,
                            color: isUrgent ? "#dc2626" : "#94a3b8",
                            background: isUrgent ? "#fee2e2" : "#f1f5f9",
                            borderRadius: "6px",
                            padding: "2px 6px",
                            whiteSpace: "nowrap",
                        }}>
                            {daysLeft}d left
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

// ─── Individual Count Card ────────────────────────────────────────────────────
const CountCard = ({ label, count, color, bg, delay = 0, breakdown = [] }) => {
    const isEmpty = count === 0;
    const hasMultiplePlans = breakdown.length > 1;
    const [expanded, setExpanded] = useState(true);

    return (
        <div style={{ animationDelay: `${delay}ms`, animation: "fadeSlideUp 0.5s ease forwards", opacity: 0 }}>
            <div
                style={{
                    background: isEmpty ? "#f9fafb" : bg,
                    border: `1.5px solid ${isEmpty ? "#e5e7eb" : color + "33"}`,
                    borderRadius: "16px",
                    padding: "18px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "default",
                    height: "100%",
                    boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                    if (!isEmpty) {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = `0 8px 24px ${color}22`;
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                }}
            >
                {/* BG decoration */}
                {!isEmpty && (
                    <div style={{
                        position: "absolute", top: "-16px", right: "-16px",
                        width: "70px", height: "70px", borderRadius: "50%",
                        background: color + "14",
                    }} />
                )}

                {/* Label */}
                <span style={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: isEmpty ? "#9ca3af" : color,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    zIndex: 1,
                }}>
                    {label}
                </span>

                {/* Total Count */}
                <div style={{ zIndex: 1 }}>
                    <span style={{
                        fontSize: "36px", fontWeight: 900,
                        color: isEmpty ? "#d1d5db" : color,
                        lineHeight: 1, fontVariantNumeric: "tabular-nums",
                    }}>
                        {count}
                    </span>
                    <span style={{
                        fontSize: "11px",
                        color: isEmpty ? "#d1d5db" : color + "99",
                        marginLeft: "5px", fontWeight: 600,
                    }}>
                        left
                    </span>
                </div>

                {/* Empty state */}
                {isEmpty && (
                    <span style={{ fontSize: "10px", color: "#d1d5db", fontWeight: 600, zIndex: 1 }}>
                        No credits
                    </span>
                )}

                {/* Plan Breakdown */}
                {!isEmpty && breakdown.length > 0 && (
                    <div style={{ zIndex: 1 }}>
                        {/* Toggle header if multiple plans */}
                        {hasMultiplePlans && (
                            <button
                                onClick={() => setExpanded((p) => !p)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    background: color + "14",
                                    border: `1px solid ${color}30`,
                                    borderRadius: "8px",
                                    padding: "3px 8px",
                                    cursor: "pointer",
                                    marginBottom: "4px",
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span style={{ fontSize: "10px", fontWeight: 700, color: color }}>
                                    {breakdown.length} active plans
                                </span>
                                <span style={{ fontSize: "10px", color: color, transition: "transform 0.2s", display: "inline-block", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                                    ▲
                                </span>
                            </button>
                        )}

                        {/* Single plan label */}
                        {!hasMultiplePlans && (
                            <div style={{ marginBottom: "2px" }}>
                                <span style={{ fontSize: "10px", fontWeight: 700, color: color + "99" }}>
                                    Expiry
                                </span>
                            </div>
                        )}

                        {/* Plan list — always show for single, toggle for multiple */}
                        {(expanded || !hasMultiplePlans) && (
                            <PlanBreakdownList breakdown={breakdown} color={color} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = ({ delay = 0 }) => (
    <div style={{
        background: "#f3f4f6", borderRadius: "16px", padding: "18px 16px",
        display: "flex", flexDirection: "column", gap: "10px",
        animation: "skeletonPulse 1.4s ease infinite",
        animationDelay: `${delay}ms`,
    }}>
        <div style={{ width: "70px", height: "11px", borderRadius: "6px", background: "#e5e7eb" }} />
        <div style={{ width: "50px", height: "34px", borderRadius: "8px", background: "#e5e7eb" }} />
        <div style={{ width: "100%", height: "28px", borderRadius: "8px", background: "#e5e7eb" }} />
        <div style={{ width: "90%", height: "28px", borderRadius: "8px", background: "#e5e7eb" }} />
    </div>
);

// ─── Global Styles ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
    <style>{`
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes skeletonPulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.45; }
    }
    @media (max-width: 768px) {
      .remaining-count-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
  `}</style>
);

// ─── Main Widget ──────────────────────────────────────────────────────────────
const RemainingCountWidget = ({ compact = false }) => {
    const dispatch = useDispatch();
    const { getRemainingCountData, getRemainingCountLoading, createSubscriptionCountData } = useSelector(
        (state) => state.resume || {}
    );

    useEffect(() => {
        dispatch(getRemainingCount());
    }, [createSubscriptionCountData]);

    const data = getRemainingCountData?.data;
    const details = data?.details || [];

    const cards = [
        {
            label: "Scratch",
            count: data?.totalScratch ?? 0,
            color: "#7C3AED",
            bg: "linear-gradient(135deg, #faf5ff, #ede9fe)",
            breakdown: getPlanBreakdown(details, "scratchCount"),
        },
        {
            label: "JD Based",
            count: data?.totalJd ?? 0,
            color: "#DC2626",
            bg: "linear-gradient(135deg, #fff5f5, #fee2e2)",
            breakdown: getPlanBreakdown(details, "jdCount"),
        },
        {
            label: "LinkedIn",
            count: data?.totalLink ?? 0,
            color: "#0077B5",
            bg: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
            breakdown: getPlanBreakdown(details, "linkCount"),
        },
        {
            label: "Improve",
            count: data?.totalImp ?? 0,
            color: "#059669",
            bg: "linear-gradient(135deg, #f0fdf4, #d1fae5)",
            breakdown: getPlanBreakdown(details, "impCount"),
        },
    ];

    const totalCredits =
        (data?.totalScratch ?? 0) + (data?.totalJd ?? 0) +
        (data?.totalLink ?? 0) + (data?.totalImp ?? 0);

    // ── COMPACT MODE ──────────────────────────────────────────────────────────
    if (compact) {
        return (
            <>
                <GlobalStyles />
                <div style={{
                    background: "#fff", borderRadius: "16px",
                    border: "1.5px solid #e9edff", padding: "16px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 800, color: "#374151", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                            Credits Remaining
                        </span>
                        {getRemainingCountLoading ? (
                            <div style={{ width: "60px", height: "20px", borderRadius: "10px", background: "#f3f4f6", animation: "skeletonPulse 1.4s ease infinite" }} />
                        ) : (
                            <span style={{
                                fontSize: "11px", fontWeight: 700,
                                color: totalCredits > 0 ? "#7C3AED" : "#9ca3af",
                                background: totalCredits > 0 ? "#ede9fe" : "#f3f4f6",
                                padding: "3px 10px", borderRadius: "20px",
                            }}>
                                {totalCredits} total
                            </span>
                        )}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        {getRemainingCountLoading ? (
                            [0, 1, 2, 3].map((i) => (
                                <div key={i} style={{
                                    padding: "8px 10px", borderRadius: "10px", background: "#f3f4f6",
                                    animation: "skeletonPulse 1.4s ease infinite", animationDelay: `${i * 100}ms`,
                                    display: "flex", flexDirection: "column", gap: "4px",
                                }}>
                                    <div style={{ width: "50px", height: "9px", borderRadius: "4px", background: "#e5e7eb" }} />
                                    <div style={{ width: "30px", height: "18px", borderRadius: "4px", background: "#e5e7eb" }} />
                                </div>
                            ))
                        ) : !data ? (
                            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "12px", fontSize: "12px", color: "#9ca3af" }}>
                                No credit data available
                            </div>
                        ) : (
                            cards.map((card, i) => (
                                <div key={card.label} style={{
                                    padding: "8px 10px", borderRadius: "10px",
                                    background: card.count === 0 ? "#f9fafb" : card.bg,
                                    border: `1px solid ${card.count === 0 ? "#e5e7eb" : card.color + "22"}`,
                                    animation: "fadeSlideUp 0.4s ease forwards",
                                    animationDelay: `${i * 80}ms`, opacity: 0,
                                }}>
                                    <div style={{ fontSize: "10px", fontWeight: 800, color: card.count === 0 ? "#d1d5db" : card.color, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "2px" }}>
                                        {card.label}
                                    </div>
                                    <div style={{ fontSize: "18px", fontWeight: 900, color: card.count === 0 ? "#d1d5db" : card.color, lineHeight: 1 }}>
                                        {card.count}
                                        <span style={{ fontSize: "10px", fontWeight: 600, color: card.count === 0 ? "#d1d5db" : card.color + "99", marginLeft: "3px" }}>left</span>
                                    </div>
                                    {/* Compact: show all plan expiries stacked */}
                                    {card.count > 0 && card.breakdown.length > 0 && (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "3px", marginTop: "4px" }}>
                                            {card.breakdown.map((plan) => {
                                                const daysLeft = getDaysLeft(plan.endDate);
                                                const isUrgent = daysLeft !== null && daysLeft <= 7;
                                                return (
                                                    <div key={plan.id} style={{
                                                        display: "flex", alignItems: "center", gap: "4px",
                                                        background: isUrgent ? "#fef2f2" : "#f8fafc",
                                                        border: `1px solid ${isUrgent ? "#fecaca" : "#e2e8f0"}`,
                                                        borderRadius: "6px", padding: "2px 5px",
                                                    }}>
                                                        <span style={{ fontSize: "9px", fontWeight: 800, color: card.color, background: card.color + "18", borderRadius: "4px", padding: "0 4px" }}>
                                                            {plan.count}
                                                        </span>
                                                        <span style={{ fontSize: "9px", fontWeight: 700, color: isUrgent ? "#dc2626" : "#64748b" }}>
                                                            {formatDate(plan.endDate)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </>
        );
    }

    // ── FULL MODE ─────────────────────────────────────────────────────────────
    return (
        <>
            <GlobalStyles />
            <div style={{
                background: "#fff", borderRadius: "24px",
                border: "1.5px solid #e9edff", padding: "24px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                marginBottom: "24px",
                animation: "fadeSlideUp 0.4s ease forwards",
            }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                    <div>
                        <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#1B223C", margin: 0, letterSpacing: "-0.01em" }}>
                            Remaining Credits
                        </h3>
                        <p style={{ fontSize: "12px", color: "#9ca3af", margin: "3px 0 0 0" }}>
                            Your available resume generation credits
                        </p>
                    </div>

                    {getRemainingCountLoading ? (
                        <div style={{ width: "64px", height: "58px", borderRadius: "14px", background: "#f3f4f6", animation: "skeletonPulse 1.4s ease infinite" }} />
                    ) : (
                        <div style={{
                            display: "flex", flexDirection: "column", alignItems: "center",
                            background: totalCredits > 0 ? "linear-gradient(135deg, #7C3AED, #a855f7)" : "#f3f4f6",
                            borderRadius: "14px", padding: "10px 16px", minWidth: "64px",
                        }}>
                            <span style={{ fontSize: "22px", fontWeight: 900, color: totalCredits > 0 ? "#fff" : "#9ca3af", lineHeight: 1 }}>
                                {totalCredits}
                            </span>
                            <span style={{ fontSize: "9px", fontWeight: 700, color: totalCredits > 0 ? "#e9d5ff" : "#d1d5db", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "2px" }}>
                                Total
                            </span>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #e9edff, transparent)", marginBottom: "20px" }} />

                {/* Cards Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }} className="remaining-count-grid">
                    {getRemainingCountLoading ? (
                        [0, 1, 2, 3].map((i) => <SkeletonCard key={i} delay={i * 100} />)
                    ) : !data ? (
                        <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "24px", fontSize: "13px", color: "#9ca3af" }}>
                            No credit data available
                        </div>
                    ) : (
                        cards.map((card, i) => <CountCard key={card.label} {...card} delay={i * 80} />)
                    )}
                </div>

                {/* Zero Credits Warning */}
                {!getRemainingCountLoading && data && totalCredits === 0 && (
                    <div style={{
                        marginTop: "16px", padding: "12px 16px",
                        background: "#fffbeb", border: "1px solid #fde68a",
                        borderRadius: "12px", display: "flex", alignItems: "center", gap: "8px",
                        animation: "fadeSlideUp 0.5s ease 0.35s forwards", opacity: 0,
                    }}>
                        <span style={{ fontSize: "16px" }}>⚠️</span>
                        <span style={{ fontSize: "12px", color: "#92400e", fontWeight: 600 }}>
                            You have no credits remaining. Purchase a plan to continue building resumes.
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

export default RemainingCountWidget;