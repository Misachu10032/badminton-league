export const validateForm = (formData) => {
    const errors = {};
    const allPlayers = [
      ...formData.teams[0].players,
      ...formData.teams[1].players,
    ];
  
    // Check for duplicate players
    const playerIds = new Set();
    allPlayers.forEach((player, index) => {
      if (player.name && player.userId) {
        if (playerIds.has(player.userId)) {
          errors[`PlayerUnique`] = "Player must be unique";
        } else {
          playerIds.add(player.userId);
        }
      }
    });
  
    // Validate players for each team
    formData.teams.forEach((team) => {
      team.players.forEach((player) => {
     
          if (!player.name || !player.userId) {
            errors[`PlayerPresent`] = "Player is required";
          }
        
      });
    });
  
    // Validate scores
    formData.scores.forEach((score, index) => {
      if (score.team1 === "" || score.team2 === "") {
        errors[`ScoresRequired`] = "Scores are required";
      } else {
        // Check if score is valid (between 0 and 30)
        if (score.team1 < 0 || score.team1 > 30 || score.team2 < 0 || score.team2 > 30) {
          errors[`ScoresInvalid`] = "Score must be between 0 and 30";
        }
      }
    });
  
    return errors;
  };
  