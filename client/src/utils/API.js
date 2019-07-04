import axios from "axios";

export default {
  getNotCompletedTodos: function() {
    return axios.get("/api/todos/not-completed");
  },
  getCompletedTodos: function() {
    return axios.get("/api/todos/completed");
  },
  getTodo: function(id) {
    return axios.get("/api/todos/" + id);
  },
  deleteTodo: function(id) {
    return axios.delete("/api/todos/" + id);
  },
  saveTodo: function(todoData) {
    return axios.post("/api/todos", todoData);
  },
  registerUser: function(newUserData) {
    return axios.post("/user/register-user", newUserData);
  },
  loginUser: function(userLoginData) {
    return axios.get("/user/login-user", userLoginData);
  }
};
