const express = require("express");
const router = express.Router();
const userController = require("../../controllers/todoController");

router
  .route("/")
  .get(res.send("WORKS"))
  .post(res.send("WORKS"));

router
  .route("/:id")
  .put(res.send("WORKS"))
  .delete(res.send("WORKS"));

module.exports = router;
