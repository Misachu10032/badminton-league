import { connectToDatabase } from "../../lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(req, { params }) {
  const { userId } = await params; // Extract userId from the route parameters
  const { name, email, score } = await req.json(); // Extract updated fields from the request body

  console.log("Updating user with ID:", userId);
  console.log("New data:", { name, email, score });

  const updateFields = {}; // Initialize an empty object to store fields to update

  // Add fields to updateFields only if they are not null or undefined
  if (name !== null && name !== undefined) {
    updateFields.name = name;
  }
  if (email !== null && email !== undefined) {
    updateFields.email = email;
  }
  if (score !== null && score !== undefined) {
    updateFields.score = score;
  }
  try {
    const { db } = await connectToDatabase();

    // Step 1: Update the user in the `users` collection
    if (Object.keys(updateFields).length > 0) {
      const updateUserResult = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) }, // Filter by user ID
        { $set: updateFields } // Update only the valid fields
      );

      // Check if the user was found and updated
      if (updateUserResult.matchedCount === 0) {
        console.log("User not found in `users` collection");
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }
    } else {
      console.log("No valid fields provided for update");
      return NextResponse.json(
        { error: "no valid field updated" },
        {
          status: 400,
        }
      );
    }
    // Step 2: Update the user's name in the `matches` collection
    if (name) {
      // Only update matches if the name is being changed
      const updateMatchesResult = await db.collection("matches").updateMany(
        { userIds: userId }, // Find matches where the user is involved
        { $set: { "team1.$[elem].name": name, "team2.$[elem].name": name } }, // Update name in team1 and team2
        { arrayFilters: [{ "elem.userId": userId }] } // Filter for the specific user in the arrays
      );

      console.log("Matches updated:", updateMatchesResult.modifiedCount);
    }

    console.log("User updated successfully");
    return NextResponse.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
