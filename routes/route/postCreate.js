const Schema = require(process.cwd() + "/db/User.js");
const uuid = require("uuid");
const fs = require("fs");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let id = req.query.id || "unknown";
    let path = `public/images/posts/${id}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${uuid.v4()}.${file.mimetype?.split("/")[1] || "png"}`);
  },
});

const upload = multer({
  storage: Storage,
}).array("posts");

module.exports = async (req, res) => {
  let userId = req.query.id;
  if (!userId) {
    return res.error("no user id");
  }

  let data = await up(req, res);
  if (!data.done) {
    console.log(data.info);
    return res.error(data.error);
  }

  let user = await Schema.findOne({
    _id: userId,
  });
  if (!user) {
    return res.error("no user");
  }

  let imgs = [];

  if (data?.files.length > 0) {
    data.files.forEach((e) => {
      imgs.push({
        name: e.filename,
        id: e.filename.split("/")[0],
        path: e.path.replace("public/", ""),
      });
    });
  }

  let post = {
    text: data.body.text,
    images: imgs,
    date: Date.now(),
    likes: [],
    id: uuid.v4(),
  };

  user.posts.push(post);
  user.fyp.push({
    user: userId,
    post: post.id,
  });

  await user.save();
  io.emit("postAdded", post, user);
  res.j(post);
};

async function up(req, res) {
  return new Promise((reso, rej) => {
    upload(req, res, (err) => {
      if (err) {
        reso({
          done: false,
          error: "upload failed.",
          info: err,
        });
      } else {
        reso({
          done: true,
          body: req.body,
          files: req.files,
        });
      }
    });
  });
}
