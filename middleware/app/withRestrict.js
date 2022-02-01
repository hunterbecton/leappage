export const withRestrict = async ({ req, res }, ...roles) => {
  // Roles in an array
  if (!roles.includes(req.user.role)) {
    return false;
  }

  return true;
};
