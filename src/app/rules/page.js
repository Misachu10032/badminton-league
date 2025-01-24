"use client";

import { useState } from "react";

import RankScoreRuleModal from "../../components/Rules/RankScoreRuleModal";
import Modal from "react-modal";
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
    <div className="h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full sm:w-full lg:w-1/2 bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-indigo-600">
            {language === "en" ? "Rules" : "规则"}
          </h1>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            {language === "en" ? "中文" : "English"}
          </button>
        </div>

        <div className="text-gray-700 space-y-5">
          <p className="text-lg font-medium text-center">
            {language === "en" ? "I'm working on it" : "我还在肝这个页面"}
          </p>
          <p className="text-lg font-medium text-center">
            {language === "en" ? "I'm working on it" : "这是个做出来玩玩的APP,冲排名得称号。大家开心就好"}
          </p>
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={openRankScoreModal}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {language === "en" ? "RankScore Rule" : "排名分数规则"}
            </button>
            <button
              onClick={openRecordMatchModal}
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {language === "en" ? "How To Record a Game" : "如何记录比赛"}
            </button>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleNavigateToLogin}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

      <RecordMatchRulesModal
        isOpen={isRecordMatchModalOpen}
        onClose={closeRecordMatchModal}
        language={language}
      />


    </div>
  );
};

export default RulesPage;
