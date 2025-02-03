import { connectToDatabase } from '../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PUT(req, { params }) {
  const { userId } = await params; // Extract userId from the route parameters
  const { name, email, score } = await req.json(); // Extract updated fields from the request body

  console.log("Updating user with ID:", userId);
  console.log("New data:", { name, email, score });

  try {
    const { db } = await connectToDatabase();

    // Update the user in the database
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) }, // Filter by user ID
      { $set: { name, email, score } } // Update fields
    );

    // Check if the user was found and updated
    if (result.matchedCount === 0) {
      console.log("User not found");
      return new NextResponse('User not found', { status: 404 });
    }

    console.log("User updated successfully:", result);
    return NextResponse.json({ success: true, message: 'User updated successfully' });

  } catch (error) {
    console.error('Error updating user:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}