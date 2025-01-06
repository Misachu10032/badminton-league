import { useState, useEffect } from "react";
import Modal from "react-modal";

import { ToggleButton, ToggleButtonGroup, TextField, Button } from '@mui/material';
import PlayerSelectionTable from './PlayerSelectionTable';

export default function RecordMatchModal({ isOpen, onClose, currentUser }) {
  const [isDoubleGame, setIsDoubleGame] = useState(true);
  const [users, setUsers] = useState([]);
  const [showUserSelection, setShowUserSelection] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [formData, setFormData] = useState({
    teams: [
      { name: "Team 1", players: [currentUser?.name || "", ""] },
      { name: "Team 2", players: ["", ""] },
    ],
    scores: [{ team1: "", team2: "" }],
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/get-all-users');
        const data = await response.json();
    
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentUser?._id]);

  const handleGameTypeChange = (event, newValue) => {
    if (newValue !== null) {
      setIsDoubleGame(newValue === 'double');
      setFormData({
        ...formData,
        teams: [
          { name: "Team 1", players: newValue === 'double' ? [currentUser?.name || "", ""] : [currentUser?.name || ""] },
          { name: "Team 2", players: newValue === 'double' ? ["", ""] : [""] },
        ],
      });
    }
  };

  const handlePlayerSelect = (user) => {
    if (selectedField) {
      const updatedForm = { ...formData };
      updatedForm.teams[selectedField.teamIndex].players[selectedField.playerIndex] = user.name;
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
      scores: [...formData.scores, { team1: "", team2: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isDoubleGame,
          teams: formData.teams,
          scores: formData.scores,
        }),
      });

      if (response.ok) {
        onClose();
      } else {
        console.error('Failed to submit match');
      }
    } catch (error) {
      console.error('Error submitting match:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: '800px', // Set the desired width here
          height: '800px', // Set the desired height here
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center border-b-2 border-gray-100 pb-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Record Match</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-light">
          ×
        </button>
      </div>

      <div className="mb-10 flex items-center justify-center">
        <ToggleButtonGroup
          value={isDoubleGame ? 'double' : 'single'}
          exclusive
          onChange={handleGameTypeChange}
          aria-label="Game Type"
          size="large"
          sx={{
            '& .MuiToggleButton-root': {
              px: 4,
              py: 2,
              fontSize: '1.2rem'
            }
          }}
        >
          <ToggleButton value="single">Single Game</ToggleButton>
          <ToggleButton value="double">Double Game</ToggleButton>
        </ToggleButtonGroup>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {formData.teams.map((team, teamIndex) => (
          <div key={teamIndex} className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
            <label className="block text-xl font-semibold text-gray-800 mb-4">
              Team {teamIndex + 1}
            </label>
            <div className="space-y-4">
              {team.players.map((player, playerIndex) => (
                <div key={playerIndex}>
                  {teamIndex === 0 && playerIndex === 0 ? (
                    <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-gray-700 font-medium text-lg">
                      {currentUser?.name}
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        setShowUserSelection(true);
                        setSelectedField({ teamIndex, playerIndex });
                      }}
                      className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-lg font-medium"
                    >
                      {player || "add a"}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-200">
          <label className="block text-xl font-semibold text-gray-800 mb-4">Score</label>
          <div className="space-y-4">
            {formData.scores.map((score, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-700 w-24">
                  Game {index + 1}:
                </span>
<TextField
  type="number"
  className="w-5 h-12 border-2 border-gray-200 rounded-lg text-center text-lg"
  placeholder="0"
  value={score.team1}
  onChange={(e) => handleScoreChange(e, index, "team1")}
  slotProps={{
    input: {
      min: 0,
      max: 30,
    }
  }}
/>
<span className="text-xl font-medium text-gray-700">-</span>
<TextField
  type="number"
  className="w-5 h-12 border-2 border-gray-200 rounded-lg text-center text-lg"
  placeholder="0"
  value={score.team2}
  onChange={(e) => handleScoreChange(e, index, "team2")}
  slotProps={{
    input: {
      min: 0,
      max: 30,
    }
  }}
/>
              </div>
            ))}
          </div>

          <div className="flex space-x-4 mt-6">
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={addGame}
              className="text-lg font-medium"
            >
              + Add Game
            </Button>
            {formData.scores.length > 1 && (
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => {
                  setFormData({
                    ...formData,
                    scores: formData.scores.slice(0, -1)
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
