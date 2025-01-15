// src/app/api/user-register-request/route.js

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../lib/mongodb';

export async function GET(req) {
  const { searchParams } = req.nextUrl; // Get the query parameters
  const id = searchParams.get('id'); // Get the "id" query parameter

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('user_register_requests');

    const userRequest = await collection.findOne({ _id: new ObjectId(id) });

    if (!userRequest) {
      return new Response(JSON.stringify({ error: 'User request not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ email: userRequest.email }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
