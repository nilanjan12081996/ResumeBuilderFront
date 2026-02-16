'use client';
import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { TbDragDrop } from "react-icons/tb";
import { FaPen, FaTrash } from "react-icons/fa";

export function SortableSection({ 
  id, 
  title, 
  children, 
  onTitleUpdate,
  onDelete,
  canDelete = true 
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginTop: '5px',
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative'
  };

  // ✅ Update local state when title prop changes
  useEffect(() => {
    setEditedTitle(title);
  }, [title]);

  const handleTitleSave = () => {
    if (editedTitle.trim() && onTitleUpdate) {
      onTitleUpdate(editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleSave();
    } else if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <Accordion collapseAll className="border-none">
          <AccordionPanel>
            <AccordionTitle className="focus:ring-0 bg-white hover:bg-gray-50 outline-none border-b-0 open:border-b-0 group">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2 flex-1">
                  <span
                    {...attributes} 
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                  </span>

                  {/* ✅ Title - Editable */}
                  {isEditingTitle ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      onBlur={handleTitleSave}
                      onKeyDown={handleTitleKeyDown}
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                      className="text-xl font-bold bg-transparent border-b border-purple-600 outline-none px-0 flex-1"
                    />
                  ) : (
                    <span 
                      className="font-bold text-xl cursor-pointer hover:text-purple-600 transition-colors flex-1 mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsEditingTitle(true);
                      }}
                    >
                      {title}
                    </span>
                  )}
                </div>

                {/* ✅ Edit & Delete Icons - Hover এ smooth transition সহ দেখাবে */}
                <div 
                  className="flex items-center gap-3 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaPen
                    className="text-sm text-gray-400 hover:text-purple-600 cursor-pointer transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingTitle(true);
                    }}
                  />
                  {canDelete && onDelete && (
                    <FaTrash
                      className="text-sm text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                      }}
                    />
                  )}
                </div>
              </div>
            </AccordionTitle>
            <AccordionContent className="!pt-0">
              {children}
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
    </div>
  );
}