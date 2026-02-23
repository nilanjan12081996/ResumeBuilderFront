import { useContext } from "react";
import { DragHandleContext } from "./DraggableWrapper";
import { TbDragDrop } from "react-icons/tb";

const DragIcon = () => {
  const ctx = useContext(DragHandleContext);
  if (!ctx) return null;

  return (
    <span
      {...ctx.attributes}
      {...ctx.listeners}
      className="inline-flex cursor-grab active:cursor-grabbing"
    >
      <TbDragDrop className="text-xl text-[#656e83] hover:text-[#800080]" />
    </span>
  );
};

export default DragIcon;