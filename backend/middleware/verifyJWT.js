const admin = require("../config/firebase-config");

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader.split());
    if(!authHeader?.startsWith('Bearer') || authHeader.split(' ').length !== 2) return res.status(401).send("Invalid header request regarding authorization");
    const token = authHeader.split(' ')[1];
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        req.firebaseUid = decodedValue.user_id;
        return next();
    } catch(e) {
        console.log("JWT validation error: ", e.errorInfo.message);
        return res.status(401).send("Invalid token use regarding authentication");
    }
};

module.exports = verifyJWT;