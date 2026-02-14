import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  // Mock success
  return NextResponse.json({ success: true, ...body });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Mock success
  return NextResponse.json({ success: true });
}