const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./user");

// API Routes
router.use("/api/todos", apiRoutes);

// User Routes
router.use("/user", userRoutes);

// Send React start point if no API routes are called.
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;
