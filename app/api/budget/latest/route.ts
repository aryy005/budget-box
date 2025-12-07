export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const budget = await prisma.budget.findUnique({
    where: { id: 1 }
  });
  
  return NextResponse.json(budget || {}); // [cite: 70]
}