import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const entries = window.myGlobalTimeline || [];
    
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


  const COLORS = ["#8B5CF6", "#1E3A2F", "#34A853"];

  return (

    <div className="max-w-6xl mx-auto p-10 bg-[#F8FAFC]">
      

      <div className="mb-8">
        <h1 className="text-[48px] font-black text-[#1E293B]">Friendship Analytics</h1>
      </div>
      

      <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-xl shadow-slate-100/70 min-h-[500px]">

        <h3 className="text-[#244D3F] text-lg font-bold mb-4">By Interaction Type</h3>
        
        <div className="h-[400px] w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  

                  activeShape={false} 
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      

                      className="focus:outline-none" 
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  align="center"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingTop: "40px", color: "#64748B" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 font-medium italic">
              Not enough data to generate chart. (Log some friends!)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;