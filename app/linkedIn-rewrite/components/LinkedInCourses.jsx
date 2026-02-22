'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { FaTrash, FaPlus } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";
import TipTapEditor from '../../editor/TipTapEditor';
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

const ImpCourses = ({
  section,
  sectionIndex,
  handleUpdate,
  handleAddCourse,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteCourse = (courseId) => {
    setDeletingId(courseId);
    setTimeout(() => {
      handleUpdate(sectionIndex, courseId, "delete");
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

  const handleDateChange = (courseId, field, date) => {
    if (!date) { handleUpdate(sectionIndex, courseId, field, ''); return; }
    const iso = date instanceof Date ? date.toISOString() : date.toString();
    handleUpdate(sectionIndex, courseId, field, iso);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const courses = section.courses || [];
    const oldIndex = courses.findIndex(c => c.id === active.id);
    const newIndex = courses.findIndex(c => c.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      handleUpdate(sectionIndex, null, "reorder", arrayMove(courses, oldIndex, newIndex));
    }
  };

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Add courses you've completed — include the course name, institution, and dates.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={(section.courses || []).map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {(section.courses || []).map((course, idx) => (
            <DraggableWrapper key={course.id} id={course.id}>
              <div
                className={`
                  mb-3 transition-all duration-200
                  ${deletingId === course.id ? "-translate-x-6 opacity-0" : ""}
                `}
              >
                <div className="flex items-start gap-2">

                  <span className="mt-5">
                    <DragIcon />
                  </span>

                  <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                    <AccordionPanel>
                      <AccordionTitle className="font-semibold text-sm">
                        {course.course?.trim() || "(Not specified)"}
                      </AccordionTitle>

                      <AccordionContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4">

                          <div className="col-span-2">
                            <Label className="!text-sm !font-medium !text-gray-500">Course Name</Label>
                            <input
                              value={course.course || ''}
                              onChange={(e) => handleUpdate(sectionIndex, course.id, "course", e.target.value)}
                              placeholder="e.g. Machine Learning, Web Development"
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div className="col-span-2">
                            <Label className="!text-sm !font-medium !text-gray-500">Institution</Label>
                            <input
                              value={course.institution || ''}
                              onChange={(e) => handleUpdate(sectionIndex, course.id, "institution", e.target.value)}
                              placeholder="e.g. Coursera, MIT OpenCourseWare"
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div className="col-span-2">
                            <Label className="block text-xs font-semibold !text-gray-500 mb-1">Start & End Date</Label>
                            <div className="flex gap-2 mt-1">
                              <div className="flex-1">
                                <Datepicker
                                  selectedDate={normalizeDate(course.startDate)}
                                  onChange={(date) => handleDateChange(course.id, "startDate", date)}
                                />
                              </div>
                              <div className="flex-1">
                                {course.isOngoing ? (
                                  <input
                                    value="Present"
                                    disabled
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                                  />
                                ) : (
                                  <Datepicker
                                    selectedDate={normalizeDate(course.endDate)}
                                    onChange={(date) => handleDateChange(course.id, "endDate", date)}
                                  />
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="checkbox"
                                id={`ongoing-${course.id}`}
                                checked={course.isOngoing || false}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  handleUpdate(sectionIndex, course.id, "isOngoing", isChecked);
                                  handleUpdate(sectionIndex, course.id, "endDate", isChecked ? 'PRESENT' : '');
                                }}
                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                              />
                              <label htmlFor={`ongoing-${course.id}`} className="text-sm text-gray-700 cursor-pointer">
                                Ongoing (Present)
                              </label>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="col-span-2">
                            <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                            <TipTapEditor
                              value={course.description || ''}
                              onChange={(html) => handleUpdate(sectionIndex, course.id, "description", html)}
                            />
                          </div>

                        </div>
                      </AccordionContent>
                    </AccordionPanel>
                  </Accordion>

                  <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
                    <FaTrash
                      className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                      title="Delete this course"
                      onClick={(e) => { e.stopPropagation(); handleDeleteCourse(course.id); }}
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
        onClick={() => handleAddCourse(sectionIndex)}
        className="flex items-center gap-2 text-sm !text-[#800080] font-medium mt-2 hover:underline"
      >
        <FaPlus size={12} /> Add one more course
      </button>
    </>
  );
};

export default ImpCourses;