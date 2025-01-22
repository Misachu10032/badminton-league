import { MAXIMUM_MATCHES_IN_A_DAY } from '@/enums/rulesEnums';
import { connectToDatabase } from '../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { findWinners } from '@/utils/findWinners';

// Helper function for error responses
function errorResponse(message, status = 400) {
  console.error(message);
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { isDoubleGame, currentUser, team1, team2, scores, userIds } = body;

    // Validate required fields
    if (!currentUser || !team1 || !team2 || !scores || !userIds) {
      return errorResponse('Missing required fields: currentUser, team1, team2, scores, or userIds.');
    }

    // Validate winners
    const matchResults = findWinners({ team1, team2, scores });
    if (matchResults.isDraw) {
      return errorResponse('Invalid scores: A draw is not allowed.');
    }

    // Database connection
    const { db } = await connectToDatabase();
    const matchesCollection = db.collection('matches');
    const usersCollection = db.collection('users');

    // Get start and end of the current day
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Check match count for all users in `userIds`
    const matchesToday = await matchesCollection
      .aggregate([
        { $match: { createdAt: { $gte: startOfDay, $lt: endOfDay }, userIds: { $in: userIds } } },
        { $unwind: '$userIds' },
        { $match: { userIds: { $in: userIds } } },
        { $group: { _id: '$userIds', matchCount: { $sum: 1 } } },
      ])
      .toArray();

    // Determine maximum matches for any player today
    const maxMatchCount = matchesToday.reduce((max, match) => Math.max(max, match.matchCount), 0);

    if (maxMatchCount >= MAXIMUM_MATCHES_IN_A_DAY) {
      return errorResponse('One or more players have reached the daily match limit.');
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

    // Update user requests
    const matchId = insertedId.toString();
    await usersCollection.updateOne(
      { _id: new ObjectId(currentUser) },
      { $push: { 'requests.confirmed': matchId } }
    );

    const otherUsers = userIds.filter((userId) => userId !== currentUser);
    await usersCollection.updateMany(
      { _id: { $in: otherUsers.map((id) => new ObjectId(id)) } },
      { $push: { 'requests.pending': matchId } }
    );

    return NextResponse.json({ message: 'Match created successfully', matchId });
  } catch (error) {
    console.error('Error creating match:', error);
    return errorResponse('Internal server error.', 500);
  }
}
