import React, { useState } from 'react';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { HiSparkles } from "react-icons/hi2";
import TipTapEditor from '../../editor/TipTapEditor';
import GenerateWithAiModal from '../../modal/GenerateWithAiModal';
import { FaTrash } from 'react-icons/fa';
import Datepicker from "../../ui/Datepicker";
import { useSelector } from 'react-redux';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import DraggableWrapper from "../DraggableWrapper";
import DragIcon from "../DragIcon";

const LinkedInExperience = ({
  section,
  sectionIndex,
  handleExpUpdate,
  handleAddExperience,
  onAtsRefresh,
  aiExpCount,        // ← new
  onUseAiCount,      // ← new
}) => {
  const [activeExpId, setActiveExpId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { extracteResumeData } = useSelector((state) => state?.dash);
  const { singleResumeInfo } = useSelector((state) => state?.resume);

  const resumeSource =
    singleResumeInfo?.data?.data ||
    extracteResumeData?.resume_data ||
    null;

  const handleDeleteExperience = (expId) => {
    setDeletingId(expId);
    setTimeout(() => {
      handleExpUpdate(sectionIndex, expId, "delete");
      setDeletingId(null);
    }, 200);
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const exps = section.experiences || [];
    const oldIndex = exps.findIndex(e => e.id === active.id);
    const newIndex = exps.findIndex(e => e.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      handleExpUpdate(sectionIndex, null, "reorder", arrayMove(exps, oldIndex, newIndex));
    }
  };

  // ── AI Count ──
  const isExhausted = aiExpCount === 0;
  const totalCount = 5;

  return (
    <>
      <p className="!text-sm !font-medium !text-gray-500 mb-4">
        Please add metrics, problems solved or features worked on, and key features or products that were built and scaled. (Overall write about Impact).
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={(section.experiences || []).map(e => e.id)}
          strategy={verticalListSortingStrategy}
        >
          {(section.experiences || []).map((exp) => (
            <DraggableWrapper key={exp.id} id={exp.id}>
              <div className={`transition-all duration-200 mb-3 ${deletingId === exp.id ? "-translate-x-6 opacity-0" : ""}`}>
                <div className="flex items-start gap-2">

                  <span className="mt-5"><DragIcon /></span>

                  <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                    <AccordionPanel>

                      <AccordionTitle className="font-semibold text-sm">
                        {exp.jobTitle?.trim()
                          ? `${exp.jobTitle} at ${exp.company || "(Awaiting Input)"}`
                          : "(Awaiting Input)"}
                      </AccordionTitle>

                      <AccordionContent className="pt-0">

                        <div className="grid grid-cols-2 gap-4 mb-4">

                          <div>
                            <Label className="!text-sm !font-medium !text-gray-500">Job Role title</Label>
                            <input
                              value={exp.jobTitle}
                              onChange={(e) => handleExpUpdate(sectionIndex, exp.id, "jobTitle", e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div>
                            <Label className="!text-sm !font-medium !text-gray-500">Company Name</Label>
                            <input
                              value={exp.company}
                              onChange={(e) => handleExpUpdate(sectionIndex, exp.id, "company", e.target.value)}
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>

                          <div className='md:col-span-2'>
                            <Label className="block text-xs font-semibold !text-gray-500 mb-1">Start & End Date</Label>
                            <div className='flex gap-2 mt-1'>
                              <div className="flex-1">
                                <Datepicker
                                  selectedDate={exp.startDate}
                                  onChange={(date) => handleExpUpdate(sectionIndex, exp.id, "startDate", date ? date.toString() : "")}
                                />
                              </div>
                              <div className="flex-1">
                                {exp.isCurrentlyWorking ? (
                                  <input
                                    value="Present"
                                    disabled
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                                  />
                                ) : (
                                  <Datepicker
                                    selectedDate={exp.endDate}
                                    onChange={(date) => handleExpUpdate(sectionIndex, exp.id, "endDate", date ? date.toString() : "")}
                                  />
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="checkbox"
                                id={`currently-working-${exp.id}`}
                                checked={exp.isCurrentlyWorking || false}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  handleExpUpdate(sectionIndex, exp.id, "isCurrentlyWorking", isChecked);
                                  handleExpUpdate(sectionIndex, exp.id, "endDate", isChecked ? 'PRESENT' : '');
                                }}
                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                              />
                              <label htmlFor={`currently-working-${exp.id}`} className="text-sm text-gray-700 cursor-pointer">
                                I currently work here
                              </label>
                            </div>
                          </div>

                          <div className="col-span-2">
                            <Label className="!text-sm !font-medium !text-gray-500">Location</Label>
                            <input
                              value={exp.city}
                              onChange={(e) => handleExpUpdate(sectionIndex, exp.id, "city", e.target.value)}
                              placeholder="City, Country"
                              className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="!text-sm !font-medium !text-gray-500">Job Responsibilities</Label>
                          <TipTapEditor
                            value={exp.description}
                            onChange={(html) => handleExpUpdate(sectionIndex, exp.id, "description", html)}
                          />

                          {/* ── Count Badge + Button (same as ImpExperience) ── */}
                          <div className="relative flex justify-end items-center mt-2 gap-3">

                            {/* Count Badge */}
                            {typeof aiExpCount === 'number' && (
                              <div className="flex items-center gap-1.5">
                                {isExhausted ? (
                                  <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                                    AI limit reached
                                  </span>
                                ) : (
                                  <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border
                                    ${aiExpCount <= 2
                                      ? 'text-orange-600 bg-orange-50 border-orange-200'
                                      : 'text-purple-600 bg-[#f6efff] border-purple-200'
                                    }`}>
                                    <HiSparkles className="text-xs" />
                                    {aiExpCount}/{totalCount} left
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Button with Tooltip */}
                            <div className="relative group">
                              <button
                                type="button"
                                onClick={() => !isExhausted && setActiveExpId(exp.id)}
                                disabled={isExhausted}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-[25px] text-sm transition-all duration-200
                                  ${isExhausted
                                    ? '!bg-gray-100 !text-gray-400 cursor-not-allowed opacity-70'
                                    : '!bg-[#f6efff] !text-[#800080] hover:!bg-[#ecdeff]'
                                  }`}
                              >
                                <HiSparkles className="text-md" />
                                Get help with writing
                              </button>

                              {/* Tooltip */}
                              {isExhausted && (
                                <div className="absolute bottom-full right-0 mb-2 w-52 bg-gray-800 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 text-center shadow-lg">
                                  You've used all 5 AI generations for this resume.{" "}
                                  <span className="text-purple-300 font-semibold">Buy a new plan</span>{" "}
                                  to use it again.
                                  <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800" />
                                </div>
                              )}
                            </div>

                            {activeExpId === exp.id && !isExhausted && (
                              <GenerateWithAiModal
                                open={true}
                                onClose={() => setActiveExpId(null)}
                                aiType="linkdin_experience"
                                initialText={exp.description || ""}
                                fullResumeData={resumeSource}
                                onUseAiCount={onUseAiCount}
                                onApply={(text) => {
                                  handleExpUpdate(sectionIndex, exp.id, "description", text);
                                  onAtsRefresh && onAtsRefresh();
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
                      className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                      title="Delete this employment"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDeleteExperience(exp.id);
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
        onClick={() => handleAddExperience(sectionIndex)}
        className="!text-sm !text-[#800080] font-medium mt-2"
      >
        + Add one more employment
      </button>
    </>
  );
};

export default LinkedInExperience;


// import React, { useState } from 'react';
// import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
// import { HiSparkles } from "react-icons/hi2";
// import TipTapEditor from '../../editor/TipTapEditor';
// import GenerateWithAiModal from '../../modal/GenerateWithAiModal';
// import { FaTrash } from 'react-icons/fa';
// import Datepicker from "../../ui/Datepicker";
// import { useSelector } from 'react-redux';
// import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
// import DraggableWrapper from "../DraggableWrapper";
// import DragIcon from "../DragIcon";

// const LinkedInExperience = ({
//   section,
//   sectionIndex,
//   handleExpUpdate,
//   handleAddExperience,
//   onAtsRefresh
// }) => {
//   const [activeExpId, setActiveExpId] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   const { extracteResumeData } = useSelector((state) => state?.dash);
//   const { singleResumeInfo } = useSelector((state) => state?.resume);

//   const resumeSource =
//     singleResumeInfo?.data?.data ||
//     extracteResumeData?.resume_data ||
//     null;

//   const handleDeleteExperience = (expId) => {
//     setDeletingId(expId);
//     setTimeout(() => {
//       handleExpUpdate(sectionIndex, expId, "delete");
//       setDeletingId(null);
//     }, 200);
//   };

//   const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over || active.id === over.id) return;
//     const exps = section.experiences || [];
//     const oldIndex = exps.findIndex(e => e.id === active.id);
//     const newIndex = exps.findIndex(e => e.id === over.id);
//     if (oldIndex !== -1 && newIndex !== -1) {
//       handleExpUpdate(sectionIndex, null, "reorder", arrayMove(exps, oldIndex, newIndex));
//     }
//   };

//   return (
//     <>
//       <p className="!text-sm !font-medium !text-gray-500 mb-4">
//         List your professional experience. Include your job title, company name, and key responsibilities/achievements.
//       </p>

//       <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//         <SortableContext
//           items={(section.experiences || []).map(e => e.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {(section.experiences || []).map((exp) => (
//             <DraggableWrapper key={exp.id} id={exp.id}>
//               <div className={`transition-all duration-200 mb-3 ${deletingId === exp.id ? "-translate-x-6 opacity-0" : ""}`}>
//                 <div className="flex items-start gap-2">

//                   <span className="mt-5"><DragIcon /></span>

//                   <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
//                     <AccordionPanel>

//                       <AccordionTitle className="font-semibold text-sm">
//                         {exp.jobTitle?.trim()
//                           ? `${exp.jobTitle} at ${exp.company || "(Not specified)"}`
//                           : "(Not specified)"}
//                       </AccordionTitle>

//                       <AccordionContent className="pt-0">

//                         <div className="grid grid-cols-2 gap-4 mb-4">

//                           <div>
//                             <Label className="!text-sm !font-medium !text-gray-500">Job title</Label>
//                             <input
//                               value={exp.jobTitle}
//                               onChange={(e) => handleExpUpdate(sectionIndex, exp.id, "jobTitle", e.target.value)}
//                               className="w-full rounded-md border border-gray-300 p-2 text-sm"
//                             />
//                           </div>

//                           <div>
//                             <Label className="!text-sm !font-medium !text-gray-500">Company</Label>
//                             <input
//                               value={exp.company}
//                               onChange={(e) => handleExpUpdate(sectionIndex, exp.id, "company", e.target.value)}
//                               className="w-full rounded-md border border-gray-300 p-2 text-sm"
//                             />
//                           </div>

//                           <div className='md:col-span-2'>
//                             <Label className="block text-xs font-semibold !text-gray-500 mb-1">Start & End Date</Label>
//                             <div className='flex gap-2 mt-1'>
//                               <div className="flex-1">
//                                 <Datepicker
//                                   selectedDate={exp.startDate}
//                                   onChange={(date) => handleExpUpdate(sectionIndex, exp.id, "startDate", date ? date.toString() : "")}
//                                 />
//                               </div>
//                               <div className="flex-1">
//                                 {exp.isCurrentlyWorking ? (
//                                   <input
//                                     value="Present"
//                                     disabled
//                                     className="w-full rounded-md border border-gray-300 p-2 text-sm bg-gray-100 text-gray-500 cursor-not-allowed"
//                                   />
//                                 ) : (
//                                   <Datepicker
//                                     selectedDate={exp.endDate}
//                                     onChange={(date) => handleExpUpdate(sectionIndex, exp.id, "endDate", date ? date.toString() : "")}
//                                   />
//                                 )}
//                               </div>
//                             </div>

//                             <div className="flex items-center gap-2 mt-2">
//                               <input
//                                 type="checkbox"
//                                 id={`currently-working-${exp.id}`}
//                                 checked={exp.isCurrentlyWorking || false}
//                                 onChange={(e) => {
//                                   const isChecked = e.target.checked;
//                                   handleExpUpdate(sectionIndex, exp.id, "isCurrentlyWorking", isChecked);
//                                   handleExpUpdate(sectionIndex, exp.id, "endDate", isChecked ? 'PRESENT' : '');
//                                 }}
//                                 className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
//                               />
//                               <label htmlFor={`currently-working-${exp.id}`} className="text-sm text-gray-700 cursor-pointer">
//                                 I currently work here
//                               </label>
//                             </div>
//                           </div>

//                           <div className="col-span-2">
//                             <Label className="!text-sm !font-medium !text-gray-500">Location</Label>
//                             <input
//                               value={exp.city}
//                               onChange={(e) => handleExpUpdate(sectionIndex, exp.id, "city", e.target.value)}
//                               placeholder="City, Country"
//                               className="w-full rounded-md border border-gray-300 p-2 text-sm"
//                             />
//                           </div>
//                         </div>

//                         <div>
//                           <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
//                           <TipTapEditor
//                             value={exp.description}
//                             onChange={(html) => handleExpUpdate(sectionIndex, exp.id, "description", html)}
//                           />
//                           <div className="relative flex justify-end mt-1">
//                             <button
//                               type="button"
//                               onClick={() => setActiveExpId(exp.id)}
//                               className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080]"
//                             >
//                               <HiSparkles className="text-md" />
//                               Get help with writing
//                             </button>

//                             {activeExpId === exp.id && (
//                               <GenerateWithAiModal
//                                 open={true}
//                                 onClose={() => setActiveExpId(null)}
//                                 aiType="linkdin_experience"
//                                 initialText={exp.description || ""}
//                                 fullResumeData={resumeSource}
//                                 onApply={(text) => {
//                                   handleExpUpdate(sectionIndex, exp.id, "description", text);
//                                   onAtsRefresh && onAtsRefresh();
//                                 }}
//                               />
//                             )}
//                           </div>
//                         </div>
//                       </AccordionContent>
//                     </AccordionPanel>
//                   </Accordion>

//                   <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
//                     <FaTrash
//                       className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
//                       title="Delete this employment"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         handleDeleteExperience(exp.id);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </DraggableWrapper>
//           ))}
//         </SortableContext>
//       </DndContext>

//       <button
//         type="button"
//         onClick={() => handleAddExperience(sectionIndex)}
//         className="!text-sm !text-[#800080] font-medium mt-2"
//       >
//         + Add one more employment
//       </button>
//     </>
//   );
// };

// export default LinkedInExperience;