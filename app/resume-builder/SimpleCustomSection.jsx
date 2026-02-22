'use client';
import React, { useState } from "react";
import { FaPen, FaTrash, FaPlus } from "react-icons/fa";
import { Tabs, Tab, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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

const SimpleCustomSection = ({
  sectionId,
  register,
  watch,
  setValue,
  control,
  fields,
  append,
  remove,
  move,
}) => {
  const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
  const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
  const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  // Field names based on sectionId
  const historyFieldName = `customSimpleHistory_${sectionId}`;
  const titleFieldName = `customSimpleTitle_${sectionId}`;
  const hideExperienceLevelFieldName = `customSimpleHideLevel_${sectionId}`;

  const hideExperienceLevel = watch(hideExperienceLevelFieldName) ?? true;
  const sectionTitle = watch(titleFieldName) || "Custom Section";

  // Dynamic helper text based on section title
  const getHelperText = () => {
    const title = sectionTitle?.toLowerCase() || "";
    if (title.includes("competenc")) return "Highlight your strongest competencies relevant to the role.";
    if (title.includes("technolog") || title.includes("tech")) return "List the technologies you're proficient in.";
    if (title.includes("tool")) return "Add tools and software you can work with.";
    if (title.includes("framework")) return "Include frameworks you have experience with.";
    if (title.includes("language")) return "List programming or spoken languages you know.";
    return "Add items for this section.";
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) move(oldIndex, newIndex);
  };

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      remove(index);
      setDeletingIndex(null);
    }, 500);
  };

  const addItem = () => {
    append({ name: "", level: 2 });
  };

  const updateField = (index, field, value) => {
    setValue(`${historyFieldName}.${index}.${field}`, value);
  };

  return (
    <>
      <div>
        <p className="!text-sm !font-medium !text-gray-500">
          {getHelperText()}
        </p>

        {/* Toggle Button */}
        <div className="flex items-center gap-2 my-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!hideExperienceLevel}
              onChange={(e) => setValue(hideExperienceLevelFieldName, !e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#800080] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#800080]"></div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              Show experience level
            </span>
          </label>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((item, i) => {
            const isEditing = editingIndex === i;
            const displayName = watch(`${historyFieldName}.${i}.name`) || "";
            const currentLevel = watch(`${historyFieldName}.${i}.level`) ?? 2;

            return (
              <DraggableWrapper key={item.id} id={item.id}>
                <div
                  className={`
                    group flex items-center justify-between gap-4 p-2 !border-b !border-gray-300
                    transition-all duration-300 ease-in-out
                    ${deletingIndex === i ? "-translate-x-6 opacity-0 bg-red-50" : "bg-white"}
                  `}
                >
                  <span className="cursor-grab active:cursor-grabbing">
                    <DragIcon />
                  </span>

                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayName}
                        autoFocus
                        onChange={(e) => updateField(i, "name", e.target.value)}
                        onBlur={() => {
                          setEditingIndex(null);
                          if (!displayName?.trim()) handleDelete(i);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") setEditingIndex(null);
                        }}
                        className="w-full text-sm font-medium border-b outline-none bg-transparent px-1"
                        placeholder="Enter name..."
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {displayName || "Click to edit"}
                        </span>
                        <div className="flex items-center gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                          <FaPen
                            className="text-sm text-gray-400 cursor-pointer hover:text-purple-600"
                            onClick={() => setEditingIndex(i)}
                          />
                          <FaTrash
                            className="text-sm text-gray-400 cursor-pointer hover:text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(i);
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {!hideExperienceLevel && (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-gray-600">
                        {levels[currentLevel]}
                      </span>
                      <Tabs
                        selectedIndex={currentLevel}
                        onSelect={(tabIndex) => updateField(i, "level", tabIndex)}
                      >
                        <TabList className="flex gap-1">
                          {levels.map((lvl, idx) => (
                            <Tab key={idx} className="outline-none">
                              <div
                                className={`
                                  w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300
                                  ${currentLevel === idx
                                    ? "scale-110 border border-[#800080] shadow-md"
                                    : "opacity-60 hover:opacity-100"
                                  }
                                `}
                                style={{
                                  backgroundColor: tabColors[idx],
                                  color: textColor[idx],
                                }}
                                title={lvl}
                              >
                                {idx + 1}
                              </div>
                            </Tab>
                          ))}
                        </TabList>
                      </Tabs>
                    </div>
                  )}
                </div>
              </DraggableWrapper>
            );
          })}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 !text-sm !text-[#800080] font-medium mt-4 hover:underline transition-all"
      >
        <FaPlus size={12} /> Add one more item
      </button>
    </>
  );
};

