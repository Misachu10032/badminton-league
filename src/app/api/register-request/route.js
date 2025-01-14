
import { isValidEmail } from '../../utils/validateEmail';
import { connectToDatabase } from '../lib/mongodb'; // Helper to connect to MongoDB
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email, description,name } = await req.json(); // Extract email and description from request body

    if (!email || !isValidEmail(email)) {
        return new NextResponse('Invalid email format', { status: 400 });
      }
  
      if (!description|| !name) {
        return new NextResponse('missing input field', { status: 400 });
      }

    // Connect to the MongoDB database
    const { db } = await connectToDatabase();
    const registerRequestsCollection = db.collection('user_register_requests');
    const usersCollection = db.collection('users');

    // Check if email already exists in user_register_requests (case-insensitive)
    const existingRequest = await registerRequestsCollection.findOne({
      email: { $regex: `^${email}$`, $options: 'i' },
    });

    if (existingRequest) {
      return new NextResponse('This email is already registered, Please wait for the admin to send you an email to sign up', { status: 409 });
    }

    // Check if email already exists in users (case-insensitive)
    const existingUser = await usersCollection.findOne({
      email: { $regex: `^${email}$`, $options: 'i' },
    });

    if (existingUser) {
      return new NextResponse('This email is already registered as a user', { status: 409 });
    }

    // Insert the new register request document
    const result = await registerRequestsCollection.insertOne({
      email,
      name,
      description,
      status: 'started',
      
      createdAt: new Date(), // Optionally include a timestamp
    });

    return new NextResponse(
      JSON.stringify({ message: 'Registration request created successfully', id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating register request:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
