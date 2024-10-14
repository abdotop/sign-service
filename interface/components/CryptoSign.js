function CryptoSign({ setAlertMessage }) {
  const [file, setFile] = React.useState(null);
  const [walletConnected, setWalletConnected] = React.useState(false);
  const [signature, setSignature] = React.useState("");
  const [verificationResult, setVerificationResult] = React.useState("");
  const [documentHash, setDocumentHash] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  const handleConnectWallet = async () => {
    if (isSubmitting) {
      return;
    }
    if (walletConnected) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await connectWallet();
      console.log("client:",response);
      setWalletConnected(true);
    } catch (error) {
      setWalletConnected(false);
      setAlertMessage(error.message);
    }
    setIsSubmitting(false);
  };

  const handleSignDocument = async () => {
    if (isSubmitting) {
      return;
    }
    if (!walletConnected) {
      setAlertMessage("Please connect your wallet first.");
      return;
    }
    
    if (!file) {
      setAlertMessage("Please upload a document first.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await signDocument(file);
      console.log("client:",response);
      setSignature(response.signature);
      setDocumentHash(response.documentHash);
    } catch (error) {
      setAlertMessage(error.message);
    }
    setIsSubmitting(false);
  };

  const handlePublishDocument = async () => {
    if (!walletConnected) {
      setAlertMessage("Please connect your wallet first.");
      return;
    }
    if (!file) {
      setAlertMessage("Please upload a document first.");
      return;
    }
    if (!signature) {
      setAlertMessage("Please sign the document first.");
      return;
    }
    if (!documentHash) {
      setAlertMessage("Please sign the document first.");
      return;
    }
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await publishDocument(file, signature, documentHash);
      console.log("client:",response);
    } catch (error) {
      setAlertMessage(error.message);
    }
  };

  const verifyDocument = async () => {
    if (!file) {
      setAlertMessage("Please upload a document to verify.");
      return;
    }
    
    try {
      const response = await verifyDocument(file);
      console.log("client:",response);
      setVerificationResult(response.verificationResult);
    } catch (error) {
      setAlertMessage(error.message);
    }
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
            connectWallet={handleConnectWallet}
          />
          <DocumentActions
            file={file}
            signature={signature}
            signDocument={handleSignDocument}
            publishDocument={handlePublishDocument}
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
