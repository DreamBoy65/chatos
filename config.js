module.exports = {
  port: 3100,
  name: "chatos",
  mainFile: "mainn",
  
  db: {
        enable: true,
        uri: "mongodb://chatos:chatos@ac-i8itq5j-shard-00-00.8nr3yvt.mongodb.net:27017,ac-i8itq5j-shard-00-01.8nr3yvt.mongodb.net:27017,ac-i8itq5j-shard-00-02.8nr3yvt.mongodb.net:27017/test?replicaSet=atlas-nnc0jd-shard-0&ssl=true&authSource=admin",
        config: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false,
            connectTimeoutMS: 10000,
            family: 4
        }
    },
};