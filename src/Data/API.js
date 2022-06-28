import axios from "axios";
import { URL } from "./URL.js";
const call = (method, path, body) => {
  if (
    (method === "PUT" || method === "POST" || method === "PATCH") &&
    body === null
  ) {
    console.log("This method need body data");
    return;
  }
  return axios({
    method: method,
    url: URL + path,
    data: body,
  });
};
export default call;
