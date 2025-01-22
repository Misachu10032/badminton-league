export function findWinners(match) {
  const { team1, team2, scores } = match;

  if (
    !team1 ||
    !team2 ||
    !scores ||
    !Array.isArray(scores) ||
    scores.length === 0
  ) {
    throw new Error(
      "Invalid match data: teams and scores must be provided and scores must be a non-empty array."
    );
  }

  let team1Wins = 0;
  let team2Wins = 0;
  let team1TotalScore = 0;
  let team2TotalScore = 0;

  // Calculate total scores and wins for each team
  scores.forEach((score, index) => {
    if (typeof score.team1 !== "number" || typeof score.team2 !== "number") {
      throw new Error(
        `Invalid score format at index ${index}. Scores must be numeric.`
      );
    }

    team1TotalScore += score.team1;
    team2TotalScore += score.team2;

    // Determine round winner
    if (score.team1 > score.team2) {
      team1Wins++;
    } else if (score.team2 > score.team1) {
      team2Wins++;
    }
    // If scores are equal, no wins are added for this round (treated as a draw)
  });

  // Handle a draw scenario
  if (team1Wins === team2Wins) {
    return {
      isDraw: true,
    };
  }

  // Determine the winner and loser teams
  const isTeam1Winner = team1Wins > team2Wins;
  const winners = isTeam1Winner ? team1 : team2;
  const losers = isTeam1Winner ? team2 : team1;
  const winningScore = isTeam1Winner ? team1TotalScore : team2TotalScore;
  const losingScore = isTeam1Winner ? team2TotalScore : team1TotalScore;

  // Extract user IDs for winners and losers
  const winnerIds = winners.map((player) => player.userId);
  const loserIds = losers.map((player) => player.userId);

  // Calculate score ratio
  const scoreRatio =
    losingScore !== 0 ? winningScore / losingScore : winningScore; // Avoid division by zero

  console.log("Match Results:", {
    winnerIds,
    loserIds,
    scoreRatio,
    numberOfWins: Math.max(team1Wins, team2Wins),
  });

  return {
    winners: winnerIds,
    losers: loserIds,
    scoreRatio: scoreRatio,
    numberOfWins: Math.max(team1Wins, team2Wins),
    isDraw: false,
  };
}
