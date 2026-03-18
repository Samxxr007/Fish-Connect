import { NextResponse } from 'next/server';
import prices from '@/data/fish-prices.json';
import { FishPrice } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const port = searchParams.get('port');

  let filteredPrices = prices;
  if (port && port !== 'All') {
  if (port && port !== 'All') {
    filteredPrices = (prices as FishPrice[]).filter((p: FishPrice) => p.port.toLowerCase() === port.toLowerCase());
  }
  }

  return NextResponse.json(filteredPrices);
}
