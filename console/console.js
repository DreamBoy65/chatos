const colors = require('@colors/colors');

class Log {
  constructor(){
    
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