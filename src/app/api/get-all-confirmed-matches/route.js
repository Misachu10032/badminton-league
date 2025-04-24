import { connectToDatabase } from "../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const confirmedMatches = await db.collection("matches")
      .find({ status: "Confirmed" })
      .sort({ createdAt: -1 }) // optional: newest first
      .toArray();

    return NextResponse.json({ matches: confirmedMatches });
  } catch (error) {
    console.error("Error fetching confirmed matches:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
