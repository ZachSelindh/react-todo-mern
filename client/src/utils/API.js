import axios from "axios";

export default {
  getTodos: function() {
    return axios.get("/api/todos");
  },
  getTodo: function(id) {
    return axios.get("/api/todos/" + id);
  },
  deleteTodo: function(id) {
    return axios.delete("/api/todos/" + id);
  },
  saveTodo: function(todoData) {
    return axios.post("/api/todos", todoData);
  }
};
