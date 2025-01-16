
const MAXIMUM_MATCHES_IN_A_DAY = 1;
export const canRecordNewMatch  = (matches) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Start of the day
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // End of the day

  // Combine confirmed and pending matches and filter for today's matches
  const matchesToday = [
    ...(matches.confirmed || []), 
    ...(matches.pending || [])
  ].filter((match) => {
    const matchDate = new Date(match.createdAt);
    return matchDate >= todayStart && matchDate <= todayEnd;
  });
  console.log("Matches today:", matchesToday);


  return  matchesToday.length<MAXIMUM_MATCHES_IN_A_DAY;
};
