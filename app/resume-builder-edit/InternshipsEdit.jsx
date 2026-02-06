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

const InternshipsEdit = ({
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
          <h2 className="text-xl font-bold text-black pb-1">Internships</h2>
        )}
        <p className="text-sm text-[#808897] font-medium">
          Show your relevant experience (last 10 years). Use bullet points to note your achievements.
        </p>
      </div>

      <div className="space-y-3">
        {fields.map((item, index) => {
          const jobTitle = watch(`internshipHistory.${index}.jobTitle`);
          const employer = watch(`internshipHistory.${index}.employer`);
          const isCurrentlyInterning = watch(`internshipHistory.${index}.isCurrentlyInterning`);

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

                <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg overflow-hidden bg-white">
                  <AccordionPanel>
                    <AccordionTitle className="font-semibold text-sm">
                      {jobTitle?.trim()
                        ? `${jobTitle}${employer ? " at " + employer : ""}`
                        : "(Not specified)"}
                    </AccordionTitle>

                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label className="!text-sm !text-gray-500 font-semibold">Job Title</Label>
                          <input
                            {...register(`internshipHistory.${index}.jobTitle`)}
                            className="w-full rounded-md border p-2 text-sm mt-1"
                            placeholder="e.g. Frontend Intern"
                          />
                        </div>

                        <div>
                          <Label className="!text-sm !text-gray-500 font-semibold">Employer</Label>
                          <input
                            {...register(`internshipHistory.${index}.employer`)}
                            className="w-full rounded-md border p-2 text-sm mt-1"
                            placeholder="e.g. Google"
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
                                name={`internshipHistory.${index}.startDate`}
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
                                name={`internshipHistory.${index}.endDate`}
                                render={({ field }) => (
                                  <>
                                    <Datepicker
                                      selectedDate={isCurrentlyInterning ? null : field.value}
                                      onChange={field.onChange}
                                      disabled={isCurrentlyInterning}
                                    />
                                    {isCurrentlyInterning && (
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
                              id={`currently-interning-${index}`}
                              checked={!!isCurrentlyInterning}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setValue(`internshipHistory.${index}.isCurrentlyInterning`, checked);
                                if (checked) {
                                  setValue(`internshipHistory.${index}.endDate`, "Present");
                                } else {
                                  setValue(`internshipHistory.${index}.endDate`, "");
                                }
                              }}
                              className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                            />
                            <label
                              htmlFor={`currently-interning-${index}`}
                              className="text-sm text-gray-700 cursor-pointer"
                            >
                              I currently intern here
                            </label>
                          </div>
                        </div>

                        <div>
                          <Label className="!text-sm !text-gray-500 font-semibold">City, State</Label>
                          <input
                            {...register(`internshipHistory.${index}.city`)}
                            className="w-full rounded-md border p-2 text-sm mt-1"
                            placeholder="e.g. San Francisco, CA"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label className="!text-sm !text-gray-500 font-semibold">Description</Label>
                          <Controller
                            control={control}
                            name={`internshipHistory.${index}.description`}
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
        + Add one more internship
      </button>
    </>
  );
};

export default InternshipsEdit;