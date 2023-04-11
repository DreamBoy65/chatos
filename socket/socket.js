const fs = require("fs");

class Socket {
  constructor(io) {
    this.io = io
  }

  load(name, fun, socket) {
    socket.on(name, fun)
  }

  async loadAll(socket) {
    const dir = config.routerDir || "socket/sockets"
    let route = process.cwd() + "/" + dir
    const files = await fs.readdirSync(route)
    for (const file of files) {
      let fun = require(route + "/" + file)
      let name = file.split(".")[0]

      this.load(name, fun, socket)
    }
  }
}

module.exports = Socket