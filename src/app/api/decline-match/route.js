import { connectToDatabase } from '../lib/mongodb'; // Helper function to connect to MongoDB
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body)
    const {match }= body; // Extract _id and userIds from the request body

    console.log(match._id,match.userIds,"aaaaaaaaaaa")
    // Validate the request
    if (!match._id || !match.userIds) {
      console.log('Match ID and user IDs are required');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const matchesCollection = db.collection('matches');
    const usersCollection = db.collection('users');

    // Fetch the match document to ensure it exists
    // Remove the match ID from each player's requests
    await usersCollection.updateMany(
      { _id: { $in: match.userIds.map(id => new ObjectId(id)) } },
      { $pull: { 'requests.pending': match._id, 'requests.confirmed':match._id } } // Remove from both confirmed and pending
    );

    // Delete the match document
    await matchesCollection.deleteOne({ _id: new ObjectId(match._id) });

    return NextResponse.json({ message: 'Match declined successfully' });
  } catch (error) {
    console.error('Error declining match:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}