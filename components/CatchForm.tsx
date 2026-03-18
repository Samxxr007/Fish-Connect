"use client";

import { useState } from "react";
import { PlusCircle, Calendar, Anchor, IndianRupee, User } from "lucide-react";

const speciesList = ["Tuna", "Prawns", "Mackerel", "Sardine", "Pomfret", "Crab", "Squid", "Kingfish", "Lobster", "Snapper"];
const ports = ["Chennai", "Kochi", "Mangalore", "Visakhapatnam", "Mumbai"];

export default function CatchForm({ onSave }: { onSave: () => void }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    species: "Tuna",
    quantity_kg: "",
    port: "Chennai",
    selling_price: "",
    sold_to: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      id: Date.now().toString(),
      quantity_kg: Number(formData.quantity_kg),
      selling_price: Number(formData.selling_price)
    };

    const existingLogs = JSON.parse(localStorage.getItem("catch-logs") || "[]");
    localStorage.setItem("catch-logs", JSON.stringify([newEntry, ...existingLogs]));
    
    setFormData({
      date: new Date().toISOString().split('T')[0],
      species: "Tuna",
      quantity_kg: "",
      port: "Chennai",
      selling_price: "",
      sold_to: ""
    });
    
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-ocean-blue/10 p-2 rounded-lg text-ocean-blue">
          <PlusCircle size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-800">Log New Catch</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">புதிய பதிவைச் சேர்க்கவும்</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">
              <Calendar size={12} /> Date
            </label>
            <input 
              type="date" 
              required
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-bold text-gray-700"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">
              <Anchor size={12} /> Port
            </label>
            <select 
              value={formData.port}
              onChange={(e) => setFormData({...formData, port: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-bold text-gray-700 appearance-none"
            >
              {ports.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">Species</label>
          <div className="flex flex-wrap gap-2">
            {speciesList.slice(0, 5).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setFormData({...formData, species: s})}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all border-2",
                  formData.species === s ? "bg-ocean-blue border-ocean-blue text-white shadow-md" : "bg-white border-gray-100 text-gray-400 hover:border-ocean-blue/30"
                )}
              >
                {s}
              </button>
            ))}
            <select 
              value={formData.species}
              onChange={(e) => setFormData({...formData, species: e.target.value})}
              className="px-4 py-2 rounded-full text-xs font-bold bg-white border-2 border-gray-100 text-gray-400 outline-none focus:border-ocean-blue"
            >
              <option disabled>More...</option>
              {speciesList.slice(5).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">
              Weight (kg)
            </label>
            <input 
              type="number" 
              required
              placeholder="0.0"
              value={formData.quantity_kg}
              onChange={(e) => setFormData({...formData, quantity_kg: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-bold text-gray-700"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">
              <IndianRupee size={12} /> Price/kg
            </label>
            <input 
              type="number" 
              required
              placeholder="₹"
              value={formData.selling_price}
              onChange={(e) => setFormData({...formData, selling_price: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-bold text-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase mb-1.5 ml-1">
            <User size={12} /> Sold To
          </label>
          <input 
            type="text" 
            placeholder="Buyer name or Middleman"
            value={formData.sold_to}
            onChange={(e) => setFormData({...formData, sold_to: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-bold text-gray-700"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-sunrise-orange text-white font-black py-4 rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl active:scale-[0.98] transition-all tracking-widest text-sm uppercase"
      >
        Save Log Entry
      </button>
    </form>
  );
}

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}
