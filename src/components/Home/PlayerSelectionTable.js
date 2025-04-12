import { useState, useMemo } from "react";
import { Box, Avatar, TextField, useMediaQuery, useTheme } from "@mui/material";

export default function PlayerSelectionTable({ users, onClose, onSelect }) {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const filteredUsers = useMemo(
    () =>
      users
        .filter((user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [users, searchQuery]
  );

  const gridTemplate = isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8">
      <div
        className={`bg-white ${
          isMobile ? "p-4" : "p-10"
        } w-full max-w-[1000px] max-h-[85vh] overflow-y-auto rounded-xl shadow-xl`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b-2 border-gray-100">
          <h3
            className={`${
              isMobile ? "text-lg" : "text-2xl"
            } font-bold text-gray-800`}
          >
            Select Player
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            ×
          </button>
        </div>

        {/* Search Box */}
        <div className="mb-4">
          <TextField
            fullWidth
            variant="outlined"
            size={isMobile ? "small" : "large"}
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: isMobile ? "40px" : "56px",
                fontSize: isMobile ? "0.9rem" : "1.1rem",
              },
            }}
          />
        </div>

        {/* Player Grid */}
        <div className="border-2 border-gray-200 rounded-xl p-4 bg-gray-50">
          <Box
            display="grid"
            gridTemplateColumns={gridTemplate}
            gap={isMobile ? 2 : 4}
          >
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => onSelect(user)}
                className={`p-4 cursor-pointer transition-all duration-200 border-2 border-gray-200 rounded-xl bg-white hover:bg-blue-50 hover:border-blue-300 hover:shadow-md ${
                  isMobile ? "text-center" : ""
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Avatar
                    sx={{
                      width: isMobile ? 40 : 64,
                      height: isMobile ? 40 : 64,
                      fontSize: isMobile ? "1.25rem" : "1.75rem",
                      bgcolor: "#EBF5FF",
                      color: "#2563EB",
                    }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <span
                    className={`text-sm font-medium text-gray-700 truncate ${
                      isMobile ? "w-full" : "w-24"
                    }`}
                  >
                    {user.name}
                  </span>
                </div>
              </div>
            ))}
          </Box>
        </div>

        {/* No Results Message */}
        {filteredUsers.length === 0 && (
          <div className="mt-4 text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-xl">
            No players found
          </div>
        )}
      </div>
    </div>
  );
}
