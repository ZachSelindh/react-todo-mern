import axios from "axios";

export default {
  getNotCompletedTodos: function() {
    return axios.get("/api/todos/not-completed", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
  },
  getCompletedTodos: function() {
    return axios.get("/api/todos/completed", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
  },
  getTodo: function(id) {
    return axios.get("/api/todos/" + id, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
  },
  deleteTodo: function(id) {
    return axios.delete("/api/todos/" + id, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
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
