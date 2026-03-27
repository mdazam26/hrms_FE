export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  TENANT: "TENANT",
  ADMIN: "ADMIN",
  HR: "HR",
  EMPLOYEE: "EMPLOYEE",
};

// Management access
export const canManageEmployees = (role) => {
  return (
    role === ROLES.TENANT ||
    role === ROLES.ADMIN ||
    role === ROLES.HR
  );
};

// Profile page access (ONLY employee-level roles)
export const canUseProfileApi = (role) => {
  return ![ROLES.SUPER_ADMIN, ROLES.TENANT].includes(role);
};

// Super admin only
export const canManageTenants = (role) => {
  return role === ROLES.SUPER_ADMIN;
};