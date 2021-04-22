const router = require("express").Router();
const { User, Order, Galaxy, OrderItems } = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//GET /api/users/:userId/cart
router.get("/:userId/cart", async (req, res, next) => {
  try {
    const [cart, wasCreated] = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        orderStatus: "pending",
      },
      include: [{ model: Galaxy }],
    });
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

//DELETE /api/users/:userId/cart/:galaxyId
router.delete("/:userId/cart/:galaxyId", async (req, res, next) => {
  try {
    const orderItemToDelete = await OrderItems.findOne({
      where: {
        galaxyId: req.params.galaxyId,
        orderId: req.body.orderId,
      },
    });
    await orderItemToDelete.destroy();
    res.json(orderItemToDelete);
  } catch (error) {
    next(error);
  }
});
