const mongoose = require("../database/connection");

const substitutesSchema = new mongoose.Schema({
  name: String,
  position: String,
  number: Number,
  team: String,
  isRetired: String,
  dateOfBirth: Date,
  country: String,
  image: String,
});

const Substitutes = new mongoose.model("Substitutes", substitutesSchema);

module.exports = Substitutes;