'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { Controller, useFormContext } from "react-hook-form";
import Datepicker from "../ui/Datepicker";

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

const AdvancedCustomSection = ({
  sectionId,
  register,
  watch,
  control,
  setValue,
  fields,
  append,
  remove,
  move,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  // Field names based on sectionId
  const historyFieldName = `customAdvancedHistory_${sectionId}`;

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
    }, 200);
  };

  const handleAdd = () => {
    append({
      title: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
      isOngoing: false,
    });
  };

  return (
    <>
      <div className="acco_section">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {fields.map((item, index) => {
                const watchedTitle = watch(`${historyFieldName}.${index}.title`);
                const watchedCity = watch(`${historyFieldName}.${index}.city`);
                const isOngoing = watch(`${historyFieldName}.${index}.isOngoing`);

                return (
                  <DraggableWrapper key={item.id} id={item.id}>
                    <div
                      className={`transition-all duration-200 mb-3
                        ${deletingId === item.id ? "-translate-x-6 opacity-0" : "opacity-100"}
                      `}
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-5">
                          <DragIcon />
                        </span>

                        <div className="flex-1">
                          <div className="flex items-start gap-2 w-full">
                            <Accordion
                              collapseAll
                              className="!border w-full !border-gray-300 rounded-lg !overflow-hidden bg-white shadow-sm"
                            >
                              <AccordionPanel>
                                <AccordionTitle className="p-4 font-semibold text-sm">
                                  {watchedTitle || watchedCity
                                    ? `${watchedTitle || ""}${watchedCity ? ", " + watchedCity : ""}`
                                    : "(Not specified)"}
                                </AccordionTitle>

                                <AccordionContent className="pt-0">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Title */}
                                    <div className="md:col-span-2">
                                      <label className="block text-xs font-semibold text-gray-500 uppercase">
                                        Title
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="e.g. Project Lead, Award Name, etc."
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                        {...register(`${historyFieldName}.${index}.title`)}
                                      />
                                    </div>

                                    {/* Start & End Date */}
                                    <div className="md:col-span-2">
                                      <label className="block text-xs font-semibold text-gray-500 uppercase">
                                        Start & End Date
                                      </label>
                                      <div className="flex gap-2 mt-1">
                                        <div className="flex-1">
                                          <Controller
                                            control={control}
                                            name={`${historyFieldName}.${index}.startDate`}
                                            render={({ field }) => (
                                              <Datepicker
                                                selectedDate={field.value}
                                                onChange={field.onChange}
                                              />
                                            )}
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <Controller
                                            control={control}
                                            name={`${historyFieldName}.${index}.endDate`}
                                            render={({ field }) => (
                                              <Datepicker
                                                selectedDate={field.value}
                                                onChange={field.onChange}
                                                disabled={isOngoing}
                                              />
                                            )}
                                          />
                                        </div>
                                      </div>

                                      {/* Ongoing Checkbox */}
                                      <div className="flex items-center gap-2 mt-2">
                                        <input
                                          type="checkbox"
                                          id={`ongoing-advanced-${item.id}`}
                                          checked={isOngoing || false}
                                          onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setValue(`${historyFieldName}.${index}.isOngoing`, isChecked);
                                            setValue(
                                              `${historyFieldName}.${index}.endDate`,
                                              isChecked ? "PRESENT" : ""
                                            );
                                          }}
                                          className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                                        />
                                        <label
                                          htmlFor={`ongoing-advanced-${item.id}`}
                                          className="text-sm text-gray-700 cursor-pointer"
                                        >
                                          Ongoing (Present)
                                        </label>
                                      </div>
                                    </div>

                                    {/* City */}
                                    <div className="md:col-span-2">
                                      <label className="block text-xs font-semibold text-gray-500 uppercase">
                                        City
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="e.g. New York"
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                        {...register(`${historyFieldName}.${index}.city`)}
                                      />
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2">
                                      <label className="block text-xs font-semibold text-gray-500 uppercase">
                                        Description
                                      </label>
                                      <textarea
                                        rows="4"
                                        placeholder="Describe details..."
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                        {...register(`${historyFieldName}.${index}.description`)}
                                      />
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionPanel>
                            </Accordion>

                            {/* DELETE BUTTON */}
                            <div className="mt-4">
                              <FaTrash
                                className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                                title="Delete this item"
                                onClick={() => handleDelete(index, item.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DraggableWrapper>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>

        <button
          type="button"
          onClick={handleAdd}
          className="text-sm !text-[#800080] font-medium mt-4 hover:underline inline-block"
        >
          + Add one more item
        </button>
      </div>
    </>
  );
};

export default AdvancedCustomSection;