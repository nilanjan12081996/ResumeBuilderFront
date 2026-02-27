'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { FaTrash } from 'react-icons/fa';
import Datepicker from '../../ui/Datepicker';
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

const ImpInternships = ({
    section,
    sectionIndex,
    handleUpdate,
    handleAddInternship,
}) => {
    const [deletingId, setDeletingId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDelete = (itemId) => {
        setDeletingId(itemId);
        setTimeout(() => {
            handleUpdate(sectionIndex, itemId, 'delete');
            setDeletingId(null);
        }, 200);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const internships = section.internships || [];
        const oldIndex = internships.findIndex((i) => i.id === active.id);
        const newIndex = internships.findIndex((i) => i.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            handleUpdate(sectionIndex, null, "reorder", arrayMove(internships, oldIndex, newIndex));
        }
    };

    const internshipIds = (section.internships || []).map((i) => i.id);

    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 mb-4">
                Demonstrate your skills, initiative, leadership, or continuous learning
            </p>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={internshipIds} strategy={verticalListSortingStrategy}>
                    {(section.internships || []).map((item, iIndex) => (
                        <DraggableWrapper key={item.id} id={item.id}>
                            <div
                                className={`
                                    transition-all duration-200 mb-3
                                    ${deletingId === item.id ? '-translate-x-6 opacity-0' : ''}
                                `}
                            >
                                <div className="flex items-start gap-2">
                                    <span className="mt-5">
                                        <DragIcon />
                                    </span>

                                    <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                                        <AccordionPanel>
                                            <AccordionTitle className="font-semibold text-sm">
                                                {item.jobTitle?.trim()
                                                    ? `${item.jobTitle}${item.employer ? ' at ' + item.employer : ''}`
                                                    : '(Awaiting Input)'}
                                            </AccordionTitle>

                                            <AccordionContent className="pt-0">
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <Label className="!text-sm !font-medium !text-gray-500">Job Role Title</Label>
                                                        <input
                                                            value={item.jobTitle || ''}
                                                            onChange={(e) => handleUpdate(sectionIndex, item.id, 'jobTitle', e.target.value)}
                                                            className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                            placeholder="e.g. Frontend Intern"
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label className="!text-sm !font-medium !text-gray-500">Employer Name</Label>
                                                        <input
                                                            value={item.employer || ''}
                                                            onChange={(e) => handleUpdate(sectionIndex, item.id, 'employer', e.target.value)}
                                                            className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                            placeholder="e.g. Google"
                                                        />
                                                    </div>

                                                    <div className="col-span-2">
                                                        <Label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Start & End Date</Label>
                                                        <div className="flex gap-2 mt-1">
                                                            <div className="flex-1">
                                                                <Datepicker
                                                                    selectedDate={item.startDate}
                                                                    onChange={(date) => handleUpdate(sectionIndex, item.id, 'startDate', date)}
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <Datepicker
                                                                    selectedDate={item.endDate}
                                                                    onChange={(date) => handleUpdate(sectionIndex, item.id, 'endDate', date)}
                                                                    disabled={item.isCurrentlyInterning}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 mt-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`currently-interning-${item.id}`}
                                                                checked={item.isCurrentlyInterning || false}
                                                                onChange={(e) => {
                                                                    const checked = e.target.checked;
                                                                    handleUpdate(sectionIndex, item.id, 'isCurrentlyInterning', checked);
                                                                    handleUpdate(sectionIndex, item.id, 'endDate', checked ? 'Present' : '');
                                                                }}
                                                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                                                            />
                                                            <label htmlFor={`currently-interning-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                                                                I currently intern here
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-2">
                                                        <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                                                        <input
                                                            value={item.city || ''}
                                                            onChange={(e) => handleUpdate(sectionIndex, item.id, 'city', e.target.value)}
                                                            className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                            placeholder="e.g. San Francisco, CA"
                                                        />
                                                    </div>

                                                    <div className="col-span-2">
                                                        <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                                        <TipTapEditor
                                                            value={item.description || ''}
                                                            onChange={(html) => handleUpdate(sectionIndex, item.id, 'description', html)}
                                                        />
                                                    </div>
                                                </div>
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
                onClick={() => handleAddInternship(sectionIndex)}
                className="!text-sm !text-[#800080] font-medium mt-2"
            >
                + Add one more internship
            </button>
        </>
    );
};

export default ImpInternships;