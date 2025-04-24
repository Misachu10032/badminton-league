import { useEffect, useState } from "react";
import { Modal, Box, Typography, Avatar } from "@mui/material";
import { getRank } from "@/utils/getRanks";

const PlayerRankModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/get-all-users");
        if (response.ok) {
          const data = await response.json();
          const sortedUsers = data.sort((a, b) => b.score - a.score);
          setUsers(sortedUsers);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (isOpen) fetchUsers();
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="player-rankings"
      aria-describedby="modal to show player rankings"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxWidth: "500px",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="text-xl font-semibold text-gray-800">
            Player Rankings
          </Typography>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-3xl leading-none font-light"
          >
            &times;
          </button>
        </div>

        {users.length === 0 ? (
          <Typography className="text-center text-gray-500">No users found</Typography>
        ) : (
          <div className="divide-y divide-gray-200">
            {users.map((user, index) => {
              const rank = getRank(user.score);
              return (
                <div
                  key={user._id}
                  className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded transition"
                >
                  <div className="flex items-center space-x-4">
                    <span className="w-5 text-sm text-gray-500 font-bold">{index + 1}.</span>
                    <Avatar
                      sx={{ width: 40, height: 40 }}
                      alt={user.name}
                      src={user.picture || "/default-avatar.png"}
                    >
                      {user.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium">{user.name}</span>
                      <span className="text-sm text-gray-500">Score: {user.score}</span>
                    </div>
                  </div>
                  <span className="text-blue-600 font-semibold">{rank}</span>
                </div>
              );
            })}
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PlayerRankModal;
