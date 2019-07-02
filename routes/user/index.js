const express = require("express");
const router = express.Router();
const userController = require("../../controllers/todoController");

// Test route for Postman
router.route("/test").get((req, res) => res.json("TEST"));
router.route("/").get(userController.findAll);

router.route("/register").post(userController.create);

router
  .route("/:id")
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
