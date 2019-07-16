const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./user");
const tokenRoutes = require("./token");

// API Routes
router.use("/api/todos", apiRoutes);

// Token Check route
router.use("/check-token", tokenRoutes);

// User Routes
router.use("/users", userRoutes);

// Send React start point if no routes are called.
router.use(function(req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "../client/build/index.html"
      /* (__dirname, "../client/public/index.html") */
    )
  );
});

module.exports = router;
