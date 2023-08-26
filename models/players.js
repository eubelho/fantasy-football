
const mongoose = require("../database/connection");

const playersSchema = new mongoose.Schema({
  name: String,
  position: String,
  number: Number,
  team: String,
  isRetired: String,
  dateOfBirth: Date,
  country: String,
  image: String,
});

const Players = new mongoose.model("Players", playersSchema);

module.exports = Players;