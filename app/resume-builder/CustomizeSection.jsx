import React, { useState } from "react";
import professional from "../assets/imagesource/professional.jpg";
import clear from "../assets/imagesource/clearTemplate.jpg";
import clean from "../assets/imagesource/cleanTemplate.jpg";
import primeAts from "../assets/imagesource/primeAtsTemplate.jpg";
import corporate from "../assets/imagesource/corporateTemplate.jpg";
import vivid from "../assets/imagesource/vividTemplate.jpg";
import Image from "next/image";
const CustomizeSection = ({ selectedTemplate, onSelectTemplate }) => {
  const [activeTab, setActiveTab] = useState("Template & Colors");
  const [selectedColor, setSelectedColor] = useState("black");
  const [filter, setFilter] = useState("All");

  // List of templates based on your provided images
  const templates = [
    {
      id: "professional",
      name: "Professional",
      image: professional,
      tags: ["ATS", "Free"],
    },
    {
      id: "clear",
      name: "Clear",
      image: clear,
      tags: ["With photo", "Two column"],
    },
    {
      id: "Clean",
      name: "clean",
      image: clean,
      tags: ["Customized", "Two column"],
    },
    { id: "ats", name: "Prime ATS", image: primeAts, tags: ["DOCX", "Free"] },
    {
      id: "corporate",
      name: "Corporate",
      image: corporate,
      tags: ["DOCX", "Free"],
    },
    { id: "vivid", name: "Vivid", image: vivid, tags: ["DOCX", "Free"] },
  ];

  const filters = [
    "All",
    "With photo",
    "Two column",
    "ATS",
    "DOCX",
    "Customized",
    "Free",
  ];

  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans text-gray-700">
      {/* 1. TOP TABS */}
      <div className="flex justify-center border-b bg-white">
        {["Template & Colors", "Text", "Layout"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-12 py-4 text-lg font-medium transition-all border-b-4 ${
              activeTab === tab
                ? "border-blue-500 text-slate-900"
                : "border-transparent text-slate-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* 2. MAIN COLOR PICKER */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="text-lg font-medium">Main color</span>
          <div className="flex gap-3">
            {["black", "blue", "green", "purple", "gray"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  selectedColor === color
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full bg-${color}-600 ${color === "black" ? "bg-black" : ""}`}
                />
                {selectedColor === color && color !== "black" && (
                  <span className="text-white text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. FILTER BUTTONS */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${
                filter === f
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-white border-gray-300 hover:border-blue-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* 4. TEMPLATE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="flex flex-col items-center">
              <h3 className="text-xl font-medium mb-4 text-slate-800">
                {template.name}
              </h3>
              <div
                className={`relative bg-white p-2 border shadow-sm transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : "border-gray-200"
                }`}
                onClick={() => onSelectTemplate(template.id)}
              >
                <Image
                  src={template.image}
                  alt={template.name}
                  width={200}
                  height={200}
                  className="w-full h-auto aspect-[1/1.41] object-cover"
                />

                {/* PDF/DOCX BADGES */}
                <div className="absolute bottom-4 right-4 flex gap-1">
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    PDF
                  </span>
                  <span className="bg-orange-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    DOCX
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizeSection;
