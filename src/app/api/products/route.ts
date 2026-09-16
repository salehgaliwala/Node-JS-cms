import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products as productsTable } from '@/db/schema';

export async function GET() {
  try {
    const allProducts = db.select().from(productsTable).all();
    return NextResponse.json({ success: true, products: allProducts });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
