const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todoController");

router
  .route("/")
  .get(todoController.findAll)
  .post(todoController.create);

router
  .route("/:id")
  .put(todoController.update)
  .delete(todoController.remove);

module.exports = router;
