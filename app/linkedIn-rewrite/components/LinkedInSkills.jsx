import React, { useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import DraggableWrapper from "../DraggableWrapper";
import DragIcon from "../DragIcon";

const LinkedInSkills = ({ section, sectionIndex, handleSkillUpdate }) => {
    const [editingSkillIndex, setEditingSkillIndex] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = (skillId) => {
        setDeletingId(skillId);
        setTimeout(() => {
            handleSkillUpdate(sectionIndex, skillId, "delete");
            setDeletingId(null);
        }, 200);
    };

    const addSkill = () => {
        const newSkill = {
            id: `ts_${Math.random().toString(36).substr(2, 9)}`,
            name: "",
            level: 2,
        };
        handleSkillUpdate(sectionIndex, null, "add", newSkill);
    };

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const skills = section.skills || [];
        const oldIndex = skills.findIndex(s => s.id === active.id);
        const newIndex = skills.findIndex(s => s.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            handleSkillUpdate(sectionIndex, null, "reorder", arrayMove(skills, oldIndex, newIndex));
        }
    };

    return (
        <>
            <div>
                <p className="!text-sm !font-medium !text-gray-500">
                    Mention the key skills you have experience of
                </p>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                    items={(section.skills || []).map(s => s.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {(section.skills || []).map((skill, sIndex) => {
                        const isEditing = editingSkillIndex === sIndex;

                        return (
                            <DraggableWrapper key={skill.id} id={skill.id}>
                                <div
                                    className={`
                                        group flex items-center justify-between gap-4 mb-2 p-2 !border-b !border-gray-300
                                        transition-all duration-200 ease-in-out
                                        ${deletingId === skill.id ? "-translate-x-6 opacity-0" : ""}
                                    `}
                                >
                                    <DragIcon />

                                    <div className="flex-1">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={skill.name}
                                                onChange={(e) => handleSkillUpdate(sectionIndex, skill.id, 'name', e.target.value)}
                                                onBlur={() => {
                                                    setEditingSkillIndex(null);
                                                    if (!skill.name.trim()) handleDelete(skill.id);
                                                }}
                                                autoFocus
                                                className="w-full text-sm font-medium !border-b outline-none bg-transparent px-1"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    {skill.name || "Your Skill"}
                                                </span>
                                                <div className="flex items-center gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                                                    <FaPen
                                                        className="text-sm text-gray-400 cursor-pointer hover:text-purple-600"
                                                        onClick={() => setEditingSkillIndex(sIndex)}
                                                    />
                                                    <FaTrash
                                                        className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(skill.id);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </DraggableWrapper>
                        );
                    })}
                </SortableContext>
            </DndContext>

            <button
                type="button"
                onClick={addSkill}
                className="flex items-center gap-2 !text-sm !text-[#800080] font-medium mt-4 hover:underline"
            >
                <FaPlus size={12} /> Add one more skill
            </button>
        </>
    );
};

export default LinkedInSkills;