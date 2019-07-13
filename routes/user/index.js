const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../../auth/verifyToken");
require("dotenv").config();

// User registration page
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
    // Custom method that checks the validator errors.
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
          .then(newUser => res.json({ newUser, message: "User created!" }))
          .catch(err => res.status(422).json(err));
      });
    }
  }
);

// User login page
router.route("/login-user").post((req, res) => {
  // Pull username and password out of request using object destructuring.
  const { username, password } = req.body;
  // Initially find user based on username alone.
  User.findOne({ username })
    .then(foundUser => {
      // If no user found, return error.
      if (!foundUser) {
        res.status(422).json({ errorMessage: "No user found" });
      } else {
        // BCrypt compare function compares saved hash to input password.
        bcrypt
          .compare(password, foundUser.password)
          .then(result => {
            if (result === true) {
              // Issue a JWT
              jwt.sign(
                { foundUser },
                process.env.SECRET_KEY,
                { expiresIn: "600s" },
                (err, token) => {
                  res.json({ token, foundUser, redirectURL: "/" });
                }
              );
            }
          })
          .catch(err => res.json({ err }));
      }
    })
    .catch(err => res.status(422).json(err));
});

// API route for getting username for Todo component.
router.route("/get-username/:userID").get((req, res) => {
  const { userID } = req.params;
  User.findOne({ _id: userID })
    .then(user => {
      const { username } = user;
      res.send(username);
    })
    .catch(err => res.status(422).json({ err }));
});

router.route("/profile/:userID").get((req, res) => {
  const { userID } = req.params;
  User.findOne({ _id: userID })
    .then(user => {
      const { username, photoURL, todos, email } = user;
      res.json({ username, photoURL, todos, email });
    })
    .catch(err => res.status(422).json({ msg: "User not found" }));
});

module.exports = router;
