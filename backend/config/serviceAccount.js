require("dotenv").config(); // Load environment variables from .env

module.exports = {
    serviceAccount: {
        type: "service_account",
        project_id: "dswt-sharable-auth",
        private_key_id: process.env.MY_FIREBASE_PRIVATE_KEY_ID,
        private_key: `-----BEGIN PRIVATE KEY-----\n${process.env.NODE_ENV ? (process.env.MY_FIREBASE_PRIVATE_KEY ? JSON.parse(process.env.MY_FIREBASE_PRIVATE_KEY) : undefined) : process.env.MY_FIREBASE_PRIVATE_KEY}-----END PRIVATE KEY-----\n`,
        client_email:
            "firebase-adminsdk-fbsvc@dswt-sharable-auth.iam.gserviceaccount.com",
        client_id: "108673781990081178998",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40dswt-sharable-auth.iam.gserviceaccount.com",
        universe_domain: "googleapis.com",
    },
};
