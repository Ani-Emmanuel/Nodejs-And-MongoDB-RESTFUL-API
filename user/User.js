const mongoose = require("mongoose");

// creating the structure of the User table
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

//Declaring your Model
mongoose.model("User", UserSchema);

//Exporting the Table model
module.exports = mongoose.model("User");
