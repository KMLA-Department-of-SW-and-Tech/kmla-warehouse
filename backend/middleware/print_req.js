const printReq = (req, res, next) => {
    return res.send(req);
}

module.exports = printReq;