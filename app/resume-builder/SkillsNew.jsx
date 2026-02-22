'use client';
import React, { useState } from 'react';
import { Tabs, TabList, Tab } from "react-tabs";
import { FaPen, FaTrash } from "react-icons/fa";
import 'react-tabs/style/react-tabs.css';
import { useFormContext } from 'react-hook-form';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableWrapper from "./DraggableWrapper";
import DragIcon from "./DragIcon";

const SkillsNew = ({ register, watch, setValue, fields, append, remove, move, sectionTitle, setSectionTitle, isEditingTitle, setIsEditingTitle }) => {
    const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
    const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
    const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

    const [editingIndex, setEditingIndex] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const { setValue: setFormValue } = useFormContext();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    // Real-time update handler for Title
    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setSectionTitle(newTitle);
        setFormValue("skillSectionTitle", newTitle);
    };

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
        setFormValue("skillSectionTitle", sectionTitle);
    };

    const hideExperienceLevel = watch("hideExperienceLevel");

    const handleDelete = (index, id) => {
        setDeletingId(id);
        setTimeout(() => {
            remove(index);
            setDeletingId(null);
        }, 200);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = fields.findIndex((f) => f.id === active.id);
        const newIndex = fields.findIndex((f) => f.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            move(oldIndex, newIndex);
        }
    };

    return (
        <>
            <div>
                <div className="acco_section flex items-center gap-2 group w-fit">
                    {isEditingTitle ? (
                        <input
                            autoFocus
                            className="text-xl font-bold text-black border-b-2 border-[#800080] outline-none"
                            value={sectionTitle}
                            onChange={handleTitleChange}
                            onBlur={handleTitleBlur}
                            onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
                        />
                    ) : (
                        <h2
                            className='text-xl font-bold text-black pb-1 cursor-pointer flex items-center gap-3'
                            onClick={() => setIsEditingTitle(true)}
                        >
                            {sectionTitle}
                            <FaPen className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-purple-600 cursor-pointer duration-200" />
                        </h2>
                    )}
                </div>
                <div className='flex justify-between items-center'>
                    <p className='text-sm text-[#808897] font-medium'>
                        Choose 5 important skills that show you fit the position.
                    </p>
                </div>

                {/* Toggle button - ImpSkills style */}
                <div className="flex items-center gap-2 my-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!hideExperienceLevel}
                            onChange={(e) => setValue("hideExperienceLevel", !e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#800080] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800080]"></div>
                        <span className="ml-3 text-sm font-medium text-gray-700">Show experience level</span>
                    </label>
                </div>
            </div>

            <div className="mt-6">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                        {fields.map((item, index) => {
                            const skillName = watch(`newSkillHistory.${index}.skill`);
                            const skillLevel = watch(`newSkillHistory.${index}.level`) || 0;
                            const isEditing = editingIndex === index;

                            return (
                                <DraggableWrapper key={item.id} id={item.id}>
                                    <div
                                        className={`
                                            group flex items-center justify-between gap-4 mb-2 p-2 !border-b !border-gray-300
                                            transition-all duration-200 ease-in-out
                                            ${deletingId === item.id ? "-translate-x-6 opacity-0" : ""}
                                        `}
                                    >
                                        <span className="cursor-grab active:cursor-grabbing">
                                            <DragIcon />
                                        </span>

                                        <div className="flex-1 acco_section">
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    {...register(`newSkillHistory.${index}.skill`)}
                                                    onBlur={() => setEditingIndex(null)}
                                                    autoFocus
                                                    className="w-full text-sm font-medium !border-b-2 outline-none bg-transparent px-1 border-[#800080]"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium">{skillName || "Your Skill"}</span>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                                        <FaPen
                                                            className="text-sm text-gray-400 cursor-pointer hover:text-purple-600"
                                                            onClick={() => setEditingIndex(index)}
                                                        />
                                                        <FaTrash
                                                            className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
                                                            onClick={() => handleDelete(index, item.id)}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Level Selection */}
                                        {!hideExperienceLevel && (
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-xs font-medium text-gray-600">
                                                    {levels[skillLevel]}
                                                </span>
                                                <Tabs
                                                    selectedIndex={skillLevel}
                                                    onSelect={(tabIndex) => setValue(`newSkillHistory.${index}.level`, tabIndex)}
                                                >
                                                    <TabList className="flex gap-1">
                                                        {levels.map((lvl, i) => (
                                                            <Tab key={i} className="outline-none !p-0 !border-none">
                                                                <div
                                                                    className={`w-6 h-6 flex items-center justify-center rounded-full font-bold cursor-pointer transition-all
                                                                    ${skillLevel === i ? "scale-110 ring-1 ring-[#800080] shadow-md" : "opacity-40 hover:opacity-100"}`}
                                                                    style={{ backgroundColor: tabColors[i], color: textColor[i] }}
                                                                >
                                                                    {i + 1}
                                                                </div>
                                                            </Tab>
                                                        ))}
                                                    </TabList>
                                                </Tabs>
                                            </div>
                                        )}
                                    </div>
                                </DraggableWrapper>
                            );
                        })}
                    </SortableContext>
                </DndContext>
            </div>

            <button
                type="button"
                onClick={() => append({ skill: "", level: 2 })}
                className="text-sm !text-[#800080] font-bold mt-4 hover:underline"
            >
                + Add one more Skill
            </button>
        </>
    );
};

