const jsonWeb = require("jsonwebtoken");
exports.generateToken = (id) => {
  let token = jsonWeb.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
