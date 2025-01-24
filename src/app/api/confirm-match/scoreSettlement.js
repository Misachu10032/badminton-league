import { WINNING_BASE_SCORE } from "@/enums/rulesEnums";
import { findWinners } from "@/utils/findWinners";
import { roundToNearestTen } from "@/utils/roundToNearestTen";
import { sumUserScores } from "@/utils/sumUserScores";
import { ObjectId } from "mongodb";
import { updateMatchRecord } from "./updateMatchRecord";

export async function scoreSettlement(match, db) {
  const { winners, losers, scoreRatio, numberOfWins } = findWinners(match);

  const scoreChanges = [];

  console.log("ScoreSeetlement: winner", winners);
  console.log("ScoreSeetlement: losers", losers);
  console.log("ScoreSeetlement: scoreRatio", scoreRatio);
  try {
    // Fetch winner and loser documents
    const [winnerDocuments, loserDocuments] = await Promise.all([
      db
        .collection("users")
        .find({ _id: { $in: winners.map((id) => new ObjectId(id)) } })
        .project({ score: 1, opponents: 1, teammate: 1, _id: 1 })
        .toArray(),
      db
        .collection("users")
        .find({ _id: { $in: losers.map((id) => new ObjectId(id)) } })
        .project({ score: 1, teammate: 1, _id: 1 })
        .toArray(),
    ]);

    const totalNumberOfGames = match.scores.length;
    const decisiveMultiplier = scoreRatio > 2 ? 1.5 : 1;
    const winnersCombinedRanking = sumUserScores(winnerDocuments);
    const losersCombinedRanking = sumUserScores(loserDocuments);

    // Process winners
    for (const winnerDoc of winnerDocuments) {
      let totalWins = 0;

      for (const loserId of losers) {
        const opponent = winnerDoc.opponents.find(
          (opp) => opp.opponentId.toString() === loserId
        );
        if (opponent) {
          totalWins += opponent.wins;

          opponent.wins += 1;
        } else {
          winnerDoc.opponents.push({
            opponentId: new ObjectId(loserId),
            wins: 1,
          });
        }
      }

      totalWins = Math.min(totalWins, 6); // Cap wins at 15
      const addedScore = roundToNearestTen(
        (WINNING_BASE_SCORE - totalWins * 10) *
          numberOfWins *
          decisiveMultiplier
      );

      if (winners.length === 2) {
        const otherWinnerId = winners.find(
          (id) => id !== winnerDoc._id.toString()
        );
        if (otherWinnerId) {
          const teammateIndex = winnerDoc.teammate.findIndex(
            (t) => t.teammateId.toString() === otherWinnerId
          );
          if (teammateIndex !== -1) {
            winnerDoc.teammate[teammateIndex].wins += 1;
            winnerDoc.teammate[teammateIndex].totalMatch += 1;
          } else {
            winnerDoc.teammate.push({
              teammateId: new ObjectId(otherWinnerId),
              wins: 1,
              totalMatch: 1,
            });
          }
        }
      }
      scoreChanges.push({
        userId: winnerDoc._id.toString(),
        change: addedScore,
      });
      console.log("ScoreSettlement: addedScore", addedScore);
      await db.collection("users").updateOne(
        { _id: winnerDoc._id },
        {
          $set: {
            opponents: winnerDoc.opponents,
            score: winnerDoc.score + addedScore,
            teammate: winnerDoc.teammate,
          },
        }
      );
    }

    // Process losers

    const hardworkScore = scoreRatio < 1.5 ? 20 : 0;
    const rankingScore =
      winnersCombinedRanking - losersCombinedRanking > 1000 ? 20 : 0;
    const consolationPoints =
      (hardworkScore + rankingScore) * totalNumberOfGames;
    for (const loserDoc of loserDocuments) {
      if (losers.length === 2) {
        const otherLoserId = losers.find(
          (id) => id !== loserDoc._id.toString()
        );
        if (otherLoserId) {
          const teammateIndex = loserDoc.teammate.findIndex(
            (t) => t.teammateId.toString() === otherLoserId
          );
          if (teammateIndex !== -1) {
            loserDoc.teammate[teammateIndex].totalMatch += 1;
          } else {
            loserDoc.teammate.push({
              teammateId: new ObjectId(otherLoserId),
              wins: 0,
              totalMatch: 1,
            });
          }
        }
      }
      scoreChanges.push({
        userId: loserDoc._id.toString(),
        change: consolationPoints,
      });
      await db.collection("users").updateOne(
        { _id: loserDoc._id },
        {
          $set: {
            score: loserDoc.score + consolationPoints,

            teammate: loserDoc.teammate,
          },
        }
      );
    }
    console.log(scoreChanges,"sadsadasdasdasd")
    await updateMatchRecord(match, scoreChanges, db);
  } catch (error) {
    console.error("Score Settlement Error", error);
    throw new Error("Score Settlement Error");
  }
}