export default SimpleCustomSection;

// 'use client';
// import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
// import { useState, useEffect, useRef } from "react";
// import { Controller, useFieldArray } from "react-hook-form";
// import Datepicker from "../ui/Datepicker";
// import { TbDragDrop } from "react-icons/tb";
// import TipTapEditor from "../editor/TipTapEditor";
// import { FaPen, FaTrash } from "react-icons/fa6";

// const CustomSection = ({
//   register,
//   watch,
//   control,
//   sectionId,
//   removeSection,
//   setValue
// }) => {
//   const [draggedIndex, setDraggedIndex] = useState(null);
//   const [isEditingTitle, setIsEditingTitle] = useState(false);
//   const [deletingIndex, setDeletingIndex] = useState(null);

//   const { fields, append, remove, move } = useFieldArray({
//     control,
//     name: `customSectionHistory_${sectionId}`,
//   });

//   const initialized = useRef(false);

//   useEffect(() => {
//     if (!initialized.current && fields.length === 0) {
//       append({});
//       initialized.current = true;
//     }
//   }, [fields, append]);

//   const titleField = `customSectionTitle_${sectionId}`;
//   const sectionTitle = watch(titleField);

//   // Animated Delete Logic
//   const handleDeleteItem = (index) => {
//     setDeletingIndex(index);
//     setTimeout(() => {
//       remove(index);
//       setDeletingIndex(null);
//     }, 500);
//   };

//   return (
//     <>
//       {/* ===== SECTION HEADER (WITH DYNAMIC RENAME) ===== */}
//       <div className="mb-4 group flex justify-between items-start">
//         <div>
//           <div className="flex items-center gap-2 pb-1">
//             {isEditingTitle ? (
//               <input
//                 {...register(titleField)}
//                 className="text-xl font-bold border-b-2 border-[#800080] outline-none bg-transparent focus:ring-0 p-0"
//                 autoFocus
//                 onBlur={() => setIsEditingTitle(false)}
//                 onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
//                 placeholder="Section Title"
//               />
//             ) : (
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                 {sectionTitle || "Custom Section"}
//                 <FaPen
//                   className="text-sm text-gray-400 hover:text-[#800080] cursor-pointer transition-colors"
//                   onClick={() => setIsEditingTitle(true)}
//                 />
//               </h2>
//             )}
//             <div className="flex gap-2 ml-2">
//               <FaTrash
//                 onClick={removeSection}
//                 className="text-sm text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
//               />
//             </div>
//           </div>
//           <p className="text-sm text-[#808897] font-medium">
//             Add your own custom activities, achievements, or experiences.
//           </p>
//         </div>
//       </div>

//       {/* ===== ITEMS (WITH DELETE ANIMATION) ===== */}
//       <div className="space-y-3">
//         {fields.map((item, index) => {
//           const base = `customSectionHistory_${sectionId}.${index}`;
//           const title = watch(`${base}.activity`);
//           const city = watch(`${base}.city`);
//           const isOngoing = watch(`${base}.isOngoing`);

//           return (
//             <div
//               key={item.id}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={() => move(draggedIndex, index)}
//               className={`
//                                 flex items-start gap-2 transition-all duration-500 
//                                 ${deletingIndex === index ? "-translate-x-10 opacity-0 scale-95" : "opacity-100"}
//                                 ${draggedIndex === index ? "opacity-30 scale-95" : ""}
//                             `}
//             >
//               {/* DRAG HANDLE */}
//               <span
//                 draggable
//                 onDragStart={() => setDraggedIndex(index)}
//                 onDragEnd={() => setDraggedIndex(null)}
//                 className="mt-5 cursor-grab"
//               >
//                 <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
//               </span>

