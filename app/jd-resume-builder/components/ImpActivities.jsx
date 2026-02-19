'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from 'react-icons/tb';
import { FaTrash } from 'react-icons/fa';
import Datepicker from '../../ui/Datepicker';
import TipTapEditor from '../../editor/TipTapEditor';

const ImpActivities = ({
    section,
    sectionIndex,
    handleUpdate,
    handleDragStart,
    handleDrop,
    handleAddActivity,
    draggedIndex,
    handleDragEnd,
}) => {
    const [deletingIndex, setDeletingIndex] = useState(null);

    const handleDelete = (index, itemId) => {
        setDeletingIndex(index);
        setTimeout(() => {
            handleUpdate(sectionIndex, itemId, 'delete');
            setDeletingIndex(null);
        }, 500);
    };

    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 mb-4">
                Show your extra-curricular activities. Use bullet points to highlight achievements.
            </p>

            {(section.activities || []).map((item, aIndex) => (
                <div
                    key={item.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, sectionIndex, aIndex)}
                    className={`
                        transition-all duration-500 mb-3
                        ${deletingIndex === aIndex ? '-translate-x-6 opacity-0' : ''}
                    `}
                >
                    <div className="flex items-start gap-2">
                        <span
                            className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, aIndex)}
                            onDragEnd={handleDragEnd}
                        >
                            <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                        </span>

                        <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                            <AccordionPanel>
                                <AccordionTitle className="font-semibold text-sm">
                                    {item.functionTitle?.trim()
                                        ? `${item.functionTitle}${item.employer ? ' at ' + item.employer : ''}`
                                        : '(Not specified)'}
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
                                                    <Datepicker
                                                        selectedDate={item.endDate}
                                                        onChange={(date) => handleUpdate(sectionIndex, item.id, 'endDate', date)}
                                                        disabled={item.isCurrentlyActive}
                                                    />
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
                                    handleDelete(aIndex, item.id);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}

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