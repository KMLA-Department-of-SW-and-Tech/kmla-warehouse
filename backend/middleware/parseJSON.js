const parseJSON = async (req, res, next) => {
  try {
    req.body = JSON.parse(req.body);
    return next();
  } catch (e) {
    res.status(400).json({ error: "Invalid JSON format" });
  }
};

module.exports = parseJSON;
