import { NextResponse } from 'next/server';
import prices from '@/data/fish-prices.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const port = searchParams.get('port');

  let filteredPrices = prices;
  if (port && port !== 'All') {
    filteredPrices = prices.filter((p: any) => p.port.toLowerCase() === port.toLowerCase());
  }

  return NextResponse.json(filteredPrices);
}
