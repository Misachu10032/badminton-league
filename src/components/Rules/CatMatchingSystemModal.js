import Image from "next/image";

export default function CatMatchingSystemModal({ isOpen, onClose, language }) {
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
            {language === "en"
              ? "How to Use the Matching System"
              : "如何用猫猫约架"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-700 text-sm">
          {/* Step-by-Step Guide */}
          <section>
            <div className="flex gap-10 justify-center items-start mb-6">
              {/* First Column */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {language === "en" ? "Battle Cat" : "这是战斗猫猫"}
                </h3>
                <Image
                  src="/images/home/UserNameRow/IWanaPlay.png"
                  alt="Battle Cat"
                  width={120}
                  height={120}
                  className="border rounded-md"
                />
              </div>

              {/* Second Column */}
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {language === "en" ? "Chill Cat" : "这是躺平猫猫"}
                </h3>
                <Image
                  src="/images/home/UserNameRow/IDonWanaPlay.png"
                  alt="Chill Cat"
                  width={120}
                  height={120}
                  className="border rounded-md"
                />
              </div>
            </div>

            <ul className="list-decimal pl-6 space-y-4">
              <li>
                {language === "en"
                  ? "Click them to toggle your match status. The battle cat means you want to play (join ranked games), and the chill cat means you want to rest."
                  : "点击它们，切换你的约架状态。战斗猫猫表示你想要约架(找人打积分赛)，躺平猫猫表示你想躺平。"}
              </li>
              <li>
                <div className="space-y-2">
                  <p>
                    {language === "en"
                      ? "Click the cat below to view the matches you've been assigned."
                      : "点击下面这个猫猫来查看被分配的比赛"}
                  </p>
                  <Image
                    src="/images/home/UserNameRow/ViewMatches.png"
                    alt="I Wanna Play"
                    width={120}
                    height={120}
                    className="border rounded-md"
                  />
                </div>
              </li>
            </ul>
          </section>

          {/* Notes */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {language === "en" ? "Important Notes" : "注意"}
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                {language === "en"
                  ? "You are not required to join the matches you're assigned. You can choose to skip them."
                  : "被分配到的比赛不是必须参加的，你可以选择不参加。"}
              </li>
              <li>
                {language === "en"
                  ? "Please assign teammates and opponents reasonably based on each player’s skill level."
                  : "请根据球友的实力合理安排队友和对手。"}
              </li>
              <li>
                {language === "en"
                  ? "If you can’t participate in ranked matches, be sure to update your status promptly."
                  : "如果不能参加积分赛，请及时调整你的状态。"}
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
