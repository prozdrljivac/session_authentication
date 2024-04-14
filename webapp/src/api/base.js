import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:3000", // Update this URL to be .env variable
  headers: {
    "Content-Type": "application/json",
  },
});

export default baseApi;
