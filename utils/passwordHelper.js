const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  var hash = bcrypt.hashSync(password, salt);
  return hash;
};

const compareWithHashedPassword = (plainPassword, hashedPassword) => {
  let isMatching = bcrypt.compareSync(plainPassword, hashedPassword);
  return isMatching;
};

module.exports = {
  hashPassword,
  compareWithHashedPassword,
};
