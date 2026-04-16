import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const entries = JSON.parse(localStorage.getItem("timeline") || "[]");
    const counts = entries.reduce((acc, curr) => {
      acc[curr.type] = (acc[curr.type] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));

    setData(chartData);
  }, []);

  const COLORS = ["#2563eb", "#16a34a", "#9333ea"];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Friendship Analytics</h1>
      
      <div className="bg-white p-8 rounded-3xl border">
        <h3 className="text-xl font-bold mb-8 text-center">Interaction Distribution</h3>
        <div className="h-[400px] w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={140}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Not enough data to generate chart.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;