'use client'
import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import TipTapEditor from '../../editor/TipTapEditor';
import { TbDragDrop } from 'react-icons/tb';
import { FaTrash } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";


const ImpCertifications = ({
  section,
  sectionIndex,
  handleCertUpdate,
  handleCertDragStart,
  handleCertDrop,
  handleAddCertification,
  draggedCertIndex,
  handleDragEnd
}) => {

  const [openIndex, setOpenIndex] = useState(null);
  const [deletingCertIndex, setDeletingCertIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const handleDeleteCert = (certIndex, certId) => {
    setDeletingCertIndex(certIndex);

    setTimeout(() => {
      handleCertUpdate(sectionIndex, certId, "delete");
      setDeletingCertIndex(null);
    }, 500);
  };

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Certifications can strengthen your profile by highlighting verified skills.
      </p>

      {section.certifications.map((cert, cIndex) => (
        <div
          key={cert.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleCertDrop(e, sectionIndex, cIndex)}
          className={`
          transition-all duration-500 mb-3
          ${deletingCertIndex === cIndex ? "-translate-x-6 opacity-0" : ""}
        `}
        >
          <div className="flex items-start gap-2">

            <span
              className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleCertDragStart(e, cIndex)}
              onDragEnd={handleDragEnd}
            >
              <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
              <span className="tooltip">Click and drag to move</span>
            </span>

            <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
              <AccordionPanel>

                <AccordionTitle className="font-semibold text-sm">
                  {cert.name?.trim() ? cert.name : "(Not specified)"}
                </AccordionTitle>

                <AccordionContent className="pt-0">

                  <div className="grid grid-cols-2 gap-4 mb-4">

                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">
                        Activity name, job title, book title etc.
                      </Label>
                      <input
                        type='text'
                        value={cert.name}
                        onChange={(e) =>
                          handleCertUpdate(sectionIndex, cert.id, "name", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                      <input
                        value={cert.city}
                        onChange={(e) =>
                          handleCertUpdate(sectionIndex, cert.id, "city", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    {/* Date Section */}
                    <div className='md:col-span-2'>
                      <Label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Start & End Date</Label>
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

                      {/* Ongoing Checkbox */}
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

                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">End Year</Label>
                      <input
                        value={cert.endYear}
                        onChange={(e) =>
                          handleCertUpdate(sectionIndex, cert.id, "endYear", e.target.value)
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                    <TipTapEditor
                      value={cert.description}
                      onChange={(e) =>
                        handleCertUpdate(sectionIndex, cert.id, "description", e.target.value)
                      }
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
                  handleDeleteCert(cIndex, cert.id);
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => handleAddCertification(sectionIndex)}
        className="text-sm !text-[#800080] font-medium mt-2"
      >
        + Add one more item
      </button>
    </>
  );
};

export default ImpCertifications;