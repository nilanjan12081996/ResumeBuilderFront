import React, { useState } from "react";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label, Modal } from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import { BiCustomize, BiBriefcase, BiAward } from "react-icons/bi";
import { MdLocalFlorist, MdVolunteerActivism, MdCardMembership } from "react-icons/md";
import { FaChessKnight, FaLanguage, FaCertificate } from "react-icons/fa6";
import { HiSpeakerphone, HiAcademicCap } from "react-icons/hi";
import TipTapEditor from "../../editor/TipTapEditor";
import { FaTrash } from "react-icons/fa";
import Datepicker from "../../ui/Datepicker";

const ImpCustomSection = ({
    section,
    sectionIndex,
    handleCustomUpdate,
    handleCustomDragStart,
    handleCustomDrop,
    handleAddCustomItem,
    draggedIndex,
    handleDragEnd
}) => {

    const [deletingIndex, setDeletingIndex] = useState(null);
    const handleDeleteItem = (idx, itemId) => {
        setDeletingIndex(idx);

        setTimeout(() => {
            handleCustomUpdate(sectionIndex, itemId, "delete");
            setDeletingIndex(null);
        }, 500);
    };
    return (
        <>
            {/* Existing Items */}
            {section.items.map((item, idx) => (
                <div
                    key={item.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleCustomDrop(e, sectionIndex, idx)}
                    className={`
                        mb-3 transition-all duration-500
                        ${deletingIndex === idx ? "-translate-x-6 opacity-0" : ""}
                    `}
                >
                    <div className="flex gap-2">
                        <span
                            draggable
                            onDragStart={(e) => handleCustomDragStart(e, idx)}
                            onDragEnd={handleDragEnd}
                            className="mt-5 cursor-grab"
                        >
                            <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                            <span className="tooltip">Click and drag to move</span>
                        </span>

                        <Accordion className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                            <AccordionPanel>
                                <AccordionTitle className="!text-sm !font-semibold">
                                    {item.title || "(Not specified)"}
                                </AccordionTitle>

                                <AccordionContent>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="col-span-2">
                                            <Label className="!text-sm !font-medium !text-gray-500">Title</Label>
                                            <input
                                                className="w-full border p-2 rounded"
                                                value={item.title}
                                                onChange={(e) =>
                                                    handleCustomUpdate(sectionIndex, item.id, "title", e.target.value)
                                                }
                                            />
                                        </div>

                                        {/* Date Section */}
                                        <div className="md:col-span-2">
                                           <Label className="!text-sm !font-medium !text-gray-500">Start & End Date</Label>
                                            <div className="flex gap-2 mt-1">
                                                <div className="flex-1">
                                                    <Datepicker
                                                        selectedDate={item.startDate}
                                                        onChange={(date) => handleCustomUpdate(sectionIndex, item.id, "startDate", date)}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <Datepicker
                                                        selectedDate={item.endDate}
                                                        onChange={(date) => handleCustomUpdate(sectionIndex, item.id, "endDate", date)}
                                                        disabled={item.isOngoing}
                                                    />
                                                </div>
                                            </div>

                                            {/* Ongoing Checkbox */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <input
                                                    type="checkbox"
                                                    id={`ongoing-custom-${item.id}`}
                                                    checked={item.isOngoing || false}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        handleCustomUpdate(sectionIndex, item.id, "isOngoing", isChecked);
                                                        handleCustomUpdate(sectionIndex, item.id, "endDate", isChecked ? 'PRESENT' : '');
                                                    }}
                                                    className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                                                />
                                                <label htmlFor={`ongoing-custom-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                                                    Ongoing (Present)
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-span-2">
                                            <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                                            <input
                                                className="w-full border p-2 rounded"
                                                value={item.city}
                                                onChange={(e) =>
                                                    handleCustomUpdate(sectionIndex, item.id, "city", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                            <TipTapEditor
                                                value={item.description}
                                                onChange={(html) =>
                                                    handleCustomUpdate(sectionIndex, item.id, "description", html)
                                                }
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
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteItem(idx, item.id);
                                }}
                            />
                        </div>
                    </div>
                </div>
            ))}

            {/* Add Item Button */}
            <button
                type="button"
                onClick={() => handleAddCustomItem(sectionIndex)}
                className="text-sm !text-[#800080] font-medium mt-2"
            >
                + Add one more item
            </button>
        </>
    );
};

export default ImpCustomSection;