//               {/* ACCORDION WRAPPER */}
//               <div className="acco_section w-full flex gap-2">
//                 <Accordion collapseAll className="!border !border-gray-300 w-full rounded-lg !overflow-hidden bg-white shadow-sm">
//                   <AccordionPanel>
//                     <AccordionTitle className="!text-sm !font-semibold p-4">
//                       {title || city
//                         ? `${title || ""}${city ? ", " + city : ""}`
//                         : "(Not specified)"}
//                     </AccordionTitle>

//                     <AccordionContent className="pt-0">
//                       <div className="grid grid-cols-2 gap-4 mb-4">
//                         {/* ITEM TITLE */}
//                         <div className="col-span-2">
//                           <Label className="!text-xs !font-semibold !text-gray-500 uppercase block mb-1">Title</Label>
//                           <input
//                             className="w-full border border-gray-300 p-2 rounded-lg text-sm focus:ring-[#800080] focus:border-[#800080]"
//                             {...register(`${base}.activity`)}
//                             placeholder="e.g. Volunteer Work"
//                           />
//                         </div>

//                         {/* DATE SECTION */}
//                         <div className="col-span-2">
//                           <Label className="!text-xs !font-semibold !text-gray-500 uppercase block mb-1">Start & End Date</Label>
//                           <div className="flex gap-2">
//                             <Controller
//                               control={control}
//                               name={`${base}.startDate`}
//                               render={({ field }) => (
//                                 <Datepicker selectedDate={field.value} onChange={field.onChange} />
//                               )}
//                             />
//                             <Controller
//                               control={control}
//                               name={`${base}.endDate`}
//                               render={({ field }) => (
//                                 <Datepicker
//                                   selectedDate={field.value}
//                                   onChange={field.onChange}
//                                   disabled={isOngoing}
//                                 />
//                               )}
//                             />
//                           </div>

//                           {/* ONGOING CHECKBOX */}
//                           <div className="flex items-center gap-2 mt-2">
//                             <input
//                               type="checkbox"
//                               id={`ongoing-${sectionId}-${index}`}
//                               {...register(`${base}.isOngoing`)}
//                               onChange={(e) => {
//                                 const isChecked = e.target.checked;
//                                 setValue(`${base}.isOngoing`, isChecked);
//                                 setValue(`${base}.endDate`, isChecked ? "PRESENT" : "");
//                               }}
//                               className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
//                             />
//                             <label htmlFor={`ongoing-${sectionId}-${index}`} className="text-sm text-gray-700 cursor-pointer">
//                               Ongoing (Present)
//                             </label>
//                           </div>
//                         </div>

//                         {/* CITY */}
//                         <div className="col-span-2">
//                           <Label className="!text-xs !font-semibold !text-gray-500 uppercase block mb-1">City</Label>
//                           <input
//                             className="w-full border border-gray-300 p-2 rounded-lg text-sm focus:ring-[#800080] focus:border-[#800080]"
//                             {...register(`${base}.city`)}
//                             placeholder="e.g. Dhaka, Bangladesh"
//                           />
//                         </div>

//                         {/* DESCRIPTION WITH TIPTAP */}
//                         <div className="col-span-2">
//                           <Label className="!text-xs !font-semibold !text-gray-500 uppercase block mb-1">Description</Label>
//                           <Controller
//                             name={`${base}.description`}
//                             control={control}
//                             render={({ field }) => (
//                               <TipTapEditor value={field.value} onChange={field.onChange} />
//                             )}
//                           />
//                         </div>
//                       </div>
//                     </AccordionContent>
//                   </AccordionPanel>
//                 </Accordion>
//                 <div className="flex justify-end">
//                   <button
//                     type="button"
//                     onClick={() => handleDeleteItem(index)}
//                   >
//                     <FaTrash className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ADD MORE BUTTON */}
//       <button
//         type="button"
//         onClick={() => append({})}
//         className="text-sm !text-[#800080] font-medium mt-4 hover:underline inline-block"
//       >
//         + Add one more item
//       </button>
//     </>
//   );
// };

// export default CustomSection;