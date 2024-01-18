const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ success: 0, message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: 0, message: "Unauthorized: Invalid token" });
  }

  jwt.verify(token, process.env.secretkey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({
          success: 0,
          message: `Unauthorized: Invalid token. ${err.message}`,
        });
    }
    req.userId = decoded.userId;
    next();
  });
};

module.exports = authenticate;
