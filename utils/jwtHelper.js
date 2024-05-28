const jwt = require("jsonwebtoken");
const SECRET = "JWTSECRET";

const createToken = (userid) => {
  const token = jwt.sign({ userid: userid }, SECRET);
  return token;
};

const verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    let formattedToken = token.replace("Bearer ", "");
    jwt.verify(formattedToken, SECRET, (err, decoded) => {
      if (err) return reject({ valid: false, error: err });
      resolve({ valid: true, userid: decoded.userid });
    });
  });
};

module.exports = {
  createToken,
  verifyJwtToken,
};
