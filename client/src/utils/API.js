import axios from "axios";

export default {
  getNotCompletedTodos: function(token) {
    return axios.get("/api/todos/not-completed", {
      headers: { Authorization: "Bearer " + token }
    });
  },
  getCompletedTodos: function(token) {
    return axios.get("/api/todos/completed", {
      headers: { Authorization: "Bearer " + token }
    });
  },
  getTodo: function(id, token) {
    return axios.get("/api/todos/" + id, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  deleteTodo: function(id, token) {
    return axios.delete("/api/todos/" + id, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  saveTodo: function(todoData, token) {
    return axios.post("/api/todos", todoData, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  registerUser: function(newUserData) {
    return axios.post("/users/register-user", newUserData);
  },
  loginUser: function(userLoginData) {
    return axios.post("/users/login-user", userLoginData);
  },
  getUsername: function(userID) {
    return axios.get("/users/get-username/" + userID);
  },
  getUserProfile: function(userID, token) {
    return axios.get("users/userprofile/" + userID, {
      headers: { Authorization: "Bearer " + token }
    });
  }
};
