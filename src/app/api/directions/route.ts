import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  if (!origin || !destination) {
    return NextResponse.json({ error: 'Origin and destination are required' }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return NextResponse.json({ error: 'Directions API request failed', details: data.error_message || data.status }, { status: 500 });
    }

    // Return the first route's overview polyline
    const polyline = data.routes[0]?.overview_polyline?.points;

    if (!polyline) {
      return NextResponse.json({ error: 'No route found' }, { status: 404 });
    }

    return NextResponse.json({ polyline });

  } catch (error) {
    console.error("Directions API Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
