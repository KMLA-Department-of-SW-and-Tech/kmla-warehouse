const admin = require("../config/firebase-config");

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer')) return res.status(401).send("Invalid header request regarding authorization");
    const token = authHeader.split(' ')[1];
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        console.log(decodedValue);
        // decodedValue checking
        return next();
    } catch(e) {
        console.log(e);
        return res.status(500).send("Internal error");
    }
};

module.exports = verifyJWT;