export default SkillsNew;


// 'use client';
// import React, { useState } from 'react';
// import { Tabs, TabList, Tab } from "react-tabs";
// import { FaPen, FaTrash } from "react-icons/fa";
// import { TbDragDrop } from "react-icons/tb";
// import 'react-tabs/style/react-tabs.css';
// import { useFormContext } from 'react-hook-form';

// const SkillsNew = ({ register, watch, setValue, fields, append, remove, move,sectionTitle, setSectionTitle, isEditingTitle, setIsEditingTitle  }) => {
//     const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
//     const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
//     const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

//     const [editingIndex, setEditingIndex] = useState(null);
//     const [draggedIndex, setDraggedIndex] = useState(null);
//     const [deletingIndex, setDeletingIndex] = useState(null);
//     const { setValue: setFormValue } = useFormContext();

//     // Real-time update handler for Title
//     const handleTitleChange = (e) => {
//         const newTitle = e.target.value;
//         setSectionTitle(newTitle); // UI local state update
//         setFormValue("skillSectionTitle", newTitle); // Template real-time sync
//     };

//     const handleTitleBlur = () => {
//         setIsEditingTitle(false);
//         setFormValue("skillSectionTitle", sectionTitle); 
//     };

//     const hideExperienceLevel = watch("hideExperienceLevel");
//     const handleDelete = (index) => {
//         setDeletingIndex(index);
//         setTimeout(() => {
//             remove(index);
//             setDeletingIndex(null);
//         }, 500);
//     };
//     return (
//         <>
//             <div>
//                 <div className="acco_section flex items-center gap-2 group w-fit">
//                     {isEditingTitle ? (
//                         <input
//                             autoFocus
//                             className="text-xl font-bold text-black border-b-2 border-[#800080] outline-none"
//                             value={sectionTitle}
//                             onChange={handleTitleChange} // typing-er somoy real-time change hobe
//                             onBlur={handleTitleBlur}
//                             onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
//                         />
//                     ) : (
//                         <h2
//                             className='text-xl font-bold text-black pb-1 cursor-pointer flex items-center gap-3'
//                             onClick={() => setIsEditingTitle(true)}
//                         >
//                             {sectionTitle}
//                             <FaPen className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-purple-600 cursor-pointer duration-200" />
//                         </h2>
//                     )}
//                 </div>
//                 <div className='flex justify-between items-center'>
//                     <p className='text-sm text-[#808897] font-medium'>
//                         Choose 5 important skills that show you fit the position.
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-2 my-1">
//                     <input
//                         id="hideLevelToggleNew"
//                         type="checkbox"
//                         className="w-4 h-4 text-[#800080] bg-gray-100 border-gray-300 rounded focus:ring-[#800080]"
//                         {...register("hideExperienceLevel")}
//                     />
//                     <label htmlFor="hideLevelToggleNew" className="text-sm font-medium text-gray-500 cursor-pointer">
//                         Don't show experience level
//                     </label>
//                 </div>
//             </div>

