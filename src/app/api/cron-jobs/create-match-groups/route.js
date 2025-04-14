
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../lib/mongodb";
import { createMatchGroups } from "../../../../utils/helpers/createMatchGroup";

export async function GET() {
  try {
    const { db } = await connectToDatabase();

    const users = await db
      .collection("users")
      .find({ iWanaPlay: true }, { projection: { name: 1, _id: 1 } })
      .toArray();

    if (!users.length) {
      return NextResponse.json(
        { message: "No users want to play" },
        { status: 200 }
      );
    }
    if (users.length < 4) {
      return NextResponse.json(
        { message: "not enough users want to play" },
        { status: 200 }
      );
    }
    // Convert users to format expected by createMatchGroups
    const playerList = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
    }));
    const userMap = {};
    playerList.forEach((user) => {
      userMap[user.id] = user.name;
    });

    const validGroups = createMatchGroups(playerList);

    const validGroupsWithNames = validGroups.map((group) => {
      return group.map((userId) => ({
        id: userId,
        name: userMap[userId],
      }));
    });

    const matchRecord = {
      date: new Date(),
      groups: validGroupsWithNames,
    };

    await db.collection("match_making").insertOne(matchRecord);

    return NextResponse.json({ groups: validGroups }, { status: 200 });
  } catch (error) {
    console.error("Error creating match groups:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
