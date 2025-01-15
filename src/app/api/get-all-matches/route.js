import { connectToDatabase } from '../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch all matches
    const matches = await db.collection('matches').find({}).toArray();

    // Return the matches as JSON
    return NextResponse.json({ matches });
  } catch (error) {
    console.error('Error fetching all matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}
