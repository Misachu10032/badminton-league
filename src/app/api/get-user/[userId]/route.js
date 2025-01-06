import { connectToDatabase } from '../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const { userId } = await params;
  console.log("Getting user with ID:", userId);
  
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ 
      _id: new ObjectId(userId) 
    });

    if (!user) {
      console.log("User not found");
      return new NextResponse('User not found', { status: 404 });
    }

    // Convert _id to string for JSON serialization
    const userData = {
      ...user,
      _id: user._id.toString()
    };

    console.log("User found:", userData);
    return NextResponse.json(userData);

  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
} 