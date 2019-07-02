const User = require("../models/User");

// Defining methods for the todo controller.
module.exports = {
  findAll: function(req, res) {
    User.find({}).then(users => res.send(users));
  },
  create: function(req, res) {
    User.create(req.body)
      /* .then(newUser => res.json(newUser)) */
      .then(newUser => console.log(newUser))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(updatedUser => res.json(updatedUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    User.findById({ _id: req.params.id })
      .then(deletedUser => deletedUser.remove())
      .then(deletedUser => res.json(deletedUser))
      .catch(err => res.status(422).json(err));
  }
};
