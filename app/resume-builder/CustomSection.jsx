'use client';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import Datepicker from "../ui/Datepicker";
import { TbDragDrop } from "react-icons/tb";
import TipTapEditor from "../editor/TipTapEditor";
import { FaPen, FaTrash } from "react-icons/fa6";

const CustomSection = ({
  register,
  watch,
  control,
  sectionId,
  removeSection,
  setValue
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `customSectionHistory_${sectionId}`,
  });

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && fields.length === 0) {
      append({});
      initialized.current = true;
    }
  }, [fields, append]);

  const titleField = `customSectionTitle_${sectionId}`;
  const sectionTitle = watch(titleField);

  // Animated Delete Logic
  const handleDeleteItem = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      remove(index);
      setDeletingIndex(null);
    }, 500);
  };

  return (
    <>
      {/* ===== SECTION HEADER (WITH DYNAMIC RENAME) ===== */}
      <div className="mb-4 group flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 pb-1">
            {isEditingTitle ? (
              <input
                {...register(titleField)}
                className="text-xl font-bold border-b-2 border-[#800080] outline-none bg-transparent focus:ring-0 p-0"
                autoFocus
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                placeholder="Section Title"
              />
            ) : (
              <h2 className="text-xl font-bold flex items-center gap-2">
                {sectionTitle || "Custom Section"}
                <FaPen
                  className="text-sm text-gray-400 hover:text-[#800080] cursor-pointer transition-colors"
                  onClick={() => setIsEditingTitle(true)}
                />
              </h2>
            )}
            <div className="flex gap-2 ml-2">
              <FaTrash
                onClick={removeSection}
                className="text-sm text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
              />
            </div>
          </div>
          <p className="text-sm text-[#808897] font-medium">
            Add your own custom activities, achievements, or experiences.
          </p>
        </div>
      </div>

      {/* ===== ITEMS (WITH DELETE ANIMATION) ===== */}
      <div className="space-y-3">
        {fields.map((item, index) => {
          const base = `customSectionHistory_${sectionId}.${index}`;
          const title = watch(`${base}.activity`);
          const city = watch(`${base}.city`);
          const isOngoing = watch(`${base}.isOngoing`);

          return (
            <div
              key={item.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => move(draggedIndex, index)}
              className={`
                                flex items-start gap-2 transition-all duration-500 
                                ${deletingIndex === index ? "-translate-x-10 opacity-0 scale-95" : "opacity-100"}
                                ${draggedIndex === index ? "opacity-30 scale-95" : ""}
                            `}
            >
              {/* DRAG HANDLE */}
              <span
                draggable
                onDragStart={() => setDraggedIndex(index)}
                onDragEnd={() => setDraggedIndex(null)}
                className="mt-5 cursor-grab"
              >
                <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
              </span>

              {/* ACCORDION WRAPPER */}
              <div className="acco_section w-full flex gap-2">
                <Accordion collapseAll className="!border !border-gray-300 w-full rounded-lg !overflow-hidden bg-white shadow-sm">
                  <AccordionPanel>
                    <AccordionTitle className="!text-sm !font-semibold p-4">
                      {title || city
                        ? `${title || ""}${city ? ", " + city : ""}`
                        : "(Not specified)"}
                    </AccordionTitle>

                    <AccordionContent className="pt-0">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* ITEM TITLE */}
                        <div className="col-span-2">
                          <Label className="!text-xs !font-semibold !text-gray-500 uppercase block mb-1">Title</Label>
                          <input
                            className="w-full border border-gray-300 p-2 rounded-lg text-sm focus:ring-[#800080] focus:border-[#800080]"
                            {...register(`${base}.activity`)}
                            placeholder="e.g. Volunteer Work"
                          />
                        </div>

                        {/* DATE SECTION */}
                        <div className="col-span-2">
                          <Label className="!text-xs !font-semibold !text-gray-500 uppercase block mb-1">Start & End Date</Label>
                          <div className="flex gap-2">
                            <Controller
                              control={control}
                              name={`${base}.startDate`}
                              render={({ field }) => (
                                <Datepicker selectedDate={field.value} onChange={field.onChange} />
                              )}
                            />
                            <Controller
                              control={control}
                              name={`${base}.endDate`}
                              render={({ field }) => (
                                <Datepicker
                                  selectedDate={field.value}
                                  onChange={field.onChange}
                                  disabled={isOngoing}
                                />
                              )}
                            />
                          </div>

                          {/* ONGOING CHECKBOX */}
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              type="checkbox"
                              id={`ongoing-${sectionId}-${index}`}
                              {...register(`${base}.isOngoing`)}
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                setValue(`${base}.isOngoing`, isChecked);
                                setValue(`${base}.endDate`, isChecked ? "PRESENT" : "");
                              }}
                              className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                            />
                            <label htmlFor={`ongoing-${sectionId}-${index}`} className="text-sm text-gray-700 cursor-pointer">
                              Ongoing (Present)
                            </label>
                          </div>
                        </div>

                        {/* CITY */}
                        <div className="col-span-2">
                          <Label className="!text-xs !font-semibold !text-gray-500 uppercase block mb-1">City</Label>
                          <input
                            className="w-full border border-gray-300 p-2 rounded-lg text-sm focus:ring-[#800080] focus:border-[#800080]"
                            {...register(`${base}.city`)}
                            placeholder="e.g. Dhaka, Bangladesh"
                          />
                        </div>

                        {/* DESCRIPTION WITH TIPTAP */}
                        <div className="col-span-2">
                          <Label className="!text-xs !font-semibold !text-gray-500 uppercase block mb-1">Description</Label>
                          <Controller
                            name={`${base}.description`}
                            control={control}
                            render={({ field }) => (
                              <TipTapEditor value={field.value} onChange={field.onChange} />
                            )}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index)}
                  >
                    <FaTrash className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD MORE BUTTON */}
      <button
        type="button"
        onClick={() => append({})}
        className="text-sm !text-[#800080] font-medium mt-4 hover:underline inline-block"
      >
        + Add one more item
      </button>
    </>
  );
};

export default CustomSection;