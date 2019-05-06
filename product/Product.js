const mongoose = require("mongoose");

// Define the structure of your DB Table
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String
});

//Declaring your Model
mongoose.model("Product", productSchema);

//Exporting the Table model
module.exports = mongoose.model("Product");
