'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { useState } from "react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import Datepicker from "../ui/Datepicker";
import { TbDragDrop } from "react-icons/tb";

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
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isHandleHovered, setIsHandleHovered] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  // Field names based on sectionId
  const historyFieldName = `customAdvancedHistory_${sectionId}`;
  const titleFieldName = `customAdvancedTitle_${sectionId}`;

  const handleDragStart = (e, index) => {
    if (!isHandleHovered) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setIsHandleHovered(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    move(draggedIndex, targetIndex);
    setDraggedIndex(null);
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

  const deleteItem = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      remove(index);
      setDeletingIndex(null);
    }, 300);
  };

  return (
    <>
      <div className=''>
        <div className="space-y-3">
          {fields.map((item, index) => {
            const watchedTitle = watch(`${historyFieldName}.${index}.title`);
            const watchedCity = watch(`${historyFieldName}.${index}.city`);
            const isOngoing = watch(`${historyFieldName}.${index}.isOngoing`);

            return (
              <div
                key={item.id}
                draggable={isHandleHovered}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`transition-all duration-300 ${
                  deletingIndex === index ? "-translate-x-6 opacity-0" : ""
                } ${
                  draggedIndex === index 
                    ? "opacity-20 border-[#800080] scale-95" 
                    : "opacity-100 border-gray-200 shadow-sm hover:border-[#800080]"
                } cursor-default`}
              >
                <div className="flex gap-2">
                  <span
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={() => setIsHandleHovered(true)}
                    onMouseLeave={() => setIsHandleHovered(false)}
                    className="mt-5 cursor-grab"
                  >
                    <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                  </span>

                  <Accordion className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                    <AccordionPanel>
                      <AccordionTitle className="!text-sm !font-semibold">
                        {watchedTitle || watchedCity 
                          ? `${watchedTitle || ''}${watchedCity ? ', ' + watchedCity : ''}` 
                          : "(Not specified)"}
                      </AccordionTitle>

                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="col-span-2">
                            <label className="block !text-sm !font-medium !text-gray-500">
                              Title
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Project Lead, Award Name, etc."
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                              {...register(`${historyFieldName}.${index}.title`)}
                            />
                          </div>

                          {/* Date Section */}
                          <div className="md:col-span-2">
                            <label className="block !text-sm !font-medium !text-gray-500">
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
                                      onChange={(date) => field.onChange(date)} 
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
                                      onChange={(date) => field.onChange(date)}
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
                                id={`ongoing-custom-${item.id}`}
                                checked={isOngoing || false}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  setValue(`${historyFieldName}.${index}.isOngoing`, isChecked);
                                  if (isChecked) {
                                    setValue(`${historyFieldName}.${index}.endDate`, 'PRESENT');
                                  } else {
                                    setValue(`${historyFieldName}.${index}.endDate`, '');
                                  }
                                }}
                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                              />
                              <label htmlFor={`ongoing-custom-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                                Ongoing (Present)
                              </label>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <label className="block !text-sm !font-medium !text-gray-500">
                              City
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. New York"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                              {...register(`${historyFieldName}.${index}.city`)}
                            />
                          </div>

                          <div className="col-span-2">
                            <label className="block !text-sm !font-medium !text-gray-500">
                              Description
                            </label>
                            <textarea 
                              rows="4" 
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                              placeholder="Describe details..."
                              {...register(`${historyFieldName}.${index}.description`)}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionPanel>
                  </Accordion>
                  
                  <div className="flex justify-end pt-3 mt-4">
                    <FaTrash
                      className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                      title="Delete this item"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteItem(index);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-6'>
          <button 
            type="button" 
            onClick={addMore} 
            className='flex items-center gap-2 text-[#800080] hover:text-[#9d4a9d] font-medium transition-all p-2 rounded-lg hover:bg-[#f6efff]'
          >
            <FaPlus /> Add one more item
          </button>
        </div>
      </div>
    </>
  );
};

export default AdvancedCustomSectionEdit;