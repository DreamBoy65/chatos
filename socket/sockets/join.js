const Schema = require(process.cwd() + "/db/User.js");

module.exports = async function(id) {
  let user = await Schema.findOne({
    _id: id
  })

  if (!this.id || !user) return;

  user.socket = this.id

  await user.save()
}