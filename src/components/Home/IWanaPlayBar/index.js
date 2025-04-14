import React, { useState, useEffect } from "react";
import DoubleCheckModal from "../../common/DoubleCheckModal";
import AssignedMatchesModal from "./ViewAssignedMatchesModal";

const UserNameRow = ({ user }) => {
  const [iWanaPlay, setIWanaPlay] = useState(user?.IWanaPlay ?? false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [showMatchesModal, setShowMatchesModal] = useState(false);
  const [matches, setMatches] = useState({ date: null, groups: [] });

  useEffect(() => {
    setIWanaPlay(user?.IWanaPlay ?? false);
  }, [user]);

  const handleToggle = () => {
    setShowConfirmModal(true);
  };

  const confirmToggle = async () => {
    setShowConfirmModal(false);
    setLoading(true);
    try {
      const res = await fetch("/api/update-I-wana-play", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user._id }),
      });

      const data = await res.json();

      if (res.ok) {
        setIWanaPlay(data.IWanaPlay);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Failed to toggle IWanaPlay:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMatches = async () => {
    try {
      const res = await fetch(`/api/get-assigned-matches?userId=${user._id}`);
      const data = await res.json();

      setMatches({
        date: data.date ?? null,
        groups: data.groups ?? [],
      });

      setShowMatchesModal(true);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="flex items-center justify-between w-full p-2">
        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleToggle}
            disabled={loading}
            aria-label="Toggle IWanaPlay"
          >
            <img
              src={
                iWanaPlay
                  ? "/images/home/UserNameRow/IWanaPlay.png"
                  : "/images/home/UserNameRow/IDonWanaPlay.png"
              }
              alt={iWanaPlay ? "Switch On" : "Switch Off"}
              className="w-14 h-16"
            />
          </button>

          {iWanaPlay && (
            <button
              onClick={handleViewMatches}
              disabled={loading}
              aria-label="View Matches"
            >
              <img
                src="/images/home/UserNameRow/ViewMatches.png"
                alt="View Matches"
                className="w-14 h-16"
              />
            </button>
          )}
        </div>
      </div>

      <DoubleCheckModal
        title={`${
          iWanaPlay ? "Do you want to lie down" : "Do you want to play"
        }?`}
        message={`${
          iWanaPlay
            ? "The matches asigned to you will be canceled."
            : "I want matches to be asigned to me. Match list will be generated at 9am each day. Please sign up for matches a day before."
        }`}
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmToggle}
      />

      <AssignedMatchesModal
        isOpen={showMatchesModal}
        onClose={() => setShowMatchesModal(false)}
        groups={matches.groups}
        date={matches.date}
      />
    </>
  );
};

export default UserNameRow;
