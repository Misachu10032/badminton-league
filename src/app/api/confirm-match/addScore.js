import { connectToDatabase } from "../lib/mongodb";
import { ObjectId } from "mongodb";

export async function addScoreToUsers(userIds, score) {
  const { db } = await connectToDatabase();
  try {
    // Convert array of string IDs to array of ObjectIds
    const objectIds = userIds.map(id => new ObjectId(id));
    console.log("objectIds", objectIds);

    await db.collection("users").updateMany(
      { _id: { $in: objectIds } },
      { $inc: { score: score } }
    );
  } catch (error) {
    console.error("Error updating scores:", error);
    throw new Error("Failed to update user scores");
  }
}