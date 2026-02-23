'use client';
import { useState } from "react";
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { Controller, useFormContext } from "react-hook-form";
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

const Activities = ({ register, watch, control, fields, append, remove, move }) => {
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
      <div className="mb-4">
        <h2 className="text-xl font-bold text-black pb-1">Extra-curricular Activities</h2>
        <p className="text-sm text-[#808897] font-medium">
          Show your relevant experience (last 10 years). Use bullet points to note your achievements.
        </p>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {fields.map((item, index) => {
              const functionTitle = watch(`activityHistory.${index}.functionTitle`);
              const employer = watch(`activityHistory.${index}.employer`);
              const isCurrentlyActive = watch(`activityHistory.${index}.isCurrentlyActive`);

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
                            {functionTitle?.trim()
                              ? `${functionTitle}${employer ? " at " + employer : ""}`
                              : "(Not specified)"}
                          </AccordionTitle>

                          <AccordionContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase">Function Title</label>
                                <input
                                  {...register(`activityHistory.${index}.functionTitle`)}
                                  className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                  placeholder="e.g. Volunteer Coordinator"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase">Employer / Organization</label>
                                <input
                                  {...register(`activityHistory.${index}.employer`)}
                                  className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                  placeholder="e.g. Red Cross"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase">Start & End Date</label>
                                <div className="flex gap-2 mt-1">
                                  <div className="flex-1">
                                    <Controller
                                      control={control}
                                      name={`activityHistory.${index}.startDate`}
                                      render={({ field }) => (
                                        <Datepicker selectedDate={field.value} onChange={field.onChange} />
                                      )}
                                    />
                                  </div>

                                  <div className="flex-1 relative">
                                    <Controller
                                      control={control}
                                      name={`activityHistory.${index}.endDate`}
                                      render={({ field }) => (
                                        <>
                                          <Datepicker
                                            selectedDate={isCurrentlyActive ? null : field.value}
                                            onChange={field.onChange}
                                            disabled={isCurrentlyActive}
                                          />
                                          {isCurrentlyActive && (
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
                                    id={`currently-active-${item.id}`}
                                    checked={!!isCurrentlyActive}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setValue(`activityHistory.${index}.isCurrentlyActive`, checked);
                                      setValue(`activityHistory.${index}.endDate`, checked ? "Present" : "");
                                    }}
                                    className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                                  />
                                  <label
                                    htmlFor={`currently-active-${item.id}`}
                                    className="text-sm text-gray-700 cursor-pointer"
                                  >
                                    I currently participate here
                                  </label>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-gray-500 uppercase">City</label>
                                <input
                                  {...register(`activityHistory.${index}.city`)}
                                  className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                  placeholder="e.g. Dhaka, Bangladesh"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label className="block text-xs font-semibold text-gray-500 uppercase">Description</label>
                                <Controller
                                  control={control}
                                  name={`activityHistory.${index}.description`}
                                  render={({ field }) => (
                                    <TipTapEditor value={field.value} onChange={field.onChange} />
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

      <button
        type="button"
        onClick={() => append({})}
        className="text-sm !text-[#800080] font-medium mt-4 hover:underline inline-block"
      >
        + Add one more activity
      </button>
    </>
  );
};

export default Activities;