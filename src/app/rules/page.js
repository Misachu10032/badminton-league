"use client";

import { useState } from "react";

const RulesPage = () => {
  const [language, setLanguage] = useState("zh"); // Default language is English

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "zh" : "en"));
  };

  const handleNavigateToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-6">
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
            {language === "en" ? "I'm working on it" : "我还在肝"}
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-2">
            {language === "en" ? "Winning Team" : "获胜队伍"}
          </h2>
          <p className="text-lg">
            {language === "en" ? "Score calculation:" : "算分规则"}
          </p>
          <p className="bg-gray-50 border-l-4 border-indigo-500 px-4 py-2 rounded-md">
            {language === "en"
              ? "(200 - gamesWonAgainstTheLosingTeam * 10) * decisiveMultiplier * numberOfGamesPlayed"
              : "（基础分-杀熟分）x胜负系数x赢的局数"}
          </p>

          <div className="bg-gray-50 border-l-4 border-indigo-500 px-4 py-2 rounded-md space-y-3">
            <p className="text-base">
              {language === "en" ? "Details:" : "详细规则："}
            </p>
            <ul className="list-disc pl-5">
              <li>
                {language === "en"
                  ? "gamesWonAgainstTheLosingTeam is calculated for each player."
                  : "基础分100"}
              </li>
              <li>
                {language === "en"
                  ? "Example: If A and B win against C and D, A's value includes all wins against C and D."
                  : "杀熟分：赢过对手的次数。"}
              </li>
              <li>
                {language === "en"
                  ? "The decisiveMultiplier increases to 1.5 if the winning team's score is more than twice the losing team's, otherwise it's 1."
                  : "（基础分-杀熟分）的下线是50"}
              </li>
              <li>
                {language === "en"
                  ? "numberOfGamesPlayed: 1 for best of 1, 2 for best of 3, 3 for best of 5."
                  : "胜负系数： 若胜方分数是负方的两倍以上，胜负系数为1.5，否则为1。"}
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-200 mt-6 pb-2">
            {language === "en" ? "Losing Team" : "失败队伍"}
          </h2>
          <p className="text-lg">
            {language === "en" ? "Score calculation:" : "算分规则："}
          </p>
          <p className="bg-gray-50 border-l-4 border-red-500 px-4 py-2 rounded-md">
            {language === "en"
              ? "(hardworkScore + rankingDifferenceScore) * numberOfGamesPlayed"
              : "（拼搏分+挑战分）x比赛局数"}
          </p>
          <div className="bg-gray-50 border-l-4 border-red-500 px-4 py-2 rounded-md space-y-3">
            <p className="text-base">
              {language === "en" ? "Details:" : "详细规则："}
            </p>
            <ul className="list-disc pl-5">
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
              <li>
                {language === "en"
                  ? "numberOfGamesPlayed: 1 for best of 1, 2 for best of 3, 3 for best of 5."
                  : ""}
              </li>
            </ul>
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
    </div>
  );
};

export default RulesPage;
