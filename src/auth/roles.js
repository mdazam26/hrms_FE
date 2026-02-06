export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  TENANT: "TENANT",
  HR: "HR",
  EMPLOYEE: "EMPLOYEE",
};

export const canManageEmployees = (role) => {
  return role === ROLES.TENANT || role === ROLES.HR;
};

export const canViewProfile = (role) => {
  return role === ROLES.EMPLOYEE || role === ROLES.HR;
};

export const canManageTenants = (role) => {
  return role === ROLES.SUPER_ADMIN;
};
