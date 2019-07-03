const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todoController");

router
  .route("/")
  .get(todoController.findAll)
  .post(todoController.create);

router.route("/not-completed").get(todoController.findNotComplete);

router.route("/completed").get(todoController.findCompleted);

router
  .route("/:id")
  .put(todoController.update)
  .delete(todoController.remove);

module.exports = router;
