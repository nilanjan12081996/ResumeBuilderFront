'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaTrash } from 'react-icons/fa';
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

const Courses = ({ register, watch, control, fields, append, remove, move }) => {
  const [deletingId, setDeletingId] = useState(null);
  const { setValue } = useFormContext();

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
    }, 400);
  };

  return (
    <>
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-black pb-1'>Courses</h2>
        <p className='text-sm text-[#808897] font-medium'>
          Add relevant courses or certifications you have completed.
        </p>
      </div>

      <div className='acco_section'>
        {fields.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {fields.map((item, index) => {
                  const course = watch(`coursesHistory.${index}.course`);
                  const institution = watch(`coursesHistory.${index}.institution`);
                  const isCurrentlyOngoing = watch(`coursesHistory.${index}.isCurrentlyOngoing`);

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
                                {course?.trim()
                                  ? `${course}${institution ? " at " + institution : ""}`
                                  : "(Not specified)"}
                              </AccordionTitle>

                              <AccordionContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <label className="!text-sm !text-gray-500 font-semibold">Course</label>
                                    <input
                                      {...register(`coursesHistory.${index}.course`)}
                                      className="w-full rounded-md border p-2 text-sm mt-1"
                                      placeholder="e.g. Web Development Boot Camp"
                                    />
                                  </div>

                                  <div>
                                    <label className="!text-sm !text-gray-500 font-semibold">Institution</label>
                                    <input
                                      {...register(`coursesHistory.${index}.institution`)}
                                      className="w-full rounded-md border p-2 text-sm mt-1"
                                      placeholder="e.g. Udemy"
                                    />
                                  </div>

                                  <div className="md:col-span-2">
                                    <label className="!text-sm !text-gray-500 font-semibold">
                                      Start & End Date
                                    </label>
                                    <div className="flex gap-2 mt-1">
                                      <div className="flex-1">
                                        <Controller
                                          control={control}
                                          name={`coursesHistory.${index}.startDate`}
                                          render={({ field }) => (
                                            <Datepicker
                                              selectedDate={field.value}
                                              onChange={field.onChange}
                                            />
                                          )}
                                        />
                                      </div>

                                      <div className="flex-1 relative">
                                        <Controller
                                          control={control}
                                          name={`coursesHistory.${index}.endDate`}
                                          render={({ field }) => (
                                            <>
                                              <Datepicker
                                                selectedDate={isCurrentlyOngoing ? null : field.value}
                                                onChange={field.onChange}
                                                disabled={isCurrentlyOngoing}
                                              />
                                              {isCurrentlyOngoing && (
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
                                        id={`currently-ongoing-${item.id}`}
                                        checked={!!isCurrentlyOngoing}
                                        onChange={(e) => {
                                          const checked = e.target.checked;
                                          setValue(`coursesHistory.${index}.isCurrentlyOngoing`, checked);
                                          if (checked) {
                                            setValue(`coursesHistory.${index}.endDate`, "Present");
                                          } else {
                                            setValue(`coursesHistory.${index}.endDate`, "");
                                          }
                                        }}
                                        className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                                      />
                                      <label
                                        htmlFor={`currently-ongoing-${item.id}`}
                                        className="text-sm text-gray-700 cursor-pointer"
                                      >
                                        Ongoing (Present)
                                      </label>
                                    </div>
                                  </div>

                                  <div className="md:col-span-2">
                                    <label className="!text-sm !text-gray-500 font-semibold">Description</label>
                                    <Controller
                                      control={control}
                                      name={`coursesHistory.${index}.description`}
                                      render={({ field }) => (
                                        <TipTapEditor
                                          value={field.value}
                                          onChange={field.onChange}
                                        />
                                      )}
                                    />
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionPanel>
                          </Accordion>

                          <FaTrash
                            onClick={() => handleDelete(index, item.id)}
                            className="mt-6 text-gray-400 hover:text-red-500 cursor-pointer transition-colors flex-shrink-0"
                          />
                        </div>
                      </div>
                    </DraggableWrapper>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}

        <button
          type="button"
          onClick={() => append({})}
          className="text-sm !text-[#800080] font-medium mt-4 hover:underline inline-block"
        >
          + Add one more course
        </button>
      </div>
    </>
  );
};

export default Courses;