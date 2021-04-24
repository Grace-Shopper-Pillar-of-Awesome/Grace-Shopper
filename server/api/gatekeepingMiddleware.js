//will store our functions will act as middleware between req and res
//we will use it as we see fit
const { User } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //console.log("this is req.headers in middleware:", req.headers);
    //console.log("this is token in middleware:", token);
    const user = await User.findByToken(token); //the findByToken instance methodis exists in our db model
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res.status(403).send("You shall not pass!");
  } else {
    next();
  }
};

module.exports = {
  requireToken,
  isAdmin,
};
