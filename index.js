const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const http = require("http");
const Router = require("./routes/router.js");
const Logger = require("./console/console.js");
const Mongoose = require("./db/mongoose.js");
const cookieParser = require('cookie-parser');
const {
  Server
} = require("socket.io");
const Socketer = require("./socket/socket.js")

// logger
global.log = new Logger();

// load config
global.config = require("./config.js");

// db
const db = new Mongoose(config.db);
db.init();

// name
process.name = config.name;

// new app
const app = express();

// cookie-parser
app.use(cookieParser());

// public dir
app.use(express.static(process.cwd() + '/public/'));

// body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// new server
const server = http.createServer(app);

// new socket
const io = new Server(server);
const socketer = new Socketer(io);
io.on("connection", async(socket) => {
  global.socket = socket
  await socketer.loadAll(socket)

  io.on("disconnect", () => {
    io.emit("unjoin")
  })
});

// router
const router = new Router(app);
router.loadAll();

// log in
server.listen(config.port, () => {
  log.log(`Running server on ${config.port}`);
});