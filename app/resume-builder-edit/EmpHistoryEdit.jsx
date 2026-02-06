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

const EmpHistoryEdit = ({
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
          <h2 className="text-xl font-bold">Employment History</h2>
          <p className="text-sm text-gray-500">
            Show your relevant experience (last 10 years).
          </p>
        </div>
      )}

      {fields.map((item, index) => {
        const job = watch(`employmentHistory.${index}.job_title`);
        const company = watch(`employmentHistory.${index}.employer`);
        const isCurrentlyWorking = watch(`employmentHistory.${index}.isCurrentlyWorking`);

        return (
          <div
            key={item.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
            className={`transition-all duration-500 mb-3 ${deletingIndex === index ? "-translate-x-6 opacity-0" : ""
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
                    {job?.trim()
                      ? `${job}${company ? " at " + company : ""}`
                      : "(Not specified)"}
                  </AccordionTitle>

                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="!text-sm !text-gray-500">Job Title</Label>
                        <input
                          {...register(`employmentHistory.${index}.job_title`)}
                          className="w-full rounded-md border p-2 text-sm"
                          placeholder="e.g. Software Engineer"
                        />
                      </div>

                      <div>
                        <Label className="!text-sm !text-gray-500">Employer</Label>
                        <input
                          {...register(`employmentHistory.${index}.employer`)}
                          className="w-full rounded-md border p-2 text-sm"
                          placeholder="e.g. Google"
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
                              name={`employmentHistory.${index}.startDate`}
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
                              name={`employmentHistory.${index}.endDate`}
                              render={({ field }) => (
                                <>
                                  <Datepicker
                                    selectedDate={isCurrentlyWorking ? null : field.value}
                                    onChange={field.onChange}
                                    disabled={isCurrentlyWorking}
                                  />
                                  {isCurrentlyWorking && (
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
                            id={`currently-working-${index}`}
                            checked={!!isCurrentlyWorking}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setValue(`employmentHistory.${index}.isCurrentlyWorking`, checked);
                              if (checked) {
                                // Template-এ "Present" পাঠানোর জন্য ভ্যালু সেট করা হলো
                                setValue(`employmentHistory.${index}.endDate`, "Present");
                              } else {
                                // চেক তুলে দিলে ফিল্ড ক্লিয়ার হয়ে যাবে যাতে নতুন ডেট দেওয়া যায়
                                setValue(`employmentHistory.${index}.endDate`, "");
                              }
                            }}
                            className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                          />
                          <label 
                            htmlFor={`currently-working-${index}`}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            I currently work here
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <Label className="!text-sm !text-gray-500">City</Label>
                        <input
                          {...register(`employmentHistory.${index}.city_state`)}
                          className="w-full rounded-md border p-2 text-sm"
                          placeholder="e.g. Kolkata, West Bengal"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="!text-sm !text-gray-500">Description</Label>
                        <Controller
                          control={control}
                          name={`employmentHistory.${index}.description`}
                          defaultValue=""
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

      <button
        type="button"
        onClick={() => append({})}
        className="text-sm !text-[#800080] font-medium mt-4 hover:underline"
      >
        + Add one more employment
      </button>
    </>
  );
};

export default EmpHistoryEdit;