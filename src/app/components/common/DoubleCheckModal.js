import React from 'react';
import { Modal } from '@mui/material';

const DoubleCheckModal = ({  title, message, isOpen, onClose, onConfirm, }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8">
        <div className="bg-white p-10 w-[400px] rounded-xl shadow-xl">
          <h3 className="text-lg font-bold mb-4">{title}</h3>
          <p>{message}</p>
          <div className="flex justify-end mt-6">
          <button
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DoubleCheckModal;