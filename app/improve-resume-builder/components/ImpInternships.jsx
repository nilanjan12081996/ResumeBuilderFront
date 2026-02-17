'use client';
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from 'react-icons/tb';
import { FaTrash } from 'react-icons/fa';
import Datepicker from '../../ui/Datepicker';
import TipTapEditor from '../../editor/TipTapEditor';

const ImpInternships = ({
    section,
    sectionIndex,
    handleUpdate,
    handleDragStart,
    handleDrop,
    handleAddInternship,
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
                Show your relevant internship experience. Use bullet points to highlight achievements.
            </p>

            {(section.internships || []).map((item, iIndex) => (
                <div
                    key={item.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, sectionIndex, iIndex)}
                    className={`
                        transition-all duration-500 mb-3
                        ${deletingIndex === iIndex ? '-translate-x-6 opacity-0' : ''}
                    `}
                >
                    <div className="flex items-start gap-2">
                        <span
                            className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, iIndex)}
                            onDragEnd={handleDragEnd}
                        >
                            <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                        </span>

                        <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                            <AccordionPanel>
                                <AccordionTitle className="font-semibold text-sm">
                                    {item.jobTitle?.trim()
                                        ? `${item.jobTitle}${item.employer ? ' at ' + item.employer : ''}`
                                        : '(Not specified)'}
                                </AccordionTitle>

                                <AccordionContent className="pt-0">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">Job Title</Label>
                                            <input
                                                value={item.jobTitle || ''}
                                                onChange={(e) => handleUpdate(sectionIndex, item.id, 'jobTitle', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
                                                placeholder="e.g. Frontend Intern"
                                            />
                                        </div>

                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">Employer</Label>
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
                                    handleDelete(iIndex, item.id);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}

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