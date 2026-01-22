import React, { useState } from "react";
import { TbDragDrop } from "react-icons/tb";
import { FaPen } from "react-icons/fa";
import { Tabs, Tab, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ImpCoreCompetencies = ({
  section,
  sectionIndex,
  handleUpdate,        // (optional future)
  handleDragStart,
  handleDrop,
  draggedIndex,
  setDraggedIndex
}) => {
  const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
  const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
  const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

  const [editingIndex, setEditingIndex] = useState(null);

  // 🔥 convert string → object locally
  const competencies = section.items.map((item, i) => ({
    id: i,
    name: item,
    level: 3 // default = Experienced
  }));

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Highlight your strongest competencies relevant to the role.
      </p>

      {competencies.map((item, i) => {
        const isEditing = editingIndex === i;

        return (
          <div
            key={i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop?.(e, sectionIndex, i)}
            className={`flex items-center justify-between gap-4 !border-b p-2 !border-gray-300
              ${draggedIndex === i ? "opacity-20 scale-95" : ""}
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
                  onBlur={() => setEditingIndex(null)}
                  className="w-full text-sm border-b outline-none bg-transparent"
                />
              ) : (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setEditingIndex(i)}
                >
                  <span className="text-sm font-medium">
                    {item.name || "Your Competency"}
                  </span>
                  <FaPen className="text-xs text-gray-400" />
                </div>
              )}
            </div>

            {/* 🔥 Skill Level (same as Skills) */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs font-medium text-gray-600">
                {levels[item.level]}
              </span>

              <Tabs selectedIndex={item.level}>
                <TabList className="flex gap-1">
                  {levels.map((lvl, idx) => (
                    <Tab key={idx} className="outline-none">
                      <div
                        className={`
                          w-6 h-6 flex items-center justify-center rounded-full
                          cursor-pointer transition-all duration-300
                          ${item.level === idx
                            ? "scale-110 border border-[#800080] shadow-md"
                            : "opacity-60 hover:opacity-100"}
                        `}
                        style={{
                          backgroundColor: tabColors[idx],
                          color: textColor[idx]
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
          </div>
        );
      })}
    </>
  );
};

export default ImpCoreCompetencies;
