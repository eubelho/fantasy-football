// Dependecies
const express = require('express');
const app = express();
const PORT = 3000;
const expressLayouts = require("express-ejs-layouts");
const authRoutes = require("./controllers/authController");
const session = require("express-session");
const playerRoutes = require("./controllers/playerController");
const substituteRoutes = require("./controllers/substituteController");

//Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(session({secret: 'Elliott', cookie: {maxAge: 3600000}}))
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 
app.use(authRoutes); 

//Home
app.get("/", (req, res) => {
    res.render("home.ejs");
  });

  app.use((req, res, next) => {
    if(!req.session.userId) {
      res.redirect("/login");
      return;
    }
    next();
  });

app.use(playerRoutes);
app.use(substituteRoutes);

//Listener
app.listen(PORT, () => {
    console.log('Allez! Allez! Allez!', PORT)
});