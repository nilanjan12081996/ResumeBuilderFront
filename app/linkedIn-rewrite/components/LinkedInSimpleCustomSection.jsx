'use client';
import React, { useState } from "react";
import { TbDragDrop } from "react-icons/tb";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { Tabs, Tab, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const LinkedInSimpleCustomSection = ({
  section,
  sectionIndex,
  handleUpdate,
  handleDragStart,
  handleDrop,
  draggedIndex,
  setDraggedIndex,
}) => {
  const levels    = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
  const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
  const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

  const [editingIndex, setEditingIndex]   = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  // Default: level hidden (true = hidden)
  const hideExperienceLevel = section.hideExperienceLevel ?? true;

  const getHelperText = () => {
    const title = (section.title || "").toLowerCase();
    if (title.includes("competenc"))  return "Highlight your strongest competencies relevant to the role.";
    if (title.includes("technolog") || title.includes("tech")) return "List the technologies you're proficient in.";
    if (title.includes("tool"))       return "Add tools and software you can work with.";
    if (title.includes("framework"))  return "Include frameworks you have experience with.";
    if (title.includes("language"))   return "List programming or spoken languages you know.";
    if (title.includes("award") || title.includes("honor")) return "Add your honors and awards.";
    return "Add items for this section.";
  };

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      handleUpdate(sectionIndex, index, "delete");
      setDeletingIndex(null);
    }, 500);
  };

  const addItem = () => {
    handleUpdate(sectionIndex, null, "add", {
      id: `simple_${Date.now()}`,
      name: "",
      level: 2,
    });
  };

  return (
    <>
      <div>
        <p className="!text-sm !font-medium !text-gray-500 mb-3">{getHelperText()}</p>

        {/* Show/Hide experience level toggle */}
        <div className="flex items-center gap-2 mb-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!hideExperienceLevel}
              onChange={(e) =>
                handleUpdate(sectionIndex, null, "hideExperienceLevel", !e.target.checked)
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
            <span className="ml-3 text-sm font-medium text-gray-700">Show experience level</span>
          </label>
        </div>
      </div>

      {(section.items || []).map((item, i) => {
        const isEditing   = editingIndex === i;
        const displayName = typeof item === "object" ? (item.name || item.title || "") : item;
        const currentLevel = typeof item === "object" ? (item.level ?? 2) : 2;

        return (
          <div
            key={item.id || i}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => handleDrop?.(e, sectionIndex, i)}
            className={`
              group flex items-center justify-between gap-4 p-2
              border-b border-gray-200
              transition-all duration-300
              ${draggedIndex === i   ? "opacity-20 scale-95" : ""}
              ${deletingIndex === i  ? "-translate-x-6 opacity-0" : ""}
            `}
          >
            {/* Drag handle */}
            <span
              draggable
              onDragStart={(e) => handleDragStart?.(e, i)}
              onDragEnd={() => setDraggedIndex?.(null)}
              className="cursor-grab active:cursor-grabbing"
            >
              <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
            </span>

            {/* Name — inline edit */}
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={displayName}
                  autoFocus
                  onChange={(e) => handleUpdate(sectionIndex, i, "name", e.target.value)}
                  onBlur={() => {
                    setEditingIndex(null);
                    if (!displayName?.trim()) handleDelete(i);
                  }}
                  onKeyDown={(e) => { if (e.key === "Enter") setEditingIndex(null); }}
                  className="w-full text-sm font-medium border-b border-[#800080] outline-none bg-transparent px-1"
                  placeholder="Enter name..."
                />
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">
                    {displayName || "Click to edit"}
                  </span>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <FaPen
                      className="text-xs text-gray-400 cursor-pointer hover:text-[#800080]"
                      onClick={() => setEditingIndex(i)}
                    />
                    <FaTrash
                      className="text-xs text-gray-400 cursor-pointer hover:text-red-500"
                      onClick={(e) => { e.stopPropagation(); handleDelete(i); }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Level tabs */}
            {!hideExperienceLevel && (
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-600">{levels[currentLevel]}</span>
                <Tabs
                  selectedIndex={currentLevel}
                  onSelect={(tabIndex) => handleUpdate(sectionIndex, i, "level", tabIndex)}
                >
                  <TabList className="flex gap-1">
                    {levels.map((lvl, idx) => (
                      <Tab key={idx} className="outline-none">
                        <div
                          className={`
                            w-6 h-6 flex items-center justify-center rounded-full
                            cursor-pointer transition-all duration-300 text-sm font-bold
                            ${currentLevel === idx
                              ? "scale-110 border border-[#800080] shadow-md"
                              : "opacity-60 hover:opacity-100"}
                          `}
                          style={{ backgroundColor: tabColors[idx], color: textColor[idx] }}
                          title={lvl}
                        >
                          {idx + 1}
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

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 text-sm !text-[#800080] font-medium mt-4 hover:underline"
      >
        <FaPlus size={12} /> Add one more item
      </button>
    </>
  );
};

export default LinkedInSimpleCustomSection;