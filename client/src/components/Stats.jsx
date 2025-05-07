import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const Stats = ({ data }) => {
  // Use useMemo to optimize performance
  const chartData = useMemo(() => {
    const allCategories = [...new Set(Object.keys(data))];
    return allCategories
      .map((category) => ({
        name: category,
        enquires: data[category] || 0
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  return (
    <div className="w-full h-[400px] mt-10 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-center">Inquiry Statistics</h2>
      <div className="w-full h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#666' }}
              tickLine={{ stroke: '#666' }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              tick={{ fill: '#666' }}
              tickLine={{ stroke: '#666' }}
              allowDecimals={false}
              domain={[0, 'auto']}
              min={0}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px'
              }}
              formatter={(value) => [`${value === 0 ? 'No' : value} Enquiries`, '']}
              labelStyle={{ color: '#666' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }}/>
            <Bar 
              dataKey="enquires" 
              name="Enquiries"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              minPointSize={5}
              animationDuration={300}
              animationBegin={0}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;