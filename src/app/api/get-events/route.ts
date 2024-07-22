// src/app/api/get-events/route.ts
import clientPromise from '@/lib/mongobd';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('free-consultation'); // Replace with your database name
    const collection = db.collection('events'); // Replace with your collection name

    const events = await collection.find({}).toArray();

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Error fetching events' }, { status: 500 });
  }
}
