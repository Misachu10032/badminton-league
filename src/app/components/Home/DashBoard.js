"use client";

import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";

export default function Dashboard({ user }) {
  const [matches, setMatches] = useState({ pending: [], confirmed: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.requests) {
      console.log("User or user.requests is null");
      return; // Prevents fetch if user or user.requests is not available
    }

    const fetchMatches = async () => {
      console.log(user);
      console.log(user.requests);
      console.log(user.requests.pending);

      try {
        const res = await fetch("/api/get-matches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pendingIds: user.requests.pending,
            confirmedIds: user.requests.confirmed,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setMatches({
            pending: data.pendingMatches,
            confirmed: data.confirmedMatches,
          });
        } else {
          console.error("Failed to fetch matches");
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [user]);

  if (loading) return <div>Loading matches...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Pending Matches */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pending Matches</h2>
        {matches.pending.length === 0 ? (
          <p>No pending matches</p>
        ) : (
          <div className="space-y-4">
            {matches.pending.map((match) => (
              <div
                key={match._id}
                className="p-4 border rounded-lg bg-gray-50 shadow flex items-center justify-between"
              >
                <p className="flex-1 text-sm">
                  {formatDate(match.createdAt)} {/* Date */}
                </p>
                <p className="flex-1 text-sm">
                  {match.team1.map((p) => p.name).join(", ")} vs {match.team2.map((p) => p.name).join(", ")} {/* Teams */}
                </p>
                <p className="flex-1 text-sm">
                  {match.scores.map((s) => `${s.team1}-${s.team2}`).join(" ")} {/* Scores */}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Confirmed Matches */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Confirmed Matches</h2>
        {matches.confirmed.length === 0 ? (
          <p>No confirmed matches</p>
        ) : (
          <div className="space-y-4">
            {matches.confirmed.map((match) => (
              <div
                key={match._id}
                className="p-4 border rounded-lg bg-gray-50 shadow flex items-center justify-between"
              >
                <p className="flex-1 text-sm">
                  {formatDate(match.createdAt)} {/* Date */}
                </p>
                <p className="flex-1 text-sm">
                  {match.team1.map((p) => p.name).join(", ")} vs {match.team2.map((p) => p.name).join(", ")} {/* Teams */}
                </p>
                <p className="flex-1 text-sm">
                  {match.scores.map((s) => `${s.team1}-${s.team2}`).join(" ")} {/* Scores */}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
