'use client';
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
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

const CustomSectionEdit = ({ 
  sectionId = 'custom',
  register, 
  watch, 
  control, 
  setValue,
  fields, 
  append, 
  remove, 
  move, 
  removeSection, 
  noHeader 
}) => {
  const [deletingId, setDeletingId] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const isDynamic = sectionId !== 'custom';
  const historyFieldName = isDynamic ? `customSectionHistory_${sectionId}` : 'customSectionHistory';
  const titleFieldName = isDynamic ? `customSectionTitle_${sectionId}` : 'customSectionTitle';

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      move(oldIndex, newIndex);
    }
  };

  const addMore = () => {
    append({});
  };

  const deleteItem = (index, id) => {
    setDeletingId(id);
    setTimeout(() => {
      remove(index);
      setDeletingId(null);
    }, 400);
  };

  const sectionTitle = watch(titleFieldName);

  const renderHeaderContent = () => (
    <div className='group flex justify-between items-start'>
      <div>
        <div className="flex items-center gap-2 pb-1">
          {isEditingTitle ? (
            <input
              type="text"
              {...register(titleFieldName)}
              className="text-xl font-bold text-black border-b border-gray-300 focus:border-cyan-500 outline-none bg-transparent px-1"
              autoFocus
              onBlur={() => setIsEditingTitle(false)}
              placeholder="Section Title"
            />
          ) : (
            <h2
              className='text-xl font-bold text-black cursor-pointer hover:text-cyan-600 flex items-center gap-2'
              onClick={() => setIsEditingTitle(true)}
            >
              {sectionTitle || "Custom Section"}
              <FaPen className="text-sm opacity-0 group-hover:opacity-100 text-gray-400" />
            </h2>
          )}
        </div>
        <p className='text-sm text-[#808897] font-medium'>
          Add your own custom activities, achievements, or experiences.
        </p>
      </div>
      <button
        type="button"
        onClick={removeSection}
        className="text-gray-400 hover:text-red-500 transition-colors p-1"
        title="Delete Section"
      >
        <MdDelete size={20} />
      </button>
    </div>
  );

  return (
    <>
      {!noHeader ? (
        <div className="mb-4">
          {renderHeaderContent()}
        </div>
      ) : (
        <div className="mb-4 border-b pb-4">
          {renderHeaderContent()}
        </div>
      )}

      <div className=''>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {fields.map((item, index) => {
                const watchedActivity = watch(`${historyFieldName}.${index}.activity`);
                const watchedCity = watch(`${historyFieldName}.${index}.city`);

                return (
                  <DraggableWrapper key={item.id} id={item.id}>
                    <div
                      className={`transition-all duration-500 mb-3
                        ${deletingId === item.id ? "-translate-x-6 opacity-0" : ""}
                      `}
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-5">
                          <DragIcon />
                        </span>

                        <Accordion collapseAll className="w-full !border !border-gray-300 rounded-lg overflow-hidden bg-white">
                          <AccordionPanel>
                            <AccordionTitle className="font-semibold text-sm">
                              {watchedActivity || watchedCity
                                ? `${watchedActivity || ''}${watchedCity ? ', ' + watchedCity : ''}`
                                : "(Not specified)"}
                            </AccordionTitle>

                            <AccordionContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-semibold text-gray-500 uppercase">
                                    Activity name, job title, book title etc.
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Project Lead"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                    {...register(`${historyFieldName}.${index}.activity`)}
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-semibold text-gray-500 uppercase">City</label>
                                  <input
                                    type="text"
                                    placeholder="e.g. New York"
                                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-sm"
                                    {...register(`${historyFieldName}.${index}.city`)}
                                  />
                                </div>

                                <div className='md:col-span-2'>
                                  <label className="block text-xs font-semibold text-gray-500 uppercase">
                                    Start & End Date
                                  </label>
                                  <div className='flex gap-2 mt-1'>
                                    <Controller
                                      control={control}
                                      name={`${historyFieldName}.${index}.startDate`}
                                      render={({ field }) => (
                                        <Datepicker selectedDate={field.value} onChange={field.onChange} />
                                      )}
                                    />
                                    <Controller
                                      control={control}
                                      name={`${historyFieldName}.${index}.endDate`}
                                      render={({ field }) => (
                                        <Datepicker selectedDate={field.value} onChange={field.onChange} />
                                      )}
                                    />
                                  </div>
                                </div>

                                <div className="md:col-span-2">
                                  <label className="block text-xs font-semibold text-gray-500 uppercase">Description</label>
                                  <Controller
                                    control={control}
                                    name={`${historyFieldName}.${index}.description`}
                                    defaultValue=""
                                    render={({ field }) => (
                                      <TipTapEditor
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Describe details..."
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionPanel>
                        </Accordion>

                        <FaTrash
                          className="mt-6 text-gray-400 cursor-pointer hover:text-red-500 transition-colors flex-shrink-0"
                          onClick={() => deleteItem(index, item.id)}
                        />
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
          onClick={addMore}
          className="text-sm !text-[#800080] font-medium mt-4 hover:underline"
        >
          + Add one more item
        </button>
      </div>
    </>
  );
};

export default CustomSectionEdit;