const ApiError = require("../utils/apiError");

function authorizeRoles(roles) {
  return (req, _res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Forbidden: insufficient permissions"));
    }

    return next();
  };
}

module.exports = authorizeRoles;
