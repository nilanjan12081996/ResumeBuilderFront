'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import Datepicker from "../utils/Datepicker";

const EducationNew = ({ register, watch, control, fields, append, remove, move, noHeader }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isHandleHovered, setIsHandleHovered] = useState(false);

  // ... (handlers)

  const handleDragStart = (e, index) => {
    // Only allow drag if it started from our handle logic
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

  const deleteEmp = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <>
      {!noHeader && (
        <div className='mb-4'>
          <h2 className='text-xl font-bold text-black pb-1'>Education</h2>
          <p className='text-sm text-[#808897] font-medium'>
            A varied education on your resume sums up the value that your learnings and background will bring to job.
          </p>
        </div>
      )}

      <div className='acco_section'>
        <div className="space-y-3">
          {fields.map((item, index) => {
            const watchedSchool = watch(`educationHistory.${index}.school`);
            const watchedDegree = watch(`educationHistory.${index}.degree`);

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
                        {/* THE HANDLE: Only this part triggers the drag */}
                        <button
                          type="button"
                          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
                          onMouseEnter={() => setIsHandleHovered(true)}
                          onMouseLeave={() => setIsHandleHovered(false)}
                        >
                          <RiDraggable className="text-xl text-gray-400" />
                        </button>

                        <span className="font-bold text-sm text-gray-700">
                          {watchedSchool || watchedDegree 
                            ? `${watchedDegree || ''}${watchedDegree ? ' at ' + watchedSchool : ''}` 
                            : "(Not specified)"}
                        </span>
                      </div>
                    </AccordionTitle>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          {/* School */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              School
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                              {...register(`educationHistory.${index}.school`)}
                            />
                          </div>

                          {/* Degree */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Degree
                            </label>
                            <input
                              type="text"
                              placeholder=""
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                             {...register(`educationHistory.${index}.degree`)}
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
                          name={`educationHistory.${index}.startDate`}
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
                            name={`educationHistory.${index}.endDate`}
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
                              placeholder=""
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                              {...register(`educationHistory.${index}.city_state`)}
                            />
                          </div>

                          {/* Description */}
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Description
                            </label>
                            <textarea rows="4" className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm" placeholder="Write here..."
                           {...register(`educationHistory.${index}.description`)}
                            ></textarea>
                          </div>

                          {/* Delete Button inside the Content */}
                        <div className="md:col-span-2 flex justify-end pt-2 border-t mt-2 delete_point">
                          <button 
                            type="button" 
                            onClick={() => deleteEmp(index)}
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
                <FaPlus /> Add one more education
            </button>
          </div>
        </div >
    </>
  );
};

export default EducationNew;