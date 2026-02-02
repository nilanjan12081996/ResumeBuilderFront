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
import { FaPlus } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import Datepicker from "../ui/Datepicker";
import TipTapEditor from "../editor/TipTapEditor";

const EmpHistory = ({
  register,
  watch,
  control,
  fields,
  append,
  remove,
  move,
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
      {!noHeader && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Employment History</h2>
          <p className="text-sm text-gray-500">
            Show your relevant experience (last 10 years).
          </p>
        </div>
      )}

      {fields.map((item, index) => {
        const job = watch(`employmentHistory.${index}.job_title`);
        const company = watch(`employmentHistory.${index}.employer`);

        return (
          <div
            key={item.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
            className={`transition-all duration-500 mb-3 ${deletingIndex === index ? "-translate-x-6 opacity-0" : ""
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
              <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg overflow-hidden">
                <AccordionPanel>
                  <AccordionTitle className="font-semibold text-sm">
                    {job?.trim()
                      ? `${job}${company ? " at " + company : ""}`
                      : "(Not specified)"}
                  </AccordionTitle>

                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {/* Job */}
                      <div>
                        <Label className="!text-sm !text-gray-500">Job Title</Label>
                        <input
                          {...register(`employmentHistory.${index}.job_title`)}
                          className="w-full rounded-md border p-2 text-sm"
                        />
                      </div>

                      {/* Employer */}
                      <div>
                        <Label className="!text-sm !text-gray-500">Employer</Label>
                        <input
                          {...register(`employmentHistory.${index}.employer`)}
                          className="w-full rounded-md border p-2 text-sm"
                        />
                      </div>

                      {/* Date */}
                      <div className="md:col-span-2">
                        <Label className="!text-sm !text-gray-500">
                          Start & End Date
                        </Label>
                        <div className="flex gap-2 mt-1">
                          <Controller
                            control={control}
                            name={`employmentHistory.${index}.startDate`}
                            render={({ field }) => (
                              <Datepicker
                                selectedDate={field.value}
                                onChange={field.onChange}
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name={`employmentHistory.${index}.endDate`}
                            render={({ field }) => {
                              const isCurrent = watch(`employmentHistory.${index}.isCurrentlyWorking`);

                              return isCurrent ? (
                                <div className="w-full flex items-center px-3 rounded-md border text-sm text-gray-700">
                                  Present
                                </div>
                              ) : (
                                <Datepicker
                                  selectedDate={field.value || null}
                                  onChange={(date) => field.onChange(date)}
                                />
                              );
                            }}
                          />


                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Controller
                            control={control}
                            name={`employmentHistory.${index}.isCurrentlyWorking`}
                            defaultValue={false}
                            render={({ field }) => (
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  field.onChange(checked);

                                  if (checked) {
                                    control.setValue(
                                      `employmentHistory.${index}.endDate`,
                                      null,
                                      { shouldDirty: true, shouldValidate: true }
                                    );
                                  }
                                }}
                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                              />
                            )}
                          />


                          <label className="text-sm text-gray-700 cursor-pointer">
                            I currently work here
                          </label>
                        </div>

                      </div>

                      {/* City */}
                      <div className="md:col-span-2">
                        <Label className="!text-sm !text-gray-500">City</Label>
                        <input
                          {...register(`employmentHistory.${index}.city_state`)}
                          className="w-full rounded-md border p-2 text-sm"
                        />
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2">
                        <Label className="text-sm text-gray-500">Description</Label>

                        <Controller
                          control={control}
                          name={`employmentHistory.${index}.description`}
                          defaultValue=""
                          render={({ field }) => (
                            <TipTapEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Describe your role, responsibilities, and achievements"
                            />
                          )}
                        />
                      </div>

                    </div>
                  </AccordionContent>
                </AccordionPanel>
              </Accordion>

              {/* Delete */}
              <FaTrash
                onClick={() => handleDelete(index)}
                className="mt-6 text-gray-400 hover:text-red-500 cursor-pointer"
              />
            </div>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => append({})}
        className="flex items-center gap-2 text-cyan-600 text-sm font-medium mt-2"
      >
        <FaPlus /> Add one more employment
      </button>
    </>
  );
};

export default EmpHistory;
