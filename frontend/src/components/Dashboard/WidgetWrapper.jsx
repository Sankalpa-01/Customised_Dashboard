// import { useDashboard } from "../../hooks/useDashboard";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { X, Settings } from "lucide-react";
// import { motion } from "framer-motion"; // Import Animation

// const WidgetWrapper = ({ widget }) => {
//   const { removeWidget } = useDashboard();

//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: widget.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     zIndex: isDragging ? 100 : 1, // Keep dragged item on top
//   };

//   return (
//     <motion.div
//       ref={setNodeRef}
//       style={style}
//       layout // Automagic layout animations
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
//       whileHover={{ scale: 1.02, borderColor: "#4ade80" }} // Slight zoom on hover
//       className="relative p-4 rounded-xl border border-green-900 bg-black/80 backdrop-blur-sm shadow-xl flex flex-col h-72 overflow-hidden group"
//     >
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4 border-b border-green-900/50 pb-2">
//         <div
//           {...attributes}
//           {...listeners}
//           className="cursor-move font-mono text-green-400 font-bold text-sm tracking-wider select-none flex items-center gap-2"
//         >
//           <span className="text-green-700">::</span> {widget.title}
//         </div>

//         <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//           <button
//             onClick={() => removeWidget(widget.id)}
//             className="text-red-500 hover:text-red-400 transition-colors"
//           >
//             <X size={16} />
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-hidden">
//         {widget.component && <widget.component config={widget.config} />}
//       </div>
//     </motion.div>
//   );
// };

// export default WidgetWrapper;

// import { useDashboard } from "../../hooks/useDashboard";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import { X, GripVertical } from "lucide-react";
// import { motion } from "framer-motion";

// const WidgetWrapper = ({ widget }) => {
//   const { removeWidget } = useDashboard();

//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: widget.id });

//   // FIX: Apply drag styles to the OUTER div
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     zIndex: isDragging ? 50 : 1,
//   };

//   return (
//     // OUTER DIV: Handles Dragging (dnd-kit)
//     <div ref={setNodeRef} style={style} className="h-full">
//       {/* INNER DIV: Handles Animation (framer-motion) */}
//       <motion.div
//         layout
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.5 }}
//         className={`relative p-0 rounded-xl border border-green-900 bg-black/80 backdrop-blur-sm shadow-xl flex flex-col h-72 overflow-hidden group hover:border-green-500/50 transition-colors ${isDragging ? "opacity-50 ring-2 ring-green-500" : ""}`}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-center p-3 border-b border-green-900/30 bg-green-900/10">
//           {/* Drag Handle */}
//           <div
//             {...attributes}
//             {...listeners}
//             className="cursor-grab active:cursor-grabbing text-green-600 hover:text-green-400 p-1 rounded hover:bg-green-900/30 transition-colors"
//           >
//             <GripVertical size={18} />
//           </div>

//           <span className="font-mono text-green-500 text-sm font-bold tracking-wider flex-1 ml-2 select-none truncate">
//             {widget.title}
//           </span>

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               removeWidget(widget.id);
//             }}
//             className="text-green-800 hover:text-red-500 transition-colors p-1"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-hidden relative p-2">
//           {widget.component && <widget.component config={widget.config} />}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default WidgetWrapper;

import React, { memo } from "react"; // Import memo
import { useDashboard } from "../../hooks/useDashboard";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

// Wrap in memo to prevent unnecessary re-renders during drag
const WidgetWrapper = memo(({ widget }) => {
  const { removeWidget } = useDashboard();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Translate.toString(transform), // Use Translate instead of Transform for better performance
    transition, // dnd-kit handles the smooth reordering animation
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="h-full touch-none">
      {/* touch-none prevents mobile scrolling interfering with drag */}

      <motion.div
        // REMOVED "layout" prop - This was the cause of the lag!
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
          {widget.component && <widget.component config={widget.config} />}
        </div>
      </motion.div>
    </div>
  );
});

export default WidgetWrapper;
