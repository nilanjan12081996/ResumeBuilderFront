'use client';
import { useState } from "react";
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
  Label,
} from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import Datepicker from "../ui/Datepicker";
import TipTapEditor from "../editor/TipTapEditor";
import ImpDynamicFields from "../ui/ImpDynamicFields";
import { HiSparkles } from "react-icons/hi";

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

const EducationNewEdit = ({
  register,
  watch,
  control,
  fields,
  append,
  remove,
  move,
  setValue,
  noHeader,
}) => {
  const [deletingId, setDeletingId] = useState(null);

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
      {!noHeader && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Education</h2>
          <p className="text-sm text-gray-500">
            Mention all the Educational details below.
          </p>
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {fields.map((item, index) => {
              const degree = watch(`educationHistory.${index}.degree`);
              const school = watch(`educationHistory.${index}.school`);
              const isCurrentlyStudying = watch(`educationHistory.${index}.isCurrentlyStudying`);

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
                            {degree?.trim()
                              ? `${degree}${school ? " at " + school : ""}`
                              : "(Awaiting Input)"}
                          </AccordionTitle>

                          <AccordionContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <Label className="!text-sm !text-gray-500">School/College</Label>
                                <input
                                  {...register(`educationHistory.${index}.school`)}
                                  className="w-full rounded-md border p-2 text-sm mt-1"
                                  placeholder="e.g. University of Dhaka"
                                />
                              </div>

                              <div>
                                <Label className="!text-sm !text-gray-500">Degree</Label>
                                <input
                                  {...register(`educationHistory.${index}.degree`)}
                                  className="w-full rounded-md border p-2 text-sm mt-1"
                                  placeholder="e.g. Bachelor of Science"
                                />
                              </div>

                              <div className="md:col-span-2">
                                <Label className="!text-sm !text-gray-500">Start & End Date</Label>
                                <div className="flex gap-2 mt-1">
                                  <div className="flex-1">
                                    <Controller
                                      control={control}
                                      name={`educationHistory.${index}.startDate`}
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
                                      name={`educationHistory.${index}.endDate`}
                                      render={({ field }) => (
                                        <>
                                          <Datepicker
                                            selectedDate={isCurrentlyStudying ? null : field.value}
                                            onChange={field.onChange}
                                            disabled={isCurrentlyStudying}
                                          />
                                          {isCurrentlyStudying && (
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
                                    id={`currently-studying-${item.id}`}
                                    checked={!!isCurrentlyStudying}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      setValue(`educationHistory.${index}.isCurrentlyStudying`, checked);
                                      setValue(`educationHistory.${index}.endDate`, checked ? "Present" : "");
                                    }}
                                    className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                                  />
                                  <label
                                    htmlFor={`currently-studying-${item.id}`}
                                    className="text-sm text-gray-700 cursor-pointer"
                                  >
                                    I currently study here
                                  </label>
                                </div>
                              </div>

                              <div className="md:col-span-2">
                                <Label className="!text-sm !text-gray-500">City</Label>
                                <input
                                  {...register(`educationHistory.${index}.city_state`)}
                                  className="w-full rounded-md border p-2 text-sm mt-1"
                                  placeholder="e.g. Dhaka"
                                />
                              </div>

                              {/* Dynamic Fields (Core + Custom) */}
                              <div className="md:col-span-2">
                                <ImpDynamicFields
                                  coreFields={[{
                                    id: 'description',
                                    name: 'Description',
                                    value: watch(`educationHistory.${index}.description`) || "",
                                    type: 'long_text',
                                    footer: (
                                      <div className="flex justify-end mt-2">
                                        <div className="relative group">
                                          <button
                                            type="button"
                                            disabled
                                            className="flex items-center gap-2 px-4 py-1.5 rounded-[25px] text-sm !bg-gray-100 !text-gray-400 cursor-not-allowed opacity-80 border"
                                            style={{ borderBottom: "1px solid #e5e7eb" }}
                                          >
                                            <HiSparkles className="text-md" />
                                            Improve with AI
                                          </button>
                                          <div className="absolute bottom-full right-0 mb-2 w-56 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 text-center shadow-lg">
                                            Improve with AI is not available on the free plan.{" "}
                                            <span className="text-purple-300 font-semibold">Upgrade your plan</span>{" "}
                                            to use this feature.
                                            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  }]}
                                  customFields={watch(`educationHistory.${index}.customFields`) || []}
                                  onChange={(newFields) => setValue(`educationHistory.${index}.customFields`, newFields)}
                                  onCoreFieldChange={(id, value) => {
                                    if (id === 'description') {
                                      setValue(`educationHistory.${index}.description`, value);
                                    }
                                  }}
                                  onOrderChange={(newOrder) => setValue(`educationHistory.${index}.fieldOrder`, newOrder)}
                                  fieldOrder={watch(`educationHistory.${index}.fieldOrder`) || []}
                                  suggestions={["Board", "CGPA", "Major", "Minor"]}
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
        className="text-sm !text-[#800080] font-medium mt-4 hover:underline"
      >
        + Add one more education
      </button>
    </>
  );
};

export default EducationNewEdit;