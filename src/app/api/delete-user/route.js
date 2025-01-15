// app/api/delete-user/route.js for Next.js 13+ or pages/api/delete-user.js for Next.js 12 and below
import { connectToDatabase } from '../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log("Attempting to delete user");
    const { id } = await req.json(); // Assuming the user ID is sent in the request body
    console.log(id);
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Delete the document with the specified ID from the 'users' collection
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'No user found with the given ID' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting the user:', error);
    return NextResponse.json(
      { error: 'Failed to delete the user' },
      { status: 500 }
    );
  }
}