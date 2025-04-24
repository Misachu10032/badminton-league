import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";

export default function AllMatchHistoryModal({ isOpen, onClose }) {
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(""); // New state for player filter
  const matchesPerPage = 7;

  useEffect(() => {
    if (!isOpen) return;

    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/get-all-confirmed-matches");
        const data = await res.json();
        const sortedMatches = (data.matches || []).sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMatches(sortedMatches);
      } catch (error) {
        console.error("Error fetching confirmed matches:", error);
      }
    };

    fetchMatches();
  }, [isOpen]);

  useEffect(() => {
    let filtered = matches;
    
    // Filter by month
    if (selectedMonth) {
      filtered = filtered.filter((match) => {
        const matchDate = new Date(match.createdAt);
        const matchMonth = `${matchDate.getUTCFullYear()}-${String(
          matchDate.getUTCMonth() + 1
        ).padStart(2, "0")}`;
        return matchMonth === selectedMonth;
      });
    }

    // Filter by player
    if (selectedPlayer) {
      filtered = filtered.filter((match) => {
        const playerNames = [
          ...match.team1.map((p) => p.name),
          ...match.team2.map((p) => p.name),
        ];
        return playerNames.includes(selectedPlayer);
      });
    }

    setFilteredMatches(filtered);
    setCurrentPage(1);
  }, [matches, selectedMonth, selectedPlayer]);

  const totalPages = Math.ceil(filteredMatches.length / matchesPerPage);
  const currentMatches = filteredMatches.slice(
    (currentPage - 1) * matchesPerPage,
    currentPage * matchesPerPage
  );

  const availableMonths = [
    ...new Set(
      matches
        .map((match) => {
          const date = new Date(match.createdAt);
          return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
        })
        .sort() // Sorts the months in chronological order
    ),
  ];

  // Get the list of all players (unique names)
  const allPlayers = [
    ...new Set(
      matches.flatMap((match) => [
        ...match.team1.map((p) => p.name),
        ...match.team2.map((p) => p.name),
      ])
    ),
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-[90%] sm:max-w-[30%] max-h-[90vh] rounded-lg shadow-lg p-4 overflow-y-auto relative text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-2 text-black">All Match History</h2>

        <div className="flex justify-end gap-4 mb-3">
          {/* Month Filter Dropdown */}
          <select
            className="border p-1 rounded-md text-sm text-black"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {new Date(`${month}-02`).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </option>
            ))}
          </select>

          {/* Player Filter Dropdown */}
          <select
            className="border p-1 rounded-md text-sm text-black"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
          >
            <option value="">All Players</option>
            {allPlayers.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>

        {filteredMatches.length === 0 ? (
          <p className="text-black text-sm">No matches found.</p>
        ) : (
          <div className="space-y-3">
            {currentMatches.map((match) => (
              <div
                key={match._id}
                className="max-w-md border rounded-md bg-gray-100 p-1 shadow-sm text-black"
              >
                <div className="text-sm font-semibold">
                  {formatDate(match.createdAt)}
                </div>
                <div className="text-sm mt-1">
                  <span className="font-medium">Teams: </span>
                  {match.team1.map((p) => p.name).join(", ")} vs{" "}
                  {match.team2.map((p) => p.name).join(", ")}
                </div>
                <div className="text-sm mt-1">
                  <span className="font-medium">Scores: </span>
                  {match.scores.map((s) => `${s.team1}-${s.team2}`).join(", ")}
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center space-x-2 text-black text-sm">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
