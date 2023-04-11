const fs = require("fs");
const router = require("express").Router();
const MdW = require(process.cwd() + "/middlewares/middleware.js");
const mdw = new MdW();

class Router {
  constructor(app) {
    this.app = app
  }

  load(name, fun) {
    router.all(name === config.mainFile ? "/": "/" + name, fun);
    log.log(`Loaded route ==> ${name}`)
  }

  async loadAll() {
    const dir = config.routerDir || "routes/route"
    let route = process.cwd() + "/" + dir
    const files = await fs.readdirSync(route)
    for (const file of files) {
      let fun = require(route + "/" + file)
      let name = file.split(".")[0]

      this.load(name, fun)
    }

    this.app.use(mdw.connect)
    this.app.use(router)
    this.app.use(mdw.nopage)
    this.app.use(mdw.error)
  }
}

module.exports = Router