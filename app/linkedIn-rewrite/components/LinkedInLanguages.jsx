'use client';
import React, { useState } from 'react';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { Tab, Tabs, TabList } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import DraggableWrapper from "../DraggableWrapper";
import DragIcon from "../DragIcon";

const LinkedInLanguages = ({ section, sectionIndex, handleLanguageUpdate }) => {
    const levels = ['Basic', 'Conversational', 'Intermediate', 'Advanced', 'Fluent', 'Native'];
    const tabColors = ['#ffeaec', '#feebe3', '#fff2cc', '#e7f4ed', '#f1f2ff', '#e0e7ff'];
    const textColor  = ['#fe7d8b', '#f68559', '#ec930c', '#48ba75', '#9ba1fb', '#818cf8'];

    const [editingIndex, setEditingIndex] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    const hideProficiency = section.hideProficiency ?? true;

    const getLevelIndex = (levelName) => {
        const index = levels.indexOf(levelName);
        return index !== -1 ? index : 2;
    };

    const handleDelete = (itemId) => {
        setDeletingId(itemId);
        setTimeout(() => {
            handleLanguageUpdate(sectionIndex, itemId, 'delete');
            setDeletingId(null);
        }, 200);
    };

    const handleAddLanguage = () => {
        handleLanguageUpdate(sectionIndex, null, 'add', {
            id: `lang_${Date.now()}`,
            language: '',
            level: 'Intermediate',
        });
        setTimeout(() => {
            setEditingIndex((section.languages || []).length);
        }, 50);
    };

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const langs = section.languages || [];
        const oldIndex = langs.findIndex(l => l.id === active.id);
        const newIndex = langs.findIndex(l => l.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            handleLanguageUpdate(sectionIndex, null, "reorder", arrayMove(langs, oldIndex, newIndex));
        }
    };

    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 mb-4">
                Choose languages you speak and indicate your proficiency level.
            </p>

            <div className="flex items-center gap-2 mb-4">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={!hideProficiency}
                        onChange={(e) =>
                            handleLanguageUpdate(sectionIndex, null, 'hideProficiency', !e.target.checked)
                        }
                    />
                    <div className="
                        w-11 h-6 bg-gray-300 rounded-full peer
                        peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#800080]
                        peer-checked:bg-[#800080]
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                        after:bg-white after:border-gray-300 after:border after:rounded-full
                        after:h-5 after:w-5 after:transition-all
                        peer-checked:after:translate-x-full peer-checked:after:border-white
                    " />
                    <span className="ml-3 text-sm font-medium text-gray-700">
                        Show proficiency level
                    </span>
                </label>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                    items={(section.languages || []).map(l => l.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-1">
                        {(section.languages || []).map((item, index) => {
                            const levelIndex = getLevelIndex(item.level || 'Intermediate');

                            return (
                                <DraggableWrapper key={item.id} id={item.id}>
                                    <div
                                        className={`
                                            group flex items-center justify-between gap-4 p-2
                                            border-b border-gray-200
                                            transition-all duration-200
                                            ${deletingId === item.id ? '-translate-x-6 opacity-0' : ''}
                                        `}
                                    >
                                        <DragIcon />

                                        <div className="flex-1">
                                            {editingIndex === index ? (
                                                <input
                                                    autoFocus
                                                    value={item.language || ''}
                                                    onChange={(e) =>
                                                        handleLanguageUpdate(sectionIndex, item.id, 'language', e.target.value)
                                                    }
                                                    onBlur={() => {
                                                        setEditingIndex(null);
                                                        if (!item.language?.trim()) handleDelete(item.id);
                                                    }}
                                                    onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
                                                    className="w-full text-sm font-medium border-b border-[#800080] outline-none bg-transparent px-1"
                                                    placeholder="e.g. English, Spanish"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-medium text-gray-800">
                                                        {item.language || 'Language'}
                                                    </span>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                                        <FaPen
                                                            className="text-xs text-gray-400 cursor-pointer hover:text-[#800080]"
                                                            onClick={() => setEditingIndex(index)}
                                                        />
                                                        <FaTrash
                                                            className="text-xs text-gray-400 cursor-pointer hover:text-red-500"
                                                            onClick={() => handleDelete(item.id)}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {!hideProficiency && (
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-[12px] font-bold text-gray-500">
                                                    {item.level || 'Intermediate'}
                                                </span>
                                                <Tabs
                                                    selectedIndex={levelIndex}
                                                    onSelect={(tabIndex) =>
                                                        handleLanguageUpdate(sectionIndex, item.id, 'level', levels[tabIndex])
                                                    }
                                                >
                                                    <TabList className="flex gap-1">
                                                        {levels.map((lvl, i) => (
                                                            <Tab key={i} className="outline-none">
                                                                <div
                                                                    className={`
                                                                        w-7 h-7 flex items-center justify-center rounded-full
                                                                        cursor-pointer transition-all duration-300 text-sm font-bold
                                                                        ${levelIndex === i
                                                                            ? 'scale-110 border-1 border-[#800080] shadow-md'
                                                                            : 'opacity-60 hover:opacity-100'}
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
                                        )}
                                    </div>
                                </DraggableWrapper>
                            );
                        })}
                    </div>
                </SortableContext>
            </DndContext>

            <button
                type="button"
                onClick={handleAddLanguage}
                className="flex items-center gap-2 text-sm !text-[#800080] font-medium mt-4 hover:underline"
            >
                <FaPlus size={12} /> Add one more language
            </button>
        </>
    );
};

export default LinkedInLanguages;