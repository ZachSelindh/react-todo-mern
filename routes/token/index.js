const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../../auth/verifyToken");
require("dotenv").config();

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      res.status(200).json({ message: "Token accepted" });
    }
  });
});

module.exports = router;
