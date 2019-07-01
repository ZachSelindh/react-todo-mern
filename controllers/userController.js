const db = require("../models");

// Defining methods for the todo controller.
module.exports = {
  create: function(req, res) {
    db.User.create(req.body)
      .then(newUser => res.json(newUser))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(updatedUser => res.json(updatedUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.findById({ _id: req.params.id })
      .then(deletedUser => deletedUser.remove())
      .then(deletedUser => res.json(deletedUser))
      .catch(err => res.status(422).json(err));
  }
};
