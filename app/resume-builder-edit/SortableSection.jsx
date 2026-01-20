'use client';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { MdDragIndicator } from "react-icons/md";

export function SortableSection({ id, title, children }) {
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
    marginBottom: '1rem',
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative'
  };

  return (
    <div ref={setNodeRef} style={style}>
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
      <Accordion collapseAll className="border-none">
        <AccordionPanel>
          <AccordionTitle className="focus:ring-0 bg-white hover:bg-gray-50 py-3 px-4 outline-none border-b-0 open:border-b-0">
             <div className="flex items-center gap-2 w-full">
                <div
                  {...attributes} 
                  {...listeners}
                  className="cursor-move text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdDragIndicator size={20} />
                </div>
                <span className="text-base font-semibold text-gray-800">{title}</span>
             </div>
          </AccordionTitle>
          <AccordionContent className="p-4 border-t border-gray-100">
             {children}
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
      </div>
    </div>
  );
}
