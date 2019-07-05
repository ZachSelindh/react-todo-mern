const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// Test route for Postman
router.route("/test").get((req, res) => res.json("TEST"));

router.route("/").get((req, res) =>
  User.find({})
    .then(users => res.send(users))
    .catch(err => console.log(err))
);

router.route("/register-user").post(
  [
    check("username", "Username must be at least 5 characters").isLength({
      min: 5
    }),
    check("password").custom((value, { req, loc, path }) => {
      if (value !== req.body.password2) {
        // throw error if passwords do not match
        throw new Error("Passwords must match");
      } else {
        return value;
      }
    }),
    check("email", "Enter a valid email address").isEmail(),
    check("photoURL", "PhotoURL must be a valid URL").isURL()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      /* return res.status(422).json({ errors: errors.array() }); */
      res.status(422).send({ error: errors });
    } else {
      const { username, email, password, photoURL } = req.body;
      User.create({ username, email, password, photoURL })
        .then(newUser => res.json(newUser))
        .catch(err => res.status(422).json(err));
    }
  }
);

router.route("/login-user").post((req, res) => {
  // Pull username and password out of request using object destructuring.
  const { username, password } = req.body;
  User.find({ username: username, password: password })
    .then(foundUser => res.json(foundUser))
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
