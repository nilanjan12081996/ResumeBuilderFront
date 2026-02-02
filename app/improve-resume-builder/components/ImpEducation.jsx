// import React from "react";
// import {
//   Accordion,
//   AccordionPanel,
//   AccordionTitle,
//   AccordionContent,
//   Label,
// } from "flowbite-react";
// import { RiDraggable } from "react-icons/ri";
// import TipTapEditor from "../../editor/TipTapEditor";

// const ImpEducation = ({
//   section,
//   sectionIndex,
//   handleEducationUpdate,
//   handleEducationDragStart,
//   handleEducationDrop,
//   handleAddEducation,
//   draggedEducationIndex,
//   handleDragEnd,
// }) => {
//   return (
//     <>
//       <p className="!text-sm !font-medium !text-gray-500 pb-2">
//         A varied education on your resume sums up the value that your learnings
//         and background will bring to job.
//       </p>

//       {section.educations.map((edu, eIndex) => (
//         <div
//           key={edu.id}
//           onDragOver={(e) => e.preventDefault()}
//           onDrop={(e) => handleEducationDrop(e, sectionIndex, eIndex)}
//           className="transition-all duration-200 rounded-sm mb-3"
//         >
//           <div className="flex items-start gap-2">
//             <span
//               className="drag-wrapper mt-5 cursor-grab active:cursor-grabbing"
//               draggable
//               onDragStart={(e) => handleEducationDragStart(e, eIndex)}
//               onDragEnd={handleDragEnd}
//             >
//               <RiDraggable className="text-xl text-[#656e83] hover:text-[#800080]" />
//               <span className="tooltip">Click and drag to move</span>
//             </span>
//             <Accordion
//               collapseAll
//               className="w-full overflow-hidden !border !border-gray-300 rounded-lg"
//             >
//               <AccordionPanel>
//                 <AccordionTitle className="font-semibold text-sm">
//                   {edu.institute?.trim() ? edu.institute : "(Not specified)"}
//                 </AccordionTitle>
//                 <AccordionContent className="pt-0">
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <Label className="!text-sm !font-medium !text-gray-500">
//                         School
//                       </Label>
//                       <input
//                         value={edu.institute}
//                         onChange={(e) =>
//                           handleEducationUpdate(
//                             sectionIndex,
//                             edu.id,
//                             "institute",
//                             e.target.value,
//                           )
//                         }
//                         className="w-full rounded-md border border-gray-300 p-2 text-sm"
//                       />
//                     </div>

//                     <div>
//                       <Label className="!text-sm !font-medium !text-gray-500">
//                         Degree
//                       </Label>
//                       <input
//                         value={edu.degree}
//                         onChange={(e) =>
//                           handleEducationUpdate(
//                             sectionIndex,
//                             edu.id,
//                             "degree",
//                             e.target.value,
//                           )
//                         }
//                         className="w-full rounded-md border border-gray-300 p-2 text-sm"
//                       />
//                     </div>

//                     <div>
//                       <Label className="!text-sm !font-medium !text-gray-500">
//                         Start Date
//                       </Label>
//                       <input
//                         placeholder="MM / YYYY"
//                         value={edu.startDate}
//                         onChange={(e) =>
//                           handleEducationUpdate(
//                             sectionIndex,
//                             edu.id,
//                             "startDate",
//                             e.target.value,
//                           )
//                         }
//                         className="w-full rounded-md border border-gray-300 p-2 text-sm"
//                       />
//                     </div>

//                     <div>
//                       <Label className="!text-sm !font-medium !text-gray-500">
//                         End Date
//                       </Label>
//                       <input
//                         placeholder="MM / YYYY"
//                         value={edu.endDate}
//                         onChange={(e) =>
//                           handleEducationUpdate(
//                             sectionIndex,
//                             edu.id,
//                             "endDate",
//                             e.target.value,
//                           )
//                         }
//                         className="w-full rounded-md border border-gray-300 p-2 text-sm"
//                       />
//                     </div>

