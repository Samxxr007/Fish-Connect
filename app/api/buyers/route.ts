import { NextResponse } from 'next/server';
import buyers from '@/data/buyers.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const species = searchParams.get('species');
  const location = searchParams.get('location');
  const type = searchParams.get('type');

  let filteredBuyers = buyers;
  if (species && species !== 'All') {
    filteredBuyers = filteredBuyers.filter((b: any) => b.species_wanted.includes(species));
  }
  if (location && location !== 'All') {
    filteredBuyers = filteredBuyers.filter((b: any) => b.location.toLowerCase() === location.toLowerCase());
  }
  if (type && type !== 'All') {
    filteredBuyers = filteredBuyers.filter((b: any) => b.type.toLowerCase() === type.toLowerCase());
  }

  return NextResponse.json(filteredBuyers);
}
