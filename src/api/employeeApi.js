import http from "./http";

export const getAllEmployeesPaginatedApi = (params) => {
  return http.get("/api/employees/getAll-paginated", {
    params,
  });
};
export const createEmployeeApi = (payload) => {
  return http.post("/api/employees", payload);
};

export const getMyProfileApi = () => {
  return http.get("/api/employees/profile");
};

export const updateProfilePhotoApi = (base64String) => {
  return http.put("/api/employees/profile/photo", {
    profilePhotoBase64: base64String,
  });
};

export const getEmployeeByIdApi = (id) => {
  return http.get(`/api/employees/${id}`);
};