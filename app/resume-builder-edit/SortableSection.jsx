'use client';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { MdDragIndicator } from "react-icons/md";
import { TbDragDrop } from "react-icons/tb";

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
    marginTop: '5px',
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative'
  };

  return (
    <div ref={setNodeRef} style={style}>
        <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
      <Accordion collapseAll className="border-none">
        <AccordionPanel>
          <AccordionTitle className="focus:ring-0 bg-white hover:bg-gray-50 outline-none border-b-0 open:border-b-0">
             <div className="flex items-center gap-2 w-full">
                <div
                  {...attributes} 
                  {...listeners}
                  className="cursor-move text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
                </div>
                <span className="font-bold text-xl">{title}</span>
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
