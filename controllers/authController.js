// using express router to attach routes and export them
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//Login Button - to Login Page
router.get("/login", (req, res) => {
  res.render("auth/login");
});

//Login Button - to Main Exercise Page
router.post("/login", async (req, res) => {
  console.log(req.body);
  let userToLogin = await User.findOne({ username: req.body.username });
  if (userToLogin) {
    console.log(userToLogin);
    bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
      if (result) {
        req.session.userId = userToLogin._id;
        req.session.name = userToLogin.name;
        res.redirect("/players");
      } else {
        res.send("Incorrect Password");
      }
    });
  }
});

// Signup Button - to Signup Page
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

//Create the user and navigate to Login
router.post("/signup", async (req, res) => {
  if (req.body.username && req.body.password) {
    let plainTextPassword = req.body.password;
    bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
      req.body.password = hashedPassword;
      let newUser = await User.create(req.body);
      res.send(newUser);
    });
  }
});

//Logout Route
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;