"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";

interface DemandChartProps {
  data: { day: number; demand_index: number; spike_reason?: string }[];
}

export default function DemandChart({ data }: DemandChartProps) {
  return (
    <div className="w-full h-[250px] bg-white rounded-xl p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0077B6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0077B6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#9CA3AF' }} 
            label={{ value: 'Next 30 Days', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#9CA3AF' }}
          />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white shadow-xl rounded-lg p-3 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Day {data.day}</p>
                    <p className="text-sm font-black text-gray-800">Demand: {data.demand_index}</p>
                    {data.spike_reason && (
                      <p className="text-[10px] font-bold text-sunrise-orange mt-1">🔥 {data.spike_reason}</p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />
          <Area 
            type="monotone" 
            dataKey="demand_index" 
            stroke="#0077B6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorDemand)" 
          />
          {data.map((entry, index) => entry.spike_reason ? (
            <ReferenceLine 
              key={index} 
              x={entry.day} 
              stroke="#F4A261" 
              strokeDasharray="3 3" 
            />
          ) : null)}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
