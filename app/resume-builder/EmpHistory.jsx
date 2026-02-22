'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { HiSparkles } from "react-icons/hi";
import { FaTrash, FaPen } from 'react-icons/fa';
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
  arrayMove,
} from "@dnd-kit/sortable";
import DraggableWrapper from "./DraggableWrapper";
import DragIcon from "./DragIcon";

const EmpHistory = ({ register, watch, control, fields, append, remove, move, sectionTitle, setSectionTitle, isEditingTitle, setIsEditingTitle }) => {
  const [deletingId, setDeletingId] = useState(null);
  const { setValue } = useFormContext();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setSectionTitle(newTitle);
    setValue("employmentSectionTitle", newTitle);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    setValue("employmentSectionTitle", sectionTitle);
  };

  // Smooth Delete Function
  const handleDelete = (index, id) => {
    setDeletingId(id);
    setTimeout(() => {
      remove(index);
      setDeletingId(null);
    }, 200);
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
          Show your relevant experience (last 10 years). Use bullet points to note your achievements.
        </p>
      </div>

      <div className='acco_section'>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {fields.map((item, index) => {
                const watchedJob = watch(`employmentHistory.${index}.job_title`);
                const watchedEmployer = watch(`employmentHistory.${index}.employer`);
                const isCurrentlyWorking = watch(`employmentHistory.${index}.isCurrentlyWorking`);

                return (
                  <DraggableWrapper key={item.id} id={item.id}>
                    <div
                      className={`transition-all duration-200
                        ${deletingId === item.id ? "-translate-x-6 opacity-0" : "opacity-100"}
                      `}
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-5">
                          <DragIcon />
                        </span>

                        <Accordion collapseAll className="!border w-full !border-gray-300 rounded-lg !overflow-hidden bg-white shadow-sm">
                          <AccordionPanel>
                            <AccordionTitle className="p-4 font-semibold text-sm">
                              {watchedJob || watchedEmployer
                                ? `${watchedJob || ''}${watchedEmployer ? ' at ' + watchedEmployer : ''}`
                                : "(Not specified)"}
                            </AccordionTitle>

                            <AccordionContent className="pt-0">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Job Title */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-500">Job Title</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Software Engineer"
                                    className="mt-1 rounded-lg border border-gray-300 p-2 text-sm"
                                    {...register(`employmentHistory.${index}.job_title`)}
                                  />
                                </div>

                                {/* Employer */}
                                <div>
                                  <label className="block text-xs font-semibold text-gray-500">Employer</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Google"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                    {...register(`employmentHistory.${index}.employer`)}
                                  />
                                </div>

                                {/* Date Section */}
                                <div className='md:col-span-2'>
                                  <label className="block text-xs font-semibold text-gray-500">Start & End Date</label>
                                  <div className='flex gap-2 mt-1'>
                                    <div className="flex-1">
                                      <Controller
                                        control={control}
                                        name={`employmentHistory.${index}.startDate`}
                                        render={({ field }) => (
                                          <Datepicker selectedDate={field.value} onChange={field.onChange} />
                                        )}
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <Controller
                                        control={control}
                                        name={`employmentHistory.${index}.endDate`}
                                        render={({ field }) => (
                                          <Datepicker
                                            selectedDate={field.value}
                                            onChange={field.onChange}
                                            disabled={isCurrentlyWorking}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 mt-2">
                                    <input
                                      type="checkbox"
                                      id={`currently-working-${index}`}
                                      checked={isCurrentlyWorking || false}
                                      onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setValue(`employmentHistory.${index}.isCurrentlyWorking`, isChecked);
                                        setValue(`employmentHistory.${index}.endDate`, isChecked ? 'PRESENT' : '');
                                      }}
                                      className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                                    />
                                    <label htmlFor={`currently-working-${index}`} className="text-sm text-gray-700 cursor-pointer">
                                      I currently work here
                                    </label>
                                  </div>
                                </div>

                                {/* City */}
                                <div className="md:col-span-2">
                                  <label className="block text-xs font-semibold text-gray-500">City, State</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. San Francisco, CA"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                    {...register(`employmentHistory.${index}.city_state`)}
                                  />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                  <label className="block text-xs font-semibold text-gray-500">Description</label>
                                  <Controller
                                    name={`employmentHistory.${index}.description`}
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

                        {/* Delete Button */}
                        <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
                          <FaTrash
                            className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                            title="Delete this employment"
                            onClick={() => handleDelete(index, item.id)}
                          />
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
          className="text-sm !text-[#800080] font-medium mt-4 hover:underline"
        >
          + Add one more employment
        </button>
      </div>
    </>
  );
};

export default EmpHistory;



// 'use client';
// import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
// import { useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
// import { HiSparkles } from "react-icons/hi";
// import { TbDragDrop } from 'react-icons/tb';
// import { FaTrash, FaPen } from 'react-icons/fa';
// import Datepicker from "../ui/Datepicker";
// import TipTapEditor from "../editor/TipTapEditor";

// const EmpHistory = ({ register, watch, control, fields, append, remove, move, sectionTitle, setSectionTitle, isEditingTitle, setIsEditingTitle }) => {
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [isHandleHovered, setIsHandleHovered] = useState(false);
//   const [deletingIndex, setDeletingIndex] = useState(null);
//   const { setValue } = useFormContext();

//   const handleTitleChange = (e) => {
//     const newTitle = e.target.value;
//     setSectionTitle(newTitle);
//     setValue("employmentSectionTitle", newTitle);
//   };

//   const handleTitleBlur = () => {
//     setIsEditingTitle(false);
//     setValue("employmentSectionTitle", sectionTitle); 
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

//   // Smooth Delete Function
//   const handleDelete = (index) => {
//     setDeletingIndex(index);
//     setTimeout(() => {
//       remove(index);
//       setDeletingIndex(null);
//     }, 500);
//   };

//   const handleDrop = (e, targetIndex) => {
//     e.preventDefault();
//     if (draggedIndex === null || draggedIndex === targetIndex) return;
//     move(draggedIndex, targetIndex);
//     setDraggedIndex(null);
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
//           Show your relevant experience (last 10 years). Use bullet points to note your achievements.
//         </p>
//       </div>

//       <div className='acco_section'>
//         <div className="space-y-3">
//           {fields.map((item, index) => {
//             const watchedJob = watch(`employmentHistory.${index}.job_title`);
//             const watchedEmployer = watch(`employmentHistory.${index}.employer`);
//             const isCurrentlyWorking = watch(`employmentHistory.${index}.isCurrentlyWorking`);

//             return (
//               <div
//                 key={item.id}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDrop={(e) => handleDrop(e, index)}
//                 className={`flex items-start gap-2 transition-all duration-200 
//                   ${draggedIndex === index ? "opacity-20 scale-95" : "opacity-100"}
//                   ${deletingIndex === index ? "-translate-x-6 opacity-0" : ""} 
//                 `}

//               >
//                 {/* DRAG HANDLE - Border er baire placement */}
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

//                 <div className="flex items-start gap-2 w-full">
//                   <Accordion collapseAll className="!border w-full !border-gray-300 rounded-lg !overflow-hidden bg-white shadow-sm">
//                     <AccordionPanel>
//                       <AccordionTitle className="p-4 font-semibold text-sm">
//                         {watchedJob || watchedEmployer
//                           ? `${watchedJob || ''}${watchedEmployer ? ' at ' + watchedEmployer : ''}`
//                           : "(Not specified)"}
//                       </AccordionTitle>

//                       <AccordionContent className="pt-0">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {/* Job Title */}
//                           <div>
//                             <label className="block text-xs font-semibold text-gray-500 uppercase">Job Title</label>
//                             <input
//                               type="text"
//                               placeholder="e.g. Software Engineer"
//                               className="mt-1 rounded-lg border border-gray-300 p-2 text-sm"
//                               {...register(`employmentHistory.${index}.job_title`)}
//                             />
//                           </div>

//                           {/* Employer */}
//                           <div>
//                             <label className="block text-xs font-semibold text-gray-500 uppercase">Employer</label>
//                             <input
//                               type="text"
//                               placeholder="e.g. Google"
//                               className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                               {...register(`employmentHistory.${index}.employer`)}
//                             />
//                           </div>

//                           {/* Date Section */}
//                           <div className='md:col-span-2'>
//                             <label className="block text-xs font-semibold text-gray-500 uppercase">Start & End Date</label>
//                             <div className='flex gap-2 mt-1'>
//                               <div className="flex-1">
//                                 <Controller
//                                   control={control}
//                                   name={`employmentHistory.${index}.startDate`}
//                                   render={({ field }) => (
//                                     <Datepicker selectedDate={field.value} onChange={field.onChange} />
//                                   )}
//                                 />
//                               </div>
//                               <div className="flex-1">
//                                 <Controller
//                                   control={control}
//                                   name={`employmentHistory.${index}.endDate`}
//                                   render={({ field }) => (
//                                     <Datepicker
//                                       selectedDate={field.value}
//                                       onChange={field.onChange}
//                                       disabled={isCurrentlyWorking}
//                                     />
//                                   )}
//                                 />
//                               </div>
//                             </div>

//                             <div className="flex items-center gap-2 mt-2">
//                               <input
//                                 type="checkbox"
//                                 id={`currently-working-${index}`}
//                                 checked={isCurrentlyWorking || false}
//                                 onChange={(e) => {
//                                   const isChecked = e.target.checked;
//                                   setValue(`employmentHistory.${index}.isCurrentlyWorking`, isChecked);
//                                   setValue(`employmentHistory.${index}.endDate`, isChecked ? 'PRESENT' : '');
//                                 }}
//                                 className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
//                               />
//                               <label htmlFor={`currently-working-${index}`} className="text-sm text-gray-700 cursor-pointer">
//                                 I currently work here
//                               </label>
//                             </div>
//                           </div>

//                           {/* City */}
//                           <div className="md:col-span-2">
//                             <label className="block text-xs font-semibold text-gray-500 uppercase">City, State</label>
//                             <input
//                               type="text"
//                               placeholder="e.g. San Francisco, CA"
//                               className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
//                               {...register(`employmentHistory.${index}.city_state`)}
//                             />
//                           </div>

//                           {/* Description */}
//                           <div className="md:col-span-2">
//                             <label className="block text-xs font-semibold text-gray-500 uppercase">Description</label>
//                             <Controller
//                               name={`employmentHistory.${index}.description`}
//                               control={control}
//                               render={({ field }) => <TipTapEditor value={field.value} onChange={field.onChange} />}
//                             />
//                             <div className="relative flex justify-end mt-1">
//                               <button type="button" className="flex items-center gap-2 px-4 py-1 rounded-[25px] text-sm !bg-[#f6efff] !text-[#800080] hover:bg-[#ebdcfc] transition-colors">
//                                 <HiSparkles className="text-md" />
//                                 Get help with writing
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </AccordionContent>
//                     </AccordionPanel>
//                   </Accordion>
//                   {/* Delete Button - Bottom Right inside content */}
//                   <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
//                     <button
//                       type="button"
//                       onClick={() => handleDelete(index)}
//                       className="text-gray-400 hover:text-red-500 transition-colors"
//                       title="Delete this employment"
//                     >
//                       <FaTrash
//                         className="text-sm text-gray-400 cursor-pointer
//                           hover:text-red-500
//                           transition-colors"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <button
//           type="button"
//           onClick={() => append({})}
//           className="text-sm !text-[#800080] font-medium mt-4 hover:underline"
//         >
//           + Add one more employment
//         </button>
//       </div>
//     </>
//   );
// };

// export default EmpHistory;