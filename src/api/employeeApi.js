import http from "./http";

export const getAllEmployeesApi = () => {
  return http.get("/api/employees/all");
};

export const createEmployeeApi = (payload) => {
  return http.post("/api/employees", payload);
};

export const getMyProfileApi = () => {
  return http.get("/api/employees/profile");
};

