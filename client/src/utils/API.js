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
  getTodo: function(todoID, token) {
    return axios.get("/api/todos/todo/" + todoID, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  getAuthoredTodos: function(userID, token) {
    return axios.get("/api/todos/author/" + userID, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  saveTodo: function(todoData, token) {
    return axios.post("/api/todos", todoData, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  completeTodo: function(compTodoID, compTodoData, token) {
    return axios.put("/api/todos/todo/complete/" + compTodoID, compTodoData, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  updateTodo: function(updateTodoID, newTodoData, token) {
    return axios.put("/api/todos/todo/update/" + updateTodoID, newTodoData, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  deleteTodo: function(todoDelete, token) {
    return axios.delete("/api/todos/todo/delete/", {
      data: {
        id: todoDelete.id,
        user: todoDelete.user,
        headers: { Authorization: "Bearer " + token }
      }
    });
  },
  registerUser: function(newUserData) {
    return axios.post("/users/register-user", newUserData);
  },
  loginUser: function(userLoginData) {
    return axios.post("/users/login-user", userLoginData);
  },
  loginNewUser: function(newUserLoginData) {
    return axios.post("/users/login-new-user", newUserLoginData);
  },
  getUser: function(userID, token) {
    return axios.get("/users/get-user/" + userID, {
      headers: { Authorization: "Bearer " + token }
    });
  },
  checkToken: function(token) {
    return axios.get("/check-token/", {
      headers: { Authorization: "Bearer " + token }
    });
  }
};
