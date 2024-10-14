const {Web3} = require("web3");
const fs = require("fs");
const path = require("path");

const web3 = new Web3();

// Chemin vers le fichier .env
const envPath = path.join(__dirname, "..", ".env");

// Fonction pour lire le fichier .env
function readEnvFile() {
  if (fs.existsSync(envPath)) {
    return fs.readFileSync(envPath, "utf8");
  }
  return "";
}

// Fonction pour écrire dans le fichier .env
function writeEnvFile(content) {
  fs.writeFileSync(envPath, content);
}

// Vérifier si une clé privée existe déjà
const envContent = readEnvFile();
if (!envContent.includes("PRIVATE_KEY=")) {
  // Générer une nouvelle clé privée
  const account = web3.eth.accounts.create();

  console.log("Nouvelle adresse générée:", account.address);
  console.log("Nouvelle clé privée générée:", account.privateKey);

  // Ajouter la nouvelle clé privée au fichier .env
  const newEnvContent = envContent + `\nPRIVATE_KEY=${account.privateKey}`;
  writeEnvFile(newEnvContent);

  console.log("La nouvelle clé privée a été ajoutée au fichier .env");
} 
