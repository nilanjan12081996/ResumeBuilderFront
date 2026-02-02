'use client';
import React, { useState } from 'react';
import { Tabs, TabList, Tab } from "react-tabs";
import { FaPen, FaTrash } from "react-icons/fa";
import { TbDragDrop } from "react-icons/tb";
import 'react-tabs/style/react-tabs.css';

const SkillsNew = ({ register, watch, setValue, fields, append, remove, move }) => {
    const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
    const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
    const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

    const [editingIndex, setEditingIndex] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [deletingIndex, setDeletingIndex] = useState(null);

    const hideExperienceLevel = watch("hideExperienceLevel");
    const handleDelete = (index) => {
        setDeletingIndex(index);
        setTimeout(() => {
            remove(index);
            setDeletingIndex(null);
        }, 500);
    };
    return (
        <>
            <div>
                <h2 className='text-xl font-bold text-black pb-1'>Skills</h2>
                <div className='flex justify-between items-center'>
                    <p className='text-sm text-[#808897] font-medium'>
                        Choose 5 important skills that show you fit the position.
                    </p>
                </div>
                <div className="flex items-center gap-2 my-1">
                    <input
                        id="hideLevelToggleNew"
                        type="checkbox"
                        className="w-4 h-4 text-[#800080] bg-gray-100 border-gray-300 rounded focus:ring-[#800080]"
                        {...register("hideExperienceLevel")}
                    />
                    <label htmlFor="hideLevelToggleNew" className="text-sm font-medium text-gray-500 cursor-pointer">
                        Don't show experience level
                    </label>
                </div>
            </div>

            <div className="mt-6">
                {fields.map((item, index) => {
                    const skillName = watch(`newSkillHistory.${index}.skill`);
                    const skillLevel = watch(`newSkillHistory.${index}.level`) || 0;
                    const isEditing = editingIndex === index;

                    return (
                        <div
                            key={item.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                move(draggedIndex, index);
                                setDraggedIndex(null);
                            }}
                            // Matches ImpSkills styling exactly
                            className={`
                                group
                                flex items-center justify-between gap-4 mb-2 p-2 !border-b !border-gray-300
                                transition-all duration-300 ease-in-out
                                ${draggedIndex === index ? "opacity-20 scale-95" : "bg-white"}
                                ${deletingIndex === index ? "-translate-x-10 opacity-0" : ""}
                            `}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                {/* Drag Handle */}
                                <span
                                    className="cursor-grab active:cursor-grabbing"
                                    draggable
                                    onDragStart={() => setDraggedIndex(index)}
                                >
                                    <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                                </span>

                                <div className="flex-1">
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            {...register(`newSkillHistory.${index}.skill`)}
                                            onBlur={() => setEditingIndex(null)}
                                            autoFocus
                                            // Added !border-b to match ImpSkills input style
                                            className="w-full text-sm font-medium !border-b outline-none bg-transparent px-1 border-[#800080]"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{skillName || "Your Skill"}</span>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                                <FaPen className="text-sm text-gray-400 cursor-pointer hover:text-purple-600" onClick={() => setEditingIndex(index)} />
                                                <FaTrash className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
                                                    onClick={() => handleDelete(index)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
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
                    );
                })}
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