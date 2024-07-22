// src/app/api/create-event/route.ts
import clientPromise from '@/lib/mongobd';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Received event data:', data);

    const client = await clientPromise;
    const db = client.db('free-consultation'); // Replace with your database name
    const collection = db.collection('events'); // Replace with your collection name

    // Insert the form data into the MongoDB collection
    await collection.insertOne(data);

    return NextResponse.json({ message: 'Event created successfully', data });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
