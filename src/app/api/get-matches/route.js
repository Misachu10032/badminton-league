import { connectToDatabase } from '../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { pendingIds, confirmedIds } = await req.json();

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch pending matches
    const pendingMatches = await db
      .collection('matches')
      .find({ _id: { $in: pendingIds.map((id) => new ObjectId(id)) } })
      .toArray();

    // Fetch confirmed matches
    const confirmedMatches = await db
      .collection('matches')
      .find({ _id: { $in: confirmedIds.map((id) => new ObjectId(id)) } })
      .toArray();

    return NextResponse.json({
      pendingMatches,
      confirmedMatches,
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}
