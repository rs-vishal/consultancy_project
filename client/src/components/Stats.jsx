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

const Stats = () => {
  const [data] = useState({
    "Web Development": 45,
    "Data Science": 30,
    "AI & ML": 25,
    "Cybersecurity": 15,
    "Cloud Computing": 35,
    "DevOps": 20
  });

  const [chartType, setChartType] = useState("bar");

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  const chartData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) return [];

    const allCategories = [...new Set(Object.keys(data))];
    return allCategories
      .map((category) => ({
        name: category,
        enquiries: data[category] || 0
      }))
      .sort((a, b) => b.enquiries - a.enquiries);
  }, [data]);

  const totalEnquiries = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.enquiries, 0);
  }, [chartData]);

  if (chartData.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-white rounded-lg shadow-lg">
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold text-gray-700">No Data Available</h3>
          <p className="text-gray-500 mt-2">There are no inquiries to display at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Inquiry Statistics</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Total: {totalEnquiries} Inquiries</span>
          <div className="border-l border-gray-300 h-6 mx-2"></div>
          <div className="flex bg-gray-100 rounded-md p-1">
            {["bar", "pie", "line"].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1 text-sm rounded-md ${chartType === type ? "bg-blue-500 text-white" : "text-gray-700"}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" && (
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={{ fill: '#666' }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#666' }} allowDecimals={false} domain={[0, 'auto']} />
              <Tooltip formatter={(value) => [`${value} Inquiries`, '']} />
              <Legend />
              <Bar dataKey="enquiries" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}

          {chartType === "pie" && (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="enquiries"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          )}

          {chartType === "line" && (
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={{ fill: '#666' }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#666' }} allowDecimals={false} domain={[0, 'auto']} />
              <Tooltip formatter={(value) => [`${value} Inquiries`, '']} />
              <Legend />
              <Line type="monotone" dataKey="enquiries" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Inquiries</h3>
          <p className="text-2xl font-bold text-gray-800">{totalEnquiries}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Most Popular</h3>
          <p className="text-2xl font-bold text-gray-800">
            {chartData.length > 0 ? chartData[0].name : 'N/A'}
          </p>
          <p className="text-sm text-gray-500">
            {chartData.length > 0 ? `${chartData[0].enquiries} inquiries` : ''}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Categories</h3>
          <p className="text-2xl font-bold text-gray-800">{chartData.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
