import axios from "axios";
import { baseURL } from "_constants";

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
