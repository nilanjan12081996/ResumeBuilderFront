import React from "react";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import TipTapEditor from "../../editor/TipTapEditor";
import Datepicker from "../../ui/Datepicker";

const ImpAchievements = ({
  section,
  sectionIndex,
  handleUpdate,
  handleDragStart,
  handleDrop,
  draggedIndex,
  handleAdd,
  handleDragEnd
}) => {
  console.log('section', section)
  return (
    <>
      <p className="text-sm text-gray-500 mb-3">
        Showcase key achievements, activities or publications.
      </p>

      {section.items.map((item, i) => (
        <div
          key={item.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, sectionIndex, i)}
          className="mb-3"
        >
          <div className="flex gap-2">
            <span
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragEnd={handleDragEnd}
              className="mt-5 cursor-grab"
            >
              <TbDragDrop className="text-xl text-[#656e83]" />
            </span>

            <Accordion collapseAll className="w-full border rounded-lg">
              <AccordionPanel>
                <AccordionTitle className="text-sm font-semibold">
                  {item.title || "(Awaiting Input)"}
                </AccordionTitle>

                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Title</Label>
                      <input
                        value={item.title}
                        onChange={(e) =>
                          handleUpdate(sectionIndex, item.id, "title", e.target.value)
                        }
                        className="w-full border p-2 text-sm rounded"
                      />
                    </div>

                    <div>
                      <Label>City</Label>
                      <input
                        value={item.city}
                        onChange={(e) =>
                          handleUpdate(sectionIndex, item.id, "city", e.target.value)
                        }
                        className="w-full border p-2 text-sm rounded"
                      />
                    </div>

                    {/* Date Section */}
                    <div className='md:col-span-2'>
                      <Label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Start & End Date</Label>
                      <div className='flex gap-2 mt-1'>
                        <div className="flex-1">
                          <Datepicker
                            selectedDate={item.startDate}
                            onChange={(date) => handleUpdate(sectionIndex, item.id, "startDate", date)}
                          />
                        </div>
                        <div className="flex-1">
                          <Datepicker
                            selectedDate={item.endDate}
                            onChange={(date) => handleUpdate(sectionIndex, item.id, "endDate", date)}
                            disabled={item.isOngoing}
                          />
                        </div>
                      </div>

                      {/* Ongoing Checkbox */}
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id={`ongoing-${item.id}`}
                          checked={item.isOngoing || false}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            handleUpdate(sectionIndex, item.id, "isOngoing", isChecked);
                            handleUpdate(sectionIndex, item.id, "endDate", isChecked ? 'PRESENT' : '');
                          }}
                          className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                        />
                        <label htmlFor={`ongoing-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                          Ongoing (Present)
                        </label>
                      </div>
                    </div>
                  </div>

                  <Label>Description</Label>
                  <TipTapEditor
                    value={item.description}
                    onChange={(html) =>
                      handleUpdate(sectionIndex, item.id, "description", html)
                    }
                  />
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => handleAdd(sectionIndex)}
        className="text-sm text-[#800080] font-medium"
      >
        + Add one more
      </button>
    </>
  );
};

export default ImpAchievements;
