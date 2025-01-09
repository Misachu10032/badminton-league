export function findWinners(match) {
    const { team1, team2, scores } = match;
  
    let team1Wins = 0;
    let team2Wins = 0;
  
    // Calculate wins for each team
    scores.forEach((score) => {
      if (score.team1 > score.team2) {
        team1Wins++;
      } else if (score.team2 > score.team1) {
        team2Wins++;
      }
    });
  
    const winners = team1Wins > team2Wins ? team1 : team2;
    const losers = team1Wins > team2Wins ? team2 : team1;
  
    // Extract user IDs from players
    const winnerIds = winners.map((player) => player.userId);
    const loserIds = losers.map((player) => player.userId);
    console.log("winners", winnerIds);
    console.log("losers", loserIds);
  
    return { winners: winnerIds, losers: loserIds };
  }
  