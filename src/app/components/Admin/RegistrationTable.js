// RegistrationTable.js
import React from "react";

const RegistrationTable = ({ requests, handleConfirm, handleDecline }) => {
  return (
    <table className="min-w-full bg-white border-collapse">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
            Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
            Email
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
            Status
          </th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {requests.map((request) => (
          <tr key={request._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              {request.name}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">
              {request.email}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500">
              {request.status}
            </td>
            <td className="px-6 py-4 text-sm">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleConfirm(request._id)}
                  className={`w-24 py-2 rounded-lg shadow-md transition duration-200 ${
                    request.status === "Pending"
                      ? "cursor-not-allowed bg-gray-400 text-gray-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  disabled={request.status === "Pending"}
                >
                  {request.status === "Pending" ? "Confirmed" : "Confirm"}
                </button>
                <button
                  onClick={() => handleDecline(request._id)}
                 className="bg-red-600 text-white p-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-red-700 transition duration-200 w-full sm:w-auto"
                >
                  X
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RegistrationTable;