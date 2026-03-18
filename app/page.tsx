"use client";

import { useState, useEffect, useCallback } from "react";
import DemandChart from "@/components/DemandChart";
import SpikeAlert from "@/components/SpikeAlert";
import SeaConditions from "@/components/SeaConditions";
import { Waves, Zap, Anchor, Filter, TrendingUp } from "lucide-react";
import Link from "next/link";
import { DemandForecast } from "@/types";

export default function Home() {
  const [forecast, setForecast] = useState<DemandForecast | null>(null);
  const [species, setSpecies] = useState("Prawns");
  const [loading, setLoading] = useState(true);

  const fetchForecast = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/forecast?species=${species}`);
      const data = await res.json();
      setForecast(data);
    } catch (error) {
      console.error("Failed to fetch forecast:", error);
    }
    setLoading(false);
  }, [species]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  const topRecommendations = [
    { name: "Prawns", icon: "🦐", demand: "+45%", port: "Chennai" },
    { name: "Tuna", icon: "🐟", demand: "+32%", port: "Kochi" },
    { name: "Pomfret", icon: "🐟", demand: "+28%", port: "Mumbai" },
  ];

  return (
    <div className="min-h-screen bg-soft-white pb-24">
      {/* Hero Header */}
      <header className="bg-ocean-blue pt-12 pb-24 px-6 relative rounded-b-[40px] overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Waves className="text-sunrise-orange" size={24} />
            <span className="text-white/60 font-black text-xs uppercase tracking-widest">FishConnect App</span>
          </div>
          <h1 className="text-4xl font-black text-white leading-[1.1]">
            Go <span className="text-sunrise-orange">Better</span> Catch, <br />
            Earn <span className="text-sunrise-orange">More</span> Profit.
          </h1>
          <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] mt-2 italic">நேரடி விலை மற்றும் தேவை கணிப்பு</p>
        </div>
      </header>

      <main className="px-6 -mt-12 space-y-8 relative z-20">
        {/* Sea Conditions Widget */}
        <section>
          <SeaConditions />
        </section>

        {/* Demand Spike Predictor Card */}
        <section className="space-y-4">
          <div className="flex justify-between items-end px-1">
            <div>
              <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
                <Zap size={20} className="text-sunrise-orange fill-sunrise-orange" />
                Demand Predictor
              </h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">தேவை முன்கணிப்பு</p>
            </div>
            <select 
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="bg-white border-0 text-xs font-black text-ocean-blue rounded-xl px-4 py-2 shadow-lg focus:ring-2 focus:ring-ocean-blue"
            >
              <option value="Prawns">🦐 Prawns</option>
              <option value="Tuna">🐟 Tuna</option>
            </select>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-xl border border-gray-100">
            {loading ? (
              <div className="h-[250px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-blue"></div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4 px-2">
                   <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase">Current Reliability</p>
                     <p className="text-sm font-black text-green-600">94% Accurate</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-bold text-gray-400 uppercase">Season</p>
                     <p className="text-sm font-black text-gray-800">Export High</p>
                   </div>
                </div>
                <DemandChart data={forecast?.forecast || []} />
              </>
            )}
          </div>

          {!loading && species === "Prawns" && (
            <SpikeAlert species="Prawns" spikePercentage={45} />
          )}
        </section>

        {/* Top Recommendations */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-ocean-blue" />
              Smart Catch Tips
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">சிறந்த பரிந்துரைகள்</p>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
            {topRecommendations.map((item, idx) => (
              <div key={idx} className="min-w-[180px] bg-white rounded-2xl p-4 shadow-lg border border-gray-50 flex flex-col gap-3">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{item.name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold">{item.port}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-green-600 font-black text-sm">{item.demand}</span>
                  <div className="bg-green-100 text-green-600 p-1.5 rounded-lg">
                    <TrendingUp size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <Link href="/prices" className="bg-white p-5 rounded-3xl shadow-lg border border-gray-50 flex flex-col items-center gap-3 active:scale-95 transition-all">
            <div className="bg-ocean-blue/10 p-4 rounded-2xl text-ocean-blue">
              <Anchor size={28} />
            </div>
            <span className="text-sm font-black text-gray-800">Check Prices</span>
          </Link>
          <Link href="/buyers" className="bg-white p-5 rounded-3xl shadow-lg border border-gray-50 flex flex-col items-center gap-3 active:scale-95 transition-all">
            <div className="bg-sunrise-orange/10 p-4 rounded-2xl text-sunrise-orange">
              <Filter size={28} />
            </div>
            <span className="text-sm font-black text-gray-800">Find Buyers</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
