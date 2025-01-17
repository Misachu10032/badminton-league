export function findWinners(match) {
  const { team1, team2, scores } = match;

  let team1Wins = 0;
  let team2Wins = 0;
  let team1TotalScore = 0;
  let team2TotalScore = 0;

  // Calculate total scores and wins for each team
  scores.forEach((score) => {
      team1TotalScore += score.team1;
      team2TotalScore += score.team2;
      // Determine which team won this score round
      if (score.team1 > score.team2) {
          team1Wins++;
      } else if (score.team2 > score.team1) {
          team2Wins++;
      }
      // Note: If scores are equal, it's a draw for this round, no win added
  });

  // Determine the winning and losing teams based on the number of wins
  let winners, losers, winningScore, losingScore;
  if (team1Wins > team2Wins) {
      winners = team1;
      losers = team2;
      winningScore = team1TotalScore;
      losingScore = team2TotalScore;
  } else {
      winners = team2;
      losers = team1;
      winningScore = team2TotalScore;
      losingScore = team1TotalScore;
  }

  // Extract user IDs from the players of winning and losing teams
  const winnerIds = winners.map(player => player.userId);
  const loserIds = losers.map(player => player.userId);

  // Calculate the score ratio
  const scoreRatio = losingScore !== 0 ? winningScore / losingScore : winningScore; // Avoid division by zero

  // Log the winner and loser IDs for debugging or information purposes
  console.log("Winners:", winnerIds);
  console.log("Losers:", loserIds);
  console.log("Score Ratio:", scoreRatio);

  // Return the result object
  return {
      winners: winnerIds,
      losers: loserIds,
      scoreRatio: scoreRatio
  };
}