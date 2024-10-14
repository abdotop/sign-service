function FileUpload({ file, setFile, walletConnected, connectWallet }) {
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-orange-500/20 transition duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">
        <i className="fas fa-file-upload mr-2"></i>Upload Document & Connect
        Wallet
      </h2>
      <div className="mb-4">
        <label
          className="block text-sm font-medium text-gray-400 mb-2"
          htmlFor="file-upload"
        >
          Choose file
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-400
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-orange-500 file:text-gray-900
                    hover:file:bg-orange-600"
        />
      </div>
      <button
        onClick={connectWallet}
        disabled={walletConnected}
        className="w-full bg-orange-500 hover:bg-orange-600 text-gray-900 font-bold py-2 px-4 rounded-full transition duration-300"
      >
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </div>
  );
}
