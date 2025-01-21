import { connectToDatabase } from '../lib/mongodb'; // Helper function to connect to MongoDB
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      isDoubleGame,
      currentUser,
      team1,
      team2,
      scores,
      userIds,
    } = body;

    console.log('Creating match:', body);

    // Validate the request
    if (!currentUser || !team1 || !team2 || !scores || !userIds) {
      console.log('Not all fields are present');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { db } = await connectToDatabase();
    const matchesCollection = db.collection('matches');
    const usersCollection = db.collection('users');

    // Get start and end of the current day
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Count matches recorded or involving the currentUser today
    const matchCount = await matchesCollection.countDocuments({
      $and: [
        { createdAt: { $gte: startOfDay, $lt: endOfDay } },
        { userIds: currentUser },
      ],
    });

    if (matchCount >= 3) {
      console.log(`User ${currentUser} has already recorded or been involved in 3 matches today.`);
      return NextResponse.json(
        { error: 'Player cannot record or be included in more than 3 matches per day.' },
        { status: 400 }
      );
    }

    // Create match document
    const newMatch = {
      isDoubleGame,
      team1,
      team2,
      scores,
      userIds,
      status: 'Pending',
      confirmedBy: [currentUser],
      createdAt: new Date(),
    };

    const { insertedId } = await matchesCollection.insertOne(newMatch);

    // Update user documents
    const matchId = insertedId.toString();

    // Update the current user's confirmed requests
    await usersCollection.updateOne(
      { _id: new ObjectId(currentUser) },
      { $push: { 'requests.confirmed': matchId } }
    );

    // Update the other users' pending requests
    const otherUsers = userIds.filter(userId => userId !== currentUser);
    await usersCollection.updateMany(
      { _id: { $in: otherUsers.map(id => new ObjectId(id)) } },
      { $push: { 'requests.pending': matchId } }
    );

    return NextResponse.json({ message: 'Match created successfully', matchId });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
