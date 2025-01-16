"use client";

const RulesPage = () => {
  const handleNavigateToLogin = () => {
    window.location.href = "/login"; // Adjust the path based on your app's routing structure
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Rules</h1>
      <div className="text-gray-700 space-y-4">
        <p>I'm working on it</p>
  
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleNavigateToLogin}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default RulesPage;
