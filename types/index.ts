export interface FishPrice {
  id: string;
  name: string;
  price_per_kg: number;
  trend: "up" | "down" | "stable";
  port: string;
  last_updated: string;
}

export interface Buyer {
  id: string;
  name: string;
  type: string;
  location: string;
  species_wanted: string[];
  price_offer: string;
  min_quantity_kg: number;
  contact: string;
}

export interface ForecastPoint {
  day: number;
  demand_index: number;
  spike_reason?: string;
}

export interface DemandForecast {
  species: string;
  forecast: ForecastPoint[];
}

export interface CatchLog {
  id: string;
  date: string;
  species: string;
  quantity_kg: number;
  selling_price: number;
  buyer_name?: string;
  port: string;
}
