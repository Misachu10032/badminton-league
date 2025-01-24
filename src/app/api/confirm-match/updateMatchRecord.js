import { connectToDatabase } from "../lib/mongodb";
import { ObjectId } from "mongodb";

export async function updateMatchRecord(match, scoreChanges, db) {
  const addScoreChangesToTeam = (team, scoreChanges) => {
    return team.map((player) => {
      const scoreChange = scoreChanges.find(
        (sc) => sc.userId === player.userId
      );
      return {
        ...player,
        scoreChanges: scoreChange ? scoreChange.change : 0,
      };
    });
  };
  const updateFields = {
    team1: addScoreChangesToTeam(match.team1, scoreChanges),
    team2: addScoreChangesToTeam(match.team2, scoreChanges),
    status: "Confirmed",
  };

  await db.collection("matches").updateOne(
    { _id: new ObjectId(match._id) },
    {
      // Adds userId to the 'confirmedBy' array if not already present
      $set: {
        status: "Confirmed",
        team1: updateFields.team1,
        team2: updateFields.team2,
      }, // Updates the status field to "Confirmed"
    }
  );
}
