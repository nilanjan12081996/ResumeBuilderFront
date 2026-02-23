'use client';
import React, { useState } from "react";
import { Tab, Tabs, TabList } from "react-tabs";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import 'react-tabs/style/react-tabs.css';
import { useFormContext } from "react-hook-form";

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

const Languages = ({ register, watch, fields, append, remove, move }) => {
  const levels = ["Basic", "Conversational", "Intermediate", "Advanced", "Fluent", "Native"];
  const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff", "#e0e7ff"];
  const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb", "#818cf8"];

  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { setValue } = useFormContext();

  const hideProficiency = watch('hideLanguageProficiency') ?? true;

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

  const handleDelete = (index, id) => {
    setDeletingId(id);
    setTimeout(() => {
      remove(index);
      setDeletingId(null);
    }, 500);
  };

  const getLevelIndex = (levelName) => {
    const index = levels.indexOf(levelName);
    return index !== -1 ? index : 2;
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-black pb-1">Languages</h2>
        <p className="text-sm font-medium text-[#808897]">
          Choose languages you speak and indicate your proficiency level.
        </p>

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

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-1">
            {fields.map((item, index) => {
              const isEditing = editingIndex === index;
              const watchedLanguage = watch(`languageHistory.${index}.language`);
              const watchedLevelName = watch(`languageHistory.${index}.level`) || "Intermediate";
              const watchedLevelIndex = getLevelIndex(watchedLevelName);

              return (
                <DraggableWrapper key={item.id} id={item.id}>
                  <div
                    className={`
                      group flex items-center justify-between gap-4 p-2 border-b border-gray-200
                      transition-all duration-300 ease-in-out
                      ${deletingId === item.id ? "-translate-x-6 opacity-0" : ""}
                    `}
                  >
                    <span className="cursor-grab active:cursor-grabbing">
                      <DragIcon />
                    </span>

                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          {...register(`languageHistory.${index}.language`)}
                          autoFocus
                          onBlur={() => {
                            setEditingIndex(null);
                            if (!watchedLanguage?.trim()) handleDelete(index, item.id);
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
                              onClick={() => handleDelete(index, item.id)}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {!hideProficiency && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-[12px] font-bold text-gray-500 tracking-tight">
                          {watchedLevelName}
                        </span>
                        <Tabs
                          selectedIndex={watchedLevelIndex}
                          onSelect={(tabIndex) => {
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
                </DraggableWrapper>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>

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

export default Languages;