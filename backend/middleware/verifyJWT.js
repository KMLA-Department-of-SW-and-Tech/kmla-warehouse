const admin = require("../config/firebase-config");

const verifyJWT = async (req, res, next) => {
    console.log("hi")
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer')) return res.status(401).send("Invalid header request regarding authorization");
    const token = authHeader.split(' ')[1];
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        console.log("hi")
        console.log(decodedValue);
        // decodedValue checking
        return next();
    } catch(e) {
        return res.status(500).send("Unkown internal error");
    }
};

module.exports = verifyJWT;