import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Mock success for invitation
  return NextResponse.json({ success: true, ...body });
}