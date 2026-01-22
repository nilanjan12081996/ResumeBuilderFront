import React from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import TipTapEditor from '../../editor/TipTapEditor';
import { TbDragDrop } from 'react-icons/tb';


const ImpEducation = ({
    section,
    sectionIndex,
    handleEducationUpdate,
    handleEducationDragStart,
    handleEducationDrop,
    handleAddEducation,
    draggedEducationIndex,
    handleDragEnd
}) => {
    return (
        <>
            <p className="!text-sm !font-medium !text-gray-500 pb-2">
                A varied education on your resume sums up the value that your learnings
                and background will bring to job.
            </p>

            {section.educations.map((edu, eIndex) => (
                <div
                    key={edu.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleEducationDrop(e, sectionIndex, eIndex)}
                    className="transition-all duration-200 rounded-sm mb-3"
                >
                    <div className="flex items-start gap-2">
                        <span
                            className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleEducationDragStart(e, eIndex)}
                            onDragEnd={handleDragEnd}
                        >
                            <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                            <span className="tooltip">Click and drag to move</span>
                        </span>
                        <Accordion
                            collapseAll
                            className="w-full overflow-hidden !border !border-gray-300 rounded-lg"
                        >
                            <AccordionPanel>
                                <AccordionTitle className="font-semibold text-sm">
                                    {edu.institute?.trim() ? edu.institute : "(Not specified)"}
                                </AccordionTitle>
                                <AccordionContent className="pt-0">
                                    <div className="grid grid-cols-2 gap-4 mb-4">

                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">School</Label>
                                            <input
                                                value={edu.institute}
                                                onChange={(e) =>
                                                    handleEducationUpdate(sectionIndex, edu.id, "institute", e.target.value)
                                                }
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">Degree</Label>
                                            <input
                                                value={edu.degree}
                                                onChange={(e) =>
                                                    handleEducationUpdate(sectionIndex, edu.id, "degree", e.target.value)
                                                }
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">Start Date</Label>
                                            <input
                                                placeholder="MM / YYYY"
                                                value={edu.startDate}
                                                onChange={(e) =>
                                                    handleEducationUpdate(sectionIndex, edu.id, "startDate", e.target.value)
                                                }
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                            />
                                        </div>

                                        <div>
                                            <Label className="!text-sm !font-medium !text-gray-500">End Date</Label>
                                            <input
                                                placeholder="MM / YYYY"
                                                value={edu.endDate}
                                                onChange={(e) =>
                                                    handleEducationUpdate(sectionIndex, edu.id, "endDate", e.target.value)}
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                                            <input
                                                value={edu.city}
                                                onChange={(e) =>
                                                    handleEducationUpdate(sectionIndex, edu.id, "city", e.target.value)}
                                                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                            />
                                        </div>

                                    </div>

                                    <div>
                                        <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                        <TipTapEditor
                                            placeholder="e.g. Graduated with High Honors."
                                            value={edu.description}
                                            onChange={(html) =>
                                                handleEducationUpdate(sectionIndex, edu.id, "description", html)
                                            }
                                        />

                                    </div>

                                </AccordionContent>
                            </AccordionPanel>
                        </Accordion>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() => handleAddEducation(sectionIndex)}
                className="!text-sm !text-[#800080] font-medium mt-2"
            >
                + Add one more education
            </button>
        </>
    );
};

export default ImpEducation;