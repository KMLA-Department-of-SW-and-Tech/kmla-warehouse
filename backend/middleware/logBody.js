const logBody = async (req, res, next) => {
  console.log(req.body);
  next();
};

module.exports = logBody;
