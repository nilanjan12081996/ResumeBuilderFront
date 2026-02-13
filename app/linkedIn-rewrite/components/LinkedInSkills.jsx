import React, { useState } from "react";
import { TbDragDrop } from "react-icons/tb";
import { FaPen, FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const LinkedInSkills = ({ section, sectionIndex, handleSkillUpdate, handleSkillDragStart, handleSkillDrop, draggedSkillIndex, setDraggedSkillIndex }) => {
    const [editingSkillIndex, setEditingSkillIndex] = useState(null);
    const [deletingSkillIndex, setDeletingSkillIndex] = useState(null);

    const handleDelete = (sIndex, skillId) => {
        setDeletingSkillIndex(sIndex);

        setTimeout(() => {
            handleSkillUpdate(sectionIndex, skillId, "delete");
            setDeletingSkillIndex(null);
        }, 500);
    };

    const addSkill = (skillName = "") => {
        const newSkill = {
            id: `ts_${Math.random().toString(36).substr(2, 9)}`,
            name: skillName,
            level: 2
        };

        handleSkillUpdate(sectionIndex, null, "add", newSkill);
    }

    return (
        <>
            <div>
                <p className="!text-sm !font-medium !text-gray-500">
                    Add skills that are relevant to your professional profile. LinkedIn emphasizes top skills for better visibility.
                </p>
            </div>
            
            {section.skills.map((skill, sIndex) => {
                const isEditing = editingSkillIndex === sIndex;

                return (
                    <div
                        key={skill.id}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => handleSkillDrop(e, sectionIndex, sIndex)}
                        className={`
                            group
                            flex items-center justify-between gap-4 mb-2 p-2 !border-b !border-gray-300
                            transition-all duration-300 ease-in-out
                            ${draggedSkillIndex === sIndex ? "opacity-20 scale-95" : ""}
                            ${deletingSkillIndex === sIndex ? "-translate-x-6 opacity-0" : ""}
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
                                    onBlur={() => {
                                        setEditingSkillIndex(null);

                                        if (!skill.name.trim()) {
                                            handleDelete(sIndex, skill.id);
                                        }
                                    }}
                                    autoFocus
                                    className="w-full text-sm font-medium !border-b outline-none bg-transparent px-1"
                                />
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">
                                        {skill.name || "Your Skill"}
                                    </span>

                                    <div className="flex items-center gap-2
                                        opacity-0
                                        translate-x-2
                                        group-hover:opacity-100
                                        group-hover:translate-x-0
                                        transition-all duration-200">
                                        <FaPen
                                            className="text-sm text-gray-400 cursor-pointer hover:text-purple-600"
                                            onClick={() => setEditingSkillIndex(sIndex)}
                                        />

                                        <FaTrash
                                            className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(sIndex, skill.id);
                                            }}
                                        />
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                );
            })}
            <button
                type="button"
                onClick={() => addSkill("")}
                className="flex items-center gap-2 !text-sm !text-[#800080] font-medium mt-4 hover:underline"
            >
                <FaPlus size={12} /> Add one more skill
            </button>
        </>
    );
};

export default LinkedInSkills;