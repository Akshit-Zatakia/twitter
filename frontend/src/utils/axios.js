import axios from "axios";

const baseUrl = "http://localhost:8081/";

const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;
