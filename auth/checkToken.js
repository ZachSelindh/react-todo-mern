const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkToken(req, processFunc) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      processFunc;
    }
  });
}

module.exports = checkToken;
