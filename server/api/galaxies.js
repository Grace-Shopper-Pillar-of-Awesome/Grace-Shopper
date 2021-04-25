const router = require("express").Router();
const { Galaxy } = require("../db");
const { isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

//GET /api/galaxies
router.get("/", async (req, res, next) => {
  try {
    const galaxies = await Galaxy.findAll();
    res.json(galaxies);
  } catch (error) {
    next(error);
  }
});

//GET /api/galaxies/:galaxyId
router.get("/:galaxyId", async (req, res, next) => {
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
router.post("/", async (req, res, next) => {
  try {
    const newGalaxy = await Galaxy.create(req.body);
    res.json(newGalaxy);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/galaxies/:galaxyId
router.delete("/:galaxyId", async (req, res, next) => {
  //will definitely want to add requireToken and isAdmin
  try {
    const galaxyToDelete = await Galaxy.findByPk(req.params.galaxyId);
    await galaxyToDelete.destroy();
    res.json(galaxyToDelete);
  } catch (error) {
    next(error);
  }
});

//PUT /api/galaxies/:galaxyId/edit
router.put("/:galaxyId/edit", async (req, res, next) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.galaxyId);
    const updatedGalaxy = await galaxy.update(req.body);
    res.send(updatedGalaxy);
  } catch (error) {
    next(error);
  }
});

//GET /api/galaxies/:galaxyId/edit
router.get("/:galaxyId/edit", isAdmin, async (req, res, next) => {
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
