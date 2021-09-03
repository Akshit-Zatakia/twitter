const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// encrypt the password using hashing
// round = 10
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);

  return hashedPassword;
};

// check the hashed password
const comparePassword = async (password, userPassword) => {
  const isMatch = await bcrypt.compare(password, userPassword);
  return isMatch;
};

// generate the token
// expiry is 7 days
const generateToken = async (payload) => {
  try {
    return jwt.sign(payload, process.env.jwtSecret, {
      expiresIn: "7d",
    });
    // return generatedToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { hashPassword, comparePassword, generateToken };
