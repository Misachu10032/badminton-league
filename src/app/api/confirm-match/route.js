import { addScoreToUsers } from "./addScore";
import { connectToDatabase } from "../lib/mongodb";
import { findWinners } from "@/app/utils/findWinners";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const { db } = await connectToDatabase();

  try {
    const body = await req.json();
    const { userId, matchId } = body;

    console.log("userId", userId, "matchId", matchId);

    // Validate input
    if (!userId || !matchId) {
      return new Response(
        JSON.stringify({ error: "Missing userId or matchId" }),
        { status: 400 }
      );
    }

    // Convert IDs to ObjectId
 
    try {
      const matchObjectId = new ObjectId(matchId);
      const userObjectId = new ObjectId(userId); // Moved userObjectId declaration here

      // Fetch the match document
      let match = await db.collection("matches").findOne({ _id: matchObjectId });
      console.log("match", match);

      if (!match) {
        console.log("Match not found");
        return new Response(JSON.stringify({ error: "Match not found" }), {
          status: 404,
        });
      }

      // Add userId to the confirmedBy array if not already included
      if (!match.confirmedBy.includes(userId)) {
        await db.collection("matches").updateOne(
          { _id: matchObjectId },
          { $addToSet: { confirmedBy: userId } }
        );
      }
      match.confirmedBy = [...match.confirmedBy, userId];
      // Update the user's requests
      const updateResult = await db.collection("users").updateOne(
        { _id: userObjectId },
        {
          $pull: { "requests.pending": matchId },
          $addToSet: { "requests.confirmed": matchId },
        }
      );
      console.log("updateResult", updateResult);

      // Check if all users have confirmed
      const allConfirmed = match.userIds.every((id) => match.confirmedBy.includes(id));

      console.log("allConfirmed", allConfirmed);

      if (!allConfirmed) {
        return new Response(
          JSON.stringify({
            message: "Match confirmation updated. Waiting for others.",
          }),
          { status: 200 }
        );
      }
      await db.collection("matches").updateOne(
        { _id: matchObjectId },
        {// Adds userId to the 'confirmedBy' array if not already present
          $set: { status: "Confirmed" } // Updates the status field to "Confirmed"
        }
      );
      // Determine the winners and update scores
      const { winners, losers } = findWinners(match);
      await addScoreToUsers(winners, 50);
      await addScoreToUsers(losers, 10);

      return new Response(
        JSON.stringify({
          message: "Match confirmed, scores updated, and requests updated.",
        }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Invalid ID format:", error);
      return new Response(
        JSON.stringify({ error: "Invalid ID format" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error confirming match:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500 }
    );
  }
}