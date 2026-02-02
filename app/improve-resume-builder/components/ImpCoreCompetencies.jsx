import React, { useState } from "react";
import { TbDragDrop } from "react-icons/tb";
import { FaPen, FaTrash } from "react-icons/fa";
import { Tabs, Tab, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ImpCoreCompetencies = ({
  section,
  sectionIndex,
  handleUpdate,
  handleDragStart,
  handleDrop,
  draggedIndex,
  setDraggedIndex
}) => {
  const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
  const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
  const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const hideExperienceLevel = section.hideExperienceLevel || false;

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      handleUpdate(sectionIndex, index, "delete");
      setDeletingIndex(null);
    }, 400);
  };

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500">
        Highlight your strongest competencies relevant to the role.
      </p>


      <div className="flex items-center gap-2 my-1">
        <input
          type="checkbox"
          className="!w-4 !h-4 text-[#800080]"
          checked={hideExperienceLevel}
          onChange={(e) =>
            handleUpdate(sectionIndex, null, "hideExperienceLevel", e.target.checked)
          }
        />
        <label className="text-sm text-gray-500 cursor-pointer">
          Don't show experience level
        </label>
      </div>

      {section.items.map((item, i) => {
        const isEditing = editingIndex === i;

        return (
          <div
            key={i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop?.(e, sectionIndex, i)}
            className={`
              group
              flex items-center justify-between gap-4 p-2 !border-b !border-gray-300
              transition-all duration-300
              ${draggedIndex === i ? "opacity-20 scale-95" : ""}
              ${deletingIndex === i ? "-translate-x-6 opacity-0 bg-red-400" : "bg-white"}
            `}
          >
            {/* Drag */}
            <span
              draggable
              onDragStart={(e) => handleDragStart?.(e, i)}
              onDragEnd={() => setDraggedIndex?.(null)}
              className="cursor-grab"
            >
              <TbDragDrop className="text-xl text-[#656e83]" />
            </span>

            {/* Name */}
            <div className="flex-1">
              {isEditing ? (
                <input
                  value={item.name}
                  autoFocus
                  onChange={(e) =>
                    handleUpdate(sectionIndex, i, "name", e.target.value)
                  }
                  onBlur={() => {
                    setEditingIndex(null);
                    if (!item.name.trim()) handleDelete(i);
                  }}
                  className="w-full text-sm border-b outline-none bg-transparent"
                />

              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {item.name || "Your Competency"}
                  </span>

                  <div className="flex items-center gap-2
                    opacity-0
                    translate-x-2
                    group-hover:opacity-100
                    group-hover:translate-x-0
                    transition-all duration-200">
                    <FaPen
                      className="text-sm text-gray-400 cursor-pointer hover:text-purple-600"
                      onClick={() => setEditingIndex(i)}
                    />

                    <FaTrash
                      className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
                      onClick={() => handleDelete(i)}
                    />
                  </div>

                </div>
              )}
            </div>

            {/* Level */}
            {!hideExperienceLevel && (
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-gray-600">
                  {levels[item.level]}
                </span>

                <Tabs
                  selectedIndex={item.level}
                  onSelect={(tabIndex) =>
                    handleUpdate(sectionIndex, i, "level", tabIndex)
                  }
                >
                  <TabList className="flex gap-1">
                    {levels.map((lvl, idx) => (
                      <Tab key={idx} className="outline-none">
                        <div
                          className={`
                w-6 h-6 flex items-center justify-center rounded-full cursor-pointer
                ${item.level === idx
                              ? "scale-110 border border-[#800080]"
                              : "opacity-60"}
              `}
                          style={{
                            backgroundColor: tabColors[idx],
                            color: textColor[idx],
                          }}
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
    </>
  );
};

export default ImpCoreCompetencies;