import React, { memo } from "react"; // Import memo
import { useDashboard } from "../../hooks/useDashboard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

// Wrap in memo to prevent unnecessary re-renders during drag
const WidgetWrapper = memo(({ widget }) => {
  const { removeWidget, updateWidget } = useDashboard();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="h-full touch-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
        className={`relative p-0 rounded-xl border border-green-900 bg-black/80 backdrop-blur-sm shadow-xl flex flex-col h-72 overflow-hidden group hover:border-green-500/50 transition-colors ${isDragging ? "opacity-80 ring-2 ring-green-500 shadow-2xl shadow-green-500/20" : ""}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-green-900/30 bg-green-900/10">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-green-600 hover:text-green-400 p-1 rounded hover:bg-green-900/30 transition-colors"
          >
            <GripVertical size={18} />
          </div>

          <span className="font-mono text-green-500 text-sm font-bold tracking-wider flex-1 ml-2 select-none truncate">
            {widget.title}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              removeWidget(widget.id);
            }}
            className="text-green-800 hover:text-red-500 transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative p-2">
          {widget.component && (
            /* FIX 2: Pass the onChange prop so the widget can update state */
            <widget.component
              config={widget.config}
              onChange={(newConfig) =>
                updateWidget(widget.id, { config: newConfig })
              }
            />
          )}
        </div>
      </motion.div>
    </div>
  );
});

export default WidgetWrapper;
