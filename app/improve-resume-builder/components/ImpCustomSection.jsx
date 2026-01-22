import React, { useState } from "react";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import { HiSparkles } from "react-icons/hi2";
import TipTapEditor from "../../editor/TipTapEditor";

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
    return (
        <>
            {section.items.map((item, idx) => (
                <div
                    key={item.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleCustomDrop(e, sectionIndex, idx)}
                    className="mb-3"
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

                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">Start Date</Label>
                                            <input
                                                className="w-full border p-2 rounded"
                                                value={item.startDate}
                                                onChange={(e) =>
                                                    handleCustomUpdate(sectionIndex, item.id, "startDate", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">End Date</Label>
                                            <input
                                                className="w-full border p-2 rounded"
                                                value={item.endDate}
                                                onChange={(e) =>
                                                    handleCustomUpdate(sectionIndex, item.id, "endDate", e.target.value)
                                                }
                                            />
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
                                    </div>

                                    <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                    <TipTapEditor
                                        value={item.description}
                                        onChange={(html) =>
                                            handleCustomUpdate(sectionIndex, item.id, "description", html)
                                        }
                                    />

                                </AccordionContent>
                            </AccordionPanel>
                        </Accordion>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() => handleAddCustomItem(sectionIndex)}
                className="!text-sm !text-[#800080] mt-2"
            >
                + Add one more item
            </button>
        </>
    );
};

export default ImpCustomSection;
