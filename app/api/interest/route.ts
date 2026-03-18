import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Interest Received:', body);
  
  return NextResponse.json({ 
    success: true, 
    message: `Your details have been sent to ${body.buyerName || 'the buyer'}!` 
  });
}