//             <div className="mt-6">
//                 {fields.map((item, index) => {
//                     const skillName = watch(`newSkillHistory.${index}.skill`);
//                     const skillLevel = watch(`newSkillHistory.${index}.level`) || 0;
//                     const isEditing = editingIndex === index;

//                     return (
//                         <div
//                             key={item.id}
//                             onDragOver={(e) => e.preventDefault()}
//                             onDrop={(e) => {
//                                 move(draggedIndex, index);
//                                 setDraggedIndex(null);
//                             }}
//                             // Matches ImpSkills styling exactly
//                             className={`
//                                 group
//                                 flex items-center justify-between gap-4 mb-2 p-2 !border-b !border-gray-300
//                                 transition-all duration-300 ease-in-out
//                                 ${draggedIndex === index ? "opacity-20 scale-95" : "bg-white"}
//                                 ${deletingIndex === index ? "-translate-x-10 opacity-0" : ""}
//                             `}
//                         >
//                             <div className="flex items-center gap-3 flex-1">
//                                 {/* Drag Handle */}
//                                 <span
//                                     className="cursor-grab active:cursor-grabbing"
//                                     draggable
//                                     onDragStart={() => setDraggedIndex(index)}
//                                 >
//                                     <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
//                                 </span>

//                                 <div className="flex-1 acco_section">
//                                     {isEditing ? (
//                                         <input
//                                             type="text"
//                                             {...register(`newSkillHistory.${index}.skill`)}
//                                             onBlur={() => setEditingIndex(null)}
//                                             autoFocus
//                                             // Added !border-b to match ImpSkills input style
//                                             className="w-full text-sm font-medium !border-b-2 outline-none bg-transparent px-1 border-[#800080]"
//                                         />
//                                     ) : (
//                                         <div className="flex items-center gap-2">
//                                             <span className="text-sm font-medium">{skillName || "Your Skill"}</span>
//                                             <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
//                                                 <FaPen className="text-sm text-gray-400 cursor-pointer hover:text-purple-600" onClick={() => setEditingIndex(index)} />
//                                                 <FaTrash className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
//                                                     onClick={() => handleDelete(index)}
//                                                 />
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Level Selection */}
//                             {!hideExperienceLevel && (
//                                 <div className="flex flex-col items-center gap-1">
//                                     <span className="text-xs font-medium text-gray-600">
//                                         {levels[skillLevel]}
//                                     </span>
//                                     <Tabs
//                                         selectedIndex={skillLevel}
//                                         onSelect={(tabIndex) => setValue(`newSkillHistory.${index}.level`, tabIndex)}
//                                     >
//                                         <TabList className="flex gap-1">
//                                             {levels.map((lvl, i) => (
//                                                 <Tab key={i} className="outline-none !p-0 !border-none">
//                                                     <div
//                                                         className={`w-6 h-6 flex items-center justify-center rounded-full font-bold cursor-pointer transition-all
//                                                         ${skillLevel === i ? "scale-110 ring-1 ring-[#800080] shadow-md" : "opacity-40 hover:opacity-100"}`}
//                                                         style={{ backgroundColor: tabColors[i], color: textColor[i] }}
//                                                     >
//                                                         {i + 1}
//                                                     </div>
//                                                 </Tab>
//                                             ))}
//                                         </TabList>
//                                     </Tabs>
//                                 </div>
//                             )}
//                         </div>
//                     );
//                 })}
//             </div>

//             <button
//                 type="button"
//                 onClick={() => append({ skill: "", level: 2 })}
//                 className="text-sm !text-[#800080] font-bold mt-4 hover:underline"
//             >
//                 + Add one more Skill
//             </button>
//         </>
//     );
// };

// export default SkillsNew;