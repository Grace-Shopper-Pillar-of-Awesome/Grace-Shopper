const Router = require("express").Router();
const { Galaxy } = require("../db");

//GET /api/galaxies
Router.get("/", async (req, res, next) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.json(galaxies);
  } catch (error) {
    next(error);
  }
});

//GET /api/galaxies/:galaxyId
Router.get("/:galaxyId", async (req, res, next) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.galaxyId);
    if (galaxy) {
      res.json(project);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
