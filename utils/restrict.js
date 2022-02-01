export const restrict = (allowedRoles, user) => {
  if (user !== undefined && user && allowedRoles.includes(user.role)) {
    return true;
  } else {
    return false;
  }
};
