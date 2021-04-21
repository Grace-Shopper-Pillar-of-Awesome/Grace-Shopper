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
      res.json(galaxy);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

//POST /api/galaxies
Router.post("/", async (req, res, next) => {
  try {
    const newGalaxy = await Galaxy.create(req.body);
    res.json(newGalaxy);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/galaxies/:galaxyId
Router.delete("/:galaxyId", async (req, res, next) => {
  try {
    const galaxyToDelete = await Galaxy.findByPk(req.params.galaxyId);
    await galaxyToDelete.destroy();
    res.json(galaxyToDelete);
  } catch (error) {
    next(error);
  }
});

//PUT /api/galaxies/:galaxyId
Router.put("/:galaxyId", async (req, res, next) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.galaxyId);
    const updatedGalaxy = await galaxy.update(req.body);
    res.send(updatedGalaxy);
  } catch (error) {
    next(error);
  }
});
