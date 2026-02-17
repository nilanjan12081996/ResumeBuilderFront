'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from 'react-icons/tb';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";
import TipTapEditor from "../../editor/TipTapEditor";

const LinkedInHonors = ({
  section,
  sectionIndex,
  handleUpdate,
  handleDragStart,
  handleDrop,
  handleAddItem,
  draggedIndex,
  handleDragEnd,
}) => {
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleDeleteItem = (idx, itemId) => {
    setDeletingIndex(idx);
    setTimeout(() => {
      handleUpdate(sectionIndex, itemId, "delete");
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
    if (!date) { handleUpdate(sectionIndex, itemId, field, ''); return; }
    const iso = date instanceof Date ? date.toISOString() : date.toString();
    handleUpdate(sectionIndex, itemId, field, iso);
  };

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Add honors, awards, and recognitions you've received throughout your career.
      </p>

      {(section.items || []).map((item, idx) => (
        <div
          key={item.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, sectionIndex, idx)}
          className={`
            mb-3 transition-all duration-500
            ${deletingIndex === idx ? "-translate-x-6 opacity-0" : ""}
          `}
        >
          <div className="flex items-start gap-2">
            {/* Drag handle */}
            <span
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragEnd={handleDragEnd}
              className="mt-5 cursor-grab active:cursor-grabbing"
            >
              <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
            </span>

            <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-sm">
                  {item.title?.trim() || "(Not specified)"}
                </AccordionTitle>

                <AccordionContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4">

                    {/* Award Title */}
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Award / Honor Title</Label>
                      <input
                        value={item.title || ''}
                        onChange={(e) => handleUpdate(sectionIndex, item.id, "title", e.target.value)}
                        placeholder="e.g. Dean's List, Employee of the Year"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    {/* Issuer */}
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Issuer / Organization</Label>
                      <input
                        value={item.issuer || ''}
                        onChange={(e) => handleUpdate(sectionIndex, item.id, "issuer", e.target.value)}
                        placeholder="e.g. University of Dhaka, Google"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    {/* Date received */}
                    <div className="col-span-2">
                      <Label className="block text-xs font-semibold !text-gray-500 mb-1">Date Received</Label>
                      <div className="w-1/2">
                        <Datepicker
                          selectedDate={normalizeDate(item.date)}
                          onChange={(date) => handleDateChange(item.id, "date", date)}
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                      <TipTapEditor
                        value={item.description || ''}
                        onChange={(html) => handleUpdate(sectionIndex, item.id, "description", html)}
                      />
                    </div>

                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>

            {/* Delete */}
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
        onClick={() => handleAddItem(sectionIndex)}
        className="flex items-center gap-2 text-sm !text-[#800080] font-medium mt-2 hover:underline"
      >
        <FaPlus size={12} /> Add one more honor
      </button>
    </>
  );
};

export default LinkedInHonors;