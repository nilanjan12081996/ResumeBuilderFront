"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRemainingCount } from "../reducers/ResumeSlice";

const GlobalStyles = () => (
    <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-4px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
            0%, 100% { opacity: 1; }
            50%       { opacity: 0.4; }
        }
        .credit-pill {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.03em;
            cursor: default;
            transition: transform 0.15s ease, box-shadow 0.15s ease;
            animation: fadeIn 0.4s ease forwards;
            opacity: 0;
        }
        .credit-pill:hover {
            transform: translateY(-1px);
        }
        .credit-pill .pill-count {
            font-size: 13px;
            font-weight: 900;
            line-height: 1;
            font-variant-numeric: tabular-nums;
        }
        .credit-pill .pill-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .credit-skeleton {
            width: 90px;
            height: 28px;
            border-radius: 14px;
            background: #f0f0f0;
            animation: shimmer 1.4s ease infinite;
        }
    `}</style>
);

const CARDS = [
    {
        key: "totalScratch",
        label: "Scratch Resume",
        color: "#7C3AED",
        bg: "rgba(124,58,237,0.09)",
        border: "rgba(124,58,237,0.22)",
        dot: "#7C3AED",
    },
    {
        key: "totalJd",
        label: "JD based resume",
        color: "#DC2626",
        bg: "rgba(220,38,38,0.08)",
        border: "rgba(220,38,38,0.2)",
        dot: "#DC2626",
    },
    {
        key: "totalLink",
        label: "LinkedIn Rewrite",
        color: "#0077B5",
        bg: "rgba(0,119,181,0.08)",
        border: "rgba(0,119,181,0.2)",
        dot: "#0077B5",
    },
    {
        key: "totalImp",
        label: "Improve existing resume",
        color: "#059669",
        bg: "rgba(5,150,105,0.08)",
        border: "rgba(5,150,105,0.2)",
        dot: "#059669",
    },
];

const RemainingCountHeader = () => {
    const dispatch = useDispatch();
    const { getRemainingCountData, getRemainingCountLoading, createSubscriptionCountData } =
        useSelector((state) => state.resume || {});

    useEffect(() => {
        dispatch(getRemainingCount());
    }, [createSubscriptionCountData]);

    const data = getRemainingCountData?.data;

    const activePills = data
        ? CARDS.filter((card) => (data[card.key] ?? 0) > 0)
        : [];

    if (getRemainingCountLoading) {
        return (
            <>
                <GlobalStyles />
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="credit-skeleton"
                            style={{ animationDelay: `${i * 100}ms` }}
                        />
                    ))}
                </div>
            </>
        );
    }

    if (!data || activePills.length === 0) return null;

    return (
        <>
            <GlobalStyles />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {activePills.map((card, i) => {
                    const count = data[card.key];
                    return (
                        <div
                            key={card.key}
                            className="credit-pill"
                            style={{
                                background: card.bg,
                                border: `1.5px solid ${card.border}`,
                                color: card.color,
                                animationDelay: `${i * 60}ms`,
                                boxShadow: `0 1px 5px ${card.color}15`,
                            }}
                        >
                            <span
                                className="pill-dot"
                                style={{
                                    background: card.dot,
                                    boxShadow: `0 0 0 2px ${card.dot}28`,
                                }}
                            />
                            <span style={{
                                fontSize: "9px",
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                            }}>
                                {card.label}
                            </span>
                            <span className="pill-count">{count}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default RemainingCountHeader;