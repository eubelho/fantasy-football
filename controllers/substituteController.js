const express = require("express");
const router = express.Router();
const User = require('../models/user');
const Players = require("../models/players");
const Substitutes = require("../models/substitute");

const methodOverride = require("method-override")
router.use(methodOverride('_method'))

//Index
router.get("/substitutes", async (req, res) => {
    let substitutes = await Substitutes.find();
    res.render("substitutes/index.ejs", { substitutes });
  });

//New Route
router.get("/substitutes/new", async (req, res) => {
    res.render("substitutes/new.ejs");
  });
  
  //Delete Route
  router.delete('/substitutes/:id', async (req, res) => {
    try {
        const deletedSubstitutes = await Substitutes.findByIdAndRemove(req.params.id);
        if (!Substitutes) {
            return res.send('Substitute Not Found');
        }
        res.redirect('/substitutes');
    } catch (error) {
        console.error("Error:", error);
        res.send('An Error Occurred While Deleting the Substitute');
    }
  });
  
  //Update Route 
  router.put('/substitutes/:id', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedValues = {
        name: body.name,
        position: body.position,
        number: body.number,
        team: body.team,
        isRetired: body.isRetired,
        dateOfBirth: body.dateOfBirth,
        image: body.image,
    };
    const updatedSubstitutes = await Substitutes.findOneAndUpdate({_id:id}, updatedValues);
    res.redirect('/substitutes');
  });
  
  //Create Route
  router.post('/substitutes', async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    let newSubstitutes = new Substitutes ({
      name: body.name,
        position: body.position,
        number: body.number,
        team: body.team,
        isRetired: body.isRetired,
        dateOfBirth: body.dateOfBirth,
        image: body.image,
    });
    await newSubstitutes.save();
    res.redirect('/substitutes');
  });
  
  //Edit Route
  router.get('/substitutes/:id/edit', async (req, res) => {
    const foundSubstitutes = await substitutes.findById(req.params.id)
    res.render('substitutes/edit.ejs', {
      substitutes: foundSubstitutes,
    });
  });
  
  //Show Route
  router.get('/substitutes/:id', async (req, res) => {
    const foundSubstitutes = await Substitutes.findById(req.params.id)
    res.render('/substitutes/show.ejs', {
      substitutes: foundSubstitutes,
    })
  });
  
  module.exports = router;