const crypto = require("crypto");
const fs = require("fs");

 function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  fs.writeFileSync("server_private_key.pem", privateKey);
  fs.writeFileSync("server_public_key.pem", publicKey);

  return { publicKey, privateKey };
}

module.exports = { generateKeyPair };
