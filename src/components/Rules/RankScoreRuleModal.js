import Modal from "react-modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

const RankScoreRule = ({ isOpen, onClose, language }) => {
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
      <div className="flex items-center justify-between border-b pb-3 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {language === "en" ? "RankScore Rule" : "积分细则"}
        </h2>
        <IconButton onClick={onClose} aria-label="Close" color="primary">
          <CloseIcon />
        </IconButton>
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
            <>
              {language === "en"
                ? "Example: If A and B win against C and D, A's value includes all wins against C and D."
                : "这个规则是希望可以有更多的人参与到这个积分赛里。"}
            </>
     
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
};

export default RankScoreRule;
