import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FishConnect",
  description: "Direct fisherman to buyer marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-soft-white h-full antialiased text-gray-900 selection:bg-ocean-blue selection:text-white`}>
        <div className="max-w-screen-xl mx-auto bg-soft-white min-h-screen relative overflow-x-hidden">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
