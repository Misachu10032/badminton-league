import BarChartIcon from "@mui/icons-material/BarChart";
import HistoryIcon from "@mui/icons-material/History";
import { useState } from "react";
import PlayerRankModal from "./AllPlayerRankModal";
import { getRank } from "@/utils/getRanks";
import AllMatchHistoryModal from "./AllMatchHistoryModal";

const UserRank = ({ score, players }) => {
  const [isRankModalOpen, setIsRankModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const rank = getRank(score);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 shadow border mx-2 rounded-lg text-center">
      <div className="flex-grow text-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Rank</h1>
        <p className="text-3xl text-blue-600 mt-2">{rank}</p>
        <p className="text-sm text-gray-500 mt-1">Rank Score: {score}</p>
      </div>

      {/* Icons container */}
      <div className="flex flex-col items-center space-y-2 ml-4">
        <BarChartIcon
          className="cursor-pointer text-blue-600 hover:text-blue-800"
          onClick={() => setIsRankModalOpen(true)}
        />
        <HistoryIcon
          className="cursor-pointer text-green-600 hover:text-green-800"
          onClick={() => setIsHistoryModalOpen(true)}
        />
      </div>

      {/* Modals */}
      {isRankModalOpen && (
        <PlayerRankModal
          isOpen={isRankModalOpen}
          onClose={() => setIsRankModalOpen(false)}
        />
      )}
      {isHistoryModalOpen && (
        <AllMatchHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => setIsHistoryModalOpen(false)}
        />
      )}
    </div>
  );
};

export default UserRank;
