class Middleware {
  constructor(config) {
    this.config = config;
  }

  connect(req, res, next) {
    /*   let obj = {
      url: req.url,
      method: req.method,
      time: new Date()
    }

    log.logObj(obj)*/

    res.error = function(msg) {
      res.json({
        url: req.url,
        method: req.method,
        time: new Date(),
        error: msg
      })
    }

    res.s = function(msg) {
      res.json({
        url: req.url,
        method: req.method,
        time: new Date(),
        success: msg
      })
    }

    res.j = function(msg) {
      res.json({
        url: req.url,
        method: req.method,
        time: new Date(),
        data: msg
      })
    }
    next()
  }

  nopage(req, res) {
    res.status(404).send("Could not found the page you are looking for -_-")
  }

  error(error, req, res, next) {
    console.log(error.stack)
    res.status(500).send(error.stack)
    next(error)
  }
}

module.exports = Middleware