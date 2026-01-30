import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { HiSparkles } from "react-icons/hi2";
import TipTapEditor from '../../editor/TipTapEditor';
import GenerateWithAiModal from '../../modal/GenerateWithAiModal';
import { HiPlus, HiMinus } from "react-icons/hi";
import { TbDragDrop } from 'react-icons/tb';
import { FaTrash } from 'react-icons/fa';


const ImpExperience = ({
  section,
  sectionIndex,
  handleExpUpdate,
  handleExpDragStart,
  handleExpDrop,
  handleAddExperience,
  draggedExpIndex,
  handleDragEnd,
}) => {
  const [activeExpId, setActiveExpId] = useState(null);
  const [deletingExpIndex, setDeletingExpIndex] = useState(null);

  const handleDeleteExperience = (eIndex, expId) => {
    setDeletingExpIndex(eIndex);

    setTimeout(() => {
      handleExpUpdate(sectionIndex, expId, "delete");
      setDeletingExpIndex(null);
    }, 500);
  };


  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Show your relevant experience (last 10 years). Use bullet points to highlight achievements.
      </p>

      {section.experiences.map((exp, eIndex) => (
        <div
          key={exp.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleExpDrop(e, sectionIndex, eIndex)}
          className={`
            transition-all duration-500 mb-3
            ${deletingExpIndex === eIndex ? "-translate-x-6 opacity-0" : ""}
          `}
        >
          <div className="flex items-start gap-2">

            <span
              className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleExpDragStart(e, eIndex)}
              onDragEnd={handleDragEnd}
            >
              <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
              <span className="tooltip">Click and drag to move</span>
            </span>

            <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
              <AccordionPanel>

                <AccordionTitle className="font-semibold text-sm">
                  {exp.jobTitle?.trim()
                    ? `${exp.jobTitle} at ${exp.company || "(Not specified)"}`
                    : "(Not specified)"}
                </AccordionTitle>

                <AccordionContent className="pt-0">

                  <div className="grid grid-cols-2 gap-4 mb-4">

                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">Job title</Label>
                      <input
                        value={exp.jobTitle}
                        onChange={(e) =>
                          handleExpUpdate(sectionIndex, exp.id, "jobTitle", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">Employer</Label>
                      <input
                        value={exp.company}
                        onChange={(e) =>
                          handleExpUpdate(sectionIndex, exp.id, "company", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">Start Date</Label>
                      <input
                        value={exp.startDate}
                        onChange={(e) =>
                          handleExpUpdate(sectionIndex, exp.id, "startDate", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">End Date</Label>
                      <input
                        value={exp.endDate}
                        onChange={(e) =>
                          handleExpUpdate(sectionIndex, exp.id, "endDate", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                      <input
                        value={exp.city}
                        onChange={(e) =>
                          handleExpUpdate(sectionIndex, exp.id, "city", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                    <TipTapEditor
                      value={exp.description}
                      onChange={(html) =>
                        handleExpUpdate(sectionIndex, exp.id, "description", html)
                      }
                    />
                    <div className="relative flex justify-end mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveExpId(exp.id);
                        }}
                        className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080]"
                      >
                        <HiSparkles className="text-md" />
                        Get help with writing
                      </button>
                      {activeExpId === exp.id && (
                        <GenerateWithAiModal
                          open={true}
                          onClose={() => setActiveExpId(null)}
                          aiType="imp_experience"
                          initialText={exp.description || ""}
                          onApply={(text) => {
                            handleExpUpdate(sectionIndex, exp.id, "description", text);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
            <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
              <FaTrash
                className="
            text-sm text-gray-400 cursor-pointer
            hover:text-red-500
            transition-colors
          "
                title="Delete this employment"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteExperience(eIndex, exp.id);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => handleAddExperience(sectionIndex)}
        className="!text-sm !text-[#800080] font-medium mt-2"
      >
        + Add one more employment
      </button>
    </>
  );
};

export default ImpExperience;