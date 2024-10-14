# Service de Signature de Documents sur Blockchain

Ce projet permet aux utilisateurs de signer des documents et de stocker leur hash sur la blockchain Linea Sepolia.

## Prérequis

- Node.js (v14 ou supérieur)
- MetaMask installé dans votre navigateur
- Un compte Ethereum avec des ETH de test sur le réseau Linea Sepolia
- Hardhat

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/abdotop/sign-service.git
   cd sign-service
   ```

2. Installez les dépendances :
   ```
   npm install
   ```

3. Configurez les variables d'environnement :
   Créez un fichier `.env` à la racine du projet et ajoutez :
   ```
   PORT=port
   SESSION_SECRET=secret
   INFURA_URL=infura_url // example: https://sepolia.infura.io/v3/c086ae67cc964597a9f76d0628321625
   ```

## Compilation et Déploiement du Contrat

1. Compilez le contrat :
   ```
   npx hardhat compile
   ```

2. Déployez le contrat sur Linea Sepolia :
   ```
   npm run deploy
   ```
   

3. 

## Configuration de MetaMask

1. Ouvrez MetaMask et ajoutez le réseau Linea Sepolia :
   - Nom du réseau : Linea Sepolia
   - URL RPC : https://linea-sepolia.infura.io/v3/votre_id_de_projet_infura
   - ID de chaîne : 59141
   - Symbole : ETH
   - URL de l'explorateur : https://sepolia.lineascan.build/

2. Obtenez des ETH de test :
   - Rejoignez le [Discord officiel de Linea](https://discord.gg/linea) et demandez des jetons dans le canal approprié.
   - Ou utilisez le [pont Linea](https://bridge.linea.build/) pour transférer des ETH depuis Goerli.

## Utilisation

1. Démarrez le serveur de développement :
   ```
   npm run server
   ```
   ou si vous n'avez pas deploy le contrat :
   ```
   npm run start
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

3. Connectez MetaMask au site et assurez-vous d'être sur le réseau Linea Sepolia.

4. Sélectionnez un fichier à signer.

5. Cliquez sur "Signer et Publier" pour calculer le hash du fichier et le stocker sur la blockchain.

6. Confirmez la transaction dans MetaMask.

7. Une fois la transaction confirmée, le hash du document sera stocké sur la blockchain Linea Sepolia.


## Dépannage

- Si vous rencontrez des problèmes pour obtenir des ETH de test, vérifiez les annonces récentes sur le [Twitter de Abdou TOP](https://x.com/abdoutop_dev) ou demandez de l'aide sur leur Discord.
- Assurez-vous que MetaMask est connecté au bon réseau (Linea Sepolia) avant d'interagir avec l'application.
- Si une transaction échoue, vérifiez que vous avez suffisamment d'ETH pour couvrir les frais de gas.

## Contribution

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request pour toute amélioration ou correction de bug.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.