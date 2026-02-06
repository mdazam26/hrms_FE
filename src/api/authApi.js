import http from "./http";

export const loginApi = (email, password) => {
  return http.post("/api/auth/login", {
    email,
    password,
  });
};

export const meApi = () => {
  return http.get("/api/auth/me");
};

export const logoutApi = () => {
  return http.post("/api/auth/logout");
};
