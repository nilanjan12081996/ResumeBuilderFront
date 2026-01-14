'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const Languages = ({ register, watch, control, fields, append, remove, move }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isHandleHovered, setIsHandleHovered] = useState(false);

  const levels = [
    "Native speaker",
    "Highly proficient",
    "Very good command",
    "Good working knowledge",
    "Working knowledge"
  ];

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
    append({ level: "Select level" }); 
  };

  const deleteItem = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <>
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-black pb-1'>Languages</h2>
        <p className='text-sm text-[#808897] font-medium'>
            Enter the languages you speak and your proficiency level.
        </p>
      </div>

      <div className='acco_section'>
        <div className="space-y-3">
          {fields.map((item, index) => {
            const watchedLanguage = watch(`languageHistory.${index}.language`);
            const watchedLevel = watch(`languageHistory.${index}.level`);

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
                            {watchedLanguage || "(Not specified)"}
                            </span>
                             {watchedLevel && watchedLevel !== "Select level" && (
                                <span className="text-xs text-gray-400 font-normal">
                                    {watchedLevel}
                                </span>
                            )}
                         </div>
                      </div>
                    </AccordionTitle>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          {/* Language */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Language
                            </label>
                            <input
                              type="text"
                              className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                              placeholder="e.g. English"
                              {...register(`languageHistory.${index}.language`)}
                            />
                          </div>

                          {/* Level */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Level
                            </label>
                            <select
                                className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm bg-gray-50 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                                {...register(`languageHistory.${index}.level`)}
                            >
                                <option value="Select level" disabled>Select level</option>
                                {levels.map(level => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
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
                <FaPlus /> Add one more language
            </button>
          </div>
        </div >
    </>
  );
};

export default Languages;
