export async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Demander la connexion à MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];

      // Envoyer l'adresse au serveur
      const response = await fetch("/connect-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();
      console.log("Connexion réussie:", data);

      // Écouter les changements de compte
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return address;
    } catch (error) {
      throw new Error("Erreur de connexion:", error.message);
    }
  } else {
    throw new Error("MetaMask n'est pas installé");
  }
}

async function getPublicKey() {
  const response = await fetch("/public-key");
  const data = await response.json();
  return data.publicKey;
}


function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log("Déconnecté de MetaMask");
  } else {
    console.log("Compte changé:", accounts[0]);
    // Informer le serveur du changement de compte
    fetch("/update-wallet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: accounts[0] }),
    });
  }
}

async function signDocument(file) {

  console.log("signDocument:");
  // Vérifier si MetaMask est installé
  if (typeof window.ethereum === "undefined") {
    throw new Error("MetaMask n'est pas installé");
  }

  try {
    // Demander l'accès au compte
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];

    // Lire le fichier et calculer son hash
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex =
      "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    // Demander à MetaMask de signer le hash
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [hashHex, address],
    });

    // Envoyer le hash et la signature au serveur
    const response = await fetch("/sign-document", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentHash: hashHex,
        signature: signature,
        address: address,
      }),
    });
    console.log("response:",response);
    const result = await response.json();
    if (result.success) {
      console.log("Document signé avec succès");
      return { documentHash: hashHex, signature: signature };
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Erreur lors de la signature:", error);
    throw error;
  }
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}

async function publishDocument(file, signature, documentHash) {

  try {
    const base64File = await fileToBase64(file);

    // Préparer les données à envoyer
    const data = {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileContent: base64File,
    };

    // console.log("data:",data);

    // Préparer la transaction côté serveur
    const response = await fetch("/prepare-transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentHash, signature }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la préparation de la transaction");
    }

    const { txObject } = await response.json();

    // Demander à l'utilisateur de signer la transaction
    const signedTx = await ethereum.request({
      method: "eth_sendTransaction",
      params: [txObject],
    });

    console.log("Transaction envoyée:", signedTx);

    // Attendre la confirmation de la transaction
    const receipt = await web3.eth.getTransactionReceipt(signedTx);

    console.log("Transaction confirmée:", receipt);

    return receipt;
  } catch (error) {
    console.error("Erreur lors de la publication:", error);
    throw error;
  }
}

async function verifyDocument(file) {
  const arrayBuffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex =
    "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  const response = await fetch("/verify-document", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ documentHash: hashHex }),
  });
  const data = await response.json();
  return data;
}