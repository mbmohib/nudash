import axios from "axios";
import variables from "./variables";

export default axios.create({
  baseURL: variables.api
});
