import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limit = url.searchParams.get('limit');

  if (!limit) {
    return NextResponse.json({ error: 'Limit parameter is required' }, { status: 400 });
  }

  try {
    // Make the external API request to OpenAQ
    const response = await fetch(`https://api.openaq.org/v3/countries?limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.NEXT_PUBLIC_OPENAQ_API_KEY!, // Ensure this is correct in .env
      },
    });

    console.log(response.status, response.statusText);

    // Log the response status and body for better debugging
    if (!response.ok) {
      throw new Error(`OpenAQ API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data); // Return the OpenAQ data
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
