'use client'
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import TipTapEditor from '../../editor/TipTapEditor';
import { FaTrash } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";
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

const ImpCertifications = ({
  section,
  sectionIndex,
  handleCertUpdate,
  handleAddCertification,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDeleteCert = (certId) => {
    setDeletingId(certId);
    setTimeout(() => {
      handleCertUpdate(sectionIndex, certId, "delete");
      setDeletingId(null);
    }, 200);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const certifications = section.certifications || [];
    const oldIndex = certifications.findIndex((c) => c.id === active.id);
    const newIndex = certifications.findIndex((c) => c.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      handleCertUpdate(sectionIndex, null, "reorder", arrayMove(certifications, oldIndex, newIndex));
    }
  };

  const certIds = (section.certifications || []).map((c) => c.id);

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Certifications can strengthen your profile by highlighting verified skills.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={certIds} strategy={verticalListSortingStrategy}>
          {section.certifications.map((cert, cIndex) => (
            <DraggableWrapper key={cert.id} id={cert.id}>
              <div
                className={`
                  transition-all duration-200 mb-3
                  ${deletingId === cert.id ? "-translate-x-6 opacity-0" : ""}
                `}
              >
                <div className="flex items-start gap-2">

                  <span className="mt-5">
                    <DragIcon />
                  </span>

                  <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                    <AccordionPanel>

                      <AccordionTitle className="font-semibold text-sm">
                        {cert.name?.trim() ? cert.name : "(Awaiting Input)"}
                      </AccordionTitle>

                      <AccordionContent className="pt-0">

                        <div className="grid grid-cols-2 gap-4 mb-4">

                          <div>
                            <Label className="!text-sm !font-medium !text-gray-500">
                              Certificate title
                            </Label>
                            <input
                              type='text'
                              value={cert.name}
                              onChange={(e) => handleCertUpdate(sectionIndex, cert.id, "name", e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div>
                            <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                            <input
                              value={cert.city}
                              onChange={(e) => handleCertUpdate(sectionIndex, cert.id, "city", e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div className='md:col-span-2'>
                            <Label className="block text-xs font-semibold !text-gray-500 mb-1">Start & End Date</Label>
                            <div className='flex gap-2 mt-1'>
                              <div className="flex-1">
                                <Datepicker
                                  selectedDate={cert.startYear}
                                  onChange={(date) => handleCertUpdate(sectionIndex, cert.id, "startYear", date)}
                                />
                              </div>
                              <div className="flex-1">
                                <Datepicker
                                  selectedDate={cert.endYear}
                                  onChange={(date) => handleCertUpdate(sectionIndex, cert.id, "endYear", date)}
                                  disabled={cert.isOngoing}
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="checkbox"
                                id={`ongoing-cert-${cert.id}`}
                                checked={cert.isOngoing || false}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  handleCertUpdate(sectionIndex, cert.id, "isOngoing", isChecked);
                                  handleCertUpdate(sectionIndex, cert.id, "endYear", isChecked ? 'PRESENT' : '');
                                }}
                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                              />
                              <label htmlFor={`ongoing-cert-${cert.id}`} className="text-sm text-gray-700 cursor-pointer">
                                This certification does not expire / Ongoing
                              </label>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                          <TipTapEditor
                            value={cert.description}
                            onChange={(html) => handleCertUpdate(sectionIndex, cert.id, "description", html)}
                          />
                        </div>

                      </AccordionContent>
                    </AccordionPanel>
                  </Accordion>

                  <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
                    <FaTrash
                      className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteCert(cert.id);
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
        onClick={() => handleAddCertification(sectionIndex)}
        className="text-sm !text-[#800080] font-medium mt-2"
      >
        + Add one more Certificate
      </button>
    </>
  );
};

export default ImpCertifications;