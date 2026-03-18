import { NextResponse } from 'next/server';
import forecasts from '@/data/demand-forecast.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const species = searchParams.get('species');

  const forecastData = forecasts.find((f: any) => f.species.toLowerCase() === species?.toLowerCase());
  
  if (!forecastData) {
    // Return early if not found, or default to first one for demo
    return NextResponse.json(forecasts[0].forecast);
  }

  return NextResponse.json(forecastData.forecast);
}
