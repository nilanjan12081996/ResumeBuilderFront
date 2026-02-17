'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from 'react-icons/tb';
import { FaTrash } from 'react-icons/fa';
import Datepicker from '../../ui/Datepicker';
import TipTapEditor from "../../editor/TipTapEditor"; 

const ImpCourses = ({
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

    const handleDelete = (index, courseId) => {
        setDeletingIndex(index);
        setTimeout(() => {
            handleUpdate(sectionIndex, courseId, 'delete');
            setDeletingIndex(null);
        }, 500);
    };

    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 mb-4">
                Add relevant courses, workshops or online certifications you've completed.
            </p>

            {(section.courses || []).map((course, cIndex) => (
                <div
                    key={course.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, sectionIndex, cIndex)}
                    className={`
                        transition-all duration-500 mb-3
                        ${deletingIndex === cIndex ? '-translate-x-6 opacity-0' : ''}
                    `}
                >
                    <div className="flex items-start gap-2">
                        <span
                            className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, cIndex)}
                            onDragEnd={handleDragEnd}
                        >
                            <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                        </span>

                        <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden bg-white">
                            <AccordionPanel>
                                <AccordionTitle className="font-semibold text-sm">
                                    {course.course?.trim()
                                        ? `${course.course}${course.institution ? ' at ' + course.institution : ''}`
                                        : '(Not specified)'}
                                </AccordionTitle>

                                <AccordionContent className="pt-0">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">Course</Label>
                                            <input
                                                value={course.course || ''}
                                                onChange={(e) => handleUpdate(sectionIndex, course.id, 'course', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                placeholder="e.g. Web Development Bootcamp"
                                            />
                                        </div>

                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">Institution</Label>
                                            <input
                                                value={course.institution || ''}
                                                onChange={(e) => handleUpdate(sectionIndex, course.id, 'institution', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                placeholder="e.g. Udemy, Coursera"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <Label className="block text-xs font-semibold !text-gray-500 mb-1">Start & End Date</Label>
                                            <div className="flex gap-2 mt-1">
                                                <div className="flex-1">
                                                    <Datepicker
                                                        selectedDate={course.startDate}
                                                        onChange={(date) => handleUpdate(sectionIndex, course.id, 'startDate', date)}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <Datepicker
                                                        selectedDate={course.endDate}
                                                        onChange={(date) => handleUpdate(sectionIndex, course.id, 'endDate', date)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                            <div className="mt-1">
                                                <TipTapEditor
                                                    value={course.description || ''}
                                                    onChange={(content) => handleUpdate(sectionIndex, course.id, 'description', content)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionPanel>
                        </Accordion>

                        <div className="mt-5">
                            <FaTrash
                                className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(cIndex, course.id);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() => handleAddCourse(sectionIndex)}
                className="!text-sm !text-[#800080] font-medium mt-2 hover:underline"
            >
                + Add one more course
            </button>
        </>
    );
};

export default ImpCourses;