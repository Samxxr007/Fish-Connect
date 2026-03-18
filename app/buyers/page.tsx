"use client";

import { useState, useEffect } from "react";
import BuyerCard from "@/components/BuyerCard";
import { Search, Filter, Fish, MapPin, Building2, RefreshCw } from "lucide-react";

const species = ["All", "Tuna", "Prawns", "Mackerel", "Sardine", "Pomfret", "Crab", "Squid", "Kingfish", "Lobster", "Snapper"];
const types = ["All", "Exporter", "Hotel", "Supermarket", "Restaurant"];
const locations = ["All", "Chennai", "Kochi", "Mangalore", "Visakhapatnam", "Mumbai"];

export default function BuyersPage() {
  const [buyers, setBuyers] = useState([]);
  const [filters, setFilters] = useState({ species: "All", type: "All", location: "All" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuyers();
  }, [filters]);

  const fetchBuyers = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/buyers?${query}`);
      const data = await res.json();
      setBuyers(data);
    } catch (error) {
      console.error("Failed to fetch buyers:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-soft-white pb-24">
      <header className="bg-ocean-blue pt-12 pb-24 px-6 relative rounded-b-[40px] shadow-lg">
        <div>
          <h1 className="text-3xl font-black text-white leading-tight mt-2">Bulk Buyers</h1>
          <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">வாங்குபவர்கள்</p>
        </div>

        <div className="absolute -bottom-10 left-6 right-6 bg-white rounded-3xl shadow-xl p-4 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Fish size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-blue" />
              <select 
                value={filters.species}
                onChange={(e) => setFilters({ ...filters, species: e.target.value })}
                className="w-full pl-9 pr-2 py-3 bg-gray-50 rounded-xl text-xs font-black text-gray-800 border-0 focus:ring-2 focus:ring-sunrise-orange appearance-none"
              >
                {species.map(s => <option key={s} value={s}>{s === "All" ? "All Species" : s}</option>)}
              </select>
            </div>
            <div className="flex-1 relative">
              <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-blue" />
              <select 
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-9 pr-2 py-3 bg-gray-50 rounded-xl text-xs font-black text-gray-800 border-0 focus:ring-2 focus:ring-sunrise-orange appearance-none"
              >
                {locations.map(l => <option key={l} value={l}>{l === "All" ? "All Regions" : l}</option>)}
              </select>
            </div>
          </div>
          <div className="relative">
             <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean-blue" />
             <select 
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full pl-9 pr-2 py-3 bg-gray-50 rounded-xl text-xs font-black text-gray-800 border-0 focus:ring-2 focus:ring-sunrise-orange appearance-none"
              >
                {types.map(t => <option key={t} value={t}>{t === "All" ? "All Buyer Types" : t}</option>)}
              </select>
          </div>
        </div>
      </header>

      <main className="px-6 mt-16 space-y-4">
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw size={40} className="mx-auto text-ocean-blue/20 animate-spin mb-4" />
            <p className="text-sm font-bold text-gray-400">Finding Best Buyers...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{buyers.length} Verified Buyers</span>
              <div className="flex items-center gap-1">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-bold text-green-600 uppercase">Live Market</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {buyers.map((buyer: any) => (
                <BuyerCard key={buyer.id} {...buyer} />
              ))}
            </div>
            
            {buyers.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100 px-10">
                <Search size={40} className="mx-auto text-gray-200 mb-4" />
                <p className="text-sm font-bold text-gray-400">No buyers found matching your criteria. Try changing filters.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
