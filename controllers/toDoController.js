const Todo = require("../models/ToDoItem");

// Defining methods for the todo controller.
module.exports = {
  findAll: function(req, res) {
    Todo.find({})
      .sort({ submitted_at: -1 })
      .then(todo => res.send(todo));
  },
  findNotComplete: function(req, res) {
    Todo.find({ completed: false })
      .sort({ submitted_at: -1 })
      .then(todo => res.send(todo));
  },
  findCompleted: function(req, res) {
    Todo.find({ completed: true })
      .sort({ submitted_at: -1 })
      .then(todo => res.send(todo));
  },
  create: function(req, res) {
    Todo.create(req.body)
      .then(newTodo => res.json(newTodo))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    Todo.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(updatedTodo => res.json(updatedTodo))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    Todo.findById({ _id: req.params.id })
      .then(deletedTodo => deletedTodo.remove())
      .then(deletedTodo => res.json(deletedTodo))
      .catch(err => res.status(422).json(err));
  }
};
