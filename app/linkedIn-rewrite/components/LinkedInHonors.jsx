'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { FaTrash, FaPlus } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";
import TipTapEditor from "../../editor/TipTapEditor";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import DraggableWrapper from "../DraggableWrapper";
import DragIcon from "../DragIcon";

const LinkedInHonors = ({ section, sectionIndex, handleUpdate, handleAddItem }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteItem = (itemId) => {
    setDeletingId(itemId);
    setTimeout(() => {
      handleUpdate(sectionIndex, itemId, "delete");
      setDeletingId(null);
    }, 200);
  };

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

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const items = section.items || [];
    const oldIndex = items.findIndex(i => i.id === active.id);
    const newIndex = items.findIndex(i => i.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      handleUpdate(sectionIndex, null, "reorder", arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Add honors, awards, and recognitions you've received throughout your career.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={(section.items || []).map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {(section.items || []).map((item) => (
            <DraggableWrapper key={item.id} id={item.id}>
              <div className={`mb-3 transition-all duration-200 ${deletingId === item.id ? "-translate-x-6 opacity-0" : ""}`}>
                <div className="flex items-start gap-2">

                  <span className="mt-5"><DragIcon /></span>

                  <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                    <AccordionPanel>
                      <AccordionTitle className="font-semibold text-sm">
                        {item.title?.trim() || "(Not specified)"}
                      </AccordionTitle>

                      <AccordionContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">

                          <div className="col-span-2">
                            <Label className="!text-sm !font-medium !text-gray-500">Award / Honor Title</Label>
                            <input
                              value={item.title || ''}
                              onChange={(e) => handleUpdate(sectionIndex, item.id, "title", e.target.value)}
                              placeholder="e.g. Dean's List, Employee of the Year"
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div className="col-span-2">
                            <Label className="!text-sm !font-medium !text-gray-500">Issuer / Organization</Label>
                            <input
                              value={item.issuer || ''}
                              onChange={(e) => handleUpdate(sectionIndex, item.id, "issuer", e.target.value)}
                              placeholder="e.g. University of Dhaka, Google"
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div className="col-span-2">
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
                                />
                              </div>
                            </div>
                          </div>

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

                  <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
                    <FaTrash
                      className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                      title="Delete this item"
                      onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                    />
                  </div>
                </div>
              </div>
            </DraggableWrapper>
          ))}
        </SortableContext>
      </DndContext>

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