"use client";

import { useEffect, useState, useMemo } from "react";

import DoubleCheckModal from "../common/DoubleCheckModal";
import { formatDate } from "@/utils/formatDate";

const MATCHES_PER_PAGE = 10; // Matches per page

export default function Dashboard({ user, matches, setMatches }) {
  const [isPendingCollapsed, setIsPendingCollapsed] = useState(false);
  const [isConfirmedCollapsed, setIsConfirmedCollapsed] = useState(true);
  const [pendingPage, setPendingPage] = useState(1);
  const [confirmedPage, setConfirmedPage] = useState(1);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [matchToDecline, setMatchToDecline] = useState(null);

  useEffect(() => {
    if (!user || !user.requests) {
      console.log("User or user.requests is null");
      return;
    }
  });

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

  const onDecline = async (matchId) => {
    setMatchToDecline(matchId);
    setIsDeclineModalOpen(true);
  };

  const handleConfirmDecline = async () => {
    try {
      const res = await fetch(`/api/decline-match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId: matchToDecline }),
      });

      if (res.ok) {
        alert("Match request declined successfully!");
        // Refresh matches or update state as needed
      } else {
        const error = await res.json();
        console.error("Error declining match:", error);
        alert(error.message || "Failed to decline match");
      }
    } catch (error) {
      console.error("Error declining match:", error);
      alert("Failed to decline match. Please try again.");
    } finally {
      setMatches((prevMatches) => ({
        pending: prevMatches.pending.filter(
          (match) => match._id !== matchToDecline
        ),
        confirmed: prevMatches.confirmed,
      }));
      setIsDeclineModalOpen(false);

      setMatchToDecline(null);
    }
  };

  const paginateMatches = (matches, page) => {
    const startIndex = (page - 1) * MATCHES_PER_PAGE;
    return matches.slice(startIndex, startIndex + MATCHES_PER_PAGE);
  };
  const pendingMatchesToShow = useMemo(
    () => paginateMatches(matches.pending || [], pendingPage),
    [matches.pending, pendingPage]
  );

  const confirmedMatchesToShow = useMemo(
    () => paginateMatches(matches.confirmed || [], confirmedPage),
    [matches.confirmed, confirmedPage]
  );

  return (
    <div className="p-4 mt-2">
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
              <div className="space-y-4 sm:space-y-2">
                {pendingMatchesToShow.map((match) => (
                  <div
                    key={match._id}
                    className="border rounded-lg bg-gray-50 shadow flex flex-col sm:flex-row items-center justify-between p-1 sm:p-3 text-sm sm:text-base"
                  >
                    <p className="w-full sm:w-auto mb-1 sm:mb-0">
                      {formatDate(match.createdAt)}
                    </p>
                    <p className="w-full sm:w-auto mb-1 sm:mb-0">
                      {match.team1.map((p) => p.name).join(", ")} vs{" "}
                      {match.team2.map((p) => p.name).join(", ")}
                    </p>
                    <p className="w-full sm:w-auto mb-1 sm:mb-0">
                      {match.scores
                        .map((s) => `${s.team1}-${s.team2}`)
                        .join(" ")}
                    </p>
                    <div className="flex space-x-2 sm:space-x-4 w-full sm:w-auto mt-2 sm:mt-0">
                      <button
                        onClick={() => onConfirm(match._id)}
                        className={`p-1 sm:px-4 sm:py-2 rounded-lg shadow transition duration-200 w-full sm:w-auto ${
                          user.requests.confirmed.includes(match._id)
                            ? "bg-gray-200 text-gray-700 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        disabled={user.requests.confirmed.includes(match._id)}
                      >
                        {user.requests.confirmed.includes(match._id)
                          ? "Confirmed"
                          : "Confirm"}
                      </button>

                      <button
                        onClick={() => onDecline(match._id)}
                        className="bg-red-600 text-white p-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-red-700 transition duration-200 w-full sm:w-auto"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row justify-between mt-4">
                  <button
                    onClick={() =>
                      setPendingPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={pendingPage === 1}
                    className={`p-2 sm:px-4 sm:py-2 rounded-lg shadow mb-2 sm:mb-0 ${
                      pendingPage === 1
                        ? "bg-gray-300"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    Previous
                  </button>
                  <p className="mb-2 sm:mb-0 text-center sm:text-left">
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
                    className={`p-2 sm:px-4 sm:py-2 rounded-lg shadow ${
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
              <p className="text-center">No confirmed matches</p>
            ) : (
              <div className="space-y-4">
                {confirmedMatchesToShow.map((match) => (
                  <div
                    key={match._id}
                    className="p-2 sm:p-4 border rounded-lg bg-gray-50 shadow flex flex-col sm:flex-row justify-between"
                  >
                    <p className="mb-2 sm:mb-0 sm:mr-2">
                      {formatDate(match.createdAt)}
                    </p>
                    <p className="mb-2 sm:mb-0 sm:mr-2">
                      {match.team1.map((p) => p.name).join(", ")} vs{" "}
                      {match.team2.map((p) => p.name).join(", ")}
                    </p>
                    <p className="text-sm sm:text-base">
                      {match.scores
                        .map((s) => `${s.team1}-${s.team2}`)
                        .join(" ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between mt-4">
              <button
                onClick={() =>
                  setConfirmedPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={confirmedPage === 1}
                className={`p-2 sm:px-4 sm:py-2 rounded-lg shadow mb-2 sm:mb-0 ${
                  confirmedPage === 1
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <p className="text-center sm:text-left mb-2 sm:mb-0">
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
                className={`p-2 sm:px-4 sm:py-2 rounded-lg shadow ${
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
      {/* Confirmation Modal */}
      {isDeclineModalOpen && (
        <DoubleCheckModal
          title="Cancel Match Request"
          message="Are you sure you would like to cancel this match request?"
          isOpen={isDeclineModalOpen}
          onClose={() => setIsDeclineModalOpen(false)}
          onConfirm={handleConfirmDecline}
        />
      )}
    </div>
  );
}