//                     <div className="col-span-2">
//                       <Label className="!text-sm !font-medium !text-gray-500">
//                         City
//                       </Label>
//                       <input
//                         value={edu.city}
//                         onChange={(e) =>
//                           handleEducationUpdate(
//                             sectionIndex,
//                             edu.id,
//                             "city",
//                             e.target.value,
//                           )
//                         }
//                         className="w-full rounded-md border border-gray-300 p-2 text-sm"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <Label className="!text-sm !font-medium !text-gray-500">
//                       Description
//                     </Label>
//                     <TipTapEditor
//                       placeholder="e.g. Graduated with High Honors."
//                       value={edu.description}
//                       onChange={(html) =>
//                         handleEducationUpdate(
//                           sectionIndex,
//                           edu.id,
//                           "description",
//                           html,
//                         )
//                       }
//                     />
//                   </div>
//                 </AccordionContent>
//               </AccordionPanel>
//             </Accordion>
//           </div>
//         </div>
//       ))}

//       <button
//         type="button"
//         onClick={() => handleAddEducation(sectionIndex)}
//         className="!text-sm !text-[#800080] font-medium mt-2"
//       >
//         + Add one more education
//       </button>
//     </>
//   );
// };

// export default ImpEducation;

import { useState } from "react";
import { Label } from "flowbite-react";
import { TbDragDrop } from 'react-icons/tb';;
import { FaPlus, FaMinus } from "react-icons/fa6";
import TipTapEditor from "../../editor/TipTapEditor";
import { FaTrash } from "react-icons/fa";
import Datepicker from "../../ui/Datepicker";

const ImpEducation = ({
  section,
  sectionIndex,
  handleEducationUpdate,
  handleEducationDragStart,
  handleEducationDrop,
  handleAddEducation,
  draggedEducationIndex,
  handleDragEnd,
}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };


  const [deletingEduIndex, setDeletingEduIndex] = useState(null);

  const handleDeleteEducation = (eduIndex, eduId) => {
    setDeletingEduIndex(eduIndex);

    setTimeout(() => {
      handleEducationUpdate(sectionIndex, eduId, "delete");
      setDeletingEduIndex(null);
    }, 500);
  };

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
          className={`
            transition-all duration-500 mb-3
            ${deletingEduIndex === eIndex ? "-translate-x-6 opacity-0" : ""}
          `}
        >
          <div className="flex items-start gap-2">
            {/* DRAG ICON */}
            <span
              className="mt-5 cursor-grab active:cursor-grabbing"
              draggable
              onDragStart={(e) => handleEducationDragStart(e, eIndex)}
              onDragEnd={handleDragEnd}
            >
              <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
            </span>

            {/* ACCORDION */}
            <div className="w-full !border !border-gray-300 rounded-lg overflow-hidden">
              {/* HEADER */}
              <button
                type="button"
                onClick={() => toggle(eIndex)}
                className="w-full flex items-center justify-between p-4 text-left font-medium"
              >
                <span className="text-sm font-semibold">
                  {edu.institute?.trim() ? edu.institute : "(Not specified)"}
                </span>

                {openIndex === eIndex ? (
                  <FaMinus className="h-4 w-4 text-[#800080]" />
                ) : (
                  <FaPlus className="h-4 w-4 text-[#800080]" />
                )}
              </button>

              {/* CONTENT */}
              {openIndex === eIndex && (
                <div className="px-4 pb-4 pt-0">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">
                        School
                      </Label>
                      <input
                        value={edu.institute}
                        onChange={(e) =>
                          handleEducationUpdate(
                            sectionIndex,
                            edu.id,
                            "institute",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="!text-sm !font-medium !text-gray-500">
                        Degree
                      </Label>
                      <input
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationUpdate(
                            sectionIndex,
                            edu.id,
                            "degree",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>

                    {/* Date Section */}
                    <div className="md:col-span-2">
                      <Label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Start & End Date</Label>
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

                      {/* Currently Studying Checkbox */}
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
                      <Label className="!text-sm !font-medium !text-gray-500">
                        City
                      </Label>
                      <input
                        value={edu.city}
                        onChange={(e) =>
                          handleEducationUpdate(
                            sectionIndex,
                            edu.id,
                            "city",
                            e.target.value,
                          )
                        }
                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="!text-sm !font-medium !text-gray-500">
                      Description
                    </Label>
                    <TipTapEditor
                      placeholder="e.g. Graduated with High Honors."
                      value={edu.description}
                      onChange={(html) =>
                        handleEducationUpdate(
                          sectionIndex,
                          edu.id,
                          "description",
                          html,
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>
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

export default ImpEducation;
