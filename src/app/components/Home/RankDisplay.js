import { getRank } from "../../utils/getRanks"; // Ensure this path is correct

const UserRank = ({ score }) => {
  const rank = getRank(score); // Call the utility function to get the rank

  return (
    <div className="p-4 bg-gray-100 rounded-lg text-center shadow-md">
      <h1 className="text-xl font-bold text-gray-800">Your Rank</h1>
      <p className="text-2xl text-blue-600 mt-2">{rank}</p>
      <p className="text-sm text-gray-500 mt-1">Score: {score}</p>
    </div>
  );
};

export default UserRank;