'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { useState } from "react";
import { FaPlus, FaPen } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import Datepicker from "../utils/Datepicker";

const CustomSection = ({ register, watch, control, fields, append, remove, move, removeSection, noHeader }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isHandleHovered, setIsHandleHovered] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // ... (handlers)

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
      remove(index);
  };

  const sectionTitle = watch('customSectionTitle');

  const renderHeaderContent = () => (
      <div className='group flex justify-between items-start'>
          <div>
              <div className="flex items-center gap-2 pb-1">
                  {isEditingTitle ? (
                      <input
                          type="text"
                          {...register('customSectionTitle')}
                          className="text-xl font-bold text-black border-b border-gray-300 focus:border-cyan-500 outline-none bg-transparent px-1"
                          autoFocus
                          onBlur={() => setIsEditingTitle(false)}
                          placeholder="Section Title"
                      />
                  ) : (
                      <h2 
                          className='text-xl font-bold text-black cursor-pointer hover:text-cyan-600 flex items-center gap-2'
                          onClick={() => setIsEditingTitle(true)}
                      >
                          {sectionTitle || "Custom Section"}
                          <FaPen className="text-sm opacity-0 group-hover:opacity-100 text-gray-400" />
                      </h2>
                  )}
              </div>
              <p className='text-sm text-[#808897] font-medium'>
              Add your own custom activities, achievements, or experiences.
              </p>
          </div>
          <button
              type="button"
              onClick={removeSection}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Delete Section"
          >
              <MdDelete size={20} />
          </button>
      </div>
  );

  return (
    <>
      {!noHeader ? (
         <div className="mb-4">
             {renderHeaderContent()}
         </div>
      ) : (
         <div className="mb-4 border-b pb-4">
             {renderHeaderContent()}
         </div>
      )}

      <div className=''>
        <div className="space-y-3">
          {fields.map((item, index) => {
            const watchedActivity = watch(`customSectionHistory.${index}.activity`);
            const watchedCity = watch(`customSectionHistory.${index}.city`);

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
                        <button
                          type="button"
                          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded"
                          onMouseEnter={() => setIsHandleHovered(true)}
                          onMouseLeave={() => setIsHandleHovered(false)}
                        >
                          <RiDraggable className="text-xl text-gray-400" />
                        </button>

                        <span className="font-bold text-sm text-gray-700">
                          {watchedActivity || watchedCity 
                            ? `${watchedActivity || ''}${watchedCity ? ', ' + watchedCity : ''}` 
                            : "(Not specified)"}
                        </span>
                      </div>
                    </AccordionTitle>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Activity Name */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase">Activity name, job title, book title etc.</label>
                          <input
                            type="text"
                            placeholder="e.g. Project Lead"
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                            {...register(`customSectionHistory.${index}.activity`)}
                          />
                        </div>

                        {/* City */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase">City</label>
                          <input
                            type="text"
                            placeholder="e.g. New York"
                             className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                            {...register(`customSectionHistory.${index}.city`)}
                          />
                        </div>

                        {/* Start & End Date */}
                        <div className='md:col-span-1 date_area'>
                          <label className="block text-sm font-medium text-gray-700">
                              Start & End Date
                            </label>
                          <div className='flex gap-2 mt-1'>
                            <Controller
                              control={control}
                              name={`customSectionHistory.${index}.startDate`}
                              render={({ field }) => (
                                <Datepicker selectedDate={field.value} onChange={(date) => field.onChange(date)} />
                              )}
                            />
                            <Controller
                              control={control}
                              name={`customSectionHistory.${index}.endDate`}
                              render={({ field }) => (
                                <Datepicker selectedDate={field.value} onChange={(date) => field.onChange(date)} />
                              )}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-gray-500 uppercase">Description</label>
                          <textarea 
                            rows="4" 
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                            placeholder="Describe details..."
                            {...register(`customSectionHistory.${index}.description`)}
                          />
                        </div>

                        {/* Delete Button */}
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
            );
          })}
        </div>

        <div className='mt-6'>
          <button 
            type="button" 
            onClick={addMore} 
            className='flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-bold transition-all p-2 rounded-lg hover:bg-cyan-50'
          >
            <FaPlus /> Add one more item
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomSection;
