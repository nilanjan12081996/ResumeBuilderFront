import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from 'react-icons/tb';
import { FaTrash } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";

const LinkedInEducation = ({
  section,
  sectionIndex,
  handleEducationUpdate,
  handleEducationDragStart,
  handleEducationDrop,
  handleAddEducation,
  draggedEducationIndex,
  handleDragEnd,
}) => {
  const [deletingEduIndex, setDeletingEduIndex] = useState(null);

  const handleDeleteEducation = (eIndex, eduId) => {
    setDeletingEduIndex(eIndex);

    setTimeout(() => {
      handleEducationUpdate(sectionIndex, eduId, "delete");
      setDeletingEduIndex(null);
    }, 500);
  };

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Add your educational background including school name, degree, and field of study.
      </p>

      {section.educations.map((edu, eIndex) => (
        <div
          key={edu.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleEducationDrop(e, sectionIndex, eIndex)}
          className={`
            transition-all duration-500 mb-3
            ${deletingEduIndex === eIndex ? "-translate-x-6 opacity-0" : ""}
          `}
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

            <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
              <AccordionPanel>
                <AccordionTitle className="font-semibold text-sm">
                  {edu.institute?.trim()
                    ? `${edu.institute} - ${edu.degree || "(Awaiting Input)"}`
                    : "(Awaiting Input)"}
                </AccordionTitle>

                <AccordionContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">School</Label>
                      <input
                        value={edu.institute}
                        onChange={(e) =>
                          handleEducationUpdate(sectionIndex, edu.id, "institute", e.target.value)
                        }
                        placeholder="School name"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Degree</Label>
                      <input
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationUpdate(sectionIndex, edu.id, "degree", e.target.value)
                        }
                        placeholder="e.g., Bachelor's degree, Computer Science"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    <div className='md:col-span-2'>
                      <Label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                        Start & End Date
                      </Label>
                      <div className='flex gap-2 mt-1'>
                        <div className="flex-1">
                          <Datepicker
                            selectedDate={edu.startDate}
                            onChange={(date) =>
                              handleEducationUpdate(sectionIndex, edu.id, "startDate", date)
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <Datepicker
                            selectedDate={edu.endDate}
                            onChange={(date) =>
                              handleEducationUpdate(sectionIndex, edu.id, "endDate", date)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">Location</Label>
                      <input
                        value={edu.city}
                        onChange={(e) =>
                          handleEducationUpdate(sectionIndex, edu.id, "city", e.target.value)
                        }
                        placeholder="City, Country"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>

            <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
              <FaTrash
                className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                title="Delete this education"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteEducation(eIndex, edu.id);
                }}
              />
            </div>
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

export default LinkedInEducation;