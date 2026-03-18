"use client";

import { useState, useEffect } from "react";
import CatchForm from "@/components/CatchForm";
import { TrendingUp, Wallet, Package, Trash2, AlertCircle, Minus } from "lucide-react";
import { CatchLog } from "@/types";

export default function CatchPage() {
  const [logs, setLogs] = useState<CatchLog[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = () => {
    const saved = JSON.parse(localStorage.getItem("catch-logs") || "[]");
    setLogs(saved);
  };

  const deleteLog = (id: string) => {
    const updated = logs.filter((log: CatchLog) => log.id !== id);
    localStorage.setItem("catch-logs", JSON.stringify(updated));
    setLogs(updated);
  };

  const stats = logs.reduce((acc, log) => {
    acc.totalWeight += Number(log.quantity_kg);
    acc.totalRevenue += Number(log.quantity_kg) * Number(log.selling_price);
    return acc;
  }, { totalWeight: 0, totalRevenue: 0 });

  const avgPrice = stats.totalWeight > 0 ? (stats.totalRevenue / stats.totalWeight).toFixed(2) : 0;

  return (
    <div className="min-h-screen bg-soft-white pb-24">
      <header className="bg-ocean-blue pt-12 pb-20 px-6 relative rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black text-white leading-tight mt-2">My Catch Log</h1>
            <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">எனது மீன்பிடி பதிவு</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-sunrise-orange text-white p-3 rounded-xl font-black text-sm shadow-lg active:scale-95 transition-all flex items-center gap-2"
          >
            {showForm ? <Minus size={20} /> : <span className="px-2">+ NEW LOG</span>}
          </button>
        </div>
      </header>

      <main className="px-6 -mt-8 space-y-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl shadow-xl border border-gray-50">
            <div className="bg-green-100 text-green-600 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <Wallet size={20} />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Income</p>
            <p className="text-xl font-black text-gray-800">₹{stats.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl shadow-xl border border-gray-50">
            <div className="bg-ocean-blue/10 text-ocean-blue w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <Package size={20} />
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Weight</p>
            <p className="text-xl font-black text-gray-800">{stats.totalWeight} kg</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-3xl shadow-lg border border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="bg-sunrise-orange/10 p-2 rounded-lg text-sunrise-orange">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Avg Sale Price</p>
                <p className="text-sm font-black text-gray-800">₹{avgPrice} / kg</p>
              </div>
           </div>
           {Number(avgPrice) < 300 && stats.totalWeight > 0 && (
             <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-md animate-pulse">
                <AlertCircle size={14} />
                <span className="text-[10px] font-black uppercase">Low Margin</span>
             </div>
           )}
        </div>

        {showForm && (
          <div className="animate-in slide-in-from-top duration-300">
            <CatchForm onSave={() => { loadLogs(); setShowForm(false); }} />
          </div>
        )}

        {/* Log List */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-gray-800 px-1">Recent Logs</h2>
          {logs.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100 italic text-gray-400 text-sm">
              No catches logged yet. Start today!
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="bg-white p-4 rounded-2xl shadow-md border border-gray-50 flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center text-2xl">
                    🐟
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{log.species}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                      {log.date} • {log.port}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-sm font-black text-gray-800">{log.quantity_kg} kg</p>
                    <p className="text-[10px] font-bold text-green-600">₹{log.selling_price}/kg</p>
                  </div>
                  <button 
                    onClick={() => deleteLog(log.id)}
                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
