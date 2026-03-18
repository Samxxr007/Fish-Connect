"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FishPriceCardProps {
  id: string;
  name: string;
  price_per_kg: number;
  trend: "up" | "down" | "stable";
  port: string;
  last_updated: string;
}

const fishEmojis: Record<string, string> = {
  Tuna: "🐟",
  Prawns: "🦐",
  Mackerel: "🐟",
  Sardine: "🐟",
  Pomfret: "🐟",
  Crab: "🦀",
  Squid: "🦑",
  Kingfish: "🐟",
  Lobster: "🦞",
  Snapper: "🐟",
};

const tamilNames: Record<string, string> = {
  Tuna: "சூரை",
  Prawns: "இறால்",
  Mackerel: "அயலை",
  Sardine: "மத்தி",
  Pomfret: "வௌவால் மீன்",
  Crab: "நண்டு",
  Squid: "கணவாய்",
  Kingfish: "நெய் மீன்",
  Lobster: "சிங்க இறால்",
  Snapper: "சங்கரா",
};

export default function FishPriceCard({
  name,
  price_per_kg,
  trend,
  port,
  last_updated,
}: FishPriceCardProps) {
  const isUp = trend === "up";
  const isDown = trend === "down";

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-ocean-blue flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{fishEmojis[name] || "🐟"}</span>
          <div>
            <h3 className="font-bold text-lg text-ocean-blue">{name}</h3>
            <p className="text-xs text-gray-500 font-medium">{tamilNames[name] || ""}</p>
          </div>
        </div>
        <div className={cn(
          "flex items-center gap-1 font-bold text-sm px-2 py-1 rounded-full",
          isUp ? "bg-green-100 text-green-700" : isDown ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
        )}>
          {isUp ? <TrendingUp size={16} /> : isDown ? <TrendingDown size={16} /> : <Minus size={16} />}
          {trend.toUpperCase()}
        </div>
      </div>

      <div className="flex justify-between items-end mt-2">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Price per kg</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-gray-800">₹{price_per_kg}</span>
            <span className="text-sm font-medium text-gray-500">/kg</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-sunrise-orange bg-orange-50 px-2 py-0.5 rounded-md inline-block">
            {port}
          </p>
          <p className="text-[10px] text-gray-400 mt-1 whitespace-nowrap">
            Updated: {new Date(last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}
