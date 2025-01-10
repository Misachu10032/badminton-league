import { connectToDatabase } from '../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { matchesIds } = await req.json();

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch pending matches
    // Fetch confirmed matches
    const matches = await db
      .collection('matches')
      .find({ _id: { $in: matchesIds.map((id) => new ObjectId(id)) } })
      .toArray();

    return NextResponse.json({
   matches
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}
