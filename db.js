require("dotenv/config");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_CONNETION, {
  useNewUrlParser: true
});
