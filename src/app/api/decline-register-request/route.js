import { connectToDatabase } from '../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    console.log("we are here");
    const { id } = await req.json(); // Assuming the ID is sent in the request body
    console.log(id);
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Delete the document with the specified ID
    const result = await db.collection('user_register_requests').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'No document found with the given ID' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Request declined and deleted successfully' });
  } catch (error) {
    console.error('Error deleting the document:', error);
    return NextResponse.json(
      { error: 'Failed to decline the request' },
      { status: 500 }
    );
  }
}
