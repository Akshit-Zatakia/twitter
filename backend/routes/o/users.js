const { check, validationResult } = require("express-validator");
const getErrorMessage = require("../../config/errorMessage");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

// models
const User = require("../../model/User");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../../config/security");

// @route  POST api/o/users
// @desc   Register user
router.post(
  "/",
  [
    check("username", "username").not().isEmpty(),
    check("email", "valid email").isEmail(),
    check("password", "valid password").isStrongPassword(),
  ],
  async (req, res) => {
    const message = getErrorMessage(validationResult(req));
    if (message) {
      return res.status(400).json({ message, error: true });
    }

    let { username, email, password } = req.body;
    try {
      // check for existing email
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
          error: true,
        });
      }

      password = await hashPassword(password);

      //   create new user
      user = new User({
        username,
        email,
        password,
      });

      await user.save();

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

// @route  POST api/o/users/login
// @desc   Login user
router.post(
  "/login",
  [check("email", "valid email"), check("password", "valid password")],
  async (req, res) => {
    const message = getErrorMessage(validationResult(req));
    if (message) {
      return res.status(400).json({ message, error: true });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "User does not exist",
          error: true,
        });
      }

      if (!(await comparePassword(password, user.password))) {
        return res.status(400).json({
          message: "Please enter correct password",
          error: true,
        });
      }

      console.log(user.id);

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = await generateToken(payload);
      res.json({ token });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: true,
      });
    }
  }
);

module.exports = router;
