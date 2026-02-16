'use client';
import React, { useState } from "react";
import { TbDragDrop } from "react-icons/tb";
import { Tab, Tabs, TabList } from "react-tabs";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import 'react-tabs/style/react-tabs.css';

const NewLanguageEdit = ({
  register,
  watch,
  setValue,
  fields,
  append,
  remove,
  move,
  noHeader,
}) => {
  const levels = ["Basic", "Conversational", "Intermediate", "Advanced", "Fluent", "Native"];
  const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff", "#e0e7ff"];
  const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb", "#818cf8"];

  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  // ✅ Toggle state - form field এ save করুন যাতে template access করতে পারে
  const hideProficiency = watch('hideLanguageProficiency') ?? true;

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    move(draggedIndex, targetIndex);
    setDraggedIndex(null);
  };

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      remove(index);
      setDeletingIndex(null);
    }, 500);
  };

  // ✅ Get level index from level name
  const getLevelIndex = (levelName) => {
    const index = levels.indexOf(levelName);
    return index !== -1 ? index : 2; // Default to "Intermediate"
  };

  return (
    <>
      <div className="mb-4">
        {!noHeader && (
          <h2 className="text-xl font-bold text-black pb-1">Languages</h2>
        )}
        <p className="text-sm font-medium text-gray-500">
          Choose languages you speak and indicate your proficiency level.
        </p>

        {/* Toggle Button */}
        <div className="flex items-center gap-2 my-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!hideProficiency}
              onChange={(e) => {
                setValue('hideLanguageProficiency', !e.target.checked, { shouldDirty: true });
              }}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#800080] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800080]"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              Show proficiency level
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-1">
        {fields.map((item, index) => {
          const isEditing = editingIndex === index;
          const watchedLanguage = watch(`languageHistory.${index}.language`);
          const watchedLevelName = watch(`languageHistory.${index}.level`) || "Intermediate";
          const watchedLevelIndex = getLevelIndex(watchedLevelName);

          return (
            <div
              key={item.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
              className={`
                group flex items-center justify-between gap-4 p-2 border-b border-gray-200
                transition-all duration-300 ease-in-out
                ${draggedIndex === index ? "opacity-20 scale-95" : ""}
                ${deletingIndex === index ? "-translate-x-6 opacity-0" : ""}
              `}
            >
              {/* Drag Handle */}
              <span
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={() => setDraggedIndex(null)}
                className="cursor-grab active:cursor-grabbing"
              >
                <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
              </span>

              {/* Language Name / Input */}
              <div className="flex-1">
                {isEditing ? (
                  <input
                    {...register(`languageHistory.${index}.language`)}
                    autoFocus
                    onBlur={() => {
                      setEditingIndex(null);
                      if (!watchedLanguage?.trim()) handleDelete(index);
                    }}
                    className="w-full text-sm font-medium border-b border-[#800080] outline-none bg-transparent px-1"
                    placeholder="e.g. English, Spanish"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">
                      {watchedLanguage || "Language"}
                    </span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                      <FaPen
                        className="text-xs text-gray-400 cursor-pointer hover:text-[#800080]"
                        onClick={() => setEditingIndex(index)}
                      />
                      <FaTrash
                        className="text-xs text-gray-400 cursor-pointer hover:text-red-500"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Proficiency Level Circles */}
              {!hideProficiency && (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[12px] font-bold text-gray-500 tracking-tight">
                    {watchedLevelName}
                  </span>
                  <Tabs
                    selectedIndex={watchedLevelIndex}
                    onSelect={(tabIndex) => {
                      // ✅ Save level NAME instead of index
                      setValue(`languageHistory.${index}.level`, levels[tabIndex], { shouldDirty: true });
                    }}
                  >
                    <TabList className="flex gap-1">
                      {levels.map((lvl, i) => (
                        <Tab key={i} className="outline-none">
                          <div
                            className={`
                              w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 text-sm font-bold
                              ${watchedLevelIndex === i ? "scale-110 border-2 border-[#800080] shadow-md" : "opacity-60 hover:opacity-100"}
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
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => append({ language: "", level: "Intermediate" })}
        className="flex items-center gap-2 text-sm !text-[#800080] font-medium mt-4 hover:underline"
      >
        <FaPlus size={12} /> Add one more language
      </button>
    </>
  );
};

export default NewLanguageEdit;