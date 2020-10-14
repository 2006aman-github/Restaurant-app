import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-restaurant-app.herokuapp.com",
});

export default instance;
