// import React, { useState } from 'react';
// import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
// import { RiDraggable } from "react-icons/ri";
// import { Tab, Tabs, TabList } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

// const ImpSkills = ({ section, sectionIndex, handleSkillUpdate, handleSkillDragStart, handleSkillDrop, draggedSkillIndex, setDraggedSkillIndex }) => {
//     const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

//     const tabColors = [
//         "#ffeaec", // 1st tab
//         "#feebe3", // 2nd tab
//         "#fff2cc", // 3rd tab
//         "#e7f4ed", // 4th tab
//         "#f1f2ff", // 5th tab
//     ];

//     const textColor = [
//         "#fe7d8b", // 1st tab
//         "#f68559", // 2nd tab
//         "#ec930c", // 3rd tab
//         "#48ba75", // 4th tab
//         "#9ba1fb", // 5th tab
//     ];

//     return (
//         <>
//             <p className="!text-sm !font-medium !text-gray-500 mb-4">
//                 Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing
//                 (especially when applying via an online system).
//             </p>

//             {section.skills.map((skill, sIndex) => (
//                 <div
//                     key={skill.id}
//                     onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                     onDrop={(e) => handleSkillDrop(e, sectionIndex, sIndex)}
//                     className={`transition-all duration-200 rounded-lg border 
//             ${draggedSkillIndex === sIndex
//                             ? "opacity-20 border-cyan-500 scale-95"
//                             : "bg-white border-gray-200 shadow-sm"
//                         }`}
//                 >
//                     <div className="flex items-start gap-2">
//                         <span
//                             className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
//                             draggable
//                             onDragStart={(e) => handleSkillDragStart(e, sIndex)}
//                             onDragEnd={() => setDraggedSkillIndex(null)}
//                         >
//                             <RiDraggable className="text-xl text-[#656e83] hover:text-[#800080]" />
//                             <span className="tooltip">Click and drag to move</span>
//                         </span>

//                         <Accordion collapseAll className='overflow-hidden !border !border-gray-300 mb-2 w-full'>
//                             <AccordionPanel>
//                                 <AccordionTitle className='font-bold text-sm'>
//                                     {skill.name}
//                                 </AccordionTitle>
//                                 <AccordionContent className='pt-0'>
//                                     <div className='flex gap-10'>
//                                         <div className='w-6/12'>
//                                             <Label className="!text-sm !font-medium !text-gray-500">Skill</Label>
//                                             <input
//                                                 type="text"
//                                                 value={skill.name}
//                                                 placeholder="Your Skill"
//                                                 onChange={(e) => handleSkillUpdate(sectionIndex, skill.id, 'name', e.target.value)}
//                                                 className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                                             />
//                                         </div>

//                                         <div className='w-6/12'>
//                                             <Label className="!text-sm !font-medium !text-gray-500">
//                                                 Level - <span className="font-semibold" style={{ color: textColor[skill.level] }}>
//                                                     {levels[skill.level]}
//                                                 </span>
//                                             </Label>
//                                             {/* <div 
//                                                 className='label_tab_area transition-all duration-300 rounded-[5px] p-0'
//                                                 style={{ backgroundColor: tabColors[skill.level] }}
//                                             >
//                                                 <Tabs
//                                                 selectedIndex={skill.level}
//                                                 onSelect={(tabIndex) => handleSkillUpdate(sectionIndex, skill.id, 'level', tabIndex)}
//                                                 >
//                                                 <TabList>
//                                                     <Tab>&nbsp;</Tab>
//                                                     <Tab>&nbsp;</Tab>
//                                                     <Tab>&nbsp;</Tab>
//                                                     <Tab>&nbsp;</Tab>
//                                                     <Tab>&nbsp;</Tab>
//                                                 </TabList>
//                                                 </Tabs>
//                                             </div> */}
//                                             <div
//                                                 className='label_tab_area flex items-center justify-between gap-2 p-2 rounded-[5px]'
//                                                 style={{ backgroundColor: "#f5f5f5" }}
//                                             >
//                                                 <Tabs
//                                                     selectedIndex={skill.level}
//                                                     onSelect={(tabIndex) => handleSkillUpdate(sectionIndex, skill.id, 'level', tabIndex)}
//                                                 >
//                                                     <TabList className="flex gap-2">
//                                                         {levels.map((lvl, i) => (
//                                                             <Tab key={i} className="outline-none">
//                                                                 <div
//                                                                     className={`
//                                                                         w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300
//                                                                         ${skill.level === i ? "scale-110 border-1 border-[#800080] shadow-md" : "opacity-60 hover:opacity-100"}
//                                                                         `}
//                                                                     style={{ backgroundColor: tabColors[i], color: textColor[i] }}
//                                                                     title={lvl} 
//                                                                 >
//                                                                     {i + 1}
//                                                                 </div>
//                                                             </Tab>
//                                                         ))}
//                                                     </TabList>
//                                                 </Tabs>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </AccordionContent>
//                             </AccordionPanel>
//                         </Accordion>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default ImpSkills;

