import React from "react";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import TipTapEditor from "../../editor/TipTapEditor";

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
    console.log('section',section)
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
                  {item.title || "(Not specified)"}
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

                    <div>
                      <Label>Start Date</Label>
                      <input
                        value={item.startDate}
                        onChange={(e) =>
                          handleUpdate(sectionIndex, item.id, "startDate", e.target.value)
                        }
                        className="w-full border p-2 text-sm rounded"
                      />
                    </div>

                    <div>
                      <Label>End Date</Label>
                      <input
                        value={item.endDate}
                        onChange={(e) =>
                          handleUpdate(sectionIndex, item.id, "endDate", e.target.value)
                        }
                        className="w-full border p-2 text-sm rounded"
                      />
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
