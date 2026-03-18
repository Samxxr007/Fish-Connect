"use client";

import { AlertTriangle, TrendingUp, Info } from "lucide-react";

interface SpikeAlertProps {
  species: string;
  spikePercentage: number;
}

export default function SpikeAlert({ species, spikePercentage }: SpikeAlertProps) {
  return (
    <div className="bg-gradient-to-r from-red-500 to-sunrise-orange rounded-2xl p-5 shadow-lg shadow-orange-100 text-white overflow-hidden relative">
      <div className="relative z-10 flex items-start gap-4">
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
          <AlertTriangle size={24} className="text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-black text-lg uppercase tracking-tight">Demand Spike Alert!</h3>
            <span className="bg-white text-red-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">High Catch Recommended</span>
          </div>
          <p className="text-sm font-medium opacity-90 leading-snug">
            Demand for <span className="font-black underline decoration-2 underline-offset-2">{species}</span> is predicted to rise by <span className="font-black text-xl">{spikePercentage}%</span> this week.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/20">
              <TrendingUp size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Prices Up</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm border border-white/20">
              <Info size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Festival Season</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background circle */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
    </div>
  );
}
