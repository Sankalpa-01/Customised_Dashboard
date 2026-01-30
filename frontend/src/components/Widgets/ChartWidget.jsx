// import React from "react";
// import {
//   BarChart,
//   Bar,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const ChartWidget = ({ config }) => {
//   const { chartType = "bar", data, color } = config;

//   // Hacker-theme colors for charts
//   const COLORS = ["#22c55e", "#16a34a", "#15803d", "#14532d"];

//   const renderChart = () => {
//     switch (chartType) {
//       case "area":
//         return (
//           <AreaChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//             <XAxis dataKey="label" stroke="#888" />
//             <YAxis stroke="#888" />
//             <Tooltip
//               contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
//             />
//             <Area
//               type="monotone"
//               dataKey="value"
//               stroke="#22c55e"
//               fill="#22c55e"
//               fillOpacity={0.3}
//             />
//           </AreaChart>
//         );
//       case "pie":
//         return (
//           <PieChart>
//             <Tooltip
//               contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
//             />
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="label"
//               cx="50%"
//               cy="50%"
//               outerRadius={60}
//               fill="#8884d8"
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//           </PieChart>
//         );
//       case "bar":
//       default:
//         return (
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#333" />
//             <XAxis dataKey="label" stroke="#888" />
//             <YAxis stroke="#888" />
//             <Tooltip
//               cursor={{ fill: "#333" }}
//               contentStyle={{ backgroundColor: "#111", borderColor: "#333" }}
//             />
//             <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
//           </BarChart>
//         );
//     }
//   };

//   return (
//     <div className="h-full w-full min-h-50">
//       <ResponsiveContainer width="100%" height="100%">
//         {renderChart()}
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ChartWidget;

import React, { memo } from "react"; // Import memo
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

// Wrap in memo
const ChartWidget = memo(({ config }) => {
  const { chartType = "bar", data } = config;

  const COLORS = ["#22c55e", "#16a34a", "#15803d", "#14532d"];

  // Memoize the chart renderer so it doesn't flicker
  const renderChart = () => {
    switch (chartType) {
      case "area":
        return (
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="label" stroke="#888" tick={{ fontSize: 12 }} />
            <YAxis stroke="#888" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
              }}
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
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
              }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
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
            <XAxis dataKey="label" stroke="#888" tick={{ fontSize: 12 }} />
            <YAxis stroke="#888" tick={{ fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "#333" }}
              contentStyle={{
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
              }}
            />
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
