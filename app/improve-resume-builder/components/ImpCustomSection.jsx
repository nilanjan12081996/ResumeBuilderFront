import React, { useState } from "react";
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent, Label } from "flowbite-react";
import TipTapEditor from "../../editor/TipTapEditor";
import { FaTrash } from "react-icons/fa";
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

const ImpCustomSection = ({
    section,
    sectionIndex,
    handleCustomUpdate,
    handleAddCustomItem,
}) => {
    const [deletingId, setDeletingId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleDeleteItem = (itemId) => {
        setDeletingId(itemId);
        setTimeout(() => {
            handleCustomUpdate(sectionIndex, itemId, "delete");
            setDeletingId(null);
        }, 200);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const items = section.items || [];
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) {
            handleCustomUpdate(sectionIndex, null, "reorder", arrayMove(items, oldIndex, newIndex));
        }
    };

    const itemIds = (section.items || []).map((i) => i.id);

    return (
        <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
                    {section.items.map((item, idx) => (
                        <DraggableWrapper key={item.id} id={item.id}>
                            <div
                                className={`
                                    mb-3 transition-all duration-200
                                    ${deletingId === item.id ? "-translate-x-6 opacity-0" : ""}
                                `}
                            >
                                <div className="flex gap-2">
                                    <span className="mt-5">
                                        <DragIcon />
                                    </span>

                                    <Accordion className="w-full !border !border-gray-300 rounded-lg !overflow-hidden">
                                        <AccordionPanel>
                                            <AccordionTitle className="!text-sm !font-semibold">
                                                {item.title || "(Not specified)"}
                                            </AccordionTitle>

                                            <AccordionContent>
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div className="col-span-2">
                                                        <Label className="!text-sm !font-medium !text-gray-500">Title</Label>
                                                        <input
                                                            className="w-full border p-2 rounded"
                                                            value={item.title}
                                                            onChange={(e) =>
                                                                handleCustomUpdate(sectionIndex, item.id, "title", e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <Label className="!text-sm !font-medium !text-gray-500">Start & End Date</Label>
                                                        <div className="flex gap-2 mt-1">
                                                            <div className="flex-1">
                                                                <Datepicker
                                                                    selectedDate={item.startDate}
                                                                    onChange={(date) => handleCustomUpdate(sectionIndex, item.id, "startDate", date)}
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <Datepicker
                                                                    selectedDate={item.endDate}
                                                                    onChange={(date) => handleCustomUpdate(sectionIndex, item.id, "endDate", date)}
                                                                    disabled={item.isOngoing}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2 mt-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`ongoing-custom-${item.id}`}
                                                                checked={item.isOngoing || false}
                                                                onChange={(e) => {
                                                                    const isChecked = e.target.checked;
                                                                    handleCustomUpdate(sectionIndex, item.id, "isOngoing", isChecked);
                                                                    handleCustomUpdate(sectionIndex, item.id, "endDate", isChecked ? 'PRESENT' : '');
                                                                }}
                                                                className="!w-4 !h-4 !rounded !border-gray-300 !text-[#800080] !focus:ring-[#800080]"
                                                            />
                                                            <label htmlFor={`ongoing-custom-${item.id}`} className="text-sm text-gray-700 cursor-pointer">
                                                                Ongoing (Present)
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-2">
                                                        <Label className="!text-sm !font-medium !text-gray-500">City</Label>
                                                        <input
                                                            className="w-full border p-2 rounded"
                                                            value={item.city}
                                                            onChange={(e) =>
                                                                handleCustomUpdate(sectionIndex, item.id, "city", e.target.value)
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-span-2">
                                                        <Label className="!text-sm !font-medium !text-gray-500">Description</Label>
                                                        <TipTapEditor
                                                            value={item.description}
                                                            onChange={(html) =>
                                                                handleCustomUpdate(sectionIndex, item.id, "description", html)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionPanel>
                                    </Accordion>

                                    <div className="flex justify-end pt-3 mt-4 border-t border-gray-200">
                                        <FaTrash
                                            className="text-sm text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                                            title="Delete this item"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteItem(item.id);
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
                onClick={() => handleAddCustomItem(sectionIndex)}
                className="text-sm !text-[#800080] font-medium mt-2"
            >
                + Add one more item
            </button>
        </>
    );
};

export default ImpCustomSection;