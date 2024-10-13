function CustomAlert({ message, onClose }) {
  return (
    <>
      {message && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm mx-auto">
            <p className="text-white mb-4">{message}</p>
            <button
              onClick={onClose}
              className="bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold py-2 px-4 rounded-full transition duration-300 w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomAlert;
