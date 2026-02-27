'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { HiSparkles } from "react-icons/hi";
import { FaPen, FaTrash } from 'react-icons/fa';
import Datepicker from "../ui/Datepicker";
import TipTapEditor from "../editor/TipTapEditor";

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
} from "@dnd-kit/sortable";
import DraggableWrapper from "./DraggableWrapper";
import DragIcon from "./DragIcon";

const EducationNew = ({ register, watch, control, fields, append, remove, move, sectionTitle, setSectionTitle, isEditingTitle, setIsEditingTitle }) => {
  const [deletingId, setDeletingId] = useState(null);
  const { setValue } = useFormContext();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Real-time update handler
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setSectionTitle(newTitle);
    setValue("educationSectionTitle", newTitle);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    setValue("educationSectionTitle", sectionTitle);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      move(oldIndex, newIndex);
    }
  };

  const handleDelete = (index, id) => {
    setDeletingId(id);
    setTimeout(() => {
      remove(index);
      setDeletingId(null);
    }, 200);
  };

  return (
    <>
      <div className='mb-4'>
        <div className="acco_section flex items-center gap-2 group w-fit">
          {isEditingTitle ? (
            <input
              autoFocus
              className="text-xl font-bold text-black border-b-2 border-[#800080] outline-none"
              value={sectionTitle}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
            />
          ) : (
            <h2
              className='text-xl font-bold text-black pb-1 cursor-pointer flex items-center gap-3'
              onClick={() => setIsEditingTitle(true)}
            >
              {sectionTitle}
              <FaPen className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-purple-600 cursor-pointer duration-200" />
            </h2>
          )}
        </div>
        <p className='text-sm text-[#808897] font-medium pt-1'>
         Mention all the Educational details below.
        </p>
      </div>

      <div className='acco_section'>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {fields.map((item, index) => {
                const watchedSchool = watch(`educationHistory.${index}.school`);
                const watchedDegree = watch(`educationHistory.${index}.degree`);
                const isCurrentlyStudying = watch(`educationHistory.${index}.isCurrentlyStudying`);

                return (
                  <DraggableWrapper key={item.id} id={item.id}>
                    <div
                      className={`transition-all duration-200 mb-3
                        ${deletingId === item.id ? "-translate-x-6 opacity-0" : "opacity-100"}
                      `}
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-5">
                          <DragIcon />
                        </span>

                        <div className="flex-1">
                          <div className="flex items-start gap-2 w-full">
                            <Accordion collapseAll className="!border w-full !border-gray-300 rounded-lg !overflow-hidden bg-white shadow-sm">
                              <AccordionPanel>
                                <AccordionTitle className="p-4 font-semibold text-sm">
                                  {watchedSchool || watchedDegree
                                    ? `${watchedDegree || ''}${watchedSchool ? ' at ' + watchedSchool : ''}`
                                    : "(Awaiting Input)"}
                                </AccordionTitle>

                                <AccordionContent className="pt-0">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* School */}
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-500">School/College</label>
                                      <input
                                        type="text"
                                        placeholder="e.g. University of Dhaka"
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                        {...register(`educationHistory.${index}.school`)}
                                      />
                                    </div>

                                    {/* Degree */}
                                    <div>
                                      <label className="block text-xs font-semibold text-gray-500">Degree</label>
                                      <input
                                        type="text"
                                        placeholder="e.g. Bachelor of Science"
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                        {...register(`educationHistory.${index}.degree`)}
                                      />
                                    </div>

                                    {/* Start & End Date */}
                                    <div className='md:col-span-2'>
                                      <label className="block text-xs font-semibold text-gray-500">Start & End Date</label>
                                      <div className='flex gap-2 mt-1'>
                                        <div className="flex-1">
                                          <Controller
                                            control={control}
                                            name={`educationHistory.${index}.startDate`}
                                            render={({ field }) => (
                                              <Datepicker selectedDate={field.value} onChange={field.onChange} />
                                            )}
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <Controller
                                            control={control}
                                            name={`educationHistory.${index}.endDate`}
                                            render={({ field }) => (
                                              <Datepicker
                                                selectedDate={field.value}
                                                onChange={field.onChange}
                                                disabled={isCurrentlyStudying}
                                              />
                                            )}
                                          />
                                        </div>
                                      </div>

                                      {/* Currently Studying Checkbox */}
                                      <div className="flex items-center gap-2 mt-2">
                                        <input
                                          type="checkbox"
                                          id={`currently-studying-${index}`}
                                          checked={isCurrentlyStudying || false}
                                          onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setValue(`educationHistory.${index}.isCurrentlyStudying`, isChecked);
                                            setValue(`educationHistory.${index}.endDate`, isChecked ? 'PRESENT' : '');
                                          }}
                                          className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                                        />
                                        <label htmlFor={`currently-studying-${index}`} className="text-sm text-gray-700 cursor-pointer">
                                          I currently study here
                                        </label>
                                      </div>
                                    </div>

                                    {/* City */}
                                    <div className="md:col-span-2">
                                      <label className="block text-xs font-semibold text-gray-500">City, State</label>
                                      <input
                                        type="text"
                                        placeholder="e.g. Dhaka, Bangladesh"
                                        className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                        {...register(`educationHistory.${index}.city_state`)}
                                      />
                                    </div>

                                    {/* Description with TipTap */}
                                    <div className="md:col-span-2">
                                      <label className="block text-xs font-semibold text-gray-500">Description</label>
                                      <Controller
                                        name={`educationHistory.${index}.description`}
                                        control={control}
                                        render={({ field }) => <TipTapEditor value={field.value} onChange={field.onChange} />}
                                      />
                                      <div className="relative flex justify-end mt-1">
                                        <button type="button" className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080] hover:bg-[#ebdcfc] transition-colors">
                                          <HiSparkles className="text-md" />
                                          Get help with writing
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionPanel>
                            </Accordion>

                            {/* DELETE BUTTON */}
                            <div className="mt-4">
                              <FaTrash
                                className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                                title="Delete this education"
                                onClick={() => handleDelete(index, item.id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DraggableWrapper>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>

        <button
          type="button"
          onClick={() => append({})}
          className="text-sm !text-[#800080] font-medium mt-4 hover:underline inline-block"
        >
          + Add one more education
        </button>
      </div>
    </>
  );
};

export default EducationNew;


// 'use client';
// import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
// import { useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { HiSparkles } from "react-icons/hi";
// import { TbDragDrop } from 'react-icons/tb';
// import { FaPen, FaTrash } from 'react-icons/fa';
// import Datepicker from "../ui/Datepicker";
// import TipTapEditor from "../editor/TipTapEditor";

// const EducationNew = ({ register, watch, control, fields, append, remove, move, sectionTitle, setSectionTitle, isEditingTitle, setIsEditingTitle }) => {
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [isHandleHovered, setIsHandleHovered] = useState(false);
//   const [deletingIndex, setDeletingIndex] = useState(null);
//   const { setValue } = useFormContext();

//   // Real-time update handler
//   const handleTitleChange = (e) => {
//     const newTitle = e.target.value;
//     setSectionTitle(newTitle); // Input update
//     setValue("educationSectionTitle", newTitle); // Template sync
//   };

//   const handleTitleBlur = () => {
//     setIsEditingTitle(false);
//     setValue("educationSectionTitle", sectionTitle);
//   };

//   const handleDragStart = (e, index) => {
//     if (!isHandleHovered) {
//       e.preventDefault();
//       return;
//     }
//     setDraggedIndex(index);
//     e.dataTransfer.effectAllowed = "move";
//   };

//   const handleDragEnd = () => {
//     setDraggedIndex(null);
//     setIsHandleHovered(false);
//   };

//   const handleDrop = (e, targetIndex) => {
//     e.preventDefault();
//     if (draggedIndex === null || draggedIndex === targetIndex) return;
//     move(draggedIndex, targetIndex);
//     setDraggedIndex(null);
//   };

//   const handleDelete = (index) => {
//     setDeletingIndex(index);
//     setTimeout(() => {
//       remove(index);
//       setDeletingIndex(null);
//     }, 500);
//   };

//   return (
//     <>
//       <div className='mb-4'>
//         <div className="acco_section flex items-center gap-2 group w-fit">
//           {isEditingTitle ? (
//             <input
//               autoFocus
//               className="text-xl font-bold text-black border-b-2 border-[#800080] outline-none"
//               value={sectionTitle}
//               onChange={handleTitleChange}
//               onBlur={handleTitleBlur}
//               onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
//             />
//           ) : (
//             <h2
//               className='text-xl font-bold text-black pb-1 cursor-pointer flex items-center gap-3'
//               onClick={() => setIsEditingTitle(true)}
//             >
//               {sectionTitle}
//               <FaPen className="text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-purple-600 cursor-pointer duration-200" />
//             </h2>
//           )}
//         </div>
//         <p className='text-sm text-[#808897] font-medium pt-1'>
//           A varied education on your resume sums up the value that your learnings and background will bring to job.
//         </p>
//       </div>

//       <div className='acco_section'>
//         <div className="space-y-3">
//           {fields.map((item, index) => {
//             const watchedSchool = watch(`educationHistory.${index}.school`);
//             const watchedDegree = watch(`educationHistory.${index}.degree`);
//             const isCurrentlyStudying = watch(`educationHistory.${index}.isCurrentlyStudying`);

//             return (
//               <div
//                 key={item.id}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={(e) => handleDrop(e, index)}
//                 className={`flex items-start gap-2 transition-all duration-500 mb-3
//                   ${draggedIndex === index ? "opacity-20 scale-95" : "opacity-100"}
//                   ${deletingIndex === index ? "-translate-x-6 opacity-0" : ""} 
//                 `}
//               >
//                 {/* DRAG HANDLE */}
//                 <div
//                   className="mt-5 cursor-grab active:cursor-grabbing group relative"
//                   draggable
//                   onMouseEnter={() => setIsHandleHovered(true)}
//                   onMouseLeave={() => setIsHandleHovered(false)}
//                   onDragStart={(e) => handleDragStart(e, index)}
//                   onDragEnd={handleDragEnd}
//                 >
//                   <TbDragDrop className="text-xl text-[#656e83] group-hover:text-[#800080]" />
//                   <span className="tooltip">Click and drag to move</span>
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex items-start gap-2 w-full">
//                     <Accordion collapseAll className="!border w-full !border-gray-300 rounded-lg !overflow-hidden bg-white shadow-sm">
//                       <AccordionPanel>
//                         <AccordionTitle className="p-4 font-semibold text-sm">
//                           {watchedSchool || watchedDegree
//                             ? `${watchedDegree || ''}${watchedSchool ? ' at ' + watchedSchool : ''}`
//                             : "(Not specified)"}
//                         </AccordionTitle>

//                         <AccordionContent className="pt-0">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             {/* School */}
//                             <div>
//                               <label className="block text-xs font-semibold text-gray-500 uppercase">School</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g. University of Dhaka"
//                                 className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                                 {...register(`educationHistory.${index}.school`)}
//                               />
//                             </div>

//                             {/* Degree */}
//                             <div>
//                               <label className="block text-xs font-semibold text-gray-500 uppercase">Degree</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g. Bachelor of Science"
//                                 className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                                 {...register(`educationHistory.${index}.degree`)}
//                               />
//                             </div>

//                             {/* Start & End Date */}
//                             <div className='md:col-span-2'>
//                               <label className="block text-xs font-semibold text-gray-500 uppercase">Start & End Date</label>
//                               <div className='flex gap-2 mt-1'>
//                                 <div className="flex-1">
//                                   <Controller
//                                     control={control}
//                                     name={`educationHistory.${index}.startDate`}
//                                     render={({ field }) => (
//                                       <Datepicker selectedDate={field.value} onChange={field.onChange} />
//                                     )}
//                                   />
//                                 </div>
//                                 <div className="flex-1">
//                                   <Controller
//                                     control={control}
//                                     name={`educationHistory.${index}.endDate`}
//                                     render={({ field }) => (
//                                       <Datepicker
//                                         selectedDate={field.value}
//                                         onChange={field.onChange}
//                                         disabled={isCurrentlyStudying}
//                                       />
//                                     )}
//                                   />
//                                 </div>
//                               </div>

//                               {/* Currently Studying Checkbox */}
//                               <div className="flex items-center gap-2 mt-2">
//                                 <input
//                                   type="checkbox"
//                                   id={`currently-studying-${index}`}
//                                   checked={isCurrentlyStudying || false}
//                                   onChange={(e) => {
//                                     const isChecked = e.target.checked;
//                                     setValue(`educationHistory.${index}.isCurrentlyStudying`, isChecked);
//                                     setValue(`educationHistory.${index}.endDate`, isChecked ? 'PRESENT' : '');
//                                   }}
//                                   className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
//                                 />
//                                 <label htmlFor={`currently-studying-${index}`} className="text-sm text-gray-700 cursor-pointer">
//                                   I currently study here
//                                 </label>
//                               </div>
//                             </div>

//                             {/* City */}
//                             <div className="md:col-span-2">
//                               <label className="block text-xs font-semibold text-gray-500 uppercase">City, State</label>
//                               <input
//                                 type="text"
//                                 placeholder="e.g. Dhaka, Bangladesh"
//                                 className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                                 {...register(`educationHistory.${index}.city_state`)}
//                               />
//                             </div>

//                             {/* Description with TipTap */}
//                             <div className="md:col-span-2">
//                               <label className="block text-xs font-semibold text-gray-500 uppercase">Description</label>
//                               <Controller
//                                 name={`educationHistory.${index}.description`}
//                                 control={control}
//                                 render={({ field }) => <TipTapEditor value={field.value} onChange={field.onChange} />}
//                               />
//                               <div className="relative flex justify-end mt-1">
//                                 <button type="button" className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080] hover:bg-[#ebdcfc] transition-colors">
//                                   <HiSparkles className="text-md" />
//                                   Get help with writing
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </AccordionContent>
//                       </AccordionPanel>
//                     </Accordion>

//                     {/* DELETE BUTTON */}
//                     <div className="mt-4">
//                       <button
//                         type="button"
//                         onClick={() => handleDelete(index)}
//                         className="text-gray-400 hover:text-red-500 transition-colors"
//                         title="Delete this education"
//                       >
//                         <FaTrash className="text-sm text-gray-400 hover:text-red-500 transition-colors" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <button
//           type="button"
//           onClick={() => append({})}
//           className="text-sm !text-[#800080] font-medium mt-4 hover:underline inline-block"
//         >
//           + Add one more education
//         </button>
//       </div>
//     </>
//   );
// };

// export default EducationNew;