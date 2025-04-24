import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";

export default function AllMatchHistoryModal({ isOpen, onClose }) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/get-all-confirmed-matches");
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (error) {
        console.error("Error fetching confirmed matches:", error);
      }
    };

    fetchMatches();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-lg shadow-lg p-4 overflow-y-auto relative text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 text-black">All Match History</h2>

        {matches.length === 0 ? (
          <p className="text-black text-sm">No matches found.</p>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <div
                key={match._id}
                className="border rounded-md bg-gray-100 p-1 shadow-sm text-black"
              >
                <div className="text-sm font-semibold">{formatDate(match.createdAt)}</div>
                <div className="text-sm mt-1">
                  <span className="font-medium">Teams: </span>
                  {match.team1.map((p) => p.name).join(", ")} vs {match.team2.map((p) => p.name).join(", ")}
                </div>
                <div className="text-sm mt-1">
                  <span className="font-medium">Scores: </span>
                  {match.scores.map((s) => `${s.team1}-${s.team2}`).join(", ")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
