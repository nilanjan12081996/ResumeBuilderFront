'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { FaTrash } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";
import ImpDynamicFields from "../../ui/ImpDynamicFields";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import DraggableWrapper from "../DraggableWrapper";
import DragIcon from "../DragIcon";

const ImpAchievements = ({
  section,
  sectionIndex,
  handleUpdate,
  handleAdd,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDelete = (itemId) => {
    setDeletingId(itemId);
    setTimeout(() => {
      handleUpdate(sectionIndex, itemId, "delete");
      setDeletingId(null);
    }, 200);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const items = section.items || [];
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      handleUpdate(sectionIndex, null, "reorder", arrayMove(items, oldIndex, newIndex));
    }
  };

  const itemIds = (section.items || []).map((i) => i.id);

  return (
    <>
      <p className="text-sm text-gray-500 mb-3">
        Showcase key achievements, activities or publications.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {(section.items || []).map((item) => (
            <DraggableWrapper key={item.id} id={item.id}>
              <div
                className={`transition-all duration-200 mb-3 ${
                  deletingId === item.id ? "-translate-x-6 opacity-0" : ""
                }`}
              >
                <div className="flex gap-2">
                  <span className="mt-5">
                    <DragIcon />
                  </span>

                  <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                    <AccordionPanel>
                      <AccordionTitle className="text-sm font-semibold">
                        {item.title || "(Awaiting Input)"}
                      </AccordionTitle>

                      <AccordionContent className="pt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="!text-sm !font-medium !text-gray-500">Title</Label>
                            <input
                              value={item.title || ''}
                              onChange={(e) => handleUpdate(sectionIndex, item.id, "title", e.target.value)}
                              className="w-full border border-gray-300 p-2 text-sm rounded-md mt-1"
                            />
                          </div>

                          <div>
                            <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                            <input
                              value={item.city || ''}
                              onChange={(e) => handleUpdate(sectionIndex, item.id, "city", e.target.value)}
                              className="w-full border border-gray-300 p-2 text-sm rounded-md mt-1"
                            />
                          </div>

                          <div className="col-span-1 md:col-span-2">
                            <Label className="block text-xs font-semibold !text-gray-500 mb-1">Start & End Date</Label>
                            <div className="flex gap-2 mt-1">
                              <div className="flex-1">
                                <Datepicker
                                  selectedDate={item.startDate}
                                  onChange={(date) => handleUpdate(sectionIndex, item.id, "startDate", date)}
                                />
                              </div>
                              <div className="flex-1">
                                <Datepicker
                                  selectedDate={item.endDate}
                                  onChange={(date) => handleUpdate(sectionIndex, item.id, "endDate", date)}
                                  disabled={item.isOngoing}
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="checkbox"
                                id={`ongoing-${item.id}`}
                                checked={item.isOngoing || false}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  handleUpdate(sectionIndex, item.id, "isOngoing", isChecked);
                                  handleUpdate(sectionIndex, item.id, "endDate", isChecked ? 'PRESENT' : '');
                                }}
                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                              />
                              <label htmlFor={`ongoing-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                                Ongoing (Present)
                              </label>
                            </div>
                          </div>
                        </div>

                        <ImpDynamicFields
                          coreFields={[{
                            id: 'description',
                            name: 'Description',
                            value: item.description,
                            type: 'long_text',
                          }]}
                          customFields={item.customFields || []}
                          onChange={(newFields) => handleUpdate(sectionIndex, item.id, "customFields", newFields)}
                          onCoreFieldChange={(id, value) => handleUpdate(sectionIndex, item.id, "description", value)}
                          onOrderChange={(newOrder) => handleUpdate(sectionIndex, item.id, "fieldOrder", newOrder)}
                          fieldOrder={item.fieldOrder || []}
                          suggestions={["Award Body", "Category", "Impact", "Related Link"]}
                        />
                      </AccordionContent>
                    </AccordionPanel>
                  </Accordion>

                  <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
                    <FaTrash
                      className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}
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
        onClick={() => handleAdd(sectionIndex)}
        className="text-sm !text-[#800080] font-medium mt-2"
      >
        + Add one more
      </button>
    </>
  );
};

export default ImpAchievements;
