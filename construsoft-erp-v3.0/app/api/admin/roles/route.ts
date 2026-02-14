import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 'role-1', name: 'Administrador' },
    { id: 'role-2', name: 'Ingeniero' },
    { id: 'role-3', name: 'Residente' },
    { id: 'role-4', name: 'Usuario' },
  ]);
}