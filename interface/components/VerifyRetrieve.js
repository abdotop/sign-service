function VerifyRetrieve({
  file,
  verificationResult,
  verifyDocument,
  documentHash,
  setDocumentHash,
  handleRetrieve,
}) {

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-orange-500/20 transition duration-300 md:col-span-2">
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">
        <i className="fas fa-search mr-2"></i>Verify & Retrieve
      </h2>
      <div className="flex gap-4 mb-4 items-end">
        <button
          onClick={verifyDocument}
          className="bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold px-4 rounded-full transition duration-300 w-1/4 h-10"
        >
          Verify
        </button>
        <div className="flex-grow">
          <label
            htmlFor="documentHash"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Document Hash
          </label>
          <div className="flex">
            <input
              type="text"
              id="documentHash"
              value={documentHash}
              onChange={(e) => setDocumentHash(e.target.value)}
              placeholder="Enter document hash"
              className="flex-grow bg-gray-700 text-white rounded-l-lg border-gray-600 focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
            />
            <button
              onClick={handleRetrieve}
              className="bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold px-4 rounded-r-lg transition duration-300"
            >
              Retrieve
            </button>
          </div>
        </div>
      </div>
        <div className="bg-gray-700 rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-orange-500 font-semibold select-none">
              Verification Result:
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(verificationResult)}
              className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
              title="Copy verification result"
            >
              <i className="fas fa-copy"></i>
            </button>
          </div>
          <p className="text-sm text-gray-300 break-all">
            {verificationResult}
          </p>
        </div>
    </div>
  );
}
