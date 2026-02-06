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

const newLanguageEdit = ({
  register,
  watch,
  fields,
  append,
  remove,
  move,
  noHeader,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const levels = [
    "Native speaker",
    "Highly proficient",
    "Very good command",
    "Good working knowledge",
    "Working knowledge"
  ];

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
          <h2 className="text-xl font-bold text-black pb-1">Languages</h2>
        )}
        <p className="text-sm text-[#808897] font-medium">
          Enter the languages you speak and your proficiency level.
        </p>
      </div>

      <div className="space-y-3">
        {fields.map((item, index) => {
          const watchedLanguage = watch(`languageHistory.${index}.language`);
          const watchedLevel = watch(`languageHistory.${index}.level`);

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
                <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
                  <AccordionPanel>
                    <AccordionTitle className="font-semibold text-sm">
                      <div className="flex flex-col text-left">
                        <span className="text-gray-700">
                          {watchedLanguage || "(Not specified)"}
                        </span>
                        {watchedLevel && watchedLevel !== "Select level" && (
                          <span className="text-xs text-gray-400 font-normal">
                            {watchedLevel}
                          </span>
                        )}
                      </div>
                    </AccordionTitle>

                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Language */}
                        <div>
                          <Label className="!text-sm !text-gray-500 font-semibold mb-1 block">Language</Label>
                          <input
                            {...register(`languageHistory.${index}.language`)}
                            className="w-full rounded-md border p-2 text-sm border-gray-300 focus:ring-[#800080] focus:border-[#800080]"
                            placeholder="e.g. English"
                          />
                        </div>

                        {/* Level */}
                        <div>
                          <Label className="!text-sm !text-gray-500 font-semibold mb-1 block">Level</Label>
                          <select
                            className="w-full rounded-md border p-2 text-sm bg-gray-50 text-gray-700 border-gray-300 focus:ring-[#800080] focus:border-[#800080]"
                            {...register(`languageHistory.${index}.level`)}
                          >
                            <option value="Select level" disabled>Select level</option>
                            {levels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
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
        onClick={() => append({ level: "Select level" })}
        className="text-sm !text-[#800080] font-medium mt-4 hover:underline"
      >
        + Add one more language
      </button>
    </>
  );
};

export default newLanguageEdit;