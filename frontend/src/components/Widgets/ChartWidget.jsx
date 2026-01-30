import React, { memo } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-green-900/50 p-3 rounded shadow-xl backdrop-blur-md">
        <p className="text-gray-200 font-bold mb-1 text-sm">
          {label || payload[0].name}
        </p>
        <p className="text-green-500 font-mono text-sm">
          value :{" "}
          <span className="font-bold text-green-400">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ChartWidget = memo(({ config }) => {
  const { chartType = "bar", data } = config;

  const COLORS = ["#22c55e", "#16a34a", "#15803d", "#14532d"];

  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="label" stroke="#666" tick={{ fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fontSize: 12 }} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#22c55e", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.3}
            />
          </AreaChart>
        );
      case "pie":
        return (
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              stroke="#111"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        );
      case "bar":
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="label" stroke="#666" tick={{ fontSize: 12 }} />
            <YAxis stroke="#666" tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#111" }} />
            <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <div className="h-full w-full min-h-25">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
});

export default ChartWidget;
