'use client';
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle, Label } from "flowbite-react";
import { Tabs, TabList, Tab } from "react-tabs";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { TfiHandDrag } from "react-icons/tfi";
import { RiDraggable } from "react-icons/ri";

const SkillsNew = ({ register, watch, setValue, control, fields, append, remove, move }) => {
    
    const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
    const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];
    const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];

    // 1. This watches the value of the toggle
    const hideExperienceLevel = watch("hideExperienceLevel");
    const showLevel = !hideExperienceLevel;

    // Drag and Drop State
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [isHandleHovered, setIsHandleHovered] = useState(false);

    const handleDragStart = (e, index) => {
        if (!isHandleHovered) {
          e.preventDefault();
          return;
        }
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };
    
    const handleDragEnd = () => {
        setDraggedIndex(null);
        setIsHandleHovered(false);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };
    
    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;
    
        move(draggedIndex, targetIndex);
        setDraggedIndex(null);
    };

    const addMore = () => {
        append({ level: 3 }); // Default level Experienced
    };

    const deleteSkill = (index) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const handleLevelUpdate = (index, tabIndex) => {
        setValue(`newSkillHistory.${index}.level`, tabIndex);
    };

    return (
        <>
            <div className='mb-4'>
                <h2 className='text-xl font-bold text-black pb-1'>Skills</h2>
                <p className='text-sm text-[#808897] font-medium'>
                    Choose 5 important skills that show you fit the position.
                </p>
            </div>

            {/* --- TOGGLE BUTTON SECTION --- */}
            <div className="flex items-center gap-2 mb-6 p-2">
                <input 
                    id="hideLevelToggle"
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    {...register("hideExperienceLevel")} 
                />
                <label htmlFor="hideLevelToggle" className="text-sm font-medium text-gray-700 cursor-pointer">
                    Don't show experience level
                </label>
            </div>

            <div className='acco_section'>
                <div className="space-y-3">
                    {fields.map((item, index) => {
                        const watchedSkill = watch(`newSkillHistory.${index}.skill`);
                        const watchedLevel = watch(`newSkillHistory.${index}.level`);
                        const currentLevel = watchedLevel !== undefined ? watchedLevel : (item.level !== undefined ? item.level : 3);

                        return (
                            <div
                                key={item.id}
                                draggable={isHandleHovered}
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index)}
                                className={`transition-all duration-200 bg-white rounded-xl border ${
                                    draggedIndex === index 
                                    ? "opacity-20 border-cyan-500 scale-95" 
                                    : "opacity-100 border-gray-200 shadow-sm hover:border-cyan-300"
                                } cursor-default`}
                            >
                            <Accordion flush={true}>
                                <AccordionPanel>
                                    <AccordionTitle className="p-4 bg-white hover:bg-gray-50">
                                        <div className='flex items-center gap-3 w-full'>
                                            {/* Drag Handle Icon */}
                                            <button
                                                type="button"
                                                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
                                                onMouseEnter={() => setIsHandleHovered(true)}
                                                onMouseLeave={() => setIsHandleHovered(false)}
                                            >
                                                <RiDraggable className="text-xl text-gray-400" />
                                            </button>

                                            <div className="flex flex-col items-start w-full">
                                                <span className="text-lg font-bold text-gray-700">{watchedSkill || "(Not specified)"}</span>
                                                {/* Subtitle changes based on toggle */}
                                                <span className="text-xs font-normal text-gray-400">
                                                    {showLevel ? levels[currentLevel] : "Level hidden"}
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionTitle>
                                    
                                    <AccordionContent className="bg-white border-t border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
                                            <div className='flex flex-col'>
                                                <Label className="!text-gray-400 mb-1">Skill</Label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Java"
                                                    className="w-full rounded-lg border border-gray-300 bg-[#f0f4f9] p-2.5 text-sm outline-none focus:border-blue-500"
                                                    {...register(`newSkillHistory.${index}.skill`)}
                                                />
                                            </div>

                                            {/* This section disappears if toggle is checked */}
                                            {showLevel && (
                                                <div className='flex flex-col'>
                                                    <Label className="!text-gray-400 text-sm mb-1">
                                                        Level — <span className="font-bold" style={{ color: textColor[currentLevel] }}>
                                                            {levels[currentLevel]}
                                                        </span>
                                                    </Label>
                                                    
                                                    <div 
                                                        className='transition-all duration-300 rounded-[5px] p-1' 
                                                        style={{ backgroundColor: tabColors[currentLevel] }}
                                                    >
                                                        <Tabs 
                                                            selectedIndex={currentLevel} 
                                                            onSelect={(tabIndex) => handleLevelUpdate(index, tabIndex)}
                                                        >
                                                            <TabList className="flex border-none cursor-pointer">
                                                                {levels.map((_, i) => (
                                                                    <Tab 
                                                                        key={i}
                                                                        className={`flex-1 h-8 rounded-sm mr-1 last:mr-0 outline-none transition-all ${
                                                                            i === currentLevel ? 'opacity-100' : 'opacity-30'
                                                                        }`}
                                                                        style={{ 
                                                                            backgroundColor: i === currentLevel ? textColor[currentLevel] : 'white' 
                                                                        }}
                                                                    >
                                                                        &nbsp;
                                                                    </Tab>
                                                                ))}
                                                            </TabList>
                                                        </Tabs>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                         {/* Delete Button Area - Moved inside content to match other sections */}
                                        <div className="flex justify-end pt-2 border-t mt-4">
                                            <button 
                                                type="button" 
                                                onClick={() => deleteSkill(index)} 
                                                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                <MdDelete className='text-lg' /> 
                                            </button>
                                        </div>
                                    </AccordionContent>
                                </AccordionPanel>
                            </Accordion>
                            </div>
                        );
                    })}
                </div>

                <div className='mt-4'>
                    <button 
                        type="button" 
                        onClick={addMore} 
                        className='flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-bold transition-all p-2 rounded-lg hover:bg-cyan-50'
                    >
                        <FaPlus /> Add one more Skill
                    </button>
                </div>
            </div>
        </>
    );
};

export default SkillsNew;