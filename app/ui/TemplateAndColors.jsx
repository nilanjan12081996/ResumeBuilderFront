"use client";

import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoCheckmarkOutline } from "react-icons/io5";
import { CiPickerEmpty } from "react-icons/ci";

import professional from "../assets/imagesource/professional.jpg";
import clear from "../assets/imagesource/clearTemplate.jpg";
import clean from "../assets/imagesource/cleanTemplate.jpg";
import primeAts from "../assets/imagesource/primeAtsTemplate.jpg";
import corporate from "../assets/imagesource/corporateTemplate.jpg";
import vivid from "../assets/imagesource/vividTemplate.jpg";
import linkedin from "../assets/imagesource/linkedin.jpg";
import { useSearchParams, usePathname } from "next/navigation";

const TemplateAndColors = ({
    selectedTemplate,
    onSelectTemplate,
    themeColor,
    setThemeColor,
}) => {
    const templates = [
        { id: "professional", name: "Professional", image: professional },
        { id: "clear", name: "Clear", image: clear },
        { id: "clean", name: "Clean", image: clean },
        { id: "ats", name: "Prime ATS", image: primeAts },
        { id: "corporate", name: "Corporate", image: corporate },
        { id: "vivid", name: "Vivid", image: vivid },
        { id: "linkedin", name: "LinkedIn Prime", image: linkedin },
    ];

    const colorOptions = [
        { name: "Black", value: "#000000" },
        { name: "Blue", value: "#2563EB" },
        { name: "Green", value: "#16A34A" },
        { name: "Purple", value: "#7C3AED" },
        { name: "Gray", value: "#4B5563" },
    ];

    const searchParams = useSearchParams();
    const pathname = usePathname();
    
    // Check both URL path and query parameter
    const isLinkedInRewrite = 
        pathname?.includes("linkedIn-rewrite") || 
        searchParams.get("source") === "linkedIn-rewrite" ||
        searchParams.get("fetch") === "linkdin_resume";

    // Debug - console e dekhte paben
    useEffect(() => {
        console.log("Pathname:", pathname);
        console.log("Search Params:", {
            source: searchParams.get("source"),
            fetch: searchParams.get("fetch"),
            id: searchParams.get("id")
        });
        console.log("Is LinkedIn Rewrite:", isLinkedInRewrite);
    }, [pathname, searchParams, isLinkedInRewrite]);

    const handleTemplateClick = (templateId) => {
        if (isLinkedInRewrite) {
            if (templateId !== "linkedin") {
                return;
            }
            onSelectTemplate("linkedin");
        } else {
            if (templateId === "linkedin") {
                return;
            }
            onSelectTemplate(templateId);
        }
    };

    const isTemplateDisabled = (templateId) => {
        if (isLinkedInRewrite) {
            return templateId !== "linkedin";
        } else {
            return templateId === "linkedin";
        }
    };

    return (
        <>
            {/* MAIN COLOR PICKER */}
            <div className="flex items-center justify-center gap-6 mb-10">
                <span className="text-lg font-medium">Main color</span>

                <div className="flex gap-3 items-center">
                    {colorOptions.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => setThemeColor(color.value)}
                            className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                                themeColor === color.value
                                    ? "border-blue-500"
                                    : "border-gray-300"
                            }`}
                        >
                            <div
                                className="w-7 h-7 rounded-full"
                                style={{ backgroundColor: color.value }}
                            />
                            {themeColor === color.value && (
                                <span className="absolute text-white text-sm font-bold">✓</span>
                            )}
                        </button>
                    ))}

                    <label className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center relative">
                        <div className="absolute">
                            <CiPickerEmpty className="text-white text-[18px]" />
                        </div>
                        <input
                            type="color"
                            value={themeColor}
                            onChange={(e) => setThemeColor(e.target.value)}
                            className="opacity-0 absolute w-0 h-0"
                        />
                        <div
                            className="w-7 h-7 rounded-full"
                            style={{ backgroundColor: themeColor }}
                        />
                    </label>
                </div>
            </div>

            {/* TEMPLATE GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {templates.map((template) => {
                    const isDisabled = isTemplateDisabled(template.id);
                    
                    return (
                        <div
                            key={template.id}
                            className="relative group"
                        >
                            <div
                                onClick={() => handleTemplateClick(template.id)}
                                className={`relative bg-white p-2 border shadow-sm transition-all
                                    ${isDisabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer hover:shadow-xl hover:-translate-y-1"
                                    }
                                    ${selectedTemplate === template.id ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-200"}
                                `}
                            >
                                <h3 className="text-[18px] font-medium mb-2 text-slate-800">
                                    {template.name}
                                </h3>

                                <div className="relative">
                                    <Image
                                        src={template.image}
                                        alt={template.name}
                                        width={200}
                                        height={200}
                                        className="h-auto aspect-[1/1.41] object-cover"
                                    />

                                    {selectedTemplate === template.id && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl shadow-lg">
                                                <IoCheckmarkOutline />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tooltip */}
                            {isDisabled && (
                                <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                                    This template is not supported for your resume type.
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TemplateAndColors;