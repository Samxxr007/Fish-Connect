# FishConnect 🐟

**FishConnect** is a mobile-first web application built to empower coastal Indian fishermen (primarily in Tamil Nadu and Kerala) by bypassing middlemen. It provides real-time market data, AI-powered demand forecasting, and direct connection to bulk buyers.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Samxxr007/Fish-Connect.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [https://fish-connect.vercel.app/](https://fish-connect.vercel.app/)) in your browser. For the best experience, use **Mobile View (Inspector mode > iPhone 12 Pro / 390px width)**.

## ✨ Key Features

1.  **Demand Predictor (AI Forecast)**: 30-day forecast chart using Recharts. Detects seasonal spikes (Onam, Christmas, etc.) and weekend surges.
2.  **Sea Conditions Widget**: Real-time wave height, wind speed, and sea temperature data via Open-Meteo Marine API with geolocation support.
3.  **Live Price Dashboard**: Real-time prices for top 10 species across 5 major ports with Tamil support.
4.  **Market Insights**: Historical state-wise production trends using government data for long-term supply analysis.
5.  **Direct Buyer Marketplace**: Connect directly with Exporters and Hotels with WhatsApp integration.
6.  **Fisherman's Logbook**: Offline-first catch logger using `localStorage`.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Typings**: TypeScript
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📱 Demo Walkthrough for Judges
1.  **Dashboard**: Open the Home page. Observe the "Demand Spike Alert" for Prawns.
2.  **Market Prices**: Navigate to 'Prices' using the bottom nav. Filter by 'Chennai' to see local rates.
3.  **Direct Connection**: Go to 'Buyers'. Find 'Ocean Exports Ltd'. Click 'Express Interest'. Fill the simple fisherman form and see the success state.
4.  **Logging Profit**: Go to 'My Catch'. Click '+ NEW LOG'. Add your catch details (e.g., Tuna, 50kg). Save and see your weekly earnings update instantly.

---
*Built with ❤️ for the coastal communities of India.*
