import { useDashboard } from "../../hooks/useDashboard";
import { widgetRegistry } from "../../utils/widgetRegistry";
import WidgetWrapper from "./WidgetWrapper";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";

const Grid = () => {
  const { widgets, layout, setLayout } = useDashboard();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const orderedWidgets = layout
    .map((id) => widgets.find((w) => w.id === id))
    .filter(Boolean);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = layout.indexOf(active.id);
      const newIndex = layout.indexOf(over.id);

      const newLayout = [...layout];
      newLayout.splice(oldIndex, 1);
      newLayout.splice(newIndex, 0, active.id);

      setLayout(newLayout);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={layout} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {orderedWidgets.map((widget) => {
              const Component = widgetRegistry[widget.type]?.component;
              return (
                <WidgetWrapper
                  key={widget.id}
                  widget={{ ...widget, component: Component }}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Grid;
