const Multer = require("../../db/multer.js")
const multer = new Multer("posts")
const Schema = require(process.cwd() + "/db/User.js");
const uuid = require("uuid")

module.exports = async(req, res) => {
  let data = await multer.save(req, res)
  let userId = req.query.id

  if (!userId) {
    return res.error("no user id")
  }

  let user = await Schema.findOne({
    _id: userId
  })

  if (!user) {
    return res.error("no user")
  }

  let imgs = []

  if (data?.files.length > 0) {
    data.files.forEach(e => {
      imgs.push({
        path: e.path,
        id: e.filename.split("/")[1]
      })
    })
  }

  let post = {
    text: data.body.text,
    images: imgs,
    date: Date.now(),
    likes: [],
    id: uuid.v4()
  }

  user.posts.push(post)
  user.fyp.push({
    user: userId,
    post: post.id
  })

  await user.save()

  res.j(post)
}