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
          <h2 className="text-xl font-bold">Education</h2>
          <p className="text-sm text-gray-500">
            Add your education background.
          </p>
        </div>
      )}

      {fields.map((item, index) => {
        const degree = watch(`educationHistory.${index}.degree`);
        const school = watch(`educationHistory.${index}.school`);
        const isCurrentlyStudying = watch(`educationHistory.${index}.isCurrentlyStudying`);

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
              <span
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                className="mt-5 cursor-grab active:cursor-grabbing"
              >
                <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
              </span>

              <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg overflow-hidden">
                <AccordionPanel>
                  <AccordionTitle className="font-semibold text-sm">
                    {degree?.trim()
                      ? `${degree}${school ? " at " + school : ""}`
                      : "(Not specified)"}
                  </AccordionTitle>

                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="!text-sm !text-gray-500">School</Label>
                        <input
                          {...register(`educationHistory.${index}.school`)}
                          className="w-full rounded-md border p-2 text-sm"
                          placeholder="e.g. University of Dhaka"
                        />
                      </div>

                      <div>
                        <Label className="!text-sm !text-gray-500">Degree</Label>
                        <input
                          {...register(`educationHistory.${index}.degree`)}
                          className="w-full rounded-md border p-2 text-sm"
                          placeholder="e.g. Bachelor of Science"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="!text-sm !text-gray-500">
                          Start & End Date
                        </Label>
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
                            id={`currently-studying-${index}`}
                            checked={!!isCurrentlyStudying}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setValue(`educationHistory.${index}.isCurrentlyStudying`, checked);
                              if (checked) {
                                setValue(`educationHistory.${index}.endDate`, "Present");
                              } else {
                                setValue(`educationHistory.${index}.endDate`, "");
                              }
                            }}
                            className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                          />
                          <label 
                            htmlFor={`currently-studying-${index}`}
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
                          className="w-full rounded-md border p-2 text-sm"
                          placeholder="e.g. Dhaka"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="!text-sm !text-gray-500">Description</Label>
                        <Controller
                          control={control}
                          name={`educationHistory.${index}.description`}
                          defaultValue=""
                          render={({ field }) => (
                            <TipTapEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Describe your studies, achievements, projects"
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