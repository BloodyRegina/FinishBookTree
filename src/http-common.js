import axios from "axios";

export default axios.create({
  baseURL: "https://projectbackend-tvna.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});