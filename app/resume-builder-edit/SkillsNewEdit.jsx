'use client';
import React, { useState } from 'react';
import { Tabs, TabList, Tab } from "react-tabs";
import { FaPen, FaTrash } from "react-icons/fa";
import 'react-tabs/style/react-tabs.css';

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

const SkillsNewEdit = ({
  register,
  watch,
  setValue,
  fields,
  append,
  remove,
  move,
  noHeader,
}) => {
  const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
  const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
  const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const hideExperienceLevel = watch("hideExperienceLevel");

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
    }, 300);
  };

  return (
    <>
      {!noHeader && (
        <h2 className="text-xl font-bold text-black">Skills</h2>
      )}
      <p className="text-sm text-[#808897] font-medium mb-2">
        Choose 5 important skills that show you fit the position.
      </p>

      <div className="flex items-center gap-2 my-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={!hideExperienceLevel}
            onChange={(e) => setValue("hideExperienceLevel", !e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#800080] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800080]"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            Show experience level
          </span>
        </label>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div>
            {fields.map((item, index) => {
              const skillName = watch(`newSkillHistory.${index}.skill`);
              const skillLevel = watch(`newSkillHistory.${index}.level`) ?? 2;
              const isEditing = editingIndex === index;

              return (
                <DraggableWrapper key={item.id} id={item.id}>
                  <div
                    className={`
                      group flex items-center justify-between gap-4 mb-2 p-2
                      !border-b !border-gray-300 transition-all
                      ${deletingId === item.id ? "-translate-x-10 opacity-0" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="cursor-grab active:cursor-grabbing">
                        <DragIcon />
                      </span>

                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            autoFocus
                            {...register(`newSkillHistory.${index}.skill`)}
                            onBlur={() => setEditingIndex(null)}
                            className="w-full text-sm font-medium bg-transparent border-b border-purple-600 outline-none"
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {skillName || "Your Skill"}
                            </span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                              <FaPen
                                onClick={() => setEditingIndex(index)}
                                className="text-sm text-gray-400 hover:text-purple-600 cursor-pointer"
                              />
                              <FaTrash
                                onClick={() => handleDelete(index, item.id)}
                                className="text-sm text-gray-400 hover:text-red-500 cursor-pointer"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {!hideExperienceLevel && (
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-medium text-gray-600">
                          {levels[skillLevel]}
                        </span>
                        <Tabs
                          selectedIndex={skillLevel}
                          onSelect={(tabIndex) =>
                            setValue(`newSkillHistory.${index}.level`, tabIndex)
                          }
                        >
                          <TabList className="flex gap-1">
                            {levels.map((_, i) => (
                              <Tab key={i} className="outline-none !p-0 !border-none">
                                <div
                                  className={`
                                    w-6 h-6 rounded-full flex items-center justify-center
                                    cursor-pointer transition-all
                                    ${skillLevel === i ? "scale-110 ring-1 ring-[#800080] shadow" : "opacity-40 hover:opacity-100"}
                                  `}
                                  style={{ backgroundColor: tabColors[i], color: textColor[i] }}
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
        onClick={() => append({ skill: "", level: 2 })}
        className="text-sm !text-[#800080] font-bold py-4 hover:underline"
      >
        + Add one more Skill
      </button>
    </>
  );
};

export default SkillsNewEdit;