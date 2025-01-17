"use client";

const RulesPage = () => {
  const handleNavigateToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600">
          Rules
        </h1>
        <div className="text-gray-700 space-y-5">
          <p className="text-lg font-medium text-center">I'm working on it</p>

          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
            Winning Team
          </h2>
          <p className="text-lg">Score calculation:</p>
          <p className="bg-gray-50 border-l-4 border-indigo-500 px-4 py-2 rounded-md">
            (200 - gamesWonAgainstTheLosingTeam * 10) * decisiveMultiplier *
            numberOfGamesPlayed
          </p>

          <div className="bg-gray-50 border-l-4 border-indigo-500 px-4 py-2 rounded-md space-y-3">
            <p className="text-base">Details:</p>
            <ul className="list-disc pl-5">
              <li className="text-base">
                gamesWonAgainstTheLosingTeam is calculated for each player.
              </li>
              <>
                Example: If A and B win against C and D, A's value includes all
                wins against C and D.
              </>
              <>
                If A won a double match against C and D, and a single against D,
                A's value is 3.
              </>

              <li className="text-base">
                {" "}
                The decisiveMultiplier increases to 1.5 if the winning team's
                score is more than twice the losing team's, otherwise it's 1.
              </li>

              <li className="text-base">
                numberOfGamesPlayed: 1 for best of 1, 2 for best of 3, 3 for
                best of 5.
              </li>
            </ul>
          </div>



          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 mt-6 pb-2">
            Losing Team
          </h2>
          <p className="text-lg">Score calculation:</p>
          <p className="bg-gray-50 border-l-4 border-red-500 px-4 py-2 rounded-md">
            (hardworkScore + rankingDifferenceScore) * numberOfGamesPlayed
          </p>
          <div className="bg-gray-50 border-l-4 border-red-500 px-4 py-2 rounded-md space-y-3">
            <p className="text-base">Details:</p>
            <ul className="list-disc pl-5">
              <li>
                hardworkScore: 50 if the total score ratio is less than 1.5,
                otherwise 0.
              </li>
              <li>
                rankingDifferenceScore: 50 if the difference between combined
                scores of teams exceeds 1000.
              </li>
              <li className="text-base">
                numberOfGamesPlayed: 1 for best of 1, 2 for best of 3, 3 for
                best of 5.
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleNavigateToLogin}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
