const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../auth/verifyToken");

// Test route for Postman / JWT
router.route("/test").get((req, res) => {
  const user = {
    id: 1,
    username: "zach",
    email: "zach@web.com"
  };
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token
    });
  });
});

// Test route for Postman / JWT
router.get("/testtoken", verifyToken, (req, res) => {
  res.json({
    message: "Success"
  });
});

// Why would you need to get all users?
/* router.route("/").get((req, res) =>
  User.find({})
    .then(users => res.send(users))
    .catch(err => console.log(err))
); */

router.route("/register-user").post(
  // Array object that contains the express-validator checks
  [
    check("username", "Username must be at least 5 characters").isLength({
      min: 5
    }),
    check("password").custom((value, { req, loc, path }) => {
      // Helpful code on StackOverflow for custom check in express-validator!
      if (value !== req.body.password2) {
        // Throw error if passwords do not match
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
      res.status(422).send({ error: errors });
    } else {
      // Object destructuring for DB vars
      const { username, email, password, photoURL } = req.body;
      // BCrypt password hashing
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
          throw err;
        }
        // Create User at DB
        User.create({ username, email, password: hash, photoURL })
          .then(newUser => res.json(newUser))
          .catch(err => res.status(422).json(err));
      });
    }
  }
);

router.route("/login-user").post((req, res) => {
  // Pull username and password out of request using object destructuring.
  const { username, password } = req.body;
  // Initially find user based on username alone.
  User.findOne({ username })
    .then(foundUser => {
      // If no user found, return error.
      if (!foundUser) {
        res.status(422).send("User not found");
      } else {
        // BCrypt compare function compares saved hash to input password.
        bcrypt
          .compare(password, foundUser.password)
          .then(result => {
            if (result === true) {
              res.send(foundUser);
            }
          })
          .catch(err => res.status(422).json(err));
      }
    })
    .catch(err => res.status(422).json(err));
});

/* router
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
  ); */

module.exports = router;
