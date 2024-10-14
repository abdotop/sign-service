const express = require("express");
const crypto = require("crypto");
const {Web3} = require("web3");
const session = require("express-session");
const fs = require("fs");
const { generateKeyPair } = require("./crypto");
require("dotenv").config();



const app = express();
const port = 3000;
const contractAbi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "getFileHash",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "setFileHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
let contractAddress = ""

try {
  contractAddress = fs.readFileSync("./contract-address.txt", "utf8");
} catch (error) {
  console.error("Erreur lors de la lecture du fichier:", error);
  process.exit(1);
}

if (!fs.existsSync("server_public_key.pem")) {
  generateKeyPair();
}

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("interface"));

// Initialiser Web3 avec un fournisseur Ethereum (par exemple, Infura)
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

app.get("/public-key", (req, res) => {
  if (!req.session.walletAddress) {
    return res.status(400).json({ success: false, message: "Aucun wallet connecté" });
  }
  const publicKey = fs.readFileSync("server_public_key.pem", "utf8");
  res.json({ publicKey });
});

app.post("/connect-wallet", (req, res) => {
  const { address } = req.body;
  console.log("server:",address);
  req.session.walletAddress = address;
  res.json({ success: true, message: "Wallet connecté avec succès" });
});

app.post("/prepare-transaction", async (req, res) => {
  if (!req.session.walletAddress) {
    return res
      .status(400)
      .json({ success: false, message: "Aucun wallet connecté" });
  }
  const { documentHash, signature } = req.body;

  try {
    // Vérifier la signature
    const recoveredAddress = web3.eth.accounts.recover(documentHash, signature);

    if (
      recoveredAddress.toLowerCase() !== req.session.walletAddress.toLowerCase()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Signature invalide" });
    }

    // Créer l'instance du contrat
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    // Préparer la transaction
    const data = contract.methods.setFileHash(documentHash).encodeABI();
    const nonce = await web3.eth.getTransactionCount(req.session.walletAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await contract.methods
      .setFileHash(documentHash)
      .estimateGas({ from: req.session.walletAddress });

    const txObject = {
      // nonce: web3.utils.toHex(nonce),
      // gasLimit: web3.utils.toHex(gasLimit),
      // gasPrice: web3.utils.toHex(gasPrice),
      to: contractAddress,
      data: data,
      from: req.session.walletAddress,
    };

    res.json({
      success: true,
      message: "Transaction préparée avec succès",
      txObject: txObject,
    });
  } catch (error) {
    console.error("Erreur lors de la préparation de la transaction:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la préparation de la transaction",
      });
  }
});

app.post("/verify-document", async (req, res) => {
 try {
   // hash the document
   const { documentHash } = req.body;
   console.log("documentHash:", documentHash);
   const hashBuffer = crypto.createHash("sha256").update(documentHash).digest();
   const serverCalculatedHash = "0x" + hashBuffer.toString("hex");

   // check if the hash is in the blockchain
   const contract = new web3.eth.Contract(contractAbi, contractAddress);
   const result = await contract.methods.getFileHash(serverCalculatedHash).call();
   console.log("result:", result);
   res.json({ success: true, message: "Document vérifié avec succès", result });
 } catch (error) {
  console.error("Erreur lors de la vérification du document:", error);
  res.status(500).json({ success: false, message: "Erreur lors de la vérification du document" });
 }
});

app.post("/update-wallet", (req, res) => {
  if (!req.session.walletAddress) {
    return res
      .status(400)
      .json({ success: false, message: "Aucun wallet connecté" });
  }
  const { address } = req.body;
  req.session.walletAddress = address;
  res.json({ success: true, message: "Adresse du wallet mise à jour" });
});

app.post("/sign-document", async (req, res) => {
  if (!req.session.walletAddress) {
    return res
      .status(400)
      .json({ success: false, message: "Aucun wallet connecté" });
  }
  const { documentHash, signature } = req.body;

  try {
    // Vérifier la signature
    const recoveredAddress = web3.eth.accounts.recover(documentHash, signature);

    if (recoveredAddress.toLowerCase() !== req.session.walletAddress.toLowerCase()) {
      return res
        .status(400)
        .json({ success: false, message: "Signature invalide" });
    }

    // // Stocker le document signé
    // signedDocuments.set(documentHash, {
    //   signature,
    //   address,
    //   timestamp: Date.now(),
    // });

    // Ici, vous pourriez également enregistrer la signature dans la blockchain si nécessaire

    res.json({
      success: true,
      message: "Document signé et enregistré avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la vérification de la signature:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de la vérification de la signature",
      });
  }
});

app.post("/publish-document", async (req, res) => {
  if (!req.session.walletAddress) {
    return res
      .status(400)
      .json({ success: false, message: "Aucun wallet connecté" });
  }
  const { data, signature, documentHash } = req.body;

  console.log("data:", data);
  console.log("signature:", signature);
  console.log("documentHash:", documentHash);
  console.log("req.session.walletAddress:", req.session.walletAddress);

  try {
    // Vérifier la signature
    const recoveredAddress = web3.eth.accounts.recover(documentHash, signature);

    if (
      recoveredAddress.toLowerCase() !== req.session.walletAddress.toLowerCase()
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Signature invalide" });
    }

    const { fileName, fileType, fileSize, fileContent } = data;

    // Décoder le contenu base64
    const fileBuffer = Buffer.from(fileContent, "base64");

    // Calculer le hash du fichier côté serveur
    const hashBuffer = crypto.createHash("sha256").update(fileBuffer).digest();
    const serverCalculatedHash = "0x" + hashBuffer.toString("hex");

    // Vérifier si le hash calculé correspond au hash envoyé par le client
    if (serverCalculatedHash !== documentHash) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Le hash du document ne correspond pas au contenu",
        });
    }

    // Si tout est valide, procéder à l'enregistrement sur la blockchain
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    const result = await contract.methods.setFileHash(documentHash).send({
      from: req.session.walletAddress,
      gas: 1000000,
    });

    console.log("Résultat de la transaction:", result);

    res.json({
      success: true,
      message: "Document enregistré avec succès",
      transactionHash: result.transactionHash,
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du document:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur lors de l'enregistrement du document",
      });
  }
});




app.listen(port, () => {
  console.log(`CryptoSign server is running on port ${port}`);
});
