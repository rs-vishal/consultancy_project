import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

// Predefined color palette
const initialColors = [
  "#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#14b8a6", "#eab308", "#8b5cf6"
];

// Generate a single random hex color
const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;

const Stats = ({ data }) => {
  const [chartType, setChartType] = useState("bar");

  // Memoize color array extension based on number of categories
  const colors = useMemo(() => {
    const extra = Object.keys(data).length - initialColors.length;
    const additionalColors = Array.from({ length: Math.max(0, extra) }, getRandomColor);
    return [...initialColors, ...additionalColors];
  }, [data]);

  const chartData = useMemo(() => {
    return Object.entries(data).map(([name, enquiries], index) => ({
      name,
      enquiries,
      color: colors[index] || getRandomColor(), 
    })).sort((a, b) => b.enquiries - a.enquiries);
  }, [data, colors]);

  const totalEnquiries = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.enquiries, 0);
  }, [chartData]);

  return (
    <div className="w-full bg-white rounded-lg shadow p-4 sm:p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-semibold">Inquiry Statistics</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="text-sm text-gray-500">Total: {totalEnquiries} Inquiries</span>
          <div className="flex bg-gray-100 rounded-md p-1 mt-1 sm:mt-0">
            {["bar", "pie", "line"].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1 text-sm rounded-md ${
                  chartType === type ? "bg-blue-500 text-white" : "text-gray-700"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" && (
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-35}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="enquiries">
                {chartData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}

          {chartType === "pie" && (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="enquiries"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell key={`pie-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          )}

          {chartType === "line" && (
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-35}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="enquiries" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Inquiries</h3>
          <p className="text-xl font-bold text-gray-800">{totalEnquiries}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Most Popular</h3>
          <p className="text-xl font-bold text-gray-800">
            {chartData.length > 0 ? chartData[0].name : "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            {chartData.length > 0 ? `${chartData[0].enquiries} inquiries` : ""}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Categories</h3>
          <p className="text-xl font-bold text-gray-800">{chartData.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;

