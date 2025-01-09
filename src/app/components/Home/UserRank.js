import { getRank } from "../../utils/getRanks"; // Ensure this path is correct
import BarChartIcon from '@mui/icons-material/BarChart';
import { useState } from 'react';
import PlayerRankModal from "./AllPlayerRankModal";
// import PlayerRankModal from './PlayerRankModal'; // Import the modal component

const UserRank = ({ score, players }) => {
  const [isRankModalOpen, setIsRankModalOpen] = useState(false); // State for the rank modal
  const rank = getRank(score); // Call the utility function to get the rank

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 shadow border mx-2 rounded-lg text-center">
      <div className="flex-grow text-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Rank</h1>
        <p className="text-3xl text-blue-600 mt-2">{rank}</p>
        <p className="text-sm text-gray-500 mt-1">Score: {score}</p>
      </div>
      <BarChartIcon 
        className="cursor-pointer text-blue-600 hover:text-blue-800 ml-4"
        onClick={() => setIsRankModalOpen(true)}
      />
      {/* Popup Modal for Player Rankings */}
      {isRankModalOpen && (
        <PlayerRankModal
          isOpen={isRankModalOpen}
          onClose={() => setIsRankModalOpen(false)}

        />
      )}
    </div>
  );
};

export default UserRank;