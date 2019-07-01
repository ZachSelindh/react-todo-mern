const express = require("express");
const router = express.Router();
const userController = require("../../controllers/todoController");

router.route("/register").post(userController.create);

router
  .route("/:id")
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
