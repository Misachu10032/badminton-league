import { connectToDatabase } from "../lib/mongodb"; // Helper to connect to MongoDB
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export async function POST(req) {
  console.log("Registering user");

  try {
    const { email, name, sex, requestId } = await req.json(); // Extract email, name, and sex from request body

    // Check for missing required fields
    if (!email || !name || !sex || !requestId) {
      return new NextResponse(
        JSON.stringify({ error: "Missing required fields", message: "All fields (email, name, sex, requestId) are required." }),
        { status: 400 }
      );
    }

    // Connect to the MongoDB database
    const { db } = await connectToDatabase();
    const usersCollection = db.collection("users");
    const registerRequestsCollection = db.collection("user_register_requests");

    // Check if the requestId exists and is in 'Pending' status
    const registerRequest = await registerRequestsCollection.findOne({
      _id: new ObjectId(requestId),
      status: "Pending",
    });

    if (!registerRequest) {
      return new NextResponse(
        JSON.stringify({ error: "Request not found or not in pending status", message: "The registration request does not exist or is not in 'Pending' status." }),
        { status: 404 }
      );
    }

    // Check if email already exists in users (case-insensitive)
    // const existingUser = await usersCollection.findOne({
    //   email: { $regex: `^${email}$`, $options: "i" },
    // });

    // if (existingUser) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "Email already registered", message: "This email is already registered as a user." }),
    //     { status: 409 }
    //   );
    // }

    // Check if name already exists (case-insensitive)
    // const existingName = await usersCollection.findOne({
    //   name: { $regex: `^${name}$`, $options: "i" },
    // });

    // if (existingName) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "Name already taken", message: "The name is already taken by another user." }),
    //     { status: 409 }
    //   );
    // }

    // Insert the new user document with score and role
    const result = await usersCollection.insertOne({
      email,
      name,
      sex,
      role: "User", // Set the role to User
      score: 1000, // Set the initial score to 1000
      requests: {
        pending: [],
        confirmed: [],
      },
      createdAt: new Date(), // Optionally include a timestamp
    });

    // Update the user register request status to 'Complete'
    await registerRequestsCollection.updateOne(
      { _id: requestId },
      { $set: { status: "Complete" } }
    );

    return new NextResponse(
      JSON.stringify({
        message: "User registered successfully",
        id: result.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error", message: "An error occurred while processing your request. Please try again later." }),
      { status: 500 }
    );
  }
}
