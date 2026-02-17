'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from 'react-icons/tb';
import { FaTrash, FaPlus } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";

const LinkedInCourses = ({
  section,
  sectionIndex,
  handleUpdate,
  handleDragStart,
  handleDrop,
  handleAddCourse,
  draggedIndex,
  handleDragEnd,
}) => {
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleDeleteCourse = (idx, courseId) => {
    setDeletingIndex(idx);
    setTimeout(() => {
      handleUpdate(sectionIndex, courseId, "delete");
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

  const handleDateChange = (courseId, field, date) => {
    if (!date) { handleUpdate(sectionIndex, courseId, field, ''); return; }
    const iso = date instanceof Date ? date.toISOString() : date.toString();
    handleUpdate(sectionIndex, courseId, field, iso);
  };

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Add courses you've completed — include the course name, institution, and dates.
      </p>

      {(section.courses || []).map((course, idx) => (
        <div
          key={course.id}
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
                  {course.course?.trim() || "(Not specified)"}
                </AccordionTitle>

                <AccordionContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4">

                    {/* Course name */}
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Course Name</Label>
                      <input
                        value={course.course || ''}
                        onChange={(e) => handleUpdate(sectionIndex, course.id, "course", e.target.value)}
                        placeholder="e.g. Machine Learning, Web Development"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    {/* Institution */}
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Institution</Label>
                      <input
                        value={course.institution || ''}
                        onChange={(e) => handleUpdate(sectionIndex, course.id, "institution", e.target.value)}
                        placeholder="e.g. Coursera, MIT OpenCourseWare"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    {/* Dates */}
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
                          <Datepicker
                            selectedDate={normalizeDate(course.endDate)}
                            onChange={(date) => handleDateChange(course.id, "endDate", date)}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>

            {/* Delete */}
            <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
              <FaTrash
                className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                title="Delete this course"
                onClick={(e) => { e.stopPropagation(); handleDeleteCourse(idx, course.id); }}
              />
            </div>
          </div>
        </div>
      ))}

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

export default LinkedInCourses;