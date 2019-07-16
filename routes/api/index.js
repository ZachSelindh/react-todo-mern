const express = require("express");
const router = express.Router();
const Todo = require("../../models/ToDoItem");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../auth/verifyToken");
require("dotenv").config();

router.post("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      // Create todo
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

// Route for getting a particular todo
router.get("/todo/:todoID", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      // Get todo info
      const { todoID } = req.params;
      Todo.findById({ _id: todoID })
        .then(todo => res.send(todo))
        .catch(err => res.json(err));
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
        .then(todos => res.json(todos))
        .catch(err => res.status(420).json(err));
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
        .then(todos => res.send(todos))
        .catch(err => res.status(422).json(err));
    }
  });
});

router.get("/author/:userID", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      // Return todos
      const { userID } = req.params;
      Todo.find({ author: userID })
        .sort({ submitted_at: -1 })
        .then(todos => res.send(todos))
        .catch(err => res.status(422).json(err));
    }
  });
});

// Update/edit a todo
router.put("/todo/update/:todoID", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({ message: "Invalid token / No token found" });
    } else {
      // Return todos
      const { todoID } = req.params;
      const { user } = req.body;
      Todo.findOneAndUpdate(
        { _id: todoID, author: user },
        { title: req.body.title, description: req.body.description }
      )
        .then(updatedTodo => res.send(updatedTodo))
        .catch(err => res.json(err));
    }
  });
});

// Route for deleing a todo
router.delete("/todo/delete/", (config, res) => {
  const authHeader = config.body.headers.Authorization;
  if (typeof authHeader !== "undefined") {
    const authBearer = authHeader.split(" ");
    const bearerToken = authBearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, authData) => {
      if (err) {
        res.status(403).json({ message: "Invalid token / No token found" });
      } else {
        // Return deleted todos
        const { id, user } = config.body;
        Todo.findOneAndDelete({ _id: id, author: user })
          .then(deletedTodo => res.status(200).json(deletedTodo))
          .catch(err => res.status(422).send(err));
      }
    });
  } else {
    res.status(403).json({ message: "No user login found" });
  }
});

module.exports = router;
