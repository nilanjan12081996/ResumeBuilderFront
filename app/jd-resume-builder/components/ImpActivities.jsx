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

const ImpActivities = ({
    section,
    sectionIndex,
    handleUpdate,
    handleAddActivity,
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
        const activities = section.activities || [];
        const oldIndex = activities.findIndex((a) => a.id === active.id);
        const newIndex = activities.findIndex((a) => a.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            handleUpdate(sectionIndex, null, "reorder", arrayMove(activities, oldIndex, newIndex));
        }
    };

    const activityIds = (section.activities || []).map((a) => a.id);

    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 mb-4">
                Show your extra-curricular activities. Use bullet points to highlight achievements.
            </p>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={activityIds} strategy={verticalListSortingStrategy}>
                    {(section.activities || []).map((item) => (
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
                                                {item.functionTitle?.trim()
                                                    ? `${item.functionTitle}${item.employer ? ' at ' + item.employer : ''}`
                                                    : '(Awaiting Input)'}
                                            </AccordionTitle>

                                            <AccordionContent className="pt-0">
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <Label className="!text-sm !font-medium !text-gray-500">Function Title</Label>
                                                        <input
                                                            value={item.functionTitle || ''}
                                                            onChange={(e) => handleUpdate(sectionIndex, item.id, 'functionTitle', e.target.value)}
                                                            className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                            placeholder="e.g. Volunteer"
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label className="!text-sm !font-medium !text-gray-500">Employer</Label>
                                                        <input
                                                            value={item.employer || ''}
                                                            onChange={(e) => handleUpdate(sectionIndex, item.id, 'employer', e.target.value)}
                                                            className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                            placeholder="e.g. Red Cross"
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
                                                                {item.isCurrentlyActive ? (
                                                                    <input
                                                                        value="Present"
                                                                        disabled
                                                                        className="w-full rounded-md border border-gray-300 p-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                                                                    />
                                                                ) : (
                                                                    <Datepicker
                                                                        selectedDate={item.endDate}
                                                                        onChange={(date) => handleUpdate(sectionIndex, item.id, 'endDate', date)}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 mt-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`currently-active-${item.id}`}
                                                                checked={item.isCurrentlyActive || false}
                                                                onChange={(e) => {
                                                                    const checked = e.target.checked;
                                                                    handleUpdate(sectionIndex, item.id, 'isCurrentlyActive', checked);
                                                                    handleUpdate(sectionIndex, item.id, 'endDate', checked ? 'Present' : '');
                                                                }}
                                                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080]"
                                                            />
                                                            <label htmlFor={`currently-active-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                                                                I currently participate here
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                                                        <input
                                                            value={item.city || ''}
                                                            onChange={(e) => handleUpdate(sectionIndex, item.id, 'city', e.target.value)}
                                                            className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                            placeholder="e.g. London"
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
                onClick={() => handleAddActivity(sectionIndex)}
                className="!text-sm !text-[#800080] font-medium mt-2"
            >
                + Add one more activity
            </button>
        </>
    );
};

export default ImpActivities;