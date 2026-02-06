'use client';
import { useState } from "react";
import {
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
  Label,
} from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import { Controller } from "react-hook-form";
import Datepicker from "../ui/Datepicker";
import TipTapEditor from "../editor/TipTapEditor";

const ActivitiesEdit = ({
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
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    move(draggedIndex, targetIndex);
    setDraggedIndex(null);
  };

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      remove(index);
      setDeletingIndex(null);
    }, 400);
  };

  return (
    <>
      <div className="mb-4">
        {!noHeader && (
          <h2 className="text-xl font-bold text-black pb-1">Activities</h2>
        )}
        <p className="text-sm text-[#808897] font-medium">
          Show your relevant experience (last 10 years). Use bullet points to note your achievements.
        </p>
      </div>

      <div className="space-y-3">
        {fields.map((item, index) => {
          const functionTitle = watch(`activityHistory.${index}.functionTitle`);
          const employer = watch(`activityHistory.${index}.employer`);
          const isCurrentlyActive = watch(`activityHistory.${index}.isCurrentlyActive`);

          return (
            <div
              key={item.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, index)}
              className={`transition-all duration-500 mb-3 ${
                deletingIndex === index ? "-translate-x-6 opacity-0" : ""
              }`}
            >
              <div className="flex items-start gap-2">
                {/* Drag Handle */}
                <span
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  className="mt-5 cursor-grab active:cursor-grabbing"
                >
                  <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                </span>

                {/* Accordion */}
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
                          <Label className="!text-sm !text-gray-500 font-semibold">Function Title</Label>
                          <input
                            {...register(`activityHistory.${index}.functionTitle`)}
                            className="w-full rounded-md border p-2 text-sm mt-1"
                            placeholder="e.g. Volunteer"
                          />
                        </div>

                        <div>
                          <Label className="!text-sm !text-gray-500 font-semibold">Employer</Label>
                          <input
                            {...register(`activityHistory.${index}.employer`)}
                            className="w-full rounded-md border p-2 text-sm mt-1"
                            placeholder="e.g. Red Cross"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label className="!text-sm !text-gray-500 font-semibold">
                            Start & End Date
                          </Label>
                          <div className="flex gap-2 mt-1">
                            <div className="flex-1">
                              <Controller
                                control={control}
                                name={`activityHistory.${index}.startDate`}
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
                              id={`currently-active-${index}`}
                              checked={!!isCurrentlyActive}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setValue(`activityHistory.${index}.isCurrentlyActive`, checked);
                                if (checked) {
                                  setValue(`activityHistory.${index}.endDate`, "Present");
                                } else {
                                  setValue(`activityHistory.${index}.endDate`, "");
                                }
                              }}
                              className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                            />
                            <label
                              htmlFor={`currently-active-${index}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              I currently participate here
                            </label>
                          </div>
                        </div>

                        <div>
                          <Label className="!text-sm !text-gray-500 font-semibold">City</Label>
                          <input
                            {...register(`activityHistory.${index}.city`)}
                            className="w-full rounded-md border p-2 text-sm mt-1"
                            placeholder="e.g. London"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label className="!text-sm !text-gray-500 font-semibold">Description</Label>
                          <Controller
                            control={control}
                            name={`activityHistory.${index}.description`}
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

                {/* Delete Button (Accordion এর পাশে) */}
                <FaTrash
                  onClick={() => handleDelete(index)}
                  className="mt-6 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => append({})}
        className="text-sm !text-[#800080] font-medium mt-4 hover:underline"
      >
        + Add one more activity
      </button>
    </>
  );
};

export default ActivitiesEdit;