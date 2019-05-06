const express = require("express");
const Ucontroller = require("./user/UserController");
const Pcontroller = require("./product/productController");

//Calling the Database instance in the app
const db = require("./db");

//creating Instance of the Express class
const app = express();

//Adding/requiring the User and Product classes in your express Object/Instance
app.use(Ucontroller);
app.use(Pcontroller);

//Exporting the express Object for use in the server
module.exports = app;
