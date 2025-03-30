"use client";

import { useState } from "react";
import RankScoreRuleModal from "../../components/Rules/RankScoreRuleModal";
import RecordMatchRulesModal from "../../components/Rules/RecordMatchRuleModal";

const RulesPage = () => {
  const [language, setLanguage] = useState("zh"); // Default language is Chinese
  const [isRankScoreModalOpen, setRankScoreModalOpen] = useState(false);
  const [isRecordMatchModalOpen, setRecordMatchModalOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "zh" : "en"));
  };

  const handleNavigateToLogin = () => {
    window.location.href = "/login";
  };

  const openRankScoreModal = () => {
    setRankScoreModalOpen(true);
  };

  const closeRankScoreModal = () => {
    setRankScoreModalOpen(false);
  };

  const openRecordMatchModal = () => {
    setRecordMatchModalOpen(true);
  };

  const closeRecordMatchModal = () => {
    setRecordMatchModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-600">
            {language === "en" ? "Rules" : "规则"}
          </h1>
          <button
            onClick={toggleLanguage}
            className="px-3 sm:px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            {language === "en" ? "中文" : "English"}
          </button>
        </div>

        {/* Rules Content */}
        <div className="text-gray-700 space-y-5 text-sm sm:text-base">
          {language === "zh" ? (
            <>
              <p className="text-center font-medium">
                本积分赛旨在促进成员之间球局的竞技性，并鼓励大家与不同的对手对战，提升技术水平。请阅读以下规则：
              </p>
              
              <h2 className="text-lg sm:text-xl font-bold mt-4">1. 记录比赛</h2>
              <ul className="list-disc list-inside">
                <li>每天可选择1-3场比赛作为积分赛。记录比分冲排名积分。每场比赛最多包含五场对局。</li>
                <li>每场比赛需由所有参赛选手同意后记录积分。</li>
              </ul>

              <h2 className="text-lg sm:text-xl font-bold mt-4">2. 计分规则</h2>
              <ul className="list-disc list-inside">
                <li>每场获胜可获得相应积分，积分多少取决于对手实力和历史对战情况。</li>
                <li>若与相同对手频繁比赛，所获积分将逐渐减少，以鼓励更多不同的对战组合。</li>
              </ul>

              <h2 className="text-lg sm:text-xl font-bold mt-4">3. 排名系统</h2>
              <ul className="list-disc list-inside">
                <li>排名根据累计积分计算，定期更新排行榜。</li>
                <li>鼓励挑战更强的对手，赢得更高积分！</li>
              </ul>

              <h2 className="text-lg sm:text-xl font-bold mt-4">4. 公平竞技</h2>
              <ul className="list-disc list-inside">
                <li>诚信记录比赛结果，杜绝虚假比赛，恶意刷分。</li>
                <li>尊重对手，保持体育精神。</li>
              </ul>

              <p className="mt-4 text-center font-medium">让我们一起享受竞技乐趣，提高羽毛球水平！🎉🏸</p>
            </>
          ) : (
            <p className="text-center font-medium">I'm working on the English version.</p>
          )}
        </div>

        {/* Buttons for Additional Rules */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
          <button
            onClick={openRankScoreModal}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
          >
            {language === "en" ? "RankScore Rule" : "积分细则"}
          </button>
          <button
            onClick={openRecordMatchModal}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
          >
            {language === "en" ? "How To Record a Game" : "如何记录比赛"}
          </button>
        </div>

        {/* Button to Go Back to Login */}
        <div className="text-center mt-6">
          <button
            onClick={handleNavigateToLogin}
            className="w-full sm:w-auto px-6 py-3 text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {language === "en" ? "Go to Login" : "前往登录"}
          </button>
        </div>
      </div>

      {/* RankScore Modal */}
      <RankScoreRuleModal
        isOpen={isRankScoreModalOpen}
        onClose={closeRankScoreModal}
        language={language}
      />

      {/* Record Match Modal */}
      <RecordMatchRulesModal
        isOpen={isRecordMatchModalOpen}
        onClose={closeRecordMatchModal}
        language={language}
      />
    </div>
  );
};

export default RulesPage;
