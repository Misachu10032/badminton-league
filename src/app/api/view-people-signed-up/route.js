import { NextResponse } from "next/server";
import { connectToDatabase } from "../lib/mongodb"; // Adjust path if needed

export async function GET(req) {
  try {
    const { db } = await connectToDatabase();

    // Find users with iWanaPlay === true
    const activePlayers = await db
      .collection("users")
      .find({ iWanaPlay: true })
      .project({ _id: 0, userId: 1, name: 1 }) // Project only needed fields
      .toArray();

    return NextResponse.json({
      players: activePlayers,
    });
  } catch (error) {
    console.error("Error fetching users with iWanaPlay=true:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
