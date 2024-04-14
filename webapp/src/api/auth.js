import baseApi from "./base";

function login(data) {
  return baseApi.post("/login", data);
}

export default {
  login,
};
