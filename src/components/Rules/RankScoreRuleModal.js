
import InfoIcon from "@mui/icons-material/Info";

const RankScoreRule = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-3xl max-h-[90%] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {language === "en" ? "RankScore Rule" : "积分细则"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Winning Team Section */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
            {language === "en" ? "Winning Team" : "赢"}
          </h3>
          <p className="text-lg font-medium">
            {language === "en" ? "Score calculation:" : "算分规则"}
          </p>
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-md shadow-sm">
            <p className="font-mono text-sm">
              {language === "en"
                ? "(200 - gamesWonAgainstTheLosingTeam * 10) * decisiveMultiplier * numberOfGamesPlayed"
                : "每场比赛可获得积分 =（基础分-杀熟分)x 胜负系数 x 赢的局数"}
            </p>
          </div>

          <div className="bg-gray-50 border-l-4 border-indigo-500 p-4 rounded-md shadow-sm space-y-3 mt-4">
            <p className="flex items-center gap-2 font-medium">
              <InfoIcon fontSize="small" color="primary" />
              {language === "en" ? "Details:" : "详细规则："}
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>
                {language === "en"
                  ? "gamesWonAgainstTheLosingTeam is calculated for each player."
                  : "基础分 = 100。"}
              </li>
              <li>
                {language === "en"
                  ? "Example: If A and B win against C and D, A's value includes all wins against C and D."
                  : "杀熟分 = 赢过对手的次数 x 10。(基础分-杀熟分) 的下线是50。"}
              </li>
              <li>
                {language === "en"
                  ? "numberOfGamesPlayed: 1 for best of 1, 2 for best of 3, 3 for best of 5."
                  : "胜负系数： 若胜方分数是负方的两倍以上，胜负系数为1.5，否则为1。"}
              </li>
            </ul>
          </div>
        </section>

        {/* Losing Team Section */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
            {language === "en" ? "Losing Team" : "输"}
          </h3>
          <p className="text-lg font-medium">
            {language === "en" ? "Score calculation:" : "算分规则："}
          </p>
          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-md shadow-sm">
            <p className="font-mono text-sm">
              {language === "en"
                ? "(hardworkScore + rankingDifferenceScore) * numberOfGamesPlayed"
                : "每场比赛可获得积分 = (拼搏分+挑战分) x 对局局数"}
            </p>
          </div>

          <div className="bg-gray-50 border-l-4 border-indigo-500 p-4 rounded-md shadow-sm space-y-3 mt-4">
            <p className="flex items-center gap-2 font-medium">
              <InfoIcon fontSize="small" color="info" />
              {language === "en" ? "Details:" : "详细规则："}
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>
                {language === "en"
                  ? "hardworkScore: 50 if the total score ratio is less than 1.5, otherwise 0."
                  : "拼搏分：总比分差低于1.5时为20分，否则为0。"}
              </li>
              <li>
                {language === "en"
                  ? "rankingDifferenceScore: 50 if the difference between combined scores of teams exceeds 1000."
                  : "挑战分：队伍排名分数总和差超过1000时得20分。"}
              </li>
            </ul>
          </div>
        </section>

        {/* Example Match Images */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
            {language === "en" ? "Example Matches" : "比赛示例"}
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Match 1 */}
            <div className="w-1/2 max-w-sm text-center">
              <p className="font-medium mb-2">
                {language === "en" ? "Match 1" : "第一场比赛"}
              </p>
              <img
                src="/images/rules/example_match_1.png"
                alt="Example Match 1"
                className="w-full h-auto rounded shadow-md"
              />
            </div>

            {/* Match 2 */}
            <div className="w-1/2 max-w-sm text-center">
              <p className="font-medium mb-2">
                {language === "en" ? "Match 2" : "第二场比赛"}
              </p>
              <img
                src="/images/rules/example_match_2.png"
                alt="Example Match 2"
                className="w-full h-auto rounded shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-all"
          >
            {language === "en" ? "Close" : "关闭"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankScoreRule;
