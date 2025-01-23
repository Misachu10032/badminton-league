import { connectToDatabase } from '../lib/mongodb'; // Helper function to connect to MongoDB
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    console.log(body);

    const { matchId } = body; // Extract matchId from the request body
    if (!matchId) {
      return NextResponse.json(
        { error: 'Missing matchId in request body' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const matchesCollection = db.collection('matches');
    const usersCollection = db.collection('users');

    // Fetch the match document to ensure it exists
    const match = await matchesCollection.findOne({ _id: new ObjectId(matchId) });
    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      );
    }

    // Remove the match ID from each player's requests
    const userUpdateResult = await usersCollection.updateMany(
      { _id: { $in: match.userIds.map(id => new ObjectId(id)) } },
      { $pull: { 'requests.pending': matchId, 'requests.confirmed': matchId } } // Remove from both confirmed and pending
    );

    console.log('userUpdateResult:', userUpdateResult);

    // Delete the match document
    const matchDeleteResult = await matchesCollection.deleteOne({ _id: match._id });

    if (matchDeleteResult.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Failed to delete match' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Match declined successfully',
      userUpdateResult,
      matchDeleteResult,
    });
  } catch (error) {
    console.error('Error declining match:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
