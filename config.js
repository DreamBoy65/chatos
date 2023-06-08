module.exports = {
  port: 3001,
  name: "chatos",
  mainFile: "main",

  db: {
    enable: true,
    uri: "mongodb+srv://dream:chatos54321@chatos.j4dzh8d.mongodb.net/?retryWrites=true&w=majority",
    config: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4,
    },
  },
};
