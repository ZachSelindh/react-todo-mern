const express = require("express");
const router = express.Router();
const todoController = require("../../controllers/todoController");
const Todo = require("../../models/ToDoItem");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../auth/verifyToken");
require("dotenv").config();

router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      // Return todos
      Todo.create(req.body)
        .then(newTodo => res.json(newTodo))
        .catch(err => res.status(422).json(err));
    }
  });
});

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      // Return todos
      Todo.find({})
        .sort({ submitted_at: -1 })
        .then(todo => res.send(todo));
    }
  });
});

router.get("/not-completed", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      // Return todos
      Todo.find({ completed: false })
        .sort({ submitted_at: -1 })
        .then(todo => res.send(todo));
    }
  });
});

router.get("/completed", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      // Return todos
      Todo.find({ completed: true })
        .sort({ submitted_at: -1 })
        .then(todo => res.send(todo));
    }
  });
});

router
  .route("/:id")
  .put(todoController.update)
  .delete(todoController.remove);

module.exports = router;
