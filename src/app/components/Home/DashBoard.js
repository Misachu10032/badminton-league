// components/Dashboard.js
export default function Dashboard({ user }) {
    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto mt-8 px-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard</h2>
                <p className="text-gray-600">
                    This is a protected page. Only authenticated users can access it.
                </p>
                {/* Display the requests */}
                <div>
                    <h3 className="font-semibold">Your Requests</h3>
                    <ul>
                        {user.requests?.length ? (
                            user.requests.map((request, index) => (
                                <li key={index} className="mb-2">{request}</li>
                            ))
                        ) : (
                            <p>No requests available</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
