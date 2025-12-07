import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/lib/prisma';
export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("📥 Sync Request Received:", body);

    // 1. Validate & Format Data
    // Ensure all numbers are actual numbers (not strings) to prevent DB errors
    const budgetData = {
      income: Number(body.income) || 0,
      bills: Number(body.bills) || 0,
      food: Number(body.food) || 0,
      transport: Number(body.transport) || 0,
      subscriptions: Number(body.subscriptions) || 0,
      misc: Number(body.misc) || 0,
    };

    // 2. Save to Database (Upsert)
    // We use ID 1 for this demo to overwrite the same row every time 
    const budget = await prisma.budget.upsert({
      where: { id: 1 },
      update: budgetData,
      create: {
        id: 1,
        ...budgetData,
      },
    });

    console.log("✅ Database Sync Success:", budget);

    // 3. Return Success Response 
    return NextResponse.json({ success: true, timestamp: new Date() });

  } catch (error: any) {
    console.error("❌ SYNC API ERROR:", error); // Check your terminal for this message
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}