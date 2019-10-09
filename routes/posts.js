const router = require('express').Router();
const verify = require('../varifyToken');

// Get All Posts
router.get('/', verify, (req, res) => {

res.json({
  user_id:req.user._id,
  posts: [
    {
      id: "01",
      title: "Post One",
      description: "This is Post One Data"
    },
    {
      id: "02",
      title: "Post Two",
      description: "This is Post Two Data"
    },
  ]
});
});

module.exports = router;