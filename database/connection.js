const mongoose = require("mongoose");

// mongoose.connect - to tell mongoose what database
mongoose.connect(
  "mongodb+srv://eubelho:yjYEmRGqhrUwE0Jm@sei.7nei3ex.mongodb.net/"
);

// check for error or successful connection
mongoose.connection.on("connected", () => console.log("Database is Connected"));
mongoose.connection.on("error", () => console.log("An Error Has Occured..."));

module.exports = mongoose;