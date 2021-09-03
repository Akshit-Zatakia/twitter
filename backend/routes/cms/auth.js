const User = require("../../model/User");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

module.exports = router;
