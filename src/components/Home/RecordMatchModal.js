import { useState, useEffect } from "react";
import { Button, FormHelperText } from "@mui/material";
import PlayerSelectionTable from "./PlayerSelectionTable";
import ScoreInput from "../common/SocreInput";
import { canRecordNewMatch } from "@/utils/maxMatchesInADay";
import { validateForm } from "@/utils/validateMatch";
import { triggerNotification } from "../../utils/eventBus";

export default function RecordMatchModal({
  isOpen,
  onClose,
  currentUser,
  matches,
  fetchUserData,
}) {
  const [isDoubleGame, setIsDoubleGame] = useState(true);
  const [users, setUsers] = useState([]);
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [formData, setFormData] = useState({
    teams: [
      {
        name: "Team 1",
        players: [
          { name: currentUser?.name || "", userId: currentUser?._id || "" },
          { name: "", userId: "" },
        ],
      },
      {
        name: "Team 2",
        players: [
          { name: "", userId: "" },
          { name: "", userId: "" },
        ],
      },
    ],
    scores: [{ team1: "", team2: "" }],
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/get-all-users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentUser?._id]);

  const handleGameTypeChange = (event, newValue) => {
    if (newValue !== null) {
      const isDouble = newValue === "double";
      setIsDoubleGame(isDouble);
      setFormData({
        ...formData,
        teams: [
          {
            name: "Team 1",
            players: isDouble
              ? [
                  { name: currentUser?.name || "", userId: currentUser?._id || "" },
                  { name: "", userId: "" },
                ]
              : [{ name: currentUser?.name || "", userId: currentUser?._id || "" }],
          },
          {
            name: "Team 2",
            players: isDouble
              ? [
                  { name: "", userId: "" },
                  { name: "", userId: "" },
                ]
              : [{ name: "", userId: "" }],
          },
        ],
      });
    }
  };

  const handlePlayerSelect = (user) => {
    if (selectedField) {
      const updatedForm = { ...formData };
      updatedForm.teams[selectedField.teamIndex].players[selectedField.playerIndex] = {
        name: user.name,
        userId: user._id,
      };
      setFormData(updatedForm);
      setShowUserSelection(false);
      setSelectedField(null);
    }
  };

  const handleScoreChange = (e, index, team) => {
    const updatedScores = [...formData.scores];
    updatedScores[index][team] = e.target.value;
    setFormData({ ...formData, scores: updatedScores });
  };

  const addGame = () => {
    setFormData({
      ...formData,
      scores: [...formData.scores, { team1: "", team2: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canRecordNewMatch(matches)) {
      triggerNotification("You have already recorded the maximum number of matches today.", "warning");
      return;
    }

    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const team1 = formData.teams[0].players.map(player => ({ name: player.name, userId: player.userId }));
    const team2 = formData.teams[1].players.map(player => ({ name: player.name, userId: player.userId }));
    const userIds = [...team1, ...team2].map(player => player.userId);

    try {
      const response = await fetch("/api/record-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isDoubleGame,
          currentUser: currentUser._id,
          team1,
          team2,
          scores: formData.scores,
          userIds,
        }),
      });

      if (response.ok) {
        fetchUserData();
        triggerNotification("Match recorded successfully! Please wait for the other player to confirm.");
        onClose();
      } else {
        const errorData = await response.json();
        triggerNotification("Error submitting match: " + errorData.error, "error");
      }
    } catch (error) {
      triggerNotification("Error submitting match: " + error.message, "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto px-2 py-4 sm:px-4 sm:py-8">
      <div className="bg-white w-full max-w-2xl sm:max-w-4xl rounded-xl shadow-lg p-4 sm:p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Record Match</h2>

        {/* Game Type Toggle */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => handleGameTypeChange(null, "single")}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
              !isDoubleGame ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Single Game
          </button>
          <button
            onClick={() => handleGameTypeChange(null, "double")}
            className={`px-4 py-2 rounded-lg text-sm sm:text-base ${
              isDoubleGame ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Double Game
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Selection */}
          <div className="flex flex-col sm:flex-row gap-4">
            {formData.teams.map((team, teamIndex) => (
              <div key={teamIndex} className="flex-1 bg-gray-50 p-4 rounded-xl border">
                <label className="block text-lg font-semibold text-center mb-4">
                  Team {teamIndex + 1}
                </label>
                <div className="space-y-3">
                  {team.players.map((player, playerIndex) => (
                    <div className="flex justify-center" key={playerIndex}>
                      {teamIndex === 0 && playerIndex === 0 ? (
                        <div className="w-28 h-10 border rounded-xl flex items-center justify-center text-sm sm:text-base font-medium">
                          {currentUser?.name}
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setShowUserSelection(true);
                            setSelectedField({ teamIndex, playerIndex });
                          }}
                          className="w-28 h-10 border rounded-xl cursor-pointer hover:bg-blue-100 text-sm sm:text-base font-medium flex items-center justify-center"
                        >
                          {player.name || "Select"}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Errors */}
          {formErrors["PlayerUnique"] && (
            <FormHelperText error>{formErrors["PlayerUnique"]}</FormHelperText>
          )}
          {formErrors["PlayerPresent"] && (
            <FormHelperText error>{formErrors["PlayerPresent"]}</FormHelperText>
          )}

          {/* Score Input */}
          <div className="bg-gray-50 p-4 rounded-xl border">
            <label className="block text-lg font-semibold mb-4">Score</label>
            <div className="space-y-4">
              {formData.scores.map((score, index) => (
                <div key={index} className="flex items-center gap-2 justify-center">
                  <span className="text-base sm:text-lg font-medium">Game {index + 1}</span>
                  <ScoreInput
                    value={score.team1}
                    onChange={(e) => handleScoreChange(e, index, "team1")}
                  />
                  <span className="text-xl font-bold">:</span>
                  <ScoreInput
                    value={score.team2}
                    onChange={(e) => handleScoreChange(e, index, "team2")}
                  />
                </div>
              ))}
            </div>

            {/* Score Errors */}
            {formErrors["ScoresRequired"] && (
              <FormHelperText error>{formErrors["ScoresRequired"]}</FormHelperText>
            )}
            {formErrors["ScoresInvalid"] && (
              <FormHelperText error>{formErrors["ScoresInvalid"]}</FormHelperText>
            )}

            <div className="flex gap-2 mt-4 justify-center">
              {formData.scores.length < 5 && (
                <Button variant="outlined" onClick={addGame}>
                  + Add Game
                </Button>
              )}
              {formData.scores.length > 1 && (
                <Button
                  variant="outlined"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      scores: formData.scores.slice(0, -1),
                    })
                  }
                >
                  - Remove Last Game
                </Button>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold"
          >
            Submit Match
          </button>
        </form>

        {/* User Selection Modal */}
        {showUserSelection && (
          <PlayerSelectionTable
            users={users}
            onClose={() => setShowUserSelection(false)}
            onSelect={handlePlayerSelect}
          />
        )}
      </div>
    </div>
  );
}
