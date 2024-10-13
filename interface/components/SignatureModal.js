function SignatureModal({ signature, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">
          Document Signature
        </h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-4 overflow-x-auto">
          <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
            {signature}
          </pre>
        </div>
        <button
          onClick={onClose}
          className="bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold py-2 px-4 rounded-full transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
