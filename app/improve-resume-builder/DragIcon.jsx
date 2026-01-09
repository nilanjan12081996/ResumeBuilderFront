import { useContext } from "react";
import { DragHandleContext } from "./DraggableWrapper";
import { RiDraggable } from "react-icons/ri";
const DragIcon = () => {
  const ctx = useContext(DragHandleContext);
  if (!ctx) return null;

  return (
    <span
      {...ctx.attributes}
      {...ctx.listeners}
      className="inline-flex cursor-grab"
    >
      <RiDraggable className="text-xl" />
    </span>
  );
};

export default DragIcon;
