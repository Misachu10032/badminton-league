import { findWinners } from "@/app/utils/findWinners";
import { ObjectId } from "mongodb";

export async function scoreSettlement(match, db) {
  const { winners, losers, scoreRatio } = findWinners(match);

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

    const totalGames = match.scores.length;
    const decisiveMultiplier = scoreRatio > 2 ? 1.5 : 1;
    let winnersCombinedRanking = winnerDocuments.reduce(
      (sum, doc) => sum + doc.score,
      0
    );

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
          totalWins += 1;
        }
      }

      totalWins = Math.min(totalWins, 15); // Cap wins at 15
      const addedScore =
        (200 - totalWins * 10) *
        (Math.floor(totalGames / 2) + 1) *
        decisiveMultiplier;

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
    const losersCombinedRanking = loserDocuments.reduce(
      (sum, doc) => sum + doc.score,
      0
    );
    const hardworkScore = scoreRatio < 1.5 ? 50 : 0;
    const rankingScore =
      winnersCombinedRanking - losersCombinedRanking > 1000 ? 50 : 0;

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

      await db.collection("users").updateOne(
        { _id: loserDoc._id },
        {
          $set: {
            score:
              (loserDoc.score + hardworkScore + rankingScore) *
              (Math.floor(totalGames / 2) + 1),
            teammate: loserDoc.teammate,
          },
        }
      );
    }
  } catch (error) {
    console.error("Score Settlement Error", error);
    throw new Error("Score Settlement Error");
  }
}
