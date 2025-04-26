export default function RecordMatchRulesModal({ isOpen, onClose, language }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {language === "en" ? "Match Recording Rules" : "如何记录比赛"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Rules Content */}
        <div className="space-y-6">
          {/* General Rules */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === "en" ? "General Rules" : "通用规则"}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
              <li>
                {language === "en"
                  ? "The general idea is to choose 3 games as league games each day and record the scores to count towards ranking points."
                  : "每天可选择1-3场比赛作为积分赛。记录比分冲排名积分。"}
              </li>
              <li>
                {language === "en"
                  ? "Each user can only record 3 games per day. Each game can consist of up to 5 matches."
                  : "每位玩家每天最多只能记录三场比赛。每场比赛最多包含五场对局。"}
              </li>
              <li>
                {language === "en"
                  ? "If someone in the game has already recorded 3 games, this game can not be recorded ."
                  : "如果球局里的一个玩家已经记录了三场球局，那这局比赛不能算作积分赛"}
              </li>
              <li>
                {language === "en"
                  ? "Tie games are not allowed. The winning team must be declared."
                  : "平局不能被记录"}
              </li>
            </ul>
          </section>

          {/* Score Submission */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === "en" ? "Score Submission" : "比分提交"}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
              <li>
                {language === "en"
                  ? "The game result can be recorded by any player in the game."
                  : "比赛结果可以由任何玩家记录。"}
              </li>
              <li>
                {language === "en"
                  ? "Once a player records a game, the other players can see the game on their dashboard with a confirm button next to the record."
                  : "当一名玩家记录比赛后，其它玩家也可以看到该比赛记录。请点击confirm使记录生效。"}
              </li>
              <li>
                {language === "en"
                  ? "Once all players confirm the game, the rank points will be added to individual players. The points detail can be found in the Confirmed Games section."
                  : "当所有玩家都confirm后，排名积分将结算，积分详情可在“Confirmed Matches”查看。"}
              </li>
              <li>
                {language === "en"
                  ? "If there is a dispute, you can delete the game and record it again. Confirmed games cannot be deleted."
                  : "如有争议，可删除比赛记录并重新记录。确认的比赛记录无法删除。"}
              </li>
            </ul>
          </section>

          {/* Additional Notes */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === "en" ? "Additional Notes" : "附加说明"}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
              <li>
                {language === "en"
                  ? "Have Fun and Enjoy the Game!"
                  : "如果对规则不满可以找john酱，规则可以酌情更改。"}
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            {language === "en" ? "Close" : "关闭"}
          </button>
        </div>
      </div>
    </div>
  );
}
