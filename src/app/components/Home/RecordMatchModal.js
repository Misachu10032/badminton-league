import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  ToggleButton,
  ToggleButtonGroup,
  Button,
  FormHelperText,
} from "@mui/material";
import PlayerSelectionTable from "./PlayerSelectionTable";
import ScoreInput from "../common/SocreInput"; // Ensure the path is correct
import { validateForm } from "../../utils/validateMatch"; // Ensure the path is correct
import { canRecordNewMatch } from "@/app/utils/maxMatchesInADay";

export default function RecordMatchModal({ isOpen, onClose, currentUser,matches,fetchUserData }) {
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
      setIsDoubleGame(newValue === "double");
      setFormData({
        ...formData,
        teams: [
          {
            name: "Team 1",
            players:
              newValue === "double"
                ? [
                    {
                      name: currentUser?.name || "",
                      userId: currentUser?._id || "",
                    },
                    { name: "", userId: "" },
                  ]
                : [
                    {
                      name: currentUser?.name || "",
                      userId: currentUser?._id || "",
                    },
                  ],
          },
          {
            name: "Team 2",
            players:
              newValue === "double"
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
      updatedForm.teams[selectedField.teamIndex].players[
        selectedField.playerIndex
      ] = { name: user.name, userId: user._id };
      setFormData(updatedForm);
      setShowUserSelection(false);
      setSelectedField(null);
    }
  };

  const handleScoreChange = (e, index, team) => {
    const value = e.target.value;
    const updatedScores = [...formData.scores];
    updatedScores[index][team] = value;
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
      alert("You have already recorded the maximum number of matches today.");
      return;
    }

    const errors = validateForm(formData); // Use the validation function
    console.log("Errors:", errors);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Prepare the data to send in the API request
    const team1 = formData.teams[0].players.map((player) => ({
      name: player.name,
      userId: player.userId,
    }));
    const team2 = formData.teams[1].players.map((player) => ({
      name: player.name,
      userId: player.userId,
    }));

    const userIds = [
      ...team1.map(player => player.userId),
      ...team2.map(player => player.userId)
    ];

    try {
      const response = await fetch("/api/record-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isDoubleGame,
          currentUser: currentUser._id,
          team1,
          team2,
          scores: formData.scores,
          userIds
        }),
      });

      if (response.ok) {
        fetchUserData();
        onClose();
      } else {
        const errorData = await response.json();
        console.log("Error submitting match:", errorData.error );
        alert(errorData.error);  
      }
    } catch (error) {
      console.log("Error submitting match:", response.error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: "90%", // Use percentage for responsive width
          maxWidth: "800px", // Set a max width for larger screens
          height: "90%", // Use percentage for responsive height
          maxHeight: "800px", // Set a max height for larger screens
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px", // Add padding for better spacing
        },
      }}
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center border-b-2 border-gray-100 pb-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Record Match</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-5xl font-light"
        >
          ×
        </button>
      </div>

      <div className="mb-10 flex items-center justify-center">
        <ToggleButtonGroup
          value={isDoubleGame ? "double" : "single"}
          exclusive
          onChange={handleGameTypeChange}
          aria-label="Game Type"
          size="large"
          sx={{
            "& .MuiToggleButton-root": {
              px: 4,
              py: 2,
              fontSize: "1.2rem",
            },
          }}
        >
          <ToggleButton value="single">Single Game</ToggleButton>
          <ToggleButton value="double">Double Game</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-wrap gap-6">
          {formData.teams.map((team, teamIndex) => (
            <div
              key={teamIndex}
              className="flex-1 min-w-[200px] bg-gray-50 p-4 rounded-xl border-2 border-gray-200"
            >
              <label className="block text-xl font-semibold text-gray-800 mb-4 text-center">
                Team {teamIndex + 1}
              </label>
              <div className="space-y-4">
                {team.players.map((player, playerIndex) => (
                  <div
                    className="flex items-center justify-center"
                    key={playerIndex}
                  >
                    {teamIndex === 0 && playerIndex === 0 ? (
                      <div className="w-32 h-12 border-2 border-gray-200 rounded-xl text-lg font-medium flex items-center justify-center">
                        {currentUser?.name}
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setShowUserSelection(true);
                          setSelectedField({ teamIndex, playerIndex });
                        }}
                        className="w-32 h-12 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-400 text-lg font-medium flex items-center justify-center"
                      >
                        {player.name || ""}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {formErrors[`PlayerUnique`] && (
          <FormHelperText error>{formErrors[`PlayerUnique`]}</FormHelperText>
        )}
        {formErrors[`PlayerPresent`] && (
          <FormHelperText error>{formErrors[`PlayerPresent`]}</FormHelperText>
        )}

        <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
          <label className="block text-xl font-semibold text-gray-800 mb-4">
            Score
          </label>
          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap gap-6">
              {formData.scores.map((score, index) => (
                <div key={index} className="flex flex-col space-y-2 w-30">
                  <span className="text-lg font-medium text-gray-700">
                    Game {index + 1}
                  </span>
                  <div className="flex space-x-2">
                    <ScoreInput
                      value={score.team1}
                      onChange={(e) => handleScoreChange(e, index, "team1")}
                      className="w-12 h-6 border-gray-200 rounded-lg text-center"
                    />
                    <span className="text-3xl font-medium text-gray-700">:</span>
                    <ScoreInput
                      value={score.team2}
                      onChange={(e) => handleScoreChange(e, index, "team2")}
                      className="w-12 h-6 border-gray-200 text-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {formErrors[`ScoresRequired`] && (
            <FormHelperText error className="mt-4">
              {formErrors[`ScoresRequired`]}
            </FormHelperText>
          )}
          {formErrors[`ScoresInvalid`] && (
            <FormHelperText error className="mt-4">
              {formErrors[`ScoresInvalid`]}
            </FormHelperText>
          )}
          <div className="flex space-x-4 mt-6">
            {formData.scores.length < 5 && (
              <Button
                variant="outlined"
                color="primary"
                onClick={addGame}
                className="text-lg font-medium"
              >
                + Add Game
              </Button>
            )}
            {formData.scores.length > 1 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setFormData({
                    ...formData,
                    scores: formData.scores.slice(0, -1),
                  });
                }}
                className="text-lg font-medium"
              >
                - Remove Last Game
              </Button>
            )}
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="w-full py-4 text-lg font-medium"
        >
          Submit Match
        </Button>
      </form>

      {showUserSelection && (
        <PlayerSelectionTable
          users={users}
          onClose={() => setShowUserSelection(false)}
          onSelect={handlePlayerSelect}
        />
      )}
    </Modal>
  );
}
