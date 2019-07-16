const express = require("express");
const router = express.Router();
const Todo = require("../../models/ToDoItem");
const verifyToken = require("../../auth/verifyToken");
const checkToken = require("../../auth/checkToken");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return todos
    Todo.find({})
      .sort({ submitted_at: -1 })
      .then(todo => res.send(todo))
  );
});

router.get("/not-completed", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return not completed todos
    Todo.find({ completed: false })
      .sort({ submitted_at: -1 })
      .then(todos => res.json(todos))
      .catch(err => res.status(420).json(err))
  );
});

router.get("/completed", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return todos
    Todo.find({ completed: true })
      .sort({ submitted_at: -1 })
      .then(todos => res.send(todos))
      .catch(err => res.status(422).json(err))
  );
});

router.post("/", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Create todo
    Todo.create(req.body)
      .then(newTodo => res.json(newTodo))
      .catch(err => res.status(422).json(err))
  );
});

// Route for getting a particular todo
router.get("/todo/:todoID", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Get todo info
    Todo.findById({ _id: req.params.todoID })
      .then(todo => res.send(todo))
      .catch(err => res.json(err))
  );
});

// Get all todos by a particular author
router.get("/author/:userID", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return todos by author
    Todo.find({ author: req.params.userID })
      .sort({ submitted_at: -1 })
      .then(todos => res.send(todos))
      .catch(err => res.status(422).json(err))
  );
});

// Update/edit a todo
router.put("/todo/update/:todoID", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return updated todos
    Todo.findOneAndUpdate(
      { _id: req.params.todoID, author: req.body.user, completed: false },
      { title: req.body.title, description: req.body.description }
    )
      .then(updatedTodo => res.send(updatedTodo))
      .catch(err => res.json(err))
  );
});

// Mark a todo completed
router.put("/todo/complete/:todoID", verifyToken, (req, res) => {
  checkToken(
    req,
    res,
    // Return updated todos
    Todo.findOneAndUpdate(
      { _id: req.params.todoID, author: req.body.author, completed: false },
      { completed: true }
    )
      .then(completedTodo => res.send(completedTodo))
      .catch(err => res.json(err))
  );
});

// Route for deleing a todo
router.delete("/todo/delete/", (config, res) => {
  const authHeader = config.body.headers.Authorization;
  if (typeof authHeader !== "undefined") {
    const authBearer = authHeader.split(" ");
    const bearerToken = authBearer[1];
    // JWT.verify must be done here to account for config/data discrepency in router.delete
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.status(403).json({ message: "Invalid token / No token found" });
      } else {
        // Return deleted todos
        const { id, user } = config.body;
        Todo.findOneAndDelete({ _id: id, author: user })
          .then(deletedTodo => {
            res.status(200).json({ deletedTodo });
          })
          .catch(err => res.status(422).send(err));
      }
    });
  } else {
    res.status(403).json({ message: "No user login found" });
  }
});

module.exports = router;
