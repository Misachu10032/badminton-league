
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../lib/mongodb';

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');

    // Fetch current IWanaPlay value
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newStatus = !user.IWanaPlay;

    // Update IWanaPlay field
    await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { IWanaPlay: newStatus } }
    );

    return NextResponse.json({ message: 'IWanaPlay updated', IWanaPlay: newStatus });
  } catch (error) {
    console.error('Error toggling IWanaPlay:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
