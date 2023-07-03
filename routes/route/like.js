const Schema = require(process.cwd() + "/db/User.js");

module.exports = async (req, res) => {
  let userId = req.query.userId;
  let likedId = req.query.likedId;
  let postId = req.query.postId;
  let eroro = false;
  let liked = true;

  let user = await Schema.findOne({
    _id: likedId,
  });

  if (!user) return res.error("no user");

  let post = user.posts.find((c) => c.id === postId);

  if (!post) return res.error("no post");

  if (post.likes.find((c) => c === userId)) {
    post.likes = post.likes.filter((c) => c !== userId);
    liked = false;
  } else {
    post.likes.push(userId);
  }

  user.markModified("posts");

  await user.save(function (err) {
    if (err) {
      eroro = true;
      console.log(err);
    }
  });

  io.emit("postLiked", {success: eroro ? false : true,
    user: userId,
    likedId: likedId,
    postId: postId,
    totalLikes: post.likes.length,
    liked: liked,});

  res.j({
    success: eroro ? false : true,
    user: userId,
    likedId: likedId,
    postId: postId,
    totalLikes: post.likes.length,
    liked: liked,
  });
};
