const mongoose = require("mongoose");

require("dotenv").config()

// mongoose.connect - to tell mongoose what database
mongoose.connect(
  process.env.DATABASE_URL
);

// check for error or successful connection
mongoose.connection.on("connected", () => console.log("Database is Connected"));
mongoose.connection.on("error", () => console.log("An Error Has Occured..."));

module.exports = mongoose;