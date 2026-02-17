'use client';
import React, { useState } from "react";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import { FaTrash, FaPlus } from "react-icons/fa";
import TipTapEditor from "../../editor/TipTapEditor";
import Datepicker from "../../ui/Datepicker";

const LinkedInCustomSection = ({
  section,
  sectionIndex,
  handleCustomUpdate,
  handleCustomDragStart,
  handleCustomDrop,
  handleAddCustomItem,
  draggedIndex,
  handleDragEnd,
}) => {
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleDeleteItem = (idx, itemId) => {
    setDeletingIndex(idx);
    setTimeout(() => {
      handleCustomUpdate(sectionIndex, itemId, "delete");
      setDeletingIndex(null);
    }, 500);
  };

  // ── Normalize date for Datepicker ──────────────────────────────
  const normalizeDate = (dateValue) => {
    if (!dateValue) return null;
    if (String(dateValue).toLowerCase() === "present") return null;
    if (dateValue instanceof Date) return dateValue;
    const parsed = new Date(dateValue);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const handleDateChange = (itemId, field, date) => {
    if (!date) { handleCustomUpdate(sectionIndex, itemId, field, ''); return; }
    const iso = date instanceof Date ? date.toISOString() : date.toString();
    handleCustomUpdate(sectionIndex, itemId, field, iso);
  };

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Add custom entries with title, dates, location, and description.
      </p>

      {(section.items || []).map((item, idx) => (
        <div
          key={item.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleCustomDrop(e, sectionIndex, idx)}
          className={`
            mb-3 transition-all duration-500
            ${deletingIndex === idx ? "-translate-x-6 opacity-0" : ""}
          `}
        >
          <div className="flex gap-2">
            {/* Drag handle */}
            <span
              draggable
              onDragStart={(e) => handleCustomDragStart(e, idx)}
              onDragEnd={handleDragEnd}
              className="mt-5 cursor-grab active:cursor-grabbing"
            >
              <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
            </span>

            <Accordion className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
              <AccordionPanel>
                <AccordionTitle className="!text-sm !font-semibold">
                  {item.title?.trim() || "(Not specified)"}
                </AccordionTitle>

                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">

                    {/* Title */}
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Title</Label>
                      <input
                        className="w-full border border-gray-300 p-2 rounded-md text-sm"
                        value={item.title || ''}
                        onChange={(e) =>
                          handleCustomUpdate(sectionIndex, item.id, "title", e.target.value)
                        }
                        placeholder="e.g. Project Name, Award Title"
                      />
                    </div>

                    {/* Start & End Date */}
                    <div className="md:col-span-2">
                      <Label className="block text-xs font-semibold !text-gray-500 mb-1">Start & End Date</Label>
                      <div className="flex gap-2 mt-1">
                        <div className="flex-1">
                          <Datepicker
                            selectedDate={normalizeDate(item.startDate)}
                            onChange={(date) => handleDateChange(item.id, "startDate", date)}
                          />
                        </div>
                        <div className="flex-1">
                          <Datepicker
                            selectedDate={normalizeDate(item.endDate)}
                            onChange={(date) => handleDateChange(item.id, "endDate", date)}
                            disabled={item.isOngoing}
                          />
                        </div>
                      </div>

                      {/* Ongoing checkbox */}
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id={`ongoing-${item.id}`}
                          checked={item.isOngoing || false}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            handleCustomUpdate(sectionIndex, item.id, "isOngoing", checked);
                            handleCustomUpdate(sectionIndex, item.id, "endDate", checked ? "PRESENT" : "");
                          }}
                          className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                        />
                        <label htmlFor={`ongoing-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                          Ongoing (Present)
                        </label>
                      </div>
                    </div>

                    {/* City */}
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                      <input
                        className="w-full border border-gray-300 p-2 rounded-md text-sm"
                        value={item.city || ''}
                        onChange={(e) =>
                          handleCustomUpdate(sectionIndex, item.id, "city", e.target.value)
                        }
                        placeholder="City, Country"
                      />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                      <TipTapEditor
                        value={item.description || ''}
                        onChange={(html) =>
                          handleCustomUpdate(sectionIndex, item.id, "description", html)
                        }
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>

            {/* Delete button */}
            <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
              <FaTrash
                className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                title="Delete this item"
                onClick={(e) => { e.stopPropagation(); handleDeleteItem(idx, item.id); }}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => handleAddCustomItem(sectionIndex)}
        className="flex items-center gap-2 text-sm !text-[#800080] font-medium mt-2 hover:underline"
      >
        <FaPlus size={12} /> Add one more item
      </button>
    </>
  );
};

export default LinkedInCustomSection;