module.exports = (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
};