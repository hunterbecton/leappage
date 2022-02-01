export const withRestrict = (...roles) => {
  return (req, res, next) => {
    // Roles in an array
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        data: {
          message: `You don't have valid permissions.`,
        },
      });
    }

    next();
  };
};
