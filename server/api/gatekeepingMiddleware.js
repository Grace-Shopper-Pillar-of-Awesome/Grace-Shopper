//will store our functions will act as middleware between req and res
//we will use it as we see fit
const { User } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("this is our token in gatekeepingmiddleware:", token);
    const user = await User.findByToken(token); //the findByToken instance methodis exists in our db model
    req.user = user;
    console.log("this is user in gatekeepingmiddleware:", user);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requireToken,
};
