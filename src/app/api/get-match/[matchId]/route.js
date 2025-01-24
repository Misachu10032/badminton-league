
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongodb';

export async function GET(request, { params }) {
  const { matchId } = await params; // Extract the matchId from the URL params
  console.log(matchId,"aSasAS")

  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch the match details using the matchId
    const match = await db.collection('matches').findOne({
      _id: new ObjectId(matchId),
    });

    if (match) {
      // Return the match details as JSON
      return NextResponse.json({ match });
    } else {
      // If match not found
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching match details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch match details' },
      { status: 500 }
    );
  }
}
