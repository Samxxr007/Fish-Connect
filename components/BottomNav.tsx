"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, IndianRupee, Store, ScrollText } from "lucide-react";
import { motion } from "framer-motion";
const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "Prices", path: "/prices", icon: IndianRupee },
  { label: "Buyers", path: "/buyers", icon: Store },
  { label: "My Catch", path: "/catch", icon: ScrollText },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:max-w-md md:bottom-4 bg-white border-t md:border border-gray-200 px-2 py-2 flex justify-around items-center z-50 pb-safe md:rounded-3xl md:shadow-2xl">
      {navItems.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link key={item.path} href={item.path} className="relative flex-1 py-1">
            <div className="flex flex-col items-center gap-1 group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={isActive ? "text-ocean-blue" : "text-gray-400 group-hover:text-ocean-blue/70"}
              >
                <item.icon size={22} strokeWidth={isActive ? 3 : 2} />
              </motion.div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? "text-ocean-blue" : "text-gray-400 group-hover:text-ocean-blue/70"}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute -bottom-3 w-8 h-1.5 bg-ocean-blue rounded-t-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
