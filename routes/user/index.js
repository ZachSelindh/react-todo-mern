const express = require("express");
const router = express.Router();
const userController = require("../../controllers/todoController");

router.route("/").get((req, res) => res.json("GETUSer"));
/* .post((req, res) => res.send("POSTUser")); */

/* 
router
  .route("/:id")
  .put((req, res) => res.send("PUTUSer"))
  .delete((req, res) => res.send("DELETEUSer")); */

module.exports = router;
