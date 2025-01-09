import { useState } from 'react';
import { Box, Avatar, TextField } from '@mui/material';

export default function PlayerSelectionTable({ users, onClose, onSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-10 w-full max-w-[1000px] max-h-[85vh] overflow-y-auto rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 sm:mb-10 pb-6 border-b-2 border-gray-100">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Select Player</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-light transition duration-200"
          >
            ×
          </button>
        </div>
        
        {/* Search Box */}
        <div className="mb-8 sm:mb-10">
          <TextField
            fullWidth
            variant="outlined"
            size="large"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '56px',
                fontSize: '1.1rem'
              }
            }}
          />
        </div>

        {/* Player Grid */}
        <div className="border-2 border-gray-200 rounded-xl p-6 sm:p-8 bg-gray-50">
          <Box 
            display="grid" 
            gridTemplateColumns="repeat(1, 1fr)" 
            sm={{ gridTemplateColumns: "repeat(2, 1fr)" }} 
            md={{ gridTemplateColumns: "repeat(3, 1fr)" }} 
            lg={{ gridTemplateColumns: "repeat(5, 1fr)" }}
            gap={4}
          >
            {filteredUsers.map(user => (
              <div
                key={user._id}
                onClick={() => onSelect(user)}
                className="p-4 sm:p-6 cursor-pointer transition-all duration-200 border-2 border-gray-200 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-300 hover:shadow-md"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      fontSize: '1.5rem',
                      bgcolor: '#EBF5FF',
                      color: '#2563EB'
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="text-base sm:text-lg font-medium text-gray-700 truncate w-full">
                    {user.name}
                  </span>
                </div>
              </div>
            ))}
          </Box>
        </div>

        {/* No Results Message */}
        {filteredUsers.length === 0 && (
          <div className="mt-8 sm:mt-10 text-center py-8 sm:py-10 text-gray-500 text-xl bg-gray-50 rounded-xl">
            No players found
          </div>
        )}
      </div>
    </div>
  );
}
