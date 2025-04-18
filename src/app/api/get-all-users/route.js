import { connectToDatabase } from '../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const users = await db.collection('users')
      .find({}, { projection: { name: 1, _id: 1, score:1,email:1 } })
      .toArray();

      console.log(users);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
} 