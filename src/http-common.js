import axios from "axios";

export default axios.create({
  baseURL: "https://projectbackend-cjfl.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});