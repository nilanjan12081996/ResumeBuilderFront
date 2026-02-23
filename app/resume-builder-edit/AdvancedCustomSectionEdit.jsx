'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import Datepicker from "../ui/Datepicker";
import TipTapEditor from "../editor/TipTapEditor";

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

const AdvancedCustomSectionEdit = ({ 
  sectionId,
  register, 
  watch, 
  control, 
  setValue,
  fields, 
  append, 
  remove, 
  move,
  noHeader 
}) => {
  const [deletingId, setDeletingId] = useState(null);

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

  const addMore = () => {
    append({
      title: "",
      city: "",
      startDate: "",
      endDate: "",
      description: "",
      isOngoing: false
    });
  };

  const deleteItem = (index, id) => {
    setDeletingId(id);
    setTimeout(() => {
      remove(index);
      setDeletingId(null);
    }, 400);
  };

  return (
    <>
      <div className=''>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {fields.map((item, index) => {
                const watchedTitle = watch(`${historyFieldName}.${index}.title`);
                const watchedCity = watch(`${historyFieldName}.${index}.city`);
                const isOngoing = watch(`${historyFieldName}.${index}.isOngoing`);

                return (
                  <DraggableWrapper key={item.id} id={item.id}>
                    <div
                      className={`transition-all duration-500 mb-3
                        ${deletingId === item.id ? "-translate-x-6 opacity-0" : ""}
                      `}
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-5">
                          <DragIcon />
                        </span>

                        <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg overflow-hidden bg-white">
                          <AccordionPanel>
                            <AccordionTitle className="font-semibold text-sm">
                              {watchedTitle || watchedCity
                                ? `${watchedTitle || ''}${watchedCity ? ', ' + watchedCity : ''}`
                                : "(Not specified)"}
                            </AccordionTitle>

                            <AccordionContent>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="col-span-2">
                                  <label className="block text-xs font-semibold text-gray-500">Title</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Project Lead, Award Name, etc."
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                    {...register(`${historyFieldName}.${index}.title`)}
                                  />
                                </div>

                                <div className="col-span-2">
                                  <label className="block text-xs font-semibold text-gray-500">Start & End Date</label>
                                  <div className="flex gap-2 mt-1">
                                    <div className="flex-1">
                                      <Controller
                                        control={control}
                                        name={`${historyFieldName}.${index}.startDate`}
                                        render={({ field }) => (
                                          <Datepicker selectedDate={field.value} onChange={field.onChange} />
                                        )}
                                      />
                                    </div>
                                    <div className="flex-1 relative">
                                      <Controller
                                        control={control}
                                        name={`${historyFieldName}.${index}.endDate`}
                                        render={({ field }) => (
                                          <>
                                            <Datepicker
                                              selectedDate={field.value}
                                              onChange={field.onChange}
                                              disabled={isOngoing}
                                            />
                                            {isOngoing && (
                                              <div className="absolute inset-0 flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-gray-300 rounded-md pointer-events-none">
                                                Present
                                              </div>
                                            )}
                                          </>
                                        )}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 mt-2">
                                    <input
                                      type="checkbox"
                                      id={`ongoing-custom-${item.id}`}
                                      checked={isOngoing || false}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setValue(`${historyFieldName}.${index}.isOngoing`, isChecked);
                                        setValue(`${historyFieldName}.${index}.endDate`, isChecked ? 'PRESENT' : '');
                                      }}
                                      className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                                    />
                                    <label htmlFor={`ongoing-custom-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                                      Ongoing (Present)
                                    </label>
                                  </div>
                                </div>

                                <div className="col-span-2">
                                  <label className="block text-xs font-semibold text-gray-500">City</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. New York"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                    {...register(`${historyFieldName}.${index}.city`)}
                                  />
                                </div>

                                <div className="col-span-2">
                                  <label className="block text-xs font-semibold text-gray-500">Description</label>
                                  <Controller
                                    control={control}
                                    name={`${historyFieldName}.${index}.description`}
                                    defaultValue=""
                                    render={({ field }) => (
                                      <TipTapEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Describe details..."
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionPanel>
                        </Accordion>

                        <FaTrash
                          className="mt-6 text-gray-400 cursor-pointer hover:text-red-500 transition-colors flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(index, item.id);
                          }}
                        />
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
          onClick={addMore}
          className="text-sm !text-[#800080] font-medium mt-4 hover:underline"
        >
          + Add one more item
        </button>
      </div>
    </>
  );
};

export default AdvancedCustomSectionEdit;