const db = require("../models");

// Defining methods for the todo controller.
module.exports = {
  findAll: function(req, res) {
    db.Todo.find({}).then(todo => res.send(todo));
  },
  create: function(req, res) {
    db.Todo.create(req.body)
      .then(newTodo => res.json(newTodo))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Todo.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(updatedTodo => res.json(updatedTodo))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Todo.findById({ _id: req.params.id })
      .then(deletedTodo => deletedTodo.remove())
      .then(deletedTodo => res.json(deletedTodo))
      .catch(err => res.status(422).json(err));
  }
};
