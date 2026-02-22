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
  arrayMove,
} from "@dnd-kit/sortable";
import DraggableWrapper from "../DraggableWrapper";
import DragIcon from "../DragIcon";

const ImpSimpleCustomSection = ({
  section,
  sectionIndex,
  handleUpdate,
}) => {
  const levels = ["Novice", "Beginner", "Skillful", "Experienced", "Expert"];
  const tabColors = ["#ffeaec", "#feebe3", "#fff2cc", "#e7f4ed", "#f1f2ff"];
  const textColor = ["#fe7d8b", "#f68559", "#ec930c", "#48ba75", "#9ba1fb"];

  const [editingIndex, setEditingIndex] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Default OFF (true = hidden, false = shown)
  const hideExperienceLevel = section.hideExperienceLevel ?? true;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Dynamic helper text based on section title
  const getHelperText = () => {
    const title = section.title?.toLowerCase() || "";
    if (title.includes("competenc")) return "Highlight your strongest competencies relevant to the role.";
    if (title.includes("technolog") || title.includes("tech")) return "List the technologies you're proficient in.";
    if (title.includes("tool")) return "Add tools and software you can work with.";
    if (title.includes("framework")) return "Include frameworks you have experience with.";
    if (title.includes("language")) return "List programming or spoken languages you know.";
    return "Add items for this section.";
  };

  const handleDelete = (itemId, index) => {
    setDeletingId(itemId);
    setTimeout(() => {
      handleUpdate(sectionIndex, index, "delete");
      setDeletingId(null);
    }, 200);
  };

  const addItem = () => {
    handleUpdate(sectionIndex, null, "add", {
      id: `simple_${Date.now()}`,
      name: "",
      level: 2,
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const items = section.items || [];
    const oldIndex = items.findIndex((item) => (item?.id || `item-${items.indexOf(item)}`) === active.id);
    const newIndex = items.findIndex((item) => (item?.id || `item-${items.indexOf(item)}`) === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      handleUpdate(sectionIndex, null, "reorder", arrayMove(items, oldIndex, newIndex));
    }
  };

  const itemIds = (section.items || []).map((item, i) => item?.id || `item-${i}`);

  return (
    <>
      <div>
        <p className="!text-sm !font-medium !text-gray-500">
          {getHelperText()}
        </p>

        {/* Toggle Button - Initially OFF */}
        <div className="flex items-center gap-2 my-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!hideExperienceLevel}
              onChange={(e) =>
                handleUpdate(sectionIndex, null, "hideExperienceLevel", !e.target.checked)
              }
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
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {(section.items || []).map((item, i) => {
            const itemId = item?.id || `item-${i}`;
            const isEditing = editingIndex === i;
            const displayName = typeof item === "object" ? (item.name || item.title) : item;
            const currentLevel = typeof item === "object" ? (item.level ?? 2) : 2;

            return (
              <DraggableWrapper key={itemId} id={itemId}>
                <div
                  className={`
                    group flex items-center justify-between gap-4 p-2 !border-b !border-gray-300
                    transition-all duration-200 ease-in-out
                    ${deletingId === itemId ? "-translate-x-6 opacity-0 bg-red-50" : "bg-white"}
                  `}
                >
                  <DragIcon />

                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={displayName || ""}
                        autoFocus
                        onChange={(e) => handleUpdate(sectionIndex, i, "name", e.target.value)}
                        onBlur={() => {
                          setEditingIndex(null);
                          if (!displayName?.trim()) handleDelete(itemId, i);
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
                              handleDelete(itemId, i);
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
                        onSelect={(tabIndex) => handleUpdate(sectionIndex, i, "level", tabIndex)}
                      >
                        <TabList className="flex gap-1">
                          {levels.map((lvl, idx) => (
                            <Tab key={idx} className="outline-none">
                              <div
                                className={`
                                  w-6 h-6 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300
                                  ${currentLevel === idx ? "scale-110 border border-[#800080] shadow-md" : "opacity-60 hover:opacity-100"}
                                `}
                                style={{ backgroundColor: tabColors[idx], color: textColor[idx] }}
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

export default ImpSimpleCustomSection;