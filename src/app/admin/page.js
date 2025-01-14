"use client";
import { useState, useEffect } from 'react';

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch('/api/get-all-register-requests');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Failed to fetch requests:', error);
      }
    }
    fetchRequests();
  }, []);

  // Functions to handle confirm and decline actions
  const handleConfirm = async (id) => {
    console.log(id)
    try {
   
      await fetch(`/api/confirm-register-request/${id}`, { method: 'POST' });
      
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Failed to confirm request:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await fetch(`/api/decline-register-request?id=${id}`, { method: 'POST' });
      setRequests(requests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Failed to decline request:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Registration Requests</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.status}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                  onClick={() => handleConfirm(request._id)} 
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Confirm
                </button>
                <button 
                  onClick={() => handleDecline(request._id)} 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Requests;