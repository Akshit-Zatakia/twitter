const router = require("express").Router();

// models
const User = require("../../model/User");

// @route  GET api/cms/users/:userId
// @desc   Get user info
router.get("/:userId", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

// @route  GET api/cms/users/auth
// @desc   Get logged in user info
router.get("/me", async (req, res) => {
  try {
    const users = await User.find({
      id: req.user.id,
    }).select("-password");
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

// @route  GET api/cms/users
// @desc   Get users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.user.id,
      },
    }).select("-password");
    if (users.length == 0) {
      return res.status(400).json({
        message: "No user found!",
        error: true,
      });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

// @route  PUT api/cms/users/follow
// @desc   Follow user
router.put("/follow", async (req, res) => {
  const { id } = req.body;
  try {
    if (id == req.user.id) {
      return res.status(400).json({
        message: "You cannot follow yourself",
        error: true,
      });
    }

    const user = await User.findOne({
      _id: req.user.id,
      followers: id,
    });

    if (user) {
      return res.status(400).json({
        message: "You are already following",
      });
    }

    await User.updateOne(
      { _id: req.user.id },
      {
        $push: {
          followers: id,
        },
      }
    );

    res.json({
      message: "Followed successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

// @route  PUT api/cms/users/unfollow
// @desc   Unfollow user
router.put("/unfollow", async (req, res) => {
  const { id } = req.body;
  try {
    if (id == req.user.id) {
      return res.status(400).json({
        message: "You cannot follow or unfollow yourself",
        error: true,
      });
    }

    const user = await User.findOne({
      _id: req.user.id,
      followers: id,
    });

    if (!user) {
      return res.status(400).json({
        message: "You are not following",
      });
    }

    await User.updateOne(
      { _id: req.user.id },
      {
        $pull: {
          followers: id,
        },
      }
    );

    res.json({
      message: "Unfollowed successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

module.exports = router;
