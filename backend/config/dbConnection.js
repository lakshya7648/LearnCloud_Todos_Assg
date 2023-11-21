const mongoose = require("mongoose");

const mongodbURI = "mongodb://127.0.0.1:27017/TodosDatabase";

const connectToMongoDb = () => {
  mongoose.connect(mongodbURI).then((con) => {
    console.log("connection established successfully!!");
  });
};

module.exports = connectToMongoDb;
