const { getSingleCustomerRolesById } = require("../repositories/customers");
const { verifyJwtToken } = require("../utils/jwtHelper");

const verifytoken = async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token && token.includes("Bearer")) {
    try {
      const result = await verifyJwtToken(token);
      const userid = result.userid;
      req.userid = userid;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "inavalid token" });
    }
  } else {
    res.status(401).json({ message: "no token found" });
  }
};

const verifyRoles = (roles) => {
  return async (req, res, next) => {
    const userid = req.userid;
    const userRoles = await getSingleCustomerRolesById(userid);
    let hasRole = false;
    for (let userRole of userRoles) {
      if (roles.includes(userRole.name)) {
        hasRole = true;
        break;
      }
    }
    if (hasRole) {
      next();
    } else {
      return res.status(403).json({ message: "You don't have permission" });
    }
  };
};

module.exports = {
  verifytoken,
  verifyRoles,
};
