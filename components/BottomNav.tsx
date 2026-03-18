"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, IndianRupee, Store, ScrollText } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Prices", href: "/prices", icon: IndianRupee },
  { name: "Buyers", href: "/buyers", icon: Store },
  { name: "My Catch", href: "/catch", icon: ScrollText },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center z-50 pb-safe">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 flex-1 py-1 rounded-lg transition-colors",
              isActive ? "text-ocean-blue" : "text-gray-400"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={cn("text-[10px] font-bold uppercase tracking-tight")}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
