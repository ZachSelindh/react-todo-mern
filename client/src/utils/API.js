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
  saveTodo: function(todoData) {
    return axios.post(
      "/api/todos",
      { headers: { Authorization: "Bearer " + localStorage.getItem("token") } },
      todoData
    );
  },
  registerUser: function(newUserData) {
    return axios.post("/users/register-user", newUserData);
  },
  loginUser: function(userLoginData) {
    return axios.post("/users/login-user", userLoginData);
  }
};
