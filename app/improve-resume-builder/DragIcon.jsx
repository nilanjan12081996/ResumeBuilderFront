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
      className="inline-flex cursor-grab"
    >
      <TbDragDrop className="text-xl" />
    </span>
  );
};

export default DragIcon;
