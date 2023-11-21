const mongoose = require("mongoose");
const { Schema } = mongoose;

const CounterSchema = new Schema({
  name : {type:String},
  seq : {type:Number, default:0},
});

module.exports = mongoose.model("Counter", CounterSchema);