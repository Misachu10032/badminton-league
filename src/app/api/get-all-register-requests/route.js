import { Description } from '@mui/icons-material';
import { connectToDatabase } from '../lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const registerRequests = await db.collection('user_register_requests')
      .find({}, { projection: { email: 1, _id: 1, Description:1, name:1,status:1} })
      .toArray();

      console.log(registerRequests);
    return NextResponse.json(registerRequests);
  } catch (error) {
    console.error('Error fetching register requests:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
} 