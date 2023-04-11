module.exports = async function() {
  let user = await Schema.findOne({
    socket: this.id
  })

  user.socket = null

  await user.save()
}