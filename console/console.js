const colors = require('@colors/colors');

class Log {
  constructor() {}

  success(message,
    title = "SUCCESS!") {
    return console.log("\x1b[32m",
      title,
      "\x1b[0m",
      message);
  }

  log(msg) {
    console.log(`> ${process.name}`.rainbow + "\n" + msg.blue);
  }

  warn(msg) {
    console.log(`> ${process.name}`.rainbow + "\n" + msg.cyan);
  }

  logObj(obj) {
    let string = ""
    Object.keys(obj).forEach(e => {
      string += `\n ${e}: ${obj[e]}`
    })

    console.log(`> ${process.name}`.rainbow + string.green)
  }
}

module.exports = Log