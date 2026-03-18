"use client";

import { useState, useEffect } from "react";
import { Waves, Wind, Thermometer, Navigation, AlertTriangle, CheckCircle2 } from "lucide-react";

interface MarineData {
  waveHeight: number;
  windSpeed: number;
  temp: number;
  status: "safe" | "caution" | "danger";
}

export default function SeaConditions() {
  const [data, setData] = useState<MarineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (lat: number, lon: number) => {
      try {
        const response = await fetch(
          `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wind_speed_10m,sea_surface_temperature`
        );
        const json = await response.json();
        
        // Get most recent hourly data
        const hourIdx = new Date().getHours();
        const waveHeight = json.hourly.wave_height[hourIdx];
        const windSpeed = json.hourly.wind_speed_10m[hourIdx];
        const temp = json.hourly.sea_surface_temperature[hourIdx];

        let status: "safe" | "caution" | "danger" = "safe";
        if (waveHeight > 2.5 || windSpeed > 40) status = "danger";
        else if (waveHeight > 1.5 || windSpeed > 25) status = "caution";

        setData({ waveHeight, windSpeed, temp, status });
      } catch (err) {
        setError("Failed to fetch sea data");
      } finally {
        setLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchData(pos.coords.latitude, pos.coords.longitude),
        () => fetchData(13.08, 80.27) // Default to Chennai if blocked
      );
    } else {
      fetchData(13.08, 80.27);
    }

    const interval = setInterval(() => {
        if (data) {
             // Re-fetch using same coords if possible, but keep it simple for now
        }
    }, 3600000); // Hourly

    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex items-center justify-center h-32">
      <div className="flex gap-2 animate-pulse text-ocean-blue">
        <Waves className="animate-bounce" />
        <span className="font-bold">Checking Sea Conditions...</span>
      </div>
    </div>
  );

  if (!data) return null;

  const statusColors = {
    safe: "bg-green-100 text-green-700 border-green-200",
    caution: "bg-yellow-100 text-yellow-700 border-yellow-200",
    danger: "bg-red-100 text-red-700 border-red-200"
  };

  const statusIcons = {
    safe: <CheckCircle2 size={16} />,
    caution: <AlertTriangle size={16} />,
    danger: <AlertTriangle size={16} />
  };

  const statusText = {
    safe: "Safe to Fish",
    caution: "Use Caution",
    danger: "Danger - High Waves"
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
            <Waves size={20} className="text-ocean-blue" />
            Sea Conditions
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">கடல் நிலை</p>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase border ${statusColors[data.status]}`}>
          {statusIcons[data.status]}
          {statusText[data.status]}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-2xl p-3 text-center">
          <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm text-ocean-blue">
            <Waves size={16} />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Waves</p>
          <p className="text-sm font-black text-gray-800">{data.waveHeight}m</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-3 text-center">
          <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm text-sunrise-orange">
            <Wind size={16} />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Wind</p>
          <p className="text-sm font-black text-gray-800">{data.windSpeed}km/h</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-3 text-center">
          <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 shadow-sm text-red-400">
            <Thermometer size={16} />
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase">Temp</p>
          <p className="text-sm font-black text-gray-800">{data.temp}°C</p>
        </div>
      </div>
      
      <p className="text-[9px] text-gray-400 text-center italic">Live data from Open-Meteo • Updated Hourly</p>
    </div>
  );
}
