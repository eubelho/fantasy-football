const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Players = require("../models/players");
const Substitutes = require("../models/substitute");

const methodOverride = require("method-override")
router.use(methodOverride('_method'))

//Index
router.get("/players", async (req, res) => {
  let players = await Players.find();
  res.render("players/index.ejs", {players});
});

// Seed Route
// router.get("/players/seed", async (req, res) => {
//   await Players.deleteMany({});
//   let seededPlayers = await Players.create([
//     {
//       name: "Sadio Mané" ,
//       position: "Forward" ,
//       number: "30" ,
//       team: "Al-Nassr" ,
//       isRetired: "No" ,
//       dateOfBirth: "04/10/1992",
//       country: "Senegal",
//       image: "images/teampictures/mané.png",
//     },
//     {
//       name: "Lionel Messi",
//       position: "Forward",
//       number: "10",
//       team: "Inter Miami FC",
//       isRetired: "No",
//       dateOfBirth: "06/24/1987",
//       country: "Argentina",
//       image: "images/teampictures/Messi.png",
//     },
//     {
//       name: "Mohammad Salah",
//       position: "Forward",
//       number: "11",
//       team: "Liverpool",
//       isRetired: "No",
//       dateOfBirth: "06/15/1992",
//       country: "Egypt",
//       image: "images/teampictures/salah.png",
//     },
//     {
//       name: "Fabinho",
//       position: "Midfielder",
//       number: "3",
//       team: "Al Ittihad",
//       isRetired: "No" ,
//       dateOfBirth: "10/23/1993",
//       country: "Brazil",
//       image: "images/teampictures/fabinho.png",
//     },
//     {
//       name: "Alexis Mac Allister" ,
//       position: "Midfielder" ,
//       number: "20" ,
//       team: "Liverpool" ,
//       isRetired: "No" ,
//       dateOfBirth: "12/24/1998" ,
//       country: "Argentina",
//       image: "images/teampictures/macallister.png",
//     },
//     {
//       name: "Dominik Szoboszlai",
//       position: "Midfielder",
//       number: "8",
//       team: "Liverpool",
//       isRetired: "No",
//       dateOfBirth: "10/25/2000",
//       country: "Hungary",
//       image: "images/teampictures/szoboszlai.png",
//     },
//     {
//       name: "Ibrahima Konaté",
//       position: "Defender",
//       number: "5",
//       team: "Liverpool",
//       isRetired: "No",
//       dateOfBirth: "05/25/1999",
//       country: "France",
//       image: "images/teampictures/konate.png",
//     },
//     {
//       name: "Andrew Robertson",
//       position: "Defender",
//       number: "26",
//       team: "Liverpool",
//       isRetired: "No",
//       dateOfBirth: "03/11/1994",
//       country: "Scotland",
//       image: "images/teampictures/robertson.png",
//     },
//     {
//       name: "Virgil van Dijk",
//       position: "Defender",
//       number: "4",
//       team: "Liverpool",
//       isRetired: "No",
//       dateOfBirth: "07/08/1991",
//       country: "Netherlands",
//       image: "images/teampictures/vandijk.png",
//     },
//     {
//       name: "Trent Alexander-Arnold",
//       position: "Defender",
//       number: "66",
//       team: "Liverpool",
//       isRetired: "No",
//       dateOfBirth: "10/07/1998",
//       country: "England",
//       image: "images/teampictures/taa.png",
//     },
//     {
//       name: "Alisson",
//       position: "Goalkeeper",
//       number: "1",
//       team: "Liverpool",
//       isRetired: "No",
//       dateOfBirth: "10/02/1992",
//       country: "Brazil",
//       image: "images/teampictures/alisson.png",
//     },
//   ]);
//   res.send(seededPlayers);
// });

//New Route
router.get("/players/new", async (req, res) => {
  res.render("players/new.ejs");
});

//Delete Route
router.delete('/players/:id', async (req, res) => {
  try {
      const deletedPlayer = await Players.findByIdAndRemove(req.params.id);
      if (!Players) {
          return res.send('Player Not Found');
      }
      res.redirect('/players');
  } catch (error) {
      console.error("Error:", error);
      res.send('An Error Occurred While Deleting the Player');
  }
});

//Update Route 
router.put('/players/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updatedValues = {
      name: body.name,
      position: body.position,
      number: body.number,
      team: body.team,
      isRetired: body.isRetired,
      dateOfBirth: body.dateOfBirth,
      country: body.country,
      image: body.image,
  };
  const updatedPlayers = await Players.findOneAndUpdate({_id:id}, updatedValues);
  res.redirect('/players');
});

//Create Route
router.post('/players', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  let newPlayers = new Players ({
    name: body.name,
      position: body.position,
      number: body.number,
      team: body.team,
      isRetired: body.isRetired,
      dateOfBirth: body.dateOfBirth,
      country: body.country,
      image: body.image,
  });
  await newPlayers.save();
  res.redirect('/players');
});

//Edit Route
router.get('/players/:id/edit', async (req, res) => {
  const foundPlayers = await Players.findById(req.params.id)
  console.log(foundPlayers)
  res.render('players/edit.ejs', {
    players: foundPlayers,
  });
});

//Show Route
router.get('/players/:id', async (req, res) => {
  const foundPlayers = await Players.findById(req.params.id)
  console.log(foundPlayers)
  res.render('players/show.ejs', {
    players: foundPlayers,
  })
});

module.exports = router;