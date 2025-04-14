
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../lib/mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId'); // Get the userId from the query string

    if (!userId) {
      return new NextResponse('Missing userId', { status: 400 });
    }

    const { db } = await connectToDatabase();

    const latestMatch = await db.collection('match_making')
      .find()
      .sort({ date: -1 })
      .limit(1)
      .toArray();

    if (!latestMatch.length) {
      return NextResponse.json({ message: 'No match-making sessions found' }, { status: 200 });
    }

    const { groups, date } = latestMatch[0];

    // Find all groups that include this user
    const userGroups = groups
      .filter(group => group.some(player => player.id === userId))
      .map(group => group.map(player => player.name));

    if (!userGroups.length) {
      return NextResponse.json({ message: 'User not found in latest match' }, { status: 200 });
    }

    return NextResponse.json({
      date,
      groups: userGroups
    });

  } catch (error) {
    console.error('Error fetching user group:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
