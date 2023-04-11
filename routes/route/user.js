const Schema = require(process.cwd() + "/db/User.js");

module.exports = async(req, res) => {
  
  let userId = req.query.id
  
  if(!userId) {
    return res.error("no user id")
  }
  
  let user = await Schema.findOne({_id: userId})
  
  if(!user) {
    return res.error("no user")
  }
  
  res.j(user)
}