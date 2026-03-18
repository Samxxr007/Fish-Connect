"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Info, History, Map } from "lucide-react";

const productionData = [
  { state: "Andhra Pradesh", total: 1800000, color: "#0077B6" },
  { state: "West Bengal", total: 1500000, color: "#0077B6" },
  { state: "Gujarat", total: 780000, color: "#F4A261" },
  { state: "Kerala", total: 670000, color: "#F4A261" },
  { state: "Tamil Nadu", total: 620000, color: "#F4A261" },
];

export default function HistoricalTrends() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4 mb-10">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            <History size={20} className="text-ocean-blue" />
            Market Insights
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">வரலாற்று தரவு</p>
        </div>
        <div className="bg-ocean-blue/5 p-2 rounded-lg text-ocean-blue">
          <Map size={18} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-gray-500 font-medium">
          Historical data on State-wise Fish Production based on Government records.
        </p>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productionData} layout="vertical" margin={{ left: -20, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="state" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#4B5563" }} 
                width={100}
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length && payload[0].value !== undefined) {
                    return (
                      <div className="bg-white p-2 shadow-lg border rounded-lg text-xs font-bold font-sans">
                        {payload[0].value.toLocaleString()} Tons
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                {productionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl border border-gray-100">
        <Info size={14} className="text-ocean-blue shrink-0" />
        <p className="text-[10px] text-gray-400 font-medium leading-tight">
          Resource ID: 579b464d...314f (Source: data.gov.in). Use this for long-term supply trend analysis.
        </p>
      </div>
    </div>
  );
}