import React, { useState } from "react";
import { Label } from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import { Tab, Tabs, TabList } from "react-tabs";
import { FaPen } from "react-icons/fa";
import 'react-tabs/style/react-tabs.css';

const ImpSkills = ({ section, sectionIndex, handleSkillUpdate, handleSkillDragStart, handleSkillDrop, draggedSkillIndex, setDraggedSkillIndex }) => {
    const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
    const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
    const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

    const [editingSkillIndex, setEditingSkillIndex] = useState(null);

    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 mb-4">
                Choose 5 important skills that show you fit the position. Make sure they match the key skills mentioned in the job listing.
            </p>

            {section.skills.map((skill, sIndex) => {
                const isEditing = editingSkillIndex === sIndex;

                return (
                    <div
                        key={skill.id}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => handleSkillDrop(e, sectionIndex, sIndex)}
                        className={`flex items-center justify-between gap-4 transition-all duration-200 mb-2 
                            ${draggedSkillIndex === sIndex ? "opacity-20  scale-95" : "bg-white"}
                        `}
                    >
                        {/* Drag Handle */}
                        <span
                            className="cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleSkillDragStart(e, sIndex)}
                            onDragEnd={() => setDraggedSkillIndex(null)}
                        >
                            <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                        </span>

                        {/* Skill Name / Editable Input */}
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => handleSkillUpdate(sectionIndex, skill.id, 'name', e.target.value)}
                                    onBlur={() => setEditingSkillIndex(null)}
                                    autoFocus
                                    className="w-full text-sm font-medium border-b outline-none bg-transparent px-1"
                                />
                            ) : (
                                <div
                                    className="flex items-center gap-2 cursor-pointe"
                                    onClick={() => setEditingSkillIndex(sIndex)}
                                >
                                    <span className="text-sm font-medium">{skill.name || "Your Skill"}</span>
                                    <FaPen className="text-sm text-gray-400" />
                                </div>
                            )}
                        </div>

                        {/* Skill Level */}
                        <div className="flex flex-col items-center gap-1">
                            {/* Level Label */}
                            <span className="text-xs font-medium text-gray-600">
                                {levels[skill.level]} {/* Shows current level like "Expert" */}
                            </span>

                            {/* Level Circles */}
                            <Tabs
                                selectedIndex={skill.level}
                                onSelect={(tabIndex) => handleSkillUpdate(sectionIndex, skill.id, 'level', tabIndex)}
                            >
                                <TabList className="flex gap-1">
                                    {levels.map((lvl, i) => (
                                        <Tab key={i} className="outline-none">
                                            <div
                                                className={`
              w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300
              ${skill.level === i ? "scale-110 border border-[#800080] shadow-md" : "opacity-60 hover:opacity-100"}
            `}
                                                style={{ backgroundColor: tabColors[i], color: textColor[i] }}
                                                title={lvl}
                                            >
                                                {i + 1}
                                            </div>
                                        </Tab>
                                    ))}
                                </TabList>
                            </Tabs>
                        </div>

                    </div>
                );
            })}
        </>
    );
};

export default ImpSkills;
