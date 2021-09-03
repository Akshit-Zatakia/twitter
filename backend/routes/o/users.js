const { check, validationResult } = require("express-validator");
const getErrorMessage = require("../../config/errorMessage");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

// models
const User = require("../../model/User");

// @route  POST api/o/users
// @desc   Register user
router.post(
  "/",
  [
    check("username", "username").isEmpty(),
    check("email", "valid email").isEmail(),
    check("password", "valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const message = getErrorMessage(validationResult(req));
    if (message) {
      return res.status(400).json({ message, error: true });
    }

    let { username, email, password } = req.body;
    try {
      // check for existing email
      let user = User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
          error: true,
        });
      }

      // hash the password
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      //   create new user
      user = new User({
        username,
        email,
        password,
      });

      //   send response
      res.json({
        message: "Signed Up successfully",
        error: false,
      });
    } catch (error) {
      // send error
      res.status(500).json({
        message: error.message,
        error: true,
      });
    }
  }
);

module.exports = router;
