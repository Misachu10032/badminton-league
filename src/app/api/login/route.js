// app/api/auth/login/route.js
import { connectToDatabase } from '../lib/mongodb'; // Helper to connect to MongoDB
import * as jose from 'jose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email } = await req.json(); // Extract email from request body

  if (!email) {
    return new NextResponse('Email is required', { status: 400 });
  }

  const lowerCaseEmail = email.toLowerCase();
  try {
    // Connect to the MongoDB database
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users'); // Assume users are stored in a "users" collection

    // Check if the user exists in the database
    const user = await usersCollection.findOne({ lowerCaseEmail });

    if (!user) {
      return new NextResponse('Invalid credentials', { status: 401 });
    }

    // Generate a JWT token
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);
    const token = await new jose.SignJWT({ 
      lowerCaseEmail, 
      id: user._id.toString(),
      role: user.role // Include role from user document
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime("1 day") // Token expires in 1 day
      .sign(secret);

    // Set the token in cookies
    const response = new NextResponse(
      JSON.stringify({ message: 'Login successful' }) // Return token in response
    );
    response.cookies.set('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 * 24,
    });
    response.cookies.set('userID', user._id, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production', // Ensure it's secure in production
      sameSite: 'Strict',
      maxAge: 3600 * 24, // 1 day (adjust the duration as needed)
    });

    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
