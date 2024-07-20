// app/api/create-event/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('Received event data:', data);

    // Handle the form data (e.g., save to a database or send an email)
    return NextResponse.json({ message: 'Event created successfully', data });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}
