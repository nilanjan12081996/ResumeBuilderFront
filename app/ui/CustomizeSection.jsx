import React, { useState } from "react";
import TemplateAndColors from "./TemplateAndColors";
import TemplateText from "./TemplateText";
import TemplateLayout from "./TemplateLayout";

const CustomizeSection = ({
  selectedTemplate,
  onSelectTemplate,
  themeColor,
  setThemeColor,
  resumeSettings,
  setResumeSettings,
}) => {
  const [activeTab, setActiveTab] = useState("Template & Colors");
  return (
    <div className="w-full bg-slate-50 min-h-screen font-sans text-gray-700">

      {/* TOP TABS – SAME DESIGN */}
      <div className="flex justify-center border-b bg-white">
        {["Template & Colors", "Text", "Layout"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-12 py-4 text-lg font-medium transition-all border-b-4 ${activeTab === tab
              ? "border-blue-500 text-slate-900"
              : "border-transparent text-slate-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4">
        {activeTab === "Template & Colors" && (
          <TemplateAndColors
            selectedTemplate={selectedTemplate}
            onSelectTemplate={onSelectTemplate}
            themeColor={themeColor}
            setThemeColor={setThemeColor}
          />
        )}

        {activeTab === "Text" && (
          <TemplateText
            textSettings={resumeSettings.text}
            setTextSettings={(text) =>
              setResumeSettings((prev) => ({
                ...prev,
                text,
              }))
            }
          />
        )}

        {activeTab === "Layout" && (
          <TemplateLayout
            selectedTemplate={selectedTemplate}
            layoutSettings={resumeSettings.layout}
            setLayoutSettings={(layout) =>
              setResumeSettings((prev) => ({
                ...prev,
                layout,
              }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default CustomizeSection;


// import React, { useState } from "react";
// import professional from "../assets/imagesource/professional.jpg";
// import clear from "../assets/imagesource/clearTemplate.jpg";
// import clean from "../assets/imagesource/cleanTemplate.jpg";
// import primeAts from "../assets/imagesource/primeAtsTemplate.jpg";
// import corporate from "../assets/imagesource/corporateTemplate.jpg";
// import vivid from "../assets/imagesource/vividTemplate.jpg";
// import Image from "next/image";
// import { IoCheckmarkOutline } from "react-icons/io5";
// import { CiPickerEmpty } from "react-icons/ci";

// const CustomizeSection = ({
//   selectedTemplate,
//   onSelectTemplate,
//   themeColor,
//   setThemeColor,
// }) => {
//   const [activeTab, setActiveTab] = useState("Template & Colors");
//   const [filter, setFilter] = useState("All");

//   const templates = [
//     {
//       id: "professional",
//       name: "Professional",
//       image: professional,
//       tags: ["ATS", "Free"],
//     },
//     {
//       id: "clear",
//       name: "Clear",
//       image: clear,
//       tags: ["With photo", "Two column"],
//     },
//     {
//       id: "clean",
//       name: "Clean",
//       image: clean,
//       tags: ["Customized", "Two column"],
//     },
//     { id: "ats", name: "Prime ATS", image: primeAts, tags: ["DOCX", "Free"] },
//     {
//       id: "corporate",
//       name: "Corporate",
//       image: corporate,
//       tags: ["DOCX", "Free"],
//     },
//     { id: "vivid", name: "Vivid", image: vivid, tags: ["DOCX", "Free"] },
//   ];

//   const colorOptions = [
//     { name: "Black", value: "#000000" },
//     { name: "Blue", value: "#2563EB" },
//     { name: "Green", value: "#16A34A" },
//     { name: "Purple", value: "#7C3AED" },
//     { name: "Gray", value: "#4B5563" },
//   ];

//   const filters = [
//     "All",
//     "With photo",
//     "Two column",
//     "ATS",
//     "DOCX",
//     "Customized",
//     "Free",
//   ];

//   return (
//     <div className="w-full bg-slate-50 min-h-screen font-sans text-gray-700">
//       {/* TOP TABS */}
//       <div className="flex justify-center border-b bg-white">
//         {["Template & Colors", "Text", "Layout"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-12 py-4 text-lg font-medium transition-all border-b-4 ${
//               activeTab === tab
//                 ? "border-blue-500 text-slate-900"
//                 : "border-transparent text-slate-400"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       <div className="max-w-6xl mx-auto py-8 px-4">
//         {/* MAIN COLOR PICKER */}
//         <div className="flex items-center justify-center gap-6 mb-10">
//           <span className="text-lg font-medium">Main color</span>

//           <div className="flex gap-3 items-center">
//             {colorOptions.map((color) => (
//               <button
//                 key={color.value}
//                 onClick={() => setThemeColor(color.value)}
//                 className={`relative w-10 h-10 rounded-full border-2 flex items-center justify-center ${
//                   themeColor === color.value
//                     ? "border-blue-500"
//                     : "border-gray-300"
//                 }`}
//               >
//                 <div
//                   className="w-7 h-7 rounded-full"
//                   style={{ backgroundColor: color.value }}
//                 />
//                 {themeColor === color.value && (
//                   <span className="absolute text-white text-sm font-bold">
//                     ✓
//                   </span>
//                 )}
//               </button>
//             ))}

//             {/* CUSTOM COLOR PICKER */}
//             <label className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center relative">
//               <div className="absolute">
//                 <CiPickerEmpty className="text-white text-[18px]" />
//               </div>
//               <input
//                 type="color"
//                 value={themeColor}
//                 onChange={(e) => setThemeColor(e.target.value)}
//                 className="opacity-0 absolute w-0 h-0"
//               />
//               <div
//                 className="w-7 h-7 rounded-full"
//                 style={{ backgroundColor: themeColor }}
//               />
//             </label>
//           </div>
//         </div>

//         {/* FILTER BUTTONS */}
//         {/* <div className="flex flex-wrap justify-center gap-3 mb-12">
//           {filters.map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-6 py-2 rounded-full border text-sm font-medium transition-all ${
//                 filter === f
//                   ? "bg-blue-500 border-blue-500 text-white"
//                   : "bg-white border-gray-300 hover:border-blue-500"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div> */}

//         {/* TEMPLATE GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {templates.map((template) => (
//             <div key={template.id} className="flex flex-col items-center">
//               <h3 className="text-[18px] font-medium mb-2 text-slate-800">
//                 {template.name}
//               </h3>

//               <div
//                 className={`relative bg-white p-2 border shadow-sm transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
//                   selectedTemplate === template.id
//                     ? "ring-2 ring-blue-500 border-blue-500"
//                     : "border-gray-200"
//                 }`}
//                 onClick={() => onSelectTemplate(template.id)}
//               >
//                 <Image
//                   src={template.image}
//                   alt={template.name}
//                   width={200}
//                   height={200}
//                   className="h-auto aspect-[1/1.41] object-cover"
//                 />

//                 {selectedTemplate === template.id && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                     <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl shadow-lg">
//                       <IoCheckmarkOutline />
//                     </div>
//                   </div>
//                 )}

//                 <div className="absolute bottom-4 right-4 flex gap-1">
//                   <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
//                     PDF
//                   </span>
//                   <span className="bg-orange-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
//                     DOCX
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomizeSection;