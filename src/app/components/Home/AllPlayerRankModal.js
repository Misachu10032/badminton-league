import { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Avatar } from '@mui/material';
import { getRank } from '../../utils/getRanks'; // Ensure this path is correct

const PlayerRankModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);

  // Fetch all users' data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/get-all-users'); // Adjust the API endpoint if needed
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          
          // Sort the users by their score in descending order
          const sortedUsers = data.sort((a, b) => b.score - a.score);
          setUsers(sortedUsers);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',  // Set width to 90% for better mobile handling
          maxWidth: '800px',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
          overflowY: 'auto',
          maxHeight: '80vh',
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: '3px' },
          '&::-webkit-scrollbar-thumb:hover': { background: '#555' }
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" component="h2" className="font-bold text-xl">
            Player Rankings
          </Typography>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-5xl font-light"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {users.length === 0 ? (
            <Typography className="text-center text-gray-500">No users found</Typography>
          ) : (
            <div className="space-y-2">
              {users.map((user, index) => {
                const rank = getRank(user.score); // Get rank for each user based on their score
                return (
                  <div
                    key={user._id}
                    className="flex justify-between items-center p-4 border-b border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar 
                        sx={{ width: 40, height: 40, fontSize: '1.5rem' }} 
                        alt={user.name} 
                        src={user.picture || '/default-avatar.png'} // Placeholder if no picture
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className="flex flex-col">
                        <Typography className="font-medium">{user.name}</Typography>
                        <Typography className="text-sm text-gray-500">Score: {user.score}</Typography>
                      </div>
                    </div>
                    <Typography className="font-bold text-blue-600">{rank}</Typography>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default PlayerRankModal;
