"use client";

import { useState, useEffect, useCallback } from "react";
import FishPriceCard from "@/components/FishPriceCard";
import HistoricalTrends from "@/components/HistoricalTrends";
import { Filter, MapPin, RefreshCw } from "lucide-react";
import { FishPrice } from "@/types";

const ports = ["All", "Chennai", "Kochi", "Mangalore", "Visakhapatnam", "Mumbai"];

export default function PricesPage() {
  const [prices, setPrices] = useState<FishPrice[]>([]);
  const [port, setPort] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/prices?port=${port}`);
      const data = await res.json();
      setPrices(data);
    } catch (error) {
      console.error("Failed to fetch prices:", error);
    }
    setLoading(false);
  }, [port]);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return (
    <div className="min-h-screen bg-soft-white pb-24">
      {/* Header Area */}
      <header className="bg-ocean-blue pt-12 pb-20 px-6 relative rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-black text-white leading-tight mt-2">Live Prices</h1>
            <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">நேரடி விலைகள்</p>
          </div>
          <button 
            onClick={fetchPrices}
            className="p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white active:rotate-180 transition-all"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
        
        {/* Port Filter */}
        <div className="absolute -bottom-8 left-6 right-6 flex gap-2">
          <div className="flex-1 relative">
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean-blue" />
            <select 
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-xl text-sm font-black text-gray-800 border-0 focus:ring-2 focus:ring-sunrise-orange appearance-none"
            >
              {ports.map(p => <option key={p} value={p}>{p === "All" ? "All Major Ports" : p}</option>)}
            </select>
          </div>
          <button className="bg-sunrise-orange text-white p-4 rounded-2xl shadow-xl active:scale-95 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* Price Grid */}
      <main className="px-6 mt-16 space-y-4">
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw size={40} className="mx-auto text-ocean-blue/20 animate-spin mb-4" />
            <p className="text-sm font-bold text-gray-400">Loading Market Data...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{prices.length} Listings Found</span>
              <span className="text-[10px] font-bold text-ocean-blue bg-ocean-blue/5 px-2 py-1 rounded-md">Real-time Data</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {prices.map((item) => (
                <FishPriceCard key={item.id} {...item} />
              ))}
            </div>
            
            {prices.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <p className="text-sm font-bold text-gray-400">No prices available for this port.</p>
              </div>
            )}

            <div className="pt-8">
              <HistoricalTrends />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
