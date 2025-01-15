// RegistrationTable.js
import React from "react";

const RegistrationTable = ({ requests, handleConfirm, handleDecline }) => {
  return (
    <table className="min-w-full bg-white border-collapse">
      <tbody className="divide-y divide-gray-200">
        {requests.map((request) => (
          <tr key={request._id} className="border rounded-lg bg-gray-50 shadow flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4">
            <td className="w-full sm:w-1/5 mb-2 sm:mb-0 text-sm text-gray-600 font-bold text-lg ">
              {request.name}
            </td>
            <td className="w-full sm:w-2/5 mb-2 sm:mb-0 text-sm text-gray-600 text-left">{request.email}</td>
            <td className="w-full sm:w-1/5 mb-2 sm:mb-0 text-sm text-gray-500">
              {request.status}
            </td>
            <td className="w-full sm:w-auto flex space-x-2">
            
                <button
                  onClick={() => handleConfirm(request._id)}
                  className={`w-24 py-2 rounded-lg shadow-md transition duration-200 ${
                    request.status === "Started"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "cursor-not-allowed bg-gray-400 text-gray-700"
                  }`}
                  disabled={request.status !== "Started"}
                >
                  {request.status === "Started" ? "Confirm" : "Confirmed"}
                </button>
                <button
                  onClick={() => handleDecline(request._id)}
                  className="bg-red-600 text-white p-1 sm:px-4 sm:py-2 rounded-lg shadow hover:bg-red-700 transition duration-200 w-10 sm:w-auto"
                >
                  X
                </button>
  
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RegistrationTable;
