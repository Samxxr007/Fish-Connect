"use client";

import { useState } from "react";
import { Phone, MapPin, Package, CheckCircle2 } from "lucide-react";
interface BuyerCardProps {
  id: string;
  name: string;
  type: string;
  location: string;
  species_wanted: string[];
  price_offer: string;
  min_quantity_kg: number;
  contact: string;
}

export default function BuyerCard({
  name,
  type,
  location,
  species_wanted,
  price_offer,
  min_quantity_kg,
  contact,
}: BuyerCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
    }, 2000);
  };

  const shareOnWhatsApp = () => {
    const text = `Hello ${name}, I am a fisherman from FishConnect. I saw your request for ${species_wanted.join(", ")} in ${location}.`;
    window.open(`https://wa.me/${contact.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border-t-4 border-sunrise-orange">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-xl text-gray-800 leading-tight">{name}</h3>
          <span className="text-xs font-bold text-sunrise-orange bg-orange-50 px-2 py-0.5 rounded-md inline-block mt-1">
            {type.toUpperCase()}
          </span>
        </div>
        <button 
          onClick={shareOnWhatsApp}
          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors shadow-sm"
          title="Connect via WhatsApp"
        >
          <Phone size={18} fill="currentColor" />
        </button>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin size={16} className="text-ocean-blue" />
          <span className="text-sm font-medium">{location}</span>
        </div>
        <div className="flex items-start gap-2 text-gray-600">
          <Package size={16} className="text-ocean-blue mt-1" />
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Wanted</p>
            <p className="text-sm font-semibold">{species_wanted.join(", ")}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Offer</p>
            <p className="text-sm font-black text-ocean-blue">{price_offer}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Min Qty</p>
            <p className="text-sm font-black text-gray-800">{min_quantity_kg} kg</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-ocean-blue text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all text-sm tracking-wide"
      >
        EXPRESS INTEREST
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-black text-gray-800 mb-1">Express Interest</h2>
                <p className="text-sm text-gray-500 mb-6">Connecting you with <span className="font-bold text-ocean-blue">{name}</span></p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Your Name</label>
                    <input required className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-medium" placeholder="e.g. Ramesh Kumar" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Boat ID</label>
                      <input required className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-medium" placeholder="TN-01-..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Catch Qty (kg)</label>
                      <input required type="number" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-medium" placeholder="50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Phone Number</label>
                    <input required type="tel" className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-ocean-blue text-sm font-medium" placeholder="+91 ..." />
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-gray-500 font-bold text-sm">Cancel</button>
                    <button type="submit" className="flex-[2] bg-ocean-blue text-white py-3 rounded-xl font-bold text-sm shadow-md">SEND DETAILS</button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-2xl font-black text-gray-800 mb-2">Details Sent!</h2>
                <p className="text-gray-500 text-sm max-w-[200px] mx-auto italic">
                  &quot;Your details have been sent to {name}!&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
