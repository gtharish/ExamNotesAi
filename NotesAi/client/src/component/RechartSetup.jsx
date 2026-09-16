import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
} from "recharts";

const MODERN_COLORS = [
  "#4f46e5", // Indigo
  "#0ea5e9", // Sky
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#8b5cf6", // Violet
  "#ec4899", // Pink
];

// Custom Glassmorphic Tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-neutral-950/95 backdrop-blur-xl border border-white/15 px-3 py-2 shadow-xl text-white text-xs">
        <p className="font-semibold text-neutral-200">{label || payload[0]?.name}</p>
        <p className="text-indigo-300 font-bold mt-0.5">
          Value: <span className="text-white">{payload[0]?.value}</span>
        </p>
      </div>
    );
  }
  return null;
}

export default function RechartSetup({ charts }) {
  if (!Array.isArray(charts) || charts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {charts.map((chart, index) => {
        const data = Array.isArray(chart.data) ? chart.data : [];

        if (data.length === 0) {
          return null;
        }

        const chartType = chart.type?.toLowerCase();

        return (
          <div
            key={index}
            className="rounded-2xl border border-neutral-200/80 bg-neutral-50/40 p-5 sm:p-6 transition-all duration-200"
          >
            {/* Chart Title & Badge */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200/60">
              <h4 className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight">
                {chart.title || `Chart Analysis ${index + 1}`}
              </h4>

              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-neutral-200 text-neutral-600">
                {chartType === "bar"
                  ? "Bar Graph"
                  : chartType === "line"
                  ? "Trend Line"
                  : chartType === "pie"
                  ? "Pie Breakdown"
                  : "Chart"}
              </span>
            </div>

            {/* Chart Canvas */}
            <div className="w-full h-72 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#71717a" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#71717a" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />

                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {data.map((_, i) => (
                        <Cell
                          key={i}
                          fill={MODERN_COLORS[i % MODERN_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                ) : chartType === "line" ? (
                  <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11, fill: "#71717a" }}
                      axisLine={{ stroke: "#e5e7eb" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#71717a" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }}
                      activeDot={{ r: 6, fill: "#4f46e5" }}
                    />
                  </LineChart>
                ) : chartType === "pie" ? (
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />

                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={95}
                      paddingAngle={4}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {data.map((_, i) => (
                        <Cell
                          key={i}
                          fill={MODERN_COLORS[i % MODERN_COLORS.length]}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-neutral-400 font-mono">
                    Unsupported chart visualization type
                  </div>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}