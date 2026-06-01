import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createContext } from "react";

export const DragHandleContext = createContext(null);

const DraggableWrapper = ({ id, children, collapseOnDrag, width }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    zIndex: isDragging ? 10 : 1,
    '--field-width': width || '100%',
    ...(collapseOnDrag && isDragging ? {
      maxHeight: '35px',
      overflow: 'hidden',
      border: '1px dashed #800080',
      borderRadius: '6px',
      backgroundColor: '#fdfbff',
    } : {}),
  };

  return (
    <DragHandleContext.Provider value={{ attributes, listeners, isDragging }}>
      <div ref={setNodeRef} style={style} className="w-full md:w-[var(--field-width)]">
        {children}
      </div>
    </DragHandleContext.Provider>
  );
};

export default DraggableWrapper;