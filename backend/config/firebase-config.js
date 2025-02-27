const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccount").serviceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;