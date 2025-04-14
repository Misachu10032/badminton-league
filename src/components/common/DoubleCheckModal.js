const DoubleCheckModal = ({ title, message, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-4 sm:mx-auto p-6 rounded-xl shadow-xl">
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
  );
};

export default DoubleCheckModal;
