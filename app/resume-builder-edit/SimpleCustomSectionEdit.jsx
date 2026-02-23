'use client';
import React, { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { Tabs, Tab, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableWrapper from "./DraggableWrapper";
import DragIcon from "./DragIcon";

const SimpleCustomSectionEdit = ({ 
  sectionId,
  register, 
  watch, 
  setValue,
  control,
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
  const [deletingId, setDeletingId] = useState(null);

  const historyFieldName = `customSimpleHistory_${sectionId}`;
  const titleFieldName = `customSimpleTitle_${sectionId}`;
  const hideExperienceLevelFieldName = `customSimpleHideLevel_${sectionId}`;

  const hideExperienceLevel = watch(hideExperienceLevelFieldName) ?? true;
  const sectionTitle = watch(titleFieldName) || "Custom Section";

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      move(oldIndex, newIndex);
    }
  };

  const getHelperText = () => {
    const title = sectionTitle?.toLowerCase() || "";
    if (title.includes("competenc")) return "Highlight your strongest competencies relevant to the role.";
    else if (title.includes("technolog") || title.includes("tech")) return "List the technologies you're proficient in.";
    else if (title.includes("tool")) return "Add tools and software you can work with.";
    else if (title.includes("framework")) return "Include frameworks you have experience with.";
    else if (title.includes("language")) return "List programming or spoken languages you know.";
    return "Add items for this section.";
  };

  const handleDelete = (index, id) => {
    setDeletingId(id);
    setTimeout(() => {
      remove(index);
      setDeletingId(null);
    }, 500);
  };

  const addItem = () => {
    append({ name: "", level: 2 });
  };

  const updateField = (index, field, value) => {
    setValue(`${historyFieldName}.${index}.${field}`, value);
  };

  return (
    <>
      <div>
        <p className="!text-sm !font-medium !text-gray-500">
          {getHelperText()}
        </p>

        {/* Toggle Button */}
        <div className="flex items-center gap-2 my-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!hideExperienceLevel}
              onChange={(e) => setValue(hideExperienceLevelFieldName, !e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#800080] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800080]"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              Show experience level
            </span>
          </label>
        </div>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {fields.map((item, i) => {
            const isEditing = editingIndex === i;
            const displayName = watch(`${historyFieldName}.${i}.name`) || "";
            const currentLevel = watch(`${historyFieldName}.${i}.level`) ?? 2;

            return (
              <DraggableWrapper key={item.id} id={item.id}>
                <div
                  className={`
                    group flex items-center justify-between gap-4 p-2 !border-b !border-gray-300
                    transition-all duration-300 ease-in-out
                    ${deletingId === item.id ? "-translate-x-6 opacity-0 bg-red-50" : "bg-white"}
                  `}
                >
                  <span className="cursor-grab active:cursor-grabbing">
                    <DragIcon />
                  </span>

                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayName}
                        autoFocus
                        onChange={(e) => updateField(i, "name", e.target.value)}
                        onBlur={() => {
                          setEditingIndex(null);
                          if (!displayName?.trim()) handleDelete(i, item.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setEditingIndex(null);
                        }}
                        className="w-full text-sm font-medium border-b outline-none bg-transparent px-1"
                        placeholder="Enter name..."
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{displayName || "Click to edit"}</span>
                        <div className="flex items-center gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                          <FaPen
                            className="text-sm text-gray-400 cursor-pointer hover:text-purple-600"
                            onClick={() => setEditingIndex(i)}
                          />
                          <FaTrash
                            className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(i, item.id);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {!hideExperienceLevel && (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-gray-600">
                        {levels[currentLevel]}
                      </span>
                      <Tabs
                        selectedIndex={currentLevel}
                        onSelect={(tabIndex) => updateField(i, "level", tabIndex)}
                      >
                        <TabList className="flex gap-1">
                          {levels.map((lvl, idx) => (
                            <Tab key={idx} className="outline-none">
                              <div
                                className={`
                                  w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300
                                  ${currentLevel === idx ? "scale-110 border border-[#800080] shadow-md" : "opacity-60 hover:opacity-100"}
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
              </DraggableWrapper>
            );
          })}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 !text-sm !text-[#800080] font-medium mt-4 hover:underline transition-all"
      >
        <FaPlus size={12} /> Add one more item
      </button>
    </>
  );
};

export default SimpleCustomSectionEdit;