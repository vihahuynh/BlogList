import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const request = axios.post(baseUrl, credentials);
  return request.then((response) => response.data);
};

export default { login };
