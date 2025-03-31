import Modal from "react-modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function RecordMatchRulesModal({ isOpen, onClose, language }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          width: "90%",
          maxWidth: "800px",
          height: "90%",
          maxHeight: "600px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        },
      }}
      ariaHideApp={false}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === "en" ? "Match Recording Rules" : "如何记录比赛"}
        </h2>
        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
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
          className="px-6 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition-all"
        >
          {language === "en" ? "Close" : "关闭"}
        </button>
      </div>
    </Modal>
  );
}
