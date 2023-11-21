const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  link: String,
  state: { type: String, default: "active" },
  position: Number,
});

// TodoSchema.createIndex();
module.exports = mongoose.model("Todo", TodoSchema);