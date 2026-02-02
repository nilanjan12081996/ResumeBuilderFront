'use client';
import React, { useState } from 'react';
import { Tabs, TabList, Tab } from "react-tabs";
import { FaPen, FaTrash } from "react-icons/fa";
import { TbDragDrop } from "react-icons/tb";
import 'react-tabs/style/react-tabs.css';

const SkillsNewEdit = ({
    register,
    watch,
    setValue,
    fields,
    append,
    remove,
    move,
    noHeader
}) => {

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
        }, 300);
    };

    return (
        <>
            {!noHeader && (
                <h2 className="text-xl font-bold text-black">Skills</h2>
            )}
            <p className="text-sm text-[#808897] font-medium mb-2">
                Choose 5 important skills that show you fit the position.
            </p>
            <div className="flex items-center gap-2">
                <input
                    id="hideLevelToggleNew"
                    type="checkbox"
                    className="!w-4 !h-4 text-[#800080] bg-gray-100 border-gray-300 rounded focus:ring-[#800080]"
                    {...register("hideExperienceLevel")}
                />
                <label
                    htmlFor="hideLevelToggleNew"
                    className="text-sm font-medium text-gray-500 cursor-pointer"
                >
                    Don't show experience level
                </label>
            </div>


            {/* Skill List */}
            <div className="">
                {fields.map((item, index) => {
                    const skillName = watch(`newSkillHistory.${index}.skill`);
                    const skillLevel = watch(`newSkillHistory.${index}.level`) ?? 2;
                    const isEditing = editingIndex === index;

                    return (
                        <div
                            key={item.id}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                                move(draggedIndex, index);
                                setDraggedIndex(null);
                            }}
                            className={`
                group flex items-center justify-between gap-4 mb-2 p-2
                !border-b !border-gray-300 transition-all
                ${draggedIndex === index ? "opacity-20 scale-95" : ""}
                ${deletingIndex === index ? "-translate-x-10 opacity-0" : ""}
              `}
                        >
                            {/* Left */}
                            <div className="flex items-center gap-3 flex-1">
                                {/* Drag */}
                                <span
                                    draggable
                                    onDragStart={() => setDraggedIndex(index)}
                                    className="cursor-grab active:cursor-grabbing"
                                >
                                    <TbDragDrop className="text-xl text-gray-500 hover:text-purple-600" />
                                </span>

                                {/* Skill */}
                                <div className="flex-1">
                                    {isEditing ? (
                                        <input
                                            autoFocus
                                            {...register(`newSkillHistory.${index}.skill`)}
                                            onBlur={() => setEditingIndex(null)}
                                            className="w-full text-sm font-medium bg-transparent border-b border-purple-600 outline-none"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">
                                                {skillName || "Your Skill"}
                                            </span>

                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                                                <FaPen
                                                    onClick={() => setEditingIndex(index)}
                                                    className="text-sm text-gray-400 hover:text-purple-600 cursor-pointer"
                                                />
                                                <FaTrash
                                                    onClick={() => handleDelete(index)}
                                                    className="text-sm text-gray-400 hover:text-red-500 cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Level */}
                            {!hideExperienceLevel && (
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-xs font-medium text-gray-600">
                                        {levels[skillLevel]}
                                    </span>

                                    <Tabs
                                        selectedIndex={skillLevel}
                                        onSelect={(tabIndex) =>
                                            setValue(`newSkillHistory.${index}.level`, tabIndex)
                                        }
                                    >
                                        <TabList className="flex gap-1">
                                            {levels.map((_, i) => (
                                                <Tab key={i} className="outline-none !p-0 !border-none">
                                                    <div
                                                        className={`
                              w-6 h-6 rounded-full flex items-center justify-center
                              cursor-pointer transition-all
                              ${skillLevel === i
                                                                ? "scale-110 ring-1 ring-[#800080] shadow"
                                                                : "opacity-40 hover:opacity-100"}
                            `}
                                                        style={{
                                                            backgroundColor: tabColors[i],
                                                            color: textColor[i],
                                                        }}
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

            {/* Add */}
            <button
                type="button"
                onClick={() => append({ skill: "", level: 2 })}
                className="text-sm !text-[#800080] font-bold py-4 hover:underline"
            >
                + Add one more Skill
            </button>
        </>
    );
};

export default SkillsNewEdit;
