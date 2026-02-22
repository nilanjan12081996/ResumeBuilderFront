'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { FaTrash } from 'react-icons/fa';
import Datepicker from '../../ui/Datepicker';
import TipTapEditor from "../../editor/TipTapEditor";
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

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDelete = (courseId) => {
        setDeletingId(courseId);
        setTimeout(() => {
            handleUpdate(sectionIndex, courseId, 'delete');
            setDeletingId(null);
        }, 200);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const courses = section.courses || [];
        const oldIndex = courses.findIndex((c) => c.id === active.id);
        const newIndex = courses.findIndex((c) => c.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            handleUpdate(sectionIndex, null, "reorder", arrayMove(courses, oldIndex, newIndex));
        }
    };

    const courseIds = (section.courses || []).map((c) => c.id);

    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 mb-4">
                Add relevant courses, workshops or online certifications you've completed.
            </p>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={courseIds} strategy={verticalListSortingStrategy}>
                    {(section.courses || []).map((course, cIndex) => (
                        <DraggableWrapper key={course.id} id={course.id}>
                            <div
                                className={`
                                    transition-all duration-200 mb-3
                                    ${deletingId === course.id ? '-translate-x-6 opacity-0' : ''}
                                `}
                            >
                                <div className="flex items-start gap-2">
                                    <span className="mt-5">
                                        <DragIcon />
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
                                                                    disabled={course.isOngoing}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 mt-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`ongoing-course-${course.id}`}
                                                                checked={course.isOngoing || false}
                                                                onChange={(e) => {
                                                                    const isChecked = e.target.checked;
                                                                    handleUpdate(sectionIndex, course.id, 'isOngoing', isChecked);
                                                                    handleUpdate(sectionIndex, course.id, 'endDate', isChecked ? 'PRESENT' : '');
                                                                }}
                                                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                                                            />
                                                            <label htmlFor={`ongoing-course-${course.id}`} className="text-sm text-gray-700 cursor-pointer">
                                                                Ongoing (Present)
                                                            </label>
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
                                                handleDelete(course.id);
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
                onClick={() => handleAddCourse(sectionIndex)}
                className="!text-sm !text-[#800080] font-medium mt-2 hover:underline"
            >
                + Add one more course
            </button>
        </>
    );
};

export default ImpCourses;