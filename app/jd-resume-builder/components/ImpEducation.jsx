import { useState } from "react";
import { Label } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import TipTapEditor from "../../editor/TipTapEditor";
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
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from "flowbite-react";

const ImpEducation = ({
  section,
  sectionIndex,
  handleEducationUpdate,
  handleAddEducation,
}) => {
  const [deletingId, setDeletingId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDeleteEducation = (eduId) => {
    setDeletingId(eduId);
    setTimeout(() => {
      handleEducationUpdate(sectionIndex, eduId, "delete");
      setDeletingId(null);
    }, 200);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const educations = section.educations || [];
    const oldIndex = educations.findIndex((e) => e.id === active.id);
    const newIndex = educations.findIndex((e) => e.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      handleEducationUpdate(sectionIndex, null, "reorder", arrayMove(educations, oldIndex, newIndex));
    }
  };

  const educationIds = (section.educations || []).map((e) => e.id);

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 pb-2">
        Mention all the Educational details below.
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={educationIds} strategy={verticalListSortingStrategy}>
          {section.educations.map((edu, eIndex) => (
            <DraggableWrapper key={edu.id} id={edu.id}>
              <div
                className={`
                  transition-all duration-200 mb-3
                  ${deletingId === edu.id ? "-translate-x-6 opacity-0" : ""}
                `}
              >
                <div className="flex items-start gap-2">

                  <span className="mt-5">
                    <DragIcon />
                  </span>

                  <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                    <AccordionPanel>
                      <AccordionTitle className="font-semibold text-sm">
                        {edu.institute?.trim() ? edu.institute : "(Awaiting Input)"}
                      </AccordionTitle>

                      <AccordionContent className="pt-0">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="!text-sm !font-medium !text-gray-500">School/College</Label>
                            <input
                              value={edu.institute}
                              onChange={(e) => handleEducationUpdate(sectionIndex, edu.id, "institute", e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div>
                            <Label className="!text-sm !font-medium !text-gray-500">Degree</Label>
                            <input
                              value={edu.degree}
                              onChange={(e) => handleEducationUpdate(sectionIndex, edu.id, "degree", e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label className="block text-xs font-semibold !text-gray-500 mb-1">Start & End Date</Label>
                            <div className="flex gap-2 mt-1">
                              <div className="flex-1">
                                <Datepicker
                                  selectedDate={edu.startDate}
                                  onChange={(date) => handleEducationUpdate(sectionIndex, edu.id, "startDate", date)}
                                />
                              </div>
                              <div className="flex-1">
                                <Datepicker
                                  selectedDate={edu.endDate}
                                  onChange={(date) => handleEducationUpdate(sectionIndex, edu.id, "endDate", date)}
                                  disabled={edu.isCurrentlyStudying}
                                />
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="checkbox"
                                id={`currently-studying-${edu.id}`}
                                checked={edu.isCurrentlyStudying || false}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  handleEducationUpdate(sectionIndex, edu.id, "isCurrentlyStudying", isChecked);
                                  handleEducationUpdate(sectionIndex, edu.id, "endDate", isChecked ? 'PRESENT' : '');
                                }}
                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                              />
                              <label htmlFor={`currently-studying-${edu.id}`} className="text-sm text-gray-700 cursor-pointer">
                                I currently study here
                              </label>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                            <input
                              value={edu.city}
                              onChange={(e) => handleEducationUpdate(sectionIndex, edu.id, "city", e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                          <TipTapEditor
                            placeholder="e.g. Graduated with High Honors."
                            value={edu.description}
                            onChange={(html) => handleEducationUpdate(sectionIndex, edu.id, "description", html)}
                          />
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
                        handleDeleteEducation(edu.id);
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
        onClick={() => handleAddEducation(sectionIndex)}
        className="!text-sm !text-[#800080] font-medium mt-2"
      >
        + Add one more education
      </button>
    </>
  );
};

export default ImpEducation;