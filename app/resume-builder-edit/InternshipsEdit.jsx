'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import Datepicker from "../utils/Datepicker";

const Internships = ({ register, watch, control, fields, append, remove, move, noHeader }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isHandleHovered, setIsHandleHovered] = useState(false);

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
    append({}); 
  };

  const deleteItem = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <>
      {!noHeader && (
          <div className='mb-4'>
            <h2 className='text-xl font-bold text-black pb-1'>Internship</h2>
            <p className='text-sm text-[#808897] font-medium'>
               Show your relevant experience (last 10 years). Use bullet points to note your achievements.
            </p>
          </div>
      )}

      <div className=''>
        <div className="space-y-3">
          {fields.map((item, index) => {
            const watchedJobTitle = watch(`internshipHistory.${index}.jobTitle`);
            const watchedEmployer = watch(`internshipHistory.${index}.employer`);
            const watchedStartDate = watch(`internshipHistory.${index}.startDate`);

            return (
              <div
                key={item.id}
                draggable={isHandleHovered}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`transition-all duration-200 bg-white rounded-xl border ${
                  draggedIndex === index 
                    ? "opacity-20 border-cyan-500 scale-95" 
                    : "opacity-100 border-gray-200 shadow-sm hover:border-cyan-300"
                } cursor-default`}
              >
                <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-cyan-300 overflow-hidden">
                <Accordion flush={true}>
                  <AccordionPanel>
                    <AccordionTitle className="p-4">
                      <div className="flex items-center gap-3">
                        {/* Drag Handle */}
                        <button
                          type="button"
                          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
                          onMouseEnter={() => setIsHandleHovered(true)}
                          onMouseLeave={() => setIsHandleHovered(false)}
                        >
                          <RiDraggable className="text-xl text-gray-400" />
                        </button>

                        <div className="flex flex-col text-left">
                            <span className="font-bold text-sm text-gray-700">
                            {watchedJobTitle || watchedEmployer 
                                ? `${watchedJobTitle || ''}${watchedEmployer ? ' at ' + watchedEmployer : ''}` 
                                : "(Not specified)"}
                            </span>
                             {watchedStartDate && (
                                <span className="text-xs text-gray-400 font-normal">
                                    {new Date(watchedStartDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                                </span>
                            )}
                         </div>
                      </div>
                    </AccordionTitle>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          {/* Job Title */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Job Title
                            </label>
                            <input
                              type="text"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                              {...register(`internshipHistory.${index}.jobTitle`)}
                            />
                          </div>

                          {/* Employer */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Employer
                            </label>
                            <input
                              type="text"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                             {...register(`internshipHistory.${index}.employer`)}
                            />
                          </div>

                          {/* Start & End Date */}
                        <div className='date_area'>
                        <label className="block text-sm font-medium text-gray-700">
                          Start & End Date
                        </label>
                        <div className='flex gap-5'>
                     
                          <div className="flex-1">
                          <Controller
                          control={control} 
                          name={`internshipHistory.${index}.startDate`}
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
                            name={`internshipHistory.${index}.endDate`}
                            render={({ field }) => (
                              <Datepicker 
                                selectedDate={field.value} 
                                onChange={(date) => field.onChange(date)} 
                              />
                            )}
                          />
                        </div>
                          </div>
                      </div>

                        {/* City */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              City, State
                            </label>
                            <input
                              type="text"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                             {...register(`internshipHistory.${index}.city`)}
                            />
                          </div>
                          
                          {/* Description */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <textarea rows="4" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="e.g. Created and implemented lesson plans..."
                           {...register(`internshipHistory.${index}.description`)}
                            ></textarea>
                          </div>

                          {/* Delete Button inside the Content */}
                        <div className="md:col-span-2 flex justify-end pt-2 border-t mt-2 delete_point">
                          <button 
                            type="button" 
                            onClick={() => deleteItem(index)}
                            className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            <MdDelete className='text-lg' /> 
                          </button>
                        </div>

                      </div>
                  </AccordionContent>
                </AccordionPanel>
              </Accordion>
              </div>
            </div>
            )
          })}
        </div>
          
          <div className='mt-4'>
            <button type="button" onClick={addMore} className='flex items-center gap-2 text-blue-500 font-bold'>
                <FaPlus /> Add one more internship
            </button>
          </div>
        </div >
    </>
  );
};

export default Internships;
