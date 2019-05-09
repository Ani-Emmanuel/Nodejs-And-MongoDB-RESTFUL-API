require("dotenv/config");

console.log(process.env.SECRET_KEY);
module.exports = {
  secret: process.env.SECRET_KEY
};
