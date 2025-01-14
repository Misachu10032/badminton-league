import { connectToDatabase } from '../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';

export async function POST(req, { params }) {
  const { requestId } =await params;

  console.log("Confirming request with ID:", requestId);
  
  try {
    const { db } = await connectToDatabase();
    
    // Find the document in user_register_requests collection
    const request = await db.collection('user_register_requests').findOne({ 
      _id: new ObjectId(requestId) 
    });

    if (!request) {
      console.log("Request not found");
      return new NextResponse('Request not found', { status: 404 });
    }

    // Update the status to 'pending'
    await db.collection('user_register_requests').updateOne(
      { _id: new ObjectId(requestId) },
      { $set: { status: 'Pending' } }
    );

    // Get the email from the document
    const { email } = request;

    // Send an email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:  process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS// DO NOT hardcode passwords in production; use environment variables
      }
    });

    const mailOptions = {
      from:  process.env.EMAIL_USER,
      to: email,
      subject: 'Cab Badminton League Confirmation',
      text: 'Hello!'
    };

    await transporter.sendMail(mailOptions);

    console.log("Request confirmed and email sent");
    return NextResponse.json({ message: 'Request confirmed and email sent' });

  } catch (error) {
    console.error('Error confirming request:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}