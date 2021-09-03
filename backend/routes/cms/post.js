const router = require("express").Router();
const { check, validationResult } = require("express-validator");

// model
const User = require("../../model/User");
const Post = require("../../model/Post");
const getErrorMessage = require("../../config/errorMessage");

// @route  POST api/cms/post
// @desc   Add post
router.post(
  "/",
  [
    check("message", "message").not().isEmpty(),
    check("message", "message less than 140 characters").isLength({ max: 140 }),
  ],
  async (req, res) => {
    const errorMessage = getErrorMessage(validationResult(req));
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage, error: true });
    }

    const { message } = req.body;
    try {
      const newMessage = new Post({
        userId: req.user.id,
        message,
      });

      await newMessage.save();
      res.json({
        message: "Tweeted successfully",
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: true,
      });
    }
  }
);

// @route  PUT api/cms/post/:postId
// @desc   Update post
router.put(
  "/:postId",
  [
    check("message", "message").not().isEmpty(),
    check("message", "message less than 140 characters").isLength({ max: 140 }),
  ],
  async (req, res) => {
    const errorMessage = getErrorMessage(validationResult(req));
    if (errorMessage) {
      return res.status(400).json({ message: errorMessage, error: true });
    }

    const { message } = req.body;
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res
          .status(400)
          .json({ message: "Post does not exists", error: true });
      }

      post.message = message;

      await post.save();

      res.json({
        message: "Tweet updated",
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: true,
      });
    }
  }
);

// @route  DELETE api/cms/post/:postId
// @desc   Delete post

// @route  GET api/cms/post
// @desc   Get posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({
        updatedAt: "desc",
      })
      .populate("userId", ["username"]);
    console.log(posts);
    if (posts.length == 0) {
      return res.status(500).json({
        message: "No data!",
        error: true,
      });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

// @route  GET api/cms/post/timeline
// @desc   Get posts
router.get("/timeline", async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user.followers);
    const posts = await Post.find({
      $or: [
        { userId: req.user.id },
        {
          userId: {
            $in: user.followers,
          },
        },
      ],
    })
      .sort({
        updatedAt: "desc",
      })
      .populate("userId", ["username"]);
    if (posts.length == 0) {
      return res.status(500).json({
        message: "No data!",
        error: true,
      });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

// @route  GET api/cms/post/me
// @desc   Get posts
router.get("/me", async (req, res) => {
  try {
    const posts = await Post.find({
      userId: req.user.id,
    }).sort({
      updatedAt: "desc",
    });
    if (posts.length == 0) {
      return res.status(500).json({
        message: "No data!",
        error: true,
      });
    }
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

module.exports = router;
