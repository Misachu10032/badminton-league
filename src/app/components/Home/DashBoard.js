"use client";

import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";

const MATCHES_PER_PAGE = 10; // Matches per page

export default function Dashboard({ user }) {
  const [matches, setMatches] = useState({ pending: [], confirmed: [] });
  const [loading, setLoading] = useState(true);
  const [isPendingCollapsed, setIsPendingCollapsed] = useState(false);
  const [isConfirmedCollapsed, setIsConfirmedCollapsed] = useState(true);
  const [pendingPage, setPendingPage] = useState(1);
  const [confirmedPage, setConfirmedPage] = useState(1);

  useEffect(() => {
    if (!user || !user.requests) {
      console.log("User or user.requests is null");
      return;
    }

    const fetchMatches = async () => {
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

  const onConfirm = async (matchId) => {
    try {
      const res = await fetch(`/api/confirm-match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id, matchId }),
      });

      if (res.ok) {
        const data = await res.json();
        alert("Match confirmed successfully!");

        // Refresh matches
        setMatches((prevMatches) => ({
          pending: prevMatches.pending.filter((match) => match._id !== matchId),
          confirmed: [...prevMatches.confirmed, data.updatedMatch],
        }));
      } else {
        const error = await res.json();
        console.error("Error confirming match:", error);
        alert(error.message || "Failed to confirm match");
      }
    } catch (error) {
      console.error("Error confirming match:", error);
      alert("Failed to confirm match. Please try again.");
    }
  };

  const paginateMatches = (matches, page) => {
    const startIndex = (page - 1) * MATCHES_PER_PAGE;
    return matches.slice(startIndex, startIndex + MATCHES_PER_PAGE);
  };

  const pendingMatchesToShow = paginateMatches(matches.pending, pendingPage);
  const confirmedMatchesToShow = paginateMatches(
    matches.confirmed,
    confirmedPage
  );

  if (loading) return <div>Loading matches...</div>;

  return (
    <div className="p-4">
      {/* Pending Matches */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Pending Matches</h2>
          <button
            onClick={() => setIsPendingCollapsed((prev) => !prev)}
            className="text-blue-500 underline"
          >
            {isPendingCollapsed ? "Expand" : "Collapse"}
          </button>
        </div>
        {!isPendingCollapsed && (
          <>
            {pendingMatchesToShow.length === 0 ? (
              <p>No pending matches</p>
            ) : (
              <div className="space-y-4">
                {pendingMatchesToShow.map((match) => (
                  <div
                    key={match._id}
                    className="p-4 border rounded-lg bg-gray-50 shadow flex items-center justify-between"
                  >
                    <p>{formatDate(match.createdAt)}</p>
                    <p>
                      {match.team1.map((p) => p.name).join(", ")} vs{" "}
                      {match.team2.map((p) => p.name).join(", ")}
                    </p>
                    <p>
                      {match.scores
                        .map((s) => `${s.team1}-${s.team2}`)
                        .join(" ")}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onConfirm(match._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                      >
                        Confirm
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">
                        X
                      </button>
                    </div>
                  </div>
                ))}
                {/* Pagination */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      setPendingPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={pendingPage === 1}
                    className={`px-4 py-2 rounded-lg shadow ${
                      pendingPage === 1
                        ? "bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Previous
                  </button>
                  <p>
                    Page {pendingPage} of{" "}
                    {Math.ceil(matches.pending.length / MATCHES_PER_PAGE)}
                  </p>
                  <button
                    onClick={() =>
                      setPendingPage((prev) =>
                        prev <
                        Math.ceil(matches.pending.length / MATCHES_PER_PAGE)
                          ? prev + 1
                          : prev
                      )
                    }
                    disabled={
                      pendingPage ===
                      Math.ceil(matches.pending.length / MATCHES_PER_PAGE)
                    }
                    className={`px-4 py-2 rounded-lg shadow ${
                      pendingPage ===
                      Math.ceil(matches.pending.length / MATCHES_PER_PAGE)
                        ? "bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {/* Pagination */}
          </>
        )}
      </section>

      {/* Confirmed Matches */}
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Confirmed Matches</h2>
          <button
            onClick={() => setIsConfirmedCollapsed((prev) => !prev)}
            className="text-blue-500 underline"
          >
            {isConfirmedCollapsed ? "Expand" : "Collapse"}
          </button>
        </div>
        {!isConfirmedCollapsed && (
          <>
            {confirmedMatchesToShow.length === 0 ? (
              <p>No confirmed matches</p>
            ) : (
              <div className="space-y-4">
                {confirmedMatchesToShow.map((match) => (
                  <div
                    key={match._id}
                    className="p-4 border rounded-lg bg-gray-50 shadow flex items-center justify-between"
                  >
                    <p>{formatDate(match.createdAt)}</p>
                    <p>
                      {match.team1.map((p) => p.name).join(", ")} vs{" "}
                      {match.team2.map((p) => p.name).join(", ")}
                    </p>
                    <p>
                      {match.scores
                        .map((s) => `${s.team1}-${s.team2}`)
                        .join(" ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {/* Pagination */}
            {/* Pagination */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() =>
                  setConfirmedPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={confirmedPage === 1}
                className={`px-4 py-2 rounded-lg shadow ${
                  confirmedPage === 1
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <p>
                Page {confirmedPage} of{" "}
                {Math.ceil(matches.confirmed.length / MATCHES_PER_PAGE)}
              </p>
              <button
                onClick={() =>
                  setConfirmedPage((prev) =>
                    prev <
                    Math.ceil(matches.confirmed.length / MATCHES_PER_PAGE)
                      ? prev + 1
                      : prev
                  )
                }
                disabled={
                  confirmedPage ===
                  Math.ceil(matches.confirmed.length / MATCHES_PER_PAGE)
                }
                className={`px-4 py-2 rounded-lg shadow ${
                  confirmedPage ===
                  Math.ceil(matches.confirmed.length / MATCHES_PER_PAGE)
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
