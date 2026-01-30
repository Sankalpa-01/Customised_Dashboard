import TextWidget from "../components/Widgets/TextWidget";
import ChartWidget from "../components/Widgets/ChartWidget";

export const WIDGET_TYPES = {
  TEXT: "text",
  CHART: "chart",
};

export const widgetRegistry = {
  [WIDGET_TYPES.TEXT]: {
    component: TextWidget,
    label: "System Note",
    defaultConfig: { content: "", color: "bg-transparent" },
  },
  [WIDGET_TYPES.CHART]: {
    component: ChartWidget,
    label: "Data Analytics",
    defaultConfig: {
      chartType: "bar",
      data: [
        { label: "Q1", value: 400 },
        { label: "Q2", value: 300 },
        { label: "Q3", value: 550 },
        { label: "Q4", value: 200 },
      ],
    },
  },
};
