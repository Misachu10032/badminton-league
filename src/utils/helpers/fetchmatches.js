// src/utils/fetchMatches.js

export async function fetchAndSortMatches(userData, setMatches) {
    try {
      const matchRes = await fetch("/api/get-matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchesIds: [
            ...userData.requests.confirmed,
            ...userData.requests.pending,
          ],
        }),
      });
  
      if (!matchRes.ok) {
        throw new Error("Failed to fetch matches");
      }
  
      const matchData = await matchRes.json();
  
      const sortedPending = matchData.matches
        .filter((m) => m.status === "Pending")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const sortedConfirmed = matchData.matches
        .filter((m) => m.status === "Confirmed")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      setMatches({
        pending: sortedPending,
        confirmed: sortedConfirmed,
      });
    } catch (error) {
      console.error("Error fetching and sorting matches:", error);
    }
  }
  