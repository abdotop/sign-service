const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  try {
    // Obtenir le ContractFactory pour le contrat "Storage"
    const Storage = await hre.ethers.getContractFactory("Storage");

    // Déployer le contrat
    console.log("Déploiement du contrat Storage...");
    const storage = await Storage.deploy();

    // Attendre que le déploiement soit terminé
    await storage.deployed();

    console.log("Contrat Storage déployé à l'adresse:", storage.address);

    // Enregistrer l'adresse du contrat dans un fichier
    const addressFile = path.join(__dirname, "..", "contract-address.txt");
    fs.writeFileSync(addressFile, storage.address);
    console.log("Adresse du contrat enregistrée dans:", addressFile);
  } catch (error) {
    console.error("Erreur lors du déploiement:", error);
    process.exit(1);
  }
}

// Exécuter la fonction principale
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
