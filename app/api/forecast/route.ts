import { NextResponse } from 'next/server';
import forecasts from '@/data/demand-forecast.json';
import { DemandForecast } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const species = searchParams.get('species');

    // Default to Prawns if no species matches
    const forecastData = (forecasts as DemandForecast[]).find(
      (f: DemandForecast) => f.species.toLowerCase() === (species?.toLowerCase() || 'prawns')
    ) || forecasts[0];

    return NextResponse.json(forecastData);
  } catch (error) {
    console.error("API Forecast Error:", error);
    return NextResponse.json(forecasts[0]);
  }
}
