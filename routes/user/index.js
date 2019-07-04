const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// Test route for Postman
router.route("/test").get((req, res) => res.json("TEST"));

router.route("/").get((req, res) =>
  User.find({})
    .then(users => res.send(users))
    .catch(err => console.log(err))
);

router.route("/register-user").post((req, res) =>
  User.create(req.body)
    .then(newUser => res.json(newUser))
    .catch(err => res.status(422).json(err))
);

router.route("/login-user").get((req, res) => {
  console.log(req);
  const { loginUsername, loginPassword } = req.params;
  console.log(loginPassword, loginUsername);
  User.find({ username: loginUsername, password: loginPassword })
    /* .then(foundUser => res.json(foundUser)) */
    .then(foundUser => console.log(foundUser))
    .catch(err => res.status(422).json(err));
});

router
  .route("/:id")
  .put((req, res) =>
    User.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(updatedUser => res.json(updatedUser))
      .catch(err => res.status(422).json(err))
  )
  .delete((req, res) =>
    Todo.findById({ _id: req.params.id })
      .then(deletedTodo => deletedTodo.remove())
      .then(deletedTodo => res.json(deletedTodo))
      .catch(err => res.status(422).json(err))
  );

module.exports = router;
