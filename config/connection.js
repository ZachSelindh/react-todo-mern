const mongoose = require("mongoose");

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/reactToDoList";

var connection = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

module.exports = connection;
