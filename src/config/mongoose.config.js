const mongoose = require("mongoose");
const { DbConfig } = require("./app.config");

(async () => {
  try {
    await mongoose.connect(DbConfig.mongodb.url, {
      dbName: DbConfig.mongodb.dbName,
      autoCreate: true,
      autoIndex: true,
    });
    console.log("*********MongoDB connection sucessfully*********");
  } catch (exception) {
    console.log("MongoDb server connection err");

    throw {
      code: 500,
      message: exception,
      status: "MONGO_CONNECTION_ERR",
    };
  }
})();
