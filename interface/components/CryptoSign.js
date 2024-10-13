function CryptoSign({ setAlertMessage }) {
  const [file, setFile] = React.useState(null);
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [signature, setSignature] = React.useState("");
  const [verificationResult, setVerificationResult] = React.useState("");
  const [documentHash, setDocumentHash] = React.useState("");


  const connectWallet = async (setAlertMessage) => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletConnected(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      setAlertMessage("Please install MetaMask!");
    }
  };

  const signDocument = () => {
    if (!file) {
      setAlertMessage("Please upload a document first.");
      return;
    }
    setSignature(
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    );
  };

  const publishDocument = () => {
    if (!signature) {
      setAlertMessage("Please sign the document first.");
      return;
    }
    setAlertMessage("Document hash published to blockchain!");
  };

  const verifyDocument = () => {
    if (!file) {
      setAlertMessage("Please upload a document to verify.");
      return;
    }
    setVerificationResult("Document verified. Added on: 2023-05-01");
  };

  const retrieveDocument = () => {
    setAlertMessage("Document retrieved from database.");
  };

  const handleRetrieve = () => {
    if (documentHash.trim()) {
      retrieveDocument(documentHash);
    } else {
      setAlertMessage("Please enter a document hash");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-center mb-4 text-orange-500">
          CryptoSign
        </h1>
        <p className="text-xl text-center mb-12 text-gray-300">
          Secure document signing and verification on the blockchain
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <FileUpload
            file={file}
            setFile={setFile}
            walletConnected={walletConnected}
            connectWallet={connectWallet}
          />
          <DocumentActions
            file={file}
            signature={signature}
            signDocument={signDocument}
            publishDocument={publishDocument}
          />
          <VerifyRetrieve
            file={file}
            verificationResult={verificationResult}
            verifyDocument={verifyDocument}
            documentHash={documentHash}
            setDocumentHash={setDocumentHash}
            handleRetrieve={handleRetrieve}
          />
        </div>
      </div>
    </div>
  );
}

// ReactDOM.render(<CryptoSign />, document.getElementById("root"));
